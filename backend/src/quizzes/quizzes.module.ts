import { Module } from '@nestjs/common';
import { QuizzesController } from './quizzes.controller';
import { QuizzesService } from './quizzes.service';
import { QuizExpiryTask } from './quiz-expiry.task';
import { CompletionModule } from '../completion/completion.module';

@Module({
  imports: [CompletionModule],
  controllers: [QuizzesController],
  providers: [QuizzesService, QuizExpiryTask],
  exports: [QuizzesService],
})
export class QuizzesModule {}
