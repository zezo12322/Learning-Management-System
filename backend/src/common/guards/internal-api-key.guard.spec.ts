import {
  ServiceUnavailableException,
  UnauthorizedException,
} from '@nestjs/common';
import { InternalApiKeyGuard } from './internal-api-key.guard';

function ctxFor(headers: Record<string, unknown>) {
  return {
    switchToHttp: () => ({ getRequest: () => ({ headers }) }),
  } as any;
}

describe('InternalApiKeyGuard', () => {
  const originalKey = process.env.SALES_INTERNAL_API_KEY;
  let guard: InternalApiKeyGuard;

  beforeEach(() => {
    guard = new InternalApiKeyGuard();
    process.env.SALES_INTERNAL_API_KEY = 'correct-horse-battery-staple';
  });

  afterAll(() => {
    if (originalKey === undefined) {
      delete process.env.SALES_INTERNAL_API_KEY;
    } else {
      process.env.SALES_INTERNAL_API_KEY = originalKey;
    }
  });

  it('allows a request carrying the configured key', () => {
    const ctx = ctxFor({
      'x-internal-api-key': 'correct-horse-battery-staple',
    });
    expect(guard.canActivate(ctx)).toBe(true);
  });

  it('rejects a wrong key', () => {
    const ctx = ctxFor({ 'x-internal-api-key': 'nope' });
    expect(() => guard.canActivate(ctx)).toThrow(UnauthorizedException);
  });

  it('rejects a missing header', () => {
    expect(() => guard.canActivate(ctxFor({}))).toThrow(UnauthorizedException);
  });

  it('rejects a non-string header value', () => {
    const ctx = ctxFor({ 'x-internal-api-key': ['a', 'b'] });
    expect(() => guard.canActivate(ctx)).toThrow(UnauthorizedException);
  });

  // Regression: an unset secret must never be read as "no check required". A
  // guard that allows everything when unconfigured is the same as no guard, and
  // it fails silently.
  it('fails closed when the secret is not configured', () => {
    delete process.env.SALES_INTERNAL_API_KEY;
    const ctx = ctxFor({ 'x-internal-api-key': 'anything' });
    expect(() => guard.canActivate(ctx)).toThrow(ServiceUnavailableException);
  });

  it('fails closed when the secret is an empty string', () => {
    process.env.SALES_INTERNAL_API_KEY = '';
    const ctx = ctxFor({ 'x-internal-api-key': '' });
    expect(() => guard.canActivate(ctx)).toThrow(ServiceUnavailableException);
  });

  // A prefix of the real key must be rejected, and the comparison must not
  // short-circuit on length — hence digest comparison rather than raw buffers.
  it('rejects a prefix of the real key', () => {
    const ctx = ctxFor({ 'x-internal-api-key': 'correct-horse' });
    expect(() => guard.canActivate(ctx)).toThrow(UnauthorizedException);
  });

  it('rejects a longer string that starts with the real key', () => {
    const ctx = ctxFor({
      'x-internal-api-key': 'correct-horse-battery-staple-extra',
    });
    expect(() => guard.canActivate(ctx)).toThrow(UnauthorizedException);
  });
});
