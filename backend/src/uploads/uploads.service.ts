import { Injectable, BadRequestException } from '@nestjs/common';
import { FirebaseService } from '../firebase/firebase.service';
import { DataConnectService } from '../firebase/dataconnect.service';
import { SignedUrlRequestDto, ConfirmUploadDto } from './dto/upload.dto';
import {
  ALLOWED_VIDEO_MIME_TYPES,
  ALLOWED_IMAGE_MIME_TYPES,
  ALLOWED_TEMPLATE_MIME_TYPES,
} from '../common/constants/storage-paths';

@Injectable()
export class UploadsService {
  private readonly allAllowedTypes: string[];

  constructor(
    private readonly firebase: FirebaseService,
    private readonly dc: DataConnectService,
  ) {
    this.allAllowedTypes = [
      ...ALLOWED_VIDEO_MIME_TYPES,
      ...ALLOWED_IMAGE_MIME_TYPES,
      ...Object.keys(ALLOWED_TEMPLATE_MIME_TYPES),
    ];
  }

  async generateSignedUrl(dto: SignedUrlRequestDto) {
    if (!this.allAllowedTypes.includes(dto.contentType)) {
      throw new BadRequestException(
        `Content type "${dto.contentType}" is not allowed. Allowed: ${this.allAllowedTypes.join(', ')}`,
      );
    }

    return this.firebase.generateSignedUploadUrl(
      dto.targetPath,
      dto.contentType,
    );
  }

  async confirmUpload(dto: ConfirmUploadDto, authToken: string) {
    // Verify the file exists in Storage
    const exists = await this.firebase.fileExists(dto.storagePath);
    if (!exists) {
      throw new BadRequestException(
        `File not found at path: ${dto.storagePath}`,
      );
    }

    const bucket = this.firebase.getBucket();
    const downloadUrl = `https://storage.googleapis.com/${bucket.name}/${dto.storagePath}`;

    // Map entity type to the appropriate mutation
    const mutationMap: Record<string, { operation: string; idField: string; urlField: string }> = {
      course: { operation: 'AdminUpdateCourse', idField: 'courseId', urlField: 'thumbnail' },
      lecture: { operation: 'AdminUpdateLecture', idField: 'lectureId', urlField: dto.field },
    };

    const mapping = mutationMap[dto.entityType];
    if (!mapping) {
      throw new BadRequestException(`Unsupported entity type: ${dto.entityType}`);
    }

    await this.dc.executeMutation(
      mapping.operation,
      {
        [mapping.idField]: dto.entityId,
        [mapping.urlField]: downloadUrl,
      },
      authToken,
    );

    return { downloadUrl };
  }
}
