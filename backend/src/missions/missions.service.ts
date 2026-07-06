import { Injectable, NotFoundException } from '@nestjs/common';
import { DataConnectService } from '../firebase/dataconnect.service';
import { AccessService } from '../common/services/access.service';
import { CreateMissionDto, UpdateMissionDto } from './dto/mission.dto';

@Injectable()
export class MissionsService {
  constructor(
    private readonly dc: DataConnectService,
    private readonly access: AccessService,
  ) {}

  async create(
    dto: CreateMissionDto,
    authToken: string,
    uid: string,
    isAdmin: boolean,
  ) {
    // If the mission is attached to a course, the caller must own that course
    // (route-based guards can't check a body field).
    if (dto.courseId) {
      await this.access.assertCourseAccess(
        dto.courseId,
        uid,
        authToken,
        isAdmin,
      );
    }
    // AdminCreateMission runs via the service account (NO_ACCESS in the
    // connector) and carries no auth.uid; pass the author explicitly.
    return this.dc.executeMutation(
      'AdminCreateMission',
      {
        title: dto.title,
        scenarioDescription: dto.scenarioDescription,
        durationMinutes: dto.durationMinutes,
        categoryId: dto.categoryId,
        difficulty: dto.difficulty,
        skillsTested: dto.skillsTested,
        courseId: dto.courseId ?? null,
        authorId: uid,
      },
      authToken,
    );
  }

  async findOne(missionId: string, authToken: string) {
    const data = await this.dc.executeQuery(
      'AdminGetMission',
      { missionId },
      authToken,
    );
    if (!data?.mission) {
      throw new NotFoundException(`Mission ${missionId} not found`);
    }
    return data.mission;
  }

  async findMyList(authToken: string) {
    const data = await this.dc.executeQuery(
      'AdminListMyMissions',
      {},
      authToken,
    );
    return data?.missions ?? [];
  }

  async update(
    missionId: string,
    dto: UpdateMissionDto,
    authToken: string,
    uid: string,
    isAdmin: boolean,
  ) {
    // If the update (re)attaches the mission to a course, the caller must own
    // that target course too — not just the mission (M5). Route guards only
    // checked mission ownership.
    if (dto.courseId) {
      await this.access.assertCourseAccess(
        dto.courseId,
        uid,
        authToken,
        isAdmin,
      );
    }
    return this.dc.executeMutation(
      'AdminUpdateMission',
      { missionId, ...dto },
      authToken,
    );
  }

  async softDelete(missionId: string, authToken: string) {
    return this.dc.executeMutation(
      'AdminSoftDeleteMission',
      { missionId },
      authToken,
    );
  }
}
