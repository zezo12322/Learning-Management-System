import { createParamDecorator, ExecutionContext } from '@nestjs/common';

/** Parse the raw Firebase ID token (the Bearer value) from a request. */
export function extractBearerToken(req: any): string {
  const header = req?.headers?.['authorization'];
  if (header && header.startsWith('Bearer ')) {
    return header.split('Bearer ')[1];
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
