import { Injectable, BadRequestException, ForbiddenException, NotFoundException } from '@nestjs/common';
import { DataConnectService } from '../firebase/dataconnect.service';
import { CreateCourseDto, UpdateCourseDto, UpdateCourseStatusDto, CourseStatus } from './dto/course.dto';

@Injectable()
export class CoursesService {
  constructor(private readonly dc: DataConnectService) {}

  async create(dto: CreateCourseDto, authToken: string) {
    return this.dc.executeMutation(
      'AdminCreateCourse',
      {
        title: dto.title,
        description: dto.description,
        price: dto.price,
        language: dto.language,
        level: dto.level,
        categoryId: dto.categoryId,
        tags: dto.tags,
      },
      authToken,
    );
  }

  async findOne(courseId: string, authToken: string) {
    const data = await this.dc.executeQuery(
      'AdminGetCourse',
      { courseId },
      authToken,
    );
    if (!data?.course) {
      throw new NotFoundException(`Course ${courseId} not found`);
    }
    return data.course;
  }

  async findMyList(authToken: string) {
    const data = await this.dc.executeQuery('AdminListMyCourses', {}, authToken);
    return data?.courses ?? [];
  }

  async update(courseId: string, dto: UpdateCourseDto, authToken: string) {
    return this.dc.executeMutation(
      'AdminUpdateCourse',
      { courseId, ...dto },
      authToken,
    );
  }

  async updateStatus(courseId: string, dto: UpdateCourseStatusDto, authToken: string) {
    // If publishing, validate course has content
    if (dto.status === CourseStatus.PUBLISHED) {
      const course = await this.findOne(courseId, authToken);
      const sections = course.adminSections ?? [];

      if (sections.length === 0) {
        throw new BadRequestException('Cannot publish: course must have at least one section');
      }

      const emptySections = sections.filter(
        (s: any) => !s.adminLectures || s.adminLectures.length === 0,
      );
      if (emptySections.length > 0) {
        throw new BadRequestException(
          `Cannot publish: sections "${emptySections.map((s: any) => s.title).join(', ')}" have no lectures`,
        );
      }
    }

    return this.dc.executeMutation(
      'AdminUpdateCourseStatus',
      { courseId, status: dto.status },
      authToken,
    );
  }

  async softDelete(courseId: string, authToken: string) {
    return this.dc.executeMutation('AdminDeleteCourse', { courseId }, authToken);
  }

  // ==========================================
  // INSTRUCTOR MANAGEMENT
  // ==========================================

  async addInstructor(courseId: string, userId: string, authToken: string) {
    return this.dc.executeMutation(
      'AdminAddCourseInstructor',
      { courseId, userId },
      authToken,
    );
  }

  async removeInstructor(courseId: string, userId: string, authToken: string) {
    return this.dc.executeMutation(
      'AdminRemoveCourseInstructor',
      { courseId, userId },
      authToken,
    );
  }

  async getInstructors(courseId: string, authToken: string) {
    const data = await this.dc.executeQuery(
      'GetCourseInstructors',
      { courseId },
      authToken,
    );
    return data?.courseInstructors ?? [];
  }
}
