import { SetMetadata } from '@nestjs/common';

/** Leaf resources whose ownership can be resolved up to a course/mission. */
export type OwnedResourceType =
  | 'quiz'
  | 'question'
  | 'option'
  | 'lecture'
  | 'section'
  | 'microLesson'
  | 'criterion'
  | 'template';

export const OWNS_RESOURCE_KEY = 'owns_resource';

export interface OwnsResourceMeta {
  type: OwnedResourceType;
  param: string;
}

/** Conventional route-param name for each resource type. */
const DEFAULT_PARAM: Record<OwnedResourceType, string> = {
  quiz: 'quizId',
  question: 'questionId',
  option: 'optionId',
  lecture: 'lectureId',
  section: 'sectionId',
  microLesson: 'microLessonId',
  criterion: 'criterionId',
  template: 'templateId',
};

/**
 * Marks a route as operating on a leaf resource identified by a route param.
 * ResourceOwnershipGuard resolves that leaf up to its owning course/mission and
 * verifies the caller owns it — so trusting the route's :courseId is no longer
 * required. Example: `@OwnsResource('quiz')` reads `:quizId`.
 */
export const OwnsResource = (type: OwnedResourceType, param?: string) =>
  SetMetadata(OWNS_RESOURCE_KEY, {
    type,
    param: param ?? DEFAULT_PARAM[type],
  } as OwnsResourceMeta);
