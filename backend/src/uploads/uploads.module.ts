import { Module } from '@nestjs/common';
import { UploadsController } from './uploads.controller';
import { UploadsService } from './uploads.service';
import { TranscodingModule } from '../transcoding/transcoding.module';

@Module({
  // TranscodingModule exposes TranscodingService so a confirmed lecture-video
  // upload can auto-enqueue secure-HLS packaging.
  imports: [TranscodingModule],
  controllers: [UploadsController],
  providers: [UploadsService],
  exports: [UploadsService],
})
export class UploadsModule {}
