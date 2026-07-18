import {
  Injectable,
  Logger,
  NotFoundException,
  ForbiddenException,
  BadRequestException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { DataConnectService } from '../firebase/dataconnect.service';
import { FirebaseService } from '../firebase/firebase.service';
import { AccessService } from '../common/services/access.service';
import { KeyTokenService } from './key-token.service';
import { WatermarkService, WatermarkPayload } from './watermark.service';
import { CourseStoragePaths } from '../common/constants/storage-paths';

interface ManifestRequest {
  lectureId: string;
  uid: string;
  token: string;
  isAdmin: boolean;
  /** Variant playlist path relative to the HLS dir, for ABR master playlists. */
  variant?: string;
  /** Caller IP, recorded in the access log for leak forensics. */
  ip?: string;
}

/**
 * Secure HLS (AES-128) streaming.
 *
 * Strategy (no external DRM vendor):
 *  - Video is packaged offline into AES-128-encrypted HLS (see the architecture
 *    plan). Playlists, segments and the content key live in a PRIVATE bucket.
 *  - The client never gets a stable URL. It calls the manifest endpoint, which
 *    (a) enforces enrollment, (b) rewrites every segment URI to a short-lived
 *    signed GCS URL, and (c) rewrites the key URI to our own key endpoint
 *    carrying a bound, expiring key token.
 *  - The key endpoint re-checks auth + enrollment + the key token before
 *    returning the raw 16-byte key, and logs each issuance for forensics.
 *
 * This defeats direct download, hotlinking and URL sharing. It does NOT defeat
 * screen recording — see the plan for the watermarking/vendor upgrade path.
 */
@Injectable()
export class StreamingService {
  private readonly logger = new Logger(StreamingService.name);
  private readonly urlTtlMinutes: number;
  private readonly apiBaseUrl: string;

  constructor(
    private readonly dc: DataConnectService,
    private readonly firebase: FirebaseService,
    private readonly access: AccessService,
    private readonly keyTokens: KeyTokenService,
    private readonly watermark: WatermarkService,
    config: ConfigService,
  ) {
    this.urlTtlMinutes = Number(
      config.get<string>('STREAM_URL_TTL_MINUTES', '360'),
    );
    // Absolute base for self-referential URLs embedded in the manifest (key +
    // sub-playlist endpoints). Must be reachable by the player.
    this.apiBaseUrl = config
      .get<string>('API_PUBLIC_URL', 'http://localhost:3000')
      .replace(/\/+$/, '');
  }

  /**
   * Resolve a lecture for streaming and enforce access. Returns the lecture plus
   * its HLS directory (derived from the stored `videoUrl` path). Mirrors the
   * gate in LecturesService.getContent (free preview → owner/admin → active
   * enrollment).
   */
  private async resolveAndAuthorize(
    lectureId: string,
    uid: string,
    token: string,
    isAdmin: boolean,
  ): Promise<{ videoPath: string; hlsDir: string }> {
    const data = await this.dc.executeQuery(
      'GetLectureContent',
      { lectureId },
      token,
    );
    const lecture = data?.courseLecture;
    if (!lecture) {
      throw new NotFoundException(`Lecture ${lectureId} not found`);
    }
    if (!lecture.videoUrl) {
      throw new NotFoundException(`Lecture ${lectureId} has no video`);
    }
    // We only stream stored (private) HLS paths, never legacy absolute URLs.
    if (/^https?:\/\//i.test(lecture.videoUrl)) {
      throw new BadRequestException(
        'Lecture video is not packaged for secure streaming',
      );
    }

    const authorized =
      lecture.isFreePreview ||
      (await this.hasCourseAccess(lecture, uid, token, isAdmin));
    if (!authorized) {
      throw new ForbiddenException(
        'You must be enrolled in this course to stream this lecture',
      );
    }

    return {
      videoPath: lecture.videoUrl,
      hlsDir: this.dirname(lecture.videoUrl),
    };
  }

  private async hasCourseAccess(
    lecture: any,
    uid: string,
    token: string,
    isAdmin: boolean,
  ): Promise<boolean> {
    const courseId = lecture.section?.course?.id;
    if (!courseId) return false;

    // Owner / admin / assigned instructor.
    try {
      await this.access.assertCourseAccess(courseId, uid, token, isAdmin);
      return true;
    } catch {
      // fall through to enrollment check
    }

    const enrollment = await this.dc.executeQuery(
      'GetUserEnrollmentForCourse',
      { courseId },
      token,
    );
    const enrollmentStatus = enrollment?.enrollments?.[0]?.status;
    return enrollmentStatus === 'ACTIVE' || enrollmentStatus === 'COMPLETED';
  }

  /**
   * Return a rewritten HLS playlist: segment URIs → signed GCS URLs, sub-playlist
   * URIs → this endpoint (variant param), key URI → our key endpoint + token.
   */
  async getManifest(req: ManifestRequest): Promise<string> {
    const { hlsDir } = await this.resolveAndAuthorize(
      req.lectureId,
      req.uid,
      req.token,
      req.isAdmin,
    );

    // The playlist actually being served, and its dir relative to hlsDir.
    const relPlaylist = req.variant
      ? this.safeRel(req.variant)
      : this.basename(this.masterFor(hlsDir));
    const playlistPath = `${hlsDir}/${relPlaylist}`;
    const playlistDirRel =
      this.dirname(relPlaylist) === relPlaylist
        ? ''
        : this.dirname(relPlaylist);

    let raw: string;
    try {
      raw = (await this.firebase.downloadFile(playlistPath)).toString('utf8');
    } catch {
      throw new NotFoundException('Playlist not found');
    }

    this.logAccess('manifest', req.uid, req.lectureId, req.ip, {
      variant: relPlaylist,
    });

    return this.rewritePlaylist(raw, {
      lectureId: req.lectureId,
      uid: req.uid,
      hlsDir,
      playlistDirRel,
    });
  }

  /**
   * Issue a signed forensic watermark for the player to overlay. Enrollment-gated
   * like the manifest. Traces any leaked capture to this user + session.
   */
  async getWatermark(
    lectureId: string,
    uid: string,
    email: string | null,
    token: string,
    isAdmin: boolean,
    ip?: string,
  ): Promise<WatermarkPayload> {
    await this.resolveAndAuthorize(lectureId, uid, token, isAdmin);
    const payload = this.watermark.issue(uid, email, lectureId);
    this.logAccess('watermark', uid, lectureId, ip, {
      sessionId: payload.sessionId,
    });
    return payload;
  }

  /**
   * Single structured sink for streaming access events. Emitting via Logger keeps
   * a forensic trail in stdout/your log aggregator; swap for a DB/BigQuery write
   * if you need queryable, long-retention leak investigation.
   */
  private logAccess(
    event: 'manifest' | 'key' | 'watermark',
    uid: string,
    lectureId: string,
    ip?: string,
    extra?: Record<string, unknown>,
  ): void {
    this.logger.log(
      `stream-access ${JSON.stringify({
        event,
        uid,
        lectureId,
        ip: ip ?? null,
        at: new Date().toISOString(),
        ...extra,
      })}`,
    );
  }

  private signKeyUrl(lectureId: string, uid: string, keyRel: string): string {
    const kt = this.keyTokens.sign({
      uid,
      lectureId,
      keyRel,
      exp: Math.floor(Date.now() / 1000) + this.urlTtlMinutes * 60,
    });
    return (
      `${this.apiBaseUrl}/lectures/${lectureId}/stream/key` +
      `?kt=${encodeURIComponent(kt)}`
    );
  }

  /**
   * Validate the key token (bound to uid + lecture) and return the raw AES-128
   * key bytes. Auth + enrollment are enforced by the caller before this runs.
   */
  async getKey(
    lectureId: string,
    uid: string,
    token: string,
    isAdmin: boolean,
    keyToken: string,
    ip?: string,
  ): Promise<Buffer> {
    const claims = this.keyTokens.verify(keyToken);
    if (claims.uid !== uid || claims.lectureId !== lectureId) {
      throw new ForbiddenException('Key token does not match this session');
    }

    // Re-authorize against live enrollment (membership may have been revoked
    // since the manifest was minted).
    const { hlsDir } = await this.resolveAndAuthorize(
      lectureId,
      uid,
      token,
      isAdmin,
    );

    const keyPath = `${hlsDir}/${this.safeRel(claims.keyRel)}`;
    let key: Buffer;
    try {
      key = await this.firebase.downloadFile(keyPath);
    } catch {
      throw new NotFoundException('Content key not found');
    }

    // Forensic trail: who fetched the decryption key, when, from where.
    this.logAccess('key', uid, lectureId, ip, { keyPath });
    return key;
  }

  /**
   * Admin/instructor: after the packaged HLS assets (master.m3u8, variant
   * playlists, segments, enc.key) have been uploaded to the conventional HLS
   * dir, verify the required files exist and point the lecture's `videoUrl` at
   * the master playlist path so the streaming endpoints can serve it.
   * Ownership is enforced by the controller's guards.
   */
  async registerHls(
    courseId: string,
    lectureId: string,
    token: string,
  ): Promise<{ success: true; videoPath: string }> {
    const masterPath = CourseStoragePaths.lectureHlsMaster(courseId, lectureId);
    const keyPath = CourseStoragePaths.lectureHlsKey(courseId, lectureId);

    if (!(await this.firebase.fileExists(masterPath))) {
      throw new BadRequestException(
        'HLS master playlist has not been uploaded for this lecture',
      );
    }
    if (!(await this.firebase.fileExists(keyPath))) {
      throw new BadRequestException(
        'AES content key has not been uploaded for this lecture',
      );
    }

    await this.dc.executeMutation(
      'AdminUpdateLecture',
      { lectureId, videoUrl: masterPath },
      token,
    );

    return { success: true, videoPath: masterPath };
  }

  // ---- playlist rewriting ----

  private async rewritePlaylist(
    raw: string,
    ctx: {
      lectureId: string;
      uid: string;
      hlsDir: string;
      playlistDirRel: string;
    },
  ): Promise<string> {
    const lines = raw.split(/\r?\n/);

    // Pass 1: collect every segment path that needs a signed URL, dedup, then
    // sign them all in parallel (a media playlist can have hundreds of segments).
    const segmentRels = new Set<string>();
    for (const line of lines) {
      const trimmed = line.trim();
      if (trimmed === '' || trimmed.startsWith('#')) continue;
      if (!trimmed.toLowerCase().endsWith('.m3u8')) {
        segmentRels.add(this.joinRel(ctx.playlistDirRel, trimmed));
      }
    }

    const signed = new Map<string, string>();
    await Promise.all(
      [...segmentRels].map(async (rel) => {
        signed.set(
          rel,
          await this.firebase.generateSignedReadUrl(
            `${ctx.hlsDir}/${rel}`,
            this.urlTtlMinutes,
          ),
        );
      }),
    );

    // Pass 2: emit the rewritten playlist.
    const out = lines.map((line) => {
      const trimmed = line.trim();
      if (trimmed === '') return line;
      if (trimmed.startsWith('#')) return this.rewriteTagLine(line, ctx);

      const relToHls = this.joinRel(ctx.playlistDirRel, trimmed);
      return trimmed.toLowerCase().endsWith('.m3u8')
        ? this.manifestUrl(ctx.lectureId, relToHls)
        : (signed.get(relToHls) as string);
    });

    return out.join('\n');
  }

  /** Rewrite URI="..." attributes inside #EXT-X-KEY / #EXT-X-MEDIA tags. */
  private rewriteTagLine(
    line: string,
    ctx: {
      lectureId: string;
      uid: string;
      hlsDir: string;
      playlistDirRel: string;
    },
  ): string {
    const uriMatch = line.match(/URI="([^"]*)"/i);
    if (!uriMatch) return line;
    const uri = uriMatch[1];

    if (/#EXT-X-KEY/i.test(line)) {
      // Bind a fresh, short-lived key token to this user + lecture + key file.
      const keyRel = this.joinRel(ctx.playlistDirRel, uri);
      const keyUrl = this.signKeyUrl(ctx.lectureId, ctx.uid, keyRel);
      return line.replace(/URI="[^"]*"/i, `URI="${keyUrl}"`);
    }

    // Rendition sub-playlist (e.g. alternate audio): route back through us.
    if (uri.toLowerCase().endsWith('.m3u8')) {
      const relToHls = this.joinRel(ctx.playlistDirRel, uri);
      const url = this.manifestUrl(ctx.lectureId, relToHls);
      return line.replace(/URI="[^"]*"/i, `URI="${url}"`);
    }

    return line;
  }

  private manifestUrl(lectureId: string, relToHls: string): string {
    return (
      `${this.apiBaseUrl}/lectures/${lectureId}/stream/manifest` +
      `?v=${encodeURIComponent(relToHls)}`
    );
  }

  // ---- small path helpers (POSIX-style storage paths) ----

  private masterFor(hlsDir: string): string {
    return `${hlsDir}/master.m3u8`;
  }

  private dirname(p: string): string {
    const i = p.lastIndexOf('/');
    return i === -1 ? p : p.slice(0, i);
  }

  private basename(p: string): string {
    const i = p.lastIndexOf('/');
    return i === -1 ? p : p.slice(i + 1);
  }

  /** Join a dir (relative to hlsDir) with a URI, normalizing and blocking escape. */
  private joinRel(dirRel: string, uri: string): string {
    const combined = dirRel ? `${dirRel}/${uri}` : uri;
    return this.safeRel(combined);
  }

  /** Normalize a relative path and reject traversal outside the HLS dir. */
  private safeRel(rel: string): string {
    const parts: string[] = [];
    for (const seg of rel.split('/')) {
      if (seg === '' || seg === '.') continue;
      if (seg === '..') {
        if (parts.length === 0) {
          throw new BadRequestException('Invalid playlist path');
        }
        parts.pop();
        continue;
      }
      parts.push(seg);
    }
    return parts.join('/');
  }
}
