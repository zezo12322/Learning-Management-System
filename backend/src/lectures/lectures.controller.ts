import {
  Controller,
  Get,
  Post,
  Patch,
  Put,
  Delete,
  Body,
  Param,
  UseGuards,
  Req,
} from '@nestjs/common';
import { LecturesService } from './lectures.service';
import {
  CreateLectureDto,
  UpdateLectureDto,
  MoveLectureDto,
} from './dto/lecture.dto';
import { ReorderDto } from '../common/dto/reorder.dto';
import { BackfillDurationsDto } from './dto/backfill-durations.dto';
import { CourseAccessGuard } from '../common/guards/course-access.guard';
import { FirebaseAuthGuard } from '../common/guards/firebase-auth.guard';
import { RolesGuard } from '../common/guards/roles.guard';
import { ResourceOwnershipGuard } from '../common/guards/resource-ownership.guard';
import { Roles } from '../common/decorators/roles.decorator';
import { OwnsResource } from '../common/decorators/owns-resource.decorator';
import { AuthToken } from '../common/decorators/auth-token.decorator';
import { CurrentUser } from '../common/decorators/current-user.decorator';
import { AuditLoggingService } from '../logging/logging.service';

@Controller()
@UseGuards(FirebaseAuthGuard, RolesGuard)
export class LecturesController {
  constructor(
    private readonly lecturesService: LecturesService,
    private readonly auditLoggingService: AuditLoggingService,
  ) {}

  @Post('courses/:courseId/sections/:sectionId/lectures')
  @Roles('admin', 'instructor')
  @OwnsResource('section')
  @UseGuards(ResourceOwnershipGuard)
  async create(
    @Param('courseId') courseId: string,
    @Param('sectionId') sectionId: string,
    @Body() dto: CreateLectureDto,
    @AuthToken() token: string,
    @Req() req: any,
  ) {
    const result = await this.lecturesService.create(
      courseId,
      sectionId,
      dto,
      token,
    );
    this.auditLoggingService.createLog({
      action: 'CREATE_LECTURE',
      adminUid: req.user?.uid ?? 'unknown',
      targetUid: result?.lecture_insert?.id ?? null,
      ipAddress: req.ip,
      details: { courseId, sectionId, ...dto },
    });
    return result;
  }

  @Patch('courses/:courseId/sections/:sectionId/lectures/:lectureId')
  @Roles('admin', 'instructor')
  @OwnsResource('lecture')
  @UseGuards(ResourceOwnershipGuard)
  async update(
    @Param('lectureId') lectureId: string,
    @Body() dto: UpdateLectureDto,
    @AuthToken() token: string,
    @Req() req: any,
  ) {
    const result = await this.lecturesService.update(lectureId, dto, token);
    this.auditLoggingService.createLog({
      action: 'UPDATE_LECTURE',
      adminUid: req.user?.uid ?? 'unknown',
      targetUid: lectureId,
      ipAddress: req.ip,
      details: dto,
    });
    return result;
  }

  @Delete('courses/:courseId/sections/:sectionId/lectures/:lectureId')
  @Roles('admin', 'instructor')
  @OwnsResource('lecture')
  @UseGuards(ResourceOwnershipGuard)
  async softDelete(
    @Param('courseId') courseId: string,
    @Param('sectionId') sectionId: string,
    @Param('lectureId') lectureId: string,
    @AuthToken() token: string,
    @Req() req: any,
  ) {
    const result = await this.lecturesService.softDelete(
      courseId,
      sectionId,
      lectureId,
      token,
    );

    this.auditLoggingService.createLog({
      action: 'DELETE_LECTURE',
      adminUid: req.user?.uid ?? 'unknown',
      targetUid: lectureId,
      ipAddress: req.ip,
      details: { courseId, sectionId, lectureId },
    });

    return result;
  }

  @Put('courses/:courseId/sections/:sectionId/lectures/reorder')
  @Roles('admin', 'instructor')
  @OwnsResource('section')
  @UseGuards(ResourceOwnershipGuard)
  reorder(
    @Param('courseId') courseId: string,
    @Param('sectionId') sectionId: string,
    @Body() dto: ReorderDto,
    @AuthToken() token: string,
  ) {
    return this.lecturesService.reorder(
      courseId,
      sectionId,
      dto.orderedIds,
      token,
    );
  }

  /**
   * Re-derive the lecture lengths in a course from the lectures themselves.
   *
   * Defaults to a report: `apply` must be sent explicitly, because a duration
   * is what completion is credited against and rewriting one moves the bar for
   * anyone part-way through that lesson. Course-scoped rather than
   * platform-wide for the same reason — this is reviewed a course at a time.
   */
  @Post('courses/:courseId/lectures/durations/backfill')
  @Roles('admin', 'instructor')
  @UseGuards(CourseAccessGuard)
  backfillDurations(
    @Param('courseId') courseId: string,
    @Body() dto: BackfillDurationsDto,
    @AuthToken() token: string,
  ) {
    return this.lecturesService.backfillDurations(
      courseId,
      token,
      dto.apply === true,
    );
  }

  @Patch('courses/:courseId/lectures/:lectureId/move')
  @Roles('admin', 'instructor')
  @OwnsResource('lecture')
  @UseGuards(ResourceOwnershipGuard)
  move(
    @Param('lectureId') lectureId: string,
    @Body() dto: MoveLectureDto,
    @AuthToken() token: string,
  ) {
    return this.lecturesService.move(lectureId, dto, token);
  }

  // Student-facing: get lecture content (access-gated in the service — H1)
  @Get('lectures/:lectureId')
  getContent(
    @Param('lectureId') lectureId: string,
    @AuthToken() token: string,
    @CurrentUser('uid') uid: string,
    @Req() req: any,
  ) {
    const isAdmin = (req.userRoles ?? []).includes('admin');
    return this.lecturesService.getContent(lectureId, token, uid, isAdmin);
  }
}
