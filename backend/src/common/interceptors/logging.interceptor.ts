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
 * Liveness probes are skipped: Railway's healthcheck plus an external uptime
 * monitor would otherwise bury real traffic in the drain the runbook tells
 * operators to grep. Matched by suffix so the skip survives a global-prefix
 * change and a monitor configured with a trailing slash.
 */
const SILENT_ROUTES = ['/health'];

function isSilent(path: string): boolean {
  const normalized = path.endsWith('/') ? path.slice(0, -1) : path;
  return SILENT_ROUTES.some((route) => normalized.endsWith(route));
}

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  private readonly logger = new Logger('HTTP');

  intercept(context: ExecutionContext, next: CallHandler): Observable<unknown> {
    const http = context.switchToHttp();
    const request = http.getRequest<Request>();
    const path = safeRequestPath(request);

    if (isSilent(path)) return next.handle();

    const { method } = request;
    const startedAt = Date.now();

    return next.handle().pipe(
      tap(() => {
        const status = http.getResponse<Response>().statusCode;
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
