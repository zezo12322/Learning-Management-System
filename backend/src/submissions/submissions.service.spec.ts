import {
  BadRequestException,
  ForbiddenException,
  NotFoundException,
} from '@nestjs/common';
import { SubmissionsService } from './submissions.service';

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

describe('SubmissionsService', () => {
  let access: { assertMissionAccess: jest.Mock };
  let completion: { markMissionEnrollmentCompleted: jest.Mock };

  beforeEach(() => {
    access = { assertMissionAccess: jest.fn().mockResolvedValue(undefined) };
    completion = {
      markMissionEnrollmentCompleted: jest.fn().mockResolvedValue(undefined),
    };
  });

  describe('submit', () => {
    it('blocks submission without an active mission enrollment', async () => {
      const dc = makeDc({ GetUserEnrollmentForMission: { enrollments: [] } });
      const svc = new SubmissionsService(
        dc as any,
        access as any,
        completion as any,
      );
      await expect(
        svc.submit('m1', { fileUrl: 'http://f' }, 'tok', 'u1'),
      ).rejects.toBeInstanceOf(ForbiddenException);
    });

    it('submits when actively enrolled', async () => {
      const dc = makeDc(
        {
          GetUserEnrollmentForMission: { enrollments: [{ status: 'ACTIVE' }] },
        },
        { SubmitMission: { missionSubmission_insert: { id: 's1' } } },
      );
      const svc = new SubmissionsService(
        dc as any,
        access as any,
        completion as any,
      );
      await svc.submit('m1', { fileUrl: 'http://f' }, 'tok', 'u1');
      expect(dc.executeMutation).toHaveBeenCalledWith(
        'SubmitMission',
        { missionId: 'm1', fileUrl: 'http://f', studentId: 'u1' },
        'tok',
      );
    });
  });

  describe('grade', () => {
    const submission = {
      GetSubmissionForGrading: {
        missionSubmission: {
          id: 's1',
          mission: { id: 'm1' },
          student: { id: 'stu1' },
        },
      },
    };
    const criteria = {
      AdminGetMission: {
        mission: {
          criteria: [{ id: 'cr1', criterionName: 'Quality', maxPoints: 10 }],
        },
      },
    };

    it('404s for an unknown submission', async () => {
      const dc = makeDc({
        GetSubmissionForGrading: { missionSubmission: null },
      });
      const svc = new SubmissionsService(
        dc as any,
        access as any,
        completion as any,
      );
      await expect(
        svc.grade('s1', {}, 'tok', 'u1', false),
      ).rejects.toBeInstanceOf(NotFoundException);
    });

    it('enforces mission ownership before grading', async () => {
      access.assertMissionAccess.mockRejectedValue(new ForbiddenException());
      const dc = makeDc(submission);
      const svc = new SubmissionsService(
        dc as any,
        access as any,
        completion as any,
      );
      await expect(
        svc.grade('s1', {}, 'tok', 'u1', false),
      ).rejects.toBeInstanceOf(ForbiddenException);
    });

    it('rejects a score above the criterion maxPoints', async () => {
      const dc = makeDc({ ...submission, ...criteria });
      const svc = new SubmissionsService(
        dc as any,
        access as any,
        completion as any,
      );
      await expect(
        svc.grade(
          's1',
          { scores: [{ criterionId: 'cr1', score: 999 }] },
          'tok',
          'u1',
          false,
        ),
      ).rejects.toBeInstanceOf(BadRequestException);
    });

    it('rejects a score for a criterion not belonging to the mission', async () => {
      const dc = makeDc({ ...submission, ...criteria });
      const svc = new SubmissionsService(
        dc as any,
        access as any,
        completion as any,
      );
      await expect(
        svc.grade(
          's1',
          { scores: [{ criterionId: 'OTHER', score: 5 }] },
          'tok',
          'u1',
          false,
        ),
      ).rejects.toBeInstanceOf(BadRequestException);
    });

    it('grades, records valid scores, and triggers student completion', async () => {
      const dc = makeDc({ ...submission, ...criteria });
      const svc = new SubmissionsService(
        dc as any,
        access as any,
        completion as any,
      );
      const res = await svc.grade(
        's1',
        { feedback: 'good', scores: [{ criterionId: 'cr1', score: 8 }] },
        'tok',
        'grader1',
        false,
      );
      expect(dc.executeMutation).toHaveBeenCalledWith(
        'AddCriterionScore',
        { submissionId: 's1', criterionId: 'cr1', score: 8 },
        'tok',
      );
      expect(dc.executeMutation).toHaveBeenCalledWith(
        'GradeSubmission',
        { submissionId: 's1', feedback: 'good', graderId: 'grader1' },
        'tok',
      );
      expect(completion.markMissionEnrollmentCompleted).toHaveBeenCalledWith(
        'm1',
        'stu1',
        'tok',
      );
      expect(res).toEqual({ success: true });
    });
  });
});
