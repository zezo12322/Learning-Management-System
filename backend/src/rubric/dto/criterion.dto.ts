import { IsString, IsNumber, IsOptional, Min } from 'class-validator';

export class CreateCriterionDto {
  @IsString()
  criterionName: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsNumber()
  @Min(0)
  maxPoints: number;
}

export class UpdateCriterionDto {
  @IsOptional()
  @IsString()
  criterionName?: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsNumber()
  @Min(0)
  maxPoints?: number;
}
