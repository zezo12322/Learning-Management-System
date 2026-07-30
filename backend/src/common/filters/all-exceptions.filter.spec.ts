import {
  ArgumentsHost,
  BadRequestException,
  ForbiddenException,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { AllExceptionsFilter } from './all-exceptions.filter';
import { Alert, AlertService } from '../alerting/alert.service';
import { ErrorRateMonitor } from '../alerting/error-rate.monitor';

/** Minimal Express response double capturing what the filter writes. */
function mockResponse(overrides: { headersSent?: boolean } = {}) {
  const res: any = {
    headersSent: overrides.headersSent ?? false,
    statusCode: 200,
    headers: {} as Record<string, string>,
    body: undefined as unknown,
    ended: false,
    setHeader(name: string, value: string) {
      this.headers[name.toLowerCase()] = value;
    },
    status(code: number) {
      this.statusCode = code;
      return this;
    },
    json(payload: unknown) {
      this.body = payload;
      return this;
    },
    end() {
      this.ended = true;
      return this;
    },
  };
  return res;
}

function mockHost(res: any, url: string, method = 'GET'): ArgumentsHost {
  const req: any = { method, originalUrl: url, url };
  return {
    switchToHttp: () => ({ getResponse: () => res, getRequest: () => req }),
  } as ArgumentsHost;
}

describe('AllExceptionsFilter', () => {
  let filter: AllExceptionsFilter;
  let errorSpy: jest.SpyInstance;
  let warnSpy: jest.SpyInstance;
  let sent: Alert[];
  let recorded: number[];

  beforeEach(() => {
    sent = [];
    recorded = [];
    const alerts = {
      send: (alert: Alert) => sent.push(alert),
    } as unknown as AlertService;
    const errorRate = {
      record: (status: number) => recorded.push(status),
    } as unknown as ErrorRateMonitor;

    filter = new AllExceptionsFilter(alerts, errorRate);
    errorSpy = jest.spyOn(Logger.prototype, 'error').mockImplementation();
    warnSpy = jest.spyOn(Logger.prototype, 'warn').mockImplementation();
  });

  afterEach(() => jest.restoreAllMocks());

  it('preserves an HttpException status and body', () => {
    const res = mockResponse();
    filter.catch(new ForbiddenException('Not enrolled'), mockHost(res, '/x'));

    expect(res.statusCode).toBe(HttpStatus.FORBIDDEN);
    expect(res.body).toMatchObject({
      statusCode: 403,
      message: 'Not enrolled',
    });
    expect(errorSpy).not.toHaveBeenCalled();
  });

  it('honours the statusCode on Express middleware errors instead of reporting 500', () => {
    // body-parser throws PayloadTooLargeError (statusCode 413) — not an
    // HttpException. It must not be logged as a server-error incident.
    const payloadTooLarge = Object.assign(
      new Error('request entity too large'),
      { statusCode: 413 },
    );
    const res = mockResponse();
    filter.catch(payloadTooLarge, mockHost(res, '/api/v1/courses', 'POST'));

    expect(res.statusCode).toBe(HttpStatus.PAYLOAD_TOO_LARGE);
    expect(res.body).toMatchObject({ statusCode: 413 });
    expect(errorSpy).not.toHaveBeenCalled();
    expect(warnSpy).toHaveBeenCalled();
  });

  it('logs the validation detail, not the generic "Bad Request Exception"', () => {
    // ValidationPipe throws BadRequestException with an array message; Nest's
    // exception.message degrades to the class name, so the body must be read.
    const res = mockResponse();
    filter.catch(
      new BadRequestException([
        'title must be a string',
        'price must be a number',
      ]),
      mockHost(res, '/api/v1/courses', 'POST'),
    );

    const line = warnSpy.mock.calls[0][0] as string;
    expect(line).toContain('title must be a string');
    expect(line).toContain('price must be a number');
    expect(line).not.toContain('Bad Request Exception');
  });

  it('truncates a huge validation message so a caller cannot inflate the log line', () => {
    // forbidNonWhitelisted emits one message per unknown property, so the body
    // length is attacker-controlled.
    const many = Array.from(
      { length: 500 },
      (_, i) => `property ${i} should not exist`,
    );
    const res = mockResponse();
    filter.catch(
      new BadRequestException(many),
      mockHost(res, '/api/v1/courses', 'POST'),
    );

    const line = warnSpy.mock.calls[0][0] as string;
    expect(line).toContain('(truncated)');
    expect(line.length).toBeLessThan(500);
    // The full detail still reaches the client.
    expect((res.body as { message: string[] }).message).toHaveLength(500);
  });

  it('never writes the query string to the log line', () => {
    const res = mockResponse();
    filter.catch(
      new ForbiddenException('nope'),
      mockHost(res, '/api/v1/lectures/l1/stream/key?kt=SECRET-TOKEN'),
    );

    const line = warnSpy.mock.calls[0][0] as string;
    expect(line).toContain('/api/v1/lectures/l1/stream/key');
    expect(line).not.toContain('SECRET-TOKEN');
    expect(line).not.toContain('?');
  });

  it('forces a JSON Content-Type over a route-pinned non-JSON type', () => {
    // The HLS routes pin application/vnd.apple.mpegurl before the handler runs;
    // an error body must not ship labelled as a playlist.
    const res = mockResponse();
    res.setHeader('Content-Type', 'application/vnd.apple.mpegurl');
    filter.catch(
      new ForbiddenException('nope'),
      mockHost(res, '/stream/manifest'),
    );

    expect(res.headers['content-type']).toMatch(/application\/json/);
  });

  it('bails out without writing when the response is already committed', () => {
    const res = mockResponse({ headersSent: true });
    expect(() =>
      filter.catch(
        new Error('late failure'),
        mockHost(res, '/api/v1/payments/checkout'),
      ),
    ).not.toThrow();

    expect(res.ended).toBe(true);
    expect(res.body).toBeUndefined();
  });

  it('reports unknown errors as 500 with a stack and no internal detail leak', () => {
    const res = mockResponse();
    filter.catch(
      new Error('connection string leaked here'),
      mockHost(res, '/api/v1/courses'),
    );

    expect(res.statusCode).toBe(HttpStatus.INTERNAL_SERVER_ERROR);
    expect(res.body).toEqual({
      statusCode: 500,
      error: 'Internal Server Error',
      message: 'Internal server error',
    });
    expect(errorSpy).toHaveBeenCalled();
  });

  describe('alerting (KAN-147)', () => {
    it('raises a critical alert for a server error', () => {
      filter.catch(
        new TypeError('boom'),
        mockHost(mockResponse(), '/api/v1/x'),
      );
      expect(sent).toHaveLength(1);
      expect(sent[0].severity).toBe('critical');
      expect(sent[0].title).toContain('500');
    });

    it('does not alert on client errors', () => {
      filter.catch(
        new BadRequestException('bad input'),
        mockHost(mockResponse(), '/api/v1/x'),
      );
      expect(sent).toHaveLength(0);
    });

    it('keys the alert on error class, not message, so the cooldown holds', () => {
      // Messages embed ids and values; keying on them would send one alert per
      // request for what is really a single recurring fault.
      filter.catch(
        new TypeError('failed for user 111'),
        mockHost(mockResponse(), '/api/v1/x'),
      );
      filter.catch(
        new TypeError('failed for user 222'),
        mockHost(mockResponse(), '/api/v1/x'),
      );
      expect(sent[0].key).toBe(sent[1].key);
      expect(sent[0].key).toContain('TypeError');
    });

    it('never puts a stack trace in the outbound alert', () => {
      const err = new Error('secret path /srv/app/config');
      filter.catch(err, mockHost(mockResponse(), '/api/v1/x'));
      expect(sent[0].detail).not.toContain('at ');
      expect(JSON.stringify(sent[0])).not.toContain(err.stack ?? 'NO_STACK');
    });

    it('counts every completed request for the error-rate window', () => {
      filter.catch(
        new BadRequestException('nope'),
        mockHost(mockResponse(), '/api/v1/x'),
      );
      filter.catch(new Error('boom'), mockHost(mockResponse(), '/api/v1/y'));
      expect(recorded).toEqual([400, 500]);
    });
  });
});
