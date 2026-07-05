import { createHmac } from 'crypto';
import { WatermarkService } from './watermark.service';

const configWith = (over: Record<string, string> = {}) =>
  ({
    get: (k: string, d?: any) =>
      ({
        STREAM_KEY_SECRET: 'wm-secret',
        STREAM_URL_TTL_MINUTES: '10',
        ...over,
      })[k] ?? d,
  }) as any;

describe('WatermarkService', () => {
  let svc: WatermarkService;

  beforeEach(() => {
    svc = new WatermarkService(configWith());
  });

  it('issues a payload bound to the user, with a verifiable signature', () => {
    const p = svc.issue('u1', 'a@b.com', 'L1');

    expect(p.uid).toBe('u1');
    expect(p.lectureId).toBe('L1');
    expect(p.text).toContain('a@b.com');
    expect(p.sessionId).toBeTruthy();
    expect(new Date(p.expiresAt).getTime()).toBeGreaterThan(
      new Date(p.issuedAt).getTime(),
    );

    // The signature must match the documented signing scheme so a leaked frame
    // can be verified server-side.
    const expected = createHmac('sha256', 'wm-secret')
      .update(`${p.uid}.${p.lectureId}.${p.sessionId}.${p.issuedAt}`)
      .digest('base64url');
    expect(p.signature).toBe(expected);
  });

  it('falls back to uid in the overlay text when email is null', () => {
    const p = svc.issue('u1', null, 'L1');
    expect(p.text).toContain('u1');
  });

  it('generates a unique sessionId per issuance', () => {
    const a = svc.issue('u1', 'a@b.com', 'L1');
    const b = svc.issue('u1', 'a@b.com', 'L1');
    expect(a.sessionId).not.toBe(b.sessionId);
  });
});
