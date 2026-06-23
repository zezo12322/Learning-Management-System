import { IsInt, IsBoolean, IsOptional, Min } from 'class-validator';

export class UpdateProgressDto {
  @IsInt()
  @Min(0)
  lastWatchedSecond: number;

  @IsOptional()
  @IsBoolean()
  completed?: boolean;
}
