import { Controller, Get, Logger, UseGuards } from '@nestjs/common';
import { InternalApiKeyGuard } from '../common/guards/internal-api-key.guard';
import { DataConnectService } from '../firebase/dataconnect.service';
import { PricingTierResponse } from './dto/sales.dto';

/**
 * Service-to-service endpoints the sales agent calls.
 *
 * Exists so the agent never has to store a price. Quoting from a copy of the
 * pricing sheet is how an agent ends up confidently selling last quarter's
 * numbers; reading the live tiers at answer time is the only way to keep that
 * from happening.
 *
 * Guarded by the shared internal key, not a Firebase token — the caller is a
 * process. The catalogue itself is already public (`GET /catalog/courses`), so
 * only pricing needs this door.
 */
@Controller('sales/internal')
@UseGuards(InternalApiKeyGuard)
export class SalesInternalController {
  private readonly logger = new Logger(SalesInternalController.name);

  constructor(private readonly dc: DataConnectService) {}

  @Get('pricing')
  async pricing(): Promise<{ tiers: PricingTierResponse[] }> {
    const data: any = await this.dc.executeQueryAsAdmin(
      'ListActiveSubscriptionTiers',
      {},
    );

    const rows: any[] = data?.subscriptionTiers ?? [];
    const tiers = rows.map((row) => ({
      id: String(row?.id ?? ''),
      name: String(row?.name ?? ''),
      price: Number(row?.price ?? 0),
      billingCycle: String(row?.billingCycle ?? ''),
      features: Array.isArray(row?.features)
        ? row.features.map((f: unknown) => String(f))
        : [],
    }));

    if (tiers.length === 0) {
      // Not an error — a deployment with no published plans is a valid state, and
      // the agent handles it by escalating pricing questions to a human. Worth a
      // log line because it is also what a broken seed looks like.
      this.logger.warn('No active subscription tiers to serve to the sales agent');
    }

    return { tiers };
  }
}
