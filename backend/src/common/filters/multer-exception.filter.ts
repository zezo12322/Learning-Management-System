import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpStatus,
} from '@nestjs/common';
import { Response } from 'express';
import { MulterError } from 'multer';

/**
 * Translates Multer upload errors into clean HTTP responses.
 *
 * Without this, a Multer failure (most notably `LIMIT_FILE_SIZE`, thrown when an
 * upload exceeds the interceptor's `limits.fileSize`) escapes as an unhandled
 * error and surfaces to the client as a generic 500. We map the size-limit case
 * to 413 Payload Too Large and every other Multer error to 400 Bad Request, so
 * the caller gets an actionable status instead of a server error.
 */
@Catch(MulterError)
export class MulterExceptionFilter implements ExceptionFilter {
  catch(exception: MulterError, host: ArgumentsHost) {
    const response = host.switchToHttp().getResponse<Response>();

    const status =
      exception.code === 'LIMIT_FILE_SIZE'
        ? HttpStatus.PAYLOAD_TOO_LARGE
        : HttpStatus.BAD_REQUEST;

    const message =
      exception.code === 'LIMIT_FILE_SIZE'
        ? 'Uploaded file exceeds the maximum allowed size'
        : `File upload failed: ${exception.message}`;

    response.status(status).json({
      statusCode: status,
      error:
        status === HttpStatus.PAYLOAD_TOO_LARGE
          ? 'Payload Too Large'
          : 'Bad Request',
      message,
    });
  }
}
