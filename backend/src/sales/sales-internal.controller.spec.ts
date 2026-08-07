import { DataConnectService } from '../firebase/dataconnect.service';
import { SalesInternalController } from './sales-internal.controller';

describe('SalesInternalController', () => {
  let dc: { executeQueryAsAdmin: jest.Mock };
  let controller: SalesInternalController;

  beforeEach(() => {
    dc = { executeQueryAsAdmin: jest.fn() };
    controller = new SalesInternalController(
      dc as unknown as DataConnectService,
    );
  });

  it('reads the live tiers through the admin path', async () => {
    dc.executeQueryAsAdmin.mockResolvedValue({
      subscriptionTiers: [
        {
          id: 't1',
          name: 'Pro',
          price: 800,
          billingCycle: 'MONTHLY',
          features: ['a', 'b'],
        },
      ],
    });

    const result = await controller.pricing();

    expect(dc.executeQueryAsAdmin).toHaveBeenCalledWith(
      'ListActiveSubscriptionTiers',
      {},
    );
    expect(result.tiers).toEqual([
      {
        id: 't1',
        name: 'Pro',
        price: 800,
        billingCycle: 'MONTHLY',
        features: ['a', 'b'],
      },
    ]);
  });

  // A deployment with no published plans is a valid state: the agent handles it
  // by escalating pricing questions to a human rather than inventing a number.
  it('returns an empty list rather than failing when no tiers are active', async () => {
    dc.executeQueryAsAdmin.mockResolvedValue({ subscriptionTiers: [] });

    await expect(controller.pricing()).resolves.toEqual({ tiers: [] });
  });

  it('tolerates a null payload', async () => {
    dc.executeQueryAsAdmin.mockResolvedValue(null);

    await expect(controller.pricing()).resolves.toEqual({ tiers: [] });
  });

  it('coerces malformed rows instead of passing junk to the agent', async () => {
    dc.executeQueryAsAdmin.mockResolvedValue({
      subscriptionTiers: [
        {
          id: 't2',
          name: 'Basic',
          price: '200',
          billingCycle: null,
          features: null,
        },
      ],
    });

    const result = await controller.pricing();

    expect(result.tiers[0]).toEqual({
      id: 't2',
      name: 'Basic',
      price: 200,
      billingCycle: '',
      features: [],
    });
  });
});
