import { IsBoolean, IsOptional } from 'class-validator';

export class BackfillDurationsDto {
  /**
   * Write the derived lengths. Absent or false returns the report only.
   *
   * Opt-in rather than opt-out on purpose: the caller who wants to see what is
   * wrong is the common case, and the one who wants to change stored durations
   * — which moves every affected lesson's completion bar — should have to say
   * so.
   */
  @IsOptional()
  @IsBoolean()
  apply?: boolean;
}
