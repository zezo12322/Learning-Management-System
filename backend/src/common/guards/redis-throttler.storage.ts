import { Injectable, Logger, OnModuleDestroy } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import Redis from 'ioredis';

/**
 * Redis-backed throttler storage for @nestjs/throttler v6.
 *
 * Replaces the default in-memory storage so that:
 * 1. All backend instances share the same rate-limit counters.
 * 2. The fail-closed guard can detect when Redis is unreachable.
 *
 * The ThrottlerStorage interface (v6) expects:
 *   increment(key, ttl, limit, blockDuration, throttlerName)
 *     => Promise<ThrottlerStorageRecord>
 *
 * ttl and blockDuration are in milliseconds.
 */
export interface ThrottlerStorageRecord {
  totalHits: number;
  timeToExpire: number;
  isBlocked: boolean;
  timeToBlockExpire: number;
}

export interface ThrottlerStorage {
  increment(
    key: string,
    ttl: number,
    limit: number,
    blockDuration: number,
    throttlerName: string,
  ): Promise<ThrottlerStorageRecord>;
}

@Injectable()
export class RedisThrottlerStorage
  implements ThrottlerStorage, OnModuleDestroy
{
  private readonly logger = new Logger(RedisThrottlerStorage.name);
  private readonly redis: Redis;

  constructor(private readonly configService: ConfigService) {
    this.redis = new Redis({
      host: this.configService.get<string>('REDIS_HOST', '127.0.0.1'),
      port: Number(this.configService.get<string>('REDIS_PORT', '6379')),
      password: this.configService.get<string>('REDIS_PASSWORD') || undefined,
      // Keep retrying with backoff — never give up permanently.
      // This allows recovery from temporary Redis outages.
      retryStrategy: (times) => {
        // Exponential backoff: 200ms, 400ms, 800ms, 1.6s, max 5s
        const delay = Math.min(times * 200, 5000);
        if (times === 1) {
          this.logger.warn(`Redis connection lost — retrying in ${delay}ms...`);
        }
        return delay;
      },
      maxRetriesPerRequest: 3,
      enableOfflineQueue: false,
    });

    this.redis.on('error', (err) => {
      // Log but don't crash — the guard will catch increment() errors.
      this.logger.warn(`Redis throttler connection error: ${err.message}`);
    });

    this.redis.on('connect', () => {
      this.logger.log('Redis throttler storage connected.');
    });
  }

  async increment(
    key: string,
    ttl: number,
    limit: number,
    blockDuration: number,
    throttlerName: string,
  ): Promise<ThrottlerStorageRecord> {
    // Prefix to avoid collisions with BullMQ keys.
    const redisKey = `throttler:${throttlerName}:${key}`;
    const ttlSeconds = Math.ceil(ttl / 1000);

    // Use a Lua script for atomic INCR + EXPIRE.
    // Returns: [totalHits, remainingTtlMs]
    const script = `
      local current = redis.call('INCR', KEYS[1])
      local ttl = redis.call('TTL', KEYS[1])
      if ttl < 0 then
        redis.call('EXPIRE', KEYS[1], ${ttlSeconds})
        ttl = ${ttlSeconds}
      end
      return {current, ttl}
    `;

    const result = (await this.redis.eval(script, 1, redisKey)) as [
      number,
      number,
    ];

    const totalHits = result[0];
    const ttlRemainingSeconds = result[1] > 0 ? result[1] : ttlSeconds;
    const timeToExpire = Date.now() + ttlRemainingSeconds * 1000;

    const isBlocked = totalHits > limit;
    const timeToBlockExpire = isBlocked
      ? Date.now() +
        (blockDuration > 0 ? blockDuration : ttlRemainingSeconds * 1000)
      : 0;

    return {
      totalHits,
      timeToExpire,
      isBlocked,
      timeToBlockExpire,
    };
  }

  async onModuleDestroy() {
    if (this.redis) {
      await this.redis.quit();
      this.logger.log('Redis throttler storage disconnected.');
    }
  }
}
