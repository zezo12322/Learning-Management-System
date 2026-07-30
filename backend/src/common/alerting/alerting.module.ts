import { Global, Module } from '@nestjs/common';
import { AlertService } from './alert.service';
import { ErrorRateMonitor } from './error-rate.monitor';

/**
 * Alerting (KAN-147). Global because its consumers are cross-cutting — the
 * app-wide exception filter, the access-log interceptor and the health service
 * all publish into it without any of them importing a feature module.
 */
@Global()
@Module({
  providers: [AlertService, ErrorRateMonitor],
  exports: [AlertService, ErrorRateMonitor],
})
export class AlertingModule {}
