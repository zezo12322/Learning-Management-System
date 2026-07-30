import { Inject, Injectable } from '@nestjs/common';
import Redis from 'ioredis';
import { REDIS_CLIENT } from '../redis/redis.constants';

/**
 * Redis-backed throttler storage for @nestjs/throttler v6.
 *
 * Replaces the default in-memory storage so that:
 * 1. All backend instances share the same rate-limit counters.
 * 2. The fail-closed guard can detect when Redis is unreachable.
 *
 * The connection itself belongs to RedisModule (KAN-147) — this class used to
 * own it, which kept it out of reach of every other Redis consumer.
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
export class RedisThrottlerStorage implements ThrottlerStorage {
  constructor(@Inject(REDIS_CLIENT) private readonly redis: Redis) {}

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
}
