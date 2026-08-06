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
  // --- Readiness probe (HealthService, KAN-147) ---
  // The cheapest real read available: one row from a small reference table.
  // Proves in a single round trip that Data Connect is reachable, that the
  // Postgres behind it is answering, and that the service-account credential is
  // still valid. Runs on a monitor's cadence, so it must stay this small — and
  // it must never be added to FORCE_ADMIN_OPERATIONS, since no user-token path
  // should ever reach it.
  HealthProbe: /* GraphQL */ `
    query HealthProbe {
      categories(limit: 1) {
        id
      }
    }
  `,

  // --- Granular progress worker (ProgressProcessor) ---
  GetLectureDuration: /* GraphQL */ `
    query GetLectureDuration($lectureId: UUID!) {
      courseLecture(id: $lectureId) {
        id
        duration
        section {
          course {
            id
          }
        }
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

  // Payment rows are NO_ACCESS in the connector (a client could otherwise
  // fabricate them). The connector variant derives userId from auth.uid, which
  // does not exist on the admin endpoint — so this variant takes the verified
  // uid explicitly from PaymentsService.
  LogPayment: /* GraphQL */ `
    mutation LogPayment(
      $userId: String!
      $gateway: PaymentGateway!
      $referenceId: String!
      $amount: Int!
      $currency: String = "EGP"
      $customerEmailSnapshot: String!
    ) {
      payment_insert(
        data: {
          userId: $userId
          customerEmailSnapshot: $customerEmailSnapshot
          gateway: $gateway
          status: PENDING
          referenceId: $referenceId
          amount: $amount
          currency: $currency
        }
      )
    }
  `,

  AddPaymentItem: /* GraphQL */ `
    mutation AddPaymentItem(
      $paymentId: UUID!
      $targetType: PaymentItemTarget!
      $courseId: UUID
      $missionId: UUID
      $subscriptionTierId: UUID
      $price: Int!
    ) {
      paymentItem_insert(
        data: {
          paymentId: $paymentId
          targetType: $targetType
          courseId: $courseId
          missionId: $missionId
          subscriptionTierId: $subscriptionTierId
          priceAtPurchase: $price
        }
      )
    }
  `,

  UpdatePaymentStatusByReference: /* GraphQL */ `
    mutation UpdatePaymentStatusByReference(
      $referenceId: String!
      $status: PaymentStatus!
    ) {
      payment_updateMany(
        where: { referenceId: { eq: $referenceId } }
        data: { status: $status }
      )
    }
  `,

  GetPaymentDetailsByReference: /* GraphQL */ `
    query GetPaymentDetailsByReference($referenceId: String!) {
      payments(where: { referenceId: { eq: $referenceId } }) {
        id
        userId
        paymentItems_on_payment {
          targetType
          courseId
          missionId
          subscriptionTierId
        }
      }
    }
  `,

  // Paid-course enrollment gate (EnrollmentService): does this user have a
  // COMPLETED payment that includes the course they are trying to enroll in?
  GetUserCompletedPayments: /* GraphQL */ `
    query GetUserCompletedPayments($userId: String!) {
      payments(where: { userId: { eq: $userId }, status: { eq: COMPLETED } }) {
        id
        paymentItems_on_payment {
          courseId
        }
      }
    }
  `,

  // --- Transcoding worker (TranscodingProcessor) ---
  AdminUpdateLecture: /* GraphQL */ `
    mutation AdminUpdateLecture(
      $lectureId: UUID!
      $title: String
      $type: LectureType
      $videoUrl: String
      $originalVideoUrl: String
      $aiJobId: String
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
          originalVideoUrl: $originalVideoUrl
          aiJobId: $aiJobId
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
        quiz {
          id
          timeLimitMinutes
        }
      }
    }
  `,

  // ==========================================================================
  // PRIVILEGED AUTHORING OPERATIONS (RBAC hardening).
  //
  // These mirror the connector operations that are now @auth(level: NO_ACCESS)
  // in dataconnect/default/*.gql. They are NOT callable with an end-user token
  // (so the generated web/mobile client SDKs cannot reach them). The backend
  // runs them via the service account after its NestJS ownership guards
  // (CourseAccessGuard / ResourceOwnershipGuard) have authorized the caller.
  //
  // Keep each body in sync with its .gql definition (minus @auth). Ops that used
  // `auth.uid` take an explicit id variable ($authorId / $graderId), since the
  // service account carries no auth.uid.
  // ==========================================================================

  // --- Course ---
  AdminCreateCourse: /* GraphQL */ `
    mutation AdminCreateCourse(
      $title: String!
      $description: String
      $price: Int!
      $language: String!
      $level: CourseLevel!
      $categoryId: UUID!
      $tags: [String!]!
      $authorId: String!
    ) {
      course_insert(
        data: {
          title: $title
          description: $description
          price: $price
          language: $language
          level: $level
          categoryId: $categoryId
          tags: $tags
          authorId: $authorId
          createdById: $authorId
          status: DRAFT
        }
      )
    }
  `,
  AdminUpdateCourse: /* GraphQL */ `
    mutation AdminUpdateCourse(
      $courseId: UUID!
      $title: String
      $description: String
      $price: Int
      $language: String
      $level: CourseLevel
      $categoryId: UUID
      $tags: [String!]
      $thumbnail: String
    ) {
      course_update(
        id: $courseId
        data: {
          title: $title
          description: $description
          price: $price
          language: $language
          level: $level
          categoryId: $categoryId
          tags: $tags
          thumbnail: $thumbnail
          updatedAt_expr: "request.time"
        }
      )
    }
  `,
  AdminUpdateCourseStatus: /* GraphQL */ `
    mutation AdminUpdateCourseStatus($courseId: UUID!, $status: CourseStatus!) {
      course_update(
        id: $courseId
        data: { status: $status, updatedAt_expr: "request.time" }
      )
    }
  `,

  // --- Section ---
  AdminCreateSection: /* GraphQL */ `
    mutation AdminCreateSection(
      $courseId: UUID!
      $title: String!
      $order: Int!
    ) {
      courseSection_insert(
        data: { courseId: $courseId, title: $title, order: $order }
      )
    }
  `,
  AdminUpdateSection: /* GraphQL */ `
    mutation AdminUpdateSection($sectionId: UUID!, $title: String!) {
      courseSection_update(
        id: $sectionId
        data: { title: $title, updatedAt_expr: "request.time" }
      )
    }
  `,
  AdminSoftDeleteSection: /* GraphQL */ `
    mutation AdminSoftDeleteSection($sectionId: UUID!) {
      courseSection_update(
        id: $sectionId
        data: { deletedAt_expr: "request.time", updatedAt_expr: "request.time" }
      )
    }
  `,
  AdminUpdateSectionOrder: /* GraphQL */ `
    mutation AdminUpdateSectionOrder($sectionId: UUID!, $order: Int!) {
      courseSection_update(
        id: $sectionId
        data: { order: $order, updatedAt_expr: "request.time" }
      )
    }
  `,

  // --- Lecture (AdminUpdateLecture already defined above for the transcoder) ---
  AdminCreateLectureFull: /* GraphQL */ `
    mutation AdminCreateLectureFull(
      $sectionId: UUID!
      $title: String!
      $type: LectureType!
      $videoUrl: String
      $originalVideoUrl: String
      $aiJobId: String
      $content: String
      $duration: Int
      $transcriptUrl: String
      $isFreePreview: Boolean!
      $order: Int!
    ) {
      courseLecture_insert(
        data: {
          sectionId: $sectionId
          title: $title
          type: $type
          videoUrl: $videoUrl
          originalVideoUrl: $originalVideoUrl
          aiJobId: $aiJobId
          content: $content
          duration: $duration
          transcriptUrl: $transcriptUrl
          isFreePreview: $isFreePreview
          order: $order
        }
      )
    }
  `,
  AdminSoftDeleteLecture: /* GraphQL */ `
    mutation AdminSoftDeleteLecture($lectureId: UUID!) {
      courseLecture_update(
        id: $lectureId
        data: { deletedAt_expr: "request.time", updatedAt_expr: "request.time" }
      )
    }
  `,
  AdminUpdateLectureOrder: /* GraphQL */ `
    mutation AdminUpdateLectureOrder($lectureId: UUID!, $order: Int!) {
      courseLecture_update(
        id: $lectureId
        data: { order: $order, updatedAt_expr: "request.time" }
      )
    }
  `,
  AdminMoveLectureToSection: /* GraphQL */ `
    mutation AdminMoveLectureToSection(
      $lectureId: UUID!
      $newSectionId: UUID!
      $order: Int!
    ) {
      courseLecture_update(
        id: $lectureId
        data: {
          sectionId: $newSectionId
          order: $order
          updatedAt_expr: "request.time"
        }
      )
    }
  `,
  AdminSoftDeleteLecturesBySection: /* GraphQL */ `
    mutation AdminSoftDeleteLecturesBySection($sectionId: UUID!) {
      courseLecture_updateMany(
        where: { sectionId: { eq: $sectionId }, deletedAt: { eq: null } }
        data: { deletedAt_expr: "request.time", updatedAt_expr: "request.time" }
      )
    }
  `,

  // --- Course instructors ---
  AdminAddCourseInstructor: /* GraphQL */ `
    mutation AdminAddCourseInstructor($courseId: UUID!, $userId: String!) {
      courseInstructor_insert(data: { courseId: $courseId, userId: $userId })
    }
  `,
  AdminRemoveCourseInstructor: /* GraphQL */ `
    mutation AdminRemoveCourseInstructor($courseId: UUID!, $userId: String!) {
      courseInstructor_delete(key: { courseId: $courseId, userId: $userId })
    }
  `,

  // --- Quiz builder (+ answer-key reads) ---
  AdminGetQuiz: /* GraphQL */ `
    query AdminGetQuiz($quizId: UUID!) {
      courseQuiz(id: $quizId) {
        id
        passingScore
        maxAttempts
        timeLimitMinutes
        createdAt
        updatedAt
        lecture {
          id
          title
          section {
            course {
              id
            }
          }
        }
        adminQuestions: quizQuestions_on_quiz(
          where: { deletedAt: { eq: null } }
          orderBy: [{ order: ASC }]
        ) {
          id
          questionText
          order
          points
          explanation
          adminOptions: quizOptions_on_question(orderBy: [{ order: ASC }]) {
            id
            text
            order
            isCorrect
          }
        }
      }
    }
  `,
  GetQuestionOptions: /* GraphQL */ `
    query GetQuestionOptions($questionId: UUID!) {
      quizOptions(
        where: { questionId: { eq: $questionId } }
        orderBy: [{ order: ASC }]
      ) {
        id
        text
        order
        isCorrect
      }
    }
  `,
  AdminCreateQuiz: /* GraphQL */ `
    mutation AdminCreateQuiz(
      $lectureId: UUID!
      $passingScore: Float!
      $maxAttempts: Int!
      $timeLimitMinutes: Int
    ) {
      courseQuiz_insert(
        data: {
          lectureId: $lectureId
          passingScore: $passingScore
          maxAttempts: $maxAttempts
          timeLimitMinutes: $timeLimitMinutes
        }
      )
    }
  `,
  AdminUpdateQuiz: /* GraphQL */ `
    mutation AdminUpdateQuiz(
      $quizId: UUID!
      $passingScore: Float
      $maxAttempts: Int
      $timeLimitMinutes: Int
    ) {
      courseQuiz_update(
        id: $quizId
        data: {
          passingScore: $passingScore
          maxAttempts: $maxAttempts
          timeLimitMinutes: $timeLimitMinutes
          updatedAt_expr: "request.time"
        }
      )
    }
  `,
  AdminDeleteQuiz: /* GraphQL */ `
    mutation AdminDeleteQuiz($quizId: UUID!) {
      courseQuiz_delete(id: $quizId)
    }
  `,
  AdminCreateQuizQuestion: /* GraphQL */ `
    mutation AdminCreateQuizQuestion(
      $quizId: UUID!
      $questionText: String!
      $order: Int!
      $points: Float!
      $explanation: String
    ) {
      quizQuestion_insert(
        data: {
          quizId: $quizId
          questionText: $questionText
          order: $order
          points: $points
          explanation: $explanation
        }
      )
    }
  `,
  AdminUpdateQuizQuestion: /* GraphQL */ `
    mutation AdminUpdateQuizQuestion(
      $questionId: UUID!
      $questionText: String
      $points: Float
      $explanation: String
    ) {
      quizQuestion_update(
        id: $questionId
        data: {
          questionText: $questionText
          points: $points
          explanation: $explanation
        }
      )
    }
  `,
  AdminSoftDeleteQuizQuestion: /* GraphQL */ `
    mutation AdminSoftDeleteQuizQuestion($questionId: UUID!) {
      quizQuestion_update(
        id: $questionId
        data: { deletedAt_expr: "request.time" }
      )
    }
  `,
  AdminUpdateQuizQuestionOrder: /* GraphQL */ `
    mutation AdminUpdateQuizQuestionOrder($questionId: UUID!, $order: Int!) {
      quizQuestion_update(id: $questionId, data: { order: $order })
    }
  `,
  AdminCreateQuizOption: /* GraphQL */ `
    mutation AdminCreateQuizOption(
      $questionId: UUID!
      $text: String!
      $order: Int!
      $isCorrect: Boolean!
    ) {
      quizOption_insert(
        data: {
          questionId: $questionId
          text: $text
          order: $order
          isCorrect: $isCorrect
        }
      )
    }
  `,
  AdminUpdateQuizOption: /* GraphQL */ `
    mutation AdminUpdateQuizOption(
      $optionId: UUID!
      $text: String
      $isCorrect: Boolean
    ) {
      quizOption_update(
        id: $optionId
        data: { text: $text, isCorrect: $isCorrect }
      )
    }
  `,
  AdminDeleteQuizOption: /* GraphQL */ `
    mutation AdminDeleteQuizOption($optionId: UUID!) {
      quizOption_delete(id: $optionId)
    }
  `,
  AdminUpdateQuizOptionOrder: /* GraphQL */ `
    mutation AdminUpdateQuizOptionOrder($optionId: UUID!, $order: Int!) {
      quizOption_update(id: $optionId, data: { order: $order })
    }
  `,

  // --- Mission ---
  AdminCreateMission: /* GraphQL */ `
    mutation AdminCreateMission(
      $title: String!
      $scenarioDescription: String!
      $durationMinutes: Int!
      $categoryId: UUID!
      $difficulty: MissionDifficulty!
      $skillsTested: [String!]!
      $courseId: UUID
      $authorId: String!
    ) {
      mission_insert(
        data: {
          title: $title
          scenarioDescription: $scenarioDescription
          durationMinutes: $durationMinutes
          categoryId: $categoryId
          difficulty: $difficulty
          skillsTested: $skillsTested
          courseId: $courseId
          authorId: $authorId
          createdById: $authorId
        }
      )
    }
  `,
  AdminUpdateMission: /* GraphQL */ `
    mutation AdminUpdateMission(
      $missionId: UUID!
      $title: String
      $scenarioDescription: String
      $durationMinutes: Int
      $categoryId: UUID
      $difficulty: MissionDifficulty
      $skillsTested: [String!]
      $courseId: UUID
    ) {
      mission_update(
        id: $missionId
        data: {
          title: $title
          scenarioDescription: $scenarioDescription
          durationMinutes: $durationMinutes
          categoryId: $categoryId
          difficulty: $difficulty
          skillsTested: $skillsTested
          courseId: $courseId
          updatedAt_expr: "request.time"
        }
      )
    }
  `,
  AdminSoftDeleteMission: /* GraphQL */ `
    mutation AdminSoftDeleteMission($missionId: UUID!) {
      mission_update(id: $missionId, data: { deletedAt_expr: "request.time" })
    }
  `,

  // --- Micro-lessons ---
  AdminCreateMicroLesson: /* GraphQL */ `
    mutation AdminCreateMicroLesson(
      $missionId: UUID!
      $title: String!
      $type: LectureType!
      $assetUrl: String
      $content: String
      $durationSeconds: Int
      $order: Int!
    ) {
      missionMicroLesson_insert(
        data: {
          missionId: $missionId
          title: $title
          type: $type
          assetUrl: $assetUrl
          content: $content
          durationSeconds: $durationSeconds
          order: $order
        }
      )
    }
  `,
  AdminUpdateMicroLesson: /* GraphQL */ `
    mutation AdminUpdateMicroLesson(
      $microLessonId: UUID!
      $title: String
      $type: LectureType
      $assetUrl: String
      $content: String
      $durationSeconds: Int
    ) {
      missionMicroLesson_update(
        id: $microLessonId
        data: {
          title: $title
          type: $type
          assetUrl: $assetUrl
          content: $content
          durationSeconds: $durationSeconds
        }
      )
    }
  `,
  AdminDeleteMicroLesson: /* GraphQL */ `
    mutation AdminDeleteMicroLesson($microLessonId: UUID!) {
      missionMicroLesson_delete(id: $microLessonId)
    }
  `,
  AdminUpdateMicroLessonOrder: /* GraphQL */ `
    mutation AdminUpdateMicroLessonOrder($microLessonId: UUID!, $order: Int!) {
      missionMicroLesson_update(id: $microLessonId, data: { order: $order })
    }
  `,

  // --- Templates ---
  AdminCreateMissionTemplate: /* GraphQL */ `
    mutation AdminCreateMissionTemplate(
      $missionId: UUID!
      $title: String!
      $fileUrl: String!
      $fileType: String!
    ) {
      missionTemplate_insert(
        data: {
          missionId: $missionId
          title: $title
          fileUrl: $fileUrl
          fileType: $fileType
        }
      )
    }
  `,
  AdminDeleteMissionTemplate: /* GraphQL */ `
    mutation AdminDeleteMissionTemplate($templateId: UUID!) {
      missionTemplate_delete(id: $templateId)
    }
  `,
  // Template listing — enrollment/ownership gated in TemplatesService before this
  // runs (NO_ACCESS in the connector, so it's not client-SDK reachable).
  GetMissionTemplates: /* GraphQL */ `
    query GetMissionTemplates($missionId: UUID!) {
      missionTemplates(where: { missionId: { eq: $missionId } }) {
        id
        title
        fileUrl
        fileType
      }
    }
  `,

  // --- Rubric ---
  AdminCreateRubricCriterion: /* GraphQL */ `
    mutation AdminCreateRubricCriterion(
      $missionId: UUID!
      $criterionName: String!
      $description: String
      $maxPoints: Float!
      $order: Int!
    ) {
      rubricCriterion_insert(
        data: {
          missionId: $missionId
          criterionName: $criterionName
          description: $description
          maxPoints: $maxPoints
          order: $order
        }
      )
    }
  `,
  AdminUpdateRubricCriterion: /* GraphQL */ `
    mutation AdminUpdateRubricCriterion(
      $criterionId: UUID!
      $criterionName: String
      $description: String
      $maxPoints: Float
    ) {
      rubricCriterion_update(
        id: $criterionId
        data: {
          criterionName: $criterionName
          description: $description
          maxPoints: $maxPoints
        }
      )
    }
  `,
  AdminDeleteRubricCriterion: /* GraphQL */ `
    mutation AdminDeleteRubricCriterion($criterionId: UUID!) {
      rubricCriterion_delete(id: $criterionId)
    }
  `,
  AdminUpdateRubricCriterionOrder: /* GraphQL */ `
    mutation AdminUpdateRubricCriterionOrder(
      $criterionId: UUID!
      $order: Int!
    ) {
      rubricCriterion_update(id: $criterionId, data: { order: $order })
    }
  `,

  // --- Submission grading ---
  GradeSubmission: /* GraphQL */ `
    mutation GradeSubmission(
      $submissionId: UUID!
      $feedback: String
      $graderId: String!
    ) {
      missionSubmission_update(
        id: $submissionId
        data: {
          graderId: $graderId
          status: GRADED
          feedback: $feedback
          updatedAt_expr: "request.time"
        }
      )
    }
  `,
  AddCriterionScore: /* GraphQL */ `
    mutation AddCriterionScore(
      $submissionId: UUID!
      $criterionId: UUID!
      $score: Float!
    ) {
      missionSubmissionScore_upsert(
        data: {
          submissionId: $submissionId
          criterionId: $criterionId
          score: $score
        }
      )
    }
  `,

  // --- Course soft-delete (replaces the stale non-existent AdminDeleteCourse) ---
  AdminSoftDeleteCourse: /* GraphQL */ `
    mutation AdminSoftDeleteCourse($courseId: UUID!) {
      course_update(
        id: $courseId
        data: {
          deletedAt_expr: "request.time"
          status: ARCHIVED
          updatedAt_expr: "request.time"
        }
      )
    }
  `,

  // --- Privileged authoring READS (locked so instructors can't read others'
  //     courses/missions/instructor-lists/submissions via the client SDK) ---
  AdminGetCourse: /* GraphQL */ `
    query AdminGetCourse($courseId: UUID!) {
      course(id: $courseId) {
        id
        title
        description
        price
        status
        language
        level
        thumbnail
        tags
        deletedAt
        createdAt
        updatedAt
        category {
          id
          name
        }
        author {
          id
          name
          email
          avatar
        }
        createdBy {
          id
          name
        }
        instructors: courseInstructors_on_course {
          user {
            id
            name
            email
            avatar
          }
        }
        adminSections: courseSections_on_course(
          where: { deletedAt: { eq: null } }
          orderBy: [{ order: ASC }]
        ) {
          id
          title
          order
          adminLectures: courseLectures_on_section(
            where: { deletedAt: { eq: null } }
            orderBy: [{ order: ASC }]
          ) {
            id
            title
            type
            videoUrl
            content
            duration
            transcriptUrl
            isFreePreview
            order
          }
        }
      }
    }
  `,
  AdminGetMission: /* GraphQL */ `
    query AdminGetMission($missionId: UUID!) {
      mission(id: $missionId) {
        id
        title
        scenarioDescription
        durationMinutes
        difficulty
        skillsTested
        deletedAt
        createdAt
        updatedAt
        category {
          id
          name
        }
        course {
          id
          title
        }
        author {
          id
          name
          email
          avatar
        }
        createdBy {
          id
          name
        }
        microLessons: missionMicroLessons_on_mission(
          orderBy: [{ order: ASC }]
        ) {
          id
          title
          type
          assetUrl
          content
          durationSeconds
          order
        }
        templates: missionTemplates_on_mission {
          id
          title
          fileUrl
          fileType
        }
        criteria: rubricCriteria_on_mission(orderBy: [{ order: ASC }]) {
          id
          criterionName
          description
          maxPoints
          order
        }
      }
    }
  `,
  GetCourseInstructors: /* GraphQL */ `
    query GetCourseInstructors($courseId: UUID!) {
      courseInstructors(where: { courseId: { eq: $courseId } }) {
        user {
          id
          name
          email
          avatar
        }
      }
    }
  `,

  // Instructor course-overview analytics (CoursesService.getOverview reduces
  // these raw rows into the summary counts). NO_ACCESS in the connector; run via
  // the service account after CourseAccessGuard verifies ownership.
  AdminGetCourseOverview: /* GraphQL */ `
    query AdminGetCourseOverview($courseId: UUID!) {
      course(id: $courseId) {
        id
        title
        description
        price
        status
        language
        level
        thumbnail
        tags
        avgRating
        ratingCount
        createdAt
        updatedAt
        deletedAt
        category {
          id
          name
        }
        author {
          id
          name
          email
          avatar
        }
        createdBy {
          id
          name
        }
        instructors: courseInstructors_on_course {
          user {
            id
            name
            email
            avatar
          }
        }
        sections: courseSections_on_course(
          where: { deletedAt: { eq: null } }
          orderBy: [{ order: ASC }]
        ) {
          id
          title
          order
          lectures: courseLectures_on_section(
            where: { deletedAt: { eq: null } }
            orderBy: [{ order: ASC }]
          ) {
            id
            type
            duration
            progress: lectureProgresses_on_lecture {
              completedAt
              user {
                id
              }
            }
          }
        }
        enrollments: enrollments_on_course {
          status
          enrolledAt
          completedAt
          user {
            id
          }
        }
        ratings: courseRatings_on_course {
          rating
        }
        missions: missions_on_course(where: { deletedAt: { eq: null } }) {
          id
          title
          difficulty
          submissions: missionSubmissions_on_mission {
            status
          }
        }
      }
    }
  `,
  GetSubmissionForGrading: /* GraphQL */ `
    query GetSubmissionForGrading($submissionId: UUID!) {
      missionSubmission(id: $submissionId) {
        id
        status
        attemptNumber
        mission {
          id
        }
        student {
          id
        }
      }
    }
  `,

  // ==========================================================================
  // STUDENT-TAKING WRITE PATH (RBAC hardening).
  //
  // These mirror connector ops that are now @auth(level: NO_ACCESS). They were
  // previously @auth(level: USER) and therefore directly callable from the client
  // SDK, which bypassed QuizzesService/SubmissionsService and let a student
  // self-award a passing grade, submit into another user's attempt, or submit to
  // a mission without enrollment. They now run only via the service account, after
  // the services enforce enrollment / attempt limits / attempt ownership. Ops that
  // used auth.uid take an explicit $userId / $studentId (backend-verified caller).
  // ==========================================================================

  StartQuizAttempt: /* GraphQL */ `
    mutation StartQuizAttempt($quizId: UUID!, $userId: String!) {
      quizAttempt_insert(data: { userId: $userId, quizId: $quizId })
    }
  `,
  SubmitQuizAnswer: /* GraphQL */ `
    mutation SubmitQuizAnswer(
      $attemptId: UUID!
      $questionId: UUID!
      $optionId: UUID!
    ) {
      quizAttemptAnswer_upsert(
        data: {
          attemptId: $attemptId
          questionId: $questionId
          selectedOptionId: $optionId
        }
      )
    }
  `,
  FinishQuizAttemptIfOpen: /* GraphQL */ `
    mutation FinishQuizAttemptIfOpen(
      $attemptId: UUID!
      $score: Float!
      $passed: Boolean!
    ) {
      quizAttempt_updateMany(
        where: { id: { eq: $attemptId }, completedAt: { eq: null } }
        data: {
          score: $score
          passed: $passed
          completedAt_expr: "request.time"
        }
      )
    }
  `,
  GetQuizAttemptById: /* GraphQL */ `
    query GetQuizAttemptById($attemptId: UUID!) {
      quizAttempt(id: $attemptId) {
        id
        completedAt
        startedAt
        score
        passed
        user {
          id
        }
        quiz {
          id
          passingScore
          maxAttempts
          timeLimitMinutes
        }
      }
    }
  `,
  GetActiveQuizSession: /* GraphQL */ `
    query GetActiveQuizSession($attemptId: UUID!) {
      quizAttempt(id: $attemptId) {
        id
        startedAt
        completedAt
        user {
          id
        }
        quiz {
          timeLimitMinutes
          passingScore
        }
      }
    }
  `,
  GetAttemptAnswersWithCorrect: /* GraphQL */ `
    query GetAttemptAnswersWithCorrect($attemptId: UUID!) {
      quizAttemptAnswers(where: { attemptId: { eq: $attemptId } }) {
        question {
          id
          points
        }
        selectedOption {
          id
          isCorrect
        }
      }
    }
  `,
  SubmitMission: /* GraphQL */ `
    mutation SubmitMission(
      $missionId: UUID!
      $fileUrl: String!
      $studentId: String!
    ) {
      missionSubmission_insert(
        data: {
          missionId: $missionId
          studentId: $studentId
          fileUrl: $fileUrl
          status: PENDING
        }
      )
    }
  `,
  UpdateLectureProgress: /* GraphQL */ `
    mutation UpdateLectureProgress(
      $lectureId: UUID!
      $lastWatchedSecond: Int!
      $completedAt: Timestamp
      $userId: String!
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

  // --- Ratings (enrollment-gated + aggregate recompute run in the service) ---
  UpsertCourseRating: /* GraphQL */ `
    mutation UpsertCourseRating(
      $courseId: UUID!
      $rating: Int!
      $review: String
      $userId: String!
    ) {
      courseRating_upsert(
        data: {
          userId: $userId
          courseId: $courseId
          rating: $rating
          review: $review
          updatedAt_expr: "request.time"
        }
      )
    }
  `,
  DeleteCourseRating: /* GraphQL */ `
    mutation DeleteCourseRating($courseId: UUID!, $userId: String!) {
      courseRating_deleteMany(
        where: { userId: { eq: $userId }, courseId: { eq: $courseId } }
      )
    }
  `,

  // --- Student-safe quiz view (enrollment gated in the service) ---
  GetQuizQuestions: /* GraphQL */ `
    query GetQuizQuestions($lectureId: UUID!) {
      courseQuizs(where: { lectureId: { eq: $lectureId } }) {
        id
        passingScore
        maxAttempts
        timeLimitMinutes
        takeQuestions: quizQuestions_on_quiz(
          where: { deletedAt: { eq: null } }
          orderBy: [{ order: ASC }]
        ) {
          id
          questionText
          points
          takeOptions: quizOptions_on_question(orderBy: [{ order: ASC }]) {
            id
            text
          }
        }
      }
    }
  `,

  // --- Enrollment (EnrollmentService enforces PUBLISHED/exists/dedup first) ---
  EnrollInCourse: /* GraphQL */ `
    mutation EnrollInCourse($courseId: UUID!, $userId: String!) {
      enrollment_insert(
        data: {
          userId: $userId
          targetType: COURSE
          courseId: $courseId
          status: ACTIVE
        }
      )
    }
  `,
  EnrollInMission: /* GraphQL */ `
    mutation EnrollInMission($missionId: UUID!, $userId: String!) {
      enrollment_insert(
        data: {
          userId: $userId
          targetType: MISSION
          missionId: $missionId
          status: ACTIVE
        }
      )
    }
  `,
  GetEnrollmentForUserMission: /* GraphQL */ `
    query GetEnrollmentForUserMission($userId: String!, $missionId: UUID!) {
      enrollments(
        where: {
          userId: { eq: $userId }
          missionId: { eq: $missionId }
          targetType: { eq: MISSION }
        }
      ) {
        id
        status
        completedAt
      }
    }
  `,

  // --- Lecture content read (LecturesService.getContent gates access) ---
  GetLectureContent: /* GraphQL */ `
    query GetLectureContent($lectureId: UUID!) {
      courseLecture(id: $lectureId) {
        id
        title
        type
        videoUrl
        content
        duration
        transcriptUrl
        isFreePreview
        section {
          course {
            id
            author {
              id
            }
            createdBy {
              id
            }
          }
        }
      }
    }
  `,

  // --- Video descriptions (CoursesService strips gated descriptions per entitlement) ---
  GetCourseVideos: /* GraphQL */ `
    query GetCourseVideos($courseId: UUID!) {
      course(id: $courseId) {
        id
        title
        status
        deletedAt
        author {
          id
        }
        createdBy {
          id
        }
        videoSections: courseSections_on_course(
          where: { deletedAt: { eq: null } }
          orderBy: [{ order: ASC }]
        ) {
          id
          title
          videoLectures: courseLectures_on_section(
            where: { deletedAt: { eq: null }, type: { eq: VIDEO } }
            orderBy: [{ order: ASC }]
          ) {
            id
            title
            content
            duration
            isFreePreview
            order
          }
        }
      }
    }
  `,

  // --- Curriculum outline (CatalogService strips gated content per entitlement) ---
  GetCourseCurriculum: /* GraphQL */ `
    query GetCourseCurriculum($courseId: UUID!) {
      course(id: $courseId) {
        id
        title
        description
        language
        publishedSections: courseSections_on_course(
          where: { deletedAt: { eq: null } }
          orderBy: [{ order: ASC }]
        ) {
          id
          title
          publishedLectures: courseLectures_on_section(
            where: { deletedAt: { eq: null } }
            orderBy: [{ order: ASC }]
          ) {
            id
            title
            type
            content
            duration
            isFreePreview
          }
        }
      }
    }
  `,

  // --- Terms of Service (admin-only, @auth NO_ACCESS) ---
  CreateToS: /* GraphQL */ `
    mutation CreateToS(
      $version: String!
      $title: String!
      $contentHtml: String!
      $effectiveDate: Timestamp
    ) {
      termsOfService_insert(
        data: {
          version: $version
          title: $title
          contentHtml: $contentHtml
          effectiveAt: $effectiveDate
          isCurrent: false
        }
      )
    }
  `,

  PublishToS: /* GraphQL */ `
    mutation PublishToS($tosId: UUID!) {
      termsOfService_updateMany(
        where: { isCurrent: { eq: true } }
        data: { isCurrent: false, updatedAt_expr: "request.time" }
      )
      termsOfService_update(
        id: $tosId
        data: {
          isCurrent: true
          publishedAt_expr: "request.time"
          updatedAt_expr: "request.time"
        }
      )
    }
  `,

  UpdateToS: /* GraphQL */ `
    mutation UpdateToS(
      $tosId: UUID!
      $version: String
      $title: String
      $contentHtml: String
    ) {
      termsOfService_update(
        id: $tosId
        data: {
          version: $version
          title: $title
          contentHtml: $contentHtml
          updatedAt_expr: "request.time"
        }
      )
    }
  `,

  GetCurrentToS: /* GraphQL */ `
    query GetCurrentToS {
      termsOfServices(where: { isCurrent: { eq: true } }, limit: 1) {
        id
        version
        title
        contentHtml
        effectiveAt
        createdAt
        publishedAt
      }
    }
  `,

  GetToSById: /* GraphQL */ `
    query GetToSById($tosId: UUID!) {
      termsOfServices(where: { id: { eq: $tosId } }, limit: 1) {
        id
        version
        title
        contentHtml
        effectiveAt
        isCurrent
        createdAt
        publishedAt
      }
    }
  `,

  GetAllToS: /* GraphQL */ `
    query GetAllToS {
      termsOfServices(orderBy: { effectiveAt: DESC }) {
        id
        version
        title
        contentHtml
        effectiveAt
        isCurrent
        createdAt
      }
    }
  `,

  GetUserToSStatus: /* GraphQL */ `
    query GetUserToSStatus($uid: String!) {
      user(id: $uid) {
        id
        acceptedTosId
        tosAcceptedAt
      }
    }
  `,
};

/**
 * Operations that must ALWAYS run via the service-account `:executeGraphql`
 * path, even when a service calls them through the ordinary executeQuery /
 * executeMutation (with a user token). They are @auth(level: NO_ACCESS) in the
 * connector, so the user-token path would be rejected; DataConnectService
 * auto-routes these to the admin path instead. Every name here MUST have a body
 * in ADMIN_OPERATIONS above.
 *
 * This is the enforcement backbone of the RBAC hardening: the connector refuses
 * these ops to end-user tokens (blocking direct client-SDK calls), and only the
 * backend — after its ownership guards — can execute them.
 */
export const FORCE_ADMIN_OPERATIONS: ReadonlySet<string> = new Set([
  // Course
  'AdminCreateCourse',
  'AdminUpdateCourse',
  'AdminUpdateCourseStatus',
  // Section
  'AdminCreateSection',
  'AdminUpdateSection',
  'AdminSoftDeleteSection',
  'AdminUpdateSectionOrder',
  // Lecture
  'AdminCreateLectureFull',
  'AdminUpdateLecture',
  'AdminSoftDeleteLecture',
  'AdminUpdateLectureOrder',
  'AdminMoveLectureToSection',
  'AdminSoftDeleteLecturesBySection',
  // Course instructors
  'AdminAddCourseInstructor',
  'AdminRemoveCourseInstructor',
  // Quiz builder + answer-key reads
  'AdminGetQuiz',
  'GetQuestionOptions',
  'AdminCreateQuiz',
  'AdminUpdateQuiz',
  'AdminDeleteQuiz',
  'AdminCreateQuizQuestion',
  'AdminUpdateQuizQuestion',
  'AdminSoftDeleteQuizQuestion',
  'AdminUpdateQuizQuestionOrder',
  'AdminCreateQuizOption',
  'AdminUpdateQuizOption',
  'AdminDeleteQuizOption',
  'AdminUpdateQuizOptionOrder',
  // Mission
  'AdminCreateMission',
  'AdminUpdateMission',
  'AdminSoftDeleteMission',
  // Micro-lessons
  'AdminCreateMicroLesson',
  'AdminUpdateMicroLesson',
  'AdminDeleteMicroLesson',
  'AdminUpdateMicroLessonOrder',
  // Templates
  'AdminCreateMissionTemplate',
  'AdminDeleteMissionTemplate',
  // Template listing (enrollment/ownership gated in TemplatesService)
  'GetMissionTemplates',
  // Rubric
  'AdminCreateRubricCriterion',
  'AdminUpdateRubricCriterion',
  'AdminDeleteRubricCriterion',
  'AdminUpdateRubricCriterionOrder',
  // Grading
  'GradeSubmission',
  'AddCriterionScore',
  // Course soft-delete
  'AdminSoftDeleteCourse',
  // Privileged authoring reads
  'AdminGetCourse',
  'AdminGetMission',
  'GetCourseInstructors',
  'AdminGetCourseOverview',
  'GetSubmissionForGrading',
  // Student-taking write path (formerly @auth USER, directly client-callable)
  'StartQuizAttempt',
  'SubmitQuizAnswer',
  'FinishQuizAttemptIfOpen',
  'SubmitMission',
  'UpdateEnrollmentStatus',
  // Quiz-attempt reads (IDOR: attemptId not owner-scoped)
  'GetQuizAttemptById',
  'GetActiveQuizSession',
  'GetAttemptAnswersWithCorrect',
  // Lecture progress (sync path) — completion cascade trusts these rows
  'UpdateLectureProgress',
  // Ratings (enrollment-gated + aggregate recompute in the service)
  'UpsertCourseRating',
  'DeleteCourseRating',
  // Student-safe quiz view (enrollment gated in the service)
  'GetQuizQuestions',
  // Enrollment (EnrollmentService enforces PUBLISHED/exists/dedup)
  'EnrollInCourse',
  'EnrollInMission',
  'GetEnrollmentForUserMission',
  // Content reads gated in the service (getContent / catalog entitlement)
  'GetLectureContent',
  'GetCourseCurriculum',
  // Video descriptions gated in CoursesService (owner/admin/enrollee entitlement)
  'GetCourseVideos',
  // Payments
  'LogPayment',
  'UpdatePaymentStatusByReference',
  'GetPaymentDetailsByReference',
  // Terms of Service (admin-only, @auth NO_ACCESS)
  'CreateToS',
  'PublishToS',
  'UpdateToS',
  'GetCurrentToS',
  'GetToSById',
  'GetAllToS',
  'GetUserToSStatus',
]);
