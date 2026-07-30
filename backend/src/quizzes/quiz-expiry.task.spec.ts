import { Logger } from '@nestjs/common';
import { QuizExpiryTask } from './quiz-expiry.task';
import { QuizzesService } from './quizzes.service';
import { DataConnectService } from '../firebase/dataconnect.service';
import { RedisLockService } from '../common/redis/redis-lock.service';

/** One attempt whose time limit elapsed an hour ago. */
const expiredAttempt = {
  id: 'a-expired',
  startedAt: new Date(Date.now() - 60 * 60_000).toISOString(),
  quiz: { id: 'q1', timeLimitMinutes: 10 },
};

/** Started a minute ago against a 30-minute limit — still running. */
const liveAttempt = {
  id: 'a-live',
  startedAt: new Date(Date.now() - 60_000).toISOString(),
  quiz: { id: 'q2', timeLimitMinutes: 30 },
};

function build(
  opts: { attempts?: unknown[]; lockHeldElsewhere?: boolean } = {},
) {
  const autoGrade = jest.fn().mockResolvedValue({ alreadyFinalized: false });
  const executeQueryAsAdmin = jest
    .fn()
    .mockResolvedValue({ quizAttempts: opts.attempts ?? [] });

  // Stands in for the real lock: either runs the work or reports a lost race.
  const runExclusively = jest
    .fn()
    .mockImplementation(
      async (_key: string, _ttl: number, work: () => Promise<void>) => {
        if (opts.lockHeldElsewhere) return false;
        await work();
        return true;
      },
    );

  const task = new QuizExpiryTask(
    { autoGrade } as unknown as QuizzesService,
    { executeQueryAsAdmin } as unknown as DataConnectService,
    { runExclusively } as unknown as RedisLockService,
  );
  return { task, autoGrade, executeQueryAsAdmin, runExclusively };
}

describe('QuizExpiryTask', () => {
  beforeEach(() => {
    jest.spyOn(Logger.prototype, 'log').mockImplementation();
    jest.spyOn(Logger.prototype, 'error').mockImplementation();
  });
  afterEach(() => jest.restoreAllMocks());

  it('auto-grades attempts whose window has elapsed', async () => {
    const { task, autoGrade } = build({ attempts: [expiredAttempt] });
    await task.finalizeExpiredAttempts();
    expect(autoGrade).toHaveBeenCalledWith('a-expired', { admin: true });
  });

  it('leaves attempts that are still within their time limit alone', async () => {
    const { task, autoGrade } = build({ attempts: [liveAttempt] });
    await task.finalizeExpiredAttempts();
    expect(autoGrade).not.toHaveBeenCalled();
  });

  it('does nothing when another replica holds the sweep lock', async () => {
    // The point of the lock: with numReplicas > 1 every instance's cron fires on
    // the same second, and each would auto-grade the same attempts.
    const { task, executeQueryAsAdmin, autoGrade } = build({
      attempts: [expiredAttempt],
      lockHeldElsewhere: true,
    });
    await task.finalizeExpiredAttempts();
    expect(executeQueryAsAdmin).not.toHaveBeenCalled();
    expect(autoGrade).not.toHaveBeenCalled();
  });

  it('holds the lock long enough to outlast a slow sweep', async () => {
    const { task, runExclusively } = build();
    await task.finalizeExpiredAttempts();
    const [key, ttl] = runExclusively.mock.calls[0] as [string, number];
    expect(key).toBe('lock:quiz-expiry-sweep');
    expect(ttl).toBeGreaterThanOrEqual(120_000);
  });

  it('keeps sweeping when one attempt fails to grade', async () => {
    const { task, autoGrade } = build({
      attempts: [expiredAttempt, { ...expiredAttempt, id: 'a-expired-2' }],
    });
    autoGrade.mockRejectedValueOnce(new Error('grade failed'));
    await task.finalizeExpiredAttempts();
    expect(autoGrade).toHaveBeenCalledTimes(2);
  });
});
