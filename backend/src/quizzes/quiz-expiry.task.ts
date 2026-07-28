import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { QuizzesService } from './quizzes.service';
import { DataConnectService } from '../firebase/dataconnect.service';
import { RedisLockService } from '../common/redis/redis-lock.service';

/** Redis key guarding the sweep across replicas. */
const SWEEP_LOCK_KEY = 'lock:quiz-expiry-sweep';

/**
 * Lock lifetime. Two ticks of headroom so a slow sweep is never preempted by
 * the next one, while a replica that dies mid-sweep still frees the lock within
 * two minutes instead of stalling expiry until it comes back.
 */
const SWEEP_LOCK_TTL_MS = 120_000;

/**
 * Server-side timer enforcement (KAN-115).
 *
 * The lazy checks in QuizzesService only fire when a client calls
 * submit/finish/heartbeat. If the frontend disconnects, nothing finalizes the
 * attempt. This cron sweeps every in-progress, time-limited attempt and
 * auto-grades any whose window has elapsed — independent of any client — using
 * the backend's service credentials.
 *
 * The sweep is wrapped in a Redis lock (KAN-147) because `@nestjs/schedule`
 * timers are per-process: with more than one replica this would otherwise fire
 * on every instance at the same second, and each would auto-grade the same
 * attempts concurrently. Skipping a tick is harmless — the next one is a minute
 * away, and attempts still finalize lazily on any client call — so the lock
 * fails closed (see RedisLockService).
 */
@Injectable()
export class QuizExpiryTask {
  private readonly logger = new Logger(QuizExpiryTask.name);

  constructor(
    private readonly quizzes: QuizzesService,
    private readonly dc: DataConnectService,
    private readonly locks: RedisLockService,
  ) {}

  @Cron(CronExpression.EVERY_MINUTE)
  async finalizeExpiredAttempts(): Promise<void> {
    await this.locks.runExclusively(SWEEP_LOCK_KEY, SWEEP_LOCK_TTL_MS, () =>
      this.sweep(),
    );
  }

  /** The sweep itself — assumes the caller holds the lock. */
  private async sweep(): Promise<void> {
    let inProgress: any[];
    try {
      const data = await this.dc.executeQueryAsAdmin('GetExpiredAttempts');
      inProgress = data?.quizAttempts ?? [];
    } catch (err: any) {
      this.logger.error(
        `Expiry sweep failed to load attempts: ${err?.message}`,
      );
      return;
    }

    const now = Date.now();
    const expired = inProgress.filter((a) => {
      const limit = a.quiz?.timeLimitMinutes;
      if (!limit || !a.startedAt) return false;
      const elapsedMinutes = (now - new Date(a.startedAt).getTime()) / 60000;
      return elapsedMinutes > limit;
    });

    let finalized = 0;
    for (const attempt of expired) {
      try {
        const result = await this.quizzes.autoGrade(attempt.id, {
          admin: true,
        });
        if (!result?.alreadyFinalized) finalized++;
      } catch (err: any) {
        this.logger.error(
          `Failed to auto-finalize attempt ${attempt.id}: ${err?.message}`,
        );
      }
    }

    if (finalized > 0) {
      this.logger.log(`Auto-finalized ${finalized} expired quiz attempt(s)`);
    }
  }
}
