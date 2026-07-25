import { Request } from 'express';

/**
 * The request path with the query string stripped, for log lines.
 *
 * Query values on this API carry credentials — the HLS content-key token
 * (`/lectures/:id/stream/key?kt=…`) and Paymob's `?hmac=…` request signature —
 * so `request.originalUrl` must never be logged verbatim. Dropping everything
 * from `?` onward also keeps log-line cardinality bounded, so a drain can
 * aggregate by path.
 */
export function safeRequestPath(request: Request): string {
  const url = request.originalUrl || request.url || '';
  const queryStart = url.indexOf('?');
  return queryStart === -1 ? url : url.slice(0, queryStart);
}
