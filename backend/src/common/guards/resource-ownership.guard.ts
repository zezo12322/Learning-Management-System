import {
  CanActivate,
  ExecutionContext,
  Injectable,
  ForbiddenException,
  NotFoundException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { DataConnectService } from '../../firebase/dataconnect.service';
import { AccessService } from '../services/access.service';
import {
  OWNS_RESOURCE_KEY,
  OwnsResourceMeta,
  OwnedResourceType,
} from '../decorators/owns-resource.decorator';

/** Either a course-rooted or mission-rooted ownership target. */
type OwnershipTarget = { course: string } | { mission: string };

/**
 * Closes the leaf-id authorization gap: routes that act on a child resource by
 * id (quizId, questionId, optionId, lectureId, sectionId, microLessonId,
 * criterionId, templateId) often also carry a :courseId/:missionId that a
 * caller could spoof to a resource they DO own. This guard ignores the route's
 * course/mission and instead resolves the *actual* owner of the leaf, then
 * checks ownership. Admins bypass.
 *
 * MUST run after FirebaseAuthGuard + RolesGuard (reads `request.userRoles`).
 * Activated by the @OwnsResource decorator.
 */
@Injectable()
export class ResourceOwnershipGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    private readonly dc: DataConnectService,
    private readonly access: AccessService,
  ) {}

  /** Resolves each leaf id to its owning course (or mission, for mission children). */
  private readonly resolvers: Record<
    OwnedResourceType,
    (id: string, token: string) => Promise<OwnershipTarget | null>
  > = {
    quiz: async (id, token) => {
      const d = await this.dc.executeQuery('GetQuizSettings', { quizId: id }, token);
      const c = d?.courseQuiz?.lecture?.section?.course?.id;
      return c ? { course: c } : null;
    },
    question: async (id, token) => {
      const d = await this.dc.executeQuery('GetQuestionCourse', { questionId: id }, token);
      const c = d?.quizQuestion?.quiz?.lecture?.section?.course?.id;
      return c ? { course: c } : null;
    },
    option: async (id, token) => {
      const d = await this.dc.executeQuery('GetOptionCourse', { optionId: id }, token);
      const c = d?.quizOption?.question?.quiz?.lecture?.section?.course?.id;
      return c ? { course: c } : null;
    },
    lecture: async (id, token) => {
      const d = await this.dc.executeQuery('GetLectureContent', { lectureId: id }, token);
      const c = d?.courseLecture?.section?.course?.id;
      return c ? { course: c } : null;
    },
    section: async (id, token) => {
      const d = await this.dc.executeQuery('GetSectionCourse', { sectionId: id }, token);
      const c = d?.courseSection?.course?.id;
      return c ? { course: c } : null;
    },
    microLesson: async (id, token) => {
      const d = await this.dc.executeQuery('GetMicroLessonMission', { microLessonId: id }, token);
      const m = d?.missionMicroLesson?.mission?.id;
      return m ? { mission: m } : null;
    },
    criterion: async (id, token) => {
      const d = await this.dc.executeQuery('GetCriterionMission', { criterionId: id }, token);
      const m = d?.rubricCriterion?.mission?.id;
      return m ? { mission: m } : null;
    },
    template: async (id, token) => {
      const d = await this.dc.executeQuery('GetTemplateMission', { templateId: id }, token);
      const m = d?.missionTemplate?.mission?.id;
      return m ? { mission: m } : null;
    },
  };

  async canActivate(ctx: ExecutionContext): Promise<boolean> {
    const meta = this.reflector.getAllAndOverride<OwnsResourceMeta>(OWNS_RESOURCE_KEY, [
      ctx.getHandler(),
      ctx.getClass(),
    ]);
    if (!meta) return true;

    const request = ctx.switchToHttp().getRequest();
    if ((request.userRoles ?? []).includes('admin')) return true;

    const leafId = request.params?.[meta.param];
    if (!leafId) throw new ForbiddenException(`Missing ${meta.param} on this route`);

    const uid: string | undefined = request.user?.uid;
    const token = this.dc.extractToken(request);

    const target = await this.resolvers[meta.type](leafId, token);
    if (!target) throw new NotFoundException(`${meta.type} ${leafId} not found`);

    // isAdmin is false here — admins already returned above.
    if ('course' in target) {
      await this.access.assertCourseAccess(target.course, uid, token, false);
    } else {
      await this.access.assertMissionAccess(target.mission, uid, token, false);
    }
    return true;
  }
}
