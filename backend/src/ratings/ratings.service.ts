import {
  Injectable,
  Logger,
  BadRequestException,
  ForbiddenException,
  NotFoundException,
} from '@nestjs/common';
import { DataConnectService } from '../firebase/dataconnect.service';
import { UpsertCourseRatingDto } from './dto/rating.dto';

/** Default / maximum page size for the reviews list. */
const DEFAULT_PAGE_SIZE = 20;
const MAX_PAGE_SIZE = 50;

export interface CourseRatingSummary {
  average: number; // mean rating, rounded to 1 decimal (0 when there are none)
  count: number; // total number of ratings
  distribution: Record<1 | 2 | 3 | 4 | 5, number>; // how many ratings per star
}

/**
 * Course ratings & reviews. A student may leave exactly one rating per course
 * (enforced by the (user, course) composite key on CourseRating), which they can
 * edit or remove. Rating is gated on enrollment — you can only review a course
 * you actually took — mirroring how enrollment is the precondition for progress
 * and quizzes elsewhere in the platform.
 *
 * Aggregates (average / count / distribution) are derived on-read in the service
 * rather than stored denormalised, consistent with how course completion is
 * computed from GetCourseCompletionStatus. If rating volume ever makes this hot,
 * the natural follow-up is to cache the summary or denormalise it onto Course.
 */
@Injectable()
export class RatingsService {
  private readonly logger = new Logger(RatingsService.name);

  constructor(private readonly dc: DataConnectService) {}

  async upsertRating(
    courseId: string,
    dto: UpsertCourseRatingDto,
    authToken: string,
  ) {
    await this.assertCourseIsRateable(courseId, authToken);
    await this.assertEnrolled(courseId, authToken);

    const result = await this.dc.executeMutation(
      'UpsertCourseRating',
      { courseId, rating: dto.rating, review: dto.review ?? null },
      authToken,
    );
    await this.recomputeCourseAggregate(courseId);
    return result;
  }

  async deleteRating(courseId: string, authToken: string) {
    const result = await this.dc.executeMutation(
      'DeleteCourseRating',
      { courseId },
      authToken,
    );
    await this.recomputeCourseAggregate(courseId);
    return result;
  }

  async getMyRating(courseId: string, authToken: string) {
    const data = await this.dc.executeQuery(
      'GetMyCourseRating',
      { courseId },
      authToken,
    );
    return data?.courseRatings?.[0] ?? null;
  }

  async listRatings(
    courseId: string,
    pagination: { limit?: number; offset?: number } = {},
  ) {
    const limit = Math.min(pagination.limit ?? DEFAULT_PAGE_SIZE, MAX_PAGE_SIZE);
    const offset = Math.max(pagination.offset ?? 0, 0);
    // PUBLIC operation — no end-user token needed.
    const data = await this.dc.executeQuery(
      'ListCourseRatings',
      { courseId, limit, offset },
      undefined,
    );
    return data?.courseRatings ?? [];
  }

  async getSummary(courseId: string): Promise<CourseRatingSummary> {
    // PUBLIC operation — no end-user token needed.
    const data = await this.dc.executeQuery(
      'GetCourseRatingsForSummary',
      { courseId },
      undefined,
    );
    return this.summarize(data?.courseRatings ?? []);
  }

  /**
   * Derive the average, total count and per-star distribution from raw rating
   * rows. Kept pure (no I/O) so it is trivially unit-testable.
   */
  summarize(ratings: Array<{ rating: number }>): CourseRatingSummary {
    const distribution: Record<1 | 2 | 3 | 4 | 5, number> = {
      1: 0,
      2: 0,
      3: 0,
      4: 0,
      5: 0,
    };

    let sum = 0;
    let count = 0;
    for (const { rating } of ratings) {
      if (rating >= 1 && rating <= 5) {
        distribution[rating as 1 | 2 | 3 | 4 | 5] += 1;
        sum += rating;
        count += 1;
      }
    }

    const average = count === 0 ? 0 : Math.round((sum / count) * 10) / 10;
    return { average, count, distribution };
  }

  /**
   * Refresh the denormalised avgRating/ratingCount on the Course after a rating
   * change. Runs as the service account (NO_ACCESS op) so a client can never set
   * a course's score directly. Best-effort: a failure here is logged but does not
   * fail the user's write — the on-read summary (getSummary) remains authoritative
   * and the next successful write self-heals the cache.
   */
  private async recomputeCourseAggregate(courseId: string) {
    try {
      const data = await this.dc.executeQuery(
        'GetCourseRatingsForSummary',
        { courseId },
        undefined,
      );
      const { average, count } = this.summarize(data?.courseRatings ?? []);
      await this.dc.executeMutationAsAdmin('AdminUpdateCourseRatingAggregate', {
        courseId,
        avgRating: average,
        ratingCount: count,
      });
    } catch (err) {
      this.logger.warn(
        `Failed to recompute rating aggregate for course ${courseId}: ${
          (err as Error)?.message
        }`,
      );
    }
  }

  /** A course must exist and be published before it can be rated. */
  private async assertCourseIsRateable(courseId: string, authToken: string) {
    const data = await this.dc.executeQuery(
      'GetCourseForEnrollment',
      { courseId },
      authToken,
    );
    const course = data?.course;
    if (!course || course.deletedAt) {
      throw new NotFoundException(`Course ${courseId} not found`);
    }
    if (course.status !== 'PUBLISHED') {
      throw new BadRequestException('Course is not open for rating');
    }
  }

  /** Only a student enrolled in the course may rate it. */
  private async assertEnrolled(courseId: string, authToken: string) {
    const data = await this.dc.executeQuery(
      'GetUserEnrollmentForCourse',
      { courseId },
      authToken,
    );
    const enrollment = data?.enrollments?.[0];
    if (
      !enrollment ||
      (enrollment.status !== 'ACTIVE' && enrollment.status !== 'COMPLETED')
    ) {
      throw new ForbiddenException(
        'You must be enrolled in this course to rate it',
      );
    }
  }
}
