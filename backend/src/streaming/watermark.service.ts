import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { createHmac, randomUUID } from 'crypto';

export interface WatermarkPayload {
  /** Human-readable text the player overlays on the video. */
  text: string;
  uid: string;
  email: string | null;
  lectureId: string;
  /** Per-issuance id — ties a leaked frame back to a specific request. */
  sessionId: string;
  issuedAt: string;
  expiresAt: string;
  /** HMAC proving the watermark was issued by us (anti-forgery / forensics). */
  signature: string;
}

/**
 * Issues signed, per-user forensic watermark payloads. The frontend overlays
 * `text` on the player (ideally repositioning it periodically so it can't be
 * cropped). This does NOT prevent screen recording — it makes any leaked
 * capture traceable to the exact user + session, which is the realistic
 * deterrent without a hardware-DRM vendor.
 */
@Injectable()
export class WatermarkService {
  private readonly logger = new Logger(WatermarkService.name);
  private readonly secret: string;
  private readonly ttlMinutes: number;

  constructor(config: ConfigService) {
    this.secret = config.get<string>('STREAM_KEY_SECRET', '');
    this.ttlMinutes = Number(
      config.get<string>('STREAM_URL_TTL_MINUTES', '360'),
    );
    if (!this.secret) {
      this.logger.error(
        'STREAM_KEY_SECRET is not set — watermark payloads cannot be signed.',
      );
    }
  }

  issue(
    uid: string,
    email: string | null,
    lectureId: string,
  ): WatermarkPayload {
    const sessionId = randomUUID();
    const issuedAtMs = Date.now();
    const issuedAt = new Date(issuedAtMs).toISOString();
    const expiresAt = new Date(
      issuedAtMs + this.ttlMinutes * 60 * 1000,
    ).toISOString();

    const signature = this.sign(`${uid}.${lectureId}.${sessionId}.${issuedAt}`);
    const text = `${email ?? uid} • ${issuedAt}`;

    return {
      text,
      uid,
      email,
      lectureId,
      sessionId,
      issuedAt,
      expiresAt,
      signature,
    };
  }

  private sign(data: string): string {
    if (!this.secret) {
      throw new Error('STREAM_KEY_SECRET is not configured');
    }
    return createHmac('sha256', this.secret).update(data).digest('base64url');
  }
}
