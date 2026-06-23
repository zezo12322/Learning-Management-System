import { Injectable, NotFoundException } from '@nestjs/common';
import { DataConnectService } from '../firebase/dataconnect.service';
import { CreateMissionDto, UpdateMissionDto } from './dto/mission.dto';

@Injectable()
export class MissionsService {
  constructor(private readonly dc: DataConnectService) {}

  async create(dto: CreateMissionDto, authToken: string) {
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
    const data = await this.dc.executeQuery('AdminListMyMissions', {}, authToken);
    return data?.missions ?? [];
  }

  async update(missionId: string, dto: UpdateMissionDto, authToken: string) {
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
