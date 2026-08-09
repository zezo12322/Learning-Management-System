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
 * Highest playback rate a client may claim credit for.
 *
 * `lastWatchedSecond` is a *position*, and a position says nothing about how it
 * was reached: dragging the scrubber to the end, or playing at 8x, both put the
 * playhead past the threshold in seconds. Completion therefore also requires
 * `watchedSeconds` — time the client actually spent playing, where each real
 * second earns at most this many seconds of credit.
 *
 * 2 is deliberate rather than 1: watching at 1.5x or 2x is normal study
 * behaviour and should still complete a lecture. Above that the extra is simply
 * not credited, so a 4x pass earns half a lecture's worth and does not finish
 * it. Clients cap their own accumulator; this constant is the shared definition
 * they implement (see the web LecturePlayer and the Flutter player section).
 */
export const MAX_CREDITED_PLAYBACK_RATE = 2;

/**
 * Whether a lecture counts as complete.
 *
 * `watchedSeconds` is optional because clients that predate it exist in the
 * wild — an installed mobile build cannot be updated on our schedule. When it
 * is absent the old position-only rule applies, so those clients keep working;
 * when present, both must clear the bar. That makes this an integrity floor
 * rather than a guarantee: anything that can forge a request can forge the
 * watch time too. It stops the player from certifying a lecture nobody sat
 * through, which is the actual problem.
 */
export function isLectureComplete(
  durationSeconds: number,
  lastWatchedSecond: number,
  watchedSeconds?: number,
): boolean {
  if (durationSeconds <= 0) return false;
  const bar = durationSeconds * COMPLETION_THRESHOLD;
  if (lastWatchedSecond < bar) return false;
  // `== null` on purpose: a client that omits the field sends undefined, one
  // that serialises it explicitly sends null, and both mean "no watch time
  // reported" rather than "watched zero seconds".
  return watchedSeconds == null || watchedSeconds >= bar;
}

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
