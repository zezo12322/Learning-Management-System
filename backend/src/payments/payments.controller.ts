import {
  Controller,
  Post,
  Body,
  Res,
  HttpStatus,
  Get,
  Query,
  UseGuards,
  UnauthorizedException,
  ValidationPipe,
  HttpException,
  Req,
} from '@nestjs/common';
import { Throttle } from '@nestjs/throttler';
import { PaymentsService } from './payments.service';
import type { Response } from 'express';
import { AuthToken } from '../common/decorators/auth-token.decorator';
import { CurrentUser } from '../common/decorators/current-user.decorator';
import { FirebaseAuthGuard } from '../common/guards/firebase-auth.guard';
import { DataConnectService } from '../firebase/dataconnect.service';
import { CheckoutDto } from './dto/checkout.dto';
import { AuditLoggingService } from '../logging/logging.service';

@Controller('payments')
export class PaymentsController {
  constructor(
    private readonly paymentsService: PaymentsService,
    private readonly dataConnectService: DataConnectService,
    private readonly auditLoggingService: AuditLoggingService,
  ) {}

  // Strict rate limit: 5 checkout requests per 60 seconds (payment abuse protection).
  @Post('checkout')
  @UseGuards(FirebaseAuthGuard)
  @Throttle({ default: { ttl: 60000, limit: 5 } })
  async checkout(
    @Body(new ValidationPipe({ transform: true })) body: CheckoutDto,
    @Res() res: Response,
    @AuthToken() userAuthToken: string,
    @CurrentUser('uid') userId: string,
    @Req() req: any,
  ) {
    // Server-side price validation: look up each item's actual price from the database.
    // Never trust client-provided prices.
    let totalAmountCents = 0;
    const items: Array<{
      targetType: string;
      courseId?: string;
      missionId?: string;
      subscriptionTierId?: string;
      price: number;
    }> = [];

    for (const item of body.items) {
      let priceCents = 0;

      if (item.targetType === 'COURSE' && item.courseId) {
        // Fetch the actual course price from the database
        const courseResult: any =
          await this.dataConnectService.executeQueryAsAdmin('AdminGetCourse', {
            courseId: item.courseId,
          });
        const course = courseResult?.course;
        if (!course) {
          throw new HttpException(
            `Course ${item.courseId} not found`,
            HttpStatus.NOT_FOUND,
          );
        }
        priceCents = course.price || 0;
      } else if (item.targetType === 'MISSION' && item.missionId) {
        // Missions don't have a direct price - they're tied to courses.
        // For simplicity, charge $0 for missions or look up the parent course.
        // Returning 0 price for missions since they're bundled with courses.
        priceCents = 0;
      } else if (
        item.targetType === 'SUBSCRIPTION' &&
        item.subscriptionTierId
      ) {
        // Fetch subscription tier price
        const subscriptionResult: any =
          await this.dataConnectService.executeQueryAsAdmin(
            'AdminGetSubscriptionTier',
            { subscriptionTierId: item.subscriptionTierId },
          );
        const subscription = subscriptionResult?.subscriptionTier;
        if (!subscription) {
          throw new HttpException(
            `Subscription tier ${item.subscriptionTierId} not found`,
            HttpStatus.NOT_FOUND,
          );
        }
        priceCents = subscription.price || 0;
      }

      // Add to total
      totalAmountCents += priceCents;
      items.push({
        ...item,
        price: priceCents,
      });
    }

    // Default billing data if not provided
    const billingData = body.billingData || {
      apartment: 'NA',
      email: 'test@example.com',
      floor: 'NA',
      first_name: 'Customer',
      street: 'NA',
      building: 'NA',
      phone_number: '+201000000000',
      shipping_method: 'NA',
      postal_code: 'NA',
      city: 'Cairo',
      country: 'EG',
      last_name: 'Name',
      state: 'NA',
    };

    try {
      const returnUrl = body.returnUrl;

      const checkoutUrl = await this.paymentsService.generateCheckoutUrl(
        totalAmountCents,
        items,
        billingData,
        userAuthToken,
        userId,
        returnUrl,
      );

      // Audit Log: Payment Initiated
      this.auditLoggingService.createLog({
        action: 'PAYMENT_INITIATED',
        adminUid: req.user?.uid ?? 'unknown',
        targetUid: null,
        ipAddress: req.ip,
        details: { totalAmountCents, items, billingData },
      });

      // Return the checkout URL to the frontend so it can redirect the user
      // via window.location.href (avoiding CORS issues with 302 redirects in fetch)
      return res.status(HttpStatus.OK).json({ checkoutUrl });
    } catch (error) {
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        message: 'Failed to initiate payment',
        error: error.message,
      });
    }
  }

  // Paymob Server-to-Server webhook callback
  @Post('webhook')
  @Throttle({ default: { ttl: 60000, limit: 60 } })
  async handleWebhook(@Body() body: any, @Query('hmac') hmac: string) {
    if (body.type === 'TRANSACTION' || body.type === 'INTENTION') {
      // 1. Verify HMAC for security
      if (body.type === 'TRANSACTION') {
        const isValid = this.paymentsService.verifyHmac(hmac, body.obj);
        if (!isValid) {
          throw new UnauthorizedException('Invalid HMAC signature');
        }
      }

      // PaymentStatus enum only has PENDING/COMPLETED/FAILED/REFUNDED — a
      // 'SUCCESS' literal is rejected by Data Connect enum validation.
      const status = body.obj.success ? 'COMPLETED' : 'FAILED';
      // In NextGen API, the webhook might provide intention_id or order.id
      const referenceId =
        body.obj.intention_id?.toString() ||
        body.obj.order?.id?.toString() ||
        body.obj.id?.toString();

      if (referenceId) {
        try {
          // 2. Update payment status
          await this.dataConnectService.executeMutationAsAdmin(
            'UpdatePaymentStatusByReference',
            {
              referenceId: referenceId,
              status: status,
            },
          );
          console.log(
            `Payment status updated to ${status} for reference:`,
            referenceId,
          );

          // 3. If successful, enroll the user
          if (status === 'COMPLETED') {
            const paymentDetails: any =
              await this.dataConnectService.executeQueryAsAdmin(
                'GetPaymentDetailsByReference',
                {
                  referenceId: referenceId,
                },
              );

            const payment = paymentDetails?.payments?.[0];
            if (payment && payment.paymentItems_on_payment) {
              const userId = payment.userId;

              // Audit Log: Payment Successful
              this.auditLoggingService.createLog({
                action: 'PAYMENT_SUCCESS',
                adminUid: 'SYSTEM',
                targetUid: userId,
                ipAddress: undefined,
                details: { referenceId, paymentId: payment.id },
              });

              for (const item of payment.paymentItems_on_payment) {
                if (item.targetType === 'COURSE' && item.courseId) {
                  await this.dataConnectService.executeMutationAsAdmin(
                    'EnrollInCourse',
                    {
                      courseId: item.courseId,
                      userId: userId,
                    },
                  );
                  console.log(
                    `Enrolled user ${userId} in course ${item.courseId}`,
                  );

                  // Audit Log: Enrollment
                  this.auditLoggingService.createLog({
                    action: 'ENROLLMENT_CREATED',
                    adminUid: 'SYSTEM',
                    targetUid: userId,
                    ipAddress: undefined,
                    details: { courseId: item.courseId, type: 'COURSE' },
                  });
                } else if (item.targetType === 'MISSION' && item.missionId) {
                  await this.dataConnectService.executeMutationAsAdmin(
                    'EnrollInMission',
                    {
                      missionId: item.missionId,
                      userId: userId,
                    },
                  );
                  console.log(
                    `Enrolled user ${userId} in mission ${item.missionId}`,
                  );

                  // Audit Log: Enrollment
                  this.auditLoggingService.createLog({
                    action: 'ENROLLMENT_CREATED',
                    adminUid: 'SYSTEM',
                    targetUid: userId,
                    ipAddress: undefined,
                    details: { missionId: item.missionId, type: 'MISSION' },
                  });
                }
              }
            }
          } else {
            // Audit Log: Payment Failed
            this.auditLoggingService.createLog({
              action: 'PAYMENT_FAILED',
              adminUid: 'SYSTEM',
              targetUid: null,
              ipAddress: undefined,
              details: { referenceId },
            });
          }
        } catch (error) {
          console.error('Failed to process payment webhook:', error);
        }
      }
    } else {
      console.log('Other event type received:', body.type);
    }

    // Always return 200 to acknowledge receipt to Paymob
    return { success: true };
  }

  // Success/Fail redirect URL for the user browser to return to
  @Get('callback')
  async handleBrowserCallback(@Query() query: any, @Res() res: Response) {
    const defaultFrontendUrl =
      process.env.FRONTEND_URL || 'http://localhost:3000';
    const frontendUrl = query.returnUrl || defaultFrontendUrl;

    // Paymob redirects back here after payment
    if (query.success === 'true' || query.success === true) {
      return res.redirect(`${frontendUrl}/payment-success`);
    } else {
      return res.redirect(`${frontendUrl}/payment-failed`);
    }
  }
}
