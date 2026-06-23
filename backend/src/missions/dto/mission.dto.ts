import { IsString, IsInt, IsEnum, IsOptional, IsArray, IsUUID, Min } from 'class-validator';

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

  @IsUUID()
  categoryId: string;

  @IsEnum(MissionDifficulty)
  difficulty: MissionDifficulty;

  @IsArray()
  @IsString({ each: true })
  skillsTested: string[];

  @IsOptional()
  @IsUUID()
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
  @IsUUID()
  categoryId?: string;

  @IsOptional()
  @IsEnum(MissionDifficulty)
  difficulty?: MissionDifficulty;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  skillsTested?: string[];

  @IsOptional()
  @IsUUID()
  courseId?: string;
}
