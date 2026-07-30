import {
  Global,
  Inject,
  Logger,
  Module,
  OnApplicationShutdown,
  Provider,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import Redis from 'ioredis';
import { REDIS_CLIENT } from './redis.constants';
import { RedisLockService } from './redis-lock.service';
import { RedisThrottlerStorage } from '../guards/redis-throttler.storage';

/**
 * Owns the shared Redis connection (KAN-147).
 *
 * The client used to be constructed inside RedisThrottlerStorage, which made it
 * unreachable to anything else: the readiness probe would have had to open a
 * second socket just to PING. Hoisting it into a provider lets the throttler
 * storage, the readiness probe and the quiz-expiry lock share one connection.
 *
 * Connection options are carried over verbatim from the throttler storage so
 * rate-limiting behaviour is unchanged. Two of them matter to the health probe:
 *   • `enableOfflineQueue: false` — commands reject immediately while the socket
 *     is down instead of queueing, so a readiness PING fails fast rather than
 *     hanging until its timeout.
 *   • the retry strategy never gives up, so the process recovers on its own once
 *     Redis returns and readiness flips back to 200 without a restart.
 */
const redisClientProvider: Provider = {
  provide: REDIS_CLIENT,
  inject: [ConfigService],
  useFactory: (config: ConfigService): Redis => {
    const logger = new Logger('Redis');
    const client = new Redis({
      host: config.get<string>('REDIS_HOST', '127.0.0.1'),
      port: Number(config.get<string>('REDIS_PORT', '6379')),
      password: config.get<string>('REDIS_PASSWORD') || undefined,
      // Exponential backoff: 200ms, 400ms, 800ms, 1.6s, max 5s. Only the first
      // attempt is logged so a long outage doesn't flood the drain.
      retryStrategy: (times) => {
        const delay = Math.min(times * 200, 5000);
        if (times === 1) {
          logger.warn(`Redis connection lost — retrying in ${delay}ms...`);
        }
        return delay;
      },
      maxRetriesPerRequest: 3,
      enableOfflineQueue: false,
    });

    // Log but never throw: an unhandled 'error' event on an ioredis client
    // crashes the process. Callers surface the failure instead (the throttler
    // guard fails closed, the readiness probe reports `down`).
    client.on('error', (err) => {
      logger.warn(`Redis connection error: ${err.message}`);
    });
    client.on('connect', () => {
      logger.log('Redis connected.');
    });

    return client;
  },
};

@Global()
@Module({
  providers: [redisClientProvider, RedisThrottlerStorage, RedisLockService],
  exports: [REDIS_CLIENT, RedisThrottlerStorage, RedisLockService],
})
export class RedisModule implements OnApplicationShutdown {
  private readonly logger = new Logger(RedisModule.name);

  constructor(@Inject(REDIS_CLIENT) private readonly redis: Redis) {}

  /**
   * Closes the connection during graceful shutdown. Runs only because
   * `enableShutdownHooks()` is on (see main.ts) — without it a SIGTERM would
   * kill the process with the socket still open.
   */
  async onApplicationShutdown(): Promise<void> {
    try {
      // QUIT waits for in-flight commands; it throws if the socket is already
      // gone, in which case there is nothing left to drain.
      await this.redis.quit();
      this.logger.log('Redis connection closed.');
    } catch {
      this.redis.disconnect();
    }
  }
}
