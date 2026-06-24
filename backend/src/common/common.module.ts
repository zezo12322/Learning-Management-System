import { Global, Module } from '@nestjs/common';
import { AccessService } from './services/access.service';

/**
 * Global module for cross-cutting authorization helpers. Makes AccessService
 * injectable into guards and feature services everywhere without per-module imports.
 * (DataConnectService it depends on is already provided globally by FirebaseModule.)
 */
@Global()
@Module({
  providers: [AccessService],
  exports: [AccessService],
})
export class CommonModule {}
