/**
 * Shared contract for the lecture-progress BullMQ queue.
 *
 * Keeping the queue name, job name and payload shape in one place avoids the
 * classic producer/consumer drift where the controller enqueues one shape and
 * the worker reads another.
 */

/** BullMQ queue name. Referenced by BullModule.registerQueue and @Processor. */
export const LECTURE_PROGRESS_QUEUE = 'lecture-progress';

/** Single job type carried by the queue. */
export const RECORD_PROGRESS_JOB = 'record-progress';

/**
 * Fraction of a lecture's duration that, once reached, marks it complete.
 * Mirrors Udemy/Coursera behaviour where the final few % (credits/outro) don't
 * need to be watched. Shared by the async worker (ProgressProcessor) and the
 * legacy sync path (ProgressService) so both derive completion identically and
 * neither trusts a client-asserted `completed` flag.
 */
export const COMPLETION_THRESHOLD = 0.9;

/**
 * Job payload. `userId` is captured server-side from the caller's verified
 * Firebase token at enqueue time (never from the request body), so the worker
 * can write progress as admin without trusting client-supplied identity.
 */
export interface RecordProgressJob {
  userId: string;
  lectureId: string;
  lastWatchedSecond: number;
  watchedSeconds?: number;
  /** Epoch ms when the heartbeat was accepted; lets the worker drop stale jobs. */
  enqueuedAt: number;
}
