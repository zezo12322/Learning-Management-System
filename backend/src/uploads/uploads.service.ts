import { Injectable, BadRequestException } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { FirebaseService } from '../firebase/firebase.service';
import { DataConnectService } from '../firebase/dataconnect.service';
import { AccessService } from '../common/services/access.service';
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
    buildPath: (courseId: string, lectureId: string | undefined, file: string) => string;
    confirm: { operation: string; idField: 'courseId' | 'lectureId'; urlField: string };
  }
> = {
  [UploadEntityType.COURSE_THUMBNAIL]: {
    allowedTypes: ALLOWED_IMAGE_MIME_TYPES,
    requiresLecture: false,
    buildPath: (courseId, _l, file) => CourseStoragePaths.thumbnail(courseId, file),
    confirm: { operation: 'AdminUpdateCourse', idField: 'courseId', urlField: 'thumbnail' },
  },
  [UploadEntityType.LECTURE_VIDEO]: {
    allowedTypes: ALLOWED_VIDEO_MIME_TYPES,
    requiresLecture: true,
    buildPath: (courseId, lectureId, file) =>
      CourseStoragePaths.lectureVideo(courseId, lectureId!, file),
    confirm: { operation: 'AdminUpdateLecture', idField: 'lectureId', urlField: 'videoUrl' },
  },
  [UploadEntityType.LECTURE_TRANSCRIPT]: {
    allowedTypes: ['application/pdf'],
    requiresLecture: true,
    buildPath: (courseId, lectureId, file) =>
      CourseStoragePaths.lectureTranscript(courseId, lectureId!, file),
    confirm: { operation: 'AdminUpdateLecture', idField: 'lectureId', urlField: 'transcriptUrl' },
  },
};

@Injectable()
export class UploadsService {
  constructor(
    private readonly firebase: FirebaseService,
    private readonly dc: DataConnectService,
    private readonly access: AccessService,
  ) {}

  async generateSignedUrl(dto: SignedUrlRequestDto, caller: UploadCaller) {
    const rule = ENTITY_RULES[dto.entityType];

    // 1) Authorize: caller must own (or admin) the course this upload targets.
    await this.access.assertCourseAccess(dto.courseId, caller.uid, caller.token, caller.isAdmin);

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

    const { uploadUrl, downloadUrl } = await this.firebase.generateSignedUploadUrl(
      storagePath,
      dto.contentType,
    );
    return { uploadUrl, downloadUrl, storagePath };
  }

  async confirmUpload(dto: ConfirmUploadDto, caller: UploadCaller) {
    const rule = ENTITY_RULES[dto.entityType];

    // 1) Authorize against the owning course.
    await this.access.assertCourseAccess(dto.courseId, caller.uid, caller.token, caller.isAdmin);

    // 2) The confirmed path must live under the course prefix we control —
    //    blocks confirming an arbitrary attacker-supplied path.
    const expectedPrefix = `courses/${dto.courseId}/`;
    if (!dto.storagePath.startsWith(expectedPrefix)) {
      throw new BadRequestException('storagePath does not belong to this course');
    }

    // 3) The object must actually exist in Storage.
    if (!(await this.firebase.fileExists(dto.storagePath))) {
      throw new BadRequestException(`File not found at path: ${dto.storagePath}`);
    }

    const bucket = this.firebase.getBucket();
    const downloadUrl = `https://storage.googleapis.com/${bucket.name}/${dto.storagePath}`;

    const entityId = rule.confirm.idField === 'lectureId' ? dto.lectureId : dto.courseId;
    if (!entityId) {
      throw new BadRequestException(`Missing ${rule.confirm.idField} for ${dto.entityType}`);
    }

    await this.dc.executeMutation(
      rule.confirm.operation,
      {
        [rule.confirm.idField]: entityId,
        [rule.confirm.urlField]: downloadUrl,
      },
      caller.token,
    );

    return { downloadUrl };
  }

  /** Strip any path components; keep a safe basename. */
  private sanitize(filename: string): string {
    const base = filename.replace(/^.*[\\/]/, '');
    return base.replace(/[^\w.\- ]/g, '_').slice(0, 200) || 'file';
  }
}
