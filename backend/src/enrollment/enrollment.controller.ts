import { Controller, Get, Post, Param, UseGuards, Req } from '@nestjs/common';
import { EnrollmentService } from './enrollment.service';
import { FirebaseAuthGuard } from '../common/guards/firebase-auth.guard';
import { AuthToken } from '../common/decorators/auth-token.decorator';
import { CurrentUser } from '../common/decorators/current-user.decorator';
import { AuditLoggingService } from '../logging/logging.service';

/**
 * Student-facing enrollment (H5). Any authenticated user may enroll themselves;
 * the target's existence/eligibility is validated in the service.
 */
@Controller()
@UseGuards(FirebaseAuthGuard)
export class EnrollmentController {
  constructor(
    private readonly enrollmentService: EnrollmentService,
    private readonly auditLoggingService: AuditLoggingService,
  ) {}

  @Post('courses/:courseId/enroll')
  async enrollInCourse(
    @Param('courseId') courseId: string,
    @AuthToken() token: string,
    @CurrentUser('uid') uid: string,
    @Req() req: any,
  ) {
    const result = await this.enrollmentService.enrollInCourse(
      courseId,
      token,
      uid,
    );

    // Audit Log: Enrollment in Course
    this.auditLoggingService.createLog({
      action: 'ENROLLMENT_CREATED',
      adminUid: uid,
      targetUid: uid,
      ipAddress: req.ip,
      details: { courseId, type: 'COURSE' },
    });

    return result;
  }

  @Get('courses/:courseId/enrollment')
  getCourseEnrollment(
    @Param('courseId') courseId: string,
    @AuthToken() token: string,
  ) {
    return this.enrollmentService.getCourseEnrollment(courseId, token);
  }

  @Post('missions/:missionId/enroll')
  async enrollInMission(
    @Param('missionId') missionId: string,
    @AuthToken() token: string,
    @CurrentUser('uid') uid: string,
    @Req() req: any,
  ) {
    const result = await this.enrollmentService.enrollInMission(
      missionId,
      token,
      uid,
    );

    // Audit Log: Enrollment in Mission
    this.auditLoggingService.createLog({
      action: 'ENROLLMENT_CREATED',
      adminUid: uid,
      targetUid: uid,
      ipAddress: req.ip,
      details: { missionId, type: 'MISSION' },
    });

    return result;
  }

  @Get('missions/:missionId/enrollment')
  getMissionEnrollment(
    @Param('missionId') missionId: string,
    @AuthToken() token: string,
  ) {
    return this.enrollmentService.getMissionEnrollment(missionId, token);
  }
}
