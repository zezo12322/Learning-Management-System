import { IsEnum, IsOptional, IsIn, Matches, IsString } from 'class-validator';
import { IsFlexUUID } from '../../common/validators/is-flex-uuid.validator';
import {
  ALLOWED_VIDEO_MIME_TYPES,
  ALLOWED_IMAGE_MIME_TYPES,
  ALLOWED_TEMPLATE_MIME_TYPES,
} from '../../common/constants/storage-paths';

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

/** Full set of MIME types the platform accepts across all upload entity types. */
export const ALL_ALLOWED_MIME_TYPES = [
  ...ALLOWED_VIDEO_MIME_TYPES,
  ...ALLOWED_IMAGE_MIME_TYPES,
  'application/pdf',
  ...Object.keys(ALLOWED_TEMPLATE_MIME_TYPES),
] as const;

export class SignedUrlRequestDto {
  @IsEnum(UploadEntityType)
  entityType: UploadEntityType;

  // Owning course — used both to derive the path and to authorize the caller.
  @IsFlexUUID()
  courseId: string;

  // Required for lecture-scoped uploads.
  @IsOptional()
  @IsFlexUUID()
  lectureId?: string;

  // Original filename — sanitized server-side; only a safe display suffix is kept.
  @IsString()
  @Matches(/^[\w.\- ]{1,200}$/, {
    message:
      'filename may only contain letters, numbers, spaces, dots, dashes, underscores',
  })
  filename: string;

  // Validated against the full MIME-type allowlist at the DTO layer,
  // so invalid types are rejected with a clear 400 before reaching the service.
  @IsIn(ALL_ALLOWED_MIME_TYPES, {
    message: `contentType must be one of: ${ALL_ALLOWED_MIME_TYPES.join(', ')}`,
  })
  contentType: string;
}

export class ConfirmUploadDto {
  @IsEnum(UploadEntityType)
  entityType: UploadEntityType;

  @IsFlexUUID()
  courseId: string;

  @IsOptional()
  @IsFlexUUID()
  lectureId?: string;

  // The exact path returned by /signed-url. Re-validated against the caller's
  // ownership and the expected prefix before anything is persisted.
  @IsString()
  storagePath: string;

  // The client must restate the content type during confirm so we can verify
  // it against the actual binary magic bytes in storage.
  @IsIn(ALL_ALLOWED_MIME_TYPES, {
    message: `contentType must be one of: ${ALL_ALLOWED_MIME_TYPES.join(', ')}`,
  })
  contentType: string;
}
