import {
  Injectable,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { InjectQueue } from '@nestjs/bullmq';
import { Queue } from 'bullmq';
import {
  VIDEO_TRANSCODE_QUEUE,
  PACKAGE_HLS_JOB,
  PackageHlsJob,
} from './transcoding.queue';

@Injectable()
export class TranscodingService {
  constructor(
    @InjectQueue(VIDEO_TRANSCODE_QUEUE)
    private readonly queue: Queue<PackageHlsJob>,
  ) {}

  /** Stable per-lecture job id so a lecture has at most one active transcode. */
  private jobId(lectureId: string): string {
    // No ':' — BullMQ reserves it as a Redis key separator and rejects it in
    // custom job ids.
    return `transcode-${lectureId}`;
  }

  /**
   * Queue a transcode for an uploaded MP4. Caller's ownership of the lecture is
   * enforced by the controller's guards; here we ensure the source path lives
   * under this lecture's own video directory (no transcoding arbitrary objects).
   */
  async enqueue(
    courseId: string,
    lectureId: string,
    sourcePath: string,
    requestedBy: string,
  ): Promise<{ jobId: string; status: string }> {
    const expectedPrefix = `courses/${courseId}/lectures/${lectureId}/`;
    if (!sourcePath.startsWith(expectedPrefix) || sourcePath.includes('..')) {
      throw new BadRequestException(
        'sourcePath must be a file uploaded to this lecture',
      );
    }

    const id = this.jobId(lectureId);

    // If a job for this lecture is already queued/running, don't double-queue.
    const existing = await this.queue.getJob(id);
    if (existing) {
      const state = await existing.getState();
      if (state === 'waiting' || state === 'active' || state === 'delayed') {
        return { jobId: id, status: state };
      }
      // A finished/failed job with this id blocks re-adding — clear it first.
      await existing.remove();
    }

    await this.queue.add(
      PACKAGE_HLS_JOB,
      { courseId, lectureId, sourcePath, requestedBy },
      {
        jobId: id,
        attempts: 2,
        backoff: { type: 'exponential', delay: 5000 },
        // Keep terminal jobs briefly so the status endpoint can report them.
        removeOnComplete: { age: 86400 },
        removeOnFail: { age: 86400 },
      },
    );

    return { jobId: id, status: 'queued' };
  }

  /** Report transcode status for a lecture (for the instructor UI to poll). */
  async getStatus(lectureId: string): Promise<{
    status: string;
    progress: number | object | boolean | string;
    failedReason?: string;
  }> {
    const job = await this.queue.getJob(this.jobId(lectureId));
    if (!job) {
      throw new NotFoundException('No transcode job for this lecture');
    }
    return {
      status: await job.getState(),
      progress: job.progress ?? 0,
      failedReason: job.failedReason,
    };
  }
}
