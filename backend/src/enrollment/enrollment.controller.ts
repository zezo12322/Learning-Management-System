import { Controller, Get, Post, Param, UseGuards } from '@nestjs/common';
import { EnrollmentService } from './enrollment.service';
import { FirebaseAuthGuard } from '../common/guards/firebase-auth.guard';
import { AuthToken } from '../common/decorators/auth-token.decorator';
import { CurrentUser } from '../common/decorators/current-user.decorator';

/**
 * Student-facing enrollment (H5). Any authenticated user may enroll themselves;
 * the target's existence/eligibility is validated in the service.
 */
@Controller()
@UseGuards(FirebaseAuthGuard)
export class EnrollmentController {
  constructor(private readonly enrollmentService: EnrollmentService) {}

  @Post('courses/:courseId/enroll')
  enrollInCourse(
    @Param('courseId') courseId: string,
    @AuthToken() token: string,
    @CurrentUser('uid') uid: string,
  ) {
    return this.enrollmentService.enrollInCourse(courseId, token, uid);
  }

  @Get('courses/:courseId/enrollment')
  getCourseEnrollment(
    @Param('courseId') courseId: string,
    @AuthToken() token: string,
  ) {
    return this.enrollmentService.getCourseEnrollment(courseId, token);
  }

  @Post('missions/:missionId/enroll')
  enrollInMission(
    @Param('missionId') missionId: string,
    @AuthToken() token: string,
    @CurrentUser('uid') uid: string,
  ) {
    return this.enrollmentService.enrollInMission(missionId, token, uid);
  }

  @Get('missions/:missionId/enrollment')
  getMissionEnrollment(
    @Param('missionId') missionId: string,
    @AuthToken() token: string,
  ) {
    return this.enrollmentService.getMissionEnrollment(missionId, token);
  }
}
