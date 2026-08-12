import { UsersService } from './users.service';

describe('UsersService', () => {
  describe('sync', () => {
    /**
     * Provisioning must not be ToS-gated.
     *
     * Acceptance is stored on the `users` row that this call creates, and the
     * acceptance mutation is a `user_update` keyed by auth.uid — so gating sync
     * on acceptance deadlocks every new signup permanently: no row means
     * acceptance can never be recorded, and no acceptance means no row.
     *
     * This asserts the shape of that fix: SyncUser runs on its own, with the
     * caller's token, and no ToS lookup happens first.
     */
    it('provisions the row without consulting terms of service', async () => {
      const dc = {
        executeQuery: jest.fn(),
        executeMutation: jest
          .fn()
          .mockResolvedValue({ user_upsert: { id: 'u1' } }),
      };
      const svc = new UsersService(dc as any);

      await svc.sync({ email: 'a@b.c', name: 'A' }, 'tok');

      expect(dc.executeMutation).toHaveBeenCalledWith(
        'SyncUser',
        { email: 'a@b.c', name: 'A', avatar: null },
        'tok',
      );
      // No GetCurrentToS / GetUserToSStatus read on the provisioning path.
      expect(dc.executeQuery).not.toHaveBeenCalled();
    });

    it('passes a missing avatar through as null rather than undefined', async () => {
      const dc = {
        executeQuery: jest.fn(),
        executeMutation: jest.fn().mockResolvedValue({}),
      };
      const svc = new UsersService(dc as any);

      await svc.sync({ email: 'a@b.c', name: 'A', avatar: undefined }, 'tok');

      expect(dc.executeMutation).toHaveBeenCalledWith(
        'SyncUser',
        expect.objectContaining({ avatar: null }),
        'tok',
      );
    });
  });
});
