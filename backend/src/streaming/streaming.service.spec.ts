import { BadRequestException, ForbiddenException } from '@nestjs/common';
import { StreamingService } from './streaming.service';

const HLS_DIR = 'courses/c1/lectures/L1/hls';

describe('StreamingService', () => {
  let dc: { executeQuery: jest.Mock; executeMutation: jest.Mock };
  let firebase: {
    downloadFile: jest.Mock;
    generateSignedReadUrl: jest.Mock;
    fileExists: jest.Mock;
  };
  let access: { assertCourseAccess: jest.Mock };
  let keyTokens: { sign: jest.Mock; verify: jest.Mock };
  let watermark: { issue: jest.Mock };
  let svc: StreamingService;

  const config = {
    get: (k: string, d?: any) => (k === 'STREAM_KEY_SECRET' ? 'secret' : d),
  } as any;

  /** Make GetLectureContent return a given lecture; default = free preview. */
  const lecture = (over: Record<string, any> = {}) => ({
    courseLecture: {
      id: 'L1',
      videoUrl: `${HLS_DIR}/master.m3u8`,
      isFreePreview: true,
      section: { course: { id: 'c1' } },
      ...over,
    },
  });

  beforeEach(() => {
    dc = { executeQuery: jest.fn(), executeMutation: jest.fn() };
    firebase = {
      downloadFile: jest.fn(),
      generateSignedReadUrl: jest.fn(async (p: string) => `signed(${p})`),
      fileExists: jest.fn(),
    };
    access = { assertCourseAccess: jest.fn() };
    keyTokens = { sign: jest.fn(() => 'KT'), verify: jest.fn() };
    watermark = { issue: jest.fn() };
    svc = new StreamingService(
      dc as any,
      firebase as any,
      access as any,
      keyTokens as any,
      watermark as any,
      config,
    );
  });

  describe('getManifest', () => {
    it('rewrites segment URIs to signed URLs and the key URI to our endpoint', async () => {
      dc.executeQuery.mockResolvedValue(lecture());
      firebase.downloadFile.mockResolvedValue(
        Buffer.from(
          [
            '#EXTM3U',
            '#EXT-X-KEY:METHOD=AES-128,URI="enc.key",IV=0x00',
            '#EXTINF:6.0,',
            'seg_000.ts',
            '#EXTINF:6.0,',
            'seg_001.ts',
            '#EXT-X-ENDLIST',
          ].join('\n'),
        ),
      );

      const out = await svc.getManifest({
        lectureId: 'L1',
        uid: 'u1',
        token: 't',
        isAdmin: false,
        origin: 'https://api.example.com',
      });

      expect(out).toContain(
        'URI="https://api.example.com/lectures/L1/stream/key?kt=KT"',
      );
      expect(out).toContain(`signed(${HLS_DIR}/seg_000.ts)`);
      expect(out).toContain(`signed(${HLS_DIR}/seg_001.ts)`);
      // The raw segment names must not leak through.
      expect(out).not.toMatch(/^seg_000\.ts$/m);
      expect(keyTokens.sign).toHaveBeenCalledWith(
        expect.objectContaining({
          uid: 'u1',
          lectureId: 'L1',
          keyRel: 'enc.key',
        }),
      );
    });

    it('routes ABR sub-playlist URIs back through the manifest endpoint', async () => {
      dc.executeQuery.mockResolvedValue(lecture());
      firebase.downloadFile.mockResolvedValue(
        Buffer.from(
          [
            '#EXTM3U',
            '#EXT-X-STREAM-INF:BANDWIDTH=800000',
            '720p/index.m3u8',
          ].join('\n'),
        ),
      );

      const out = await svc.getManifest({
        lectureId: 'L1',
        uid: 'u1',
        token: 't',
        isAdmin: false,
        origin: 'https://api.example.com',
      });

      expect(out).toContain(
        'https://api.example.com/lectures/L1/stream/manifest?v=720p%2Findex.m3u8',
      );
    });

    it('prefers a configured API_PUBLIC_URL over the request origin', async () => {
      const pinned = new StreamingService(
        dc as any,
        firebase as any,
        access as any,
        keyTokens as any,
        watermark as any,
        {
          get: (k: string, d?: any) =>
            k === 'API_PUBLIC_URL' ? 'https://cdn.example.com/' : d,
        } as any,
      );
      dc.executeQuery.mockResolvedValue(lecture());
      firebase.downloadFile.mockResolvedValue(
        Buffer.from(
          ['#EXTM3U', '#EXT-X-KEY:METHOD=AES-128,URI="enc.key",IV=0x00'].join(
            '\n',
          ),
        ),
      );

      const out = await pinned.getManifest({
        lectureId: 'L1',
        uid: 'u1',
        token: 't',
        isAdmin: false,
        origin: 'https://ignored.example.com',
      });

      // trailing slash trimmed, origin ignored
      expect(out).toContain(
        'URI="https://cdn.example.com/lectures/L1/stream/key?kt=KT"',
      );
    });

    it('resolves segments relative to the variant playlist dir', async () => {
      dc.executeQuery.mockResolvedValue(lecture());
      firebase.downloadFile.mockResolvedValue(
        Buffer.from(['#EXTM3U', '#EXTINF:6.0,', 'seg_000.ts'].join('\n')),
      );

      await svc.getManifest({
        lectureId: 'L1',
        uid: 'u1',
        token: 't',
        isAdmin: false,
        variant: '720p/index.m3u8',
      });

      // Loads the variant playlist, signs its segment under the 720p subdir.
      expect(firebase.downloadFile).toHaveBeenCalledWith(
        `${HLS_DIR}/720p/index.m3u8`,
      );
      // 60 = the hardened default TTL in minutes (STREAM_URL_TTL_MINUTES); the
      // security hardening lowered it from 360, and this expectation was stale.
      expect(firebase.generateSignedReadUrl).toHaveBeenCalledWith(
        `${HLS_DIR}/720p/seg_000.ts`,
        60,
      );
    });

    it('rejects a path-traversal variant', async () => {
      dc.executeQuery.mockResolvedValue(lecture());
      await expect(
        svc.getManifest({
          lectureId: 'L1',
          uid: 'u1',
          token: 't',
          isAdmin: false,
          variant: '../../secret.m3u8',
        }),
      ).rejects.toBeInstanceOf(BadRequestException);
    });

    it('denies a non-preview lecture to a non-enrolled user', async () => {
      dc.executeQuery.mockImplementation((op: string) => {
        if (op === 'GetLectureContent') {
          return Promise.resolve(lecture({ isFreePreview: false }));
        }
        return Promise.resolve({ enrollments: [] }); // GetUserEnrollmentForCourse
      });
      access.assertCourseAccess.mockRejectedValue(new ForbiddenException());

      await expect(
        svc.getManifest({
          lectureId: 'L1',
          uid: 'u1',
          token: 't',
          isAdmin: false,
        }),
      ).rejects.toBeInstanceOf(ForbiddenException);
    });

    it('allows a non-preview lecture to an actively-enrolled user', async () => {
      dc.executeQuery.mockImplementation((op: string) => {
        if (op === 'GetLectureContent') {
          return Promise.resolve(lecture({ isFreePreview: false }));
        }
        return Promise.resolve({ enrollments: [{ status: 'ACTIVE' }] });
      });
      access.assertCourseAccess.mockRejectedValue(new ForbiddenException());
      firebase.downloadFile.mockResolvedValue(Buffer.from('#EXTM3U'));

      await expect(
        svc.getManifest({
          lectureId: 'L1',
          uid: 'u1',
          token: 't',
          isAdmin: false,
        }),
      ).resolves.toContain('#EXTM3U');
    });
  });

  describe('getKey', () => {
    it('rejects a key token minted for a different user', async () => {
      keyTokens.verify.mockReturnValue({
        uid: 'attacker',
        lectureId: 'L1',
        keyRel: 'enc.key',
      });
      await expect(
        svc.getKey('L1', 'u1', 't', false, 'KT'),
      ).rejects.toBeInstanceOf(ForbiddenException);
    });

    it('returns the raw key bytes for a valid, matching token', async () => {
      keyTokens.verify.mockReturnValue({
        uid: 'u1',
        lectureId: 'L1',
        keyRel: 'enc.key',
      });
      dc.executeQuery.mockResolvedValue(lecture());
      const keyBytes = Buffer.alloc(16, 7);
      firebase.downloadFile.mockResolvedValue(keyBytes);

      const out = await svc.getKey('L1', 'u1', 't', false, 'KT');
      expect(firebase.downloadFile).toHaveBeenCalledWith(`${HLS_DIR}/enc.key`);
      expect(out).toEqual(keyBytes);
    });
  });
});
