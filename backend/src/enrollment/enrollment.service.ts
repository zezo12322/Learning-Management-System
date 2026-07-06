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

  async enrollInCourse(courseId: string, authToken: string) {
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

    return this.dc.executeMutation('EnrollInCourse', { courseId }, authToken);
  }

  async enrollInMission(missionId: string, authToken: string) {
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

    return this.dc.executeMutation('EnrollInMission', { missionId }, authToken);
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
}
