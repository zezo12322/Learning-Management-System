import type { Role } from '@/lib/types'

/**
 * Routes that belong to the teaching/management side of the product and must
 * never be rendered for a learner account.
 *
 * `exact` matters for `/courses`: `/courses` itself is the instructor authoring
 * list, while `/courses/:id` is the learner-facing course details page that the
 * catalogue and My Courses link to. Guarding the prefix would lock students out
 * of every course page, so that one entry matches the path only.
 */
const TEACHING_ROUTES: { path: string; exact?: boolean }[] = [
  { path: '/dashboard' },
  { path: '/courses', exact: true },
  { path: '/students' },
  { path: '/insights' },
  { path: '/uploads' },
  { path: '/studio' },
  // Assignment authoring and the grading queue. `/teaching` is a prefix on
  // purpose: anything added under it is guarded without touching this list, and
  // the learner-facing `/assignments` stays open.
  { path: '/teaching' },
]

/**
 * The quiz authoring editor lives at /quiz/:courseId/:lectureId while the
 * learner's take flow is the /take child of the same path — so this one cannot
 * be expressed as a prefix and gets its own matcher.
 */
const QUIZ_EDITOR = /^\/quiz\/[^/]+\/[^/]+\/?$/

/** Where a learner is sent when they land on a teaching route. */
export const LEARNER_HOME = '/home'

export function canTeach(roles: Role[]): boolean {
  return roles.includes('instructor') || roles.includes('admin')
}

/** True when `pathname` belongs to the instructor/admin side of the app. */
export function isTeachingRoute(pathname: string): boolean {
  if (QUIZ_EDITOR.test(pathname)) return true
  return TEACHING_ROUTES.some(({ path, exact }) =>
    exact ? pathname === path : pathname === path || pathname.startsWith(`${path}/`),
  )
}

/**
 * True when this account must not see this route.
 *
 * This is a UI guard: it stops a learner from opening an instructor screen by
 * URL, bookmark or a stale link. It is not the authorization boundary — the
 * NestJS API enforces roles on every authoring endpoint and answers 403
 * regardless of what the browser renders.
 */
export function isRouteForbidden(pathname: string, roles: Role[]): boolean {
  return isTeachingRoute(pathname) && !canTeach(roles)
}
