import { NotFoundException } from '@nestjs/common';
import { LecturesService } from './lectures.service';

const PLAYLIST = [
  '#EXTM3U',
  '#EXTINF:6.000000,',
  'seg_000.ts',
  '#EXTINF:6.000000,',
  'seg_001.ts',
  '#EXTINF:5.023000,',
  'seg_002.ts',
  '#EXT-X-ENDLIST',
].join('\n');

function makeService(lectures: any[], playlist: string | Error = PLAYLIST) {
  const executeMutationAsAdmin = jest.fn(() => Promise.resolve({}));
  const dc = {
    executeQuery: jest.fn(() =>
      Promise.resolve({
        course: { adminSections: [{ adminLectures: lectures }] },
      }),
    ),
    executeMutationAsAdmin,
  };
  const firebase = {
    downloadFile: jest.fn(() =>
      playlist instanceof Error
        ? Promise.reject(playlist)
        : Promise.resolve(Buffer.from(playlist, 'utf8')),
    ),
  };
  const svc = new LecturesService(
    dc as any,
    {} as any,
    {} as any,
    firebase as any,
  );
  return { svc, executeMutationAsAdmin, firebase };
}

const video = (over: Partial<any> = {}) => ({
  id: 'lec-v',
  title: 'A packaged video',
  type: 'VIDEO',
  videoUrl: 'courses/c/lectures/lec-v/hls/master.m3u8',
  content: null,
  duration: 1020,
  ...over,
});

describe('LecturesService.backfillDurations', () => {
  it('reports without writing when apply is not set', async () => {
    const { svc, executeMutationAsAdmin } = makeService([video()]);

    const report = await svc.backfillDurations('c1', 'tok');

    expect(report.applied).toBe(false);
    expect(executeMutationAsAdmin).not.toHaveBeenCalled();
    expect(report.changed).toEqual([
      expect.objectContaining({
        id: 'lec-v',
        source: 'hls',
        storedSeconds: 1020,
        derivedSeconds: 17,
      }),
    ]);
  });

  it('writes only the duration, and only when apply is set', async () => {
    const { svc, executeMutationAsAdmin } = makeService([video()]);

    const report = await svc.backfillDurations('c1', 'tok', true);

    expect(report.applied).toBe(true);
    expect(executeMutationAsAdmin).toHaveBeenCalledTimes(1);
    // Partial variables: a backfill must not restate the title or the type.
    expect(executeMutationAsAdmin).toHaveBeenCalledWith('AdminUpdateLecture', {
      lectureId: 'lec-v',
      duration: 17,
    });
  });

  it('leaves a lecture alone when the stored length is already right', async () => {
    const { svc, executeMutationAsAdmin } = makeService([
      video({ duration: 17 }),
    ]);

    const report = await svc.backfillDurations('c1', 'tok', true);

    expect(report.unchanged).toBe(1);
    expect(report.changed).toEqual([]);
    expect(executeMutationAsAdmin).not.toHaveBeenCalled();
  });

  it('skips — never guesses — when the playlist cannot be read', async () => {
    const { svc, executeMutationAsAdmin } = makeService(
      [video()],
      new Error('storage 404'),
    );

    const report = await svc.backfillDurations('c1', 'tok', true);

    expect(executeMutationAsAdmin).not.toHaveBeenCalled();
    expect(report.changed).toEqual([]);
    expect(report.skipped).toEqual([
      expect.objectContaining({ id: 'lec-v', reason: expect.any(String) }),
    ]);
  });

  it('skips a video that has not been packaged, rather than timing it as zero', async () => {
    const { svc, executeMutationAsAdmin } = makeService([
      video({ videoUrl: null, duration: 60 }),
    ]);

    const report = await svc.backfillDurations('c1', 'tok', true);

    expect(executeMutationAsAdmin).not.toHaveBeenCalled();
    expect(report.skipped[0].reason).toMatch(/not been packaged/);
  });

  it('times a reading from its body text', async () => {
    const { svc, executeMutationAsAdmin } = makeService([
      {
        id: 'lec-r',
        title: 'A reading',
        type: 'READING',
        videoUrl: null,
        content: Array(460).fill('word').join(' '),
        duration: 60,
      },
    ]);

    const report = await svc.backfillDurations('c1', 'tok', true);

    // 460 words at 230 wpm = 2 minutes.
    expect(report.changed[0]).toEqual(
      expect.objectContaining({ source: 'reading-time', derivedSeconds: 120 }),
    );
    expect(executeMutationAsAdmin).toHaveBeenCalledWith('AdminUpdateLecture', {
      lectureId: 'lec-r',
      duration: 120,
    });
  });

  it('skips an empty reading instead of writing a zero it could never complete', async () => {
    const { svc, executeMutationAsAdmin } = makeService([
      {
        id: 'lec-r',
        title: 'An empty reading',
        type: 'READING',
        videoUrl: null,
        content: '   ',
        duration: 300,
      },
    ]);

    const report = await svc.backfillDurations('c1', 'tok', true);

    expect(executeMutationAsAdmin).not.toHaveBeenCalled();
    expect(report.skipped[0].reason).toMatch(/no body text/);
  });

  it('skips a quiz, which has no length to measure', async () => {
    const { svc, executeMutationAsAdmin } = makeService([
      {
        id: 'lec-q',
        title: 'Check',
        type: 'QUIZ',
        videoUrl: null,
        duration: 0,
      },
    ]);

    const report = await svc.backfillDurations('c1', 'tok', true);

    expect(executeMutationAsAdmin).not.toHaveBeenCalled();
    expect(report.skipped[0].reason).toMatch(/QUIZ/);
  });

  it('throws when the course does not exist', async () => {
    const dc = {
      executeQuery: jest.fn(() => Promise.resolve({})),
      executeMutationAsAdmin: jest.fn(),
    };
    const svc = new LecturesService(dc as any, {} as any, {} as any, {} as any);

    await expect(svc.backfillDurations('nope', 'tok')).rejects.toBeInstanceOf(
      NotFoundException,
    );
  });
});
