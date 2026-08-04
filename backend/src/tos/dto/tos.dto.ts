import { IsString, IsNotEmpty, IsOptional } from 'class-validator';

export class CreateToSDto {
  @IsString()
  @IsNotEmpty()
  version: string;

  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  documentUrl: string;

  @IsOptional()
  @IsString()
  effectiveDate?: string;
}

export class UpdateToSDto {
  @IsOptional()
  @IsString()
  version?: string;

  @IsOptional()
  @IsString()
  title?: string;

  @IsOptional()
  @IsString()
  documentUrl?: string;

  @IsOptional()
  @IsString()
  effectiveDate?: string;
}