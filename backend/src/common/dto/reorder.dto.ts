import { IsArray, IsUUID } from 'class-validator';

/**
 * Shared DTO for reorder operations across all entities.
 * Accepts an ordered array of UUIDs representing the new sort order.
 */
export class ReorderDto {
  @IsArray()
  @IsUUID('4', { each: true })
  orderedIds: string[];
}
