import { Injectable } from '@nestjs/common';
import { DataConnectService } from '../firebase/dataconnect.service';
import { FirebaseService } from '../firebase/firebase.service';
import { OrderingService } from '../common/services/ordering.service';
import {
  CreateMicroLessonDto,
  UpdateMicroLessonDto,
} from './dto/micro-lesson.dto';
import { assertReorderMembership } from '../common/utils/ordering';

@Injectable()
export class MicroLessonsService {
  constructor(
    private readonly dc: DataConnectService,
    private readonly firebase: FirebaseService,
    private readonly ordering: OrderingService,
  ) {}

  async create(
    missionId: string,
    dto: CreateMicroLessonDto,
    authToken: string,
  ) {
    // Fetch existing micro-lessons to auto-calculate order
    const mission = await this.dc.executeQuery(
      'AdminGetMission',
      { missionId },
      authToken,
    );
    const microLessons = mission?.mission?.microLessons ?? [];

    return this.dc.executeMutation(
      'AdminCreateMicroLesson',
      {
        missionId,
        title: dto.title,
        type: dto.type,
        assetUrl: dto.assetUrl ?? null,
        content: dto.content ?? null,
        durationSeconds: dto.durationSeconds ?? null,
        order: this.ordering.nextOrder(microLessons),
      },
      authToken,
    );
  }

  async update(
    microLessonId: string,
    dto: UpdateMicroLessonDto,
    authToken: string,
  ) {
    return this.dc.executeMutation(
      'AdminUpdateMicroLesson',
      { microLessonId, ...dto },
      authToken,
    );
  }

  async delete(missionId: string, microLessonId: string, authToken: string) {
    // Delete any Storage assets for this micro-lesson
    await this.firebase.deleteDirectory(
      `missions/${missionId}/micro-lessons/${microLessonId}/`,
    );

    // Delete the DB record
    await this.dc.executeMutation(
      'AdminDeleteMicroLesson',
      { microLessonId },
      authToken,
    );

    // Re-normalize order of remaining micro-lessons
    const mission = await this.dc.executeQuery(
      'AdminGetMission',
      { missionId },
      authToken,
    );
    const remaining = (mission?.mission?.microLessons ?? [])
      .filter((m: any) => m.id !== microLessonId)
      .map((m: any) => m.id);
    await this.ordering.applyOrder(
      remaining,
      'AdminUpdateMicroLessonOrder',
      'microLessonId',
      authToken,
    );

    return { success: true };
  }

  async reorder(missionId: string, orderedIds: string[], authToken: string) {
    // Validate every id belongs to this mission before reordering.
    const mission = await this.dc.executeQuery(
      'AdminGetMission',
      { missionId },
      authToken,
    );
    const validIds = (mission?.mission?.microLessons ?? []).map(
      (m: any) => m.id,
    );
    assertReorderMembership(orderedIds, validIds, 'micro-lesson');

    await this.ordering.applyOrder(
      orderedIds,
      'AdminUpdateMicroLessonOrder',
      'microLessonId',
      authToken,
    );
    return { success: true, order: orderedIds };
  }
}
