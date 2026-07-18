import {
  BadRequestException,
  Injectable,
  Logger,
  NotFoundException,
  ServiceUnavailableException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { v4 as uuidv4 } from 'uuid';
import { DataConnectService } from '../firebase/dataconnect.service';
import { PaymobService } from './paymob.service';
import { CheckoutDto, CheckoutTarget } from './dto/checkout.dto';

/**
 * Payment orchestration for one-off course/mission purchases via Paymob.
 *
 * Checkout (authenticated user):
 *   1. Resolve the target (course/mission) and its price server-side — the
 *      client never dictates the amount.
 *   2. Log a PENDING Payment (+ PaymentItem) via the service-account admin path
 *      so the row is trustworthy (clients cannot fabricate payment rows).
 *   3. Create a Paymob intention keyed by our unique `reference` and return the
 *      hosted-checkout URL.
 *
 * Webhook (Paymob → us, HMAC-verified in the controller):
 *   4. Look the Payment up by `reference`, flip it to COMPLETED/FAILED, and on
 *      success activate the corresponding enrollment (as the service account).
 *
 * Entitlement is never granted from the client's return redirect — only the
 * server-verified webhook activates access.
 */
@Injectable()
export class PaymentsService {
  private readonly logger = new Logger(PaymentsService.name);
  private readonly apiPublicUrl: string;
  private readonly webPublicUrl: string;

  constructor(
    private readonly dc: DataConnectService,
    private readonly paymob: PaymobService,
    config: ConfigService,
  ) {
    this.apiPublicUrl = config
      .get<string>('API_PUBLIC_URL', 'http://localhost:3000')
      .replace(/\/+$/, '');
    this.webPublicUrl = config
      .get<string>('WEB_PUBLIC_URL', 'http://localhost:3000')
      .replace(/\/+$/, '');
  }

  /** Initiate a checkout and return the URL the client should open. */
  async createCheckout(
    dto: CheckoutDto,
    authToken: string,
    user: { uid: string; email?: string; name?: string },
  ): Promise<{ reference: string; checkoutUrl: string }> {
    if (!this.paymob.isConfigured()) {
      throw new ServiceUnavailableException('Payments are not configured');
    }

    const { title, priceMajorUnits } = await this.resolveTarget(dto);
    if (priceMajorUnits <= 0) {
      // Free targets should use the ordinary /enroll path, not checkout.
      throw new BadRequestException('This item is free — enroll directly');
    }

    const reference = uuidv4();
    const paymentId = uuidv4(); // set explicitly so we can link the line item
    const amountCents = Math.round(priceMajorUnits * 100);
    const email = user.email ?? '';
    const { firstName, lastName } = splitName(user.name);

    // 2) Persist a PENDING payment + line item as the service account. The
    //    payment id is generated here so the item can reference it without an
    //    extra read-back round-trip.
    await this.dc.executeMutationAsAdmin('LogPaymentAdmin', {
      id: paymentId,
      userId: user.uid,
      gateway: 'PAYMOB',
      referenceId: reference,
      amount: amountCents,
      currency: 'EGP',
      customerEmailSnapshot: email,
    });
    await this.dc.executeMutationAsAdmin('AddPaymentItemAdmin', {
      paymentId,
      targetType: dto.targetType,
      courseId: dto.courseId ?? null,
      price: amountCents,
    });

    // 3) Create the intention with Paymob.
    let checkoutUrl: string;
    try {
      const intention = await this.paymob.createIntention({
        amountCents,
        currency: 'EGP',
        reference,
        itemName: title.slice(0, 120),
        itemDescription: `${dto.targetType} purchase`,
        billing: { firstName, lastName, email, phone: '' },
        notificationUrl: `${this.apiPublicUrl}/api/v1/payments/webhook`,
        redirectionUrl: `${this.webPublicUrl}/payments/return?ref=${reference}`,
      });
      checkoutUrl = intention.checkoutUrl;
    } catch (err: any) {
      // Roll the pending row forward to FAILED so it is not left dangling.
      await this.markPayment(reference, 'FAILED').catch(() => undefined);
      this.logger.error(`Checkout failed for ${reference}: ${err?.message}`);
      throw new ServiceUnavailableException('Could not start payment');
    }

    return { reference, checkoutUrl };
  }

  /**
   * Process an already-HMAC-verified Paymob transaction object. Idempotent: a
   * replayed callback for an already-finalized payment is a no-op.
   */
  async processVerifiedWebhook(obj: Record<string, any>): Promise<void> {
    const reference: string | undefined = obj?.order?.merchant_order_id;
    if (!reference) {
      this.logger.warn('Webhook missing merchant_order_id; ignoring');
      return;
    }

    const success = obj?.success === true && obj?.error_occured !== true;

    const paymentData = await this.dc
      .executeQueryAsAdmin('GetPaymentByReferenceAdmin', { referenceId: reference })
      .catch(() => null);
    const payment = paymentData?.payments?.[0];
    if (!payment) {
      this.logger.warn(`Webhook for unknown reference ${reference}; ignoring`);
      return;
    }
    if (payment.status === 'COMPLETED') {
      return; // already finalized — idempotent replay
    }

    if (!success) {
      await this.markPayment(reference, 'FAILED');
      this.logger.log(`Payment ${reference} marked FAILED`);
      return;
    }

    await this.markPayment(reference, 'COMPLETED');

    // Activate the entitlement bought by this payment (course purchases only).
    const item = payment.paymentItems?.[0];
    const userId = payment.user?.id;
    try {
      if (item?.targetType === 'COURSE' && item.course?.id && userId) {
        await this.dc.executeMutationAsAdmin('EnrollInCourse', {
          courseId: item.course.id,
          userId,
        });
        this.logger.log(
          `Payment ${reference} COMPLETED and course enrollment activated`,
        );
      } else {
        this.logger.warn(
          `Payment ${reference} COMPLETED but has no course line item to activate`,
        );
      }
    } catch (err: any) {
      // Payment is captured; surface the activation failure for reconciliation.
      this.logger.error(
        `Payment ${reference} completed but enrollment activation failed: ${err?.message}`,
      );
    }
  }

  private async markPayment(
    reference: string,
    status: 'COMPLETED' | 'FAILED',
  ): Promise<void> {
    await this.dc.executeMutationAsAdmin('UpdatePaymentStatusAdmin', {
      referenceId: reference,
      status,
    });
  }

  /**
   * Resolve the paid target's title + price, validating it is purchasable.
   * Only COURSE is supported: the schema prices courses (Course.price) but not
   * missions, so mission checkout has no amount to charge.
   */
  private async resolveTarget(
    dto: CheckoutDto,
  ): Promise<{ title: string; priceMajorUnits: number }> {
    if (dto.targetType !== CheckoutTarget.COURSE) {
      throw new BadRequestException(
        'Only course purchases are supported at the moment',
      );
    }
    if (!dto.courseId) {
      throw new BadRequestException('courseId is required for a course purchase');
    }
    const data = await this.dc.executeQueryAsAdmin('GetCourseForPaymentAdmin', {
      courseId: dto.courseId,
    });
    const course = data?.course;
    if (!course || course.deletedAt) {
      throw new NotFoundException(`Course ${dto.courseId} not found`);
    }
    if (course.status !== 'PUBLISHED') {
      throw new BadRequestException('Course is not open for enrollment');
    }
    return { title: course.title ?? 'Course', priceMajorUnits: course.price ?? 0 };
  }
}

/** Best-effort split of a display name into first/last for billing data. */
function splitName(name?: string): { firstName: string; lastName: string } {
  const trimmed = (name ?? '').trim();
  if (!trimmed) {
    return { firstName: 'NA', lastName: 'NA' };
  }
  const parts = trimmed.split(/\s+/);
  if (parts.length === 1) {
    return { firstName: parts[0], lastName: 'NA' };
  }
  return { firstName: parts[0], lastName: parts.slice(1).join(' ') };
}
