import { Module } from '@nestjs/common';
import { BullModule } from '@nestjs/bullmq';
import { TranscodingController } from './transcoding.controller';
import { TranscodingService } from './transcoding.service';
import { TranscodingProcessor } from './transcoding.processor';
import { VIDEO_TRANSCODE_QUEUE } from './transcoding.queue';

/**
 * Automated video packaging (raw MP4 → AES-128 HLS) via an in-process BullMQ
 * worker. Depends on the globally-provided FirebaseService/DataConnectService.
 */
@Module({
  imports: [BullModule.registerQueue({ name: VIDEO_TRANSCODE_QUEUE })],
  controllers: [TranscodingController],
  providers: [TranscodingService, TranscodingProcessor],
  exports: [TranscodingService],
})
export class TranscodingModule {}
