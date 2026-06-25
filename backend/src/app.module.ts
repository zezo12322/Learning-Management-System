import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { ScheduleModule } from '@nestjs/schedule';
import { ThrottlerModule, ThrottlerGuard } from '@nestjs/throttler';
import { AppController } from './app.controller';
import { ConfigModule } from '@nestjs/config/dist/config.module';
import { CommonModule } from './common/common.module';
import { AdminModule } from './admin/admin.module';
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
import { UsersModule } from './users/users.module';
import { EnrollmentModule } from './enrollment/enrollment.module';
import { SubmissionsModule } from './submissions/submissions.module';
import { CatalogModule } from './catalog/catalog.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    ScheduleModule.forRoot(),
    // Global rate limiting (M8): 100 requests / 60s per client by default.
    ThrottlerModule.forRoot([
      {
        ttl: 60000,
        limit: 100,
      },
    ]),
    CommonModule,
    AdminModule,
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
    UsersModule,
    EnrollmentModule,
    SubmissionsModule,
    CatalogModule,
  ],
  controllers: [AppController],
  providers: [
    // Apply the throttler globally.
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
  ],
})
export class AppModule { }
