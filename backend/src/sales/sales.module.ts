import { Module } from '@nestjs/common';
import { FirebaseModule } from '../firebase/firebase.module';
import { LoggingModule } from '../logging/logging.module';
import { SalesInternalController } from './sales-internal.controller';
import { SalesUpsellController } from './sales-upsell.controller';
import { SalesController } from './sales.controller';
import { SalesService } from './sales.service';

/**
 * Bridge to the sales-agent service.
 *
 * Owns no sales data — the CRM lives in the agent's own database. What it owns
 * is the three different authorization models that meet here: an admin with a
 * Firebase token (CRM), any signed-in learner (upsell), and the agent itself
 * with a shared secret (pricing). Three controllers rather than one because
 * mixing those guards on a single class is how a customer-facing route ends up
 * one decorator away from being admin-only, or worse.
 */
@Module({
  imports: [FirebaseModule, LoggingModule],
  controllers: [SalesController, SalesUpsellController, SalesInternalController],
  providers: [SalesService],
  exports: [SalesService],
})
export class SalesModule {}
