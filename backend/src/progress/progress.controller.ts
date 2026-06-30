import {
  Controller,
  Get,
  Post,
  Put,
  Body,
  Param,
  HttpCode,
  HttpStatus,
  UseGuards,
} from '@nestjs/common';
import { InjectQueue } from '@nestjs/bullmq';
import { Queue } from 'bullmq';
import { ProgressService } from './progress.service';
import { EnqueueProgressDto, UpdateProgressDto } from './dto/progress.dto';
import { FirebaseAuthGuard } from '../common/guards/firebase-auth.guard';
import { AuthToken } from '../common/decorators/auth-token.decorator';
import { CurrentUser } from '../common/decorators/current-user.decorator';
import {
  LECTURE_PROGRESS_QUEUE,
  RECORD_PROGRESS_JOB,
  RecordProgressJob,
} from './lecture-progress.queue';

@Controller()
@UseGuards(FirebaseAuthGuard)
export class ProgressController {
  constructor(
    private readonly progressService: ProgressService,
    @InjectQueue(LECTURE_PROGRESS_QUEUE)
    private readonly progressQueue: Queue<RecordProgressJob>,
  ) {}

  /**
   * High-frequency playback heartbeat. The client posts this every few seconds;
   * we validate, enqueue, and return 202 Accepted WITHOUT touching the database
   * so a busy player can't overwhelm Data Connect. The actual upsert + completion
   * derivation happens asynchronously in ProgressProcessor.
   *
   * `userId` is taken from the verified Firebase token (CurrentUser), never the
   * body — the worker writes as admin and must trust this identity.
   */
  @Post('lectures/:lectureId/progress')
  @HttpCode(HttpStatus.ACCEPTED)
  async recordProgress(
    @Param('lectureId') lectureId: string,
    @Body() dto: EnqueueProgressDto,
    @CurrentUser('uid') uid: string,
  ) {
    await this.progressQueue.add(
      RECORD_PROGRESS_JOB,
      {
        userId: uid,
        lectureId,
        lastWatchedSecond: dto.lastWatchedSecond,
        watchedSeconds: dto.watchedSeconds,
        enqueuedAt: Date.now(),
      },
      {
        // Collapse a burst of heartbeats for the same (user, lecture) into one
        // pending job — only the latest position matters. Combined with the
        // worker clamp this keeps writes bounded regardless of client cadence.
        jobId: `progress:${uid}:${lectureId}`,
        removeOnComplete: true,
        removeOnFail: 100,
        attempts: 3,
        backoff: { type: 'exponential', delay: 1000 },
      },
    );

    return { accepted: true };
  }

  /**
   * Synchronous progress write (legacy). Kept for explicit "mark complete"
   * actions where the client needs the result immediately; high-frequency
   * heartbeats should use POST above. Consider deprecating once clients migrate.
   */
  @Put('lectures/:lectureId/progress')
  updateProgress(
    @Param('lectureId') lectureId: string,
    @Body() dto: UpdateProgressDto,
    @AuthToken() token: string,
  ) {
    return this.progressService.updateProgress(lectureId, dto, token);
  }

  @Get('lectures/:lectureId/progress')
  getLectureProgress(
    @Param('lectureId') lectureId: string,
    @AuthToken() token: string,
  ) {
    return this.progressService.getLectureProgress(lectureId, token);
  }

  @Get('courses/:courseId/progress')
  getCourseProgress(
    @Param('courseId') courseId: string,
    @AuthToken() token: string,
  ) {
    return this.progressService.getCourseProgress(courseId, token);
  }
}
