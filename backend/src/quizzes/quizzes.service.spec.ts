import {
  BadRequestException,
  ForbiddenException,
  NotFoundException,
} from '@nestjs/common';
import { QuizzesService } from './quizzes.service';

/** Builds a DataConnectService mock whose executeQuery dispatches by op name. */
function makeDc(
  queryMap: Record<string, any>,
  mutationMap: Record<string, any> = {},
) {
  return {
    executeQuery: jest.fn((op: string) => Promise.resolve(queryMap[op])),
    executeMutation: jest.fn((op: string) =>
      Promise.resolve(mutationMap[op] ?? {}),
    ),
    executeQueryAsAdmin: jest.fn((op: string) => Promise.resolve(queryMap[op])),
    executeMutationAsAdmin: jest.fn((op: string) =>
      Promise.resolve(mutationMap[op] ?? {}),
    ),
  };
}

describe('QuizzesService', () => {
  let completion: { onQuizPassed: jest.Mock };
  let ordering: any;
  let access: { assertCourseAccess: jest.Mock };

  beforeEach(() => {
    completion = { onQuizPassed: jest.fn().mockResolvedValue(undefined) };
    ordering = { nextOrder: jest.fn(), applyOrder: jest.fn() };
    access = { assertCourseAccess: jest.fn() };
  });

  describe('autoGrade', () => {
    it('computes a weighted percentage over all non-deleted questions', async () => {
      const dc = makeDc(
        {
          GetAttemptAnswersWithCorrect: {
            quizAttemptAnswers: [
              {
                question: { id: 'q1', points: 2 },
                selectedOption: { isCorrect: true },
              },
              {
                question: { id: 'q2', points: 2 },
                selectedOption: { isCorrect: false },
              },
            ],
          },
          GetQuizAttemptById: {
            quizAttempt: { quiz: { id: 'quiz1', passingScore: 50 } },
          },
          GetQuizQuestionPoints: {
            quizQuestions: [
              { id: 'q1', points: 2 },
              { id: 'q2', points: 2 },
            ],
          },
          GetQuizSettings: {
            courseQuiz: {
              lecture: { id: 'L1', section: { course: { id: 'c1' } } },
            },
          },
        },
        { FinishQuizAttemptIfOpen: { quizAttempt_updateMany: 1 } },
      );
      const svc = new QuizzesService(
        dc as any,
        completion as any,
        ordering,
        access as any,
      );

      const res = await svc.autoGrade('a1', { token: 'tok', uid: 'u1' });
      expect(res.score).toBe(50); // 2 earned / 4 total
      expect(res.passed).toBe(true);
      expect(completion.onQuizPassed).toHaveBeenCalledWith(
        'L1',
        'c1',
        'tok',
        'u1',
      );
    });

    it('M3: ignores answers to soft-deleted questions so score cannot exceed 100%', async () => {
      const dc = makeDc(
        {
          GetAttemptAnswersWithCorrect: {
            quizAttemptAnswers: [
              {
                question: { id: 'q1', points: 1 },
                selectedOption: { isCorrect: true },
              },
              // q3 was soft-deleted after answering — must NOT count toward the score
              {
                question: { id: 'q3', points: 1 },
                selectedOption: { isCorrect: true },
              },
            ],
          },
          GetQuizAttemptById: {
            quizAttempt: { quiz: { id: 'quiz1', passingScore: 50 } },
          },
          GetQuizQuestionPoints: {
            quizQuestions: [
              { id: 'q1', points: 1 },
              { id: 'q2', points: 1 },
            ],
          },
          GetQuizSettings: {
            courseQuiz: {
              lecture: { id: 'L1', section: { course: { id: 'c1' } } },
            },
          },
        },
        { FinishQuizAttemptIfOpen: { quizAttempt_updateMany: 1 } },
      );
      const svc = new QuizzesService(
        dc as any,
        completion as any,
        ordering,
        access as any,
      );

      const res = await svc.autoGrade('a1', { token: 'tok' });
      expect(res.score).toBe(50); // only q1 counts: 1/2
      expect(res.correctCount).toBe(1);
    });

    it('skips the completion trigger when the attempt was already finalized (rowsUpdated=0)', async () => {
      const dc = makeDc(
        {
          GetAttemptAnswersWithCorrect: { quizAttemptAnswers: [] },
          GetQuizAttemptById: {
            quizAttempt: { quiz: { id: 'quiz1', passingScore: 0 } },
          },
          GetQuizQuestionPoints: { quizQuestions: [{ id: 'q1', points: 1 }] },
        },
        { FinishQuizAttemptIfOpen: { quizAttempt_updateMany: 0 } },
      );
      const svc = new QuizzesService(
        dc as any,
        completion as any,
        ordering,
        access as any,
      );

      const res = await svc.autoGrade('a1', { token: 'tok' });
      expect((res as any).alreadyFinalized).toBe(true);
      expect(completion.onQuizPassed).not.toHaveBeenCalled();
    });
  });

  describe('startAttempt', () => {
    const settings = {
      GetQuizSettings: {
        courseQuiz: {
          maxAttempts: 2,
          lecture: { section: { course: { id: 'c1' } } },
        },
      },
    };

    it('rejects when the student has no active enrollment', async () => {
      const dc = makeDc({
        ...settings,
        GetUserEnrollmentForCourse: { enrollments: [{ status: 'DROPPED' }] },
      });
      const svc = new QuizzesService(
        dc as any,
        completion as any,
        ordering,
        access as any,
      );
      await expect(
        svc.startAttempt('quiz1', 'tok', 'u1'),
      ).rejects.toBeInstanceOf(ForbiddenException);
    });

    it('rejects a second in-progress attempt', async () => {
      const dc = makeDc({
        ...settings,
        GetUserEnrollmentForCourse: { enrollments: [{ status: 'ACTIVE' }] },
        GetUserQuizAttempts: {
          quizAttempts: [{ id: 'a1', completedAt: null }],
        },
      });
      const svc = new QuizzesService(
        dc as any,
        completion as any,
        ordering,
        access as any,
      );
      await expect(
        svc.startAttempt('quiz1', 'tok', 'u1'),
      ).rejects.toBeInstanceOf(BadRequestException);
    });

    it('enforces the max-attempts limit', async () => {
      const dc = makeDc({
        ...settings,
        GetUserEnrollmentForCourse: { enrollments: [{ status: 'ACTIVE' }] },
        GetUserQuizAttempts: {
          quizAttempts: [
            { id: 'a1', completedAt: 'x' },
            { id: 'a2', completedAt: 'y' },
          ],
        },
      });
      const svc = new QuizzesService(
        dc as any,
        completion as any,
        ordering,
        access as any,
      );
      await expect(
        svc.startAttempt('quiz1', 'tok', 'u1'),
      ).rejects.toBeInstanceOf(ForbiddenException);
    });

    it('starts an attempt for an enrolled student under the limit', async () => {
      const dc = makeDc(
        {
          ...settings,
          GetUserEnrollmentForCourse: { enrollments: [{ status: 'ACTIVE' }] },
          GetUserQuizAttempts: {
            quizAttempts: [{ id: 'a1', completedAt: 'x' }],
          },
        },
        { StartQuizAttempt: { quizAttempt_insert: { id: 'new' } } },
      );
      const svc = new QuizzesService(
        dc as any,
        completion as any,
        ordering,
        access as any,
      );
      const res = await svc.startAttempt('quiz1', 'tok', 'u1');
      expect(res).toEqual({ quizAttempt_insert: { id: 'new' } });
    });
  });

  describe('getQuizForTaking (M4)', () => {
    const base = {
      GetQuizSettings: {
        courseQuiz: {
          lecture: { id: 'L1', section: { course: { id: 'c1' } } },
        },
      },
      GetQuizQuestions: { courseQuizs: [{ id: 'quiz1', takeQuestions: [] }] },
    };

    it('allows a course owner to preview', async () => {
      const dc = makeDc(base);
      access.assertCourseAccess.mockResolvedValue(undefined); // owner
      const svc = new QuizzesService(
        dc as any,
        completion as any,
        ordering,
        access as any,
      );
      const res = await svc.getQuizForTaking('quiz1', 'tok', 'u1', false);
      expect(res).toEqual({ id: 'quiz1', takeQuestions: [] });
    });

    it('allows an enrolled student (non-owner)', async () => {
      const dc = makeDc({
        ...base,
        GetUserEnrollmentForCourse: { enrollments: [{ status: 'ACTIVE' }] },
      });
      access.assertCourseAccess.mockRejectedValue(new ForbiddenException());
      const svc = new QuizzesService(
        dc as any,
        completion as any,
        ordering,
        access as any,
      );
      const res = await svc.getQuizForTaking('quiz1', 'tok', 'u1', false);
      expect(res).toEqual({ id: 'quiz1', takeQuestions: [] });
    });

    it('blocks a non-owner, non-enrolled user', async () => {
      const dc = makeDc({
        ...base,
        GetUserEnrollmentForCourse: { enrollments: [] },
      });
      access.assertCourseAccess.mockRejectedValue(new ForbiddenException());
      const svc = new QuizzesService(
        dc as any,
        completion as any,
        ordering,
        access as any,
      );
      await expect(
        svc.getQuizForTaking('quiz1', 'tok', 'u1', false),
      ).rejects.toBeInstanceOf(ForbiddenException);
    });

    it('404s for an unknown quiz', async () => {
      const dc = makeDc({ GetQuizSettings: { courseQuiz: null } });
      const svc = new QuizzesService(
        dc as any,
        completion as any,
        ordering,
        access as any,
      );
      await expect(
        svc.getQuizForTaking('nope', 'tok', 'u1', false),
      ).rejects.toBeInstanceOf(NotFoundException);
    });
  });

  describe('getQuizForLecture', () => {
    const base = {
      GetLectureContent: {
        courseLecture: { id: 'L1', section: { course: { id: 'c1' } } },
      },
      GetQuizQuestions: { courseQuizs: [{ id: 'quiz1', takeQuestions: [] }] },
    };

    it('allows a course owner to preview', async () => {
      const dc = makeDc(base);
      access.assertCourseAccess.mockResolvedValue(undefined); // owner
      const svc = new QuizzesService(
        dc as any,
        completion as any,
        ordering,
        access as any,
      );
      const res = await svc.getQuizForLecture('L1', 'tok', 'u1', false);
      expect(res).toEqual({ id: 'quiz1', takeQuestions: [] });
    });

    it('allows an enrolled student (non-owner)', async () => {
      const dc = makeDc({
        ...base,
        GetUserEnrollmentForCourse: { enrollments: [{ status: 'ACTIVE' }] },
      });
      access.assertCourseAccess.mockRejectedValue(new ForbiddenException());
      const svc = new QuizzesService(
        dc as any,
        completion as any,
        ordering,
        access as any,
      );
      const res = await svc.getQuizForLecture('L1', 'tok', 'u1', false);
      expect(res).toEqual({ id: 'quiz1', takeQuestions: [] });
    });

    it('blocks a non-owner, non-enrolled user', async () => {
      const dc = makeDc({
        ...base,
        GetUserEnrollmentForCourse: { enrollments: [] },
      });
      access.assertCourseAccess.mockRejectedValue(new ForbiddenException());
      const svc = new QuizzesService(
        dc as any,
        completion as any,
        ordering,
        access as any,
      );
      await expect(
        svc.getQuizForLecture('L1', 'tok', 'u1', false),
      ).rejects.toBeInstanceOf(ForbiddenException);
    });

    it('404s for an unknown lecture', async () => {
      const dc = makeDc({ GetLectureContent: { courseLecture: null } });
      const svc = new QuizzesService(
        dc as any,
        completion as any,
        ordering,
        access as any,
      );
      await expect(
        svc.getQuizForLecture('nope', 'tok', 'u1', false),
      ).rejects.toBeInstanceOf(NotFoundException);
    });

    it('404s when the lecture has no quiz', async () => {
      const dc = makeDc({ ...base, GetQuizQuestions: { courseQuizs: [] } });
      access.assertCourseAccess.mockResolvedValue(undefined); // owner
      const svc = new QuizzesService(
        dc as any,
        completion as any,
        ordering,
        access as any,
      );
      await expect(
        svc.getQuizForLecture('L1', 'tok', 'u1', false),
      ).rejects.toBeInstanceOf(NotFoundException);
    });
  });

  describe('createQuestion', () => {
    it('rejects a question with no correct option', async () => {
      const dc = makeDc({
        AdminGetQuiz: { courseQuiz: { adminQuestions: [] } },
      });
      const svc = new QuizzesService(
        dc as any,
        completion as any,
        ordering,
        access as any,
      );
      await expect(
        svc.createQuestion(
          'quiz1',
          {
            questionText: 'Q',
            options: [
              { text: 'a', isCorrect: false },
              { text: 'b', isCorrect: false },
            ],
          } as any,
          'tok',
        ),
      ).rejects.toBeInstanceOf(BadRequestException);
    });
  });

  describe('updateQuestion', () => {
    it('IDOR: rejects an incoming option id that belongs to a different question', async () => {
      // The question owns opt-A only. A caller who owns this question tries to
      // rewrite the answer key of opt-FOREIGN (another quiz/course) by passing
      // its id — the membership check must reject it before any admin mutation.
      const dc = makeDc({
        GetQuestionOptions: {
          quizOptions: [{ id: 'opt-A', text: 'A', isCorrect: true }],
        },
      });
      const svc = new QuizzesService(
        dc as any,
        completion as any,
        ordering,
        access as any,
      );

      await expect(
        svc.updateQuestion(
          'q1',
          {
            options: [
              { id: 'opt-A', text: 'A', isCorrect: false },
              { id: 'opt-FOREIGN', text: 'hacked', isCorrect: true },
            ],
          } as any,
          'tok',
        ),
      ).rejects.toBeInstanceOf(BadRequestException);

      // No option mutation should have run for the foreign id (or at all).
      const mutatedOps = dc.executeMutation.mock.calls.map((c: any[]) => c[0]);
      expect(mutatedOps).not.toContain('AdminUpdateQuizOption');
      expect(mutatedOps).not.toContain('AdminUpdateQuizOptionOrder');
    });

    it('rejects an options set with no correct option', async () => {
      const dc = makeDc({
        GetQuestionOptions: {
          quizOptions: [{ id: 'opt-A', text: 'A', isCorrect: true }],
        },
      });
      const svc = new QuizzesService(
        dc as any,
        completion as any,
        ordering,
        access as any,
      );
      await expect(
        svc.updateQuestion(
          'q1',
          {
            options: [
              { id: 'opt-A', text: 'A', isCorrect: false },
              { text: 'B', isCorrect: false },
            ],
          } as any,
          'tok',
        ),
      ).rejects.toBeInstanceOf(BadRequestException);
    });

    it('updates existing options and inserts new ones when all ids belong to the question', async () => {
      const dc = makeDc({
        GetQuestionOptions: {
          quizOptions: [
            { id: 'opt-A', text: 'A', isCorrect: true },
            { id: 'opt-B', text: 'B', isCorrect: false },
          ],
        },
      });
      const svc = new QuizzesService(
        dc as any,
        completion as any,
        ordering,
        access as any,
      );

      const res = await svc.updateQuestion(
        'q1',
        {
          questionText: 'Q?',
          options: [
            { id: 'opt-A', text: 'A2', isCorrect: true }, // update
            { text: 'C', isCorrect: false }, // insert
          ],
        } as any,
        'tok',
      );
      expect(res).toEqual({ success: true });

      const mutatedOps = dc.executeMutation.mock.calls.map((c: any[]) => c[0]);
      expect(mutatedOps).toContain('AdminUpdateQuizOption'); // opt-A updated
      expect(mutatedOps).toContain('AdminCreateQuizOption'); // opt-C inserted
      expect(mutatedOps).toContain('AdminDeleteQuizOption'); // opt-B removed
    });
  });
});
