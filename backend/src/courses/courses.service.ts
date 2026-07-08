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

/** Default / maximum number of cards returned by the discovery carousels. */
const DEFAULT_DISCOVERY_LIMIT = 10;
const MAX_DISCOVERY_LIMIT = 50;

@Injectable()
export class CoursesService {
  constructor(
    private readonly dc: DataConnectService,
    private readonly access: AccessService,
  ) {}

  // ==========================================
  // PUBLIC / STUDENT QUERIES
  // ==========================================

  async searchCatalog(searchQuery: string, authToken: string) {
    const data = await this.dc.executeQuery(
      'SearchPublishedCourses',
      { searchQuery },
      authToken,
    );
    return data?.courses ?? [];
  }

  async getCategories(authToken: string) {
    const data = await this.dc.executeQuery('ListCategories', {}, authToken);
    return data?.categories ?? [];
  }

  /**
   * Clamp a caller-supplied `limit` query param to a sane [1, MAX] window,
   * defaulting when it is missing or unparseable. Keeps the discovery carousels
   * bounded regardless of client input.
   */
  private clampLimit(limit?: number): number {
    const parsed = Number(limit);
    if (!Number.isFinite(parsed) || parsed <= 0) {
      return DEFAULT_DISCOVERY_LIMIT;
    }
    return Math.min(Math.floor(parsed), MAX_DISCOVERY_LIMIT);
  }

  /**
   * "Popular Courses" — published courses ranked by the denormalised rating
   * aggregate (ratingCount, then avgRating). PUBLIC: no end-user token needed,
   * consistent with the catalog listing.
   */
  async getPopular(limit?: number) {
    const data = await this.dc.executeQuery(
      'ListPopularCourses',
      { limit: this.clampLimit(limit) },
      undefined,
    );
    return data?.courses ?? [];
  }

  /**
   * "Recommended Courses" — personalized to the caller. We look at the
   * categories of the courses they are enrolled in and surface other published
   * courses in those categories that they haven't enrolled in yet, best-rated
   * first. A user with no enrollment history (nothing to personalize on) falls
   * back to the popular list so the carousel is never empty.
   */
  async getRecommended(authToken: string, limit?: number) {
    const clamped = this.clampLimit(limit);

    const data = await this.dc.executeQuery(
      'GetMyEnrolledCourseCategories',
      {},
      authToken,
    );
    const enrollments = data?.enrollments ?? [];

    const categoryIds = new Set<string>();
    const excludeIds = new Set<string>();
    for (const enrollment of enrollments) {
      const course = enrollment?.course;
      // Skip enrollments whose course was soft-deleted or is no longer published.
      if (!course || course.deletedAt) continue;
      if (course.id) excludeIds.add(course.id);
      const categoryId = course.category?.id;
      if (categoryId) categoryIds.add(categoryId);
    }

    // No interests to personalize on → fall back to popular.
    if (categoryIds.size === 0) {
      return this.getPopular(clamped);
    }

    const recommended = await this.dc.executeQuery(
      'ListRecommendedCourses',
      {
        categoryIds: Array.from(categoryIds),
        excludeIds: Array.from(excludeIds),
        limit: clamped,
      },
      undefined,
    );
    const courses = recommended?.courses ?? [];

    // If the categories yield nothing new (e.g. the user already took every
    // course in them), fall back to popular rather than returning an empty rail.
    return courses.length > 0 ? courses : this.getPopular(clamped);
  }

  /**
   * "Continue Learning" — the caller's enrolled courses, each annotated with how
   * many of its lectures they've completed, sorted by completed-lesson count
   * (highest progress first). Progress is derived on-read from the per-lecture
   * completion flags, mirroring GET /courses/:id/progress.
   */
  async getContinueLearning(authToken: string) {
    const data = await this.dc.executeQuery(
      'GetMyContinueLearning',
      {},
      authToken,
    );
    const enrollments = data?.enrollments ?? [];

    const items = enrollments
      .filter((e: any) => e?.course && !e.course.deletedAt)
      .map((enrollment: any) => {
        const course = enrollment.course;
        const lectures = (course.clSections ?? []).flatMap(
          (section: any) => section.clLectures ?? [],
        );
        const totalLessons = lectures.length;
        const completedLessons = lectures.filter(
          (l: any) => l.clProgress?.[0]?.completedAt != null,
        ).length;

        return {
          enrollmentId: enrollment.id,
          status: enrollment.status,
          enrolledAt: enrollment.enrolledAt,
          completedAt: enrollment.completedAt ?? null,
          course: {
            id: course.id,
            title: course.title,
            thumbnail: course.thumbnail ?? null,
            level: course.level,
            price: course.price,
            category: course.category ?? null,
            author: course.author ?? null,
          },
          totalLessons,
          completedLessons,
          percentage:
            totalLessons > 0
              ? Math.round((completedLessons / totalLessons) * 100)
              : 0,
        };
      });

    // Highest progress first; tie-break on percentage so a short course that's
    // further along outranks a long one with the same absolute completed count.
    items.sort(
      (a: any, b: any) =>
        b.completedLessons - a.completedLessons || b.percentage - a.percentage,
    );

    return items;
  }

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
      return enrollmentData?.enrollments?.[0]?.status === 'ACTIVE';
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
