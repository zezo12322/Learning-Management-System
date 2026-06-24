import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Body,
  Param,
  UseGuards,
  Req,
} from '@nestjs/common';
import { CoursesService } from './courses.service';
import { CreateCourseDto, UpdateCourseDto, UpdateCourseStatusDto } from './dto/course.dto';
import { FirebaseAuthGuard } from '../common/guards/firebase-auth.guard';
import { RolesGuard } from '../common/guards/roles.guard';
import { CourseAccessGuard } from '../common/guards/course-access.guard';
import { Roles } from '../common/decorators/roles.decorator';
import { DataConnectService } from '../firebase/dataconnect.service';

@Controller('courses')
@UseGuards(FirebaseAuthGuard, RolesGuard)
@Roles('admin', 'instructor')
export class CoursesController {
  constructor(
    private readonly coursesService: CoursesService,
    private readonly dc: DataConnectService,
  ) {}

  @Post()
  create(@Body() dto: CreateCourseDto, @Req() req: any) {
    return this.coursesService.create(dto, this.dc.extractToken(req));
  }

  @Get()
  findAll(@Req() req: any) {
    return this.coursesService.findMyList(this.dc.extractToken(req));
  }

  @Get(':courseId')
  @UseGuards(CourseAccessGuard)
  findOne(@Param('courseId') courseId: string, @Req() req: any) {
    return this.coursesService.findOne(courseId, this.dc.extractToken(req));
  }

  @Patch(':courseId')
  @UseGuards(CourseAccessGuard)
  update(
    @Param('courseId') courseId: string,
    @Body() dto: UpdateCourseDto,
    @Req() req: any,
  ) {
    return this.coursesService.update(courseId, dto, this.dc.extractToken(req));
  }

  @Patch(':courseId/status')
  @UseGuards(CourseAccessGuard)
  updateStatus(
    @Param('courseId') courseId: string,
    @Body() dto: UpdateCourseStatusDto,
    @Req() req: any,
  ) {
    return this.coursesService.updateStatus(courseId, dto, this.dc.extractToken(req));
  }

  @Delete(':courseId')
  @UseGuards(CourseAccessGuard)
  softDelete(@Param('courseId') courseId: string, @Req() req: any) {
    return this.coursesService.softDelete(courseId, this.dc.extractToken(req));
  }

  // ==========================================
  // INSTRUCTOR MANAGEMENT
  // ==========================================

  @Post(':courseId/instructors')
  @UseGuards(CourseAccessGuard)
  addInstructor(
    @Param('courseId') courseId: string,
    @Body('userId') userId: string,
    @Req() req: any,
  ) {
    return this.coursesService.addInstructor(courseId, userId, this.dc.extractToken(req));
  }

  @Delete(':courseId/instructors/:userId')
  @UseGuards(CourseAccessGuard)
  removeInstructor(
    @Param('courseId') courseId: string,
    @Param('userId') userId: string,
    @Req() req: any,
  ) {
    return this.coursesService.removeInstructor(courseId, userId, this.dc.extractToken(req));
  }

  @Get(':courseId/instructors')
  @UseGuards(CourseAccessGuard)
  getInstructors(@Param('courseId') courseId: string, @Req() req: any) {
    return this.coursesService.getInstructors(courseId, this.dc.extractToken(req));
  }
}
