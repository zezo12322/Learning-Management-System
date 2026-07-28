import {
  CallHandler,
  ExecutionContext,
  HttpStatus,
  Injectable,
  Logger,
  NestInterceptor,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { safeRequestPath } from '../utils/request-log';
import { ErrorRateMonitor } from '../alerting/error-rate.monitor';

/**
 * Per-request access log (KAN-60): one line per completed request with method,
 * path, response status and latency.
 *
 * Thrown failures are logged by AllExceptionsFilter (with the stack), so this
 * normally records the success path and adds no duplicate line. The exception is
 * a handler that builds its own 5xx response instead of throwing (the @Res()
 * payment routes do) — nothing reaches the filter, so those are logged at `error`
 * level here to keep them visible to the runbook's error greps.
 *
 * Health probes are skipped: Railway's healthcheck, an external uptime monitor
 * and the deploy verification loop would otherwise bury real traffic in the
 * drain the runbook tells operators to grep. Matched by suffix so the skip
 * survives a global-prefix change and a monitor configured with a trailing slash.
 *
 * Readiness is silenced here rather than logged as a 5xx (KAN-147): a monitor
 * polling a degraded instance would emit an error line every few seconds.
 * HealthService logs readiness once per status *transition* instead.
 */
const SILENT_ROUTES = ['/health', '/health/ready'];

function isSilent(path: string): boolean {
  const normalized = path.endsWith('/') ? path.slice(0, -1) : path;
  return SILENT_ROUTES.some((route) => normalized.endsWith(route));
}

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  private readonly logger = new Logger('HTTP');

  constructor(private readonly errorRate: ErrorRateMonitor) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<unknown> {
    const http = context.switchToHttp();
    const request = http.getRequest<Request>();
    const path = safeRequestPath(request);

    // Health probes are excluded from the error-rate denominator as well as the
    // log: a monitor polling every 5s would otherwise dominate the window and
    // dilute a real spike in user traffic into nothing.
    if (isSilent(path)) return next.handle();

    const { method } = request;
    const startedAt = Date.now();

    return next.handle().pipe(
      tap(() => {
        const status = http.getResponse<Response>().statusCode;
        // Denominator for the error-rate alarm. Thrown failures are counted by
        // AllExceptionsFilter instead — they never reach this callback.
        this.errorRate.record(status);
        const line = `${method} ${path} -> ${status} +${Date.now() - startedAt}ms`;
        if (status >= HttpStatus.INTERNAL_SERVER_ERROR) {
          this.logger.error(line);
        } else {
          this.logger.log(line);
        }
      }),
    );
  }
}
