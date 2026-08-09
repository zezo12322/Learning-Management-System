import { ProgressProcessor } from './progress.processor';

describe('ProgressProcessor', () => {
  let dc: { executeQueryAsAdmin: jest.Mock; executeMutationAsAdmin: jest.Mock };
  let completion: { checkCourseCompletionAsAdmin: jest.Mock };
  let enrollment: { checkEnrollmentAsAdmin: jest.Mock };
  let proc: ProgressProcessor;

  const lecture = (duration: number | null, courseId = 'c1') => ({
    courseLecture:
      duration === null
        ? { duration: null, section: { course: { id: courseId } } }
        : { duration, section: { course: { id: courseId } } },
  });

  const job = (data: any) =>
    ({ id: 'j1', data, updateProgress: jest.fn() }) as any;

  beforeEach(() => {
    dc = {
      executeQueryAsAdmin: jest.fn(),
      executeMutationAsAdmin: jest.fn().mockResolvedValue({}),
    };
    completion = {
      checkCourseCompletionAsAdmin: jest.fn().mockResolvedValue(undefined),
    };
    // The processor verifies enrollment before recording progress (free-preview
    // lectures are exempt). Default to enrolled; the guard itself is covered below.
    enrollment = {
      checkEnrollmentAsAdmin: jest.fn().mockResolvedValue(true),
    };
    proc = new ProgressProcessor(
      dc as any,
      completion as any,
      enrollment as any,
    );
  });

  it('marks complete and cascades when watched ≥ 90% of duration', async () => {
    dc.executeQueryAsAdmin.mockResolvedValue(lecture(100));
    await proc.process(
      job({ userId: 'u1', lectureId: 'L1', lastWatchedSecond: 90 }),
    );

    const [op, vars] = dc.executeMutationAsAdmin.mock.calls[0];
    expect(op).toBe('AdminUpsertLectureProgress');
    expect(vars.completedAt).not.toBeNull();
    expect(vars).toMatchObject({
      userId: 'u1',
      lectureId: 'L1',
      lastWatchedSecond: 90,
    });
    expect(completion.checkCourseCompletionAsAdmin).toHaveBeenCalledWith(
      'c1',
      'u1',
    );
  });

  it('does NOT mark complete below the 90% threshold', async () => {
    dc.executeQueryAsAdmin.mockResolvedValue(lecture(100));
    await proc.process(
      job({ userId: 'u1', lectureId: 'L1', lastWatchedSecond: 89 }),
    );

    expect(dc.executeMutationAsAdmin.mock.calls[0][1].completedAt).toBeNull();
    expect(completion.checkCourseCompletionAsAdmin).not.toHaveBeenCalled();
  });

  // Position alone says nothing about how the playhead got there. These three
  // pin the rule that closed the hole where dragging the scrubber to the end,
  // or playing at 8x, certified a lecture nobody watched.
  it('does NOT complete when the position clears the bar but the watch time does not', async () => {
    dc.executeQueryAsAdmin.mockResolvedValue(lecture(100));
    await proc.process(
      // Scrubbed to the end after 5 seconds of actual playback.
      job({
        userId: 'u1',
        lectureId: 'L1',
        lastWatchedSecond: 100,
        watchedSeconds: 5,
      }),
    );

    expect(dc.executeMutationAsAdmin.mock.calls[0][1].completedAt).toBeNull();
    expect(completion.checkCourseCompletionAsAdmin).not.toHaveBeenCalled();
  });

  it('completes when position and watch time both clear the bar', async () => {
    dc.executeQueryAsAdmin.mockResolvedValue(lecture(100));
    await proc.process(
      job({
        userId: 'u1',
        lectureId: 'L1',
        lastWatchedSecond: 95,
        watchedSeconds: 92,
      }),
    );

    expect(
      dc.executeMutationAsAdmin.mock.calls[0][1].completedAt,
    ).not.toBeNull();
    expect(completion.checkCourseCompletionAsAdmin).toHaveBeenCalled();
  });

  it('falls back to the position-only rule when watchedSeconds is absent', async () => {
    // Clients that predate the field — an installed mobile build — must keep
    // completing lectures rather than silently stalling at 99%.
    dc.executeQueryAsAdmin.mockResolvedValue(lecture(100));
    await proc.process(
      job({ userId: 'u1', lectureId: 'L1', lastWatchedSecond: 90 }),
    );

    expect(
      dc.executeMutationAsAdmin.mock.calls[0][1].completedAt,
    ).not.toBeNull();
  });

  it('banks watch time monotonically and persists it', async () => {
    // A device that counts from zero — the mobile player always does — must not
    // erase time already banked from another session.
    dc.executeQueryAsAdmin.mockResolvedValue({
      ...lecture(100),
      lectureProgresses: [{ watchedSeconds: 80 }],
    });
    await proc.process(
      job({
        userId: 'u1',
        lectureId: 'L1',
        lastWatchedSecond: 95,
        watchedSeconds: 12,
      }),
    );

    const vars = dc.executeMutationAsAdmin.mock.calls[0][1];
    expect(vars.watchedSeconds).toBe(80);
    // 80 is still short of the 90 bar, so this does not complete either.
    expect(vars.completedAt).toBeNull();
  });

  it('completes once banked watch time crosses the bar', async () => {
    dc.executeQueryAsAdmin.mockResolvedValue({
      ...lecture(100),
      lectureProgresses: [{ watchedSeconds: 85 }],
    });
    await proc.process(
      job({
        userId: 'u1',
        lectureId: 'L1',
        lastWatchedSecond: 95,
        watchedSeconds: 91,
      }),
    );

    const vars = dc.executeMutationAsAdmin.mock.calls[0][1];
    expect(vars.watchedSeconds).toBe(91);
    expect(vars.completedAt).not.toBeNull();
  });

  it('clamps the stored position to the lecture duration', async () => {
    dc.executeQueryAsAdmin.mockResolvedValue(lecture(100));
    await proc.process(
      job({ userId: 'u1', lectureId: 'L1', lastWatchedSecond: 500 }),
    );

    const vars = dc.executeMutationAsAdmin.mock.calls[0][1];
    expect(vars.lastWatchedSecond).toBe(100);
    expect(vars.completedAt).not.toBeNull();
  });

  it('never auto-completes when duration is unknown (0/null)', async () => {
    dc.executeQueryAsAdmin.mockResolvedValue(lecture(null));
    await proc.process(
      job({ userId: 'u1', lectureId: 'L1', lastWatchedSecond: 9999 }),
    );

    const vars = dc.executeMutationAsAdmin.mock.calls[0][1];
    expect(vars.completedAt).toBeNull();
    expect(vars.lastWatchedSecond).toBe(9999); // not clamped when no duration
    expect(completion.checkCourseCompletionAsAdmin).not.toHaveBeenCalled();
  });

  it('drops the job (no write) when the user is not enrolled', async () => {
    enrollment.checkEnrollmentAsAdmin.mockResolvedValue(false);
    dc.executeQueryAsAdmin.mockResolvedValue(lecture(100));
    await proc.process(
      job({ userId: 'stranger', lectureId: 'L1', lastWatchedSecond: 90 }),
    );

    expect(enrollment.checkEnrollmentAsAdmin).toHaveBeenCalledWith(
      'c1',
      'stranger',
    );
    expect(dc.executeMutationAsAdmin).not.toHaveBeenCalled();
    expect(completion.checkCourseCompletionAsAdmin).not.toHaveBeenCalled();
  });

  it('skips the enrollment check for a free-preview lecture', async () => {
    enrollment.checkEnrollmentAsAdmin.mockResolvedValue(false);
    dc.executeQueryAsAdmin.mockResolvedValue({
      courseLecture: {
        duration: 100,
        isFreePreview: true,
        section: { course: { id: 'c1' } },
      },
    });
    await proc.process(
      job({ userId: 'visitor', lectureId: 'L1', lastWatchedSecond: 50 }),
    );

    expect(enrollment.checkEnrollmentAsAdmin).not.toHaveBeenCalled();
    expect(dc.executeMutationAsAdmin).toHaveBeenCalled();
  });

  it('drops the job (no write) when the lecture no longer exists', async () => {
    dc.executeQueryAsAdmin.mockResolvedValue({ courseLecture: null });
    await proc.process(
      job({ userId: 'u1', lectureId: 'gone', lastWatchedSecond: 10 }),
    );

    expect(dc.executeMutationAsAdmin).not.toHaveBeenCalled();
  });
});
