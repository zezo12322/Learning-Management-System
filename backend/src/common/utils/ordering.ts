import { BadRequestException } from '@nestjs/common';

/**
 * Ensures every id submitted for a reorder actually belongs to the parent
 * resource. The reorder mutations operate by id alone, so without this an owner
 * of resource A could pass ids from resource B and reorder rows they don't own.
 */
export function assertReorderMembership(
  orderedIds: string[],
  validIds: string[],
  label = 'item',
): void {
  const valid = new Set(validIds);
  const unknown = orderedIds.filter((id) => !valid.has(id));
  if (unknown.length > 0) {
    throw new BadRequestException(
      `Cannot reorder: ${unknown.length} ${label}(s) do not belong to this resource`,
    );
  }
}
