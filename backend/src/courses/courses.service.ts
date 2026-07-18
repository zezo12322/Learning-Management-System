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
  CourseOverview,
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

  // ==========================================
  // INSTRUCTOR ANALYTICS
  // ==========================================

  /**
   * Course-overview analytics for the owning instructor/admin: course details,
   * content counts (sections/lectures/quizzes/assignments), enrollment breakdown,
   * completion/progress statistics and ratings. Ownership is enforced upstream by
   * CourseAccessGuard, so this runs AdminGetCourseOverview via the service account
   * (NO_ACCESS) and reduces the raw rows into the summary the client consumes.
   */
  async getOverview(
    courseId: string,
    authToken: string,
  ): Promise<CourseOverview> {
    const data = await this.dc.executeQuery(
      'AdminGetCourseOverview',
      { courseId },
      authToken,
    );
    const course = data?.course;
    if (!course || course.deletedAt) {
      throw new NotFoundException(`Course ${courseId} not found`);
    }

    const sections = course.sections ?? [];
    const lectures = sections.flatMap((s: any) => s.lectures ?? []);

    // Content counts.
    const lecturesByType = {
      VIDEO: 0,
      READING: 0,
      INTERACTIVE: 0,
      QUIZ: 0,
    };
    let totalDurationSeconds = 0;
    // Completed-lecture tally per student (only completedAt-stamped rows count).
    const completedByUser = new Map<string, number>();
    for (const lecture of lectures) {
      if (lecture.type in lecturesByType) {
        lecturesByType[lecture.type as keyof typeof lecturesByType] += 1;
      }
      totalDurationSeconds += lecture.duration ?? 0;
      for (const p of lecture.progress ?? []) {
        const userId = p.user?.id;
        if (userId && p.completedAt) {
          completedByUser.set(userId, (completedByUser.get(userId) ?? 0) + 1);
        }
      }
    }
    const totalLectures = lectures.length;

    // Enrollment breakdown (raw rows, so re-enrollments are reflected in totals).
    const enrollmentByStatus = {
      ACTIVE: 0,
      COMPLETED: 0,
      DROPPED: 0,
      SUSPENDED: 0,
    };
    for (const e of course.enrollments ?? []) {
      if (e.status in enrollmentByStatus) {
        enrollmentByStatus[e.status as keyof typeof enrollmentByStatus] += 1;
      }
    }
    const totalEnrolled = (course.enrollments ?? []).length;

    // Progress/completion — scoped to ACTIVE + COMPLETED learners, deduped by
    // user id so a re-enrolled student isn't counted twice.
    const learnerIds = new Set<string>();
    for (const e of course.enrollments ?? []) {
      if ((e.status === 'ACTIVE' || e.status === 'COMPLETED') && e.user?.id) {
        learnerIds.add(e.user.id);
      }
    }
    let progressSum = 0;
    let fullyCompletedLearners = 0;
    for (const id of learnerIds) {
      const completed = completedByUser.get(id) ?? 0;
      const pct = totalLectures > 0 ? completed / totalLectures : 0;
      progressSum += pct;
      if (totalLectures > 0 && completed >= totalLectures) {
        fullyCompletedLearners += 1;
      }
    }
    const activeLearners = learnerIds.size;
    const averageCompletionPercent =
      activeLearners > 0 ? round2((progressSum / activeLearners) * 100) : 0;
    const completionRatePercent =
      activeLearners > 0
        ? round2((fullyCompletedLearners / activeLearners) * 100)
        : 0;

    // Assignments (missions) + submission breakdown.
    const missions = course.missions ?? [];
    const submissionByStatus = {
      PENDING: 0,
      GRADED: 0,
      RETURNED: 0,
      REJECTED: 0,
    };
    let totalSubmissions = 0;
    for (const m of missions) {
      for (const sub of m.submissions ?? []) {
        totalSubmissions += 1;
        if (sub.status in submissionByStatus) {
          submissionByStatus[sub.status as keyof typeof submissionByStatus] += 1;
        }
      }
    }

    // Ratings — average/count from the denormalised cache; distribution from rows.
    const distribution = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };
    for (const r of course.ratings ?? []) {
      if (r.rating >= 1 && r.rating <= 5) {
        distribution[r.rating as 1 | 2 | 3 | 4 | 5] += 1;
      }
    }

    return {
      course: {
        id: course.id,
        title: course.title,
        description: course.description ?? null,
        price: course.price,
        status: course.status,
        language: course.language,
        level: course.level,
        thumbnail: course.thumbnail ?? null,
        tags: course.tags ?? [],
        category: course.category ?? null,
        author: course.author ?? null,
        createdAt: course.createdAt,
        updatedAt: course.updatedAt,
      },
      instructors: (course.instructors ?? [])
        .map((i: any) => i.user)
        .filter(Boolean),
      content: {
        totalSections: sections.length,
        totalLectures,
        lecturesByType,
        totalQuizzes: lecturesByType.QUIZ,
        totalDurationSeconds,
      },
      assignments: {
        total: missions.length,
        submissions: {
          total: totalSubmissions,
          byStatus: submissionByStatus,
        },
      },
      enrollments: {
        total: totalEnrolled,
        byStatus: enrollmentByStatus,
      },
      progress: {
        activeLearners,
        averageCompletionPercent,
        fullyCompletedLearners,
        completionRatePercent,
      },
      ratings: {
        average: course.avgRating ?? 0,
        count: course.ratingCount ?? 0,
        distribution,
      },
    };
  }
}

/** Round to 2 decimal places (percentages are reported with 2-dp precision). */
function round2(n: number): number {
  return Math.round(n * 100) / 100;
}
