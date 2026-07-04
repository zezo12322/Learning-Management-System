import { IsString, IsEnum, IsOptional, IsInt, Min } from 'class-validator';

export enum LectureType {
  VIDEO = 'VIDEO',
  READING = 'READING',
  INTERACTIVE = 'INTERACTIVE',
  QUIZ = 'QUIZ',
}

export class CreateMicroLessonDto {
  @IsString()
  title: string;

  @IsEnum(LectureType)
  type: LectureType;

  @IsOptional()
  @IsString()
  assetUrl?: string;

  @IsOptional()
  @IsString()
  content?: string;

  @IsOptional()
  @IsInt()
  @Min(0)
  durationSeconds?: number;
}

export class UpdateMicroLessonDto {
  @IsOptional()
  @IsString()
  title?: string;

  @IsOptional()
  @IsEnum(LectureType)
  type?: LectureType;

  @IsOptional()
  @IsString()
  assetUrl?: string;

  @IsOptional()
  @IsString()
  content?: string;

  @IsOptional()
  @IsInt()
  @Min(0)
  durationSeconds?: number;
}
