import {
  Controller,
  Get,
  Post,
  Patch,
  Put,
  Delete,
  Body,
  Param,
  UseGuards,
  Req,
} from '@nestjs/common';
import { QuizzesService } from './quizzes.service';
import {
  CreateQuizDto,
  UpdateQuizDto,
  CreateQuestionDto,
  UpdateQuestionDto,
  UpdateQuizOptionDto,
  SubmitAnswerDto,
} from './dto/quiz.dto';
import { ReorderDto } from '../common/dto/reorder.dto';
import { FirebaseAuthGuard } from '../common/guards/firebase-auth.guard';
import { RolesGuard } from '../common/guards/roles.guard';
import { ResourceOwnershipGuard } from '../common/guards/resource-ownership.guard';
import { Roles } from '../common/decorators/roles.decorator';
import { OwnsResource } from '../common/decorators/owns-resource.decorator';
import { CurrentUser } from '../common/decorators/current-user.decorator';
import { DataConnectService } from '../firebase/dataconnect.service';

@Controller()
@UseGuards(FirebaseAuthGuard, RolesGuard)
export class QuizzesController {
  constructor(
    private readonly quizzesService: QuizzesService,
    private readonly dc: DataConnectService,
  ) {}

  // ==========================================
  // QUIZ BUILDER — Admin or owning Instructor only.
  // ResourceOwnershipGuard resolves each leaf id up to its owning course and
  // verifies ownership, so the route's :courseId is not trusted.
  // ==========================================

  @Post('courses/:courseId/lectures/:lectureId/quiz')
  @Roles('admin', 'instructor')
  @OwnsResource('lecture')
  @UseGuards(ResourceOwnershipGuard)
  createQuiz(
    @Param('courseId') courseId: string,
    @Param('lectureId') lectureId: string,
    @Body() dto: CreateQuizDto,
    @Req() req: any,
  ) {
    return this.quizzesService.createQuiz(courseId, lectureId, dto, this.dc.extractToken(req));
  }

  // Answer-key view (includes isCorrect) — builders only.
  @Get('courses/:courseId/quizzes/:quizId')
  @Roles('admin', 'instructor')
  @OwnsResource('quiz')
  @UseGuards(ResourceOwnershipGuard)
  getQuiz(@Param('quizId') quizId: string, @Req() req: any) {
    return this.quizzesService.getQuiz(quizId, this.dc.extractToken(req));
  }

  // Student-safe view (no isCorrect) — used to render the quiz for taking.
  @Get('courses/:courseId/quizzes/:quizId/questions')
  getQuizForTaking(@Param('quizId') quizId: string, @Req() req: any) {
    return this.quizzesService.getQuizForTaking(quizId, this.dc.extractToken(req));
  }

  @Patch('courses/:courseId/quizzes/:quizId')
  @Roles('admin', 'instructor')
  @OwnsResource('quiz')
  @UseGuards(ResourceOwnershipGuard)
  updateQuiz(
    @Param('quizId') quizId: string,
    @Body() dto: UpdateQuizDto,
    @Req() req: any,
  ) {
    return this.quizzesService.updateQuiz(quizId, dto, this.dc.extractToken(req));
  }

  @Delete('courses/:courseId/quizzes/:quizId')
  @Roles('admin', 'instructor')
  @OwnsResource('quiz')
  @UseGuards(ResourceOwnershipGuard)
  deleteQuiz(@Param('quizId') quizId: string, @Req() req: any) {
    return this.quizzesService.deleteQuiz(quizId, this.dc.extractToken(req));
  }

  // ==========================================
  // QUESTION MANAGEMENT — Admin or owning Instructor only
  // ==========================================

  @Post('courses/:courseId/quizzes/:quizId/questions')
  @Roles('admin', 'instructor')
  @OwnsResource('quiz')
  @UseGuards(ResourceOwnershipGuard)
  createQuestion(
    @Param('quizId') quizId: string,
    @Body() dto: CreateQuestionDto,
    @Req() req: any,
  ) {
    return this.quizzesService.createQuestion(quizId, dto, this.dc.extractToken(req));
  }

  @Patch('courses/:courseId/quizzes/:quizId/questions/:questionId')
  @Roles('admin', 'instructor')
  @OwnsResource('question')
  @UseGuards(ResourceOwnershipGuard)
  updateQuestion(
    @Param('questionId') questionId: string,
    @Body() dto: UpdateQuestionDto,
    @Req() req: any,
  ) {
    return this.quizzesService.updateQuestion(questionId, dto, this.dc.extractToken(req));
  }

  @Delete('courses/:courseId/quizzes/:quizId/questions/:questionId')
  @Roles('admin', 'instructor')
  @OwnsResource('question')
  @UseGuards(ResourceOwnershipGuard)
  softDeleteQuestion(
    @Param('quizId') quizId: string,
    @Param('questionId') questionId: string,
    @Req() req: any,
  ) {
    return this.quizzesService.softDeleteQuestion(quizId, questionId, this.dc.extractToken(req));
  }

  @Put('courses/:courseId/quizzes/:quizId/questions/reorder')
  @Roles('admin', 'instructor')
  @OwnsResource('quiz')
  @UseGuards(ResourceOwnershipGuard)
  reorderQuestions(
    @Param('quizId') quizId: string,
    @Body() dto: ReorderDto,
    @Req() req: any,
  ) {
    return this.quizzesService.reorderQuestions(quizId, dto.orderedIds, this.dc.extractToken(req));
  }

  // ==========================================
  // OPTION MANAGEMENT — Admin or owning Instructor only
  // ==========================================

  @Patch('courses/:courseId/quizzes/:quizId/questions/:questionId/options/:optionId')
  @Roles('admin', 'instructor')
  @OwnsResource('option')
  @UseGuards(ResourceOwnershipGuard)
  updateOption(
    @Param('optionId') optionId: string,
    @Body() dto: UpdateQuizOptionDto,
    @Req() req: any,
  ) {
    return this.quizzesService.updateOption(optionId, dto, this.dc.extractToken(req));
  }

  @Delete('courses/:courseId/quizzes/:quizId/questions/:questionId/options/:optionId')
  @Roles('admin', 'instructor')
  @OwnsResource('option')
  @UseGuards(ResourceOwnershipGuard)
  deleteOption(@Param('optionId') optionId: string, @Req() req: any) {
    return this.quizzesService.deleteOption(optionId, this.dc.extractToken(req));
  }

  @Put('courses/:courseId/quizzes/:quizId/questions/:questionId/options/reorder')
  @Roles('admin', 'instructor')
  @OwnsResource('question')
  @UseGuards(ResourceOwnershipGuard)
  reorderOptions(
    @Param('questionId') questionId: string,
    @Body() dto: ReorderDto,
    @Req() req: any,
  ) {
    return this.quizzesService.reorderOptions(questionId, dto.orderedIds, this.dc.extractToken(req));
  }

  // ==========================================
  // QUIZ TAKING — Student (attempt-owner). Enrollment is checked in the
  // service; callerUid enforces attempt ownership (fixes IDOR, C3).
  // ==========================================

  @Post('courses/:courseId/quizzes/:quizId/attempts')
  startAttempt(@Param('quizId') quizId: string, @Req() req: any) {
    return this.quizzesService.startAttempt(quizId, this.dc.extractToken(req));
  }

  @Post('courses/:courseId/quizzes/:quizId/attempts/:attemptId/answers')
  submitAnswer(
    @Param('attemptId') attemptId: string,
    @Body() dto: SubmitAnswerDto,
    @CurrentUser('uid') uid: string,
    @Req() req: any,
  ) {
    return this.quizzesService.submitAnswer(attemptId, dto, this.dc.extractToken(req), uid);
  }

  @Post('courses/:courseId/quizzes/:quizId/attempts/:attemptId/finish')
  finishAttempt(
    @Param('attemptId') attemptId: string,
    @CurrentUser('uid') uid: string,
    @Req() req: any,
  ) {
    return this.quizzesService.finishAttempt(attemptId, this.dc.extractToken(req), uid);
  }

  // ==========================================
  // SESSION MANAGEMENT (KAN-115)
  // ==========================================

  @Post('courses/:courseId/quizzes/:quizId/attempts/:attemptId/heartbeat')
  heartbeat(
    @Param('attemptId') attemptId: string,
    @CurrentUser('uid') uid: string,
    @Req() req: any,
  ) {
    return this.quizzesService.heartbeat(attemptId, this.dc.extractToken(req), uid);
  }
}
