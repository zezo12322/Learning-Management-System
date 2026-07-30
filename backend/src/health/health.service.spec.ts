import { ConfigService } from '@nestjs/config';
import { Logger } from '@nestjs/common';
import { HealthService } from './health.service';
import { DataConnectService } from '../firebase/dataconnect.service';
import { Alert, AlertService } from '../common/alerting/alert.service';

/** Config stub: returns the requested override, else the caller's default. */
function config(overrides: Record<string, string> = {}): ConfigService {
  return {
    get: (key: string, fallback?: string) => overrides[key] ?? fallback,
  } as unknown as ConfigService;
}

function build(
  opts: {
    ping?: () => Promise<string>;
    probe?: () => Promise<unknown>;
    env?: Record<string, string>;
  } = {},
) {
  const redis = { ping: opts.ping ?? (() => Promise.resolve('PONG')) };
  const dataConnect = {
    executeQueryAsAdmin: jest
      .fn()
      .mockImplementation(opts.probe ?? (() => Promise.resolve({}))),
  };
  const sent: Alert[] = [];
  const service = new HealthService(
    redis as never,
    dataConnect as unknown as DataConnectService,
    config(opts.env),
    { send: (alert: Alert) => sent.push(alert) } as unknown as AlertService,
  );
  return { service, dataConnect, sent };
}

describe('HealthService', () => {
  beforeEach(() => {
    jest.spyOn(Logger.prototype, 'error').mockImplementation();
    jest.spyOn(Logger.prototype, 'log').mockImplementation();
    jest.spyOn(Logger.prototype, 'debug').mockImplementation();
  });
  afterEach(() => jest.restoreAllMocks());

  describe('liveness', () => {
    it('reports ok with uptime and env, touching no dependency', () => {
      const { service, dataConnect } = build();
      const result = service.liveness();
      expect(result.status).toBe('ok');
      expect(typeof result.uptime).toBe('number');
      expect(typeof result.timestamp).toBe('string');
      expect(dataConnect.executeQueryAsAdmin).not.toHaveBeenCalled();
    });
  });

  describe('readiness', () => {
    it('is ok when both dependencies answer', async () => {
      const { service } = build();
      const report = await service.readiness();
      expect(report.status).toBe('ok');
      expect(report.checks.redis.status).toBe('up');
      expect(report.checks.dataconnect.status).toBe('up');
    });

    it('probes Data Connect with the dedicated HealthProbe operation', async () => {
      const { service, dataConnect } = build();
      await service.readiness();
      expect(dataConnect.executeQueryAsAdmin).toHaveBeenCalledWith(
        'HealthProbe',
      );
    });

    it('reports error and names the failing dependency when Redis is down', async () => {
      const { service } = build({
        ping: () =>
          Promise.reject(new Error('connect ECONNREFUSED 10.0.0.3:6379')),
      });
      const report = await service.readiness();
      expect(report.status).toBe('error');
      expect(report.checks.redis.status).toBe('down');
      // Data Connect is independent — a Redis outage must not mask its state.
      expect(report.checks.dataconnect.status).toBe('up');
    });

    it('never leaks driver detail (hosts, ports) to the anonymous caller', async () => {
      const { service } = build({
        ping: () =>
          Promise.reject(new Error('connect ECONNREFUSED 10.0.0.3:6379')),
      });
      const report = await service.readiness();
      expect(report.checks.redis.error).toBe('unreachable');
      expect(JSON.stringify(report)).not.toContain('10.0.0.3');
    });

    it('fails a check that hangs, instead of hanging with it', async () => {
      const { service } = build({
        probe: () => new Promise(() => {}), // never settles
        env: { HEALTH_CHECK_TIMEOUT_MS: '20' },
      });
      const report = await service.readiness();
      expect(report.status).toBe('error');
      expect(report.checks.dataconnect.error).toBe('timeout');
    });

    it('treats an unexpected PING reply as down', async () => {
      const { service } = build({ ping: () => Promise.resolve('WAT') });
      const report = await service.readiness();
      expect(report.checks.redis.status).toBe('down');
    });

    it('caches, so a burst of probes costs one upstream call', async () => {
      const { service, dataConnect } = build({
        env: { HEALTH_CACHE_MS: '5000' },
      });
      await Promise.all([
        service.readiness(),
        service.readiness(),
        service.readiness(),
      ]);
      await service.readiness();
      expect(dataConnect.executeQueryAsAdmin).toHaveBeenCalledTimes(1);
    });

    it('re-checks once the cache window has passed', async () => {
      const { service, dataConnect } = build({ env: { HEALTH_CACHE_MS: '0' } });
      await service.readiness();
      await service.readiness();
      expect(dataConnect.executeQueryAsAdmin).toHaveBeenCalledTimes(2);
    });

    it('logs once per transition, not once per probe', async () => {
      const errorSpy = jest.spyOn(Logger.prototype, 'error');
      const { service } = build({
        ping: () => Promise.reject(new Error('down')),
        env: { HEALTH_CACHE_MS: '0' },
      });
      await service.readiness();
      await service.readiness();
      await service.readiness();
      expect(errorSpy).toHaveBeenCalledTimes(1);
    });
  });

  describe('alerting (KAN-147)', () => {
    it('raises one alert when a dependency goes down, not one per probe', async () => {
      // A monitor polling a dependency that has been down for an hour must not
      // page on every probe.
      const { service, sent } = build({
        ping: () => Promise.reject(new Error('down')),
        env: { HEALTH_CACHE_MS: '0' },
      });
      await service.readiness();
      await service.readiness();
      await service.readiness();
      expect(sent.filter((a) => a.key === 'readiness')).toHaveLength(1);
    });

    it('announces recovery on a separate key, so the down cooldown cannot swallow it', async () => {
      let healthy = false;
      const { service, sent } = build({
        ping: () =>
          healthy ? Promise.resolve('PONG') : Promise.reject(new Error('down')),
        env: { HEALTH_CACHE_MS: '0' },
      });
      await service.readiness();
      healthy = true;
      await service.readiness();

      expect(sent.map((a) => a.key)).toEqual([
        'readiness',
        'readiness-recovered',
      ]);
      expect(sent[1].severity).toBe('info');
    });

    it('stays silent while everything is healthy', async () => {
      const { service, sent } = build({ env: { HEALTH_CACHE_MS: '0' } });
      await service.readiness();
      await service.readiness();
      expect(sent).toHaveLength(0);
    });
  });
});
