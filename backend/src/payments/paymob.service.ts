import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { createHmac, timingSafeEqual } from 'crypto';

/**
 * Thin client for Paymob (Accept) Egypt — the Unified Intention API + the
 * webhook HMAC verification used to trust the "transaction processed" callback.
 *
 * SECRETS: every credential is read from the environment (never hard-coded and
 * never committed). Configure them out-of-band (a secrets manager / untracked
 * .env), see backend/.env.example:
 *   - PAYMOB_SECRET_KEY      (egy_sk_live_… / egy_sk_test_…)  — server-only
 *   - PAYMOB_PUBLIC_KEY      (egy_pk_live_… / egy_pk_test_…)  — safe on client
 *   - PAYMOB_HMAC_SECRET     — verifies webhook authenticity   — server-only
 *   - PAYMOB_INTEGRATION_IDS — comma-separated payment integration ids
 *   - PAYMOB_BASE_URL        — defaults to https://accept.paymob.com
 *
 * If any of the three secrets are unset the service fails LOUD (both in logs at
 * boot and by throwing on use) rather than silently issuing/accepting bad
 * payments — payments are money, so this deliberately fails closed.
 */
export interface PaymobBillingData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
}

export interface CreateIntentionParams {
  /** Amount in the smallest currency unit (piastres for EGP). */
  amountCents: number;
  currency: string;
  /** Our own unique reference; becomes the order's merchant_order_id. */
  reference: string;
  itemName: string;
  itemDescription: string;
  billing: PaymobBillingData;
  notificationUrl: string;
  redirectionUrl: string;
}

export interface CreateIntentionResult {
  clientSecret: string;
  checkoutUrl: string;
}

/**
 * The exact ordered field list Paymob concatenates to compute the callback
 * HMAC (SHA-512). Order is significant and must not change.
 * @see https://developers.paymob.com/egypt/manage-callback/hmac-calculation
 */
const HMAC_FIELD_ORDER = [
  'amount_cents',
  'created_at',
  'currency',
  'error_occured',
  'has_parent_transaction',
  'id',
  'integration_id',
  'is_3d_secure',
  'is_auth',
  'is_capture',
  'is_refunded',
  'is_standalone_payment',
  'is_voided',
  'order.id',
  'owner',
  'pending',
  'source_data.pan',
  'source_data.sub_type',
  'source_data.type',
  'success',
] as const;

@Injectable()
export class PaymobService {
  private readonly logger = new Logger(PaymobService.name);
  private readonly secretKey: string;
  private readonly publicKey: string;
  private readonly hmacSecret: string;
  private readonly integrationIds: number[];
  private readonly baseUrl: string;

  constructor(config: ConfigService) {
    this.secretKey = config.get<string>('PAYMOB_SECRET_KEY', '');
    this.publicKey = config.get<string>('PAYMOB_PUBLIC_KEY', '');
    this.hmacSecret = config.get<string>('PAYMOB_HMAC_SECRET', '');
    this.baseUrl = config
      .get<string>('PAYMOB_BASE_URL', 'https://accept.paymob.com')
      .replace(/\/+$/, '');
    this.integrationIds = config
      .get<string>('PAYMOB_INTEGRATION_IDS', '')
      .split(',')
      .map((s) => Number(s.trim()))
      .filter((n) => Number.isFinite(n) && n > 0);

    if (!this.secretKey || !this.publicKey || !this.hmacSecret) {
      this.logger.error(
        'Paymob is not fully configured (PAYMOB_SECRET_KEY / PAYMOB_PUBLIC_KEY / ' +
          'PAYMOB_HMAC_SECRET). Checkout and webhooks are disabled until set.',
      );
    }
  }

  /** True only when all mandatory secrets are present. */
  isConfigured(): boolean {
    return Boolean(this.secretKey && this.publicKey && this.hmacSecret);
  }

  private assertConfigured(): void {
    if (!this.isConfigured()) {
      throw new Error('Paymob is not configured');
    }
  }

  /**
   * Create a payment intention and return the hosted-checkout URL the client
   * should be redirected to. Uses the modern Unified Intention API (secret-key
   * auth), which matches the egy_sk_/egy_pk_ key format.
   */
  async createIntention(
    params: CreateIntentionParams,
  ): Promise<CreateIntentionResult> {
    this.assertConfigured();
    if (this.integrationIds.length === 0) {
      throw new Error('PAYMOB_INTEGRATION_IDS is not configured');
    }

    const body = {
      amount: params.amountCents,
      currency: params.currency,
      payment_methods: this.integrationIds,
      items: [
        {
          name: params.itemName,
          amount: params.amountCents,
          description: params.itemDescription,
          quantity: 1,
        },
      ],
      billing_data: {
        first_name: params.billing.firstName || 'NA',
        last_name: params.billing.lastName || 'NA',
        email: params.billing.email,
        phone_number: params.billing.phone || 'NA',
        // Paymob requires these keys to be present; 'NA' is its documented filler.
        apartment: 'NA',
        floor: 'NA',
        street: 'NA',
        building: 'NA',
        city: 'NA',
        country: 'EG',
        state: 'NA',
      },
      customer: {
        first_name: params.billing.firstName || 'NA',
        last_name: params.billing.lastName || 'NA',
        email: params.billing.email,
      },
      special_reference: params.reference,
      notification_url: params.notificationUrl,
      redirection_url: params.redirectionUrl,
    };

    const url = `${this.baseUrl}/v1/intention/`;
    let response: Response;
    try {
      response = await fetch(url, {
        method: 'POST',
        headers: {
          Authorization: `Token ${this.secretKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      });
    } catch (err: any) {
      this.logger.error(`Paymob intention network error: ${err?.message}`);
      throw new Error('Payment provider is unreachable');
    }

    if (!response.ok) {
      // Log the provider's detail server-side only; never surface it to the client.
      const detail = await response.text().catch(() => '');
      this.logger.error(
        `Paymob intention failed: ${response.status} ${detail.slice(0, 500)}`,
      );
      throw new Error('Failed to create payment intention');
    }

    const result: any = await response.json();
    const clientSecret: string | undefined = result?.client_secret;
    if (!clientSecret) {
      this.logger.error('Paymob intention response missing client_secret');
      throw new Error('Invalid payment provider response');
    }

    const checkoutUrl =
      `${this.baseUrl}/unifiedcheckout/?publicKey=` +
      `${encodeURIComponent(this.publicKey)}&clientSecret=` +
      `${encodeURIComponent(clientSecret)}`;

    return { clientSecret, checkoutUrl };
  }

  /**
   * Verify a webhook's authenticity. Recomputes the HMAC-SHA512 over the
   * documented ordered field set of `obj` and compares (constant-time) with the
   * `hmac` Paymob sent. Returns false on any mismatch/malformed input — the
   * caller must reject unverified callbacks.
   */
  verifyWebhookHmac(obj: Record<string, any>, receivedHmac: string): boolean {
    if (!this.hmacSecret || !obj || !receivedHmac) {
      return false;
    }

    const concatenated = HMAC_FIELD_ORDER.map((path) =>
      this.stringifyField(this.readPath(obj, path)),
    ).join('');

    const expected = createHmac('sha512', this.hmacSecret)
      .update(concatenated, 'utf8')
      .digest('hex');

    const a = Buffer.from(expected, 'utf8');
    const b = Buffer.from(String(receivedHmac).trim().toLowerCase(), 'utf8');
    if (a.length !== b.length) {
      return false;
    }
    return timingSafeEqual(a, b);
  }

  /** Read a dotted path (e.g. "order.id" / "source_data.pan") from an object. */
  private readPath(obj: Record<string, any>, path: string): unknown {
    return path
      .split('.')
      .reduce<any>((acc, key) => (acc == null ? undefined : acc[key]), obj);
  }

  /**
   * Serialize a field the way Paymob does when building the HMAC string:
   * booleans as "true"/"false", null/undefined as empty string, others as-is.
   */
  private stringifyField(value: unknown): string {
    if (value === null || value === undefined) {
      return '';
    }
    if (typeof value === 'boolean') {
      return value ? 'true' : 'false';
    }
    return String(value);
  }
}
