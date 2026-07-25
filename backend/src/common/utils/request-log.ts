import { Request } from 'express';

/**
 * The request path with the query string stripped, for log lines.
 *
 * Query values on this API carry credentials — the HLS content-key token
 * (`/lectures/:id/stream/key?kt=…`) and Paymob's `?hmac=…` request signature —
 * so `request.originalUrl` must never be logged verbatim.
 *
 * Note this returns the concrete path, so ids stay in the line: it is NOT a
 * bounded-cardinality route label. Aggregating error rate / latency per route
 * needs the Nest route pattern instead (`/courses/:courseId/overview`), which is
 * part of the structured-logging follow-up.
 */
export function safeRequestPath(request: Request): string {
  const url = request.originalUrl || request.url || '';
  const queryStart = url.indexOf('?');
  return queryStart === -1 ? url : url.slice(0, queryStart);
}
