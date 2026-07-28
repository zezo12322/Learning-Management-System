import { Logger } from '@nestjs/common';
import Redis from 'ioredis';
import { RedisLockService } from './redis-lock.service';

function build(opts: { set?: jest.Mock; evalFn?: jest.Mock } = {}) {
  const set = opts.set ?? jest.fn().mockResolvedValue('OK');
  const evalFn = opts.evalFn ?? jest.fn().mockResolvedValue(1);
  const service = new RedisLockService({
    set,
    eval: evalFn,
  } as unknown as Redis);
  return { service, set, evalFn };
}

describe('RedisLockService', () => {
  beforeEach(() => {
    jest.spyOn(Logger.prototype, 'warn').mockImplementation();
  });
  afterEach(() => jest.restoreAllMocks());

  it('runs the work and reports success when the lock is free', async () => {
    const { service } = build();
    const work = jest.fn().mockResolvedValue(undefined);
    await expect(service.runExclusively('k', 1000, work)).resolves.toBe(true);
    expect(work).toHaveBeenCalledTimes(1);
  });

  it('takes the lock with NX and an expiry, so a crash cannot hold it forever', async () => {
    const { service, set } = build();
    await service.runExclusively('lock:sweep', 120_000, async () => {});
    expect(set).toHaveBeenCalledWith(
      'lock:sweep',
      expect.any(String),
      'PX',
      120_000,
      'NX',
    );
  });

  it('skips the work when another replica holds the lock', async () => {
    const { service } = build({ set: jest.fn().mockResolvedValue(null) });
    const work = jest.fn();
    await expect(service.runExclusively('k', 1000, work)).resolves.toBe(false);
    expect(work).not.toHaveBeenCalled();
  });

  it('fails closed when Redis is unreachable — never runs unguarded', async () => {
    // Running anyway is precisely the concurrent-write case the lock prevents.
    const { service } = build({
      set: jest.fn().mockRejectedValue(new Error('ECONNREFUSED')),
    });
    const work = jest.fn();
    await expect(service.runExclusively('k', 1000, work)).resolves.toBe(false);
    expect(work).not.toHaveBeenCalled();
  });

  it('releases with a compare-and-delete, not a bare DEL', async () => {
    // A plain DEL would let an overrunning run delete the successor's lock.
    const { service, evalFn } = build();
    await service.runExclusively('k', 1000, async () => {});
    const [script, numKeys, key, token] = evalFn.mock.calls[0] as [
      string,
      number,
      string,
      string,
    ];
    expect(script).toContain("redis.call('GET', KEYS[1]) == ARGV[1]");
    expect(numKeys).toBe(1);
    expect(key).toBe('k');
    expect(token).toEqual(expect.any(String));
  });

  it('releases the lock even when the work throws', async () => {
    const { service, evalFn } = build();
    await expect(
      service.runExclusively('k', 1000, () =>
        Promise.reject(new Error('boom')),
      ),
    ).rejects.toThrow('boom');
    expect(evalFn).toHaveBeenCalledTimes(1);
  });

  it('uses a fresh token per acquisition', async () => {
    const { service, evalFn } = build();
    await service.runExclusively('k', 1000, async () => {});
    await service.runExclusively('k', 1000, async () => {});
    const first = (evalFn.mock.calls[0] as unknown[])[3];
    const second = (evalFn.mock.calls[1] as unknown[])[3];
    expect(first).not.toBe(second);
  });

  it('does not fail the run when releasing fails', async () => {
    const { service } = build({
      evalFn: jest.fn().mockRejectedValue(new Error('gone')),
    });
    await expect(
      service.runExclusively('k', 1000, async () => {}),
    ).resolves.toBe(true);
  });
});
