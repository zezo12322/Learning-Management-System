import { Injectable, Logger, HttpException, HttpStatus } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { DataConnectService } from '../firebase/dataconnect.service';
import * as crypto from 'crypto';

@Injectable()
export class PaymentsService {
  private readonly logger = new Logger(PaymentsService.name);
  private readonly baseUrl = 'https://accept.paymob.com/v1';

  constructor(
    private readonly configService: ConfigService,
    private readonly dataConnectService: DataConnectService,
  ) {}

  async generateCheckoutUrl(
    amountCents: number,
    items: any[],
    billingData: any,
    userAuthToken: string,
    userId: string,
    returnUrl?: string,
  ): Promise<string> {
    const secretKey = this.configService.get<string>('PAYMOB_SECRET_KEY');
    const publicKey = this.configService.get<string>('PAYMOB_PUBLIC_KEY');
    // If the boss sends multiple IDs, they can be separated by commas in .env
    const rawIntegrationIds = this.configService.get<string>(
      'PAYMOB_INTEGRATION_IDS',
      '',
    );
    const paymentMethods = rawIntegrationIds
      ? rawIntegrationIds.split(',').map((id) => Number(id.trim()))
      : [];

    if (!secretKey || !publicKey) {
      throw new HttpException(
        'Paymob Secret/Public keys are missing in configuration',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }

    // 1. Create the Intention via Paymob NextGen API
    const intentionBody: any = {
      amount: amountCents,
      currency: 'EGP',
      items: items,
      billing_data: billingData,
      customer: {
        first_name: billingData.first_name || 'Customer',
        last_name: billingData.last_name || 'Name',
        email: billingData.email || 'customer@example.com',
      },
    };

    const apiBaseUrl = this.configService
      .get<string>('API_PUBLIC_URL', 'http://localhost:3001')
      .replace(/\/+$/, '');
    const defaultFrontendUrl = this.configService.get<string>(
      'FRONTEND_URL',
      'http://localhost:3000',
    );
    const targetFrontendUrl = returnUrl || defaultFrontendUrl;

    // Dynamically set the callback URL so Paymob knows exactly where to redirect
    // the user after checkout, passing the correct frontend URL back to our backend.
    intentionBody.redirection_url = `${apiBaseUrl}/api/v1/payments/callback?returnUrl=${encodeURIComponent(targetFrontendUrl)}`;

    if (paymentMethods.length > 0) {
      intentionBody.payment_methods = paymentMethods;
    }

    const response = await fetch(`${this.baseUrl}/intention/`, {
      method: 'POST',
      headers: {
        Authorization: `Token ${secretKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(intentionBody),
    });

    const data = await response.json();

    if (!response.ok) {
      this.logger.error('Paymob Intention creation failed', data);
      throw new HttpException(
        'Failed to create payment intention',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }

    const clientSecret = data.client_secret;
    const intentionId = data.intention_id; // For reference/logging

    // 2. Log payment in Data Connect database (PENDING status).
    // IMPORTANT: if this fails we must abort — do NOT return the checkout URL.
    // Without a database record the webhook has nothing to look up, so the
    // user would pay on Paymob and never receive course access.
    try {
      const paymentRes = await this.dataConnectService.executeMutation(
        'LogPayment',
        {
          userId,
          gateway: 'PAYMOB',
          referenceId: intentionId.toString(),
          amount: amountCents,
          customerEmailSnapshot: billingData.email || 'unknown@example.com',
        },
        userAuthToken,
      );

      // payment_insert returns the row key ({ id }); older connector responses
      // returned the bare id — accept both shapes.
      const insertKey = paymentRes?.payment_insert;
      const paymentId = insertKey?.id ?? insertKey;

      // If we received items with targetType and ID, log them as well
      if (paymentId && Array.isArray(items)) {
        for (const item of items) {
          if (item.targetType && (item.courseId || item.missionId)) {
            await this.dataConnectService.executeMutationAsAdmin(
              'AddPaymentItem',
              {
                paymentId: paymentId,
                targetType: item.targetType,
                courseId: item.courseId || null,
                missionId: item.missionId || null,
                subscriptionTierId: item.subscriptionTierId || null,
                price: item.price || 0,
              },
            );
          }
        }
      }
    } catch (error) {
      this.logger.error(
        'Failed to log payment in database — aborting checkout to prevent orphaned payment',
        error,
      );
      // Re-throw so the controller returns a 500 and the client never gets
      // redirected to the Paymob checkout page. The Paymob intention was
      // already created but the user has not been charged yet.
      throw new HttpException(
        'Payment session could not be recorded. Please try again.',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }

    // 3. Return the Unified Checkout URL
    return `https://accept.paymob.com/unifiedcheckout/?publicKey=${publicKey}&clientSecret=${clientSecret}`;
  }

  /**
   * Verifies Paymob's HMAC over a transaction callback.
   *
   * Fails **closed**. This used to return `true` when `PAYMOB_HMAC_SECRET` was
   * unset — so a deploy that simply forgot the variable accepted any webhook
   * body from anyone, and the only trace was a warning in the log. A missing
   * secret is a misconfiguration, not a reason to trust an unsigned payment
   * notification.
   *
   * Operational note: if the secret is absent in an environment, paid
   * enrollment stops rather than silently running unauthenticated. That is the
   * intended failure direction, and the error below says exactly what to set.
   */
  verifyHmac(queryHmac: string, bodyObj: any): boolean {
    const hmacSecret = this.configService.get<string>('PAYMOB_HMAC_SECRET');
    if (!hmacSecret) {
      this.logger.error(
        'PAYMOB_HMAC_SECRET is not set — rejecting the webhook. Paid ' +
          'enrollment cannot complete until this variable is configured.',
      );
      return false;
    }

    if (!bodyObj || !queryHmac) return false;

    // Standard Paymob Transaction HMAC fields
    const {
      amount_cents,
      created_at,
      currency,
      error_occured,
      has_parent_transaction,
      id,
      integration_id,
      is_3d_secure,
      is_auth,
      is_capture,
      is_refunded,
      is_standalone_payment,
      is_voided,
      order,
      owner,
      pending,
      source_data,
      success,
    } = bodyObj;

    const dataString = [
      amount_cents,
      created_at,
      currency,
      error_occured,
      has_parent_transaction,
      id,
      integration_id,
      is_3d_secure,
      is_auth,
      is_capture,
      is_refunded,
      is_standalone_payment,
      is_voided,
      order?.id,
      owner,
      pending,
      source_data?.pan,
      source_data?.sub_type,
      source_data?.type,
      success,
    ]
      .map((v) => (v === undefined || v === null ? '' : String(v)))
      .join('');

    const hashed = crypto
      .createHmac('sha512', hmacSecret)
      .update(dataString)
      .digest('hex');

    // Constant-time compare. `===` on a hex digest leaks how many leading
    // characters matched through timing, which is enough to forge a signature
    // one character at a time given an endpoint that can be called repeatedly.
    const expected = Buffer.from(hashed, 'utf8');
    const received = Buffer.from(queryHmac, 'utf8');
    if (expected.length !== received.length) return false;
    return crypto.timingSafeEqual(expected, received);
  }
}
