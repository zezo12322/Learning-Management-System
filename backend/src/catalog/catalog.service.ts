import { Injectable, NotFoundException } from '@nestjs/common';
import { DataConnectService } from '../firebase/dataconnect.service';
import { RatingsService } from '../ratings/ratings.service';
import { AccessService } from '../common/services/access.service';

/**
 * Student-facing course discovery (catalog) + curriculum outline. Read-only.
 * `listPublished` runs against the PUBLIC connector op (no auth required);
 * `getCurriculum` runs the (now NO_ACCESS) curriculum query via the service
 * account and gates the gated `content` per the caller's entitlement.
 */
@Injectable()
export class CatalogService {
  constructor(
    private readonly dc: DataConnectService,
    private readonly ratingsService: RatingsService,
    private readonly access: AccessService,
  ) {}

  async listPublished() {
    // PUBLIC operation — no end-user token needed.
    const data = await this.dc.executeQuery(
      'ListPublishedCourses',
      {},
      undefined,
    );
    return data?.courses ?? [];
  }

  async getCurriculum(
    courseId: string,
    authToken: string,
    uid: string | undefined,
    isAdmin: boolean,
  ) {
    const data = await this.dc.executeQuery(
      'GetCourseCurriculum',
      { courseId },
      authToken,
    );
    if (!data?.course) {
      throw new NotFoundException(`Course ${courseId} not found`);
    }
    const course = data.course;

    // Entitlement: the course owner/admin or an actively-enrolled student may see
    // every lecture's full `content`. Everyone else gets the outline (titles,
    // structure, durations) plus content only for lectures marked free preview —
    // so the public course page still works without leaking paid material.
    if (!(await this.hasFullContentAccess(courseId, authToken, uid, isAdmin))) {
      for (const section of course.publishedSections ?? []) {
        for (const lecture of section.publishedLectures ?? []) {
          if (!lecture.isFreePreview) {
            lecture.content = null;
          }
        }
      }
    }

    // Surface the aggregate rating alongside the curriculum so the course detail
    // page can render its star score in a single round-trip.
    const ratingSummary = await this.ratingsService.getSummary(courseId);
    return { ...course, ratingSummary };
  }

  /** True when the caller owns the course (or is admin) or is actively enrolled. */
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
}
