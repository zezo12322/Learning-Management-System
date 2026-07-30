import { Module } from '@nestjs/common';
import { HealthController } from './health.controller';
import { HealthService } from './health.service';
import { ShutdownService } from './shutdown.service';

/**
 * Liveness + readiness (KAN-60 / KAN-147).
 *
 * `ShutdownService` is exported because main.ts resolves it from the app
 * container to flip the draining flag when SIGTERM arrives, before `app.close()`
 * begins tearing modules down.
 */
@Module({
  controllers: [HealthController],
  providers: [HealthService, ShutdownService],
  exports: [ShutdownService],
})
export class HealthModule {}
