import { ConfigService } from '@nestjs/config';
import { Logger } from '@nestjs/common';
import { AlertService } from './alert.service';

function config(overrides: Record<string, string> = {}): ConfigService {
  return {
    get: (key: string, fallback?: string) => overrides[key] ?? fallback,
  } as unknown as ConfigService;
}

const WEBHOOK = 'https://hooks.example.com/services/T/B/X';

/** Resolves once the detached POST promise has had a chance to run. */
const flush = () => new Promise((resolve) => setImmediate(resolve));

describe('AlertService', () => {
  let fetchMock: jest.Mock;

  beforeEach(() => {
    jest.spyOn(Logger.prototype, 'warn').mockImplementation();
    fetchMock = jest.fn().mockResolvedValue({ ok: true, status: 200 });
    global.fetch = fetchMock;
  });

  afterEach(() => jest.restoreAllMocks());

  it('posts a Slack-shaped payload to the configured webhook', async () => {
    const service = new AlertService(config({ ALERT_WEBHOOK_URL: WEBHOOK }));
    service.send({ key: 'k', severity: 'critical', title: 'Boom' });
    await flush();

    expect(fetchMock).toHaveBeenCalledTimes(1);
    const [url, init] = fetchMock.mock.calls[0] as [string, RequestInit];
    expect(url).toBe(WEBHOOK);
    expect(JSON.parse(init.body as string)).toEqual({
      text: expect.stringContaining('Boom'),
    });
  });

  it('no-ops when no webhook is configured', async () => {
    // Local and CI runs have no webhook and must stay silent, not crash.
    const service = new AlertService(config());
    expect(service.enabled).toBe(false);
    service.send({ key: 'k', severity: 'critical', title: 'Boom' });
    await flush();
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it('warns once at boot when alerting is not configured', () => {
    const warnSpy = jest.spyOn(Logger.prototype, 'warn');
    new AlertService(config()).onModuleInit();
    expect(warnSpy).toHaveBeenCalledWith(
      expect.stringContaining('ALERT_WEBHOOK_URL'),
    );
  });

  it('suppresses repeats of the same key inside the cooldown', async () => {
    const service = new AlertService(
      config({ ALERT_WEBHOOK_URL: WEBHOOK, ALERT_COOLDOWN_MS: '60000' }),
    );
    for (let i = 0; i < 50; i++) {
      service.send({ key: 'same', severity: 'critical', title: 'Boom' });
    }
    await flush();
    expect(fetchMock).toHaveBeenCalledTimes(1);
  });

  it('still delivers a different key during another key’s cooldown', async () => {
    const service = new AlertService(
      config({ ALERT_WEBHOOK_URL: WEBHOOK, ALERT_COOLDOWN_MS: '60000' }),
    );
    service.send({ key: 'a', severity: 'critical', title: 'A' });
    service.send({ key: 'b', severity: 'critical', title: 'B' });
    await flush();
    expect(fetchMock).toHaveBeenCalledTimes(2);
  });

  it('reports how many were suppressed on the next send', async () => {
    const service = new AlertService(
      config({ ALERT_WEBHOOK_URL: WEBHOOK, ALERT_COOLDOWN_MS: '0' }),
    );
    // Cooldown 0 means nothing is suppressed; use a real window and travel time.
    const withWindow = new AlertService(
      config({ ALERT_WEBHOOK_URL: WEBHOOK, ALERT_COOLDOWN_MS: '50' }),
    );
    withWindow.send({ key: 'k', severity: 'warning', title: 'T' });
    withWindow.send({ key: 'k', severity: 'warning', title: 'T' });
    withWindow.send({ key: 'k', severity: 'warning', title: 'T' });
    await new Promise((resolve) => setTimeout(resolve, 60));
    withWindow.send({ key: 'k', severity: 'warning', title: 'T' });
    await flush();

    const bodies = fetchMock.mock.calls.map(
      (call) => JSON.parse((call[1] as RequestInit).body as string).text,
    );
    expect(bodies[bodies.length - 1]).toContain('2 more');
    expect(service.enabled).toBe(true);
  });

  it('never throws when the webhook fails', async () => {
    // The alerter runs inside the error path — it must not turn a handled 500
    // into an unhandled rejection.
    fetchMock.mockRejectedValue(new Error('network down'));
    const service = new AlertService(config({ ALERT_WEBHOOK_URL: WEBHOOK }));
    expect(() =>
      service.send({ key: 'k', severity: 'critical', title: 'Boom' }),
    ).not.toThrow();
    await flush();
  });

  it('tolerates a non-2xx webhook response', async () => {
    fetchMock.mockResolvedValue({ ok: false, status: 429 });
    const service = new AlertService(config({ ALERT_WEBHOOK_URL: WEBHOOK }));
    service.send({ key: 'k', severity: 'critical', title: 'Boom' });
    await flush();
    expect(fetchMock).toHaveBeenCalledTimes(1);
  });

  it('bounds the dedupe map so high-cardinality keys cannot leak memory', async () => {
    // Alert keys embed request paths, which contain ids — an attacker hitting
    // /courses/<random-uuid> until something 500s would otherwise grow this
    // map without limit.
    const service = new AlertService(
      config({ ALERT_WEBHOOK_URL: WEBHOOK, ALERT_COOLDOWN_MS: '600000' }),
    );
    for (let i = 0; i < 1200; i++) {
      service.send({ key: `key-${i}`, severity: 'warning', title: 'T' });
    }
    await flush();
    const tracked = (service as unknown as { recent: Map<string, unknown> })
      .recent;
    expect(tracked.size).toBeLessThanOrEqual(500);
  });

  it('labels the environment so staging noise is distinguishable', async () => {
    const service = new AlertService(
      config({ ALERT_WEBHOOK_URL: WEBHOOK, ALERT_ENV_LABEL: 'production' }),
    );
    service.send({ key: 'k', severity: 'critical', title: 'Boom' });
    await flush();
    const body = JSON.parse(
      (fetchMock.mock.calls[0][1] as RequestInit).body as string,
    ) as { text: string };
    expect(body.text).toContain('[production]');
  });
});
