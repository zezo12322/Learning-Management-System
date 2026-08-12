import {
  Injectable,
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  NotFoundException,
} from '@nestjs/common';
import { ToSService } from './tos.service';

/**
 * Checks if the authenticated user has accepted the current Terms of Service.
 * If not, throws ForbiddenException with details about the current ToS.
 * Usage: Apply to specific endpoints that require ToS acceptance.
 * Example:
 * ```
 * @Get('profile')
 * @UseGuards(TosGuard)
 * getProfile(@AuthToken() token: string) {
 *   // Only accessible if user has accepted current ToS
 * }
 * ```
 *
 * Two rules before applying this to an endpoint:
 *
 * 1. Never to a provisioning endpoint. Acceptance is stored on the `users` row,
 *    so anything that creates that row must run first — see UsersService.sync.
 * 2. Only to endpoints whose clients can actually present the terms. The web has
 *    an acceptance gate; the Flutter app does not call the acceptance endpoint at
 *    all, so gating a shared endpoint (enrollment, submissions, progress) would
 *    lock every mobile user out of it the moment an admin publishes a version,
 *    with no in-app way to recover.
 *
 * That is why nothing gates on this guard today: the web gate is the enforcement
 * point until the mobile acceptance flow exists.
 */
@Injectable()
export class TosGuard implements CanActivate {
  constructor(private readonly tosService: ToSService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const uid = request.user?.uid;
    const token =
      request.headers['x-firebase-auth-token'] ||
      request.headers['authorization']?.replace('Bearer ', '');

    if (!uid) {
      throw new NotFoundException('User not authenticated');
    }

    // Admins are exempt from ToS acceptance checks. Note this also means an
    // admin cannot see a ToS lockout that affects everyone else, so verify
    // acceptance changes with a non-admin account.
    const roles = request.user?.roles || [];
    if (roles.includes('admin')) {
      return true;
    }

    const status = await this.tosService.getStatus(token, uid);

    if (status.needsAcceptance) {
      // Return helpful error with current ToS details
      throw new ForbiddenException({
        code: 'TOS_NOT_ACCEPTED',
        message:
          'You must accept the latest Terms of Service before accessing this feature.',
        currentToS: status.current,
      });
    }

    return true;
  }
}
