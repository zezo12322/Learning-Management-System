import { ProgressProcessor } from './progress.processor';

describe('ProgressProcessor', () => {
  let dc: { executeQueryAsAdmin: jest.Mock; executeMutationAsAdmin: jest.Mock };
  let completion: { checkCourseCompletionAsAdmin: jest.Mock };
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
    proc = new ProgressProcessor(dc as any, completion as any);
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

  it('drops the job (no write) when the lecture no longer exists', async () => {
    dc.executeQueryAsAdmin.mockResolvedValue({ courseLecture: null });
    await proc.process(
      job({ userId: 'u1', lectureId: 'gone', lastWatchedSecond: 10 }),
    );

    expect(dc.executeMutationAsAdmin).not.toHaveBeenCalled();
  });
});
