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
});
