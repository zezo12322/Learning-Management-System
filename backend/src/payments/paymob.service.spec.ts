import { createHmac } from 'crypto';
import { ConfigService } from '@nestjs/config';
import { PaymobService } from './paymob.service';

const HMAC_SECRET = 'test_hmac_secret';

function makeConfig(overrides: Record<string, string> = {}): ConfigService {
  const values: Record<string, string> = {
    PAYMOB_SECRET_KEY: 'egy_sk_test_x',
    PAYMOB_PUBLIC_KEY: 'egy_pk_test_x',
    PAYMOB_HMAC_SECRET: HMAC_SECRET,
    PAYMOB_INTEGRATION_IDS: '123,456',
    PAYMOB_BASE_URL: 'https://accept.paymob.com',
    ...overrides,
  };
  return {
    get: <T>(key: string, def?: T) => (values[key] ?? def) as T,
  } as unknown as ConfigService;
}

/** A representative Paymob transaction object (subset used for the HMAC). */
function sampleObj() {
  return {
    amount_cents: 10000,
    created_at: '2026-07-18T10:00:00.000000',
    currency: 'EGP',
    error_occured: false,
    has_parent_transaction: false,
    id: 999999,
    integration_id: 123,
    is_3d_secure: true,
    is_auth: false,
    is_capture: false,
    is_refunded: false,
    is_standalone_payment: true,
    is_voided: false,
    order: { id: 555, merchant_order_id: 'ref-abc' },
    owner: 42,
    pending: false,
    source_data: { pan: '2346', sub_type: 'MasterCard', type: 'card' },
    success: true,
  };
}

/** Recompute the HMAC exactly as Paymob documents it, for the test vector. */
function computeHmac(obj: ReturnType<typeof sampleObj>): string {
  const concatenated = [
    obj.amount_cents,
    obj.created_at,
    obj.currency,
    obj.error_occured,
    obj.has_parent_transaction,
    obj.id,
    obj.integration_id,
    obj.is_3d_secure,
    obj.is_auth,
    obj.is_capture,
    obj.is_refunded,
    obj.is_standalone_payment,
    obj.is_voided,
    obj.order.id,
    obj.owner,
    obj.pending,
    obj.source_data.pan,
    obj.source_data.sub_type,
    obj.source_data.type,
    obj.success,
  ]
    .map((v) => (typeof v === 'boolean' ? String(v) : String(v)))
    .join('');
  return createHmac('sha512', HMAC_SECRET).update(concatenated, 'utf8').digest('hex');
}

describe('PaymobService.verifyWebhookHmac', () => {
  let service: PaymobService;

  beforeEach(() => {
    service = new PaymobService(makeConfig());
  });

  it('accepts a correctly-signed transaction object', () => {
    const obj = sampleObj();
    expect(service.verifyWebhookHmac(obj, computeHmac(obj))).toBe(true);
  });

  it('is case-insensitive on the received hex digest', () => {
    const obj = sampleObj();
    expect(service.verifyWebhookHmac(obj, computeHmac(obj).toUpperCase())).toBe(
      true,
    );
  });

  it('rejects a tampered amount (signature no longer matches)', () => {
    const obj = sampleObj();
    const good = computeHmac(obj);
    obj.amount_cents = 1; // attacker lowers the amount after signing
    expect(service.verifyWebhookHmac(obj, good)).toBe(false);
  });

  it('rejects a forged/garbage hmac', () => {
    const obj = sampleObj();
    expect(service.verifyWebhookHmac(obj, 'deadbeef')).toBe(false);
  });

  it('rejects when the hmac is empty', () => {
    const obj = sampleObj();
    expect(service.verifyWebhookHmac(obj, '')).toBe(false);
  });

  it('fails closed when no HMAC secret is configured', () => {
    const unconfigured = new PaymobService(
      makeConfig({ PAYMOB_HMAC_SECRET: '' }),
    );
    const obj = sampleObj();
    expect(unconfigured.verifyWebhookHmac(obj, computeHmac(obj))).toBe(false);
  });

  it('treats booleans and nested paths correctly (order.id / source_data.*)', () => {
    // A different success flag must change the signature.
    const obj = sampleObj();
    const sig = computeHmac(obj);
    obj.success = false;
    expect(service.verifyWebhookHmac(obj, sig)).toBe(false);
  });
});

describe('PaymobService.isConfigured', () => {
  it('is true when all secrets are present', () => {
    expect(new PaymobService(makeConfig()).isConfigured()).toBe(true);
  });

  it('is false when a secret is missing', () => {
    expect(
      new PaymobService(makeConfig({ PAYMOB_SECRET_KEY: '' })).isConfigured(),
    ).toBe(false);
  });
});
