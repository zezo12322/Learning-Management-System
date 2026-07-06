import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Body,
  Param,
  UseGuards,
} from '@nestjs/common';
import { CoursesService } from './courses.service';
import { CreateCourseDto, UpdateCourseDto, UpdateCourseStatusDto } from './dto/course.dto';
import { FirebaseAuthGuard } from '../common/guards/firebase-auth.guard';
import { RolesGuard } from '../common/guards/roles.guard';
import { CourseAccessGuard } from '../common/guards/course-access.guard';
import { Roles } from '../common/decorators/roles.decorator';
import { AuthToken } from '../common/decorators/auth-token.decorator';

@Controller('courses')
@UseGuards(FirebaseAuthGuard, RolesGuard)
@Roles('admin', 'instructor')
export class CoursesController {
  constructor(private readonly coursesService: CoursesService) {}

  @Post()
  create(@Body() dto: CreateCourseDto, @AuthToken() token: string) {
    return this.coursesService.create(dto, token);
  }

  @Get()
  findAll(@AuthToken() token: string) {
    return this.coursesService.findMyList(token);
  }

  @Get(':courseId')
  @UseGuards(CourseAccessGuard)
  findOne(@Param('courseId') courseId: string, @AuthToken() token: string) {
    return this.coursesService.findOne(courseId, token);
  }

  @Patch(':courseId')
  @UseGuards(CourseAccessGuard)
  update(
    @Param('courseId') courseId: string,
    @Body() dto: UpdateCourseDto,
    @AuthToken() token: string,
  ) {
    return this.coursesService.update(courseId, dto, token);
  }

  @Patch(':courseId/status')
  @UseGuards(CourseAccessGuard)
  updateStatus(
    @Param('courseId') courseId: string,
    @Body() dto: UpdateCourseStatusDto,
    @AuthToken() token: string,
  ) {
    return this.coursesService.updateStatus(courseId, dto, token);
  }

  @Delete(':courseId')
  @UseGuards(CourseAccessGuard)
  softDelete(@Param('courseId') courseId: string, @AuthToken() token: string) {
    return this.coursesService.softDelete(courseId, token);
  }

  // ==========================================
  // INSTRUCTOR MANAGEMENT
  // ==========================================

  @Post(':courseId/instructors')
  @UseGuards(CourseAccessGuard)
  addInstructor(
    @Param('courseId') courseId: string,
    @Body('userId') userId: string,
    @AuthToken() token: string,
  ) {
    return this.coursesService.addInstructor(courseId, userId, token);
  }

  @Delete(':courseId/instructors/:userId')
  @UseGuards(CourseAccessGuard)
  removeInstructor(
    @Param('courseId') courseId: string,
    @Param('userId') userId: string,
    @AuthToken() token: string,
  ) {
    return this.coursesService.removeInstructor(courseId, userId, token);
  }

  @Get(':courseId/instructors')
  @UseGuards(CourseAccessGuard)
  getInstructors(@Param('courseId') courseId: string, @AuthToken() token: string) {
    return this.coursesService.getInstructors(courseId, token);
  }
}
