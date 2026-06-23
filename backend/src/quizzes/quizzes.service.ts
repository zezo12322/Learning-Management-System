import {
  Injectable,
  BadRequestException,
  ForbiddenException,
  GoneException,
  NotFoundException,
} from '@nestjs/common';
import { DataConnectService } from '../firebase/dataconnect.service';
import { CompletionService } from '../completion/completion.service';
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
  constructor(
    private readonly dc: DataConnectService,
    private readonly completionService: CompletionService,
  ) {}

  // ==========================================
  // QUIZ BUILDER
  // ==========================================

  async createQuiz(lectureId: string, dto: CreateQuizDto, authToken: string) {
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
    const maxOrder = questions.reduce(
      (max: number, q: any) => Math.max(max, q.order ?? 0),
      0,
    );

    // Insert question
    const questionResult = await this.dc.executeMutation(
      'AdminCreateQuizQuestion',
      {
        quizId,
        questionText: dto.questionText,
        order: maxOrder + 1,
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
    const remaining = (quiz.adminQuestions ?? []).filter(
      (q: any) => q.id !== questionId,
    );
    await Promise.all(
      remaining.map((q: any, index: number) =>
        this.dc.executeMutation(
          'AdminUpdateQuizQuestionOrder',
          { questionId: q.id, order: index + 1 },
          authToken,
        ),
      ),
    );

    return { success: true };
  }

  async reorderQuestions(quizId: string, orderedIds: string[], authToken: string) {
    const updates = orderedIds.map((id, index) =>
      this.dc.executeMutation(
        'AdminUpdateQuizQuestionOrder',
        { questionId: id, order: index + 1 },
        authToken,
      ),
    );
    await Promise.all(updates);
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
    const updates = orderedIds.map((id, index) =>
      this.dc.executeMutation(
        'AdminUpdateQuizOptionOrder',
        { optionId: id, order: index + 1 },
        authToken,
      ),
    );
    await Promise.all(updates);
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

  async submitAnswer(attemptId: string, dto: SubmitAnswerDto, authToken: string) {
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
    if (attempt.completedAt) {
      throw new BadRequestException('This attempt is already completed');
    }

    // Check session timeout (KAN-115)
    if (attempt.quiz?.timeLimitMinutes) {
      const startTime = new Date(attempt.startedAt).getTime();
      const elapsed = (Date.now() - startTime) / 1000 / 60;
      if (elapsed > attempt.quiz.timeLimitMinutes) {
        // Auto-finish with whatever answers exist
        const result = await this.autoGrade(attemptId, authToken);
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

  async finishAttempt(attemptId: string, authToken: string) {
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
    if (attempt.completedAt) {
      throw new BadRequestException('This attempt is already completed');
    }

    return this.autoGrade(attemptId, authToken);
  }

  /**
   * Auto-grade: compare selected answers to correct answers,
   * compute weighted score, determine pass/fail.
   */
  async autoGrade(attemptId: string, authToken: string) {
    // Get all answers with correct flags
    const answersData = await this.dc.executeQuery(
      'GetAttemptAnswersWithCorrect',
      { attemptId },
      authToken,
    );
    const answers = answersData?.quizAttemptAnswers ?? [];

    // Get attempt details for passing score and the owning quiz id
    const attemptData = await this.dc.executeQuery(
      'GetQuizAttemptById',
      { attemptId },
      authToken,
    );
    const passingScore = attemptData?.quizAttempt?.quiz?.passingScore ?? 0;
    const quizId = attemptData?.quizAttempt?.quiz?.id;

    // Denominator = total points of EVERY non-deleted question in the quiz,
    // so skipped/unanswered questions are graded as zero (not ignored).
    const questionsData = quizId
      ? await this.dc.executeQuery('GetQuizQuestionPoints', { quizId }, authToken)
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

    // Persist the result
    await this.dc.executeMutation(
      'FinishQuizAttempt',
      { attemptId, score, passed },
      authToken,
    );

    // Trigger 1 (KAN-116): on pass, mark the quiz lecture complete and
    // re-check course completion. Best-effort — never fails the grading.
    if (passed) {
      const quizId = attemptData?.quizAttempt?.quiz?.id;
      if (quizId) {
        try {
          const settings = await this.dc.executeQuery(
            'GetQuizSettings',
            { quizId },
            authToken,
          );
          const lectureId = settings?.courseQuiz?.lecture?.id;
          const courseId = settings?.courseQuiz?.lecture?.section?.course?.id;
          if (lectureId && courseId) {
            await this.completionService.onQuizPassed(lectureId, courseId, authToken);
          }
        } catch {
          // swallow — completion tracking is non-critical
        }
      }
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

  async heartbeat(attemptId: string, authToken: string) {
    const sessionData = await this.dc.executeQuery(
      'GetActiveQuizSession',
      { attemptId },
      authToken,
    );
    const attempt = sessionData?.quizAttempt;

    if (!attempt) {
      throw new NotFoundException(`Attempt ${attemptId} not found`);
    }
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
      const result = await this.autoGrade(attemptId, authToken);
      return { active: false, message: 'Session timed out', ...result };
    }

    return {
      active: true,
      remainingSeconds: Math.round(remaining),
    };
  }
}
