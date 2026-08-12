import { UnauthorizedException } from '@nestjs/common';
import { PaymentsController } from './payments.controller';

/**
 * Regression tests for the Paymob webhook.
 *
 * The route is unauthenticated by design — Paymob calls it — so the HMAC is the
 * only thing between a stranger and the enrollment mutations, which run as the
 * service account. It once admitted `type: 'INTENTION'` while checking the
 * signature only for `type: 'TRANSACTION'`, which meant an unsigned body could
 * mark any payment COMPLETED and enroll its owner for free.
 *
 * These assert the two properties that must hold no matter how the handler is
 * refactored: nothing unsigned reaches the mutations, and a bad signature is
 * rejected rather than ignored.
 */
describe('PaymentsController — webhook', () => {
  const buildController = (verifyHmac: jest.Mock) => {
    const executeMutationAsAdmin = jest.fn().mockResolvedValue({});
    const executeQueryAsAdmin = jest.fn().mockResolvedValue({
      payments: [{ status: 'PENDING', amount: 1000 }],
    });

    const controller = new PaymentsController(
      { verifyHmac } as never,
      { executeMutationAsAdmin, executeQueryAsAdmin } as never,
      { createLog: jest.fn() } as never,
    );

    return { controller, executeMutationAsAdmin, executeQueryAsAdmin };
  };

  it('ignores an unsigned INTENTION event without touching any mutation', async () => {
    const verifyHmac = jest.fn().mockReturnValue(true);
    const { controller, executeMutationAsAdmin, executeQueryAsAdmin } =
      buildController(verifyHmac);

    const result = await controller.handleWebhook(
      {
        type: 'INTENTION',
        obj: { success: true, intention_id: 'someone-elses-reference' },
      },
      undefined as never,
    );

    // Acknowledged so Paymob stops retrying...
    expect(result).toEqual({ success: true });
    // ...but nothing was written, and the signature check was never even
    // reached, because this event type no longer enters the privileged path.
    expect(executeMutationAsAdmin).not.toHaveBeenCalled();
    expect(executeQueryAsAdmin).not.toHaveBeenCalled();
    expect(verifyHmac).not.toHaveBeenCalled();
  });

  it('rejects a TRANSACTION whose signature does not verify', async () => {
    const verifyHmac = jest.fn().mockReturnValue(false);
    const { controller, executeMutationAsAdmin } = buildController(verifyHmac);

    await expect(
      controller.handleWebhook(
        { type: 'TRANSACTION', obj: { success: true, id: 'ref' } },
        'not-the-real-signature',
      ),
    ).rejects.toBeInstanceOf(UnauthorizedException);

    expect(executeMutationAsAdmin).not.toHaveBeenCalled();
  });

  it('verifies the signature before reading anything out of the body', async () => {
    const verifyHmac = jest.fn().mockReturnValue(true);
    const { controller, executeMutationAsAdmin } = buildController(verifyHmac);

    await controller.handleWebhook(
      {
        type: 'TRANSACTION',
        obj: { success: true, order: { id: 'ref-123' }, amount_cents: 1000 },
      },
      'signature',
    );

    expect(verifyHmac).toHaveBeenCalledWith('signature', {
      success: true,
      order: { id: 'ref-123' },
      amount_cents: 1000,
    });
    expect(executeMutationAsAdmin).toHaveBeenCalledWith(
      'UpdatePaymentStatusByReference',
      { referenceId: 'ref-123', status: 'COMPLETED' },
    );
  });

  it('ignores an unknown event type', async () => {
    const verifyHmac = jest.fn().mockReturnValue(true);
    const { controller, executeMutationAsAdmin } = buildController(verifyHmac);

    const result = await controller.handleWebhook(
      { type: 'SOMETHING_ELSE', obj: { success: true, id: 'ref' } },
      'signature',
    );

    expect(result).toEqual({ success: true });
    expect(executeMutationAsAdmin).not.toHaveBeenCalled();
  });
});
