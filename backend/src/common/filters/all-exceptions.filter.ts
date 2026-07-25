import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { Request, Response } from 'express';

/**
 * App-wide exception filter — the central monitoring signal for backend errors
 * (KAN-60). Every unhandled exception funnels through here so that:
 *
 *   • Server errors (5xx) are logged at `error` level WITH the stack trace, giving
 *     Railway's log drain a single, greppable line per incident.
 *   • Client errors (4xx) are logged at `warn` level as one concise line (no
 *     stack) to keep the signal-to-noise ratio high.
 *   • The HTTP response shape is preserved for HttpExceptions (including the
 *     ValidationPipe's `message` arrays) while non-HTTP errors return a generic
 *     500 body that never leaks internal details to the client.
 *
 * Controller-scoped filters (e.g. MulterExceptionFilter) still take precedence
 * for their specific routes; this catch-all handles everything else.
 */
@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  private readonly logger = new Logger('ExceptionFilter');

  catch(exception: unknown, host: ArgumentsHost): void {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    const isHttp = exception instanceof HttpException;
    const status = isHttp
      ? exception.getStatus()
      : HttpStatus.INTERNAL_SERVER_ERROR;

    const where = `${request.method} ${request.originalUrl}`;

    if (status >= HttpStatus.INTERNAL_SERVER_ERROR) {
      this.logger.error(
        `${where} -> ${status}`,
        exception instanceof Error ? exception.stack : String(exception),
      );
    } else {
      const reason = isHttp ? exception.message : 'Client error';
      this.logger.warn(`${where} -> ${status} ${reason}`);
    }

    // Preserve the original HttpException body; synthesize a safe one otherwise.
    const body: string | object = isHttp
      ? exception.getResponse()
      : {
          statusCode: status,
          error: 'Internal Server Error',
          message: 'Internal server error',
        };

    if (typeof body === 'string') {
      response.status(status).json({ statusCode: status, message: body });
    } else {
      response.status(status).json(body);
    }
  }
}
