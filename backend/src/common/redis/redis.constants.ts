/**
 * DI token for the app-wide ioredis client.
 *
 * One connection is shared by everything that speaks Redis directly — the
 * rate-limiter storage, the readiness probe and the cron lock — so adding a
 * consumer never adds a socket. (BullMQ is the exception: it opens its own
 * connections because its blocking commands monopolise a client.)
 */
export const REDIS_CLIENT = Symbol('REDIS_CLIENT');
