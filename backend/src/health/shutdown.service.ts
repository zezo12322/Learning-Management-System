import { Injectable, Logger, OnApplicationShutdown } from '@nestjs/common';

/**
 * Tracks whether the process is draining (KAN-147).
 *
 * On SIGTERM the bootstrap flips this flag *before* closing the app, so
 * `/health/ready` starts answering 503 while in-flight requests finish. That is
 * what makes a Railway overlap deploy actually zero-downtime: the router stops
 * choosing this instance while it is still able to serve what it already
 * accepted.
 *
 * Deliberately not part of HealthService: the shutdown signal must be readable
 * without running (or waiting on) any dependency check.
 */
@Injectable()
export class ShutdownService implements OnApplicationShutdown {
  private readonly logger = new Logger(ShutdownService.name);
  private draining = false;

  /** True once a shutdown signal has been received. */
  get isDraining(): boolean {
    return this.draining;
  }

  /** Marks the process as draining. Idempotent — repeated signals are ignored. */
  beginDraining(): void {
    if (this.draining) return;
    this.draining = true;
    this.logger.log('Draining — readiness now reports 503.');
  }

  /**
   * Safety net for shutdown paths that don't go through the signal handler
   * (a programmatic `app.close()`, or an e2e test tearing the app down).
   */
  onApplicationShutdown(): void {
    this.draining = true;
  }
}
