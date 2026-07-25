import { CallHandler, ExecutionContext, Logger } from '@nestjs/common';
import { of } from 'rxjs';
import { LoggingInterceptor } from './logging.interceptor';

function mockContext(url: string, statusCode = 200, method = 'GET') {
  return {
    switchToHttp: () => ({
      getRequest: () => ({ method, originalUrl: url, url }),
      getResponse: () => ({ statusCode }),
    }),
  } as ExecutionContext;
}

const nextHandler: CallHandler = { handle: () => of('ok') };

/** Runs the interceptor to completion and returns the emitted log calls. */
function run(context: ExecutionContext) {
  const interceptor = new LoggingInterceptor();
  const logSpy = jest.spyOn(Logger.prototype, 'log').mockImplementation();
  const errorSpy = jest.spyOn(Logger.prototype, 'error').mockImplementation();
  interceptor.intercept(context, nextHandler).subscribe();
  return { logSpy, errorSpy };
}

describe('LoggingInterceptor', () => {
  afterEach(() => jest.restoreAllMocks());

  it('logs one line with method, path, status and latency', () => {
    const { logSpy } = run(mockContext('/api/v1/courses'));
    expect(logSpy).toHaveBeenCalledTimes(1);
    expect(logSpy.mock.calls[0][0]).toMatch(
      /^GET \/api\/v1\/courses -> 200 \+\d+ms$/,
    );
  });

  it('strips the query string so credentials never reach the log', () => {
    const { logSpy } = run(
      mockContext('/api/v1/lectures/l1/stream/key?kt=SECRET-TOKEN'),
    );
    const line = logSpy.mock.calls[0][0] as string;
    expect(line).not.toContain('SECRET-TOKEN');
    expect(line).toContain('/api/v1/lectures/l1/stream/key');
  });

  it('surfaces a self-handled 5xx at error level (it never reaches the filter)', () => {
    // The @Res() payment routes build their own 500 instead of throwing.
    const { logSpy, errorSpy } = run(
      mockContext('/api/v1/payments/checkout', 500, 'POST'),
    );
    expect(errorSpy).toHaveBeenCalledTimes(1);
    expect(logSpy).not.toHaveBeenCalled();
  });

  it('skips liveness probes, with or without a trailing slash', () => {
    expect(run(mockContext('/api/v1/health')).logSpy).not.toHaveBeenCalled();
    expect(run(mockContext('/api/v1/health/')).logSpy).not.toHaveBeenCalled();
  });
});
