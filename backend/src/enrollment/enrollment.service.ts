import {
  Injectable,
  BadRequestException,
  ForbiddenException,
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
 * Paid-course gating: a course with price > 0 can only be self-enrolled by a
 * user who has a COMPLETED payment containing it — the Paymob webhook is the
 * normal enrollment path for purchases. Free courses enroll directly.
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

    // Paid-course gate: creating a NEW enrollment on a paid course requires a
    // COMPLETED payment that includes it (the Paymob webhook performs the
    // enrollment for purchases). Without this, any authenticated user could
    // take a paid course for free by calling this endpoint directly.
    // Reactivation above is exempt — an existing row means access was granted.
    if ((course.price ?? 0) > 0) {
      const paymentsData: any = await this.dc.executeQueryAsAdmin(
        'GetUserCompletedPayments',
        { userId: uid },
      );
      const hasPaidForCourse = (paymentsData?.payments ?? []).some((p: any) =>
        (p?.paymentItems_on_payment ?? []).some(
          (item: any) =>
            typeof item?.courseId === 'string' &&
            item.courseId.toLowerCase() === courseId.toLowerCase(),
        ),
      );
      if (!hasPaidForCourse) {
        throw new ForbiddenException(
          'This course requires purchase before enrollment',
        );
      }
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

    // If mission is linked to a parent course, verify user is enrolled in that course
    if (mission.courseId) {
      const isEnrolled = await this.checkEnrollmentAsAdmin(
        mission.courseId,
        uid,
      );
      if (!isEnrolled) {
        throw new BadRequestException(
          `You must be enrolled in the parent course to enroll in this mission`,
        );
      }
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
