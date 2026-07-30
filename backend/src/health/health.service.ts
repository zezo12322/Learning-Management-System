import { Inject, Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import Redis from 'ioredis';
import { REDIS_CLIENT } from '../common/redis/redis.constants';
import { DataConnectService } from '../firebase/dataconnect.service';
import { AlertService } from '../common/alerting/alert.service';

/** Why a dependency check failed, in terms safe to return to an anonymous caller. */
export type CheckFailure = 'timeout' | 'unreachable';

export interface DependencyCheck {
  status: 'up' | 'down';
  latencyMs: number;
  /** Present only when `status` is `down`. Coarse by design — see below. */
  error?: CheckFailure;
}

export interface ReadinessReport {
  status: 'ok' | 'error';
  timestamp: string;
  checks: {
    redis: DependencyCheck;
    dataconnect: DependencyCheck;
  };
}

export interface LivenessReport {
  status: 'ok';
  timestamp: string;
  uptime: number;
  env: string;
}

/**
 * Liveness and readiness reporting (KAN-147).
 *
 * **Liveness** (`/health`) answers "is the process alive?" and touches nothing.
 * It is what Railway's `healthcheckPath` polls, and it is deliberately kept
 * dependency-free: if it went red on a transient Redis blip, Railway would
 * restart a perfectly healthy container and turn a 30-second dependency outage
 * into a deploy loop.
 *
 * **Readiness** (`/health/ready`) answers "can this instance serve traffic?" and
 * does check the dependencies a request actually needs — Redis (the rate limiter
 * fails closed without it, so every route 503s) and Data Connect (every read and
 * write goes through it). It is intentionally NOT wired to `healthcheckPath`.
 *
 * Two properties keep the probe from becoming a liability itself:
 *
 *   • **Every check is timeout-raced** (`HEALTH_CHECK_TIMEOUT_MS`, default 3s).
 *     The Data Connect client's own budget is `FDC_TIMEOUT_MS` (15s) — far too
 *     long for something a monitor polls, and long enough to pile up.
 *   • **Results are cached** (`HEALTH_CACHE_MS`, default 10s) and concurrent
 *     probes share one in-flight run. Data Connect is a metered upstream; an
 *     uncached probe hit by a load balancer, an uptime monitor and a deploy
 *     verification loop at once would bill for all three.
 *
 * The public body reports only a coarse reason (`timeout` / `unreachable`) — this
 * endpoint is unauthenticated, and raw driver messages carry internal hosts and
 * ports (`connect ECONNREFUSED 10.x.x.x:6379`). The full error is logged
 * server-side on every status transition, which is where an operator looks anyway.
 */
@Injectable()
export class HealthService {
  private readonly logger = new Logger(HealthService.name);
  private readonly timeoutMs: number;
  private readonly cacheMs: number;

  /** Shared in-flight/recent result, so N concurrent probes cost one check. */
  private cached: { at: number; result: Promise<ReadinessReport> } | null =
    null;
  /** Last reported status, for edge-triggered logging (and alerting in KAN-147 C). */
  private lastStatus: ReadinessReport['status'] | null = null;

  constructor(
    @Inject(REDIS_CLIENT) private readonly redis: Redis,
    private readonly dataConnect: DataConnectService,
    private readonly config: ConfigService,
    private readonly alerts: AlertService,
  ) {
    this.timeoutMs = Number(
      this.config.get<string>('HEALTH_CHECK_TIMEOUT_MS', '3000'),
    );
    this.cacheMs = Number(this.config.get<string>('HEALTH_CACHE_MS', '10000'));
  }

  liveness(): LivenessReport {
    return {
      status: 'ok',
      timestamp: new Date().toISOString(),
      uptime: Math.floor(process.uptime()),
      // `||` not `??`: a defined-but-empty NODE_ENV should read as unset.
      env: process.env.NODE_ENV || 'unknown',
    };
  }

  async readiness(): Promise<ReadinessReport> {
    const now = Date.now();
    if (this.cached && now - this.cached.at < this.cacheMs) {
      return this.cached.result;
    }
    // Cache the promise, not the resolved value, so probes that arrive while a
    // check is still running join it instead of starting a second one.
    const result = this.runChecks();
    this.cached = { at: now, result };
    return result;
  }

  /** Never rejects: a failed check is a result, not an exception. */
  private async runChecks(): Promise<ReadinessReport> {
    const [redis, dataconnect] = await Promise.all([
      this.check('redis', () => this.pingRedis()),
      this.check('dataconnect', () => this.pingDataConnect()),
    ]);

    const report: ReadinessReport = {
      status:
        redis.status === 'up' && dataconnect.status === 'up' ? 'ok' : 'error',
      timestamp: new Date().toISOString(),
      checks: { redis, dataconnect },
    };

    this.reportTransition(report);
    return report;
  }

  private async pingRedis(): Promise<void> {
    // Typed as `string` rather than ioredis' literal 'PONG': the driver's type
    // asserts the happy path, but a connection pointed at something that is not
    // Redis answers with anything at all, and that must read as down.
    const pong: string = await this.redis.ping();
    if (pong !== 'PONG') {
      throw new Error(`unexpected PING reply: ${pong}`);
    }
  }

  private async pingDataConnect(): Promise<void> {
    // Cheapest possible real read: one row from a small reference table. It
    // proves three things at once — Data Connect is reachable, Postgres behind
    // it is answering, and the service-account credential is still valid.
    await this.dataConnect.executeQueryAsAdmin('HealthProbe');
  }

  /** Runs one dependency check under a timeout, recording latency either way. */
  private async check(
    name: string,
    work: () => Promise<unknown>,
  ): Promise<DependencyCheck> {
    const startedAt = Date.now();
    try {
      await this.withTimeout(work(), name);
      return { status: 'up', latencyMs: Date.now() - startedAt };
    } catch (err: unknown) {
      const timedOut = err instanceof TimeoutError;
      const reason = err instanceof Error ? err.message : String(err);
      // Full detail server-side only; the response body stays coarse.
      this.logger.debug(`Readiness check "${name}" failed: ${reason}`);
      return {
        status: 'down',
        latencyMs: Date.now() - startedAt,
        error: timedOut ? 'timeout' : 'unreachable',
      };
    }
  }

  private async withTimeout<T>(work: Promise<T>, name: string): Promise<T> {
    let timer: NodeJS.Timeout | undefined;
    const expiry = new Promise<never>((_, reject) => {
      timer = setTimeout(
        () =>
          reject(
            new TimeoutError(`${name} timed out after ${this.timeoutMs}ms`),
          ),
        this.timeoutMs,
      );
    });
    try {
      // Promise.race subscribes to `work`, so a late rejection is still handled
      // and never surfaces as an unhandled rejection.
      return await Promise.race([work, expiry]);
    } finally {
      clearTimeout(timer);
    }
  }

  /**
   * Logs and alerts only when the aggregate status *changes*. A probe every few
   * seconds against a dependency that has been down for an hour would otherwise
   * emit hundreds of identical lines — the exact noise the runbook's greps are
   * trying to cut through — and, once alerting is on, hundreds of pages.
   *
   * Edge-triggered in both directions, so recovery is announced too: without
   * that, the on-call channel shows a dependency failing and never says whether
   * it came back.
   */
  private reportTransition(report: ReadinessReport): void {
    if (report.status === this.lastStatus) return;
    const previous = this.lastStatus;
    this.lastStatus = report.status;

    const detail = Object.entries(report.checks)
      .map(([name, check]) => `${name}=${check.status}`)
      .join(' ');

    if (report.status === 'error') {
      this.logger.error(`Readiness DOWN — ${detail}`);
      this.alerts.send({
        key: 'readiness',
        severity: 'critical',
        title: 'Readiness check failing',
        detail: `A dependency is unreachable — ${detail}. Traffic to this instance will 503.`,
      });
    } else if (previous !== null) {
      this.logger.log(`Readiness recovered — ${detail}`);
      this.alerts.send({
        // A different key from the failure, so the cooldown on "down" can never
        // swallow the "recovered" notice.
        key: 'readiness-recovered',
        severity: 'info',
        title: 'Readiness recovered',
        detail: `All dependencies are answering — ${detail}.`,
      });
    }
  }
}

/** Marker so {@link HealthService.check} can tell a timeout from a real failure. */
class TimeoutError extends Error {}
