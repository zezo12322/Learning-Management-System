import { createParamDecorator, ExecutionContext } from '@nestjs/common';

/** Parse the raw Firebase ID token from an HTTP request. */
export function extractBearerToken(req: any): string {
  const header = req?.headers?.authorization;
  if (typeof header !== 'string') {
    return '';
  }

  const match = header.match(/^Bearer\s+(.+)$/i);
  return match ? match[1].trim() : '';
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
