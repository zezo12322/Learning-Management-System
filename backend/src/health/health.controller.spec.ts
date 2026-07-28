import { Response } from 'express';
import { HealthController } from './health.controller';
import { HealthService, ReadinessReport } from './health.service';
import { ShutdownService } from './shutdown.service';

const okReport: ReadinessReport = {
  status: 'ok',
  timestamp: new Date().toISOString(),
  checks: {
    redis: { status: 'up', latencyMs: 1 },
    dataconnect: { status: 'up', latencyMs: 12 },
  },
};

const downReport: ReadinessReport = {
  ...okReport,
  status: 'error',
  checks: {
    redis: { status: 'down', latencyMs: 3000, error: 'timeout' },
    dataconnect: { status: 'up', latencyMs: 9 },
  },
};

/**
 * Returns the fake Response together with its `status` spy. The spy is handed
 * back separately rather than read off the object at assert time so the lint
 * rule against passing unbound methods around stays satisfied.
 */
function mockResponse() {
  const status = jest.fn().mockReturnThis();
  return { res: { status } as unknown as Response, status };
}

function build(report: ReadinessReport = okReport) {
  const liveness = jest.fn().mockReturnValue({ status: 'ok' });
  const readiness = jest.fn().mockResolvedValue(report);
  const shutdown = new ShutdownService();
  const controller = new HealthController(
    { liveness, readiness } as unknown as HealthService,
    shutdown,
  );
  return { controller, liveness, readiness, shutdown };
}

describe('HealthController', () => {
  it('serves liveness without running dependency checks', () => {
    const { controller, readiness } = build();
    expect(controller.liveness().status).toBe('ok');
    expect(readiness).not.toHaveBeenCalled();
  });

  it('answers 200 when every dependency is up', async () => {
    const { controller } = build();
    const { res, status } = mockResponse();
    const body = await controller.readiness(res);
    expect(status).toHaveBeenCalledWith(200);
    expect(body.status).toBe('ok');
  });

  it('answers 503 with the failing check named when a dependency is down', async () => {
    const { controller } = build(downReport);
    const { res, status } = mockResponse();
    const body = (await controller.readiness(res)) as ReadinessReport;
    expect(status).toHaveBeenCalledWith(503);
    expect(body.checks.redis.status).toBe('down');
  });

  it('answers 503 as soon as the process is draining, before any check runs', async () => {
    // The whole point of the drain flag: a shutting-down instance must leave
    // rotation immediately, even while its dependencies are perfectly healthy.
    const { controller, readiness, shutdown } = build();
    shutdown.beginDraining();
    const { res, status } = mockResponse();
    const body = await controller.readiness(res);
    expect(status).toHaveBeenCalledWith(503);
    expect(body.status).toBe('shutting_down');
    expect(readiness).not.toHaveBeenCalled();
  });
});

describe('ShutdownService', () => {
  it('starts serving traffic and flips exactly once', () => {
    const shutdown = new ShutdownService();
    expect(shutdown.isDraining).toBe(false);
    shutdown.beginDraining();
    shutdown.beginDraining();
    expect(shutdown.isDraining).toBe(true);
  });

  it('also drains on a programmatic app.close()', () => {
    const shutdown = new ShutdownService();
    shutdown.onApplicationShutdown();
    expect(shutdown.isDraining).toBe(true);
  });
});
