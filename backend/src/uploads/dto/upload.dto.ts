import { IsString, IsEnum, IsOptional, IsUUID, Matches } from 'class-validator';

/**
 * Upload targets the backend knows how to authorize and place. The client never
 * supplies a raw storage path — the server derives it from the entity, so a
 * caller cannot write outside the resources they own.
 */
export enum UploadEntityType {
  COURSE_THUMBNAIL = 'COURSE_THUMBNAIL',
  LECTURE_VIDEO = 'LECTURE_VIDEO',
  LECTURE_TRANSCRIPT = 'LECTURE_TRANSCRIPT',
}

export class SignedUrlRequestDto {
  @IsEnum(UploadEntityType)
  entityType: UploadEntityType;

  // Owning course — used both to derive the path and to authorize the caller.
  @IsUUID()
  courseId: string;

  // Required for lecture-scoped uploads.
  @IsOptional()
  @IsUUID()
  lectureId?: string;

  // Original filename — sanitized server-side; only a safe display suffix is kept.
  @IsString()
  @Matches(/^[\w.\- ]{1,200}$/, {
    message: 'filename may only contain letters, numbers, spaces, dots, dashes, underscores',
  })
  filename: string;

  @IsString()
  contentType: string;
}

export class ConfirmUploadDto {
  @IsEnum(UploadEntityType)
  entityType: UploadEntityType;

  @IsUUID()
  courseId: string;

  @IsOptional()
  @IsUUID()
  lectureId?: string;

  // The exact path returned by /signed-url. Re-validated against the caller's
  // ownership and the expected prefix before anything is persisted.
  @IsString()
  storagePath: string;
}
