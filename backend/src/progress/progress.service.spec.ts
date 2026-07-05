import { ProgressService } from './progress.service';

function makeDc(
  queryMap: Record<string, any>,
  mutationMap: Record<string, any> = {},
) {
  return {
    executeQuery: jest.fn((op: string) => Promise.resolve(queryMap[op])),
    executeMutation: jest.fn((op: string) =>
      Promise.resolve(mutationMap[op] ?? {}),
    ),
  };
}

describe('ProgressService.getCourseProgress', () => {
  it('aggregates per-section and overall completion percentages', async () => {
    const dc = makeDc({
      GetMyCourseProgress: {
        sections: [
          {
            id: 's1',
            title: 'A',
            progressLectures: [
              { userProgress: [{ completedAt: 'x' }] },
              { userProgress: [] },
            ],
          },
          {
            id: 's2',
            title: 'B',
            progressLectures: [{ userProgress: [{ completedAt: 'y' }] }],
          },
        ],
      },
    });
    const svc = new ProgressService(dc as any, {} as any);
    const res = await svc.getCourseProgress('c1', 'tok');

    expect(res.totalLectures).toBe(3);
    expect(res.completedLectures).toBe(2);
    expect(res.overallPercentage).toBe(67); // round(2/3*100)
    expect(res.sections[0]).toMatchObject({
      totalLectures: 2,
      completedLectures: 1,
      percentage: 50,
    });
    expect(res.sections[1]).toMatchObject({
      totalLectures: 1,
      completedLectures: 1,
      percentage: 100,
    });
  });

  it('handles an empty course without dividing by zero', async () => {
    const dc = makeDc({ GetMyCourseProgress: { sections: [] } });
    const svc = new ProgressService(dc as any, {} as any);
    const res = await svc.getCourseProgress('c1', 'tok');
    expect(res.overallPercentage).toBe(0);
    expect(res.totalLectures).toBe(0);
  });
});
