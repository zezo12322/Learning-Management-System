import { Module } from '@nestjs/common';
import { AiController } from './ai.controller';
import { AiService } from './ai.service';
import { BullModule } from '@nestjs/bullmq';
import { AI_CLEANUP_QUEUE } from '../transcoding/transcoding.queue';

@Module({
  imports: [BullModule.registerQueue({ name: AI_CLEANUP_QUEUE })],
  controllers: [AiController],
  providers: [AiService],
  exports: [AiService],
})
export class AiModule {}
