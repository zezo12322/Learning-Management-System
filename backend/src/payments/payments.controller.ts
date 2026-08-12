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
      } else if (item.targetType === 'SUBSCRIPTION') {
        throw new HttpException(
          'Subscriptions are not yet enabled for purchase.',
          HttpStatus.BAD_REQUEST,
        );
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
      void this.auditLoggingService.createLog({
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

  /**
   * Paymob server-to-server webhook.
   *
   * This route is deliberately unauthenticated — Paymob calls it, not a user —
   * so **the HMAC is the only thing standing between a stranger and the
   * enrollment mutations below**, all of which run as the service account.
   *
   * It previously admitted `type: 'INTENTION'` alongside `'TRANSACTION'` while
   * nesting the signature check inside the `'TRANSACTION'` branch. An
   * `INTENTION` body therefore reached the privileged path with no verification
   * at all, and both the status (`obj.success`) and the payment it applies to
   * (`obj.intention_id`) come straight from that body. Anyone who knew a
   * `referenceId` — which `MyPaymentHistory` hands a user for their own pending
   * payment — could flip it to COMPLETED and be enrolled without paying, or
   * flip someone else's to FAILED.
   *
   * `TRANSACTION` is the event that represents money actually moving and is the
   * only one this handler ever acted on meaningfully, so it is now the only one
   * accepted, and its signature is verified before anything else happens.
   * Other event types are acknowledged so Paymob stops retrying, and ignored.
   *
   * If INTENTION callbacks are ever needed, they need their own verifier —
   * Paymob does not sign them with the transaction field set used here.
   */
  @Post('webhook')
  @Throttle({ default: { ttl: 60000, limit: 60 } })
  async handleWebhook(@Body() body: any, @Query('hmac') hmac: string) {
    if (body?.type === 'TRANSACTION') {
      // 1. Verify HMAC for security — unconditionally, before reading anything
      //    else out of the body.
      const isValid = this.paymentsService.verifyHmac(hmac, body.obj);
      if (!isValid) {
        throw new UnauthorizedException('Invalid HMAC signature');
      }

      // PaymentStatus enum only has PENDING/COMPLETED/FAILED/REFUNDED — a
      // 'SUCCESS' literal is rejected by Data Connect enum validation.
      const status = body.obj.success ? 'COMPLETED' : 'FAILED';
      // ONLY use order.id (which is signed) instead of intention_id (which is unsigned)
      const referenceId = body.obj.order?.id?.toString();

      if (referenceId) {
        try {
          // 2. Fetch payment FIRST to verify amount and idempotency
          const paymentDetails: any =
            await this.dataConnectService.executeQueryAsAdmin(
              'GetPaymentDetailsByReference',
              { referenceId },
            );

          const payment = paymentDetails?.payments?.[0];
          if (!payment) {
            console.error('Webhook received for unknown payment reference:', referenceId);
            return { success: true };
          }

          // 3. Check idempotency/state machine
          if (payment.status === 'COMPLETED' || payment.status === 'REFUNDED') {
            console.log(`Webhook ignored: payment ${referenceId} is already ${payment.status}`);
            return { success: true };
          }

          // 4. Verify amount_cents matches the stored payment
          const receivedAmount = body.obj.amount_cents;
          if (receivedAmount !== undefined && payment.amount !== receivedAmount) {
            console.error(`Amount mismatch for ${referenceId}: expected ${payment.amount}, got ${receivedAmount}`);
            void this.auditLoggingService.createLog({
              action: 'PAYMENT_FAILED',
              adminUid: 'SYSTEM',
              targetUid: payment.userId,
              ipAddress: undefined,
              details: { referenceId, reason: 'AMOUNT_MISMATCH' },
            });
            return { success: true };
          }

          // 5. Update payment status
          await this.dataConnectService.executeMutationAsAdmin(
            'UpdatePaymentStatusByReference',
            { referenceId, status },
          );
          console.log(`Payment status updated to ${status} for reference:`, referenceId);

          // 6. If successful, enroll the user
          if (status === 'COMPLETED' && payment.paymentItems_on_payment) {
            const userId = payment.userId;

            // Audit Log: Payment Successful
            void this.auditLoggingService.createLog({
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
                  { courseId: item.courseId, userId },
                );
                console.log(`Enrolled user ${userId} in course ${item.courseId}`);

                void this.auditLoggingService.createLog({
                  action: 'ENROLLMENT_CREATED',
                  adminUid: 'SYSTEM',
                  targetUid: userId,
                  ipAddress: undefined,
                  details: { courseId: item.courseId, type: 'COURSE' },
                });
              } else if (item.targetType === 'MISSION' && item.missionId) {
                await this.dataConnectService.executeMutationAsAdmin(
                  'EnrollInMission',
                  { missionId: item.missionId, userId },
                );
                console.log(`Enrolled user ${userId} in mission ${item.missionId}`);

                void this.auditLoggingService.createLog({
                  action: 'ENROLLMENT_CREATED',
                  adminUid: 'SYSTEM',
                  targetUid: userId,
                  ipAddress: undefined,
                  details: { missionId: item.missionId, type: 'MISSION' },
                });
              }
            }
          } else if (status === 'FAILED') {
            // Audit Log: Payment Failed
            void this.auditLoggingService.createLog({
              action: 'PAYMENT_FAILED',
              adminUid: 'SYSTEM',
              targetUid: payment.userId,
              ipAddress: undefined,
              details: { referenceId },
            });
          }
        } catch (error) {
          console.error('Failed to process payment webhook:', error);
        }
      }
    } else {
      // Acknowledged and ignored. Anything that is not a signed TRANSACTION —
      // including INTENTION — lands here and touches nothing.
      console.log('Unhandled webhook event type received:', body?.type);
    }

    // Always return 200 to acknowledge receipt to Paymob
    return { success: true };
  }

  /**
   * Browser redirect target after payment.
   *
   * `returnUrl` used to be taken from the query string and redirected to
   * verbatim, which made this an open redirect on an unauthenticated route —
   * and one attached to a payment flow, where a link that genuinely starts on
   * the real domain and ends on an attacker's "payment failed, re-enter your
   * card" page is about as convincing as phishing gets.
   *
   * It is now honoured only when it points at an origin the app already trusts
   * for CORS, and falls back to the configured frontend otherwise.
   */
  @Get('callback')
  async handleBrowserCallback(@Query() query: any, @Res() res: Response) {
    const defaultFrontendUrl =
      process.env.FRONTEND_URL || 'http://localhost:3000';
    const frontendUrl = this.resolveReturnUrl(
      query.returnUrl,
      defaultFrontendUrl,
    );

    // Paymob redirects back here after payment
    if (query.success === 'true' || query.success === true) {
      return res.redirect(`${frontendUrl}/payment-success`);
    } else {
      return res.redirect(`${frontendUrl}/payment-failed`);
    }
  }

  /**
   * Allows a caller-supplied return URL only when its origin is one the app
   * already trusts — the configured frontend, anything listed in
   * `CORS_ORIGINS`, or localhost for development (the same set `main.ts`
   * accepts as a CORS origin).
   */
  private resolveReturnUrl(candidate: unknown, fallback: string): string {
    if (typeof candidate !== 'string' || !candidate) return fallback;

    let origin: string;
    try {
      origin = new URL(candidate).origin;
    } catch {
      // Not an absolute URL — including protocol-relative `//evil.example`,
      // which `URL` rejects without a base and which a bare string concat
      // would have happily redirected to.
      return fallback;
    }

    const allowed = new Set(
      (process.env.CORS_ORIGINS ?? '')
        .split(',')
        .map((entry) => entry.trim())
        .filter(Boolean)
        .concat(fallback)
        .map((entry) => {
          try {
            return new URL(entry).origin;
          } catch {
            return '';
          }
        })
        .filter(Boolean),
    );

    const isLocalhost = /^https?:\/\/(localhost|127\.0\.0\.1)(:\d+)?$/.test(
      origin,
    );

    return allowed.has(origin) || isLocalhost ? candidate : fallback;
  }
}
