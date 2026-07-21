import { Injectable, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { initializeApp, cert, App } from 'firebase-admin/app';
import { getAuth, Auth } from 'firebase-admin/auth';
import { getStorage } from 'firebase-admin/storage';

@Injectable()
export class FirebaseService implements OnModuleInit {
  private firebaseApp: App;

  constructor(private configService: ConfigService) {}

  onModuleInit() {
    const credentialPath =
      this.configService.get<string>('GOOGLE_APPLICATION_CREDENTIALS') || '';

    this.firebaseApp = initializeApp({
      credential: cert(credentialPath),
      storageBucket: this.configService.get<string>(
        'FIREBASE_STORAGE_BUCKET',
        'learning-management-syst-3cc3a.firebasestorage.app',
      ),
    });
  }

  // Firebase Authentication service
  getAuth(): Auth {
    return getAuth(this.firebaseApp);
  }

  /**
   * Assign a global role to a user via Firebase custom claims. The change
   * takes effect on the user's next token refresh.
   *
   * The `roles` array is the SINGLE source of truth — it is what Data Connect
   * `@auth(expr:)` rules read (`auth.token.roles`) and what FirebaseAuthGuard
   * derives the NestJS role set from. We also strip any legacy `role`/`admin`
   * claims a token may still carry, so a demotion here can't leave a stale
   * `admin: true` that the guards would otherwise have honored.
   *
   * Existing claims are merged (setCustomUserClaims REPLACES the whole object)
   * so unrelated claims such as `companyId` survive a role change.
   *
   * NOTE: the relational `UserRole` table is the ultimate source of truth and
   * is maintained by the Functions `changeUserRole` path; this endpoint only
   * updates the token claims.
   */
  async setUserRole(
    uid: string,
    role: 'admin' | 'instructor' | 'student',
  ): Promise<void> {
    const user = await this.getAuth().getUser(uid);
    // Keep unrelated claims (e.g. companyId) but drop legacy single-role claims
    // explicitly (see doc above) so a demotion can't leave a stale `admin: true`.
    const claims: Record<string, unknown> = { ...(user.customClaims ?? {}) };
    delete claims.role;
    delete claims.admin;
    claims.roles = [role];
    await this.getAuth().setCustomUserClaims(uid, claims);

    // Revoke all existing refresh tokens so the user must re-authenticate.
    // Without this, a demoted admin's stale ID token (minted before the role
    // change) would keep granting admin access until it expires naturally
    // (up to 1 hour). Forcing a re-auth ensures the new claims take effect
    // immediately on the next session.
    await this.getAuth().revokeRefreshTokens(uid);
  }

  /**
   * Mint a Google OAuth2 access token for the service-account credential.
   * Used for privileged, server-only Data Connect calls (e.g. the quiz
   * expiry cron) that have no end-user Firebase token / auth.uid.
   */
  async getAdminAccessToken(): Promise<string> {
    const credential = this.firebaseApp.options.credential;
    if (!credential?.getAccessToken) {
      throw new Error('Service-account credential cannot mint access tokens');
    }
    const { access_token } = await credential.getAccessToken();
    return access_token;
  }

  // Get the default storage bucket
  getBucket(): any {
    return getStorage(this.firebaseApp).bucket();
  }

  /**
   * Upload a file buffer to Firebase Storage.
   *
   * Private by default (H2): objects are NOT made world-readable. The return
   * value is the storage *path*, which callers persist and later exchange for
   * a short-lived signed read URL via {@link resolveReadUrl}. Pass
   * `{ public: true }` only for genuinely public assets (e.g. course
   * thumbnails shown on the public catalog), in which case the public URL is
   * returned instead.
   */
  async uploadFile(
    filePath: string,
    buffer: Buffer,
    contentType: string,
    metadata?: Record<string, string>,
    opts?: { public?: boolean },
  ): Promise<string> {
    const bucket = this.getBucket();
    const file = bucket.file(filePath);

    await file.save(buffer, {
      metadata: {
        contentType,
        metadata: metadata ?? {},
      },
    });

    if (opts?.public) {
      await file.makePublic();
      return `https://storage.googleapis.com/${bucket.name}/${filePath}`;
    }

    // Private: return the path; read access is granted on demand via signed URLs.
    return filePath;
  }

  /**
   * Make an already-uploaded object public and return its public URL.
   * Used for genuinely public assets (e.g. course thumbnails).
   */
  async makeFilePublic(filePath: string): Promise<string> {
    const bucket = this.getBucket();
    await bucket.file(filePath).makePublic();
    return `https://storage.googleapis.com/${bucket.name}/${filePath}`;
  }

  /**
   * Mint a short-lived V4 signed READ url for a private object (H2).
   */
  async generateSignedReadUrl(
    filePath: string,
    expiresInMinutes = 60,
  ): Promise<string> {
    const bucket = this.getBucket();
    const [url] = await bucket.file(filePath).getSignedUrl({
      version: 'v4',
      action: 'read',
      expires: Date.now() + expiresInMinutes * 60 * 1000,
    });
    return url;
  }

  /**
   * Resolve a stored asset reference to a fetchable URL. Full http(s) URLs
   * (legacy/public objects) are returned unchanged; bare storage paths are
   * exchanged for a short-lived signed read URL.
   */
  async resolveReadUrl(stored?: string | null): Promise<string | null> {
    if (!stored) return stored ?? null;
    if (/^https?:\/\//i.test(stored)) return stored;
    return this.generateSignedReadUrl(stored);
  }

  /**
   * Delete all files under a given prefix/directory in Storage.
   */
  async deleteDirectory(prefix: string): Promise<void> {
    const bucket = this.getBucket();
    await bucket.deleteFiles({ prefix });
  }

  /**
   * Generate a signed upload URL for direct client uploads.
   * Returns a V4 signed PUT URL: the client uploads the bytes with
   * `PUT <uploadUrl>` and header `Content-Type: <contentType>`.
   * Valid for the specified duration (default 15 minutes).
   */
  async generateSignedUploadUrl(
    filePath: string,
    contentType: string,
    expiresInMinutes = 15,
  ): Promise<{ uploadUrl: string; downloadUrl: string }> {
    const bucket = this.getBucket();
    const file = bucket.file(filePath);

    const [uploadUrl] = await file.getSignedUrl({
      version: 'v4',
      action: 'write',
      expires: Date.now() + expiresInMinutes * 60 * 1000,
      contentType,
    });

    const downloadUrl = `https://storage.googleapis.com/${bucket.name}/${filePath}`;

    return { uploadUrl, downloadUrl };
  }

  /**
   * Download a private object's raw bytes via the Admin SDK (bypasses Storage
   * rules). Used by the streaming layer to read the AES-128 content key and the
   * stored HLS playlists, which must never be exposed to clients directly.
   */
  async downloadFile(filePath: string): Promise<Buffer> {
    const [buffer] = await this.getBucket().file(filePath).download();
    return buffer;
  }

  /**
   * Check if a file exists at the given path.
   */
  async fileExists(filePath: string): Promise<boolean> {
    const bucket = this.getBucket();
    const file = bucket.file(filePath);
    const [exists] = await file.exists();
    return exists;
  }
}
