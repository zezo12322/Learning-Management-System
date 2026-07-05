import {
  IsString,
  IsInt,
  IsEnum,
  IsOptional,
  IsArray,
  Min,
} from 'class-validator';
import { IsFlexUUID } from '../../common/validators/is-flex-uuid.validator';

export enum MissionDifficulty {
  BEGINNER = 'BEGINNER',
  INTERMEDIATE = 'INTERMEDIATE',
  ADVANCED = 'ADVANCED',
  EXPERT = 'EXPERT',
}

export class CreateMissionDto {
  @IsString()
  title: string;

  @IsString()
  scenarioDescription: string;

  @IsInt()
  @Min(1)
  durationMinutes: number;

  @IsFlexUUID()
  categoryId: string;

  @IsEnum(MissionDifficulty)
  difficulty: MissionDifficulty;

  @IsArray()
  @IsString({ each: true })
  skillsTested: string[];

  @IsOptional()
  @IsFlexUUID()
  courseId?: string;
}

export class UpdateMissionDto {
  @IsOptional()
  @IsString()
  title?: string;

  @IsOptional()
  @IsString()
  scenarioDescription?: string;

  @IsOptional()
  @IsInt()
  @Min(1)
  durationMinutes?: number;

  @IsOptional()
  @IsFlexUUID()
  categoryId?: string;

  @IsOptional()
  @IsEnum(MissionDifficulty)
  difficulty?: MissionDifficulty;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  skillsTested?: string[];

  @IsOptional()
  @IsFlexUUID()
  courseId?: string;
}
