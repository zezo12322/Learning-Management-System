import { Injectable } from '@nestjs/common';
import { DataConnectService } from '../firebase/dataconnect.service';
import { CreateCriterionDto, UpdateCriterionDto } from './dto/criterion.dto';
import { assertReorderMembership } from '../common/utils/ordering';

@Injectable()
export class RubricService {
  constructor(private readonly dc: DataConnectService) {}

  async create(missionId: string, dto: CreateCriterionDto, authToken: string) {
    // Fetch existing criteria to auto-calculate order
    const mission = await this.dc.executeQuery(
      'AdminGetMission',
      { missionId },
      authToken,
    );
    const criteria = mission?.mission?.criteria ?? [];
    const maxOrder = criteria.reduce(
      (max: number, c: any) => Math.max(max, c.order ?? 0),
      0,
    );

    return this.dc.executeMutation(
      'AdminCreateRubricCriterion',
      {
        missionId,
        criterionName: dto.criterionName,
        description: dto.description ?? null,
        maxPoints: dto.maxPoints,
        order: maxOrder + 1,
      },
      authToken,
    );
  }

  async update(criterionId: string, dto: UpdateCriterionDto, authToken: string) {
    return this.dc.executeMutation(
      'AdminUpdateRubricCriterion',
      { criterionId, ...dto },
      authToken,
    );
  }

  async delete(missionId: string, criterionId: string, authToken: string) {
    await this.dc.executeMutation(
      'AdminDeleteRubricCriterion',
      { criterionId },
      authToken,
    );

    // Re-normalize order of the remaining criteria
    const mission = await this.dc.executeQuery(
      'AdminGetMission',
      { missionId },
      authToken,
    );
    const remaining = (mission?.mission?.criteria ?? []).filter(
      (c: any) => c.id !== criterionId,
    );
    await Promise.all(
      remaining.map((c: any, index: number) =>
        this.dc.executeMutation(
          'AdminUpdateRubricCriterionOrder',
          { criterionId: c.id, order: index + 1 },
          authToken,
        ),
      ),
    );

    return { success: true };
  }

  async reorder(missionId: string, orderedIds: string[], authToken: string) {
    // Validate every id belongs to this mission before reordering.
    const mission = await this.dc.executeQuery('AdminGetMission', { missionId }, authToken);
    const validIds = (mission?.mission?.criteria ?? []).map((c: any) => c.id);
    assertReorderMembership(orderedIds, validIds, 'criterion');

    const updates = orderedIds.map((id, index) =>
      this.dc.executeMutation(
        'AdminUpdateRubricCriterionOrder',
        { criterionId: id, order: index + 1 },
        authToken,
      ),
    );
    await Promise.all(updates);
    return { success: true, order: orderedIds };
  }
}
