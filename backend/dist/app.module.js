"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const core_1 = require("@nestjs/core");
const schedule_1 = require("@nestjs/schedule");
const throttler_1 = require("@nestjs/throttler");
const bullmq_1 = require("@nestjs/bullmq");
const config_1 = require("@nestjs/config");
const app_controller_1 = require("./app.controller");
const config_module_1 = require("@nestjs/config/dist/config.module");
const common_module_1 = require("./common/common.module");
const admin_module_1 = require("./admin/admin.module");
const firebase_module_1 = require("./firebase/firebase.module");
const courses_module_1 = require("./courses/courses.module");
const sections_module_1 = require("./sections/sections.module");
const lectures_module_1 = require("./lectures/lectures.module");
const quizzes_module_1 = require("./quizzes/quizzes.module");
const missions_module_1 = require("./missions/missions.module");
const micro_lessons_module_1 = require("./micro-lessons/micro-lessons.module");
const templates_module_1 = require("./templates/templates.module");
const rubric_module_1 = require("./rubric/rubric.module");
const uploads_module_1 = require("./uploads/uploads.module");
const streaming_module_1 = require("./streaming/streaming.module");
const transcoding_module_1 = require("./transcoding/transcoding.module");
const progress_module_1 = require("./progress/progress.module");
const completion_module_1 = require("./completion/completion.module");
const users_module_1 = require("./users/users.module");
const enrollment_module_1 = require("./enrollment/enrollment.module");
const submissions_module_1 = require("./submissions/submissions.module");
const catalog_module_1 = require("./catalog/catalog.module");
const auth_module_1 = require("./auth/auth.module");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_module_1.ConfigModule.forRoot({
                isGlobal: true,
                envFilePath: '.env',
            }),
            schedule_1.ScheduleModule.forRoot(),
            bullmq_1.BullModule.forRootAsync({
                inject: [config_1.ConfigService],
                useFactory: (config) => ({
                    connection: {
                        host: config.get('REDIS_HOST', '127.0.0.1'),
                        port: Number(config.get('REDIS_PORT', '6379')),
                        password: config.get('REDIS_PASSWORD') || undefined,
                        maxRetriesPerRequest: null,
                    },
                    defaultJobOptions: {
                        removeOnComplete: true,
                        removeOnFail: 100,
                    },
                }),
            }),
            throttler_1.ThrottlerModule.forRoot([
                {
                    ttl: 60000,
                    limit: 100,
                },
            ]),
            common_module_1.CommonModule,
            admin_module_1.AdminModule,
            firebase_module_1.FirebaseModule,
            courses_module_1.CoursesModule,
            sections_module_1.SectionsModule,
            lectures_module_1.LecturesModule,
            quizzes_module_1.QuizzesModule,
            missions_module_1.MissionsModule,
            micro_lessons_module_1.MicroLessonsModule,
            templates_module_1.TemplatesModule,
            rubric_module_1.RubricModule,
            uploads_module_1.UploadsModule,
            streaming_module_1.StreamingModule,
            transcoding_module_1.TranscodingModule,
            progress_module_1.ProgressModule,
            completion_module_1.CompletionModule,
            users_module_1.UsersModule,
            enrollment_module_1.EnrollmentModule,
            submissions_module_1.SubmissionsModule,
            catalog_module_1.CatalogModule,
            auth_module_1.AuthModule,
        ],
        controllers: [app_controller_1.AppController],
        providers: [
            {
                provide: core_1.APP_GUARD,
                useClass: throttler_1.ThrottlerGuard,
            },
        ],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map