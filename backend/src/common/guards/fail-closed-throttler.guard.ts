import {
  HttpException,
  Injectable,
  Logger,
  ServiceUnavailableException,
} from '@nestjs/common';
import { ThrottlerGuard } from '@nestjs/throttler';

/**
 * Fail-closed wrapper around ThrottlerGuard.
 *
 * If the Redis-backed storage is unreachable (or any error occurs while
 * checking the rate limit), this guard throws 503 Service Unavailable
 * instead of letting the request pass through.
 *
 * Security rationale: it is safer to deny legitimate traffic temporarily
 * than to allow unthrottled traffic (e.g. during a DDoS or brute-force).
 */
@Injectable()
export class FailClosedThrottlerGuard extends ThrottlerGuard {
  private readonly logger = new Logger(FailClosedThrottlerGuard.name);

  protected async handleRequest(context: any): Promise<boolean> {
    try {
      return await super.handleRequest(context);
    } catch (error) {
      // If the error is a ThrottlerException (429), re-throw it as-is.
      // We only intercept infrastructure errors (Redis down, etc.).
      const errorMessage =
        error instanceof Error ? error.message : String(error);

      // The throttler throws a ThrottlerException (HttpException with
      // status 429) when the limit is exceeded. Let that propagate normally.
      if (error instanceof HttpException && error.getStatus() === 429) {
        throw error;
      }

      // Any other error (Redis connection refused, timeout, etc.) → fail-closed.
      this.logger.error(
        `Rate limiter storage error — failing closed (503): ${errorMessage}`,
      );
      throw new ServiceUnavailableException(
        'Rate limiter unavailable. Please try again later.',
      );
    }
  }

  protected async getTracker(req: Record<string, any>): Promise<string> {
    return req.user?.uid || req.ip || 'unknown-ip';
  }
}
