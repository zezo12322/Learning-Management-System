import {
  Injectable,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { DataConnectService } from '../firebase/dataconnect.service';

/**
 * Student enrollment (H5). Enrollment is the precondition for quiz-taking and
 * progress, so without these endpoints the student flow was unreachable.
 *
 * Re-enrolling reactivates the existing row (via UpdateEnrollmentStatus) rather
 * than inserting a duplicate, since the schema has no uniqueness on
 * (user, course/mission) yet — see the DB constraint follow-up.
 *
 * NOTE: paid-course gating (price > 0 ⇒ requires a completed payment) is not
 * enforced here because the payment flow is not yet implemented; revisit when
 * payments land.
 */
@Injectable()
export class EnrollmentService {
  constructor(private readonly dc: DataConnectService) {}

  async enrollInCourse(courseId: string, authToken: string, uid: string) {
    const courseData = await this.dc.executeQuery(
      'GetCourseForEnrollment',
      { courseId },
      authToken,
    );
    const course = courseData?.course;
    if (!course || course.deletedAt) {
      throw new NotFoundException(`Course ${courseId} not found`);
    }
    if (course.status !== 'PUBLISHED') {
      throw new BadRequestException('Course is not open for enrollment');
    }

    const existingData = await this.dc.executeQuery(
      'GetUserEnrollmentForCourse',
      { courseId },
      authToken,
    );
    const existing = existingData?.enrollments?.[0];
    if (existing) {
      if (existing.status === 'ACTIVE') {
        return { id: existing.id, status: 'ACTIVE', alreadyEnrolled: true };
      }
      await this.dc.executeMutation(
        'UpdateEnrollmentStatus',
        { enrollmentId: existing.id, status: 'ACTIVE', completedAt: null },
        authToken,
      );
      return { id: existing.id, status: 'ACTIVE', reactivated: true };
    }

    // EnrollInCourse is NO_ACCESS (backend-only), so the checks above are the sole
    // gate; the enrollee is passed explicitly rather than derived from auth.uid.
    return this.dc.executeMutation(
      'EnrollInCourse',
      { courseId, userId: uid },
      authToken,
    );
  }

  async enrollInMission(missionId: string, authToken: string, uid: string) {
    const missionData = await this.dc.executeQuery(
      'GetMissionForEnrollment',
      { missionId },
      authToken,
    );
    const mission = missionData?.mission;
    if (!mission || mission.deletedAt) {
      throw new NotFoundException(`Mission ${missionId} not found`);
    }

    const existingData = await this.dc.executeQuery(
      'GetUserEnrollmentForMission',
      { missionId },
      authToken,
    );
    const existing = existingData?.enrollments?.[0];
    if (existing) {
      if (existing.status === 'ACTIVE') {
        return { id: existing.id, status: 'ACTIVE', alreadyEnrolled: true };
      }
      await this.dc.executeMutation(
        'UpdateEnrollmentStatus',
        { enrollmentId: existing.id, status: 'ACTIVE', completedAt: null },
        authToken,
      );
      return { id: existing.id, status: 'ACTIVE', reactivated: true };
    }

    return this.dc.executeMutation(
      'EnrollInMission',
      { missionId, userId: uid },
      authToken,
    );
  }

  async getCourseEnrollment(courseId: string, authToken: string) {
    const data = await this.dc.executeQuery(
      'GetUserEnrollmentForCourse',
      { courseId },
      authToken,
    );
    return data?.enrollments?.[0] ?? null;
  }

  async getMissionEnrollment(missionId: string, authToken: string) {
    const data = await this.dc.executeQuery(
      'GetUserEnrollmentForMission',
      { missionId },
      authToken,
    );
    return data?.enrollments?.[0] ?? null;
  }

  /**
   * Admin/worker variant: check if user is enrolled in course.
   * Runs with service-account credentials (no auth.uid).
   */
  async checkEnrollmentAsAdmin(
    courseId: string,
    userId: string,
  ): Promise<boolean> {
    const data = await this.dc.executeQueryAsAdmin(
      'GetUserEnrollmentForCourseByUser',
      { courseId, userId },
    );
    const enrollment = data?.enrollments?.[0];
    return (
      !!enrollment &&
      (enrollment.status === 'ACTIVE' || enrollment.status === 'COMPLETED')
    );
  }
}
