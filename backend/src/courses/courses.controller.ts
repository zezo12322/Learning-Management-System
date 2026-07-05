import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Body,
  Param,
  UseGuards,
  Query,
  BadRequestException,
} from '@nestjs/common';
import { CoursesService } from './courses.service';
import {
  CreateCourseDto,
  UpdateCourseDto,
  UpdateCourseStatusDto,
} from './dto/course.dto';
import { FirebaseAuthGuard } from '../common/guards/firebase-auth.guard';
import { RolesGuard } from '../common/guards/roles.guard';
import { CourseAccessGuard } from '../common/guards/course-access.guard';
import { Roles } from '../common/decorators/roles.decorator';
import { AuthToken } from '../common/decorators/auth-token.decorator';
import { CurrentUser } from '../common/decorators/current-user.decorator';

@Controller('courses')
@UseGuards(FirebaseAuthGuard, RolesGuard)
export class CoursesController {
  constructor(private readonly coursesService: CoursesService) {}

  // ==========================================
  // PUBLIC / STUDENT ROUTES
  // ==========================================

  @Get('search')
  search(@Query('q') searchQuery: string, @AuthToken() token: string) {
    if (!searchQuery) {
      throw new BadRequestException('Search query (q) is required');
    }
    return this.coursesService.searchCatalog(searchQuery, token);
  }

  @Get('categories')
  getCategories(@AuthToken() token: string) {
    return this.coursesService.getCategories(token);
  }

  // ==========================================
  // ADMIN / INSTRUCTOR ROUTES
  // ==========================================

  @Post()
  @Roles('admin', 'instructor')
  create(
    @Body() dto: CreateCourseDto,
    @AuthToken() token: string,
    @CurrentUser('uid') uid: string,
  ) {
    return this.coursesService.create(dto, token, uid);
  }

  @Get()
  @Roles('admin', 'instructor')
  findAll(@AuthToken() token: string) {
    return this.coursesService.findMyList(token);
  }

  @Get(':courseId')
  @Roles('admin', 'instructor')
  @UseGuards(CourseAccessGuard)
  findOne(@Param('courseId') courseId: string, @AuthToken() token: string) {
    return this.coursesService.findOne(courseId, token);
  }

  @Patch(':courseId')
  @Roles('admin', 'instructor')
  @UseGuards(CourseAccessGuard)
  update(
    @Param('courseId') courseId: string,
    @Body() dto: UpdateCourseDto,
    @AuthToken() token: string,
  ) {
    return this.coursesService.update(courseId, dto, token);
  }

  @Patch(':courseId/status')
  @Roles('admin', 'instructor')
  @UseGuards(CourseAccessGuard)
  updateStatus(
    @Param('courseId') courseId: string,
    @Body() dto: UpdateCourseStatusDto,
    @AuthToken() token: string,
  ) {
    return this.coursesService.updateStatus(courseId, dto, token);
  }

  @Delete(':courseId')
  @Roles('admin', 'instructor')
  @UseGuards(CourseAccessGuard)
  softDelete(@Param('courseId') courseId: string, @AuthToken() token: string) {
    return this.coursesService.softDelete(courseId, token);
  }

  // ==========================================
  // INSTRUCTOR MANAGEMENT
  // ==========================================

  @Post(':courseId/instructors')
  @Roles('admin', 'instructor')
  @UseGuards(CourseAccessGuard)
  addInstructor(
    @Param('courseId') courseId: string,
    @Body('userId') userId: string,
    @AuthToken() token: string,
  ) {
    return this.coursesService.addInstructor(courseId, userId, token);
  }

  @Delete(':courseId/instructors/:userId')
  @Roles('admin', 'instructor')
  @UseGuards(CourseAccessGuard)
  removeInstructor(
    @Param('courseId') courseId: string,
    @Param('userId') userId: string,
    @AuthToken() token: string,
  ) {
    return this.coursesService.removeInstructor(courseId, userId, token);
  }

  @Get(':courseId/instructors')
  @Roles('admin', 'instructor')
  @UseGuards(CourseAccessGuard)
  getInstructors(
    @Param('courseId') courseId: string,
    @AuthToken() token: string,
  ) {
    return this.coursesService.getInstructors(courseId, token);
  }
}
