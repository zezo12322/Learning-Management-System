import { Global, Module } from '@nestjs/common';
import { AccessService } from './services/access.service';
import { OrderingService } from './services/ordering.service';

/**
 * Global module for cross-cutting helpers (authorization + ordering). Makes them
 * injectable into guards and feature services everywhere without per-module imports.
 * (DataConnectService they depend on is already provided globally by FirebaseModule.)
 */
@Global()
@Module({
  providers: [AccessService, OrderingService],
  exports: [AccessService, OrderingService],
})
export class CommonModule {}
