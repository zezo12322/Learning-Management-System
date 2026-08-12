import { NotFoundException } from '@nestjs/common';
import { ToSService } from './tos.service';

function makeDc(
  queryMap: Record<string, any>,
  mutationMap: Record<string, any> = {},
) {
  return {
    executeQuery: jest.fn((op: string) => Promise.resolve(queryMap[op])),
    executeMutation: jest.fn((op: string) =>
      Promise.resolve(mutationMap[op] ?? {}),
    ),
  };
}

const PUBLISHED = {
  id: 'tos-1',
  version: '1.0',
  title: 'Terms',
  contentHtml: '<p>Terms</p>',
};

describe('ToSService', () => {
  describe('getStatus', () => {
    /**
     * The state right after the migration adds the table: `isCurrent` defaults
     * to false and nothing seeds a row. This used to throw, which failed every
     * ToS-gated request for every non-admin until an admin published something.
     */
    it('reports nothing to accept when no version is published', async () => {
      const dc = makeDc({
        GetUserToSStatus: { user: { id: 'u1', acceptedTosId: null } },
        GetCurrentToS: { termsOfServices: [] },
      });
      const svc = new ToSService(dc as any);

      await expect(svc.getStatus('tok', 'u1')).resolves.toEqual({
        needsAcceptance: false,
        acceptedAt: undefined,
        current: null,
      });
    });

    it('requires acceptance when the user has accepted nothing', async () => {
      const dc = makeDc({
        GetUserToSStatus: { user: { id: 'u1', acceptedTosId: null } },
        GetCurrentToS: { termsOfServices: [PUBLISHED] },
      });
      const svc = new ToSService(dc as any);

      const status = await svc.getStatus('tok', 'u1');
      expect(status.needsAcceptance).toBe(true);
      expect(status.current).toMatchObject({ id: 'tos-1', version: '1.0' });
    });

    it('requires acceptance again when a newer version is published', async () => {
      const dc = makeDc({
        GetUserToSStatus: { user: { id: 'u1', acceptedTosId: 'tos-0' } },
        GetCurrentToS: { termsOfServices: [PUBLISHED] },
      });
      const svc = new ToSService(dc as any);

      await expect(svc.getStatus('tok', 'u1')).resolves.toMatchObject({
        needsAcceptance: true,
      });
    });

    it('does not require acceptance once the current version is accepted', async () => {
      const dc = makeDc({
        GetUserToSStatus: {
          user: {
            id: 'u1',
            acceptedTosId: 'tos-1',
            tosAcceptedAt: '2026-01-01',
          },
        },
        GetCurrentToS: { termsOfServices: [PUBLISHED] },
      });
      const svc = new ToSService(dc as any);

      await expect(svc.getStatus('tok', 'u1')).resolves.toEqual({
        needsAcceptance: false,
        acceptedAt: '2026-01-01',
        current: PUBLISHED,
      });
    });

    /**
     * A user with no row is the pre-provisioning state. Acceptance is owed, but
     * it cannot be recorded yet — POST /me/sync must run first, which is why that
     * endpoint is not ToS-gated.
     */
    it('reports acceptance owed for a user with no row yet', async () => {
      const dc = makeDc({
        GetUserToSStatus: { user: null },
        GetCurrentToS: { termsOfServices: [PUBLISHED] },
      });
      const svc = new ToSService(dc as any);

      await expect(svc.getStatus('tok', 'u1')).resolves.toMatchObject({
        needsAcceptance: true,
      });
    });
  });

  describe('acceptCurrent', () => {
    it('records acceptance of the published version', async () => {
      const dc = makeDc({
        GetCurrentToS: { termsOfServices: [PUBLISHED] },
        GetUserToSStatus: { user: { id: 'u1' } },
      });
      const svc = new ToSService(dc as any);

      await expect(svc.acceptCurrent('tok', 'u1')).resolves.toEqual({
        accepted: true,
        tosId: 'tos-1',
        version: '1.0',
      });
      expect(dc.executeMutation).toHaveBeenCalledWith(
        'AcceptCurrentToS',
        { tosId: 'tos-1' },
        'tok',
      );
    });

    /**
     * `AcceptCurrentToS` is a `user_update`, so without a row it updates nothing
     * and still looks successful — the user would be told they had accepted and
     * then asked again on every load, forever.
     */
    it('refuses to report success when there is no row to record it on', async () => {
      const dc = makeDc({
        GetCurrentToS: { termsOfServices: [PUBLISHED] },
        GetUserToSStatus: { user: null },
      });
      const svc = new ToSService(dc as any);

      await expect(svc.acceptCurrent('tok', 'u1')).rejects.toThrow(
        NotFoundException,
      );
      expect(dc.executeMutation).not.toHaveBeenCalled();
    });

    it('rejects acceptance when nothing is published', async () => {
      const dc = makeDc({ GetCurrentToS: { termsOfServices: [] } });
      const svc = new ToSService(dc as any);

      await expect(svc.acceptCurrent('tok', 'u1')).rejects.toThrow(
        NotFoundException,
      );
    });
  });
});
