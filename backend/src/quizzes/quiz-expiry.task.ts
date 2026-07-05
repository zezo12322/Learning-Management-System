import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { QuizzesService } from './quizzes.service';
import { DataConnectService } from '../firebase/dataconnect.service';

/**
 * Server-side timer enforcement (KAN-115).
 *
 * The lazy checks in QuizzesService only fire when a client calls
 * submit/finish/heartbeat. If the frontend disconnects, nothing finalizes the
 * attempt. This cron sweeps every in-progress, time-limited attempt and
 * auto-grades any whose window has elapsed — independent of any client — using
 * the backend's service credentials.
 *
 * NOTE: for horizontally-scaled deployments, every replica would run this. Move
 * to a single Cloud Scheduler → endpoint (or add a distributed lock) so the
 * sweep runs once per tick.
 */
@Injectable()
export class QuizExpiryTask {
  private readonly logger = new Logger(QuizExpiryTask.name);

  constructor(
    private readonly quizzes: QuizzesService,
    private readonly dc: DataConnectService,
  ) {}

  @Cron(CronExpression.EVERY_MINUTE)
  async finalizeExpiredAttempts(): Promise<void> {
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
