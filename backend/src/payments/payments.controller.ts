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
} from '@nestjs/common';
import { Throttle } from '@nestjs/throttler';
import { PaymentsService } from './payments.service';
import type { Response } from 'express';
import { AuthToken } from '../common/decorators/auth-token.decorator';
import { FirebaseAuthGuard } from '../common/guards/firebase-auth.guard';
import { DataConnectService } from '../firebase/dataconnect.service';

@Controller('payments')
export class PaymentsController {
  constructor(
    private readonly paymentsService: PaymentsService,
    private readonly dataConnectService: DataConnectService,
  ) {}

  // Strict rate limit: 5 checkout requests per 60 seconds (payment abuse protection).
  @Post('checkout')
  @UseGuards(FirebaseAuthGuard)
  @Throttle({ default: { ttl: 60000, limit: 5 } })
  async checkout(
    @Body() body: any,
    @Res() res: Response,
    @AuthToken() userAuthToken: string,
  ) {
    // Expected to receive amount and user details for checkout
    const amountCents = body.amountCents || 10000; // default 100 EGP for testing
    const items = body.items || [];

    // Paymob requires all these fields
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
      const checkoutUrl = await this.paymentsService.generateCheckoutUrl(
        amountCents,
        items,
        billingData,
        userAuthToken,
      );

      // Redirect user directly to the Paymob hosted checkout page
      return res.redirect(HttpStatus.FOUND, checkoutUrl);
    } catch (error) {
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        message: 'Failed to initiate payment',
        error: error.message,
      });
    }
  }

  // Paymob Server-to-Server webhook callback
  @Post('webhook')
  async handleWebhook(@Body() body: any, @Query('hmac') hmac: string) {
    if (body.type === 'TRANSACTION' || body.type === 'INTENTION') {
      // 1. Verify HMAC for security
      if (body.type === 'TRANSACTION') {
        const isValid = this.paymentsService.verifyHmac(hmac, body.obj);
        if (!isValid) {
          throw new UnauthorizedException('Invalid HMAC signature');
        }
      }

      const status = body.obj.success ? 'SUCCESS' : 'FAILED';
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
          if (status === 'SUCCESS') {
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
                }
              }
            }
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
    const frontendUrl = process.env.FRONTEND_URL || 'http://localhost:3000';

    // Paymob redirects back here after payment
    if (query.success === 'true' || query.success === true) {
      return res.redirect(`${frontendUrl}/payment-success`);
    } else {
      return res.redirect(`${frontendUrl}/payment-failed`);
    }
  }
}
