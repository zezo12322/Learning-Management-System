import { Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { createHmac, timingSafeEqual } from 'crypto';

/**
 * Claims embedded in a key token. The token is handed to the player inside the
 * rewritten HLS manifest (`#EXT-X-KEY:...,URI="...?kt=<token>"`) and presented
 * back to the key endpoint. It binds the right to fetch the AES-128 content key
 * to a single user, lecture and key file, for a short window.
 */
export interface KeyTokenClaims {
  /** Firebase uid the manifest was minted for. */
  uid: string;
  /** Lecture the key belongs to. */
  lectureId: string;
  /** Key file path relative to the lecture's HLS dir (supports key rotation). */
  keyRel: string;
  /** Expiry, epoch seconds. */
  exp: number;
}

/**
 * Mints and verifies short-lived, HMAC-signed key tokens.
 *
 * This is defence-in-depth on top of the Firebase auth + enrollment check on the
 * key endpoint: even a fully authenticated user can only use a key token that
 * was minted for *their* uid and the specific lecture, and only until it
 * expires — so a manifest (or its key URL) leaked to someone else is useless.
 */
@Injectable()
export class KeyTokenService {
  private readonly logger = new Logger(KeyTokenService.name);
  private readonly secret: string;

  constructor(config: ConfigService) {
    this.secret = config.get<string>('STREAM_KEY_SECRET', '');
    if (!this.secret) {
      // Fail loud in logs; sign() will also refuse to mint without a secret.
      this.logger.error(
        'STREAM_KEY_SECRET is not set — secure video key tokens cannot be issued.',
      );
    }
  }

  sign(claims: KeyTokenClaims): string {
    if (!this.secret) {
      throw new Error('STREAM_KEY_SECRET is not configured');
    }
    const payload = this.b64url(Buffer.from(JSON.stringify(claims), 'utf8'));
    const sig = this.b64url(this.hmac(payload));
    return `${payload}.${sig}`;
  }

  /** Verifies signature + expiry and returns the claims, else throws 401. */
  verify(token: string): KeyTokenClaims {
    if (!this.secret) {
      throw new UnauthorizedException('Streaming is not configured');
    }
    const parts = token?.split('.');
    if (!parts || parts.length !== 2) {
      throw new UnauthorizedException('Malformed key token');
    }
    const [payload, sig] = parts;

    const expected = this.b64url(this.hmac(payload));
    const a = Buffer.from(sig);
    const b = Buffer.from(expected);
    if (a.length !== b.length || !timingSafeEqual(a, b)) {
      throw new UnauthorizedException('Invalid key token signature');
    }

    let claims: KeyTokenClaims;
    try {
      claims = JSON.parse(
        Buffer.from(payload, 'base64url').toString('utf8'),
      ) as KeyTokenClaims;
    } catch {
      throw new UnauthorizedException('Corrupt key token');
    }

    if (!claims.exp || claims.exp * 1000 < Date.now()) {
      throw new UnauthorizedException('Key token expired');
    }
    return claims;
  }

  private hmac(data: string): Buffer {
    return createHmac('sha256', this.secret).update(data).digest();
  }

  private b64url(buf: Buffer): string {
    return buf.toString('base64url');
  }
}
