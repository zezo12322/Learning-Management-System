import {
  CallHandler,
  ExecutionContext,
  Injectable,
  Logger,
  NestInterceptor,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

/**
 * Structured per-request access log (KAN-60): one line per completed request with
 * method, path, response status and latency. Failed requests are logged by
 * AllExceptionsFilter instead (with status + stack), so this only records the
 * success path — no duplicate lines per error.
 */
@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  private readonly logger = new Logger('HTTP');

  intercept(context: ExecutionContext, next: CallHandler): Observable<unknown> {
    const http = context.switchToHttp();
    const request = http.getRequest<Request>();
    const { method, originalUrl } = request;
    const startedAt = Date.now();

    return next.handle().pipe(
      tap(() => {
        const response = http.getResponse<Response>();
        const ms = Date.now() - startedAt;
        this.logger.log(
          `${method} ${originalUrl} ${response.statusCode} +${ms}ms`,
        );
      }),
    );
  }
}
