import { UnauthorizedException } from '@nestjs/common';
import { KeyTokenService } from './key-token.service';

const configWith = (secret: string) =>
  ({ get: (k: string, d?: any) => (k === 'STREAM_KEY_SECRET' ? secret : d) }) as any;

describe('KeyTokenService', () => {
  let svc: KeyTokenService;

  beforeEach(() => {
    svc = new KeyTokenService(configWith('unit-test-secret'));
  });

  const claims = () => ({
    uid: 'u1',
    lectureId: 'L1',
    keyRel: 'enc.key',
    exp: Math.floor(Date.now() / 1000) + 60,
  });

  it('round-trips a signed token back to its claims', () => {
    const token = svc.sign(claims());
    const out = svc.verify(token);
    expect(out.uid).toBe('u1');
    expect(out.lectureId).toBe('L1');
    expect(out.keyRel).toBe('enc.key');
  });

  it('rejects an expired token', () => {
    const token = svc.sign({ ...claims(), exp: Math.floor(Date.now() / 1000) - 1 });
    expect(() => svc.verify(token)).toThrow(UnauthorizedException);
  });

  it('rejects a tampered payload', () => {
    const token = svc.sign(claims());
    const [, sig] = token.split('.');
    const forged = Buffer.from(
      JSON.stringify({ ...claims(), uid: 'attacker' }),
    ).toString('base64url');
    expect(() => svc.verify(`${forged}.${sig}`)).toThrow(UnauthorizedException);
  });

  it('rejects a malformed token', () => {
    expect(() => svc.verify('not-a-token')).toThrow(UnauthorizedException);
  });

  it('cannot be verified with a different secret', () => {
    const token = svc.sign(claims());
    const other = new KeyTokenService(configWith('different-secret'));
    expect(() => other.verify(token)).toThrow(UnauthorizedException);
  });
});
