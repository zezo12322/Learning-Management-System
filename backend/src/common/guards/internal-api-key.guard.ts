import {
  CanActivate,
  ExecutionContext,
  Injectable,
  Logger,
  ServiceUnavailableException,
  UnauthorizedException,
} from '@nestjs/common';
import { createHash, timingSafeEqual } from 'crypto';

/**
 * Authorizes service-to-service calls carrying `X-Internal-Api-Key`.
 *
 * Used only by routes the sales agent calls (live pricing lookups). No end user
 * ever reaches them, so a rotatable shared secret is the right amount of
 * machinery — Firebase ID tokens belong to people, and the caller here is a
 * process.
 *
 * Two deliberate properties:
 *
 * - **Fail-closed on missing config.** An unset `SALES_INTERNAL_API_KEY` makes
 *   every request 503, never "allow". A guard that waves calls through when its
 *   secret is absent is the same as no guard, and the failure is silent.
 * - **Constant-time comparison.** `===` on a secret leaks its prefix to anyone
 *   patient enough to time the responses.
 */
@Injectable()
export class InternalApiKeyGuard implements CanActivate {
  private readonly logger = new Logger(InternalApiKeyGuard.name);

  canActivate(ctx: ExecutionContext): boolean {
    const expected = process.env.SALES_INTERNAL_API_KEY;
    if (!expected) {
      this.logger.error(
        'SALES_INTERNAL_API_KEY is not configured; refusing internal requests',
      );
      throw new ServiceUnavailableException(
        'Internal API is not configured on this deployment.',
      );
    }

    const request = ctx.switchToHttp().getRequest();
    const provided =
      request.headers?.['x-internal-api-key'] ??
      request.headers?.['X-Internal-Api-Key'];

    if (typeof provided !== 'string' || !this.matches(provided, expected)) {
      throw new UnauthorizedException(
        'Missing or invalid X-Internal-Api-Key header.',
      );
    }
    return true;
  }

  private matches(provided: string, expected: string): boolean {
    // Compare SHA-256 digests rather than the raw strings: timingSafeEqual
    // throws on a length mismatch, and short-circuiting on length would itself
    // leak how long the real key is. Digests are always 32 bytes.
    const a = createHash('sha256').update(provided).digest();
    const b = createHash('sha256').update(expected).digest();
    return timingSafeEqual(a, b);
  }
}
