import { Injectable, BadRequestException } from '@nestjs/common';
import { DataConnectService } from '../firebase/dataconnect.service';
import { CreateLectureDto, UpdateLectureDto, MoveLectureDto, LectureType } from './dto/lecture.dto';

@Injectable()
export class LecturesService {
  constructor(private readonly dc: DataConnectService) {}

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
    const lectures = section?.adminLectures ?? [];
    const maxOrder = lectures.reduce(
      (max: number, l: any) => Math.max(max, l.order ?? 0),
      0,
    );

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
        order: maxOrder + 1,
      },
      authToken,
    );
  }

  async update(lectureId: string, dto: UpdateLectureDto, authToken: string) {
    // Only enforce type-content consistency when the type is being set
    if (dto.type) {
      this.validateTypeContent(dto.type, dto.videoUrl, dto.content);
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
    const remaining = (section?.adminLectures ?? []).filter(
      (l: any) => l.id !== lectureId,
    );
    await Promise.all(
      remaining.map((l: any, index: number) =>
        this.dc.executeMutation(
          'AdminUpdateLectureOrder',
          { lectureId: l.id, order: index + 1 },
          authToken,
        ),
      ),
    );

    return { success: true };
  }

  async reorder(sectionId: string, orderedIds: string[], authToken: string) {
    const updates = orderedIds.map((id, index) =>
      this.dc.executeMutation(
        'AdminUpdateLectureOrder',
        { lectureId: id, order: index + 1 },
        authToken,
      ),
    );
    await Promise.all(updates);
    return { success: true, order: orderedIds };
  }

  async move(lectureId: string, dto: MoveLectureDto, authToken: string) {
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

  // Student-facing: get lecture content
  async getContent(lectureId: string, authToken: string) {
    const data = await this.dc.executeQuery(
      'GetLectureContent',
      { lectureId },
      authToken,
    );
    return data?.courseLecture ?? null;
  }
}
