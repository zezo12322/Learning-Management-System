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
import { DataConnectService } from '../firebase/dataconnect.service';

@Controller()
@UseGuards(FirebaseAuthGuard, RolesGuard)
export class LecturesController {
  constructor(
    private readonly lecturesService: LecturesService,
    private readonly dc: DataConnectService,
  ) {}

  @Post('courses/:courseId/sections/:sectionId/lectures')
  @Roles('admin', 'instructor')
  @OwnsResource('section')
  @UseGuards(ResourceOwnershipGuard)
  create(
    @Param('courseId') courseId: string,
    @Param('sectionId') sectionId: string,
    @Body() dto: CreateLectureDto,
    @Req() req: any,
  ) {
    return this.lecturesService.create(courseId, sectionId, dto, this.dc.extractToken(req));
  }

  @Patch('courses/:courseId/sections/:sectionId/lectures/:lectureId')
  @Roles('admin', 'instructor')
  @OwnsResource('lecture')
  @UseGuards(ResourceOwnershipGuard)
  update(
    @Param('lectureId') lectureId: string,
    @Body() dto: UpdateLectureDto,
    @Req() req: any,
  ) {
    return this.lecturesService.update(lectureId, dto, this.dc.extractToken(req));
  }

  @Delete('courses/:courseId/sections/:sectionId/lectures/:lectureId')
  @Roles('admin', 'instructor')
  @OwnsResource('lecture')
  @UseGuards(ResourceOwnershipGuard)
  softDelete(
    @Param('courseId') courseId: string,
    @Param('sectionId') sectionId: string,
    @Param('lectureId') lectureId: string,
    @Req() req: any,
  ) {
    return this.lecturesService.softDelete(
      courseId,
      sectionId,
      lectureId,
      this.dc.extractToken(req),
    );
  }

  @Put('courses/:courseId/sections/:sectionId/lectures/reorder')
  @Roles('admin', 'instructor')
  @OwnsResource('section')
  @UseGuards(ResourceOwnershipGuard)
  reorder(
    @Param('courseId') courseId: string,
    @Param('sectionId') sectionId: string,
    @Body() dto: ReorderDto,
    @Req() req: any,
  ) {
    return this.lecturesService.reorder(courseId, sectionId, dto.orderedIds, this.dc.extractToken(req));
  }

  @Patch('courses/:courseId/lectures/:lectureId/move')
  @Roles('admin', 'instructor')
  @OwnsResource('lecture')
  @UseGuards(ResourceOwnershipGuard)
  move(
    @Param('lectureId') lectureId: string,
    @Body() dto: MoveLectureDto,
    @Req() req: any,
  ) {
    return this.lecturesService.move(lectureId, dto, this.dc.extractToken(req));
  }

  // Student-facing: get lecture content
  @Get('lectures/:lectureId')
  getContent(@Param('lectureId') lectureId: string, @Req() req: any) {
    return this.lecturesService.getContent(lectureId, this.dc.extractToken(req));
  }
}
