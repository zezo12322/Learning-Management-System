import { Injectable } from '@nestjs/common';
import { DataConnectService } from '../firebase/dataconnect.service';
import { FirebaseService } from '../firebase/firebase.service';
import { CreateMicroLessonDto, UpdateMicroLessonDto } from './dto/micro-lesson.dto';

@Injectable()
export class MicroLessonsService {
  constructor(
    private readonly dc: DataConnectService,
    private readonly firebase: FirebaseService,
  ) {}

  async create(missionId: string, dto: CreateMicroLessonDto, authToken: string) {
    // Fetch existing micro-lessons to auto-calculate order
    const mission = await this.dc.executeQuery(
      'AdminGetMission',
      { missionId },
      authToken,
    );
    const microLessons = mission?.mission?.microLessons ?? [];
    const maxOrder = microLessons.reduce(
      (max: number, m: any) => Math.max(max, m.order ?? 0),
      0,
    );

    return this.dc.executeMutation(
      'AdminCreateMicroLesson',
      {
        missionId,
        title: dto.title,
        type: dto.type,
        assetUrl: dto.assetUrl ?? null,
        content: dto.content ?? null,
        durationSeconds: dto.durationSeconds ?? null,
        order: maxOrder + 1,
      },
      authToken,
    );
  }

  async update(microLessonId: string, dto: UpdateMicroLessonDto, authToken: string) {
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
    const remaining = (mission?.mission?.microLessons ?? []).filter(
      (m: any) => m.id !== microLessonId,
    );
    await Promise.all(
      remaining.map((m: any, index: number) =>
        this.dc.executeMutation(
          'AdminUpdateMicroLessonOrder',
          { microLessonId: m.id, order: index + 1 },
          authToken,
        ),
      ),
    );

    return { success: true };
  }

  async reorder(missionId: string, orderedIds: string[], authToken: string) {
    const updates = orderedIds.map((id, index) =>
      this.dc.executeMutation(
        'AdminUpdateMicroLessonOrder',
        { microLessonId: id, order: index + 1 },
        authToken,
      ),
    );
    await Promise.all(updates);
    return { success: true, order: orderedIds };
  }
}
