import { Injectable, CanActivate, ExecutionContext, ForbiddenException, NotFoundException,} from '@nestjs/common';
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

    // Admins and superadmins are exempt from ToS acceptance checks
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
