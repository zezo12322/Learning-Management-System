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
import { DataConnectService } from '../firebase/dataconnect.service';

@Controller('courses')
@UseGuards(FirebaseAuthGuard)
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
  findOne(@Param('courseId') courseId: string, @Req() req: any) {
    return this.coursesService.findOne(courseId, this.dc.extractToken(req));
  }

  @Patch(':courseId')
  update(
    @Param('courseId') courseId: string,
    @Body() dto: UpdateCourseDto,
    @Req() req: any,
  ) {
    return this.coursesService.update(courseId, dto, this.dc.extractToken(req));
  }

  @Patch(':courseId/status')
  updateStatus(
    @Param('courseId') courseId: string,
    @Body() dto: UpdateCourseStatusDto,
    @Req() req: any,
  ) {
    return this.coursesService.updateStatus(courseId, dto, this.dc.extractToken(req));
  }

  @Delete(':courseId')
  softDelete(@Param('courseId') courseId: string, @Req() req: any) {
    return this.coursesService.softDelete(courseId, this.dc.extractToken(req));
  }

  // ==========================================
  // INSTRUCTOR MANAGEMENT
  // ==========================================

  @Post(':courseId/instructors')
  addInstructor(
    @Param('courseId') courseId: string,
    @Body('userId') userId: string,
    @Req() req: any,
  ) {
    return this.coursesService.addInstructor(courseId, userId, this.dc.extractToken(req));
  }

  @Delete(':courseId/instructors/:userId')
  removeInstructor(
    @Param('courseId') courseId: string,
    @Param('userId') userId: string,
    @Req() req: any,
  ) {
    return this.coursesService.removeInstructor(courseId, userId, this.dc.extractToken(req));
  }

  @Get(':courseId/instructors')
  getInstructors(@Param('courseId') courseId: string, @Req() req: any) {
    return this.coursesService.getInstructors(courseId, this.dc.extractToken(req));
  }
}
