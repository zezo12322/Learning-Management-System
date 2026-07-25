import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { inspect } from 'node:util';
import { safeRequestPath } from '../utils/request-log';

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
 * It deliberately reproduces three behaviours of Nest's own BaseExceptionFilter
 * that are lost when replying to the response directly: the `headersSent` bail-out,
 * the JSON Content-Type correction, and honouring the `statusCode` that Express
 * middleware errors (body-parser's 413/415) carry. See the comments below.
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
    // Express middleware errors (body-parser `PayloadTooLargeError` → 413,
    // unsupported charset/encoding → 415) are not HttpExceptions but do carry a
    // real status. Without this they would all be reported as 500 and pollute
    // the error-level stream that the runbook treats as the incident signal.
    const middlewareStatus = isHttp ? null : middlewareErrorStatus(exception);
    const status = isHttp
      ? exception.getStatus()
      : (middlewareStatus ?? HttpStatus.INTERNAL_SERVER_ERROR);

    // Preserve the original HttpException body; synthesize a safe one otherwise.
    const body: string | object = isHttp
      ? exception.getResponse()
      : middlewareStatus
        ? {
            statusCode: status,
            message:
              exception instanceof Error ? exception.message : 'Request error',
          }
        : {
            statusCode: status,
            error: 'Internal Server Error',
            message: 'Internal server error',
          };

    const where = `${request.method} ${safeRequestPath(request)}`;

    if (status >= HttpStatus.INTERNAL_SERVER_ERROR) {
      this.logger.error(
        `${where} -> ${status}`,
        exception instanceof Error
          ? exception.stack
          : inspect(exception, { depth: 3 }),
      );
    } else {
      // Read the reason off the response body: for ValidationPipe failures
      // `exception.message` is only the generic "Bad Request Exception" (Nest
      // ignores array messages), so the actual field errors live in the body.
      this.logger.warn(`${where} -> ${status} ${describe(body)}`);
    }

    // The response may already be committed (handlers using @Res() that stream or
    // redirect before throwing). Writing again throws ERR_HTTP_HEADERS_SENT from
    // inside the filter, which escapes as an unhandled rejection.
    if (response.headersSent) {
      response.end();
      return;
    }

    // Routes can pin a non-JSON Content-Type via @Header() (the HLS manifest and
    // key endpoints do), and it is applied before the handler runs. Error bodies
    // are always JSON, and Express only defaults the header when it is unset — so
    // set it explicitly or a 403 ships labelled as an HLS playlist.
    response.setHeader('Content-Type', 'application/json; charset=utf-8');
    response
      .status(status)
      .json(
        typeof body === 'string' ? { statusCode: status, message: body } : body,
      );
  }
}

/** Status carried by `http-errors`-shaped errors thrown from Express middleware. */
function middlewareErrorStatus(exception: unknown): number | null {
  const status = (exception as { statusCode?: unknown } | null | undefined)
    ?.statusCode;
  return typeof status === 'number' && status >= 400 && status < 600
    ? status
    : null;
}

/** One-line, human-readable reason drawn from the outgoing error body. */
function describe(body: string | object): string {
  if (typeof body === 'string') return body;
  const message = (body as { message?: unknown }).message;
  if (typeof message === 'string') return message;
  if (Array.isArray(message)) return message.join('; ');
  return 'Client error';
}
