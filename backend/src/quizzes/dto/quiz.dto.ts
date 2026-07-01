import {
  IsString,
  IsNumber,
  IsInt,
  IsOptional,
  IsBoolean,
  IsArray,
  Min,
  Max,
  ValidateNested,
  ArrayMinSize,
} from 'class-validator';
import { IsFlexUUID } from '../../common/validators/is-flex-uuid.validator';
import { Type } from 'class-transformer';

// ==========================================
// QUIZ BUILDER DTOs
// ==========================================

export class CreateQuizDto {
  @IsNumber()
  @Min(0)
  @Max(100)
  passingScore: number;

  @IsInt()
  @Min(1)
  maxAttempts: number;

  @IsOptional()
  @IsInt()
  @Min(1)
  timeLimitMinutes?: number;
}

export class UpdateQuizDto {
  @IsOptional()
  @IsNumber()
  @Min(0)
  @Max(100)
  passingScore?: number;

  @IsOptional()
  @IsInt()
  @Min(1)
  maxAttempts?: number;

  @IsOptional()
  @IsInt()
  @Min(1)
  timeLimitMinutes?: number;
}

export class CreateQuizOptionDto {
  @IsString()
  text: string;

  @IsBoolean()
  isCorrect: boolean;
}

export class CreateQuestionDto {
  @IsString()
  questionText: string;

  @IsOptional()
  @IsNumber()
  @Min(0)
  points?: number;

  @IsOptional()
  @IsString()
  explanation?: string;

  @IsArray()
  @ArrayMinSize(2)
  @ValidateNested({ each: true })
  @Type(() => CreateQuizOptionDto)
  options: CreateQuizOptionDto[];
}

export class UpdateQuizOptionInputDto {
  @IsOptional()
  @IsFlexUUID()
  id?: string;

  @IsString()
  text: string;

  @IsBoolean()
  isCorrect: boolean;
}

export class UpdateQuestionDto {
  @IsOptional()
  @IsString()
  questionText?: string;

  @IsOptional()
  @IsNumber()
  @Min(0)
  points?: number;

  @IsOptional()
  @IsString()
  explanation?: string;

  // Full desired set of options. When provided, the service diffs against the
  // existing options: inserts new ones (no id), updates existing (with id),
  // and deletes any existing option not present in this list.
  @IsOptional()
  @IsArray()
  @ArrayMinSize(2)
  @ValidateNested({ each: true })
  @Type(() => UpdateQuizOptionInputDto)
  options?: UpdateQuizOptionInputDto[];
}

export class UpdateQuizOptionDto {
  @IsOptional()
  @IsString()
  text?: string;

  @IsOptional()
  @IsBoolean()
  isCorrect?: boolean;
}

// ==========================================
// QUIZ TAKING DTOs
// ==========================================

export class SubmitAnswerDto {
  @IsFlexUUID()
  questionId: string;

  @IsFlexUUID()
  selectedOptionId: string;
}
