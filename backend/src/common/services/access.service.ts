import {
  Injectable,
  ForbiddenException,
  NotFoundException,
} from '@nestjs/common';
import { DataConnectService } from '../../firebase/dataconnect.service';

/**
 * Centralizes resource-ownership checks (Admin bypass + Instructor must own the
 * course/mission). Shared by CourseAccessGuard and any service that authorizes
 * outside the route-param flow (e.g. UploadsService, whose entity comes in the
 * request body rather than the path).
 */
@Injectable()
export class AccessService {
  constructor(private readonly dc: DataConnectService) {}

  /** Throws 403/404 unless the caller may manage the given course. */
  async assertCourseAccess(
    courseId: string,
    uid: string | undefined,
    token: string,
    isAdmin: boolean,
  ): Promise<void> {
    if (isAdmin) return;
    const data = await this.dc.executeQuery('GetMyCourseAccess', { courseId }, token);
    const course = data?.course;
    if (!course) throw new NotFoundException(`Course ${courseId} not found`);
    if (!this.ownsCourse(course, uid)) {
      throw new ForbiddenException('You do not have access to this course');
    }
  }

  /** Throws 403/404 unless the caller may manage the given mission. */
  async assertMissionAccess(
    missionId: string,
    uid: string | undefined,
    token: string,
    isAdmin: boolean,
  ): Promise<void> {
    if (isAdmin) return;
    const data = await this.dc.executeQuery('GetMyMissionAccess', { missionId }, token);
    const mission = data?.mission;
    if (!mission) throw new NotFoundException(`Mission ${missionId} not found`);
    const owns =
      mission.author?.id === uid ||
      mission.createdBy?.id === uid ||
      (mission.course ? this.ownsCourse(mission.course, uid) : false);
    if (!owns) {
      throw new ForbiddenException('You do not have access to this mission');
    }
  }

  private ownsCourse(course: any, uid?: string): boolean {
    return (
      course.author?.id === uid ||
      course.createdBy?.id === uid ||
      (course.myInstructorLink ?? course.myMissionCourseInstructorLink ?? []).length > 0
    );
  }
}
