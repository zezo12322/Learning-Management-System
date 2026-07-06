import { createParamDecorator, ExecutionContext } from '@nestjs/common';

/**
 * Parameter decorator that extracts the decoded Firebase user from request.
 * Usage: @CurrentUser() user: DecodedIdToken
 *
 * Requires FirebaseAuthGuard to be applied on the route or controller.
 */
export const CurrentUser = createParamDecorator(
  (data: string | undefined, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    const user = request.user;

    // If a specific property is requested (e.g., @CurrentUser('uid'))
    if (data) {
      return user?.[data];
    }

    return user;
  },
);
