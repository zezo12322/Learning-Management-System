import {
  BadGatewayException,
  HttpException,
  Injectable,
  Logger,
  ServiceUnavailableException,
} from '@nestjs/common';

/**
 * Thin proxy to the sales-agent service.
 *
 * The CRM lives in that service's database, not here, so this module owns no
 * sales state — it owns *authorization*. The agent authenticates with a shared
 * secret; the web app authenticates with a Firebase token and an admin role, and
 * this is the seam that translates one into the other.
 *
 * Errors are translated rather than swallowed: the agent's own status codes and
 * error bodies are the useful diagnostic (unapproved template, opted-out lead,
 * no handle on file), so they are passed through instead of being flattened into
 * a generic 500.
 */
@Injectable()
export class SalesService {
  private readonly logger = new Logger(SalesService.name);

  private get baseUrl(): string {
    const url = process.env.SALES_AGENT_URL;
    if (!url) {
      throw new ServiceUnavailableException(
        'SALES_AGENT_URL is not configured on this deployment.',
      );
    }
    return url.replace(/\/+$/, '');
  }

  private get apiKey(): string {
    const key = process.env.SALES_AGENT_INTERNAL_API_KEY;
    if (!key) {
      throw new ServiceUnavailableException(
        'SALES_AGENT_INTERNAL_API_KEY is not configured on this deployment.',
      );
    }
    return key;
  }

  async request<T = any>(
    method: 'GET' | 'POST' | 'PATCH' | 'DELETE',
    path: string,
    options: { body?: unknown; query?: Record<string, unknown> } = {},
  ): Promise<T> {
    // Both config reads happen before the try: inside it, a missing secret would
    // be caught and reported as "could not reach the agent", sending whoever
    // debugs it to the network instead of to the environment variable.
    const url = new URL(`${this.baseUrl}${path}`);
    const apiKey = this.apiKey;
    for (const [key, value] of Object.entries(options.query ?? {})) {
      if (value === undefined || value === null || value === '') {
        continue;
      }
      // Only primitives belong in a query string. `String()` on an object would
      // silently send "[object Object]" and the filter would appear to work
      // while matching nothing, so a bad value is dropped and logged instead.
      if (typeof value === 'string') {
        url.searchParams.set(key, value);
      } else if (
        typeof value === 'number' ||
        typeof value === 'boolean' ||
        typeof value === 'bigint'
      ) {
        url.searchParams.set(key, value.toString());
      } else {
        this.logger.warn(
          `Ignoring non-primitive query parameter '${key}' for ${path}`,
        );
      }
    }

    let response: Response;
    try {
      response = await fetch(url.toString(), {
        method,
        headers: {
          'Content-Type': 'application/json',
          'X-Internal-Api-Key': apiKey,
        },
        body:
          options.body === undefined ? undefined : JSON.stringify(options.body),
        // The agent may call a model and a provider before answering; a short
        // default timeout would turn a slow reply into a spurious failure.
        signal: AbortSignal.timeout(30_000),
      });
    } catch (err: any) {
      this.logger.error(
        `Sales agent ${method} ${path} failed: ${err?.message}`,
      );
      throw new BadGatewayException('Could not reach the sales agent service.');
    }

    if (response.status === 204) {
      return undefined as T;
    }

    const text = await response.text();
    let payload: any = undefined;
    if (text) {
      try {
        payload = JSON.parse(text);
      } catch {
        payload = { message: text.slice(0, 500) };
      }
    }

    if (!response.ok) {
      this.logger.warn(
        `Sales agent ${method} ${path} returned ${response.status}`,
      );
      // Preserve the upstream status so the UI can tell "lead opted out" (409)
      // from "agent is down" (502).
      throw new HttpException(
        payload ?? { message: 'Sales agent request failed.' },
        response.status,
      );
    }

    return payload as T;
  }

  listLeads(query: Record<string, unknown>) {
    return this.request('GET', '/v1/sales/leads', { query });
  }

  getLead(leadId: string) {
    return this.request('GET', `/v1/sales/leads/${encodeURIComponent(leadId)}`);
  }

  patchLead(leadId: string, body: unknown) {
    return this.request(
      'PATCH',
      `/v1/sales/leads/${encodeURIComponent(leadId)}`,
      {
        body,
      },
    );
  }

  sendMessage(leadId: string, body: unknown) {
    return this.request(
      'POST',
      `/v1/sales/leads/${encodeURIComponent(leadId)}/messages`,
      { body },
    );
  }

  enrollInSequence(leadId: string, body: unknown) {
    return this.request(
      'POST',
      `/v1/sales/leads/${encodeURIComponent(leadId)}/sequences`,
      { body },
    );
  }

  stopSequences(leadId: string, reason?: string) {
    return this.request(
      'DELETE',
      `/v1/sales/leads/${encodeURIComponent(leadId)}/sequences`,
      { query: { reason } },
    );
  }

  stats() {
    return this.request('GET', '/v1/sales/stats');
  }

  listSequences() {
    return this.request('GET', '/v1/sales/sequences');
  }

  listKnowledge(includeInactive = false) {
    return this.request('GET', '/v1/sales/knowledge', {
      query: { include_inactive: includeInactive },
    });
  }

  addKnowledge(body: unknown) {
    return this.request('POST', '/v1/sales/knowledge', { body });
  }

  retireKnowledge(documentId: string) {
    return this.request(
      'DELETE',
      `/v1/sales/knowledge/${encodeURIComponent(documentId)}`,
    );
  }

  seedKnowledge() {
    return this.request('POST', '/v1/sales/knowledge/seed', { body: {} });
  }

  previewChat(body: unknown) {
    return this.request('POST', '/v1/sales/preview/chat', { body });
  }

  recommendUpsell(body: unknown) {
    return this.request('POST', '/v1/sales/upsell/recommend', { body });
  }

  recordUpsellOutcome(recommendationId: string, outcome: string) {
    return this.request(
      'POST',
      `/v1/sales/upsell/${encodeURIComponent(recommendationId)}/outcome`,
      { body: { outcome } },
    );
  }

  drainOutbound(limit = 50) {
    return this.request('POST', '/v1/sales/outbound/drain', {
      body: { limit },
    });
  }

  readiness() {
    return this.request('GET', '/v1/ready');
  }
}
