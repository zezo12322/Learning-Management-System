import { Injectable } from '@nestjs/common';
import { DataConnectService } from '../firebase/dataconnect.service';
import { CreateSectionDto, UpdateSectionDto } from './dto/section.dto';
import { assertReorderMembership } from '../common/utils/ordering';

@Injectable()
export class SectionsService {
  constructor(private readonly dc: DataConnectService) {}

  async create(courseId: string, dto: CreateSectionDto, authToken: string) {
    // Fetch existing sections to auto-calculate order
    const course = await this.dc.executeQuery(
      'AdminGetCourse',
      { courseId },
      authToken,
    );
    const sections = course?.course?.adminSections ?? [];
    const maxOrder = sections.reduce(
      (max: number, s: any) => Math.max(max, s.order ?? 0),
      0,
    );

    return this.dc.executeMutation(
      'AdminCreateSection',
      { courseId, title: dto.title, order: maxOrder + 1 },
      authToken,
    );
  }

  async update(sectionId: string, dto: UpdateSectionDto, authToken: string) {
    return this.dc.executeMutation(
      'AdminUpdateSection',
      { sectionId, title: dto.title },
      authToken,
    );
  }

  async delete(courseId: string, sectionId: string, authToken: string) {
    // 1. Soft-delete all child lectures in the section first (cascade)
    await this.dc.executeMutation(
      'AdminSoftDeleteLecturesBySection',
      { sectionId },
      authToken,
    );

    // 2. Delete the section itself
    await this.dc.executeMutation('AdminDeleteSection', { sectionId }, authToken);

    // 3. Re-normalize the order of the remaining sections in the course
    const course = await this.dc.executeQuery(
      'AdminGetCourse',
      { courseId },
      authToken,
    );
    const remaining = (course?.course?.adminSections ?? []).filter(
      (s: any) => s.id !== sectionId,
    );
    await Promise.all(
      remaining.map((s: any, index: number) =>
        this.dc.executeMutation(
          'AdminUpdateSectionOrder',
          { sectionId: s.id, order: index + 1 },
          authToken,
        ),
      ),
    );

    return { success: true };
  }

  async reorder(courseId: string, orderedIds: string[], authToken: string) {
    // Validate every id belongs to this course before reordering.
    const course = await this.dc.executeQuery('AdminGetCourse', { courseId }, authToken);
    const validIds = (course?.course?.adminSections ?? []).map((s: any) => s.id);
    assertReorderMembership(orderedIds, validIds, 'section');

    const updates = orderedIds.map((id, index) =>
      this.dc.executeMutation(
        'AdminUpdateSectionOrder',
        { sectionId: id, order: index + 1 },
        authToken,
      ),
    );
    await Promise.all(updates);
    return { success: true, order: orderedIds };
  }
}
