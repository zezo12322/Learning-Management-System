import {
  IsString,
  IsNotEmpty,
  IsOptional,
  IsUUID,
  IsNumber,
  IsArray,
  Min,
  MaxLength,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';

export class CreateSubmissionDto {
  // URL of the uploaded deliverable (produced via the uploads flow).
  @IsString()
  @IsNotEmpty()
  @MaxLength(2000)
  fileUrl: string;
}

export class CriterionScoreDto {
  @IsUUID()
  criterionId: string;

  @IsNumber()
  @Min(0)
  score: number;
}

export class GradeSubmissionDto {
  @IsOptional()
  @IsString()
  @MaxLength(5000)
  feedback?: string;

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CriterionScoreDto)
  scores?: CriterionScoreDto[];
}
