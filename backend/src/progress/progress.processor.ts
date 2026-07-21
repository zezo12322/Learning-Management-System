import { Processor, WorkerHost } from '@nestjs/bullmq';
import { Logger } from '@nestjs/common';
import { Job } from 'bullmq';
import { DataConnectService } from '../firebase/dataconnect.service';
import { CompletionService } from '../completion/completion.service';
import { EnrollmentService } from '../enrollment/enrollment.service';
import {
  LECTURE_PROGRESS_QUEUE,
  RecordProgressJob,
  COMPLETION_THRESHOLD,
} from './lecture-progress.queue';

/**
 * Background consumer for the lecture-progress queue.
 *
 * Runs OUT of the request lifecycle, so it has no end-user Firebase token. It
 * therefore writes via the service-account (`executeMutationAsAdmin`) using the
 * `userId` captured at enqueue time, and derives `completedAt` itself from the
 * authoritative lecture duration — the client never gets to assert completion.
 *
 * NOTE (horizontal scaling): BullMQ already guarantees a job is processed by a
 * single worker, so running this processor in every API replica is safe — each
 * job is handled once. Set `concurrency` via BullModule if you need more
 * throughput than one replica provides.
 */
@Processor(LECTURE_PROGRESS_QUEUE)
export class ProgressProcessor extends WorkerHost {
  private readonly logger = new Logger(ProgressProcessor.name);

  constructor(
    private readonly dc: DataConnectService,
    private readonly completionService: CompletionService,
    private readonly enrollmentService: EnrollmentService,
  ) {
    super();
  }

  async process(job: Job<RecordProgressJob>): Promise<void> {
    const { userId, lectureId, lastWatchedSecond } = job.data;

    // 1. Load the authoritative duration (+ owning course) as admin.
    const lectureData = await this.dc.executeQueryAsAdmin<{
      courseLecture: {
        duration: number | null;
        isFreePreview?: boolean;
        section?: { course?: { id?: string } };
      } | null;
    }>('GetLectureDuration', { lectureId });

    const lecture = lectureData?.courseLecture;
    if (!lecture) {
      // The lecture was deleted between enqueue and processing — nothing to do.
      this.logger.warn(
        `Dropping progress job ${job.id}: lecture ${lectureId} not found`,
      );
      return;
    }

    const courseId = lecture.section?.course?.id;
    const isFreePreview = lecture.isFreePreview ?? false;

    // 2. ENROLLMENT VERIFICATION: Only enrolled students can record progress.
    // Free-preview lectures are exempt — anyone can preview them.
    if (courseId && !isFreePreview) {
      const isEnrolled = await this.enrollmentService.checkEnrollmentAsAdmin(
        courseId,
        userId,
      );
      if (!isEnrolled) {
        this.logger.warn(
          `Dropping progress job ${job.id}: user ${userId} not enrolled in course ${courseId}`,
        );
        return;
      }
    }

    // 3. Derive completion server-side. Only a positive duration can complete;
    //    lectures with unknown/zero duration never auto-complete here.
    const duration = lecture.duration ?? 0;
    const reachedThreshold =
      duration > 0 && lastWatchedSecond >= duration * COMPLETION_THRESHOLD;
    const completedAt = reachedThreshold ? new Date().toISOString() : null;

    // 4. Upsert on the composite key (user, lecture). Clamp the stored position
    //    to the lecture length so a bad client can't persist nonsense > duration.
    const storedSecond =
      duration > 0 ? Math.min(lastWatchedSecond, duration) : lastWatchedSecond;

    await this.dc.executeMutationAsAdmin('AdminUpsertLectureProgress', {
      userId,
      lectureId,
      lastWatchedSecond: storedSecond,
      completedAt,
    });

    // 5. On a completion transition, cascade the course-completion check
    //    (certificates/enrollment status — KAN-116) as admin.
    if (reachedThreshold) {
      if (courseId) {
        await this.completionService.checkCourseCompletionAsAdmin(
          courseId,
          userId,
        );
      }
    }
  }
}
