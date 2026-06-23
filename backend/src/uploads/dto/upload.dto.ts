import { IsString, IsInt, IsOptional, Min } from 'class-validator';

export class SignedUrlRequestDto {
  @IsString()
  targetPath: string;

  @IsString()
  contentType: string;

  @IsOptional()
  @IsInt()
  @Min(1)
  fileSizeBytes?: number;
}

export class ConfirmUploadDto {
  @IsString()
  entityType: string;

  @IsString()
  entityId: string;

  @IsString()
  field: string;

  @IsString()
  storagePath: string;
}
