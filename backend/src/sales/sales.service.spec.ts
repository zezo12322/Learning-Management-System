import {
  BadGatewayException,
  HttpException,
  ServiceUnavailableException,
} from '@nestjs/common';
import { SalesService } from './sales.service';

describe('SalesService', () => {
  const originalUrl = process.env.SALES_AGENT_URL;
  const originalKey = process.env.SALES_AGENT_INTERNAL_API_KEY;
  const originalFetch = global.fetch;

  let service: SalesService;
  let fetchMock: jest.Mock;

  function jsonResponse(body: unknown, status = 200): any {
    return {
      ok: status >= 200 && status < 300,
      status,
      text: async () => JSON.stringify(body),
    };
  }

  beforeEach(() => {
    service = new SalesService();
    process.env.SALES_AGENT_URL = 'https://agent.test/';
    process.env.SALES_AGENT_INTERNAL_API_KEY = 'secret';
    fetchMock = jest.fn();
    global.fetch = fetchMock as any;
  });

  afterAll(() => {
    global.fetch = originalFetch;
    if (originalUrl === undefined) delete process.env.SALES_AGENT_URL;
    else process.env.SALES_AGENT_URL = originalUrl;
    if (originalKey === undefined) delete process.env.SALES_AGENT_INTERNAL_API_KEY;
    else process.env.SALES_AGENT_INTERNAL_API_KEY = originalKey;
  });

  it('sends the shared secret and normalizes the base URL', async () => {
    fetchMock.mockResolvedValue(jsonResponse({ items: [], total: 0 }));

    await service.listLeads({ stage: 'QUALIFIED' });

    const [url, init] = fetchMock.mock.calls[0];
    // The trailing slash on SALES_AGENT_URL must not produce a double slash.
    expect(url).toBe('https://agent.test/v1/sales/leads?stage=QUALIFIED');
    expect(init.headers['X-Internal-Api-Key']).toBe('secret');
  });

  it('omits empty query parameters rather than sending blanks', async () => {
    fetchMock.mockResolvedValue(jsonResponse({}));

    await service.listLeads({ stage: undefined, q: '', channel: null, limit: 10 });

    const [url] = fetchMock.mock.calls[0];
    expect(url).toBe('https://agent.test/v1/sales/leads?limit=10');
  });

  it('url-encodes path parameters', async () => {
    fetchMock.mockResolvedValue(jsonResponse({}));

    await service.getLead('a/b?c');

    const [url] = fetchMock.mock.calls[0];
    expect(url).toContain('/v1/sales/leads/a%2Fb%3Fc');
  });

  it('returns undefined for 204 without trying to parse a body', async () => {
    fetchMock.mockResolvedValue({
      ok: true,
      status: 204,
      text: async () => {
        throw new Error('should not be read');
      },
    });

    await expect(service.retireKnowledge('doc-1')).resolves.toBeUndefined();
  });

  // The upstream status is the useful signal: 409 means "lead opted out", 502
  // means "the agent is down". Flattening both to 500 would make the UI lie.
  it('preserves the upstream status code and error body', async () => {
    fetchMock.mockResolvedValue(
      jsonResponse(
        { error: { code: 'LEAD_OPTED_OUT', message: 'They asked us to stop.' } },
        409,
      ),
    );

    await expect(service.sendMessage('lead-1', { text: 'hi' })).rejects.toMatchObject(
      { status: 409 },
    );
  });

  it('wraps a non-JSON error body instead of throwing on parse', async () => {
    fetchMock.mockResolvedValue({
      ok: false,
      status: 502,
      text: async () => '<html>Bad Gateway</html>',
    });

    await expect(service.stats()).rejects.toBeInstanceOf(HttpException);
  });

  it('turns a network failure into 502 rather than leaking the cause', async () => {
    fetchMock.mockRejectedValue(new Error('ECONNREFUSED'));

    await expect(service.stats()).rejects.toBeInstanceOf(BadGatewayException);
  });

  it('reports a missing agent URL as unavailable, not as a bad request', async () => {
    delete process.env.SALES_AGENT_URL;

    await expect(service.stats()).rejects.toBeInstanceOf(
      ServiceUnavailableException,
    );
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it('reports a missing shared secret as unavailable', async () => {
    delete process.env.SALES_AGENT_INTERNAL_API_KEY;

    await expect(service.stats()).rejects.toBeInstanceOf(
      ServiceUnavailableException,
    );
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it('serializes a body only when one is given', async () => {
    fetchMock.mockResolvedValue(jsonResponse({}));

    await service.stats();
    expect(fetchMock.mock.calls[0][1].body).toBeUndefined();

    fetchMock.mockResolvedValue(jsonResponse({}));
    await service.addKnowledge({ title: 't', content: 'c' });
    expect(JSON.parse(fetchMock.mock.calls[1][1].body)).toEqual({
      title: 't',
      content: 'c',
    });
  });
});
