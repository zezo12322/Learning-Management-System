import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { ConfigModule } from '@nestjs/config/dist/config.module';
import { FirebaseModule } from './firebase/firebase.module';
import { CoursesModule } from './courses/courses.module';
import { SectionsModule } from './sections/sections.module';
import { LecturesModule } from './lectures/lectures.module';
import { QuizzesModule } from './quizzes/quizzes.module';
import { MissionsModule } from './missions/missions.module';
import { MicroLessonsModule } from './micro-lessons/micro-lessons.module';
import { TemplatesModule } from './templates/templates.module';
import { RubricModule } from './rubric/rubric.module';
import { UploadsModule } from './uploads/uploads.module';
import { ProgressModule } from './progress/progress.module';
import { CompletionModule } from './completion/completion.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    FirebaseModule,
    CoursesModule,
    SectionsModule,
    LecturesModule,
    QuizzesModule,
    MissionsModule,
    MicroLessonsModule,
    TemplatesModule,
    RubricModule,
    UploadsModule,
    ProgressModule,
    CompletionModule,
  ],
  controllers: [AppController],
})
export class AppModule { }
