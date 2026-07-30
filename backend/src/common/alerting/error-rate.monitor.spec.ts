import { ConfigService } from '@nestjs/config';
import { Alert, AlertService } from './alert.service';
import { ErrorRateMonitor } from './error-rate.monitor';

function config(overrides: Record<string, string> = {}): ConfigService {
  return {
    get: (key: string, fallback?: string) => overrides[key] ?? fallback,
  } as unknown as ConfigService;
}

function build(overrides: Record<string, string> = {}) {
  const sent: Alert[] = [];
  const alerts = {
    send: (alert: Alert) => sent.push(alert),
  } as unknown as AlertService;
  const monitor = new ErrorRateMonitor(config(overrides), alerts);
  return { monitor, sent };
}

/** Records `count` requests, all with the given status. */
function record(monitor: ErrorRateMonitor, status: number, count: number) {
  for (let i = 0; i < count; i++) monitor.record(status);
}

describe('ErrorRateMonitor', () => {
  it('stays quiet while everything is succeeding', () => {
    const { monitor, sent } = build();
    record(monitor, 200, 500);
    expect(sent).toHaveLength(0);
  });

  it('alerts once the 5xx share crosses the threshold', () => {
    const { monitor, sent } = build({
      ALERT_ERROR_RATE_THRESHOLD: '0.1',
      ALERT_ERROR_RATE_MIN_SAMPLES: '20',
    });
    record(monitor, 200, 80);
    record(monitor, 500, 20); // 20% of 100
    expect(sent.length).toBeGreaterThan(0);
    expect(sent[0].severity).toBe('critical');
    expect(sent[0].key).toBe('error-rate');
  });

  it('does not judge the rate before the window holds enough traffic', () => {
    // Without a minimum sample size, the first request of a quiet night failing
    // would read as a 100% error rate and page someone.
    const { monitor, sent } = build({ ALERT_ERROR_RATE_MIN_SAMPLES: '20' });
    record(monitor, 500, 1);
    expect(monitor.snapshot().rate).toBe(1);
    expect(sent).toHaveLength(0);
  });

  it('ignores 4xx — client errors are not an outage', () => {
    const { monitor, sent } = build({ ALERT_ERROR_RATE_MIN_SAMPLES: '10' });
    record(monitor, 400, 100);
    expect(monitor.snapshot().errors).toBe(0);
    expect(sent).toHaveLength(0);
  });

  it('uses one alert key, so a sustained incident is one thread', () => {
    const { monitor, sent } = build({
      ALERT_ERROR_RATE_THRESHOLD: '0.1',
      ALERT_ERROR_RATE_MIN_SAMPLES: '10',
    });
    record(monitor, 500, 50);
    expect(new Set(sent.map((a) => a.key)).size).toBe(1);
  });

  it('reports the counts behind the rate', () => {
    const { monitor, sent } = build({
      ALERT_ERROR_RATE_THRESHOLD: '0.1',
      ALERT_ERROR_RATE_MIN_SAMPLES: '10',
    });
    record(monitor, 200, 10);
    record(monitor, 500, 10);
    // Each record past the threshold re-evaluates, so the most recent alert
    // carries the current window. AlertService is what collapses these into one
    // delivered message.
    expect(sent[sent.length - 1].detail).toContain('50.0%');
    expect(sent[sent.length - 1].detail).toContain('10/20');
  });

  it('keeps memory constant regardless of request volume', () => {
    // Counts live in fixed 15s buckets, not a list of timestamps.
    const { monitor } = build({ ALERT_ERROR_RATE_WINDOW_MS: '300000' });
    record(monitor, 200, 10_000);
    const buckets = (monitor as unknown as { buckets: Map<number, unknown> })
      .buckets;
    expect(buckets.size).toBeLessThanOrEqual(21);
  });

  it('exposes a snapshot of the current window', () => {
    const { monitor } = build();
    record(monitor, 200, 3);
    record(monitor, 503, 1);
    expect(monitor.snapshot()).toEqual({ total: 4, errors: 1, rate: 0.25 });
  });
});
