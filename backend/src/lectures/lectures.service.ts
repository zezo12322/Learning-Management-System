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
import { CreateLectureDto, UpdateLectureDto, MoveLectureDto, LectureType } from './dto/lecture.dto';
import { assertReorderMembership } from '../common/utils/ordering';

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
    return {
      ...lecture,
      videoUrl: await this.firebase.resolveReadUrl(lecture.videoUrl),
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

  async create(courseId: string, sectionId: string, dto: CreateLectureDto, authToken: string) {
    this.validateTypeContent(dto.type, dto.videoUrl, dto.content);

    // Fetch existing lectures to auto-calculate order
    const course = await this.dc.executeQuery('AdminGetCourse', { courseId }, authToken);
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
      const videoUrl = dto.videoUrl !== undefined ? dto.videoUrl : current.videoUrl;
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
    await this.dc.executeMutation(
      'AdminSoftDeleteLecture',
      { lectureId },
      authToken,
    );

    // Re-normalize the order of the remaining (non-deleted) lectures in the section
    const course = await this.dc.executeQuery('AdminGetCourse', { courseId }, authToken);
    const section = (course?.course?.adminSections ?? []).find(
      (s: any) => s.id === sectionId,
    );
    const remaining = (section?.adminLectures ?? [])
      .filter((l: any) => l.id !== lectureId)
      .map((l: any) => l.id);
    await this.ordering.applyOrder(remaining, 'AdminUpdateLectureOrder', 'lectureId', authToken);

    return { success: true };
  }

  async reorder(
    courseId: string,
    sectionId: string,
    orderedIds: string[],
    authToken: string,
  ) {
    // Validate every id belongs to this section before reordering.
    const course = await this.dc.executeQuery('AdminGetCourse', { courseId }, authToken);
    const section = (course?.course?.adminSections ?? []).find(
      (s: any) => s.id === sectionId,
    );
    const validIds = (section?.adminLectures ?? []).map((l: any) => l.id);
    assertReorderMembership(orderedIds, validIds, 'lecture');

    await this.ordering.applyOrder(orderedIds, 'AdminUpdateLectureOrder', 'lectureId', authToken);
    return { success: true, order: orderedIds };
  }

  async move(lectureId: string, dto: MoveLectureDto, authToken: string) {
    // The caller's ownership of the lecture is verified by the guard; here we
    // ensure the target section is in the SAME course, so a lecture can't be
    // moved into another course's section.
    const lec = await this.dc.executeQuery('GetLectureContent', { lectureId }, authToken);
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

      // Actively-enrolled students may view.
      const enrollmentData = await this.dc.executeQuery(
        'GetUserEnrollmentForCourse',
        { courseId },
        authToken,
      );
      if (enrollmentData?.enrollments?.[0]?.status === 'ACTIVE') {
        return this.signLectureUrls(lecture);
      }
    }

    throw new ForbiddenException(
      'You must be enrolled in this course to view this lecture',
    );
  }
}
