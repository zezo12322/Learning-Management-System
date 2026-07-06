import {
  CanActivate,
  ExecutionContext,
  Injectable,
  ForbiddenException,
} from '@nestjs/common';
import { DataConnectService } from '../../firebase/dataconnect.service';
import { AccessService } from '../services/access.service';

/**
 * Resource-ownership guard for the course/curriculum builder (KAN-117, KAN-118,
 * quiz builder). Admins pass unconditionally. Instructors must own the target
 * course — be its author/creator or an assigned CourseInstructor.
 *
 * Resolves the resource from the route: `:courseId` directly, or `:missionId`.
 * MUST run after FirebaseAuthGuard and RolesGuard (it reads `request.userRoles`).
 */
@Injectable()
export class CourseAccessGuard implements CanActivate {
  constructor(
    private readonly dc: DataConnectService,
    private readonly access: AccessService,
  ) {}

  async canActivate(ctx: ExecutionContext): Promise<boolean> {
    const request = ctx.switchToHttp().getRequest();
    const isAdmin = (request.userRoles ?? []).includes('admin');
    const uid: string | undefined = request.user?.uid;
    const token = this.dc.extractToken(request);
    const { courseId, missionId } = request.params ?? {};

    if (courseId) {
      await this.access.assertCourseAccess(courseId, uid, token, isAdmin);
      return true;
    }
    if (missionId) {
      await this.access.assertMissionAccess(missionId, uid, token, isAdmin);
      return true;
    }
    throw new ForbiddenException('No course or mission context on this route');
  }
}
