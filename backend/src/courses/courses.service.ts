import {
  Injectable,
  BadRequestException,
  ForbiddenException,
  NotFoundException,
} from '@nestjs/common';
import { DataConnectService } from '../firebase/dataconnect.service';
import { AccessService } from '../common/services/access.service';
import {
  CreateCourseDto,
  UpdateCourseDto,
  UpdateCourseStatusDto,
  CourseStatus,
} from './dto/course.dto';


@Injectable()
export class CoursesService {
  constructor(
    private readonly dc: DataConnectService,
    private readonly access: AccessService,
  ) {}

  // ==========================================
  // PUBLIC / STUDENT QUERIES
  // ==========================================

  /**
   * "Video Description" — the description of every uploaded VIDEO lecture in a
   * course. Access-gated exactly like the curriculum: the owner/admin or an
   * actively-enrolled student sees every description; everyone else sees the
   * video list but only free-preview descriptions (paid descriptions are
   * nulled), so the public course page still works without leaking gated copy.
   */
  async getCourseVideos(
    courseId: string,
    authToken: string,
    uid: string | undefined,
    isAdmin: boolean,
  ) {
    const data = await this.dc.executeQuery(
      'GetCourseVideos',
      { courseId },
      authToken,
    );
    const course = data?.course;
    if (!course || course.deletedAt) {
      throw new NotFoundException(`Course ${courseId} not found`);
    }

    const entitled = await this.hasFullContentAccess(
      courseId,
      authToken,
      uid,
      isAdmin,
    );

    const videos = (course.videoSections ?? []).flatMap((section: any) =>
      (section.videoLectures ?? []).map((lecture: any) => ({
        id: lecture.id,
        title: lecture.title,
        // `content` doubles as the video's description; withhold it for gated
        // videos when the caller isn't entitled.
        description:
          entitled || lecture.isFreePreview ? (lecture.content ?? null) : null,
        duration: lecture.duration ?? null,
        isFreePreview: lecture.isFreePreview,
        order: lecture.order,
        sectionId: section.id,
        sectionTitle: section.title,
      })),
    );

    return { courseId: course.id, title: course.title, videos };
  }

  /**
   * True when the caller owns the course (or is admin) or is actively enrolled —
   * i.e. entitled to see gated lecture content/descriptions. Mirrors the
   * entitlement check in CatalogService.getCurriculum.
   */
  private async hasFullContentAccess(
    courseId: string,
    authToken: string,
    uid: string | undefined,
    isAdmin: boolean,
  ): Promise<boolean> {
    try {
      await this.access.assertCourseAccess(courseId, uid, authToken, isAdmin);
      return true;
    } catch {
      const enrollmentData = await this.dc.executeQuery(
        'GetUserEnrollmentForCourse',
        { courseId },
        authToken,
      );
      const enrollmentStatus = enrollmentData?.enrollments?.[0]?.status;
      return enrollmentStatus === 'ACTIVE' || enrollmentStatus === 'COMPLETED';
    }
  }

  // ==========================================
  // ADMIN / INSTRUCTOR MANAGEMENT
  // ==========================================

  async create(dto: CreateCourseDto, authToken: string, uid: string) {
    // AdminCreateCourse now runs via the service account (NO_ACCESS in the
    // connector), which carries no auth.uid — so the author is passed explicitly
    // as the backend-verified caller uid.
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
        authorId: uid,
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
    const data = await this.dc.executeQuery(
      'AdminListMyCourses',
      {},
      authToken,
    );
    return data?.courses ?? [];
  }

  async update(courseId: string, dto: UpdateCourseDto, authToken: string) {
    return this.dc.executeMutation(
      'AdminUpdateCourse',
      { courseId, ...dto },
      authToken,
    );
  }

  async updateStatus(
    courseId: string,
    dto: UpdateCourseStatusDto,
    authToken: string,
  ) {
    // If publishing, validate course has content
    if (dto.status === CourseStatus.PUBLISHED) {
      const course = await this.findOne(courseId, authToken);
      const sections = course.adminSections ?? [];

      if (sections.length === 0) {
        throw new BadRequestException(
          'Cannot publish: course must have at least one section',
        );
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
    return this.dc.executeMutation(
      'AdminSoftDeleteCourse',
      { courseId },
      authToken,
    );
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
