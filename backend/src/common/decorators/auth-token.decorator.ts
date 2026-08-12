import { createParamDecorator, ExecutionContext } from '@nestjs/common';

/** Parse the raw Firebase ID token from an HTTP request. */
export function extractBearerToken(req: any): string {
  const header = req?.headers?.authorization;
  if (typeof header === 'string') {
    const match = header.match(/^Bearer\s+(.+)$/i);
    if (match) return match[1].trim();
  }

  // Fallback to query parameter strictly for video streaming GETs (HTML5 video tags cannot send headers)
  if (
    req?.method === 'GET' &&
    typeof req?.path === 'string' &&
    req.path.includes('/streaming/')
  ) {
    const queryToken = req?.query?.token;
    if (typeof queryToken === 'string' && queryToken.trim().length > 0) {
      return queryToken.trim();
    }
  }

  return '';
}

/**
 * Injects the raw Firebase ID token for forwarding to Data Connect, replacing
 * the `@Req() req` + `dc.extractToken(req)` boilerplate. Requires FirebaseAuthGuard.
 * Usage: `someHandler(@AuthToken() token: string) { ... }`
 */
export const AuthToken = createParamDecorator(
  (_data: unknown, ctx: ExecutionContext): string =>
    extractBearerToken(ctx.switchToHttp().getRequest()),
);
