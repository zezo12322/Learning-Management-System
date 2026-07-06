import { CompletionService } from './completion.service';

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

const lecturesCompleted = (count: number, completed: number) => ({
  completionLectures: Array.from({ length: count }, (_, i) => ({
    id: `L${i}`,
    completionProgress: i < completed ? [{ completedAt: '2026-01-01' }] : [],
  })),
});

describe('CompletionService', () => {
  describe('checkCourseCompletion', () => {
    it('marks the enrollment COMPLETED when every lecture is done', async () => {
      const dc = makeDc({
        GetCourseCompletionStatus: { sections: [lecturesCompleted(2, 2)] },
        GetUserEnrollmentForCourse: {
          enrollments: [{ id: 'e1', status: 'ACTIVE' }],
        },
      });
      const svc = new CompletionService(dc as any);
      await svc.checkCourseCompletion('c1', 'tok');
      expect(dc.executeMutation).toHaveBeenCalledWith(
        'UpdateEnrollmentStatus',
        expect.objectContaining({ enrollmentId: 'e1', status: 'COMPLETED' }),
        'tok',
      );
    });

    it('does nothing when lectures are only partially completed', async () => {
      const dc = makeDc({
        GetCourseCompletionStatus: { sections: [lecturesCompleted(3, 1)] },
      });
      const svc = new CompletionService(dc as any);
      await svc.checkCourseCompletion('c1', 'tok');
      expect(dc.executeMutation).not.toHaveBeenCalled();
    });

    it('does nothing for a course with zero lectures', async () => {
      const dc = makeDc({
        GetCourseCompletionStatus: { sections: [lecturesCompleted(0, 0)] },
      });
      const svc = new CompletionService(dc as any);
      await svc.checkCourseCompletion('c1', 'tok');
      expect(dc.executeMutation).not.toHaveBeenCalled();
    });
  });

  describe('markMissionEnrollmentCompleted', () => {
    it("completes the student's mission enrollment (looked up by student uid)", async () => {
      const dc = makeDc({
        GetEnrollmentForUserMission: {
          enrollments: [{ id: 'e9', status: 'ACTIVE' }],
        },
      });
      const svc = new CompletionService(dc as any);
      await svc.markMissionEnrollmentCompleted('m1', 'stu1', 'tok');
      expect(dc.executeQuery).toHaveBeenCalledWith(
        'GetEnrollmentForUserMission',
        { userId: 'stu1', missionId: 'm1' },
        'tok',
      );
      expect(dc.executeMutation).toHaveBeenCalledWith(
        'UpdateEnrollmentStatus',
        expect.objectContaining({ enrollmentId: 'e9', status: 'COMPLETED' }),
        'tok',
      );
    });

    it('is a no-op when already completed', async () => {
      const dc = makeDc({
        GetEnrollmentForUserMission: {
          enrollments: [{ id: 'e9', status: 'COMPLETED' }],
        },
      });
      const svc = new CompletionService(dc as any);
      await svc.markMissionEnrollmentCompleted('m1', 'stu1', 'tok');
      expect(dc.executeMutation).not.toHaveBeenCalled();
    });
  });
});
