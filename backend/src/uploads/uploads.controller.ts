import { Controller, Post, Body, UseGuards, Req } from '@nestjs/common';
import { UploadsService } from './uploads.service';
import { SignedUrlRequestDto, ConfirmUploadDto } from './dto/upload.dto';
import { FirebaseAuthGuard } from '../common/guards/firebase-auth.guard';
import { DataConnectService } from '../firebase/dataconnect.service';

@Controller('uploads')
@UseGuards(FirebaseAuthGuard)
export class UploadsController {
  constructor(
    private readonly uploadsService: UploadsService,
    private readonly dc: DataConnectService,
  ) {}

  @Post('signed-url')
  generateSignedUrl(@Body() dto: SignedUrlRequestDto) {
    return this.uploadsService.generateSignedUrl(dto);
  }

  @Post('confirm')
  confirmUpload(@Body() dto: ConfirmUploadDto, @Req() req: any) {
    return this.uploadsService.confirmUpload(dto, this.dc.extractToken(req));
  }
}
