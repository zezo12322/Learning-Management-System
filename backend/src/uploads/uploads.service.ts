import { Injectable, BadRequestException, Logger } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { FirebaseService } from '../firebase/firebase.service';
import { DataConnectService } from '../firebase/dataconnect.service';
import { AccessService } from '../common/services/access.service';
import { TranscodingService } from '../transcoding/transcoding.service';
import {
  SignedUrlRequestDto,
  ConfirmUploadDto,
  UploadEntityType,
} from './dto/upload.dto';
import {
  CourseStoragePaths,
  ALLOWED_VIDEO_MIME_TYPES,
  ALLOWED_IMAGE_MIME_TYPES,
} from '../common/constants/storage-paths';

interface UploadCaller {
  uid: string;
  token: string;
  isAdmin: boolean;
}

/** Per-entity rules: which content types are allowed, where the file goes,
 *  and which DataConnect field is written on confirm. */
const ENTITY_RULES: Record<
  UploadEntityType,
  {
    allowedTypes: string[];
    requiresLecture: boolean;
    // Public assets (thumbnails) are world-readable and stored as a public URL.
    // Private assets (premium video/transcript) store only the storage path and
    // are served via short-lived signed read URLs at request time (H2).
    isPublic: boolean;
    buildPath: (
      courseId: string,
      lectureId: string | undefined,
      file: string,
    ) => string;
    confirm: {
      operation: string;
      idField: 'courseId' | 'lectureId';
      urlField: string;
    };
  }
> = {
  [UploadEntityType.COURSE_THUMBNAIL]: {
    allowedTypes: ALLOWED_IMAGE_MIME_TYPES,
    requiresLecture: false,
    isPublic: true,
    buildPath: (courseId, _l, file) =>
      CourseStoragePaths.thumbnail(courseId, file),
    confirm: {
      operation: 'AdminUpdateCourse',
      idField: 'courseId',
      urlField: 'thumbnail',
    },
  },
  [UploadEntityType.LECTURE_VIDEO]: {
    allowedTypes: ALLOWED_VIDEO_MIME_TYPES,
    requiresLecture: true,
    isPublic: false,
    buildPath: (courseId, lectureId, file) =>
      CourseStoragePaths.lectureVideo(courseId, lectureId!, file),
    confirm: {
      operation: 'AdminUpdateLecture',
      idField: 'lectureId',
      urlField: 'videoUrl',
    },
  },
  [UploadEntityType.LECTURE_TRANSCRIPT]: {
    allowedTypes: ['application/pdf'],
    requiresLecture: true,
    isPublic: false,
    buildPath: (courseId, lectureId, file) =>
      CourseStoragePaths.lectureTranscript(courseId, lectureId!, file),
    confirm: {
      operation: 'AdminUpdateLecture',
      idField: 'lectureId',
      urlField: 'transcriptUrl',
    },
  },
};

@Injectable()
export class UploadsService {
  private readonly logger = new Logger(UploadsService.name);

  constructor(
    private readonly firebase: FirebaseService,
    private readonly dc: DataConnectService,
    private readonly access: AccessService,
    private readonly transcoding: TranscodingService,
  ) {}

  /**
   * Audit log for upload operations. Emits structured JSON for forensic analysis
   * and security monitoring. Track all upload attempts (successful and failed)
   * for anomaly detection and compliance.
   */
  private logUpload(
    event: 'signed_url_request' | 'upload_confirm' | 'upload_failed',
    callerUid: string,
    entityType: string,
    courseId: string,
    extra?: Record<string, unknown>,
  ): void {
    this.logger.log(
      `upload-audit ${JSON.stringify({
        event,
        uid: callerUid,
        entityType,
        courseId,
        at: new Date().toISOString(),
        ...extra,
      })}`,
    );
  }

  async generateSignedUrl(dto: SignedUrlRequestDto, caller: UploadCaller) {
    const rule = ENTITY_RULES[dto.entityType];

    // Audit log: signed URL request
    this.logUpload(
      'signed_url_request',
      caller.uid,
      dto.entityType,
      dto.courseId,
      {
        filename: dto.filename,
        contentType: dto.contentType,
      },
    );

    // 1) Authorize: caller must own (or admin) the course this upload targets.
    await this.access.assertCourseAccess(
      dto.courseId,
      caller.uid,
      caller.token,
      caller.isAdmin,
    );

    // 2) Validate shape and content type for this entity.
    if (rule.requiresLecture && !dto.lectureId) {
      throw new BadRequestException(`${dto.entityType} requires a lectureId`);
    }
    if (!rule.allowedTypes.includes(dto.contentType)) {
      throw new BadRequestException(
        `Content type "${dto.contentType}" not allowed for ${dto.entityType}. Allowed: ${rule.allowedTypes.join(', ')}`,
      );
    }

    // 3) Server-derived path: random prefix + sanitized name → no overwrite/traversal.
    const safeName = `${uuidv4()}-${this.sanitize(dto.filename)}`;
    const storagePath = rule.buildPath(dto.courseId, dto.lectureId, safeName);

    const { uploadUrl, downloadUrl } =
      await this.firebase.generateSignedUploadUrl(storagePath, dto.contentType);
    return { uploadUrl, downloadUrl, storagePath };
  }

  async confirmUpload(dto: ConfirmUploadDto, caller: UploadCaller) {
    const rule = ENTITY_RULES[dto.entityType];

    // Audit log: upload confirmation
    this.logUpload('upload_confirm', caller.uid, dto.entityType, dto.courseId, {
      storagePath: dto.storagePath,
      lectureId: dto.lectureId,
    });

    // 1) Authorize against the owning course.
    await this.access.assertCourseAccess(
      dto.courseId,
      caller.uid,
      caller.token,
      caller.isAdmin,
    );

    // 2) The confirmed path must live under the course prefix we control —
    //    blocks confirming an arbitrary attacker-supplied path.
    const expectedPrefix = `courses/${dto.courseId}/`;
    if (!dto.storagePath.startsWith(expectedPrefix)) {
      throw new BadRequestException(
        'storagePath does not belong to this course',
      );
    }

    // 3) The object must actually exist in Storage.
    if (!(await this.firebase.fileExists(dto.storagePath))) {
      throw new BadRequestException(
        `File not found at path: ${dto.storagePath}`,
      );
    }

    const entityId =
      rule.confirm.idField === 'lectureId' ? dto.lectureId : dto.courseId;
    if (!entityId) {
      throw new BadRequestException(
        `Missing ${rule.confirm.idField} for ${dto.entityType}`,
      );
    }

    // For lecture-scoped uploads, the lecture must actually belong to the course
    // we authorized against — otherwise a caller who owns course A could write a
    // download URL onto a lecture in course B (IDOR) by pairing their own
    // courseId/storagePath with a foreign lectureId.
    if (rule.confirm.idField === 'lectureId') {
      const lec = await this.dc.executeQuery(
        'GetLectureContent',
        { lectureId: dto.lectureId },
        caller.token,
      );
      const owningCourseId = lec?.courseLecture?.section?.course?.id;
      if (!owningCourseId) {
        throw new BadRequestException(`Lecture ${dto.lectureId} not found`);
      }
      if (owningCourseId !== dto.courseId) {
        throw new BadRequestException(
          'Lecture does not belong to the specified course',
        );
      }
    }

    // Public assets (thumbnails) are made world-readable and stored as a public
    // URL; private assets (premium video/transcript) store only the storage path
    // and are served via signed read URLs on demand (H2).
    let storedValue: string;
    if (rule.isPublic) {
      storedValue = await this.firebase.makeFilePublic(dto.storagePath);
    } else {
      storedValue = dto.storagePath;
    }

    await this.dc.executeMutation(
      rule.confirm.operation,
      {
        [rule.confirm.idField]: entityId,
        [rule.confirm.urlField]: storedValue,
      },
      caller.token,
    );

    // For public assets return the URL; for private ones return a freshly
    // signed read URL so the caller can verify the upload immediately.
    const downloadUrl = rule.isPublic
      ? storedValue
      : await this.firebase.generateSignedReadUrl(dto.storagePath);

    // Lecture videos auto-enter secure-HLS packaging: the worker will later
    // overwrite videoUrl (currently the raw MP4 path) with the HLS master and
    // store the probed duration. A queue failure (e.g. Redis down) must not fail
    // the upload — the instructor can re-trigger via POST …/video/transcode.
    let transcode: { jobId: string; status: string } | undefined;
    if (dto.entityType === UploadEntityType.LECTURE_VIDEO) {
      try {
        transcode = await this.transcoding.enqueue(
          dto.courseId,
          dto.lectureId!,
          dto.storagePath,
          caller.uid,
        );
      } catch (err: any) {
        this.logger.error(
          `Failed to auto-enqueue transcode for lecture ${dto.lectureId}: ${err?.message}`,
        );
        transcode = {
          jobId: 'error',
          status: `enqueue_failed: ${err?.message}`,
        };
      }
    }

    return { downloadUrl, storagePath: dto.storagePath, transcode };
  }

  /** Strip any path components; keep a safe basename. */
  private sanitize(filename: string): string {
    const base = filename.replace(/^.*[\\/]/, '');
    return base.replace(/[^\w.\- ]/g, '_').slice(0, 200) || 'file';
  }
}
