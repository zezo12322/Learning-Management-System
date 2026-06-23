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
import { DataConnectService } from '../firebase/dataconnect.service';

@Controller()
@UseGuards(FirebaseAuthGuard)
export class QuizzesController {
  constructor(
    private readonly quizzesService: QuizzesService,
    private readonly dc: DataConnectService,
  ) {}

  // ==========================================
  // QUIZ BUILDER — Admin/Instructor
  // ==========================================

  @Post('courses/:courseId/lectures/:lectureId/quiz')
  createQuiz(
    @Param('lectureId') lectureId: string,
    @Body() dto: CreateQuizDto,
    @Req() req: any,
  ) {
    return this.quizzesService.createQuiz(lectureId, dto, this.dc.extractToken(req));
  }

  @Get('courses/:courseId/quizzes/:quizId')
  getQuiz(@Param('quizId') quizId: string, @Req() req: any) {
    return this.quizzesService.getQuiz(quizId, this.dc.extractToken(req));
  }

  @Patch('courses/:courseId/quizzes/:quizId')
  updateQuiz(
    @Param('quizId') quizId: string,
    @Body() dto: UpdateQuizDto,
    @Req() req: any,
  ) {
    return this.quizzesService.updateQuiz(quizId, dto, this.dc.extractToken(req));
  }

  @Delete('courses/:courseId/quizzes/:quizId')
  deleteQuiz(@Param('quizId') quizId: string, @Req() req: any) {
    return this.quizzesService.deleteQuiz(quizId, this.dc.extractToken(req));
  }

  // ==========================================
  // QUESTION MANAGEMENT
  // ==========================================

  @Post('courses/:courseId/quizzes/:quizId/questions')
  createQuestion(
    @Param('quizId') quizId: string,
    @Body() dto: CreateQuestionDto,
    @Req() req: any,
  ) {
    return this.quizzesService.createQuestion(quizId, dto, this.dc.extractToken(req));
  }

  @Patch('courses/:courseId/quizzes/:quizId/questions/:questionId')
  updateQuestion(
    @Param('questionId') questionId: string,
    @Body() dto: UpdateQuestionDto,
    @Req() req: any,
  ) {
    return this.quizzesService.updateQuestion(questionId, dto, this.dc.extractToken(req));
  }

  @Delete('courses/:courseId/quizzes/:quizId/questions/:questionId')
  softDeleteQuestion(
    @Param('quizId') quizId: string,
    @Param('questionId') questionId: string,
    @Req() req: any,
  ) {
    return this.quizzesService.softDeleteQuestion(quizId, questionId, this.dc.extractToken(req));
  }

  @Put('courses/:courseId/quizzes/:quizId/questions/reorder')
  reorderQuestions(
    @Param('quizId') quizId: string,
    @Body() dto: ReorderDto,
    @Req() req: any,
  ) {
    return this.quizzesService.reorderQuestions(quizId, dto.orderedIds, this.dc.extractToken(req));
  }

  // ==========================================
  // OPTION MANAGEMENT
  // ==========================================

  @Patch('courses/:courseId/quizzes/:quizId/questions/:questionId/options/:optionId')
  updateOption(
    @Param('optionId') optionId: string,
    @Body() dto: UpdateQuizOptionDto,
    @Req() req: any,
  ) {
    return this.quizzesService.updateOption(optionId, dto, this.dc.extractToken(req));
  }

  @Delete('courses/:courseId/quizzes/:quizId/questions/:questionId/options/:optionId')
  deleteOption(@Param('optionId') optionId: string, @Req() req: any) {
    return this.quizzesService.deleteOption(optionId, this.dc.extractToken(req));
  }

  @Put('courses/:courseId/quizzes/:quizId/questions/:questionId/options/reorder')
  reorderOptions(
    @Param('questionId') questionId: string,
    @Body() dto: ReorderDto,
    @Req() req: any,
  ) {
    return this.quizzesService.reorderOptions(questionId, dto.orderedIds, this.dc.extractToken(req));
  }

  // ==========================================
  // QUIZ TAKING — Student (KAN-78, KAN-79, KAN-80)
  // ==========================================

  @Post('courses/:courseId/quizzes/:quizId/attempts')
  startAttempt(@Param('quizId') quizId: string, @Req() req: any) {
    return this.quizzesService.startAttempt(quizId, this.dc.extractToken(req));
  }

  @Post('courses/:courseId/quizzes/:quizId/attempts/:attemptId/answers')
  submitAnswer(
    @Param('attemptId') attemptId: string,
    @Body() dto: SubmitAnswerDto,
    @Req() req: any,
  ) {
    return this.quizzesService.submitAnswer(attemptId, dto, this.dc.extractToken(req));
  }

  @Post('courses/:courseId/quizzes/:quizId/attempts/:attemptId/finish')
  finishAttempt(@Param('attemptId') attemptId: string, @Req() req: any) {
    return this.quizzesService.finishAttempt(attemptId, this.dc.extractToken(req));
  }

  // ==========================================
  // SESSION MANAGEMENT (KAN-115)
  // ==========================================

  @Post('courses/:courseId/quizzes/:quizId/attempts/:attemptId/heartbeat')
  heartbeat(@Param('attemptId') attemptId: string, @Req() req: any) {
    return this.quizzesService.heartbeat(attemptId, this.dc.extractToken(req));
  }
}
