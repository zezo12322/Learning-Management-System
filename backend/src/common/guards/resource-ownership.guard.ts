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

/**
 * The leaf's owning course/mission, plus the resolved owner node. The node
 * carries author/createdBy when the deployed connector returns them, letting
 * the guard fast-path a creator without a second query; `id` is kept for the
 * authoritative fallback access query (used for assigned instructors and when
 * the connector predates the enriched fields).
 */
type ResolvedOwner =
  | { kind: 'course'; id: string; node: any }
  | { kind: 'mission'; id: string; node: any };

/**
 * Closes the leaf-id authorization gap: routes that act on a child resource by
 * id (quizId, questionId, optionId, lectureId, sectionId, microLessonId,
 * criterionId, templateId) often also carry a :courseId/:missionId that a
 * caller could spoof to a resource they DO own. This guard ignores the route's
 * course/mission and instead resolves the *actual* owner of the leaf, then
 * checks ownership. Admins bypass.
 *
 * The leaf→owner queries also return author/createdBy, so a course/mission
 * *creator* is authorized from that single query. Assigned instructors (and
 * older connectors that omit those fields) fall through to the authoritative
 * AccessService query, which also checks the assigned-instructor link. The fast
 * path only ever allows, so behavior is correct regardless of deploy order.
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
    (id: string, token: string) => Promise<ResolvedOwner | null>
  > = {
    quiz: async (id, token) => {
      const d = await this.dc.executeQuery('GetQuizSettings', { quizId: id }, token);
      return this.toCourse(d?.courseQuiz?.lecture?.section?.course);
    },
    question: async (id, token) => {
      const d = await this.dc.executeQuery('GetQuestionCourse', { questionId: id }, token);
      return this.toCourse(d?.quizQuestion?.quiz?.lecture?.section?.course);
    },
    option: async (id, token) => {
      const d = await this.dc.executeQuery('GetOptionCourse', { optionId: id }, token);
      return this.toCourse(d?.quizOption?.question?.quiz?.lecture?.section?.course);
    },
    lecture: async (id, token) => {
      const d = await this.dc.executeQuery('GetLectureContent', { lectureId: id }, token);
      return this.toCourse(d?.courseLecture?.section?.course);
    },
    section: async (id, token) => {
      const d = await this.dc.executeQuery('GetSectionCourse', { sectionId: id }, token);
      return this.toCourse(d?.courseSection?.course);
    },
    microLesson: async (id, token) => {
      const d = await this.dc.executeQuery('GetMicroLessonMission', { microLessonId: id }, token);
      return this.toMission(d?.missionMicroLesson?.mission);
    },
    criterion: async (id, token) => {
      const d = await this.dc.executeQuery('GetCriterionMission', { criterionId: id }, token);
      return this.toMission(d?.rubricCriterion?.mission);
    },
    template: async (id, token) => {
      const d = await this.dc.executeQuery('GetTemplateMission', { templateId: id }, token);
      return this.toMission(d?.missionTemplate?.mission);
    },
  };

  private toCourse(course: any): ResolvedOwner | null {
    return course?.id ? { kind: 'course', id: course.id, node: course } : null;
  }

  private toMission(mission: any): ResolvedOwner | null {
    return mission?.id ? { kind: 'mission', id: mission.id, node: mission } : null;
  }

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

    const resolved = await this.resolvers[meta.type](leafId, token);
    if (!resolved) throw new NotFoundException(`${meta.type} ${leafId} not found`);

    // Fast path: the leaf query carries author/createdBy, so a creator is
    // authorized from this single query. A non-creator (incl. an assigned
    // instructor) or an older connector that omits these fields is NOT denied
    // here — it falls through to the authoritative access query, which also
    // checks the assigned-instructor link. isAdmin is false (admins returned above).
    if (resolved.kind === 'course') {
      if (this.access.isCourseCreator(resolved.node, uid)) return true;
      await this.access.assertCourseAccess(resolved.id, uid, token, false);
    } else {
      if (this.access.isMissionCreator(resolved.node, uid)) return true;
      await this.access.assertMissionAccess(resolved.id, uid, token, false);
    }
    return true;
  }
}
