import { Controller, Post, Body, UseGuards, Req } from '@nestjs/common';
import { UploadsService } from './uploads.service';
import { SignedUrlRequestDto, ConfirmUploadDto } from './dto/upload.dto';
import { FirebaseAuthGuard } from '../common/guards/firebase-auth.guard';
import { RolesGuard } from '../common/guards/roles.guard';
import { Roles } from '../common/decorators/roles.decorator';
import { DataConnectService } from '../firebase/dataconnect.service';

@Controller('uploads')
@UseGuards(FirebaseAuthGuard, RolesGuard)
@Roles('admin', 'instructor')
export class UploadsController {
  constructor(
    private readonly uploadsService: UploadsService,
    private readonly dc: DataConnectService,
  ) {}

  @Post('signed-url')
  generateSignedUrl(@Body() dto: SignedUrlRequestDto, @Req() req: any) {
    return this.uploadsService.generateSignedUrl(dto, this.caller(req));
  }

  @Post('confirm')
  confirmUpload(@Body() dto: ConfirmUploadDto, @Req() req: any) {
    return this.uploadsService.confirmUpload(dto, this.caller(req));
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
