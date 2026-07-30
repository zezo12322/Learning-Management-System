import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

export type AlertSeverity = 'critical' | 'warning' | 'info';

export interface Alert {
  /**
   * Stable identity for this *kind* of problem, used for deduplication —
   * e.g. `5xx:POST /api/v1/payments/checkout:TypeError`. Repeats within the
   * cooldown are counted, not sent.
   */
  key: string;
  severity: AlertSeverity;
  title: string;
  /** One line of context. Never include tokens, bodies or stack traces. */
  detail?: string;
}

const SEVERITY_ICON: Record<AlertSeverity, string> = {
  critical: '🔴',
  warning: '🟠',
  info: '🔵',
};

/**
 * Outbound alerting (KAN-147) — replaces "grep the Railway logs" with a push.
 *
 * Posts a Slack-shaped `{ text }` payload to `ALERT_WEBHOOK_URL`. That format is
 * accepted as-is by Slack Incoming Webhooks, by Discord's `/slack`-suffixed
 * webhook endpoint and by Teams workflow webhooks, so the destination is a
 * config choice rather than a code change.
 *
 * Three properties this must have, because it runs inside the error path:
 *
 *   • **Never throws, never blocks.** `send()` returns void and the POST is
 *     fire-and-forget. An alerting outage must not turn a handled 500 into an
 *     unhandled rejection, and must not add webhook latency to a user's request.
 *   • **No-ops when unconfigured.** Same stance as `functions/src/utils/mailer.ts`:
 *     local and CI runs have no webhook and must stay silent, not crash.
 *   • **Rate-limited per key.** The failure mode of an alerter is a bad deploy
 *     emitting thousands of identical 500s and burying the on-call in duplicates
 *     (and blowing the webhook's own rate limit). Repeats inside the cooldown are
 *     counted and reported as a suppression tally on the next send.
 *
 * Total outage is deliberately NOT this service's job: a process that is gone
 * cannot alert about itself. That is what the external uptime monitor covers —
 * see docs/OPERATIONS.md §2.
 */
@Injectable()
export class AlertService implements OnModuleInit {
  private readonly logger = new Logger(AlertService.name);
  private readonly webhookUrl: string;
  private readonly cooldownMs: number;
  private readonly timeoutMs: number;
  private readonly envLabel: string;

  /** key → last send + how many were swallowed since. */
  private readonly recent = new Map<
    string,
    { lastSentAt: number; suppressed: number }
  >();

  /**
   * Hard cap on dedupe-map size. Alert keys embed the request path, which
   * contains ids — an unbounded map is a memory leak an attacker could drive by
   * hitting `/courses/<random-uuid>` until something 500s.
   */
  private static readonly MAX_TRACKED_KEYS = 500;

  constructor(private readonly config: ConfigService) {
    this.webhookUrl = this.config.get<string>('ALERT_WEBHOOK_URL', '');
    this.cooldownMs = Number(
      this.config.get<string>('ALERT_COOLDOWN_MS', '300000'),
    );
    this.timeoutMs = Number(
      this.config.get<string>('ALERT_TIMEOUT_MS', '5000'),
    );
    this.envLabel =
      this.config.get<string>('ALERT_ENV_LABEL', '') ||
      process.env.NODE_ENV ||
      'unknown';
  }

  get enabled(): boolean {
    return this.webhookUrl.length > 0;
  }

  onModuleInit(): void {
    // Said once at boot, so a production instance that silently cannot alert is
    // discoverable from the startup log rather than during an incident.
    if (!this.enabled) {
      this.logger.warn(
        'ALERT_WEBHOOK_URL is not set — alerts will be logged only, not delivered.',
      );
    }
  }

  /**
   * Queues an alert. Returns immediately; delivery happens on a detached
   * promise that swallows its own failures.
   */
  send(alert: Alert): void {
    if (this.isSuppressed(alert.key)) return;

    const suppressed = this.recent.get(alert.key)?.suppressed ?? 0;
    this.recent.set(alert.key, { lastSentAt: Date.now(), suppressed: 0 });
    this.evictIfOversized();

    const text = this.format(alert, suppressed);

    // Always log locally: with no webhook configured this is the only record,
    // and with one it keeps the drain and the channel telling the same story.
    this.logger.warn(`ALERT ${text}`);

    if (!this.enabled) return;
    void this.post(text);
  }

  /** True when an alert with this key was sent inside the cooldown window. */
  private isSuppressed(key: string): boolean {
    const seen = this.recent.get(key);
    if (!seen) return false;
    if (Date.now() - seen.lastSentAt >= this.cooldownMs) return false;
    seen.suppressed += 1;
    return true;
  }

  private format(alert: Alert, suppressed: number): string {
    const parts = [
      `${SEVERITY_ICON[alert.severity]} *[${this.envLabel}] ${alert.title}*`,
    ];
    if (alert.detail) parts.push(alert.detail);
    if (suppressed > 0) {
      parts.push(
        `_(${suppressed} more of this alert suppressed in the last ${Math.round(this.cooldownMs / 1000)}s)_`,
      );
    }
    return parts.join('\n');
  }

  private async post(text: string): Promise<void> {
    try {
      const response = await fetch(this.webhookUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text }),
        signal: AbortSignal.timeout(this.timeoutMs),
      });
      if (!response.ok) {
        this.logger.warn(
          `Alert webhook returned ${response.status} — alert not delivered.`,
        );
      }
    } catch (err: unknown) {
      // Deliberately terminal: a failed alert is logged and dropped. Retrying
      // would queue work during exactly the incident that broke it.
      const reason = err instanceof Error ? err.message : String(err);
      this.logger.warn(`Alert webhook failed: ${reason}`);
    }
  }

  /** Drops the least-recently-sent keys once the map outgrows its cap. */
  private evictIfOversized(): void {
    if (this.recent.size <= AlertService.MAX_TRACKED_KEYS) return;
    const oldestFirst = [...this.recent.entries()].sort(
      (a, b) => a[1].lastSentAt - b[1].lastSentAt,
    );
    const excess = this.recent.size - AlertService.MAX_TRACKED_KEYS;
    for (const [key] of oldestFirst.slice(0, excess)) {
      this.recent.delete(key);
    }
  }
}
