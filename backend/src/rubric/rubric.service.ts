import { Injectable } from '@nestjs/common';
import { DataConnectService } from '../firebase/dataconnect.service';
import { OrderingService } from '../common/services/ordering.service';
import { CreateCriterionDto, UpdateCriterionDto } from './dto/criterion.dto';
import { assertReorderMembership } from '../common/utils/ordering';

@Injectable()
export class RubricService {
  constructor(
    private readonly dc: DataConnectService,
    private readonly ordering: OrderingService,
  ) {}

  async create(missionId: string, dto: CreateCriterionDto, authToken: string) {
    // Fetch existing criteria to auto-calculate order
    const mission = await this.dc.executeQuery(
      'AdminGetMission',
      { missionId },
      authToken,
    );
    const criteria = mission?.mission?.criteria ?? [];

    return this.dc.executeMutation(
      'AdminCreateRubricCriterion',
      {
        missionId,
        criterionName: dto.criterionName,
        description: dto.description ?? null,
        maxPoints: dto.maxPoints,
        order: this.ordering.nextOrder(criteria),
      },
      authToken,
    );
  }

  async update(
    criterionId: string,
    dto: UpdateCriterionDto,
    authToken: string,
  ) {
    return this.dc.executeMutation(
      'AdminUpdateRubricCriterion',
      { criterionId, ...dto },
      authToken,
    );
  }

  async delete(missionId: string, criterionId: string, authToken: string) {
    await this.dc.executeMutation(
      'AdminDeleteRubricCriterion',
      { criterionId, deletedAt: new Date().toISOString() },
      authToken,
    );

    // Re-normalize order of the remaining criteria
    const mission = await this.dc.executeQuery(
      'AdminGetMission',
      { missionId },
      authToken,
    );
    const remaining = (mission?.mission?.criteria ?? [])
      .filter((c: any) => c.id !== criterionId)
      .map((c: any) => c.id);
    await this.ordering.applyOrder(
      remaining,
      'AdminUpdateRubricCriterionOrder',
      'criterionId',
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
    const validIds = (mission?.mission?.criteria ?? []).map((c: any) => c.id);
    assertReorderMembership(orderedIds, validIds, 'criterion');

    await this.ordering.applyOrder(
      orderedIds,
      'AdminUpdateRubricCriterionOrder',
      'criterionId',
      authToken,
    );
    return { success: true, order: orderedIds };
  }
}
