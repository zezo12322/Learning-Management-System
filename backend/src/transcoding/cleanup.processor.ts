import { Processor, WorkerHost } from '@nestjs/bullmq';
import { Logger } from '@nestjs/common';
import { Job } from 'bullmq';
import { FirebaseService } from '../firebase/firebase.service';
import { DataConnectService } from '../firebase/dataconnect.service';
import { AI_CLEANUP_QUEUE, AiCleanupJob } from './transcoding.queue';

/**
 * Checks AI service ingestion status periodically.
 * Completes and deletes the source MP4 when the AI service is ready.
 * Throws an error to trigger a retry if the AI service is still processing.
 */
@Processor(AI_CLEANUP_QUEUE, { concurrency: 5 })
export class AiCleanupProcessor extends WorkerHost {
  private readonly logger = new Logger(AiCleanupProcessor.name);

  constructor(
    private readonly firebase: FirebaseService,
    private readonly dc: DataConnectService,
  ) {
    super();
  }

  async process(job: Job<AiCleanupJob>): Promise<void> {
    const { aiJobId, sourcePath, lectureId } = job.data;
    const aiUrl = process.env.AI_SERVICE_URL || 'http://localhost:8000';
    const internalApiKey = process.env.INTERNAL_API_KEY || 'default-secret';

    this.logger.debug(
      `Checking AI ingest status for lecture ${lectureId} (job: ${aiJobId})`,
    );

    const statusRes = await fetch(`${aiUrl}/v1/jobs/${aiJobId}`, {
      headers: { 'X-Internal-Api-Key': internalApiKey },
    });

    if (!statusRes.ok) {
      if (statusRes.status === 404) {
        // Job not found. This can happen if the AI service restarted or job was lost.
        // It's a terminal failure, but we probably shouldn't leave an orphan.
        // We'll log an error and assume it's failed, thus triggering cleanup to prevent orphans.
        this.logger.error(
          `AI job ${aiJobId} not found for lecture ${lectureId}. Cleaning up orphan.`,
        );
      } else {
        throw new Error(
          `AI status check failed: ${statusRes.status} ${statusRes.statusText}`,
        );
      }
    } else {
      const statusData = await statusRes.json();

      if (
        statusData.status === 'PENDING' ||
        statusData.status === 'PROCESSING'
      ) {
        // Not done yet. Throw an error so BullMQ retries this job later.
        throw new Error('AI ingestion is still processing');
      }

      this.logger.log(
        `AI ingestion finished with status ${statusData.status} for lecture ${lectureId}`,
      );

      if (statusData.status === 'FAILED') {
        this.logger.warn(
          `AI job failed. Keeping original MP4 at ${sourcePath} so it can be retried.`,
        );
        return; // Job succeeds, we don't delete the file, no orphans because it's tracked in DB
      }
    }

    // Terminal state (READY, READY_WITH_WARNINGS, or 404). Delete the MP4.
    this.logger.log(`Deleting original MP4: ${sourcePath}`);
    await this.firebase
      .getBucket()
      .file(sourcePath)
      .delete({ ignoreNotFound: true });

    // Also nullify it in the database so we don't have a dangling pointer
    await this.dc.executeMutationAsAdmin('AdminUpdateLecture', {
      lectureId,
      originalVideoUrl: null, // Wipe the path so it's not a dangling pointer
    });
  }
}
