import {
  Injectable,
  BadRequestException,
  NotFoundException,
  ForbiddenException,
} from '@nestjs/common';
import { DataConnectService } from '../firebase/dataconnect.service';
import { FirebaseService } from '../firebase/firebase.service';
import { OrderingService } from '../common/services/ordering.service';
import { AccessService } from '../common/services/access.service';
import {
  CreateLectureDto,
  UpdateLectureDto,
  MoveLectureDto,
  LectureType,
} from './dto/lecture.dto';
import { assertReorderMembership } from '../common/utils/ordering';
import {
  hlsPlaylistDurationSeconds,
  readingDurationSeconds,
} from './lecture-duration';

@Injectable()
export class LecturesService {
  constructor(
    private readonly dc: DataConnectService,
    private readonly ordering: OrderingService,
    private readonly access: AccessService,
    private readonly firebase: FirebaseService,
  ) {}

  /** Replace stored private storage paths with short-lived signed read URLs (H2). */
  private async signLectureUrls(lecture: any): Promise<any> {
    const videoUrl = await this.firebase.resolveReadUrl(lecture.videoUrl);
    return {
      ...lecture,
      videoUrl,
      transcriptUrl: await this.firebase.resolveReadUrl(lecture.transcriptUrl),
    };
  }

  /**
   * Validates that the content matches the lecture type:
   * VIDEO requires a videoUrl, READING requires content.
   */
  private validateTypeContent(
    type: LectureType | undefined,
    videoUrl?: string | null,
    content?: string | null,
  ) {
    if (type === LectureType.VIDEO && !videoUrl) {
      throw new BadRequestException('VIDEO lectures require a videoUrl');
    }
    if (type === LectureType.READING && !content) {
      throw new BadRequestException('READING lectures require content');
    }
  }

  async create(
    courseId: string,
    sectionId: string,
    dto: CreateLectureDto,
    authToken: string,
  ) {
    this.validateTypeContent(dto.type, dto.videoUrl, dto.content);

    // Fetch existing lectures to auto-calculate order
    const course = await this.dc.executeQuery(
      'AdminGetCourse',
      { courseId },
      authToken,
    );
    const section = (course?.course?.adminSections ?? []).find(
      (s: any) => s.id === sectionId,
    );
    // Reject if the section isn't part of the authorized course (the route's
    // :courseId is what CourseAccessGuard checked) — otherwise a lecture could
    // be attached to another course's section.
    if (!section) {
      throw new BadRequestException(
        `Section ${sectionId} does not belong to course ${courseId}`,
      );
    }
    const lectures = section.adminLectures ?? [];

    return this.dc.executeMutation(
      'AdminCreateLectureFull',
      {
        sectionId,
        title: dto.title,
        type: dto.type,
        videoUrl: dto.videoUrl ?? null,
        content: dto.content ?? null,
        duration: dto.duration ?? null,
        transcriptUrl: dto.transcriptUrl ?? null,
        isFreePreview: dto.isFreePreview ?? false,
        order: this.ordering.nextOrder(lectures),
      },
      authToken,
    );
  }

  async update(lectureId: string, dto: UpdateLectureDto, authToken: string) {
    // Only enforce type-content consistency when the type is being set. Validate
    // against the MERGED state (incoming fields over the persisted record) so a
    // PATCH that only changes `type` isn't wrongly rejected for a videoUrl/content
    // that already exists on the lecture (M1).
    if (dto.type) {
      const existing = await this.dc.executeQuery(
        'GetLectureContent',
        { lectureId },
        authToken,
      );
      const current = existing?.courseLecture;
      if (!current) {
        throw new NotFoundException(`Lecture ${lectureId} not found`);
      }
      const videoUrl =
        dto.videoUrl !== undefined ? dto.videoUrl : current.videoUrl;
      const content = dto.content !== undefined ? dto.content : current.content;
      this.validateTypeContent(dto.type, videoUrl, content);
    }
    return this.dc.executeMutation(
      'AdminUpdateLecture',
      { lectureId, ...dto },
      authToken,
    );
  }

  async softDelete(
    courseId: string,
    sectionId: string,
    lectureId: string,
    authToken: string,
  ) {
    // Notify AI service to delete the video index (fire-and-forget, don't block on failure)
    try {
      const aiUrl = process.env.AI_SERVICE_URL || 'http://localhost:8000';
      const internalApiKey = process.env.INTERNAL_API_KEY || 'default-secret';
      fetch(`${aiUrl}/v1/videos/${lectureId}`, {
        method: 'DELETE',
        headers: { 'X-Internal-Api-Key': internalApiKey },
      }).catch((err) =>
        console.warn(
          `Failed to delete AI index for ${lectureId}: ${err.message}`,
        ),
      );
    } catch (err) {
      // ignore
    }

    await this.dc.executeMutation(
      'AdminSoftDeleteLecture',
      { lectureId },
      authToken,
    );

    // Re-normalize the order of the remaining (non-deleted) lectures in the section
    const course = await this.dc.executeQuery(
      'AdminGetCourse',
      { courseId },
      authToken,
    );
    const section = (course?.course?.adminSections ?? []).find(
      (s: any) => s.id === sectionId,
    );
    const remaining = (section?.adminLectures ?? [])
      .filter((l: any) => l.id !== lectureId)
      .map((l: any) => l.id);
    await this.ordering.applyOrder(
      remaining,
      'AdminUpdateLectureOrder',
      'lectureId',
      authToken,
    );

    return { success: true };
  }

  async reorder(
    courseId: string,
    sectionId: string,
    orderedIds: string[],
    authToken: string,
  ) {
    // Validate every id belongs to this section before reordering.
    const course = await this.dc.executeQuery(
      'AdminGetCourse',
      { courseId },
      authToken,
    );
    const section = (course?.course?.adminSections ?? []).find(
      (s: any) => s.id === sectionId,
    );
    const validIds = (section?.adminLectures ?? []).map((l: any) => l.id);
    assertReorderMembership(orderedIds, validIds, 'lecture');

    await this.ordering.applyOrder(
      orderedIds,
      'AdminUpdateLectureOrder',
      'lectureId',
      authToken,
    );
    return { success: true, order: orderedIds };
  }

  async move(lectureId: string, dto: MoveLectureDto, authToken: string) {
    // The caller's ownership of the lecture is verified by the guard; here we
    // ensure the target section is in the SAME course, so a lecture can't be
    // moved into another course's section.
    const lec = await this.dc.executeQuery(
      'GetLectureContent',
      { lectureId },
      authToken,
    );
    const sourceCourseId = lec?.courseLecture?.section?.course?.id;
    if (!sourceCourseId) {
      throw new NotFoundException(`Lecture ${lectureId} not found`);
    }

    const tgt = await this.dc.executeQuery(
      'GetSectionCourse',
      { sectionId: dto.targetSectionId },
      authToken,
    );
    const targetCourseId = tgt?.courseSection?.course?.id;
    if (!targetCourseId) {
      throw new NotFoundException(`Section ${dto.targetSectionId} not found`);
    }
    if (sourceCourseId !== targetCourseId) {
      throw new BadRequestException(
        'Cannot move a lecture to a section in a different course',
      );
    }

    return this.dc.executeMutation(
      'AdminMoveLectureToSection',
      {
        lectureId,
        newSectionId: dto.targetSectionId,
        order: dto.targetOrder,
      },
      authToken,
    );
  }

  /**
   * Student-facing lecture content. Access is gated (H1): full content
   * (videoUrl/content/transcriptUrl) is only returned to the course owner/admin,
   * an actively-enrolled student, or for lectures explicitly marked free preview.
   */
  async getContent(
    lectureId: string,
    authToken: string,
    uid: string | undefined,
    isAdmin: boolean,
  ) {
    const data = await this.dc.executeQuery(
      'GetLectureContent',
      { lectureId },
      authToken,
    );
    const lecture = data?.courseLecture;
    if (!lecture) {
      throw new NotFoundException(`Lecture ${lectureId} not found`);
    }

    // Free preview lectures are open to any authenticated user.
    if (lecture.isFreePreview) return this.signLectureUrls(lecture);

    const courseId = lecture.section?.course?.id;
    if (courseId) {
      // Course owner / admin / assigned instructor may always view.
      try {
        await this.access.assertCourseAccess(courseId, uid, authToken, isAdmin);
        return this.signLectureUrls(lecture);
      } catch {
        // Not an owner — fall through to the enrollment check.
      }

      // Actively-enrolled or completed students may view.
      const enrollmentData = await this.dc.executeQuery(
        'GetUserEnrollmentForCourse',
        { courseId },
        authToken,
      );
      const enrollmentStatus = enrollmentData?.enrollments?.[0]?.status;
      if (enrollmentStatus === 'ACTIVE' || enrollmentStatus === 'COMPLETED') {
        return this.signLectureUrls(lecture);
      }
    }

    throw new ForbiddenException(
      'You must be enrolled in this course to view this lecture (Status check failed)',
    );
  }

  /**
   * Re-derive every lecture length in a course from what the lecture actually
   * contains, and report what is wrong before changing anything.
   *
   * This exists because durations were authored by hand for years while the
   * transcode was already measuring them, and because until recently the
   * curriculum editor rewrote `duration` on every save — so a title edit
   * re-rounded the length to the nearest minute. The stored numbers are
   * therefore a mix of measured, rounded and invented, and nothing on the
   * lecture says which is which.
   *
   * It is a read-only report unless `apply` is set. A duration is not cosmetic:
   * completion is credited at `duration * COMPLETION_THRESHOLD`, so rewriting
   * one moves the bar for learners already part-way through the lesson. The
   * report is the thing to look at first.
   */
  async backfillDurations(
    courseId: string,
    authToken: string,
    apply = false,
  ): Promise<{
    courseId: string;
    applied: boolean;
    changed: any[];
    unchanged: number;
    skipped: any[];
  }> {
    const data = await this.dc.executeQuery(
      'AdminGetCourse',
      { courseId },
      authToken,
    );
    if (!data?.course) {
      throw new NotFoundException(`Course ${courseId} not found`);
    }

    const lectures: any[] = (data.course.adminSections ?? []).flatMap(
      (section: any) => section.adminLectures ?? [],
    );

    const changed: any[] = [];
    const skipped: any[] = [];
    let unchanged = 0;

    for (const lecture of lectures) {
      const stored = lecture.duration ?? 0;
      // Declared without a seed: every branch below either assigns both or
      // `continue`s, and a placeholder here would only mask a missed branch.
      let derived: number | null;
      let source: string;

      if (lecture.type === 'VIDEO' && lecture.videoUrl) {
        // The packaged playlist, not the source MP4: it is a few hundred bytes
        // and carries the same figure FFmpeg measured while writing it.
        try {
          const playlist = (
            await this.firebase.downloadFile(lecture.videoUrl)
          ).toString('utf8');
          derived = hlsPlaylistDurationSeconds(playlist);
          source = 'hls';
          if (derived === null) {
            skipped.push({
              id: lecture.id,
              title: lecture.title,
              reason: 'playlist carries no segment durations',
            });
            continue;
          }
        } catch {
          // A lecture whose playlist cannot be read is reported, never guessed
          // at: writing a fabricated length here is the failure this endpoint
          // exists to undo.
          skipped.push({
            id: lecture.id,
            title: lecture.title,
            reason: 'playlist could not be read from storage',
          });
          continue;
        }
      } else if (lecture.type === 'READING') {
        derived = readingDurationSeconds(lecture.content);
        source = 'reading-time';
        if (derived === 0) {
          skipped.push({
            id: lecture.id,
            title: lecture.title,
            reason: 'reading has no body text to time',
          });
          continue;
        }
      } else {
        skipped.push({
          id: lecture.id,
          title: lecture.title,
          reason:
            lecture.type === 'VIDEO'
              ? 'video has not been packaged yet'
              : `no way to measure a ${lecture.type} lecture`,
        });
        continue;
      }

      if (derived === stored) {
        unchanged += 1;
        continue;
      }

      changed.push({
        id: lecture.id,
        title: lecture.title,
        type: lecture.type,
        source,
        storedSeconds: stored,
        derivedSeconds: derived,
      });

      if (apply) {
        // Partial variables only — Data Connect leaves absent fields alone, the
        // same way the transcoder writes a duration without touching the title.
        await this.dc.executeMutationAsAdmin('AdminUpdateLecture', {
          lectureId: lecture.id,
          duration: derived,
        });
      }
    }

    return { courseId, applied: apply, changed, unchanged, skipped };
  }
}
