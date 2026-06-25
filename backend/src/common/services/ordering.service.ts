import { Injectable } from '@nestjs/common';
import { DataConnectService } from '../../firebase/dataconnect.service';

/**
 * Consolidates the ordering pattern shared by every curriculum entity
 * (sections, lectures, micro-lessons, rubric criteria, quiz questions/options):
 * computing the next order on create, and applying sequential order on reorder
 * or post-delete re-normalization. Centralizing it gives one place to change
 * the strategy (e.g. make reordering transactional) instead of six.
 */
@Injectable()
export class OrderingService {
  constructor(private readonly dc: DataConnectService) {}

  /** Next 1-based order value, one past the highest existing sibling. */
  nextOrder(siblings: Array<{ order?: number }>): number {
    return siblings.reduce((max, s) => Math.max(max, s.order ?? 0), 0) + 1;
  }

  /**
   * Assigns sequential 1-based order to `orderedIds` via the given order-update
   * mutation. Used for both explicit reordering and re-normalizing the
   * remaining rows after a delete.
   */
  async applyOrder(
    orderedIds: string[],
    operation: string,
    idField: string,
    authToken: string,
  ): Promise<void> {
    await Promise.all(
      orderedIds.map((id, index) =>
        this.dc.executeMutation(
          operation,
          { [idField]: id, order: index + 1 },
          authToken,
        ),
      ),
    );
  }
}
