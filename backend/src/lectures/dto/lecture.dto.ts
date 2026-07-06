import {
  IsString,
  IsEnum,
  IsOptional,
  IsInt,
  IsBoolean,
  Min,
} from 'class-validator';
import { IsFlexUUID } from '../../common/validators/is-flex-uuid.validator';

export enum LectureType {
  VIDEO = 'VIDEO',
  READING = 'READING',
  INTERACTIVE = 'INTERACTIVE',
  QUIZ = 'QUIZ',
}

export class CreateLectureDto {
  @IsString()
  title: string;

  @IsEnum(LectureType)
  type: LectureType;

  @IsOptional()
  @IsString()
  videoUrl?: string;

  @IsOptional()
  @IsString()
  content?: string;

  @IsOptional()
  @IsInt()
  @Min(0)
  duration?: number;

  @IsOptional()
  @IsString()
  transcriptUrl?: string;

  @IsOptional()
  @IsBoolean()
  isFreePreview?: boolean;
}

export class UpdateLectureDto {
  @IsOptional()
  @IsString()
  title?: string;

  @IsOptional()
  @IsEnum(LectureType)
  type?: LectureType;

  @IsOptional()
  @IsString()
  videoUrl?: string;

  @IsOptional()
  @IsString()
  content?: string;

  @IsOptional()
  @IsInt()
  @Min(0)
  duration?: number;

  @IsOptional()
  @IsString()
  transcriptUrl?: string;

  @IsOptional()
  @IsBoolean()
  isFreePreview?: boolean;
}

export class MoveLectureDto {
  @IsFlexUUID()
  targetSectionId: string;

  @IsInt()
  @Min(1)
  targetOrder: number;
}
