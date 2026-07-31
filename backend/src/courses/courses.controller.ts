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
  Req,
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
import { AuditLoggingService } from '../logging/logging.service';

@Controller('courses')
@UseGuards(FirebaseAuthGuard, RolesGuard)
export class CoursesController {
  constructor(
    private readonly coursesService: CoursesService,
    private readonly auditLoggingService: AuditLoggingService,
  ) {}

  // ==========================================
  // PUBLIC / STUDENT ROUTES
  // ==========================================

  // Discovery routes (search/categories/popular/recommended/continue-learning)
  // MUST stay above the ':courseId' routes below, otherwise their static paths
  // are shadowed by the param route — "categories" etc. would be treated as a
  // course id and CourseAccessGuard rejects it as an invalid UUID (HTTP 400).
  // Any signed-in user may call them (no @Roles); most underlying data is public
  // catalog content.

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

  // Most popular published courses (rating-aggregate ranked). Any signed-in user.
  @Get('popular')
  getPopular(@Query('limit') limit?: string) {
    return this.coursesService.getPopular(limit ? Number(limit) : undefined);
  }

  // Personalized recommendations for the caller (falls back to popular).
  @Get('recommended')
  getRecommended(@AuthToken() token: string, @Query('limit') limit?: string) {
    return this.coursesService.getRecommended(
      token,
      limit ? Number(limit) : undefined,
    );
  }

  // The caller's enrolled courses, ranked by completed-lesson count (desc).
  @Get('continue-learning')
  getContinueLearning(@AuthToken() token: string) {
    return this.coursesService.getContinueLearning(token);
  }

  // Descriptions of every uploaded video in a course. Access-gated in the service
  // (owner/admin or active enrollee see all; others get free-preview only).
  @Get(':courseId/videos')
  getCourseVideos(
    @Param('courseId') courseId: string,
    @AuthToken() token: string,
    @CurrentUser('uid') uid: string,
    @Req() req: any,
  ) {
    const isAdmin = (req.userRoles ?? []).includes('admin');
    return this.coursesService.getCourseVideos(courseId, token, uid, isAdmin);
  }

  // ==========================================
  // ADMIN / INSTRUCTOR ROUTES
  // ==========================================

  @Post()
  @Roles('admin', 'instructor')
  async create(
    @Body() dto: CreateCourseDto,
    @AuthToken() token: string,
    @CurrentUser('uid') uid: string,
    @Req() req: any,
  ) {
    console.log('--- COURSES CONTROLLER CREATE ---');
    console.log('Extracted uid:', uid);
    const result = await this.coursesService.create(dto, token, uid);
    // fire-and-forget — a Firestore failure must never affect the API response
    this.auditLoggingService.createLog({
      action: 'CREATE_COURSE',
      adminUid: uid,
      targetUid: result?.course_insert?.id ?? null,
      ipAddress: req.ip,
      details: dto,
    });
    return result;
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

  // Instructor course-overview analytics — course details, content counts,
  // enrollment breakdown, completion/progress stats and ratings. Owner-scoped by
  // CourseAccessGuard (admins pass unconditionally).
  @Get(':courseId/overview')
  @Roles('admin', 'instructor')
  @UseGuards(CourseAccessGuard)
  getOverview(@Param('courseId') courseId: string, @AuthToken() token: string) {
    return this.coursesService.getOverview(courseId, token);
  }

  @Patch(':courseId')
  @Roles('admin', 'instructor')
  @UseGuards(CourseAccessGuard)
  async update(
    @Param('courseId') courseId: string,
    @Body() dto: UpdateCourseDto,
    @AuthToken() token: string,
    @Req() req: any,
  ) {
    const result = await this.coursesService.update(courseId, dto, token);
    this.auditLoggingService.createLog({
      action: 'UPDATE_COURSE',
      adminUid: req.user?.uid ?? 'unknown',
      targetUid: courseId,
      ipAddress: req.ip,
      details: dto,
    });
    return result;
  }

  @Patch(':courseId/status')
  @Roles('admin', 'instructor')
  @UseGuards(CourseAccessGuard)
  async updateStatus(
    @Param('courseId') courseId: string,
    @Body() dto: UpdateCourseStatusDto,
    @AuthToken() token: string,
    @Req() req: any,
  ) {
    const result = await this.coursesService.updateStatus(courseId, dto, token);
    this.auditLoggingService.createLog({
      action: 'UPDATE_COURSE_STATUS',
      adminUid: req.user?.uid ?? 'unknown',
      targetUid: courseId,
      ipAddress: req.ip,
      details: dto,
    });
    return result;
  }

  @Delete(':courseId')
  @Roles('admin', 'instructor')
  @UseGuards(CourseAccessGuard)
  async softDelete(
    @Param('courseId') courseId: string,
    @AuthToken() token: string,
    @Req() req: any,
  ) {
    const result = await this.coursesService.softDelete(courseId, token);
    this.auditLoggingService.createLog({
      action: 'DELETE_COURSE',
      adminUid: req.user?.uid ?? 'unknown',
      targetUid: courseId,
      ipAddress: req.ip,
      details: { courseId },
    });
    return result;
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
