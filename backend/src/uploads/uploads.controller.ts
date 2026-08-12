import { Controller, Post, Body, UseGuards, Req } from '@nestjs/common';
import { Throttle } from '@nestjs/throttler';
import { UploadsService } from './uploads.service';
import { SignedUrlRequestDto, ConfirmUploadDto } from './dto/upload.dto';
import { FirebaseAuthGuard } from '../common/guards/firebase-auth.guard';
import { RolesGuard } from '../common/guards/roles.guard';
import { Roles } from '../common/decorators/roles.decorator';
import { DataConnectService } from '../firebase/dataconnect.service';
import { AuditLoggingService } from '../logging/logging.service';

@Controller('uploads')
@UseGuards(FirebaseAuthGuard, RolesGuard)
@Roles('admin', 'instructor')
export class UploadsController {
  constructor(
    private readonly uploadsService: UploadsService,
    private readonly dc: DataConnectService,
    private readonly auditLoggingService: AuditLoggingService,
  ) {}

  // Strict rate limit: 10 signed URL requests per 60 seconds (resource protection).
  @Post('signed-url')
  @Throttle({ default: { ttl: 60000, limit: 10 } })
  async generateSignedUrl(@Body() dto: SignedUrlRequestDto, @Req() req: any) {
    const result = await this.uploadsService.generateSignedUrl(
      dto,
      this.caller(req),
    );

    // Audit Log: Upload Signed URL Request
    void this.auditLoggingService.createLog({
      action: 'UPLOAD_SIGNED_URL',
      adminUid: req.user?.uid ?? 'unknown',
      targetUid: null,
      ipAddress: req.ip,
      details: {
        entityType: dto.entityType,
        courseId: dto.courseId,
        lectureId: dto.lectureId,
        contentType: dto.contentType,
      },
    });

    return result;
  }

  // Strict rate limit: 10 confirm requests per 60 seconds (resource protection).
  @Post('confirm')
  @Throttle({ default: { ttl: 60000, limit: 10 } })
  async confirmUpload(@Body() dto: ConfirmUploadDto, @Req() req: any) {
    const result = await this.uploadsService.confirmUpload(
      dto,
      this.caller(req),
    );

    // Audit Log: Upload Confirmed
    void this.auditLoggingService.createLog({
      action: 'UPLOAD_CONFIRMED',
      adminUid: req.user?.uid ?? 'unknown',
      targetUid: null,
      ipAddress: req.ip,
      details: {
        entityType: dto.entityType,
        courseId: dto.courseId,
        lectureId: dto.lectureId,
        storagePath: dto.storagePath,
      },
    });

    return result;
  }

  /** Build the authorized-caller context from the request (roles set by RolesGuard). */
  private caller(req: any) {
    return {
      uid: req.user?.uid,
      token: this.dc.extractToken(req),
      isAdmin: (req.userRoles ?? []).includes('admin'),
    };
  }
}
