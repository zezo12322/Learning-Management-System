import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AlertService } from './alert.service';

/** Bucket granularity for the sliding window. */
const BUCKET_MS = 15_000;

/**
 * Rolling error-rate alarm (KAN-147).
 *
 * The per-error alert in AllExceptionsFilter catches "something broke". This
 * catches the shape a bad deploy actually has: no single new error, but the
 * proportion of 5xx across all traffic climbing. Both feed the same
 * AlertService, so both inherit its cooldown.
 *
 * Counts live in fixed 15-second buckets rather than a list of timestamps —
 * memory stays constant (`window / 15s` entries) no matter the request rate.
 *
 * `ALERT_ERROR_RATE_MIN_SAMPLES` is the part that matters in practice. Without
 * it, the very first request of a quiet night failing would read as a 100%
 * error rate and page someone. The rate is only judged once the window holds
 * enough traffic for the number to mean anything.
 */
@Injectable()
export class ErrorRateMonitor {
  private readonly windowMs: number;
  private readonly threshold: number;
  private readonly minSamples: number;

  /** bucket index → counts. Pruned to the window on every record. */
  private readonly buckets = new Map<
    number,
    { total: number; errors: number }
  >();

  constructor(
    private readonly config: ConfigService,
    private readonly alerts: AlertService,
  ) {
    this.windowMs = Number(
      this.config.get<string>('ALERT_ERROR_RATE_WINDOW_MS', '300000'),
    );
    this.threshold = Number(
      this.config.get<string>('ALERT_ERROR_RATE_THRESHOLD', '0.1'),
    );
    this.minSamples = Number(
      this.config.get<string>('ALERT_ERROR_RATE_MIN_SAMPLES', '20'),
    );
  }

  /** Records one completed request and re-evaluates the window. */
  record(statusCode: number): void {
    const index = Math.floor(Date.now() / BUCKET_MS);
    const bucket = this.buckets.get(index) ?? { total: 0, errors: 0 };
    bucket.total += 1;
    if (statusCode >= 500) bucket.errors += 1;
    this.buckets.set(index, bucket);

    this.prune(index);
    this.evaluate();
  }

  /** Current window stats — exposed for tests and diagnostics. */
  snapshot(): { total: number; errors: number; rate: number } {
    let total = 0;
    let errors = 0;
    for (const bucket of this.buckets.values()) {
      total += bucket.total;
      errors += bucket.errors;
    }
    return { total, errors, rate: total === 0 ? 0 : errors / total };
  }

  private prune(currentIndex: number): void {
    const oldest = currentIndex - Math.ceil(this.windowMs / BUCKET_MS);
    for (const index of this.buckets.keys()) {
      if (index < oldest) this.buckets.delete(index);
    }
  }

  private evaluate(): void {
    const { total, errors, rate } = this.snapshot();
    if (total < this.minSamples) return;
    if (rate <= this.threshold) return;

    this.alerts.send({
      // One key for the whole condition: while the rate stays high this is a
      // single ongoing incident, not one alert per request.
      key: 'error-rate',
      severity: 'critical',
      title: 'Error rate above threshold',
      detail:
        `${(rate * 100).toFixed(1)}% of requests returned 5xx ` +
        `(${errors}/${total}) in the last ${Math.round(this.windowMs / 60000)}m — ` +
        `threshold ${(this.threshold * 100).toFixed(0)}%.`,
    });
  }
}
