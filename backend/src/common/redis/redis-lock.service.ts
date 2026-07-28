import { Inject, Injectable, Logger } from '@nestjs/common';
import { randomUUID } from 'crypto';
import Redis from 'ioredis';
import { REDIS_CLIENT } from './redis.constants';

/**
 * Best-effort distributed lock over the shared Redis connection (KAN-147).
 *
 * Exists so scheduled work runs once per tick across replicas. `@nestjs/schedule`
 * timers are per-process: with `numReplicas: 2`, every `@Cron` fires on every
 * instance simultaneously. That is fine for idempotent work and not fine for
 * anything that writes.
 *
 * This is a single-instance lock (`SET NX PX`), not Redlock. That is the correct
 * scope here: Railway gives one Redis, so there is no multi-master failure mode
 * to defend against, and the work it guards is a periodic sweep that can safely
 * skip a tick.
 */
@Injectable()
export class RedisLockService {
  private readonly logger = new Logger(RedisLockService.name);

  constructor(@Inject(REDIS_CLIENT) private readonly redis: Redis) {}

  /**
   * Runs `work` only if this process wins the lock; returns `false` when another
   * replica holds it (or when the lock could not be taken at all).
   *
   * **Fails closed.** If Redis is unreachable the work is skipped rather than
   * run unguarded: an unguarded run is exactly the concurrent-write scenario the
   * lock exists to prevent, and every caller here is a periodic sweep that loses
   * nothing by waiting for the next tick.
   */
  async runExclusively(
    key: string,
    ttlMs: number,
    work: () => Promise<void>,
  ): Promise<boolean> {
    // A per-acquisition token, so releasing can verify this process is still the
    // holder. Without it, a sweep that overran its TTL would delete the lock a
    // *different* replica had since taken.
    const token = randomUUID();

    let acquired: string | null;
    try {
      acquired = await this.redis.set(key, token, 'PX', ttlMs, 'NX');
    } catch (err: unknown) {
      const reason = err instanceof Error ? err.message : String(err);
      this.logger.warn(`Skipping "${key}" — lock unavailable: ${reason}`);
      return false;
    }

    if (acquired !== 'OK') return false;

    try {
      await work();
      return true;
    } finally {
      await this.release(key, token);
    }
  }

  /**
   * Compare-and-delete: only the holder may release. Plain DEL would let a slow
   * run that already lost its lock by TTL delete the successor's.
   */
  private async release(key: string, token: string): Promise<void> {
    const script = `
      if redis.call('GET', KEYS[1]) == ARGV[1] then
        return redis.call('DEL', KEYS[1])
      else
        return 0
      end
    `;
    try {
      await this.redis.eval(script, 1, key, token);
    } catch (err: unknown) {
      // Non-fatal: the lock expires on its own, so the next tick recovers.
      const reason = err instanceof Error ? err.message : String(err);
      this.logger.warn(`Could not release lock "${key}": ${reason}`);
    }
  }
}
