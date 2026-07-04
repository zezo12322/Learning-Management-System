import { Module } from '@nestjs/common';
import { StreamingController } from './streaming.controller';
import { StreamingService } from './streaming.service';
import { KeyTokenService } from './key-token.service';
import { WatermarkService } from './watermark.service';

/**
 * Secure video streaming (AES-128 HLS). Depends on the globally-provided
 * FirebaseService/DataConnectService (FirebaseModule) and AccessService
 * (CommonModule), so no extra imports are required.
 */
@Module({
  controllers: [StreamingController],
  providers: [StreamingService, KeyTokenService, WatermarkService],
  exports: [StreamingService],
})
export class StreamingModule {}
