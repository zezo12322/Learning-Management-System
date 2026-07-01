import { Module } from '@nestjs/common';
import { BullModule } from '@nestjs/bullmq';
import { ProgressController } from './progress.controller';
import { ProgressService } from './progress.service';
import { ProgressProcessor } from './progress.processor';
import { CompletionModule } from '../completion/completion.module';
import { LECTURE_PROGRESS_QUEUE } from './lecture-progress.queue';

@Module({
  imports: [
    CompletionModule,
    // Registers the producer side (InjectQueue) and the consumer side
    // (ProgressProcessor below) for the lecture-progress queue. The Redis
    // connection itself is configured once globally in AppModule.
    BullModule.registerQueue({ name: LECTURE_PROGRESS_QUEUE }),
  ],
  controllers: [ProgressController],
  providers: [ProgressService, ProgressProcessor],
  exports: [ProgressService],
})
export class ProgressModule {}
