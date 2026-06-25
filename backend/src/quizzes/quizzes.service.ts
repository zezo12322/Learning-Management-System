import {
  Injectable,
  Logger,
  BadRequestException,
  ForbiddenException,
  GoneException,
  NotFoundException,
} from '@nestjs/common';
import { DataConnectService } from '../firebase/dataconnect.service';
import { CompletionService } from '../completion/completion.service';
import { OrderingService } from '../common/services/ordering.service';
import { assertReorderMembership } from '../common/utils/ordering';
import {
  CreateQuizDto,
  UpdateQuizDto,
  CreateQuestionDto,
  UpdateQuestionDto,
  UpdateQuizOptionDto,
  SubmitAnswerDto,
} from './dto/quiz.dto';

@Injectable()
export class QuizzesService {
  private readonly logger = new Logger(QuizzesService.name);

  constructor(
    private readonly dc: DataConnectService,
    private readonly completionService: CompletionService,
    private readonly ordering: OrderingService,
  ) {}

  /**
   * Guards against IDOR (C3): a caller may only act on their own attempt.
   * `callerUid` is omitted for trusted internal callers (e.g. the expiry cron,
   * which runs with admin credentials and no auth.uid).
   */
  private assertOwnsAttempt(attempt: any, callerUid?: string) {
    if (callerUid && attempt?.user?.id && attempt.user.id !== callerUid) {
      throw new ForbiddenException('This attempt does not belong to you');
    }
  }

  /**
   * Student-safe quiz fetch for taking: questions and options WITHOUT the
   * `isCorrect` answer key (fixes C2). Resolves the quiz's lecture, then loads
   * the answer-free question set.
   */
  async getQuizForTaking(quizId: string, authToken: string) {
    const settings = await this.dc.executeQuery(
      'GetQuizSettings',
      { quizId },
      authToken,
    );
    const lectureId = settings?.courseQuiz?.lecture?.id;
    if (!lectureId) {
      throw new NotFoundException(`Quiz ${quizId} not found`);
    }
    const data = await this.dc.executeQuery(
      'GetQuizQuestions',
      { lectureId },
      authToken,
    );
    return data?.courseQuizs?.[0] ?? null;
  }

  // ==========================================
  // QUIZ BUILDER
  // ==========================================

  async createQuiz(
    courseId: string,
    lectureId: string,
    dto: CreateQuizDto,
    authToken: string,
  ) {
    // Validate the lecture exists and is a QUIZ-type lecture
    const lectureData = await this.dc.executeQuery(
      'GetLectureContent',
      { lectureId },
      authToken,
    );
    const lecture = lectureData?.courseLecture;
    if (!lecture) {
      throw new NotFoundException(`Lecture ${lectureId} not found`);
    }
    // Ensure the lecture actually belongs to the course the caller is authorized
    // for — the route's :courseId is what CourseAccessGuard checked.
    if (lecture.section?.course?.id !== courseId) {
      throw new BadRequestException('Lecture does not belong to this course');
    }
    if (lecture.type !== 'QUIZ') {
      throw new BadRequestException(
        'A quiz can only be attached to a QUIZ-type lecture',
      );
    }

    // Enforce the one-quiz-per-lecture unique constraint
    const existing = await this.dc.executeQuery(
      'GetQuizQuestions',
      { lectureId },
      authToken,
    );
    if ((existing?.courseQuizs ?? []).length > 0) {
      throw new BadRequestException('A quiz already exists for this lecture');
    }

    return this.dc.executeMutation(
      'AdminCreateQuiz',
      {
        lectureId,
        passingScore: dto.passingScore,
        maxAttempts: dto.maxAttempts,
        timeLimitMinutes: dto.timeLimitMinutes ?? null,
      },
      authToken,
    );
  }

  async updateQuiz(quizId: string, dto: UpdateQuizDto, authToken: string) {
    return this.dc.executeMutation(
      'AdminUpdateQuiz',
      { quizId, ...dto },
      authToken,
    );
  }

  async deleteQuiz(quizId: string, authToken: string) {
    return this.dc.executeMutation('AdminDeleteQuiz', { quizId }, authToken);
  }

  async getQuiz(quizId: string, authToken: string) {
    const data = await this.dc.executeQuery('AdminGetQuiz', { quizId }, authToken);
    if (!data?.courseQuiz) {
      throw new NotFoundException(`Quiz ${quizId} not found`);
    }
    return data.courseQuiz;
  }

  async createQuestion(quizId: string, dto: CreateQuestionDto, authToken: string) {
    // Validate at least one correct option
    const correctCount = dto.options.filter((o) => o.isCorrect).length;
    if (correctCount === 0) {
      throw new BadRequestException('At least one option must be correct');
    }

    // Fetch existing questions to auto-calculate order
    const quiz = await this.getQuiz(quizId, authToken);
    const questions = quiz.adminQuestions ?? [];

    // Insert question
    const questionResult = await this.dc.executeMutation(
      'AdminCreateQuizQuestion',
      {
        quizId,
        questionText: dto.questionText,
        order: this.ordering.nextOrder(questions),
        points: dto.points ?? 1.0,
        explanation: dto.explanation ?? null,
      },
      authToken,
    );

    // Insert options
    const questionId = questionResult?.quizQuestion_insert?.id;
    if (questionId) {
      const optionInserts = dto.options.map((opt, index) =>
        this.dc.executeMutation(
          'AdminCreateQuizOption',
          {
            questionId,
            text: opt.text,
            order: index + 1,
            isCorrect: opt.isCorrect,
          },
          authToken,
        ),
      );
      await Promise.all(optionInserts);
    }

    return questionResult;
  }

  async updateQuestion(questionId: string, dto: UpdateQuestionDto, authToken: string) {
    const { options, ...questionFields } = dto;

    // Update the question's own fields
    await this.dc.executeMutation(
      'AdminUpdateQuizQuestion',
      { questionId, ...questionFields },
      authToken,
    );

    // If a full options set was provided, diff it against the existing options
    if (options) {
      const correctCount = options.filter((o) => o.isCorrect).length;
      if (correctCount === 0) {
        throw new BadRequestException('At least one option must be correct');
      }

      const existingData = await this.dc.executeQuery(
        'GetQuestionOptions',
        { questionId },
        authToken,
      );
      const existing: any[] = existingData?.quizOptions ?? [];
      const incomingIds = new Set(
        options.filter((o) => o.id).map((o) => o.id as string),
      );

      // Delete options removed from the incoming set
      const toDelete = existing.filter((e) => !incomingIds.has(e.id));

      // Insert / update according to the incoming order
      const ops: Promise<any>[] = [];
      options.forEach((opt, index) => {
        if (opt.id) {
          ops.push(
            this.dc.executeMutation(
              'AdminUpdateQuizOption',
              { optionId: opt.id, text: opt.text, isCorrect: opt.isCorrect },
              authToken,
            ),
          );
          ops.push(
            this.dc.executeMutation(
              'AdminUpdateQuizOptionOrder',
              { optionId: opt.id, order: index + 1 },
              authToken,
            ),
          );
        } else {
          ops.push(
            this.dc.executeMutation(
              'AdminCreateQuizOption',
              {
                questionId,
                text: opt.text,
                order: index + 1,
                isCorrect: opt.isCorrect,
              },
              authToken,
            ),
          );
        }
      });

      toDelete.forEach((e) => {
        ops.push(
          this.dc.executeMutation(
            'AdminDeleteQuizOption',
            { optionId: e.id },
            authToken,
          ),
        );
      });

      await Promise.all(ops);
    }

    return { success: true };
  }

  async softDeleteQuestion(quizId: string, questionId: string, authToken: string) {
    await this.dc.executeMutation(
      'AdminSoftDeleteQuizQuestion',
      { questionId },
      authToken,
    );

    // Re-normalize the order of the remaining (non-deleted) questions
    const quiz = await this.getQuiz(quizId, authToken);
    const remaining = (quiz.adminQuestions ?? [])
      .filter((q: any) => q.id !== questionId)
      .map((q: any) => q.id);
    await this.ordering.applyOrder(
      remaining,
      'AdminUpdateQuizQuestionOrder',
      'questionId',
      authToken,
    );

    return { success: true };
  }

  async reorderQuestions(quizId: string, orderedIds: string[], authToken: string) {
    // Validate every id belongs to this quiz before reordering.
    const quiz = await this.getQuiz(quizId, authToken);
    const validIds = (quiz.adminQuestions ?? []).map((q: any) => q.id);
    assertReorderMembership(orderedIds, validIds, 'question');

    await this.ordering.applyOrder(
      orderedIds,
      'AdminUpdateQuizQuestionOrder',
      'questionId',
      authToken,
    );
    return { success: true, order: orderedIds };
  }

  // Option management
  async updateOption(optionId: string, dto: UpdateQuizOptionDto, authToken: string) {
    return this.dc.executeMutation(
      'AdminUpdateQuizOption',
      { optionId, ...dto },
      authToken,
    );
  }

  async deleteOption(optionId: string, authToken: string) {
    return this.dc.executeMutation('AdminDeleteQuizOption', { optionId }, authToken);
  }

  async reorderOptions(questionId: string, orderedIds: string[], authToken: string) {
    // Validate every id belongs to this question before reordering.
    const existing = await this.dc.executeQuery(
      'GetQuestionOptions',
      { questionId },
      authToken,
    );
    const validIds = (existing?.quizOptions ?? []).map((o: any) => o.id);
    assertReorderMembership(orderedIds, validIds, 'option');

    await this.ordering.applyOrder(
      orderedIds,
      'AdminUpdateQuizOptionOrder',
      'optionId',
      authToken,
    );
    return { success: true, order: orderedIds };
  }

  // ==========================================
  // QUIZ TAKING (KAN-78, KAN-79, KAN-80)
  // ==========================================

  async startAttempt(quizId: string, authToken: string) {
    // Fetch quiz settings (maxAttempts) and the owning course
    const settingsData = await this.dc.executeQuery(
      'GetQuizSettings',
      { quizId },
      authToken,
    );
    const quiz = settingsData?.courseQuiz;
    if (!quiz) {
      throw new NotFoundException(`Quiz ${quizId} not found`);
    }

    // Verify the student has an active enrollment in the course
    const courseId = quiz.lecture?.section?.course?.id;
    if (courseId) {
      const enrollmentData = await this.dc.executeQuery(
        'GetUserEnrollmentForCourse',
        { courseId },
        authToken,
      );
      const enrollment = enrollmentData?.enrollments?.[0];
      if (!enrollment || enrollment.status !== 'ACTIVE') {
        throw new ForbiddenException(
          'You must have an active enrollment in this course to take the quiz',
        );
      }
    }

    // Fetch existing attempts
    const attemptsData = await this.dc.executeQuery(
      'GetUserQuizAttempts',
      { quizId },
      authToken,
    );
    const attempts = attemptsData?.quizAttempts ?? [];

    // Check for an in-progress attempt
    const inProgress = attempts.find((a: any) => !a.completedAt);
    if (inProgress) {
      throw new BadRequestException(
        'You already have an in-progress attempt. Finish or abandon it first.',
      );
    }

    // Enforce max attempts
    if (attempts.length >= quiz.maxAttempts) {
      throw new ForbiddenException(
        `Maximum attempts (${quiz.maxAttempts}) exceeded`,
      );
    }

    return this.dc.executeMutation('StartQuizAttempt', { quizId }, authToken);
  }

  async submitAnswer(
    attemptId: string,
    dto: SubmitAnswerDto,
    authToken: string,
    callerUid?: string,
  ) {
    // Validate attempt is still active
    const attemptData = await this.dc.executeQuery(
      'GetQuizAttemptById',
      { attemptId },
      authToken,
    );
    const attempt = attemptData?.quizAttempt;

    if (!attempt) {
      throw new NotFoundException(`Attempt ${attemptId} not found`);
    }
    this.assertOwnsAttempt(attempt, callerUid);
    if (attempt.completedAt) {
      throw new BadRequestException('This attempt is already completed');
    }

    // Check session timeout (KAN-115)
    if (attempt.quiz?.timeLimitMinutes) {
      const startTime = new Date(attempt.startedAt).getTime();
      const elapsed = (Date.now() - startTime) / 1000 / 60;
      if (elapsed > attempt.quiz.timeLimitMinutes) {
        // Auto-finish with whatever answers exist
        const result = await this.autoGrade(attemptId, { token: authToken });
        throw new GoneException({
          message: 'Session timed out. Attempt auto-graded.',
          ...result,
        });
      }
    }

    // Validate the selected option belongs to the specified question, and that
    // the question belongs to this attempt's quiz (relational integrity).
    const optionData = await this.dc.executeQuery(
      'GetOptionWithQuestion',
      { optionId: dto.selectedOptionId },
      authToken,
    );
    const option = optionData?.quizOption;
    if (!option) {
      throw new NotFoundException(`Option ${dto.selectedOptionId} not found`);
    }
    if (option.question?.id !== dto.questionId) {
      throw new BadRequestException(
        'Selected option does not belong to the specified question',
      );
    }
    if (attempt.quiz?.id && option.question?.quiz?.id !== attempt.quiz.id) {
      throw new BadRequestException(
        'Question does not belong to this attempt\'s quiz',
      );
    }

    return this.dc.executeMutation(
      'SubmitQuizAnswer',
      {
        attemptId,
        questionId: dto.questionId,
        optionId: dto.selectedOptionId,
      },
      authToken,
    );
  }

  async finishAttempt(attemptId: string, authToken: string, callerUid?: string) {
    // Validate attempt is still active
    const attemptData = await this.dc.executeQuery(
      'GetQuizAttemptById',
      { attemptId },
      authToken,
    );
    const attempt = attemptData?.quizAttempt;

    if (!attempt) {
      throw new NotFoundException(`Attempt ${attemptId} not found`);
    }
    this.assertOwnsAttempt(attempt, callerUid);
    if (attempt.completedAt) {
      throw new BadRequestException('This attempt is already completed');
    }

    return this.autoGrade(attemptId, { token: authToken });
  }

  /**
   * Auto-grade: compare selected answers to correct answers, compute weighted
   * score, determine pass/fail, and atomically finalize the attempt.
   *
   * `ctx` selects the auth used for every Data Connect call:
   *  - `{ token }`  → the student's request (normal finish/submit/timeout path)
   *  - `{ admin: true }` → service credentials, for the expiry cron (no auth.uid).
   * The KAN-116 completion/certificate trigger only runs on the user path,
   * since those mutations are scoped to the student's auth.uid.
   */
  async autoGrade(attemptId: string, ctx: { token?: string; admin?: boolean }) {
    const query = <T = any>(op: string, vars?: Record<string, any>): Promise<T> =>
      ctx.admin
        ? this.dc.executeQueryAsAdmin<T>(op, vars)
        : this.dc.executeQuery<T>(op, vars, ctx.token);
    const mutate = <T = any>(op: string, vars?: Record<string, any>): Promise<T> =>
      ctx.admin
        ? this.dc.executeMutationAsAdmin<T>(op, vars)
        : this.dc.executeMutation<T>(op, vars, ctx.token);

    // Get all answers with correct flags
    const answersData = await query('GetAttemptAnswersWithCorrect', { attemptId });
    const answers = answersData?.quizAttemptAnswers ?? [];

    // Get attempt details for passing score and the owning quiz id
    const attemptData = await query('GetQuizAttemptById', { attemptId });
    const passingScore = attemptData?.quizAttempt?.quiz?.passingScore ?? 0;
    const quizId = attemptData?.quizAttempt?.quiz?.id;

    // Denominator = total points of EVERY non-deleted question in the quiz,
    // so skipped/unanswered questions are graded as zero (not ignored).
    const questionsData = quizId
      ? await query('GetQuizQuestionPoints', { quizId })
      : null;
    const allQuestions: any[] = questionsData?.quizQuestions ?? [];
    const totalPoints = allQuestions.reduce(
      (sum, q) => sum + (q.points ?? 1),
      0,
    );
    const totalQuestions = allQuestions.length;

    // Numerator = points earned on correctly answered questions
    let earnedPoints = 0;
    let correctCount = 0;
    for (const answer of answers) {
      if (answer.selectedOption?.isCorrect) {
        earnedPoints += answer.question?.points ?? 1;
        correctCount++;
      }
    }

    const score = totalPoints > 0 ? (earnedPoints / totalPoints) * 100 : 0;
    const passed = score >= passingScore;

    // Persist atomically: only finalize if the attempt is still open. A return
    // of 0 means a concurrent finish/timeout already graded it — in that case
    // skip the completion trigger so certificates aren't generated twice (H2).
    const finishResult = await mutate('FinishQuizAttemptIfOpen', {
      attemptId,
      score,
      passed,
    });
    const rowsUpdated = finishResult?.quizAttempt_updateMany ?? 0;
    if (rowsUpdated === 0) {
      this.logger.debug(
        `Attempt ${attemptId} was already finalized; skipping completion trigger`,
      );
      return {
        score: Math.round(score * 100) / 100,
        passed,
        totalPoints,
        earnedPoints,
        correctCount,
        answeredCount: answers.length,
        totalQuestions,
        alreadyFinalized: true,
      };
    }

    // Trigger 1 (KAN-116): on pass, mark the quiz lecture complete and re-check
    // course completion. Only on the user path — completion mutations are scoped
    // to the student's auth.uid, which the admin/cron context does not carry.
    if (passed && !ctx.admin && ctx.token) {
      if (quizId) {
        try {
          const settings = await query('GetQuizSettings', { quizId });
          const lectureId = settings?.courseQuiz?.lecture?.id;
          const courseId = settings?.courseQuiz?.lecture?.section?.course?.id;
          if (lectureId && courseId) {
            await this.completionService.onQuizPassed(
              lectureId,
              courseId,
              ctx.token,
            );
          }
        } catch {
          // swallow — completion tracking is non-critical
        }
      }
    } else if (passed && ctx.admin) {
      this.logger.warn(
        `Attempt ${attemptId} auto-finalized as PASSED by the expiry cron; ` +
          `completion/certificate trigger deferred (no user auth context)`,
      );
    }

    return {
      score: Math.round(score * 100) / 100,
      passed,
      totalPoints,
      earnedPoints,
      correctCount,
      answeredCount: answers.length,
      totalQuestions,
    };
  }

  // ==========================================
  // SESSION MANAGEMENT (KAN-115)
  // ==========================================

  async heartbeat(attemptId: string, authToken: string, callerUid?: string) {
    const sessionData = await this.dc.executeQuery(
      'GetActiveQuizSession',
      { attemptId },
      authToken,
    );
    const attempt = sessionData?.quizAttempt;

    if (!attempt) {
      throw new NotFoundException(`Attempt ${attemptId} not found`);
    }
    this.assertOwnsAttempt(attempt, callerUid);
    if (attempt.completedAt) {
      return { active: false, message: 'Attempt already completed' };
    }

    const timeLimitMinutes = attempt.quiz?.timeLimitMinutes;
    if (!timeLimitMinutes) {
      return { active: true, remainingSeconds: null };
    }

    const startTime = new Date(attempt.startedAt).getTime();
    const elapsed = (Date.now() - startTime) / 1000;
    const totalSeconds = timeLimitMinutes * 60;
    const remaining = Math.max(0, totalSeconds - elapsed);

    if (remaining <= 0) {
      // Auto-finish
      const result = await this.autoGrade(attemptId, { token: authToken });
      return { active: false, message: 'Session timed out', ...result };
    }

    return {
      active: true,
      remainingSeconds: Math.round(remaining),
    };
  }
}
