/**
 * Raw GraphQL for operations that must run with ADMIN privileges (bypassing
 * `@auth`), executed via the Data Connect service-level `:executeGraphql`
 * endpoint rather than the connector's `:executeQuery`/`:executeMutation`
 * endpoints (which always enforce `@auth`, even for a service-account caller).
 *
 * `:executeGraphql` accepts raw GraphQL, not connector operation *names*, so the
 * documents are duplicated here (without their `@auth` directive). Keep each one
 * in sync with its connector definition in `dataconnect/default/*.gql`.
 *
 * Bundling them in the backend (rather than reading the .gql files at runtime)
 * keeps this self-contained and deploy-safe — the backend doesn't need the
 * dataconnect/ source tree available in production.
 *
 * Only operations listed here are routed to the admin endpoint; anything else
 * called via `executeQueryAsAdmin`/`executeMutationAsAdmin` falls back to the
 * existing connector path unchanged.
 */
export const ADMIN_OPERATIONS: Record<string, string> = {
  // --- Granular progress worker (ProgressProcessor) ---
  GetLectureDuration: /* GraphQL */ `
    query GetLectureDuration($lectureId: UUID!) {
      courseLecture(id: $lectureId) {
        id
        duration
        section { course { id } }
      }
    }
  `,

  AdminUpsertLectureProgress: /* GraphQL */ `
    mutation AdminUpsertLectureProgress(
      $userId: String!
      $lectureId: UUID!
      $lastWatchedSecond: Int!
      $completedAt: Timestamp
    ) {
      lectureProgress_upsert(
        data: {
          userId: $userId
          lectureId: $lectureId
          lastWatchedSecond: $lastWatchedSecond
          completedAt: $completedAt
        }
      )
    }
  `,

  // --- Completion cascade (CompletionService admin path) ---
  GetCourseCompletionStatusForUser: /* GraphQL */ `
    query GetCourseCompletionStatusForUser($courseId: UUID!, $userId: String!) {
      sections: courseSections(
        where: { courseId: { eq: $courseId }, deletedAt: { eq: null } }
      ) {
        userCompletionLectures: courseLectures_on_section(
          where: { deletedAt: { eq: null } }
        ) {
          id
          userCompletionProgress: lectureProgresses_on_lecture(
            where: { userId: { eq: $userId } }
          ) {
            completedAt
          }
        }
      }
    }
  `,

  GetUserEnrollmentForCourseByUser: /* GraphQL */ `
    query GetUserEnrollmentForCourseByUser($courseId: UUID!, $userId: String!) {
      enrollments(
        where: {
          userId: { eq: $userId }
          courseId: { eq: $courseId }
          targetType: { eq: COURSE }
        }
      ) {
        id
        status
        completedAt
      }
    }
  `,

  UpdateEnrollmentStatus: /* GraphQL */ `
    mutation UpdateEnrollmentStatus(
      $enrollmentId: UUID!
      $status: EnrollmentStatus!
      $completedAt: Timestamp
    ) {
      enrollment_update(
        id: $enrollmentId
        data: { status: $status, completedAt: $completedAt }
      )
    }
  `,

  // --- Transcoding worker (TranscodingProcessor) ---
  AdminUpdateLecture: /* GraphQL */ `
    mutation AdminUpdateLecture(
      $lectureId: UUID!
      $title: String
      $type: LectureType
      $videoUrl: String
      $content: String
      $duration: Int
      $transcriptUrl: String
      $isFreePreview: Boolean
    ) {
      courseLecture_update(
        id: $lectureId
        data: {
          title: $title
          type: $type
          videoUrl: $videoUrl
          content: $content
          duration: $duration
          transcriptUrl: $transcriptUrl
          isFreePreview: $isFreePreview
          updatedAt_expr: "request.time"
        }
      )
    }
  `,

  // --- Denormalised course rating aggregate (RatingsService) ---
  AdminUpdateCourseRatingAggregate: /* GraphQL */ `
    mutation AdminUpdateCourseRatingAggregate(
      $courseId: UUID!
      $avgRating: Float!
      $ratingCount: Int!
    ) {
      course_update(
        id: $courseId
        data: { avgRating: $avgRating, ratingCount: $ratingCount }
      )
    }
  `,

  // --- Server-side quiz expiry sweep (QuizExpiryTask cron) ---
  GetExpiredAttempts: /* GraphQL */ `
    query GetExpiredAttempts {
      quizAttempts(where: { completedAt: { eq: null } }) {
        id
        startedAt
        quiz { id timeLimitMinutes }
      }
    }
  `,
};
