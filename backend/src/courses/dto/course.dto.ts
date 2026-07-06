import {
  IsString,
  IsInt,
  IsEnum,
  IsOptional,
  IsArray,
  Min,
} from 'class-validator';
import { IsFlexUUID } from '../../common/validators/is-flex-uuid.validator';

export enum CourseLevel {
  BEGINNER = 'BEGINNER',
  INTERMEDIATE = 'INTERMEDIATE',
  ADVANCED = 'ADVANCED',
}

export enum CourseStatus {
  DRAFT = 'DRAFT',
  PUBLISHED = 'PUBLISHED',
  ARCHIVED = 'ARCHIVED',
}

export class CreateCourseDto {
  @IsString()
  title: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsInt()
  @Min(0)
  price: number;

  @IsString()
  language: string;

  @IsEnum(CourseLevel)
  level: CourseLevel;

  @IsFlexUUID()
  categoryId: string;

  @IsArray()
  @IsString({ each: true })
  tags: string[];
}

export class UpdateCourseDto {
  @IsOptional()
  @IsString()
  title?: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsInt()
  @Min(0)
  price?: number;

  @IsOptional()
  @IsString()
  language?: string;

  @IsOptional()
  @IsEnum(CourseLevel)
  level?: CourseLevel;

  @IsOptional()
  @IsFlexUUID()
  categoryId?: string;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  tags?: string[];

  @IsOptional()
  @IsString()
  thumbnail?: string;
}

export class UpdateCourseStatusDto {
  @IsEnum(CourseStatus)
  status: CourseStatus;
}
