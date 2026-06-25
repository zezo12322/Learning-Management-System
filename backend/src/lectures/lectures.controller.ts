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
import { CreateLectureDto, UpdateLectureDto, MoveLectureDto } from './dto/lecture.dto';
import { ReorderDto } from '../common/dto/reorder.dto';
import { FirebaseAuthGuard } from '../common/guards/firebase-auth.guard';
import { RolesGuard } from '../common/guards/roles.guard';
import { ResourceOwnershipGuard } from '../common/guards/resource-ownership.guard';
import { Roles } from '../common/decorators/roles.decorator';
import { OwnsResource } from '../common/decorators/owns-resource.decorator';
import { AuthToken } from '../common/decorators/auth-token.decorator';
import { CurrentUser } from '../common/decorators/current-user.decorator';

@Controller()
@UseGuards(FirebaseAuthGuard, RolesGuard)
export class LecturesController {
  constructor(private readonly lecturesService: LecturesService) {}

  @Post('courses/:courseId/sections/:sectionId/lectures')
  @Roles('admin', 'instructor')
  @OwnsResource('section')
  @UseGuards(ResourceOwnershipGuard)
  create(
    @Param('courseId') courseId: string,
    @Param('sectionId') sectionId: string,
    @Body() dto: CreateLectureDto,
    @AuthToken() token: string,
  ) {
    return this.lecturesService.create(courseId, sectionId, dto, token);
  }

  @Patch('courses/:courseId/sections/:sectionId/lectures/:lectureId')
  @Roles('admin', 'instructor')
  @OwnsResource('lecture')
  @UseGuards(ResourceOwnershipGuard)
  update(
    @Param('lectureId') lectureId: string,
    @Body() dto: UpdateLectureDto,
    @AuthToken() token: string,
  ) {
    return this.lecturesService.update(lectureId, dto, token);
  }

  @Delete('courses/:courseId/sections/:sectionId/lectures/:lectureId')
  @Roles('admin', 'instructor')
  @OwnsResource('lecture')
  @UseGuards(ResourceOwnershipGuard)
  softDelete(
    @Param('courseId') courseId: string,
    @Param('sectionId') sectionId: string,
    @Param('lectureId') lectureId: string,
    @AuthToken() token: string,
  ) {
    return this.lecturesService.softDelete(courseId, sectionId, lectureId, token);
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
    return this.lecturesService.reorder(courseId, sectionId, dto.orderedIds, token);
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
