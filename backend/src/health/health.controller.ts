import { Controller, Get, HttpStatus, Res } from '@nestjs/common';
import { SkipThrottle } from '@nestjs/throttler';
// `import type` is required for anything referenced in a decorated signature:
// isolatedModules + emitDecoratorMetadata would otherwise emit a runtime import
// for a type-only symbol (TS1272).
import type { Response } from 'express';
import { HealthService } from './health.service';
import type { LivenessReport, ReadinessReport } from './health.service';
import { ShutdownService } from './shutdown.service';

/** Body returned while the process is draining — no checks are run. */
interface DrainingReport {
  status: 'shutting_down';
  timestamp: string;
}

/**
 * Health endpoints (KAN-60 liveness, KAN-147 readiness).
 *
 * `@SkipThrottle()` covers both routes, for two separate reasons:
 *
 *   1. Probes are machine traffic on a fixed cadence — Railway's healthcheck, an
 *      uptime monitor and the deploy verification loop would otherwise share one
 *      IP bucket with real users behind the same proxy and could exhaust it.
 *   2. More importantly, the global FailClosedThrottlerGuard turns a Redis
 *      outage into its own 503 ("Rate limiter unavailable") *before* the handler
 *      runs. Readiness would then report a generic failure instead of naming
 *      Redis as the cause — precisely when that answer matters most.
 */
@SkipThrottle()
@Controller('health')
export class HealthController {
  constructor(
    private readonly health: HealthService,
    private readonly shutdown: ShutdownService,
  ) {}

  /**
   * Liveness — what Railway's `healthcheckPath` polls. Dependency-free by
   * design; see HealthService for why this must never check Redis or FDC.
   */
  @Get()
  liveness(): LivenessReport {
    return this.health.liveness();
  }

  /**
   * Readiness — 200 when this instance can serve traffic, 503 otherwise.
   *
   * The status is set via `@Res({ passthrough: true })` rather than by throwing
   * ServiceUnavailableException on purpose: a thrown 503 would route through
   * AllExceptionsFilter, which logs 5xx at error level *with a stack trace* and
   * (as of KAN-147 phase C) raises an alert. A monitor polling a known-degraded
   * instance would then manufacture a stack trace and an alert every few seconds
   * on its own. Returning the status directly keeps the signal edge-triggered,
   * where HealthService already emits exactly one line per transition.
   */
  @Get('ready')
  async readiness(
    @Res({ passthrough: true }) res: Response,
  ): Promise<ReadinessReport | DrainingReport> {
    // Checked before anything else: once SIGTERM lands this instance must be
    // taken out of rotation immediately, whatever its dependencies are doing.
    if (this.shutdown.isDraining) {
      res.status(HttpStatus.SERVICE_UNAVAILABLE);
      return { status: 'shutting_down', timestamp: new Date().toISOString() };
    }

    const report = await this.health.readiness();
    res.status(
      report.status === 'ok' ? HttpStatus.OK : HttpStatus.SERVICE_UNAVAILABLE,
    );
    return report;
  }
}
