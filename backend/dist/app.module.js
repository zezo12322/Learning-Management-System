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
const app_controller_1 = require("./app.controller");
const config_module_1 = require("@nestjs/config/dist/config.module");
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
const progress_module_1 = require("./progress/progress.module");
const completion_module_1 = require("./completion/completion.module");
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
            progress_module_1.ProgressModule,
            completion_module_1.CompletionModule,
        ],
        controllers: [app_controller_1.AppController],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map