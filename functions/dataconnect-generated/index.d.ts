import { ConnectorConfig, DataConnect, QueryRef, QueryPromise, ExecuteQueryOptions, MutationRef, MutationPromise, DataConnectSettings } from 'firebase/data-connect';

export const connectorConfig: ConnectorConfig;
export const dataConnectSettings: DataConnectSettings;

export type TimestampString = string;
export type UUIDString = string;
export type Int64String = string;
export type DateString = string;


export enum AttendanceMethod {
  QR = "QR",
  MANUAL = "MANUAL",
};

export enum AttendanceStatus {
  PRESENT = "PRESENT",
  LATE = "LATE",
  EXCUSED = "EXCUSED",
  UNEXCUSED = "UNEXCUSED",
};

export enum BillingCycle {
  MONTHLY = "MONTHLY",
  QUARTERLY = "QUARTERLY",
  YEARLY = "YEARLY",
};

export enum CertificateTarget {
  COURSE = "COURSE",
  MISSION = "MISSION",
};

export enum CourseLevel {
  BEGINNER = "BEGINNER",
  INTERMEDIATE = "INTERMEDIATE",
  ADVANCED = "ADVANCED",
};

export enum CourseStatus {
  DRAFT = "DRAFT",
  PUBLISHED = "PUBLISHED",
  ARCHIVED = "ARCHIVED",
};

export enum EnrollmentStatus {
  ACTIVE = "ACTIVE",
  COMPLETED = "COMPLETED",
  DROPPED = "DROPPED",
  SUSPENDED = "SUSPENDED",
};

export enum LectureType {
  VIDEO = "VIDEO",
  READING = "READING",
  INTERACTIVE = "INTERACTIVE",
  QUIZ = "QUIZ",
};

export enum MissionDifficulty {
  BEGINNER = "BEGINNER",
  INTERMEDIATE = "INTERMEDIATE",
  ADVANCED = "ADVANCED",
  EXPERT = "EXPERT",
};

export enum PaymentGateway {
  FAWRY = "FAWRY",
  PAYMOB = "PAYMOB",
  INSTAPAY = "INSTAPAY",
};

export enum PaymentItemTarget {
  COURSE = "COURSE",
  MISSION = "MISSION",
  SUBSCRIPTION = "SUBSCRIPTION",
};

export enum PaymentStatus {
  PENDING = "PENDING",
  COMPLETED = "COMPLETED",
  FAILED = "FAILED",
  REFUNDED = "REFUNDED",
};

export enum SessionType {
  ONLINE = "ONLINE",
  OFFLINE = "OFFLINE",
};

export enum SubmissionStatus {
  PENDING = "PENDING",
  GRADED = "GRADED",
  RETURNED = "RETURNED",
  REJECTED = "REJECTED",
};



export interface AddCriterionScoreData {
  missionSubmissionScore_upsert: MissionSubmissionScore_Key;
}

export interface AddCriterionScoreVariables {
  submissionId: UUIDString;
  criterionId: UUIDString;
  score: number;
}

export interface AddPaymentItemData {
  paymentItem_insert: PaymentItem_Key;
}

export interface AddPaymentItemVariables {
  paymentId: UUIDString;
  targetType: PaymentItemTarget;
  courseId?: UUIDString | null;
  missionId?: UUIDString | null;
  subscriptionTierId?: UUIDString | null;
  price: number;
}

export interface AdminAddCourseInstructorData {
  courseInstructor_insert: CourseInstructor_Key;
}

export interface AdminAddCourseInstructorVariables {
  courseId: UUIDString;
  userId: string;
}

export interface AdminCreateCategoryData {
  category_insert: Category_Key;
}

export interface AdminCreateCategoryVariables {
  name: string;
  description?: string | null;
}

export interface AdminCreateCourseData {
  course_insert: Course_Key;
}

export interface AdminCreateCourseVariables {
  title: string;
  description?: string | null;
  price: number;
  language: string;
  level: CourseLevel;
  categoryId: UUIDString;
  tags: string[];
  authorId: string;
}

export interface AdminCreateLectureFullData {
  courseLecture_insert: CourseLecture_Key;
}

export interface AdminCreateLectureFullVariables {
  sectionId: UUIDString;
  title: string;
  type: LectureType;
  videoUrl?: string | null;
  content?: string | null;
  duration?: number | null;
  transcriptUrl?: string | null;
  isFreePreview: boolean;
  order: number;
}

export interface AdminCreateMicroLessonData {
  missionMicroLesson_insert: MissionMicroLesson_Key;
}

export interface AdminCreateMicroLessonVariables {
  missionId: UUIDString;
  title: string;
  type: LectureType;
  assetUrl?: string | null;
  content?: string | null;
  durationSeconds?: number | null;
  order: number;
}

export interface AdminCreateMissionData {
  mission_insert: Mission_Key;
}

export interface AdminCreateMissionTemplateData {
  missionTemplate_insert: MissionTemplate_Key;
}

export interface AdminCreateMissionTemplateVariables {
  missionId: UUIDString;
  title: string;
  fileUrl: string;
  fileType: string;
}

export interface AdminCreateMissionVariables {
  title: string;
  scenarioDescription: string;
  durationMinutes: number;
  categoryId: UUIDString;
  difficulty: MissionDifficulty;
  skillsTested: string[];
  courseId?: UUIDString | null;
  authorId: string;
}

export interface AdminCreateQuizData {
  courseQuiz_insert: CourseQuiz_Key;
}

export interface AdminCreateQuizOptionData {
  quizOption_insert: QuizOption_Key;
}

export interface AdminCreateQuizOptionVariables {
  questionId: UUIDString;
  text: string;
  order: number;
  isCorrect: boolean;
}

export interface AdminCreateQuizQuestionData {
  quizQuestion_insert: QuizQuestion_Key;
}

export interface AdminCreateQuizQuestionVariables {
  quizId: UUIDString;
  questionText: string;
  order: number;
  points: number;
  explanation?: string | null;
}

export interface AdminCreateQuizVariables {
  lectureId: UUIDString;
  passingScore: number;
  maxAttempts: number;
  timeLimitMinutes?: number | null;
}

export interface AdminCreateRubricCriterionData {
  rubricCriterion_insert: RubricCriterion_Key;
}

export interface AdminCreateRubricCriterionVariables {
  missionId: UUIDString;
  criterionName: string;
  description?: string | null;
  maxPoints: number;
  order: number;
}

export interface AdminCreateSectionData {
  courseSection_insert: CourseSection_Key;
}

export interface AdminCreateSectionVariables {
  courseId: UUIDString;
  title: string;
  order: number;
}

export interface AdminCreateSessionData {
  session_insert: Session_Key;
}

export interface AdminCreateSessionVariables {
  courseId: UUIDString;
  title: string;
  capacity?: number | null;
  startTime: TimestampString;
  endTime: TimestampString;
  type: SessionType;
  locationOrUrl: string;
}

export interface AdminCreateSubscriptionTierData {
  subscriptionTier_insert: SubscriptionTier_Key;
}

export interface AdminCreateSubscriptionTierVariables {
  name: string;
  price: number;
  billingCycle: BillingCycle;
  features: string[];
}

export interface AdminDeleteMicroLessonData {
  missionMicroLesson_delete?: MissionMicroLesson_Key | null;
}

export interface AdminDeleteMicroLessonVariables {
  microLessonId: UUIDString;
}

export interface AdminDeleteMissionTemplateData {
  missionTemplate_delete?: MissionTemplate_Key | null;
}

export interface AdminDeleteMissionTemplateVariables {
  templateId: UUIDString;
}

export interface AdminDeleteQuizData {
  courseQuiz_delete?: CourseQuiz_Key | null;
}

export interface AdminDeleteQuizOptionData {
  quizOption_delete?: QuizOption_Key | null;
}

export interface AdminDeleteQuizOptionVariables {
  optionId: UUIDString;
}

export interface AdminDeleteQuizVariables {
  quizId: UUIDString;
}

export interface AdminDeleteRubricCriterionData {
  rubricCriterion_delete?: RubricCriterion_Key | null;
}

export interface AdminDeleteRubricCriterionVariables {
  criterionId: UUIDString;
}

export interface AdminDeprecateSubscriptionTierData {
  subscriptionTier_update?: SubscriptionTier_Key | null;
}

export interface AdminDeprecateSubscriptionTierVariables {
  tierId: UUIDString;
}

export interface AdminGetCourseData {
  course?: {
    id: UUIDString;
    title: string;
    description?: string | null;
    price: number;
    status: CourseStatus;
    language: string;
    level: CourseLevel;
    thumbnail?: string | null;
    tags: string[];
    deletedAt?: TimestampString | null;
    createdAt: TimestampString;
    updatedAt: TimestampString;
    category: {
      id: UUIDString;
      name: string;
    } & Category_Key;
    author: {
      id: string;
      name: string;
      email: string;
      avatar?: string | null;
    } & User_Key;
    createdBy: {
      id: string;
      name: string;
    } & User_Key;
    instructors: ({
      user: {
        id: string;
        name: string;
        email: string;
        avatar?: string | null;
      } & User_Key;
    })[];
    adminSections: ({
      id: UUIDString;
      title: string;
      order: number;
      adminLectures: ({
        id: UUIDString;
        title: string;
        type: LectureType;
        videoUrl?: string | null;
        content?: string | null;
        duration?: number | null;
        transcriptUrl?: string | null;
        isFreePreview: boolean;
        order: number;
      } & CourseLecture_Key)[];
    } & CourseSection_Key)[];
  } & Course_Key;
}

export interface AdminGetCourseVariables {
  courseId: UUIDString;
}

export interface AdminGetMissionData {
  mission?: {
    id: UUIDString;
    title: string;
    scenarioDescription: string;
    durationMinutes: number;
    difficulty: MissionDifficulty;
    skillsTested: string[];
    deletedAt?: TimestampString | null;
    createdAt: TimestampString;
    updatedAt: TimestampString;
    category: {
      id: UUIDString;
      name: string;
    } & Category_Key;
    course?: {
      id: UUIDString;
      title: string;
    } & Course_Key;
    author: {
      id: string;
      name: string;
      email: string;
      avatar?: string | null;
    } & User_Key;
    createdBy: {
      id: string;
      name: string;
    } & User_Key;
    microLessons: ({
      id: UUIDString;
      title: string;
      type: LectureType;
      assetUrl?: string | null;
      content?: string | null;
      durationSeconds?: number | null;
      order: number;
    } & MissionMicroLesson_Key)[];
    templates: ({
      id: UUIDString;
      title: string;
      fileUrl: string;
      fileType: string;
    } & MissionTemplate_Key)[];
    criteria: ({
      id: UUIDString;
      criterionName: string;
      description?: string | null;
      maxPoints: number;
      order: number;
    } & RubricCriterion_Key)[];
  } & Mission_Key;
}

export interface AdminGetMissionVariables {
  missionId: UUIDString;
}

export interface AdminGetQuizData {
  courseQuiz?: {
    id: UUIDString;
    passingScore: number;
    maxAttempts: number;
    timeLimitMinutes?: number | null;
    createdAt: TimestampString;
    updatedAt: TimestampString;
    lecture: {
      id: UUIDString;
      title: string;
      section: {
        course: {
          id: UUIDString;
        } & Course_Key;
      };
    } & CourseLecture_Key;
    adminQuestions: ({
      id: UUIDString;
      questionText: string;
      order: number;
      points: number;
      explanation?: string | null;
      adminOptions: ({
        id: UUIDString;
        text: string;
        order: number;
        isCorrect: boolean;
      } & QuizOption_Key)[];
    } & QuizQuestion_Key)[];
  } & CourseQuiz_Key;
}

export interface AdminGetQuizVariables {
  quizId: UUIDString;
}

export interface AdminListMyCoursesData {
  courses: ({
    id: UUIDString;
    title: string;
    status: CourseStatus;
    level: CourseLevel;
    thumbnail?: string | null;
    price: number;
    updatedAt: TimestampString;
    category: {
      name: string;
    };
  } & Course_Key)[];
}

export interface AdminListMyMissionsData {
  missions: ({
    id: UUIDString;
    title: string;
    difficulty: MissionDifficulty;
    durationMinutes: number;
    updatedAt: TimestampString;
    category: {
      name: string;
    };
    course?: {
      id: UUIDString;
      title: string;
    } & Course_Key;
  } & Mission_Key)[];
}

export interface AdminMoveLectureToSectionData {
  courseLecture_update?: CourseLecture_Key | null;
}

export interface AdminMoveLectureToSectionVariables {
  lectureId: UUIDString;
  newSectionId: UUIDString;
  order: number;
}

export interface AdminRemoveCourseInstructorData {
  courseInstructor_delete?: CourseInstructor_Key | null;
}

export interface AdminRemoveCourseInstructorVariables {
  courseId: UUIDString;
  userId: string;
}

export interface AdminSoftDeleteCourseData {
  course_update?: Course_Key | null;
}

export interface AdminSoftDeleteCourseVariables {
  courseId: UUIDString;
}

export interface AdminSoftDeleteLectureData {
  courseLecture_update?: CourseLecture_Key | null;
}

export interface AdminSoftDeleteLectureVariables {
  lectureId: UUIDString;
}

export interface AdminSoftDeleteLecturesBySectionData {
  courseLecture_updateMany: number;
}

export interface AdminSoftDeleteLecturesBySectionVariables {
  sectionId: UUIDString;
}

export interface AdminSoftDeleteMissionData {
  mission_update?: Mission_Key | null;
}

export interface AdminSoftDeleteMissionVariables {
  missionId: UUIDString;
}

export interface AdminSoftDeleteQuizQuestionData {
  quizQuestion_update?: QuizQuestion_Key | null;
}

export interface AdminSoftDeleteQuizQuestionVariables {
  questionId: UUIDString;
}

export interface AdminSoftDeleteSectionData {
  courseSection_update?: CourseSection_Key | null;
}

export interface AdminSoftDeleteSectionVariables {
  sectionId: UUIDString;
}

export interface AdminUpdateCourseData {
  course_update?: Course_Key | null;
}

export interface AdminUpdateCourseRatingAggregateData {
  course_update?: Course_Key | null;
}

export interface AdminUpdateCourseRatingAggregateVariables {
  courseId: UUIDString;
  avgRating: number;
  ratingCount: number;
}

export interface AdminUpdateCourseStatusData {
  course_update?: Course_Key | null;
}

export interface AdminUpdateCourseStatusVariables {
  courseId: UUIDString;
  status: CourseStatus;
}

export interface AdminUpdateCourseVariables {
  courseId: UUIDString;
  title?: string | null;
  description?: string | null;
  price?: number | null;
  language?: string | null;
  level?: CourseLevel | null;
  categoryId?: UUIDString | null;
  tags?: string[] | null;
  thumbnail?: string | null;
}

export interface AdminUpdateLectureData {
  courseLecture_update?: CourseLecture_Key | null;
}

export interface AdminUpdateLectureOrderData {
  courseLecture_update?: CourseLecture_Key | null;
}

export interface AdminUpdateLectureOrderVariables {
  lectureId: UUIDString;
  order: number;
}

export interface AdminUpdateLectureVariables {
  lectureId: UUIDString;
  title?: string | null;
  type?: LectureType | null;
  videoUrl?: string | null;
  content?: string | null;
  duration?: number | null;
  transcriptUrl?: string | null;
  isFreePreview?: boolean | null;
}

export interface AdminUpdateMicroLessonData {
  missionMicroLesson_update?: MissionMicroLesson_Key | null;
}

export interface AdminUpdateMicroLessonOrderData {
  missionMicroLesson_update?: MissionMicroLesson_Key | null;
}

export interface AdminUpdateMicroLessonOrderVariables {
  microLessonId: UUIDString;
  order: number;
}

export interface AdminUpdateMicroLessonVariables {
  microLessonId: UUIDString;
  title?: string | null;
  type?: LectureType | null;
  assetUrl?: string | null;
  content?: string | null;
  durationSeconds?: number | null;
}

export interface AdminUpdateMissionData {
  mission_update?: Mission_Key | null;
}

export interface AdminUpdateMissionVariables {
  missionId: UUIDString;
  title?: string | null;
  scenarioDescription?: string | null;
  durationMinutes?: number | null;
  categoryId?: UUIDString | null;
  difficulty?: MissionDifficulty | null;
  skillsTested?: string[] | null;
  courseId?: UUIDString | null;
}

export interface AdminUpdateQuizData {
  courseQuiz_update?: CourseQuiz_Key | null;
}

export interface AdminUpdateQuizOptionData {
  quizOption_update?: QuizOption_Key | null;
}

export interface AdminUpdateQuizOptionOrderData {
  quizOption_update?: QuizOption_Key | null;
}

export interface AdminUpdateQuizOptionOrderVariables {
  optionId: UUIDString;
  order: number;
}

export interface AdminUpdateQuizOptionVariables {
  optionId: UUIDString;
  text?: string | null;
  isCorrect?: boolean | null;
}

export interface AdminUpdateQuizQuestionData {
  quizQuestion_update?: QuizQuestion_Key | null;
}

export interface AdminUpdateQuizQuestionOrderData {
  quizQuestion_update?: QuizQuestion_Key | null;
}

export interface AdminUpdateQuizQuestionOrderVariables {
  questionId: UUIDString;
  order: number;
}

export interface AdminUpdateQuizQuestionVariables {
  questionId: UUIDString;
  questionText?: string | null;
  points?: number | null;
  explanation?: string | null;
}

export interface AdminUpdateQuizVariables {
  quizId: UUIDString;
  passingScore?: number | null;
  maxAttempts?: number | null;
  timeLimitMinutes?: number | null;
}

export interface AdminUpdateRubricCriterionData {
  rubricCriterion_update?: RubricCriterion_Key | null;
}

export interface AdminUpdateRubricCriterionOrderData {
  rubricCriterion_update?: RubricCriterion_Key | null;
}

export interface AdminUpdateRubricCriterionOrderVariables {
  criterionId: UUIDString;
  order: number;
}

export interface AdminUpdateRubricCriterionVariables {
  criterionId: UUIDString;
  criterionName?: string | null;
  description?: string | null;
  maxPoints?: number | null;
}

export interface AdminUpdateSectionData {
  courseSection_update?: CourseSection_Key | null;
}

export interface AdminUpdateSectionOrderData {
  courseSection_update?: CourseSection_Key | null;
}

export interface AdminUpdateSectionOrderVariables {
  sectionId: UUIDString;
  order: number;
}

export interface AdminUpdateSectionVariables {
  sectionId: UUIDString;
  title: string;
}

export interface AdminUpsertLectureProgressData {
  lectureProgress_upsert: LectureProgress_Key;
}

export interface AdminUpsertLectureProgressVariables {
  userId: string;
  lectureId: UUIDString;
  lastWatchedSecond: number;
  completedAt?: TimestampString | null;
}

export interface Attendance_Key {
  id: UUIDString;
  __typename?: 'Attendance_Key';
}

export interface Category_Key {
  id: UUIDString;
  __typename?: 'Category_Key';
}

export interface Certificate_Key {
  id: UUIDString;
  __typename?: 'Certificate_Key';
}

export interface CheckInToSessionData {
  attendance_insert: Attendance_Key;
}

export interface CheckInToSessionVariables {
  sessionId: UUIDString;
  status: AttendanceStatus;
  method: AttendanceMethod;
}

export interface CourseInstructor_Key {
  courseId: UUIDString;
  userId: string;
  __typename?: 'CourseInstructor_Key';
}

export interface CourseLecture_Key {
  id: UUIDString;
  __typename?: 'CourseLecture_Key';
}

export interface CourseQuiz_Key {
  id: UUIDString;
  __typename?: 'CourseQuiz_Key';
}

export interface CourseRating_Key {
  userId: string;
  courseId: UUIDString;
  __typename?: 'CourseRating_Key';
}

export interface CourseSection_Key {
  id: UUIDString;
  __typename?: 'CourseSection_Key';
}

export interface Course_Key {
  id: UUIDString;
  __typename?: 'Course_Key';
}

export interface DeleteCourseRatingData {
  courseRating_deleteMany: number;
}

export interface DeleteCourseRatingVariables {
  courseId: UUIDString;
  userId: string;
}

export interface EnrollInCourseData {
  enrollment_insert: Enrollment_Key;
}

export interface EnrollInCourseVariables {
  courseId: UUIDString;
  userId: string;
}

export interface EnrollInMissionData {
  enrollment_insert: Enrollment_Key;
}

export interface EnrollInMissionVariables {
  missionId: UUIDString;
  userId: string;
}

export interface Enrollment_Key {
  id: UUIDString;
  __typename?: 'Enrollment_Key';
}

export interface FinishQuizAttemptIfOpenData {
  quizAttempt_updateMany: number;
}

export interface FinishQuizAttemptIfOpenVariables {
  attemptId: UUIDString;
  score: number;
  passed: boolean;
}

export interface GetActiveQuizSessionData {
  quizAttempt?: {
    id: UUIDString;
    startedAt: TimestampString;
    completedAt?: TimestampString | null;
    user: {
      id: string;
    } & User_Key;
    quiz: {
      timeLimitMinutes?: number | null;
      passingScore: number;
    };
  } & QuizAttempt_Key;
}

export interface GetActiveQuizSessionVariables {
  attemptId: UUIDString;
}

export interface GetAttemptAnswersWithCorrectData {
  quizAttemptAnswers: ({
    question: {
      id: UUIDString;
      points: number;
    } & QuizQuestion_Key;
    selectedOption: {
      id: UUIDString;
      isCorrect: boolean;
    } & QuizOption_Key;
  })[];
}

export interface GetAttemptAnswersWithCorrectVariables {
  attemptId: UUIDString;
}

export interface GetCourseCompletionStatusData {
  sections: ({
    completionLectures: ({
      id: UUIDString;
      completionProgress: ({
        completedAt?: TimestampString | null;
      })[];
    } & CourseLecture_Key)[];
  })[];
}

export interface GetCourseCompletionStatusForUserData {
  sections: ({
    userCompletionLectures: ({
      id: UUIDString;
      userCompletionProgress: ({
        completedAt?: TimestampString | null;
      })[];
    } & CourseLecture_Key)[];
  })[];
}

export interface GetCourseCompletionStatusForUserVariables {
  courseId: UUIDString;
  userId: string;
}

export interface GetCourseCompletionStatusVariables {
  courseId: UUIDString;
}

export interface GetCourseCurriculumData {
  course?: {
    id: UUIDString;
    title: string;
    description?: string | null;
    language: string;
    publishedSections: ({
      id: UUIDString;
      title: string;
      publishedLectures: ({
        id: UUIDString;
        title: string;
        type: LectureType;
        content?: string | null;
        duration?: number | null;
        isFreePreview: boolean;
      } & CourseLecture_Key)[];
    } & CourseSection_Key)[];
  } & Course_Key;
}

export interface GetCourseCurriculumVariables {
  courseId: UUIDString;
}

export interface GetCourseForEnrollmentData {
  course?: {
    id: UUIDString;
    status: CourseStatus;
    price: number;
    deletedAt?: TimestampString | null;
  } & Course_Key;
}

export interface GetCourseForEnrollmentVariables {
  courseId: UUIDString;
}

export interface GetCourseInstructorsData {
  courseInstructors: ({
    user: {
      id: string;
      name: string;
      email: string;
      avatar?: string | null;
    } & User_Key;
  })[];
}

export interface GetCourseInstructorsVariables {
  courseId: UUIDString;
}

export interface GetCourseRatingsForSummaryData {
  courseRatings: ({
    rating: number;
  })[];
}

export interface GetCourseRatingsForSummaryVariables {
  courseId: UUIDString;
}

export interface GetCourseSessionsData {
  sessions: ({
    id: UUIDString;
    title: string;
    startTime: TimestampString;
    endTime: TimestampString;
    type: SessionType;
    capacity?: number | null;
    locationOrUrl: string;
    hostUser?: {
      name: string;
      avatar?: string | null;
    };
  } & Session_Key)[];
}

export interface GetCourseSessionsVariables {
  courseId: UUIDString;
}

export interface GetCriterionMissionData {
  rubricCriterion?: {
    mission: {
      id: UUIDString;
      author: {
        id: string;
      } & User_Key;
      createdBy: {
        id: string;
      } & User_Key;
      course?: {
        id: UUIDString;
        author: {
          id: string;
        } & User_Key;
        createdBy: {
          id: string;
        } & User_Key;
      } & Course_Key;
    } & Mission_Key;
  };
}

export interface GetCriterionMissionVariables {
  criterionId: UUIDString;
}

export interface GetEnrollmentForUserMissionData {
  enrollments: ({
    id: UUIDString;
    status: EnrollmentStatus;
    completedAt?: TimestampString | null;
  } & Enrollment_Key)[];
}

export interface GetEnrollmentForUserMissionVariables {
  userId: string;
  missionId: UUIDString;
}

export interface GetExpiredAttemptsData {
  quizAttempts: ({
    id: UUIDString;
    startedAt: TimestampString;
    quiz: {
      id: UUIDString;
      timeLimitMinutes?: number | null;
    } & CourseQuiz_Key;
  } & QuizAttempt_Key)[];
}

export interface GetLectureContentData {
  courseLecture?: {
    id: UUIDString;
    title: string;
    type: LectureType;
    videoUrl?: string | null;
    content?: string | null;
    duration?: number | null;
    transcriptUrl?: string | null;
    isFreePreview: boolean;
    section: {
      course: {
        id: UUIDString;
        author: {
          id: string;
        } & User_Key;
        createdBy: {
          id: string;
        } & User_Key;
      } & Course_Key;
    };
  } & CourseLecture_Key;
}

export interface GetLectureContentVariables {
  lectureId: UUIDString;
}

export interface GetLectureDurationData {
  courseLecture?: {
    id: UUIDString;
    duration?: number | null;
    section: {
      course: {
        id: UUIDString;
      } & Course_Key;
    };
  } & CourseLecture_Key;
}

export interface GetLectureDurationVariables {
  lectureId: UUIDString;
}

export interface GetMeData {
  user?: {
    id: string;
    email: string;
    name: string;
    avatar?: string | null;
    createdAt: TimestampString;
    lastLogin?: TimestampString | null;
    profile_on_user?: {
      bio?: string | null;
      company?: string | null;
      phone?: string | null;
      syncedPreferences?: unknown | null;
    };
    userRoles_on_user: ({
      role: {
        name: string;
      };
    })[];
  } & User_Key;
}

export interface GetMicroLessonMissionData {
  missionMicroLesson?: {
    mission: {
      id: UUIDString;
      author: {
        id: string;
      } & User_Key;
      createdBy: {
        id: string;
      } & User_Key;
      course?: {
        id: UUIDString;
        author: {
          id: string;
        } & User_Key;
        createdBy: {
          id: string;
        } & User_Key;
      } & Course_Key;
    } & Mission_Key;
  };
}

export interface GetMicroLessonMissionVariables {
  microLessonId: UUIDString;
}

export interface GetMissionForEnrollmentData {
  mission?: {
    id: UUIDString;
    deletedAt?: TimestampString | null;
  } & Mission_Key;
}

export interface GetMissionForEnrollmentVariables {
  missionId: UUIDString;
}

export interface GetMissionTemplatesData {
  missionTemplates: ({
    id: UUIDString;
    title: string;
    fileUrl: string;
    fileType: string;
  } & MissionTemplate_Key)[];
}

export interface GetMissionTemplatesVariables {
  missionId: UUIDString;
}

export interface GetMyCourseAccessData {
  course?: {
    id: UUIDString;
    author: {
      id: string;
    } & User_Key;
    createdBy: {
      id: string;
    } & User_Key;
    myInstructorLink: ({
      user: {
        id: string;
      } & User_Key;
    })[];
  } & Course_Key;
}

export interface GetMyCourseAccessVariables {
  courseId: UUIDString;
}

export interface GetMyCourseProgressData {
  sections: ({
    id: UUIDString;
    title: string;
    progressLectures: ({
      id: UUIDString;
      title: string;
      userProgress: ({
        completedAt?: TimestampString | null;
      })[];
    } & CourseLecture_Key)[];
  } & CourseSection_Key)[];
}

export interface GetMyCourseProgressVariables {
  courseId: UUIDString;
}

export interface GetMyCourseRatingData {
  courseRatings: ({
    rating: number;
    review?: string | null;
    createdAt: TimestampString;
    updatedAt: TimestampString;
  })[];
}

export interface GetMyCourseRatingVariables {
  courseId: UUIDString;
}

export interface GetMyMissionAccessData {
  mission?: {
    id: UUIDString;
    author: {
      id: string;
    } & User_Key;
    createdBy: {
      id: string;
    } & User_Key;
    course?: {
      id: UUIDString;
      author: {
        id: string;
      } & User_Key;
      createdBy: {
        id: string;
      } & User_Key;
      myMissionCourseInstructorLink: ({
        user: {
          id: string;
        } & User_Key;
      })[];
    } & Course_Key;
  } & Mission_Key;
}

export interface GetMyMissionAccessVariables {
  missionId: UUIDString;
}

export interface GetMyPendingSubmissionsData {
  missionSubmissions: ({
    id: UUIDString;
    fileUrl: string;
    submittedAt: TimestampString;
    attemptNumber: number;
    student: {
      name: string;
      email: string;
    };
    mission: {
      title: string;
      difficulty: MissionDifficulty;
      course?: {
        title: string;
      };
    };
  } & MissionSubmission_Key)[];
}

export interface GetOptionCourseData {
  quizOption?: {
    question: {
      quiz: {
        lecture: {
          section: {
            course: {
              id: UUIDString;
              author: {
                id: string;
              } & User_Key;
              createdBy: {
                id: string;
              } & User_Key;
            } & Course_Key;
          };
        };
      };
    };
  };
}

export interface GetOptionCourseVariables {
  optionId: UUIDString;
}

export interface GetOptionWithQuestionData {
  quizOption?: {
    id: UUIDString;
    question: {
      id: UUIDString;
      quiz: {
        id: UUIDString;
      } & CourseQuiz_Key;
    } & QuizQuestion_Key;
  } & QuizOption_Key;
}

export interface GetOptionWithQuestionVariables {
  optionId: UUIDString;
}

export interface GetPendingSubmissionsData {
  missionSubmissions: ({
    id: UUIDString;
    fileUrl: string;
    submittedAt: TimestampString;
    attemptNumber: number;
    student: {
      name: string;
      email: string;
    };
    mission: {
      title: string;
      difficulty: MissionDifficulty;
      course?: {
        title: string;
      };
    };
  } & MissionSubmission_Key)[];
}

export interface GetQuestionCourseData {
  quizQuestion?: {
    quiz: {
      lecture: {
        section: {
          course: {
            id: UUIDString;
            author: {
              id: string;
            } & User_Key;
            createdBy: {
              id: string;
            } & User_Key;
          } & Course_Key;
        };
      };
    };
  };
}

export interface GetQuestionCourseVariables {
  questionId: UUIDString;
}

export interface GetQuestionOptionsData {
  quizOptions: ({
    id: UUIDString;
    text: string;
    order: number;
    isCorrect: boolean;
  } & QuizOption_Key)[];
}

export interface GetQuestionOptionsVariables {
  questionId: UUIDString;
}

export interface GetQuizAttemptByIdData {
  quizAttempt?: {
    id: UUIDString;
    completedAt?: TimestampString | null;
    startedAt: TimestampString;
    score?: number | null;
    passed?: boolean | null;
    user: {
      id: string;
    } & User_Key;
    quiz: {
      id: UUIDString;
      passingScore: number;
      maxAttempts: number;
      timeLimitMinutes?: number | null;
    } & CourseQuiz_Key;
  } & QuizAttempt_Key;
}

export interface GetQuizAttemptByIdVariables {
  attemptId: UUIDString;
}

export interface GetQuizQuestionPointsData {
  quizQuestions: ({
    id: UUIDString;
    points: number;
  } & QuizQuestion_Key)[];
}

export interface GetQuizQuestionPointsVariables {
  quizId: UUIDString;
}

export interface GetQuizQuestionsData {
  courseQuizs: ({
    id: UUIDString;
    passingScore: number;
    maxAttempts: number;
    timeLimitMinutes?: number | null;
    takeQuestions: ({
      id: UUIDString;
      questionText: string;
      points: number;
      takeOptions: ({
        id: UUIDString;
        text: string;
      } & QuizOption_Key)[];
    } & QuizQuestion_Key)[];
  } & CourseQuiz_Key)[];
}

export interface GetQuizQuestionsVariables {
  lectureId: UUIDString;
}

export interface GetQuizSettingsData {
  courseQuiz?: {
    id: UUIDString;
    passingScore: number;
    maxAttempts: number;
    timeLimitMinutes?: number | null;
    lecture: {
      id: UUIDString;
      type: LectureType;
      section: {
        course: {
          id: UUIDString;
          author: {
            id: string;
          } & User_Key;
          createdBy: {
            id: string;
          } & User_Key;
        } & Course_Key;
      };
    } & CourseLecture_Key;
  } & CourseQuiz_Key;
}

export interface GetQuizSettingsVariables {
  quizId: UUIDString;
}

export interface GetSectionCourseData {
  courseSection?: {
    course: {
      id: UUIDString;
      author: {
        id: string;
      } & User_Key;
      createdBy: {
        id: string;
      } & User_Key;
    } & Course_Key;
  };
}

export interface GetSectionCourseVariables {
  sectionId: UUIDString;
}

export interface GetSubmissionForGradingData {
  missionSubmission?: {
    id: UUIDString;
    status: SubmissionStatus;
    attemptNumber: number;
    mission: {
      id: UUIDString;
    } & Mission_Key;
    student: {
      id: string;
    } & User_Key;
  } & MissionSubmission_Key;
}

export interface GetSubmissionForGradingVariables {
  submissionId: UUIDString;
}

export interface GetTemplateMissionData {
  missionTemplate?: {
    mission: {
      id: UUIDString;
      author: {
        id: string;
      } & User_Key;
      createdBy: {
        id: string;
      } & User_Key;
      course?: {
        id: UUIDString;
        author: {
          id: string;
        } & User_Key;
        createdBy: {
          id: string;
        } & User_Key;
      } & Course_Key;
    } & Mission_Key;
  };
}

export interface GetTemplateMissionVariables {
  templateId: UUIDString;
}

export interface GetUserClaimsData {
  user?: {
    id: string;
    userRoles_on_user: ({
      role: {
        name: string;
      };
    })[];
    profile_on_user?: {
      company?: string | null;
    };
  } & User_Key;
}

export interface GetUserClaimsVariables {
  uid: string;
}

export interface GetUserEnrollmentForCourseByUserData {
  enrollments: ({
    id: UUIDString;
    status: EnrollmentStatus;
    completedAt?: TimestampString | null;
  } & Enrollment_Key)[];
}

export interface GetUserEnrollmentForCourseByUserVariables {
  courseId: UUIDString;
  userId: string;
}

export interface GetUserEnrollmentForCourseData {
  enrollments: ({
    id: UUIDString;
    status: EnrollmentStatus;
    completedAt?: TimestampString | null;
  } & Enrollment_Key)[];
}

export interface GetUserEnrollmentForCourseVariables {
  courseId: UUIDString;
}

export interface GetUserEnrollmentForMissionData {
  enrollments: ({
    id: UUIDString;
    status: EnrollmentStatus;
    completedAt?: TimestampString | null;
  } & Enrollment_Key)[];
}

export interface GetUserEnrollmentForMissionVariables {
  missionId: UUIDString;
}

export interface GetUserLectureProgressData {
  lectureProgresses: ({
    lastWatchedSecond: number;
    completedAt?: TimestampString | null;
  })[];
}

export interface GetUserLectureProgressVariables {
  lectureId: UUIDString;
}

export interface GetUserQuizAttemptsData {
  quizAttempts: ({
    id: UUIDString;
    completedAt?: TimestampString | null;
    score?: number | null;
    passed?: boolean | null;
    startedAt: TimestampString;
  } & QuizAttempt_Key)[];
}

export interface GetUserQuizAttemptsVariables {
  quizId: UUIDString;
}

export interface GradeSubmissionData {
  missionSubmission_update?: MissionSubmission_Key | null;
}

export interface GradeSubmissionVariables {
  submissionId: UUIDString;
  feedback?: string | null;
  graderId: string;
}

export interface InstructorCancelSessionData {
  session_updateMany: number;
}

export interface InstructorCancelSessionVariables {
  sessionId: UUIDString;
}

export interface InstructorDeleteCourseData {
  course_updateMany: number;
}

export interface InstructorDeleteCourseVariables {
  courseId: UUIDString;
}

export interface LectureProgress_Key {
  userId: string;
  lectureId: UUIDString;
  __typename?: 'LectureProgress_Key';
}

export interface ListCategoriesData {
  categories: ({
    id: UUIDString;
    name: string;
    description?: string | null;
  } & Category_Key)[];
}

export interface ListCourseRatingsData {
  courseRatings: ({
    rating: number;
    review?: string | null;
    createdAt: TimestampString;
    updatedAt: TimestampString;
    user: {
      name: string;
      avatar?: string | null;
    };
  })[];
}

export interface ListCourseRatingsVariables {
  courseId: UUIDString;
  limit?: number | null;
  offset?: number | null;
}

export interface ListPublishedCoursesData {
  courses: ({
    id: UUIDString;
    title: string;
    price: number;
    level: CourseLevel;
    thumbnail?: string | null;
    tags: string[];
    avgRating: number;
    ratingCount: number;
    category: {
      name: string;
    };
    author: {
      name: string;
      avatar?: string | null;
    };
  } & Course_Key)[];
}

export interface LogPaymentData {
  payment_insert: Payment_Key;
}

export interface LogPaymentVariables {
  gateway: PaymentGateway;
  referenceId: string;
  amount: number;
  currency?: string | null;
  customerEmailSnapshot: string;
}

export interface MissionMicroLesson_Key {
  id: UUIDString;
  __typename?: 'MissionMicroLesson_Key';
}

export interface MissionSubmissionScore_Key {
  submissionId: UUIDString;
  criterionId: UUIDString;
  __typename?: 'MissionSubmissionScore_Key';
}

export interface MissionSubmission_Key {
  id: UUIDString;
  __typename?: 'MissionSubmission_Key';
}

export interface MissionTemplate_Key {
  id: UUIDString;
  __typename?: 'MissionTemplate_Key';
}

export interface Mission_Key {
  id: UUIDString;
  __typename?: 'Mission_Key';
}

export interface MyCertificatesData {
  certificates: ({
    id: UUIDString;
    issuedAt: TimestampString;
    expiresAt?: TimestampString | null;
    targetType: CertificateTarget;
    verificationHash: string;
    assetUrl: string;
    course?: {
      title: string;
    };
    mission?: {
      title: string;
    };
  } & Certificate_Key)[];
}

export interface MyPaymentHistoryData {
  payments: ({
    id: UUIDString;
    customerEmailSnapshot: string;
    gateway: PaymentGateway;
    status: PaymentStatus;
    amount: number;
    currency: string;
    referenceId: string;
    createdAt: TimestampString;
    paymentItems_on_payment: ({
      targetType: PaymentItemTarget;
      priceAtPurchase: number;
      course?: {
        title: string;
      };
      mission?: {
        title: string;
      };
      subscriptionTier?: {
        name: string;
      };
    })[];
  } & Payment_Key)[];
}

export interface MySubmissionsData {
  missionSubmissions: ({
    id: UUIDString;
    fileUrl: string;
    status: SubmissionStatus;
    feedback?: string | null;
    submittedAt: TimestampString;
    missionSubmissionScores_on_submission: ({
      score: number;
      criterion: {
        criterionName: string;
        maxPoints: number;
      };
    })[];
    mission: {
      title: string;
      difficulty: MissionDifficulty;
    };
  } & MissionSubmission_Key)[];
}

export interface PaymentItem_Key {
  id: UUIDString;
  __typename?: 'PaymentItem_Key';
}

export interface Payment_Key {
  id: UUIDString;
  __typename?: 'Payment_Key';
}

export interface Permission_Key {
  id: UUIDString;
  __typename?: 'Permission_Key';
}

export interface Profile_Key {
  userId: string;
  __typename?: 'Profile_Key';
}

export interface QuizAttemptAnswer_Key {
  attemptId: UUIDString;
  questionId: UUIDString;
  __typename?: 'QuizAttemptAnswer_Key';
}

export interface QuizAttempt_Key {
  id: UUIDString;
  __typename?: 'QuizAttempt_Key';
}

export interface QuizOption_Key {
  id: UUIDString;
  __typename?: 'QuizOption_Key';
}

export interface QuizQuestion_Key {
  id: UUIDString;
  __typename?: 'QuizQuestion_Key';
}

export interface RolePermission_Key {
  roleId: UUIDString;
  permissionId: UUIDString;
  __typename?: 'RolePermission_Key';
}

export interface Role_Key {
  id: UUIDString;
  __typename?: 'Role_Key';
}

export interface RubricCriterion_Key {
  id: UUIDString;
  __typename?: 'RubricCriterion_Key';
}

export interface SearchPublishedCoursesData {
  courses: ({
    id: UUIDString;
    title: string;
    price: number;
    level: CourseLevel;
    thumbnail?: string | null;
    tags: string[];
    category: {
      name: string;
    };
    author: {
      name: string;
      avatar?: string | null;
    };
  } & Course_Key)[];
}

export interface SearchPublishedCoursesVariables {
  searchQuery: string;
}

export interface Session_Key {
  id: UUIDString;
  __typename?: 'Session_Key';
}

export interface StartQuizAttemptData {
  quizAttempt_insert: QuizAttempt_Key;
}

export interface StartQuizAttemptVariables {
  quizId: UUIDString;
  userId: string;
}

export interface SubmitMissionData {
  missionSubmission_insert: MissionSubmission_Key;
}

export interface SubmitMissionVariables {
  missionId: UUIDString;
  fileUrl: string;
  studentId: string;
}

export interface SubmitQuizAnswerData {
  quizAttemptAnswer_upsert: QuizAttemptAnswer_Key;
}

export interface SubmitQuizAnswerVariables {
  attemptId: UUIDString;
  questionId: UUIDString;
  optionId: UUIDString;
}

export interface SubscriptionTier_Key {
  id: UUIDString;
  __typename?: 'SubscriptionTier_Key';
}

export interface SuperAdminCancelSessionData {
  session_update?: Session_Key | null;
}

export interface SuperAdminCancelSessionVariables {
  sessionId: UUIDString;
}

export interface SuperAdminDeleteCourseData {
  course_update?: Course_Key | null;
}

export interface SuperAdminDeleteCourseVariables {
  courseId: UUIDString;
}

export interface SyncUserData {
  user_upsert: User_Key;
}

export interface SyncUserVariables {
  email: string;
  name: string;
  avatar?: string | null;
}

export interface UpdateEnrollmentStatusData {
  enrollment_updateMany: number;
}

export interface UpdateEnrollmentStatusVariables {
  enrollmentId: UUIDString;
  status: EnrollmentStatus;
  completedAt?: TimestampString | null;
}

export interface UpdateLectureProgressData {
  lectureProgress_upsert: LectureProgress_Key;
}

export interface UpdateLectureProgressVariables {
  lectureId: UUIDString;
  lastWatchedSecond: number;
  completedAt?: TimestampString | null;
  userId: string;
}

export interface UpdateMyProfileData {
  profile_upsert: Profile_Key;
}

export interface UpdateMyProfileVariables {
  bio?: string | null;
  company?: string | null;
  phone?: string | null;
  preferences?: unknown | null;
}

export interface UpsertCourseRatingData {
  courseRating_upsert: CourseRating_Key;
}

export interface UpsertCourseRatingVariables {
  courseId: UUIDString;
  rating: number;
  review?: string | null;
  userId: string;
}

export interface UserRole_Key {
  userId: string;
  roleId: UUIDString;
  __typename?: 'UserRole_Key';
}

export interface UserSubscription_Key {
  id: UUIDString;
  __typename?: 'UserSubscription_Key';
}

export interface User_Key {
  id: string;
  __typename?: 'User_Key';
}

export interface VerifyCertificateData {
  certificates: ({
    issuedAt: TimestampString;
    expiresAt?: TimestampString | null;
    targetType: CertificateTarget;
    assetUrl: string;
    user: {
      name: string;
    };
    course?: {
      title: string;
    };
    mission?: {
      title: string;
    };
  })[];
}

export interface VerifyCertificateVariables {
  hash: string;
}

interface ListCategoriesRef {
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<ListCategoriesData, undefined>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect): QueryRef<ListCategoriesData, undefined>;
  operationName: string;
}
export const listCategoriesRef: ListCategoriesRef;

export function listCategories(options?: ExecuteQueryOptions): QueryPromise<ListCategoriesData, undefined>;
export function listCategories(dc: DataConnect, options?: ExecuteQueryOptions): QueryPromise<ListCategoriesData, undefined>;

interface ListPublishedCoursesRef {
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<ListPublishedCoursesData, undefined>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect): QueryRef<ListPublishedCoursesData, undefined>;
  operationName: string;
}
export const listPublishedCoursesRef: ListPublishedCoursesRef;

export function listPublishedCourses(options?: ExecuteQueryOptions): QueryPromise<ListPublishedCoursesData, undefined>;
export function listPublishedCourses(dc: DataConnect, options?: ExecuteQueryOptions): QueryPromise<ListPublishedCoursesData, undefined>;

interface SearchPublishedCoursesRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: SearchPublishedCoursesVariables): QueryRef<SearchPublishedCoursesData, SearchPublishedCoursesVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: SearchPublishedCoursesVariables): QueryRef<SearchPublishedCoursesData, SearchPublishedCoursesVariables>;
  operationName: string;
}
export const searchPublishedCoursesRef: SearchPublishedCoursesRef;

export function searchPublishedCourses(vars: SearchPublishedCoursesVariables, options?: ExecuteQueryOptions): QueryPromise<SearchPublishedCoursesData, SearchPublishedCoursesVariables>;
export function searchPublishedCourses(dc: DataConnect, vars: SearchPublishedCoursesVariables, options?: ExecuteQueryOptions): QueryPromise<SearchPublishedCoursesData, SearchPublishedCoursesVariables>;

interface GetCourseCurriculumRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: GetCourseCurriculumVariables): QueryRef<GetCourseCurriculumData, GetCourseCurriculumVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: GetCourseCurriculumVariables): QueryRef<GetCourseCurriculumData, GetCourseCurriculumVariables>;
  operationName: string;
}
export const getCourseCurriculumRef: GetCourseCurriculumRef;

export function getCourseCurriculum(vars: GetCourseCurriculumVariables, options?: ExecuteQueryOptions): QueryPromise<GetCourseCurriculumData, GetCourseCurriculumVariables>;
export function getCourseCurriculum(dc: DataConnect, vars: GetCourseCurriculumVariables, options?: ExecuteQueryOptions): QueryPromise<GetCourseCurriculumData, GetCourseCurriculumVariables>;

interface GetLectureContentRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: GetLectureContentVariables): QueryRef<GetLectureContentData, GetLectureContentVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: GetLectureContentVariables): QueryRef<GetLectureContentData, GetLectureContentVariables>;
  operationName: string;
}
export const getLectureContentRef: GetLectureContentRef;

export function getLectureContent(vars: GetLectureContentVariables, options?: ExecuteQueryOptions): QueryPromise<GetLectureContentData, GetLectureContentVariables>;
export function getLectureContent(dc: DataConnect, vars: GetLectureContentVariables, options?: ExecuteQueryOptions): QueryPromise<GetLectureContentData, GetLectureContentVariables>;

interface GetUserLectureProgressRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: GetUserLectureProgressVariables): QueryRef<GetUserLectureProgressData, GetUserLectureProgressVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: GetUserLectureProgressVariables): QueryRef<GetUserLectureProgressData, GetUserLectureProgressVariables>;
  operationName: string;
}
export const getUserLectureProgressRef: GetUserLectureProgressRef;

export function getUserLectureProgress(vars: GetUserLectureProgressVariables, options?: ExecuteQueryOptions): QueryPromise<GetUserLectureProgressData, GetUserLectureProgressVariables>;
export function getUserLectureProgress(dc: DataConnect, vars: GetUserLectureProgressVariables, options?: ExecuteQueryOptions): QueryPromise<GetUserLectureProgressData, GetUserLectureProgressVariables>;

interface GetMyCourseProgressRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: GetMyCourseProgressVariables): QueryRef<GetMyCourseProgressData, GetMyCourseProgressVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: GetMyCourseProgressVariables): QueryRef<GetMyCourseProgressData, GetMyCourseProgressVariables>;
  operationName: string;
}
export const getMyCourseProgressRef: GetMyCourseProgressRef;

export function getMyCourseProgress(vars: GetMyCourseProgressVariables, options?: ExecuteQueryOptions): QueryPromise<GetMyCourseProgressData, GetMyCourseProgressVariables>;
export function getMyCourseProgress(dc: DataConnect, vars: GetMyCourseProgressVariables, options?: ExecuteQueryOptions): QueryPromise<GetMyCourseProgressData, GetMyCourseProgressVariables>;

interface GetCourseForEnrollmentRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: GetCourseForEnrollmentVariables): QueryRef<GetCourseForEnrollmentData, GetCourseForEnrollmentVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: GetCourseForEnrollmentVariables): QueryRef<GetCourseForEnrollmentData, GetCourseForEnrollmentVariables>;
  operationName: string;
}
export const getCourseForEnrollmentRef: GetCourseForEnrollmentRef;

export function getCourseForEnrollment(vars: GetCourseForEnrollmentVariables, options?: ExecuteQueryOptions): QueryPromise<GetCourseForEnrollmentData, GetCourseForEnrollmentVariables>;
export function getCourseForEnrollment(dc: DataConnect, vars: GetCourseForEnrollmentVariables, options?: ExecuteQueryOptions): QueryPromise<GetCourseForEnrollmentData, GetCourseForEnrollmentVariables>;

interface AdminGetCourseRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: AdminGetCourseVariables): QueryRef<AdminGetCourseData, AdminGetCourseVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: AdminGetCourseVariables): QueryRef<AdminGetCourseData, AdminGetCourseVariables>;
  operationName: string;
}
export const adminGetCourseRef: AdminGetCourseRef;

export function adminGetCourse(vars: AdminGetCourseVariables, options?: ExecuteQueryOptions): QueryPromise<AdminGetCourseData, AdminGetCourseVariables>;
export function adminGetCourse(dc: DataConnect, vars: AdminGetCourseVariables, options?: ExecuteQueryOptions): QueryPromise<AdminGetCourseData, AdminGetCourseVariables>;

interface AdminListMyCoursesRef {
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<AdminListMyCoursesData, undefined>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect): QueryRef<AdminListMyCoursesData, undefined>;
  operationName: string;
}
export const adminListMyCoursesRef: AdminListMyCoursesRef;

export function adminListMyCourses(options?: ExecuteQueryOptions): QueryPromise<AdminListMyCoursesData, undefined>;
export function adminListMyCourses(dc: DataConnect, options?: ExecuteQueryOptions): QueryPromise<AdminListMyCoursesData, undefined>;

interface AdminCreateCourseRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: AdminCreateCourseVariables): MutationRef<AdminCreateCourseData, AdminCreateCourseVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: AdminCreateCourseVariables): MutationRef<AdminCreateCourseData, AdminCreateCourseVariables>;
  operationName: string;
}
export const adminCreateCourseRef: AdminCreateCourseRef;

export function adminCreateCourse(vars: AdminCreateCourseVariables): MutationPromise<AdminCreateCourseData, AdminCreateCourseVariables>;
export function adminCreateCourse(dc: DataConnect, vars: AdminCreateCourseVariables): MutationPromise<AdminCreateCourseData, AdminCreateCourseVariables>;

interface AdminUpdateCourseRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: AdminUpdateCourseVariables): MutationRef<AdminUpdateCourseData, AdminUpdateCourseVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: AdminUpdateCourseVariables): MutationRef<AdminUpdateCourseData, AdminUpdateCourseVariables>;
  operationName: string;
}
export const adminUpdateCourseRef: AdminUpdateCourseRef;

export function adminUpdateCourse(vars: AdminUpdateCourseVariables): MutationPromise<AdminUpdateCourseData, AdminUpdateCourseVariables>;
export function adminUpdateCourse(dc: DataConnect, vars: AdminUpdateCourseVariables): MutationPromise<AdminUpdateCourseData, AdminUpdateCourseVariables>;

interface AdminUpdateCourseStatusRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: AdminUpdateCourseStatusVariables): MutationRef<AdminUpdateCourseStatusData, AdminUpdateCourseStatusVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: AdminUpdateCourseStatusVariables): MutationRef<AdminUpdateCourseStatusData, AdminUpdateCourseStatusVariables>;
  operationName: string;
}
export const adminUpdateCourseStatusRef: AdminUpdateCourseStatusRef;

export function adminUpdateCourseStatus(vars: AdminUpdateCourseStatusVariables): MutationPromise<AdminUpdateCourseStatusData, AdminUpdateCourseStatusVariables>;
export function adminUpdateCourseStatus(dc: DataConnect, vars: AdminUpdateCourseStatusVariables): MutationPromise<AdminUpdateCourseStatusData, AdminUpdateCourseStatusVariables>;

interface AdminSoftDeleteCourseRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: AdminSoftDeleteCourseVariables): MutationRef<AdminSoftDeleteCourseData, AdminSoftDeleteCourseVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: AdminSoftDeleteCourseVariables): MutationRef<AdminSoftDeleteCourseData, AdminSoftDeleteCourseVariables>;
  operationName: string;
}
export const adminSoftDeleteCourseRef: AdminSoftDeleteCourseRef;

export function adminSoftDeleteCourse(vars: AdminSoftDeleteCourseVariables): MutationPromise<AdminSoftDeleteCourseData, AdminSoftDeleteCourseVariables>;
export function adminSoftDeleteCourse(dc: DataConnect, vars: AdminSoftDeleteCourseVariables): MutationPromise<AdminSoftDeleteCourseData, AdminSoftDeleteCourseVariables>;

interface AdminCreateSectionRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: AdminCreateSectionVariables): MutationRef<AdminCreateSectionData, AdminCreateSectionVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: AdminCreateSectionVariables): MutationRef<AdminCreateSectionData, AdminCreateSectionVariables>;
  operationName: string;
}
export const adminCreateSectionRef: AdminCreateSectionRef;

export function adminCreateSection(vars: AdminCreateSectionVariables): MutationPromise<AdminCreateSectionData, AdminCreateSectionVariables>;
export function adminCreateSection(dc: DataConnect, vars: AdminCreateSectionVariables): MutationPromise<AdminCreateSectionData, AdminCreateSectionVariables>;

interface AdminUpdateSectionRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: AdminUpdateSectionVariables): MutationRef<AdminUpdateSectionData, AdminUpdateSectionVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: AdminUpdateSectionVariables): MutationRef<AdminUpdateSectionData, AdminUpdateSectionVariables>;
  operationName: string;
}
export const adminUpdateSectionRef: AdminUpdateSectionRef;

export function adminUpdateSection(vars: AdminUpdateSectionVariables): MutationPromise<AdminUpdateSectionData, AdminUpdateSectionVariables>;
export function adminUpdateSection(dc: DataConnect, vars: AdminUpdateSectionVariables): MutationPromise<AdminUpdateSectionData, AdminUpdateSectionVariables>;

interface AdminSoftDeleteSectionRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: AdminSoftDeleteSectionVariables): MutationRef<AdminSoftDeleteSectionData, AdminSoftDeleteSectionVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: AdminSoftDeleteSectionVariables): MutationRef<AdminSoftDeleteSectionData, AdminSoftDeleteSectionVariables>;
  operationName: string;
}
export const adminSoftDeleteSectionRef: AdminSoftDeleteSectionRef;

export function adminSoftDeleteSection(vars: AdminSoftDeleteSectionVariables): MutationPromise<AdminSoftDeleteSectionData, AdminSoftDeleteSectionVariables>;
export function adminSoftDeleteSection(dc: DataConnect, vars: AdminSoftDeleteSectionVariables): MutationPromise<AdminSoftDeleteSectionData, AdminSoftDeleteSectionVariables>;

interface AdminUpdateSectionOrderRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: AdminUpdateSectionOrderVariables): MutationRef<AdminUpdateSectionOrderData, AdminUpdateSectionOrderVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: AdminUpdateSectionOrderVariables): MutationRef<AdminUpdateSectionOrderData, AdminUpdateSectionOrderVariables>;
  operationName: string;
}
export const adminUpdateSectionOrderRef: AdminUpdateSectionOrderRef;

export function adminUpdateSectionOrder(vars: AdminUpdateSectionOrderVariables): MutationPromise<AdminUpdateSectionOrderData, AdminUpdateSectionOrderVariables>;
export function adminUpdateSectionOrder(dc: DataConnect, vars: AdminUpdateSectionOrderVariables): MutationPromise<AdminUpdateSectionOrderData, AdminUpdateSectionOrderVariables>;

interface AdminCreateLectureFullRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: AdminCreateLectureFullVariables): MutationRef<AdminCreateLectureFullData, AdminCreateLectureFullVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: AdminCreateLectureFullVariables): MutationRef<AdminCreateLectureFullData, AdminCreateLectureFullVariables>;
  operationName: string;
}
export const adminCreateLectureFullRef: AdminCreateLectureFullRef;

export function adminCreateLectureFull(vars: AdminCreateLectureFullVariables): MutationPromise<AdminCreateLectureFullData, AdminCreateLectureFullVariables>;
export function adminCreateLectureFull(dc: DataConnect, vars: AdminCreateLectureFullVariables): MutationPromise<AdminCreateLectureFullData, AdminCreateLectureFullVariables>;

interface AdminUpdateLectureRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: AdminUpdateLectureVariables): MutationRef<AdminUpdateLectureData, AdminUpdateLectureVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: AdminUpdateLectureVariables): MutationRef<AdminUpdateLectureData, AdminUpdateLectureVariables>;
  operationName: string;
}
export const adminUpdateLectureRef: AdminUpdateLectureRef;

export function adminUpdateLecture(vars: AdminUpdateLectureVariables): MutationPromise<AdminUpdateLectureData, AdminUpdateLectureVariables>;
export function adminUpdateLecture(dc: DataConnect, vars: AdminUpdateLectureVariables): MutationPromise<AdminUpdateLectureData, AdminUpdateLectureVariables>;

interface AdminSoftDeleteLectureRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: AdminSoftDeleteLectureVariables): MutationRef<AdminSoftDeleteLectureData, AdminSoftDeleteLectureVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: AdminSoftDeleteLectureVariables): MutationRef<AdminSoftDeleteLectureData, AdminSoftDeleteLectureVariables>;
  operationName: string;
}
export const adminSoftDeleteLectureRef: AdminSoftDeleteLectureRef;

export function adminSoftDeleteLecture(vars: AdminSoftDeleteLectureVariables): MutationPromise<AdminSoftDeleteLectureData, AdminSoftDeleteLectureVariables>;
export function adminSoftDeleteLecture(dc: DataConnect, vars: AdminSoftDeleteLectureVariables): MutationPromise<AdminSoftDeleteLectureData, AdminSoftDeleteLectureVariables>;

interface AdminUpdateLectureOrderRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: AdminUpdateLectureOrderVariables): MutationRef<AdminUpdateLectureOrderData, AdminUpdateLectureOrderVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: AdminUpdateLectureOrderVariables): MutationRef<AdminUpdateLectureOrderData, AdminUpdateLectureOrderVariables>;
  operationName: string;
}
export const adminUpdateLectureOrderRef: AdminUpdateLectureOrderRef;

export function adminUpdateLectureOrder(vars: AdminUpdateLectureOrderVariables): MutationPromise<AdminUpdateLectureOrderData, AdminUpdateLectureOrderVariables>;
export function adminUpdateLectureOrder(dc: DataConnect, vars: AdminUpdateLectureOrderVariables): MutationPromise<AdminUpdateLectureOrderData, AdminUpdateLectureOrderVariables>;

interface AdminMoveLectureToSectionRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: AdminMoveLectureToSectionVariables): MutationRef<AdminMoveLectureToSectionData, AdminMoveLectureToSectionVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: AdminMoveLectureToSectionVariables): MutationRef<AdminMoveLectureToSectionData, AdminMoveLectureToSectionVariables>;
  operationName: string;
}
export const adminMoveLectureToSectionRef: AdminMoveLectureToSectionRef;

export function adminMoveLectureToSection(vars: AdminMoveLectureToSectionVariables): MutationPromise<AdminMoveLectureToSectionData, AdminMoveLectureToSectionVariables>;
export function adminMoveLectureToSection(dc: DataConnect, vars: AdminMoveLectureToSectionVariables): MutationPromise<AdminMoveLectureToSectionData, AdminMoveLectureToSectionVariables>;

interface AdminSoftDeleteLecturesBySectionRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: AdminSoftDeleteLecturesBySectionVariables): MutationRef<AdminSoftDeleteLecturesBySectionData, AdminSoftDeleteLecturesBySectionVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: AdminSoftDeleteLecturesBySectionVariables): MutationRef<AdminSoftDeleteLecturesBySectionData, AdminSoftDeleteLecturesBySectionVariables>;
  operationName: string;
}
export const adminSoftDeleteLecturesBySectionRef: AdminSoftDeleteLecturesBySectionRef;

export function adminSoftDeleteLecturesBySection(vars: AdminSoftDeleteLecturesBySectionVariables): MutationPromise<AdminSoftDeleteLecturesBySectionData, AdminSoftDeleteLecturesBySectionVariables>;
export function adminSoftDeleteLecturesBySection(dc: DataConnect, vars: AdminSoftDeleteLecturesBySectionVariables): MutationPromise<AdminSoftDeleteLecturesBySectionData, AdminSoftDeleteLecturesBySectionVariables>;

interface GetPendingSubmissionsRef {
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<GetPendingSubmissionsData, undefined>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect): QueryRef<GetPendingSubmissionsData, undefined>;
  operationName: string;
}
export const getPendingSubmissionsRef: GetPendingSubmissionsRef;

export function getPendingSubmissions(options?: ExecuteQueryOptions): QueryPromise<GetPendingSubmissionsData, undefined>;
export function getPendingSubmissions(dc: DataConnect, options?: ExecuteQueryOptions): QueryPromise<GetPendingSubmissionsData, undefined>;

interface GetMyPendingSubmissionsRef {
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<GetMyPendingSubmissionsData, undefined>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect): QueryRef<GetMyPendingSubmissionsData, undefined>;
  operationName: string;
}
export const getMyPendingSubmissionsRef: GetMyPendingSubmissionsRef;

export function getMyPendingSubmissions(options?: ExecuteQueryOptions): QueryPromise<GetMyPendingSubmissionsData, undefined>;
export function getMyPendingSubmissions(dc: DataConnect, options?: ExecuteQueryOptions): QueryPromise<GetMyPendingSubmissionsData, undefined>;

interface AdminAddCourseInstructorRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: AdminAddCourseInstructorVariables): MutationRef<AdminAddCourseInstructorData, AdminAddCourseInstructorVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: AdminAddCourseInstructorVariables): MutationRef<AdminAddCourseInstructorData, AdminAddCourseInstructorVariables>;
  operationName: string;
}
export const adminAddCourseInstructorRef: AdminAddCourseInstructorRef;

export function adminAddCourseInstructor(vars: AdminAddCourseInstructorVariables): MutationPromise<AdminAddCourseInstructorData, AdminAddCourseInstructorVariables>;
export function adminAddCourseInstructor(dc: DataConnect, vars: AdminAddCourseInstructorVariables): MutationPromise<AdminAddCourseInstructorData, AdminAddCourseInstructorVariables>;

interface AdminRemoveCourseInstructorRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: AdminRemoveCourseInstructorVariables): MutationRef<AdminRemoveCourseInstructorData, AdminRemoveCourseInstructorVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: AdminRemoveCourseInstructorVariables): MutationRef<AdminRemoveCourseInstructorData, AdminRemoveCourseInstructorVariables>;
  operationName: string;
}
export const adminRemoveCourseInstructorRef: AdminRemoveCourseInstructorRef;

export function adminRemoveCourseInstructor(vars: AdminRemoveCourseInstructorVariables): MutationPromise<AdminRemoveCourseInstructorData, AdminRemoveCourseInstructorVariables>;
export function adminRemoveCourseInstructor(dc: DataConnect, vars: AdminRemoveCourseInstructorVariables): MutationPromise<AdminRemoveCourseInstructorData, AdminRemoveCourseInstructorVariables>;

interface GetCourseInstructorsRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: GetCourseInstructorsVariables): QueryRef<GetCourseInstructorsData, GetCourseInstructorsVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: GetCourseInstructorsVariables): QueryRef<GetCourseInstructorsData, GetCourseInstructorsVariables>;
  operationName: string;
}
export const getCourseInstructorsRef: GetCourseInstructorsRef;

export function getCourseInstructors(vars: GetCourseInstructorsVariables, options?: ExecuteQueryOptions): QueryPromise<GetCourseInstructorsData, GetCourseInstructorsVariables>;
export function getCourseInstructors(dc: DataConnect, vars: GetCourseInstructorsVariables, options?: ExecuteQueryOptions): QueryPromise<GetCourseInstructorsData, GetCourseInstructorsVariables>;

interface EnrollInCourseRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: EnrollInCourseVariables): MutationRef<EnrollInCourseData, EnrollInCourseVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: EnrollInCourseVariables): MutationRef<EnrollInCourseData, EnrollInCourseVariables>;
  operationName: string;
}
export const enrollInCourseRef: EnrollInCourseRef;

export function enrollInCourse(vars: EnrollInCourseVariables): MutationPromise<EnrollInCourseData, EnrollInCourseVariables>;
export function enrollInCourse(dc: DataConnect, vars: EnrollInCourseVariables): MutationPromise<EnrollInCourseData, EnrollInCourseVariables>;

interface EnrollInMissionRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: EnrollInMissionVariables): MutationRef<EnrollInMissionData, EnrollInMissionVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: EnrollInMissionVariables): MutationRef<EnrollInMissionData, EnrollInMissionVariables>;
  operationName: string;
}
export const enrollInMissionRef: EnrollInMissionRef;

export function enrollInMission(vars: EnrollInMissionVariables): MutationPromise<EnrollInMissionData, EnrollInMissionVariables>;
export function enrollInMission(dc: DataConnect, vars: EnrollInMissionVariables): MutationPromise<EnrollInMissionData, EnrollInMissionVariables>;

interface UpdateLectureProgressRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: UpdateLectureProgressVariables): MutationRef<UpdateLectureProgressData, UpdateLectureProgressVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: UpdateLectureProgressVariables): MutationRef<UpdateLectureProgressData, UpdateLectureProgressVariables>;
  operationName: string;
}
export const updateLectureProgressRef: UpdateLectureProgressRef;

export function updateLectureProgress(vars: UpdateLectureProgressVariables): MutationPromise<UpdateLectureProgressData, UpdateLectureProgressVariables>;
export function updateLectureProgress(dc: DataConnect, vars: UpdateLectureProgressVariables): MutationPromise<UpdateLectureProgressData, UpdateLectureProgressVariables>;

interface AdminUpsertLectureProgressRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: AdminUpsertLectureProgressVariables): MutationRef<AdminUpsertLectureProgressData, AdminUpsertLectureProgressVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: AdminUpsertLectureProgressVariables): MutationRef<AdminUpsertLectureProgressData, AdminUpsertLectureProgressVariables>;
  operationName: string;
}
export const adminUpsertLectureProgressRef: AdminUpsertLectureProgressRef;

export function adminUpsertLectureProgress(vars: AdminUpsertLectureProgressVariables): MutationPromise<AdminUpsertLectureProgressData, AdminUpsertLectureProgressVariables>;
export function adminUpsertLectureProgress(dc: DataConnect, vars: AdminUpsertLectureProgressVariables): MutationPromise<AdminUpsertLectureProgressData, AdminUpsertLectureProgressVariables>;

interface GetLectureDurationRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: GetLectureDurationVariables): QueryRef<GetLectureDurationData, GetLectureDurationVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: GetLectureDurationVariables): QueryRef<GetLectureDurationData, GetLectureDurationVariables>;
  operationName: string;
}
export const getLectureDurationRef: GetLectureDurationRef;

export function getLectureDuration(vars: GetLectureDurationVariables, options?: ExecuteQueryOptions): QueryPromise<GetLectureDurationData, GetLectureDurationVariables>;
export function getLectureDuration(dc: DataConnect, vars: GetLectureDurationVariables, options?: ExecuteQueryOptions): QueryPromise<GetLectureDurationData, GetLectureDurationVariables>;

interface GetCourseCompletionStatusRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: GetCourseCompletionStatusVariables): QueryRef<GetCourseCompletionStatusData, GetCourseCompletionStatusVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: GetCourseCompletionStatusVariables): QueryRef<GetCourseCompletionStatusData, GetCourseCompletionStatusVariables>;
  operationName: string;
}
export const getCourseCompletionStatusRef: GetCourseCompletionStatusRef;

export function getCourseCompletionStatus(vars: GetCourseCompletionStatusVariables, options?: ExecuteQueryOptions): QueryPromise<GetCourseCompletionStatusData, GetCourseCompletionStatusVariables>;
export function getCourseCompletionStatus(dc: DataConnect, vars: GetCourseCompletionStatusVariables, options?: ExecuteQueryOptions): QueryPromise<GetCourseCompletionStatusData, GetCourseCompletionStatusVariables>;

interface GetCourseCompletionStatusForUserRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: GetCourseCompletionStatusForUserVariables): QueryRef<GetCourseCompletionStatusForUserData, GetCourseCompletionStatusForUserVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: GetCourseCompletionStatusForUserVariables): QueryRef<GetCourseCompletionStatusForUserData, GetCourseCompletionStatusForUserVariables>;
  operationName: string;
}
export const getCourseCompletionStatusForUserRef: GetCourseCompletionStatusForUserRef;

export function getCourseCompletionStatusForUser(vars: GetCourseCompletionStatusForUserVariables, options?: ExecuteQueryOptions): QueryPromise<GetCourseCompletionStatusForUserData, GetCourseCompletionStatusForUserVariables>;
export function getCourseCompletionStatusForUser(dc: DataConnect, vars: GetCourseCompletionStatusForUserVariables, options?: ExecuteQueryOptions): QueryPromise<GetCourseCompletionStatusForUserData, GetCourseCompletionStatusForUserVariables>;

interface GetUserEnrollmentForCourseByUserRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: GetUserEnrollmentForCourseByUserVariables): QueryRef<GetUserEnrollmentForCourseByUserData, GetUserEnrollmentForCourseByUserVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: GetUserEnrollmentForCourseByUserVariables): QueryRef<GetUserEnrollmentForCourseByUserData, GetUserEnrollmentForCourseByUserVariables>;
  operationName: string;
}
export const getUserEnrollmentForCourseByUserRef: GetUserEnrollmentForCourseByUserRef;

export function getUserEnrollmentForCourseByUser(vars: GetUserEnrollmentForCourseByUserVariables, options?: ExecuteQueryOptions): QueryPromise<GetUserEnrollmentForCourseByUserData, GetUserEnrollmentForCourseByUserVariables>;
export function getUserEnrollmentForCourseByUser(dc: DataConnect, vars: GetUserEnrollmentForCourseByUserVariables, options?: ExecuteQueryOptions): QueryPromise<GetUserEnrollmentForCourseByUserData, GetUserEnrollmentForCourseByUserVariables>;

interface UpdateEnrollmentStatusRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: UpdateEnrollmentStatusVariables): MutationRef<UpdateEnrollmentStatusData, UpdateEnrollmentStatusVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: UpdateEnrollmentStatusVariables): MutationRef<UpdateEnrollmentStatusData, UpdateEnrollmentStatusVariables>;
  operationName: string;
}
export const updateEnrollmentStatusRef: UpdateEnrollmentStatusRef;

export function updateEnrollmentStatus(vars: UpdateEnrollmentStatusVariables): MutationPromise<UpdateEnrollmentStatusData, UpdateEnrollmentStatusVariables>;
export function updateEnrollmentStatus(dc: DataConnect, vars: UpdateEnrollmentStatusVariables): MutationPromise<UpdateEnrollmentStatusData, UpdateEnrollmentStatusVariables>;

interface GetUserEnrollmentForCourseRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: GetUserEnrollmentForCourseVariables): QueryRef<GetUserEnrollmentForCourseData, GetUserEnrollmentForCourseVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: GetUserEnrollmentForCourseVariables): QueryRef<GetUserEnrollmentForCourseData, GetUserEnrollmentForCourseVariables>;
  operationName: string;
}
export const getUserEnrollmentForCourseRef: GetUserEnrollmentForCourseRef;

export function getUserEnrollmentForCourse(vars: GetUserEnrollmentForCourseVariables, options?: ExecuteQueryOptions): QueryPromise<GetUserEnrollmentForCourseData, GetUserEnrollmentForCourseVariables>;
export function getUserEnrollmentForCourse(dc: DataConnect, vars: GetUserEnrollmentForCourseVariables, options?: ExecuteQueryOptions): QueryPromise<GetUserEnrollmentForCourseData, GetUserEnrollmentForCourseVariables>;

interface GetUserEnrollmentForMissionRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: GetUserEnrollmentForMissionVariables): QueryRef<GetUserEnrollmentForMissionData, GetUserEnrollmentForMissionVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: GetUserEnrollmentForMissionVariables): QueryRef<GetUserEnrollmentForMissionData, GetUserEnrollmentForMissionVariables>;
  operationName: string;
}
export const getUserEnrollmentForMissionRef: GetUserEnrollmentForMissionRef;

export function getUserEnrollmentForMission(vars: GetUserEnrollmentForMissionVariables, options?: ExecuteQueryOptions): QueryPromise<GetUserEnrollmentForMissionData, GetUserEnrollmentForMissionVariables>;
export function getUserEnrollmentForMission(dc: DataConnect, vars: GetUserEnrollmentForMissionVariables, options?: ExecuteQueryOptions): QueryPromise<GetUserEnrollmentForMissionData, GetUserEnrollmentForMissionVariables>;

interface GetMissionForEnrollmentRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: GetMissionForEnrollmentVariables): QueryRef<GetMissionForEnrollmentData, GetMissionForEnrollmentVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: GetMissionForEnrollmentVariables): QueryRef<GetMissionForEnrollmentData, GetMissionForEnrollmentVariables>;
  operationName: string;
}
export const getMissionForEnrollmentRef: GetMissionForEnrollmentRef;

export function getMissionForEnrollment(vars: GetMissionForEnrollmentVariables, options?: ExecuteQueryOptions): QueryPromise<GetMissionForEnrollmentData, GetMissionForEnrollmentVariables>;
export function getMissionForEnrollment(dc: DataConnect, vars: GetMissionForEnrollmentVariables, options?: ExecuteQueryOptions): QueryPromise<GetMissionForEnrollmentData, GetMissionForEnrollmentVariables>;

interface SubmitMissionRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: SubmitMissionVariables): MutationRef<SubmitMissionData, SubmitMissionVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: SubmitMissionVariables): MutationRef<SubmitMissionData, SubmitMissionVariables>;
  operationName: string;
}
export const submitMissionRef: SubmitMissionRef;

export function submitMission(vars: SubmitMissionVariables): MutationPromise<SubmitMissionData, SubmitMissionVariables>;
export function submitMission(dc: DataConnect, vars: SubmitMissionVariables): MutationPromise<SubmitMissionData, SubmitMissionVariables>;

interface MySubmissionsRef {
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<MySubmissionsData, undefined>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect): QueryRef<MySubmissionsData, undefined>;
  operationName: string;
}
export const mySubmissionsRef: MySubmissionsRef;

export function mySubmissions(options?: ExecuteQueryOptions): QueryPromise<MySubmissionsData, undefined>;
export function mySubmissions(dc: DataConnect, options?: ExecuteQueryOptions): QueryPromise<MySubmissionsData, undefined>;

interface GradeSubmissionRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: GradeSubmissionVariables): MutationRef<GradeSubmissionData, GradeSubmissionVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: GradeSubmissionVariables): MutationRef<GradeSubmissionData, GradeSubmissionVariables>;
  operationName: string;
}
export const gradeSubmissionRef: GradeSubmissionRef;

export function gradeSubmission(vars: GradeSubmissionVariables): MutationPromise<GradeSubmissionData, GradeSubmissionVariables>;
export function gradeSubmission(dc: DataConnect, vars: GradeSubmissionVariables): MutationPromise<GradeSubmissionData, GradeSubmissionVariables>;

interface AddCriterionScoreRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: AddCriterionScoreVariables): MutationRef<AddCriterionScoreData, AddCriterionScoreVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: AddCriterionScoreVariables): MutationRef<AddCriterionScoreData, AddCriterionScoreVariables>;
  operationName: string;
}
export const addCriterionScoreRef: AddCriterionScoreRef;

export function addCriterionScore(vars: AddCriterionScoreVariables): MutationPromise<AddCriterionScoreData, AddCriterionScoreVariables>;
export function addCriterionScore(dc: DataConnect, vars: AddCriterionScoreVariables): MutationPromise<AddCriterionScoreData, AddCriterionScoreVariables>;

interface GetSubmissionForGradingRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: GetSubmissionForGradingVariables): QueryRef<GetSubmissionForGradingData, GetSubmissionForGradingVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: GetSubmissionForGradingVariables): QueryRef<GetSubmissionForGradingData, GetSubmissionForGradingVariables>;
  operationName: string;
}
export const getSubmissionForGradingRef: GetSubmissionForGradingRef;

export function getSubmissionForGrading(vars: GetSubmissionForGradingVariables, options?: ExecuteQueryOptions): QueryPromise<GetSubmissionForGradingData, GetSubmissionForGradingVariables>;
export function getSubmissionForGrading(dc: DataConnect, vars: GetSubmissionForGradingVariables, options?: ExecuteQueryOptions): QueryPromise<GetSubmissionForGradingData, GetSubmissionForGradingVariables>;

interface GetEnrollmentForUserMissionRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: GetEnrollmentForUserMissionVariables): QueryRef<GetEnrollmentForUserMissionData, GetEnrollmentForUserMissionVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: GetEnrollmentForUserMissionVariables): QueryRef<GetEnrollmentForUserMissionData, GetEnrollmentForUserMissionVariables>;
  operationName: string;
}
export const getEnrollmentForUserMissionRef: GetEnrollmentForUserMissionRef;

export function getEnrollmentForUserMission(vars: GetEnrollmentForUserMissionVariables, options?: ExecuteQueryOptions): QueryPromise<GetEnrollmentForUserMissionData, GetEnrollmentForUserMissionVariables>;
export function getEnrollmentForUserMission(dc: DataConnect, vars: GetEnrollmentForUserMissionVariables, options?: ExecuteQueryOptions): QueryPromise<GetEnrollmentForUserMissionData, GetEnrollmentForUserMissionVariables>;

interface AdminCreateMissionRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: AdminCreateMissionVariables): MutationRef<AdminCreateMissionData, AdminCreateMissionVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: AdminCreateMissionVariables): MutationRef<AdminCreateMissionData, AdminCreateMissionVariables>;
  operationName: string;
}
export const adminCreateMissionRef: AdminCreateMissionRef;

export function adminCreateMission(vars: AdminCreateMissionVariables): MutationPromise<AdminCreateMissionData, AdminCreateMissionVariables>;
export function adminCreateMission(dc: DataConnect, vars: AdminCreateMissionVariables): MutationPromise<AdminCreateMissionData, AdminCreateMissionVariables>;

interface AdminUpdateMissionRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: AdminUpdateMissionVariables): MutationRef<AdminUpdateMissionData, AdminUpdateMissionVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: AdminUpdateMissionVariables): MutationRef<AdminUpdateMissionData, AdminUpdateMissionVariables>;
  operationName: string;
}
export const adminUpdateMissionRef: AdminUpdateMissionRef;

export function adminUpdateMission(vars: AdminUpdateMissionVariables): MutationPromise<AdminUpdateMissionData, AdminUpdateMissionVariables>;
export function adminUpdateMission(dc: DataConnect, vars: AdminUpdateMissionVariables): MutationPromise<AdminUpdateMissionData, AdminUpdateMissionVariables>;

interface AdminSoftDeleteMissionRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: AdminSoftDeleteMissionVariables): MutationRef<AdminSoftDeleteMissionData, AdminSoftDeleteMissionVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: AdminSoftDeleteMissionVariables): MutationRef<AdminSoftDeleteMissionData, AdminSoftDeleteMissionVariables>;
  operationName: string;
}
export const adminSoftDeleteMissionRef: AdminSoftDeleteMissionRef;

export function adminSoftDeleteMission(vars: AdminSoftDeleteMissionVariables): MutationPromise<AdminSoftDeleteMissionData, AdminSoftDeleteMissionVariables>;
export function adminSoftDeleteMission(dc: DataConnect, vars: AdminSoftDeleteMissionVariables): MutationPromise<AdminSoftDeleteMissionData, AdminSoftDeleteMissionVariables>;

interface AdminGetMissionRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: AdminGetMissionVariables): QueryRef<AdminGetMissionData, AdminGetMissionVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: AdminGetMissionVariables): QueryRef<AdminGetMissionData, AdminGetMissionVariables>;
  operationName: string;
}
export const adminGetMissionRef: AdminGetMissionRef;

export function adminGetMission(vars: AdminGetMissionVariables, options?: ExecuteQueryOptions): QueryPromise<AdminGetMissionData, AdminGetMissionVariables>;
export function adminGetMission(dc: DataConnect, vars: AdminGetMissionVariables, options?: ExecuteQueryOptions): QueryPromise<AdminGetMissionData, AdminGetMissionVariables>;

interface AdminListMyMissionsRef {
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<AdminListMyMissionsData, undefined>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect): QueryRef<AdminListMyMissionsData, undefined>;
  operationName: string;
}
export const adminListMyMissionsRef: AdminListMyMissionsRef;

export function adminListMyMissions(options?: ExecuteQueryOptions): QueryPromise<AdminListMyMissionsData, undefined>;
export function adminListMyMissions(dc: DataConnect, options?: ExecuteQueryOptions): QueryPromise<AdminListMyMissionsData, undefined>;

interface AdminCreateMicroLessonRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: AdminCreateMicroLessonVariables): MutationRef<AdminCreateMicroLessonData, AdminCreateMicroLessonVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: AdminCreateMicroLessonVariables): MutationRef<AdminCreateMicroLessonData, AdminCreateMicroLessonVariables>;
  operationName: string;
}
export const adminCreateMicroLessonRef: AdminCreateMicroLessonRef;

export function adminCreateMicroLesson(vars: AdminCreateMicroLessonVariables): MutationPromise<AdminCreateMicroLessonData, AdminCreateMicroLessonVariables>;
export function adminCreateMicroLesson(dc: DataConnect, vars: AdminCreateMicroLessonVariables): MutationPromise<AdminCreateMicroLessonData, AdminCreateMicroLessonVariables>;

interface AdminUpdateMicroLessonRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: AdminUpdateMicroLessonVariables): MutationRef<AdminUpdateMicroLessonData, AdminUpdateMicroLessonVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: AdminUpdateMicroLessonVariables): MutationRef<AdminUpdateMicroLessonData, AdminUpdateMicroLessonVariables>;
  operationName: string;
}
export const adminUpdateMicroLessonRef: AdminUpdateMicroLessonRef;

export function adminUpdateMicroLesson(vars: AdminUpdateMicroLessonVariables): MutationPromise<AdminUpdateMicroLessonData, AdminUpdateMicroLessonVariables>;
export function adminUpdateMicroLesson(dc: DataConnect, vars: AdminUpdateMicroLessonVariables): MutationPromise<AdminUpdateMicroLessonData, AdminUpdateMicroLessonVariables>;

interface AdminDeleteMicroLessonRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: AdminDeleteMicroLessonVariables): MutationRef<AdminDeleteMicroLessonData, AdminDeleteMicroLessonVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: AdminDeleteMicroLessonVariables): MutationRef<AdminDeleteMicroLessonData, AdminDeleteMicroLessonVariables>;
  operationName: string;
}
export const adminDeleteMicroLessonRef: AdminDeleteMicroLessonRef;

export function adminDeleteMicroLesson(vars: AdminDeleteMicroLessonVariables): MutationPromise<AdminDeleteMicroLessonData, AdminDeleteMicroLessonVariables>;
export function adminDeleteMicroLesson(dc: DataConnect, vars: AdminDeleteMicroLessonVariables): MutationPromise<AdminDeleteMicroLessonData, AdminDeleteMicroLessonVariables>;

interface AdminUpdateMicroLessonOrderRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: AdminUpdateMicroLessonOrderVariables): MutationRef<AdminUpdateMicroLessonOrderData, AdminUpdateMicroLessonOrderVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: AdminUpdateMicroLessonOrderVariables): MutationRef<AdminUpdateMicroLessonOrderData, AdminUpdateMicroLessonOrderVariables>;
  operationName: string;
}
export const adminUpdateMicroLessonOrderRef: AdminUpdateMicroLessonOrderRef;

export function adminUpdateMicroLessonOrder(vars: AdminUpdateMicroLessonOrderVariables): MutationPromise<AdminUpdateMicroLessonOrderData, AdminUpdateMicroLessonOrderVariables>;
export function adminUpdateMicroLessonOrder(dc: DataConnect, vars: AdminUpdateMicroLessonOrderVariables): MutationPromise<AdminUpdateMicroLessonOrderData, AdminUpdateMicroLessonOrderVariables>;

interface AdminCreateMissionTemplateRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: AdminCreateMissionTemplateVariables): MutationRef<AdminCreateMissionTemplateData, AdminCreateMissionTemplateVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: AdminCreateMissionTemplateVariables): MutationRef<AdminCreateMissionTemplateData, AdminCreateMissionTemplateVariables>;
  operationName: string;
}
export const adminCreateMissionTemplateRef: AdminCreateMissionTemplateRef;

export function adminCreateMissionTemplate(vars: AdminCreateMissionTemplateVariables): MutationPromise<AdminCreateMissionTemplateData, AdminCreateMissionTemplateVariables>;
export function adminCreateMissionTemplate(dc: DataConnect, vars: AdminCreateMissionTemplateVariables): MutationPromise<AdminCreateMissionTemplateData, AdminCreateMissionTemplateVariables>;

interface AdminDeleteMissionTemplateRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: AdminDeleteMissionTemplateVariables): MutationRef<AdminDeleteMissionTemplateData, AdminDeleteMissionTemplateVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: AdminDeleteMissionTemplateVariables): MutationRef<AdminDeleteMissionTemplateData, AdminDeleteMissionTemplateVariables>;
  operationName: string;
}
export const adminDeleteMissionTemplateRef: AdminDeleteMissionTemplateRef;

export function adminDeleteMissionTemplate(vars: AdminDeleteMissionTemplateVariables): MutationPromise<AdminDeleteMissionTemplateData, AdminDeleteMissionTemplateVariables>;
export function adminDeleteMissionTemplate(dc: DataConnect, vars: AdminDeleteMissionTemplateVariables): MutationPromise<AdminDeleteMissionTemplateData, AdminDeleteMissionTemplateVariables>;

interface GetMissionTemplatesRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: GetMissionTemplatesVariables): QueryRef<GetMissionTemplatesData, GetMissionTemplatesVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: GetMissionTemplatesVariables): QueryRef<GetMissionTemplatesData, GetMissionTemplatesVariables>;
  operationName: string;
}
export const getMissionTemplatesRef: GetMissionTemplatesRef;

export function getMissionTemplates(vars: GetMissionTemplatesVariables, options?: ExecuteQueryOptions): QueryPromise<GetMissionTemplatesData, GetMissionTemplatesVariables>;
export function getMissionTemplates(dc: DataConnect, vars: GetMissionTemplatesVariables, options?: ExecuteQueryOptions): QueryPromise<GetMissionTemplatesData, GetMissionTemplatesVariables>;

interface AdminCreateRubricCriterionRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: AdminCreateRubricCriterionVariables): MutationRef<AdminCreateRubricCriterionData, AdminCreateRubricCriterionVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: AdminCreateRubricCriterionVariables): MutationRef<AdminCreateRubricCriterionData, AdminCreateRubricCriterionVariables>;
  operationName: string;
}
export const adminCreateRubricCriterionRef: AdminCreateRubricCriterionRef;

export function adminCreateRubricCriterion(vars: AdminCreateRubricCriterionVariables): MutationPromise<AdminCreateRubricCriterionData, AdminCreateRubricCriterionVariables>;
export function adminCreateRubricCriterion(dc: DataConnect, vars: AdminCreateRubricCriterionVariables): MutationPromise<AdminCreateRubricCriterionData, AdminCreateRubricCriterionVariables>;

interface AdminUpdateRubricCriterionRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: AdminUpdateRubricCriterionVariables): MutationRef<AdminUpdateRubricCriterionData, AdminUpdateRubricCriterionVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: AdminUpdateRubricCriterionVariables): MutationRef<AdminUpdateRubricCriterionData, AdminUpdateRubricCriterionVariables>;
  operationName: string;
}
export const adminUpdateRubricCriterionRef: AdminUpdateRubricCriterionRef;

export function adminUpdateRubricCriterion(vars: AdminUpdateRubricCriterionVariables): MutationPromise<AdminUpdateRubricCriterionData, AdminUpdateRubricCriterionVariables>;
export function adminUpdateRubricCriterion(dc: DataConnect, vars: AdminUpdateRubricCriterionVariables): MutationPromise<AdminUpdateRubricCriterionData, AdminUpdateRubricCriterionVariables>;

interface AdminDeleteRubricCriterionRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: AdminDeleteRubricCriterionVariables): MutationRef<AdminDeleteRubricCriterionData, AdminDeleteRubricCriterionVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: AdminDeleteRubricCriterionVariables): MutationRef<AdminDeleteRubricCriterionData, AdminDeleteRubricCriterionVariables>;
  operationName: string;
}
export const adminDeleteRubricCriterionRef: AdminDeleteRubricCriterionRef;

export function adminDeleteRubricCriterion(vars: AdminDeleteRubricCriterionVariables): MutationPromise<AdminDeleteRubricCriterionData, AdminDeleteRubricCriterionVariables>;
export function adminDeleteRubricCriterion(dc: DataConnect, vars: AdminDeleteRubricCriterionVariables): MutationPromise<AdminDeleteRubricCriterionData, AdminDeleteRubricCriterionVariables>;

interface AdminUpdateRubricCriterionOrderRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: AdminUpdateRubricCriterionOrderVariables): MutationRef<AdminUpdateRubricCriterionOrderData, AdminUpdateRubricCriterionOrderVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: AdminUpdateRubricCriterionOrderVariables): MutationRef<AdminUpdateRubricCriterionOrderData, AdminUpdateRubricCriterionOrderVariables>;
  operationName: string;
}
export const adminUpdateRubricCriterionOrderRef: AdminUpdateRubricCriterionOrderRef;

export function adminUpdateRubricCriterionOrder(vars: AdminUpdateRubricCriterionOrderVariables): MutationPromise<AdminUpdateRubricCriterionOrderData, AdminUpdateRubricCriterionOrderVariables>;
export function adminUpdateRubricCriterionOrder(dc: DataConnect, vars: AdminUpdateRubricCriterionOrderVariables): MutationPromise<AdminUpdateRubricCriterionOrderData, AdminUpdateRubricCriterionOrderVariables>;

interface InstructorDeleteCourseRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: InstructorDeleteCourseVariables): MutationRef<InstructorDeleteCourseData, InstructorDeleteCourseVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: InstructorDeleteCourseVariables): MutationRef<InstructorDeleteCourseData, InstructorDeleteCourseVariables>;
  operationName: string;
}
export const instructorDeleteCourseRef: InstructorDeleteCourseRef;

export function instructorDeleteCourse(vars: InstructorDeleteCourseVariables): MutationPromise<InstructorDeleteCourseData, InstructorDeleteCourseVariables>;
export function instructorDeleteCourse(dc: DataConnect, vars: InstructorDeleteCourseVariables): MutationPromise<InstructorDeleteCourseData, InstructorDeleteCourseVariables>;

interface SuperAdminDeleteCourseRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: SuperAdminDeleteCourseVariables): MutationRef<SuperAdminDeleteCourseData, SuperAdminDeleteCourseVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: SuperAdminDeleteCourseVariables): MutationRef<SuperAdminDeleteCourseData, SuperAdminDeleteCourseVariables>;
  operationName: string;
}
export const superAdminDeleteCourseRef: SuperAdminDeleteCourseRef;

export function superAdminDeleteCourse(vars: SuperAdminDeleteCourseVariables): MutationPromise<SuperAdminDeleteCourseData, SuperAdminDeleteCourseVariables>;
export function superAdminDeleteCourse(dc: DataConnect, vars: SuperAdminDeleteCourseVariables): MutationPromise<SuperAdminDeleteCourseData, SuperAdminDeleteCourseVariables>;

interface AdminCreateSessionRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: AdminCreateSessionVariables): MutationRef<AdminCreateSessionData, AdminCreateSessionVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: AdminCreateSessionVariables): MutationRef<AdminCreateSessionData, AdminCreateSessionVariables>;
  operationName: string;
}
export const adminCreateSessionRef: AdminCreateSessionRef;

export function adminCreateSession(vars: AdminCreateSessionVariables): MutationPromise<AdminCreateSessionData, AdminCreateSessionVariables>;
export function adminCreateSession(dc: DataConnect, vars: AdminCreateSessionVariables): MutationPromise<AdminCreateSessionData, AdminCreateSessionVariables>;

interface InstructorCancelSessionRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: InstructorCancelSessionVariables): MutationRef<InstructorCancelSessionData, InstructorCancelSessionVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: InstructorCancelSessionVariables): MutationRef<InstructorCancelSessionData, InstructorCancelSessionVariables>;
  operationName: string;
}
export const instructorCancelSessionRef: InstructorCancelSessionRef;

export function instructorCancelSession(vars: InstructorCancelSessionVariables): MutationPromise<InstructorCancelSessionData, InstructorCancelSessionVariables>;
export function instructorCancelSession(dc: DataConnect, vars: InstructorCancelSessionVariables): MutationPromise<InstructorCancelSessionData, InstructorCancelSessionVariables>;

interface SuperAdminCancelSessionRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: SuperAdminCancelSessionVariables): MutationRef<SuperAdminCancelSessionData, SuperAdminCancelSessionVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: SuperAdminCancelSessionVariables): MutationRef<SuperAdminCancelSessionData, SuperAdminCancelSessionVariables>;
  operationName: string;
}
export const superAdminCancelSessionRef: SuperAdminCancelSessionRef;

export function superAdminCancelSession(vars: SuperAdminCancelSessionVariables): MutationPromise<SuperAdminCancelSessionData, SuperAdminCancelSessionVariables>;
export function superAdminCancelSession(dc: DataConnect, vars: SuperAdminCancelSessionVariables): MutationPromise<SuperAdminCancelSessionData, SuperAdminCancelSessionVariables>;

interface AdminCreateSubscriptionTierRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: AdminCreateSubscriptionTierVariables): MutationRef<AdminCreateSubscriptionTierData, AdminCreateSubscriptionTierVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: AdminCreateSubscriptionTierVariables): MutationRef<AdminCreateSubscriptionTierData, AdminCreateSubscriptionTierVariables>;
  operationName: string;
}
export const adminCreateSubscriptionTierRef: AdminCreateSubscriptionTierRef;

export function adminCreateSubscriptionTier(vars: AdminCreateSubscriptionTierVariables): MutationPromise<AdminCreateSubscriptionTierData, AdminCreateSubscriptionTierVariables>;
export function adminCreateSubscriptionTier(dc: DataConnect, vars: AdminCreateSubscriptionTierVariables): MutationPromise<AdminCreateSubscriptionTierData, AdminCreateSubscriptionTierVariables>;

interface AdminDeprecateSubscriptionTierRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: AdminDeprecateSubscriptionTierVariables): MutationRef<AdminDeprecateSubscriptionTierData, AdminDeprecateSubscriptionTierVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: AdminDeprecateSubscriptionTierVariables): MutationRef<AdminDeprecateSubscriptionTierData, AdminDeprecateSubscriptionTierVariables>;
  operationName: string;
}
export const adminDeprecateSubscriptionTierRef: AdminDeprecateSubscriptionTierRef;

export function adminDeprecateSubscriptionTier(vars: AdminDeprecateSubscriptionTierVariables): MutationPromise<AdminDeprecateSubscriptionTierData, AdminDeprecateSubscriptionTierVariables>;
export function adminDeprecateSubscriptionTier(dc: DataConnect, vars: AdminDeprecateSubscriptionTierVariables): MutationPromise<AdminDeprecateSubscriptionTierData, AdminDeprecateSubscriptionTierVariables>;

interface AdminCreateCategoryRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: AdminCreateCategoryVariables): MutationRef<AdminCreateCategoryData, AdminCreateCategoryVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: AdminCreateCategoryVariables): MutationRef<AdminCreateCategoryData, AdminCreateCategoryVariables>;
  operationName: string;
}
export const adminCreateCategoryRef: AdminCreateCategoryRef;

export function adminCreateCategory(vars: AdminCreateCategoryVariables): MutationPromise<AdminCreateCategoryData, AdminCreateCategoryVariables>;
export function adminCreateCategory(dc: DataConnect, vars: AdminCreateCategoryVariables): MutationPromise<AdminCreateCategoryData, AdminCreateCategoryVariables>;

interface GetUserClaimsRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: GetUserClaimsVariables): QueryRef<GetUserClaimsData, GetUserClaimsVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: GetUserClaimsVariables): QueryRef<GetUserClaimsData, GetUserClaimsVariables>;
  operationName: string;
}
export const getUserClaimsRef: GetUserClaimsRef;

export function getUserClaims(vars: GetUserClaimsVariables, options?: ExecuteQueryOptions): QueryPromise<GetUserClaimsData, GetUserClaimsVariables>;
export function getUserClaims(dc: DataConnect, vars: GetUserClaimsVariables, options?: ExecuteQueryOptions): QueryPromise<GetUserClaimsData, GetUserClaimsVariables>;

interface LogPaymentRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: LogPaymentVariables): MutationRef<LogPaymentData, LogPaymentVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: LogPaymentVariables): MutationRef<LogPaymentData, LogPaymentVariables>;
  operationName: string;
}
export const logPaymentRef: LogPaymentRef;

export function logPayment(vars: LogPaymentVariables): MutationPromise<LogPaymentData, LogPaymentVariables>;
export function logPayment(dc: DataConnect, vars: LogPaymentVariables): MutationPromise<LogPaymentData, LogPaymentVariables>;

interface AddPaymentItemRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: AddPaymentItemVariables): MutationRef<AddPaymentItemData, AddPaymentItemVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: AddPaymentItemVariables): MutationRef<AddPaymentItemData, AddPaymentItemVariables>;
  operationName: string;
}
export const addPaymentItemRef: AddPaymentItemRef;

export function addPaymentItem(vars: AddPaymentItemVariables): MutationPromise<AddPaymentItemData, AddPaymentItemVariables>;
export function addPaymentItem(dc: DataConnect, vars: AddPaymentItemVariables): MutationPromise<AddPaymentItemData, AddPaymentItemVariables>;

interface MyPaymentHistoryRef {
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<MyPaymentHistoryData, undefined>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect): QueryRef<MyPaymentHistoryData, undefined>;
  operationName: string;
}
export const myPaymentHistoryRef: MyPaymentHistoryRef;

export function myPaymentHistory(options?: ExecuteQueryOptions): QueryPromise<MyPaymentHistoryData, undefined>;
export function myPaymentHistory(dc: DataConnect, options?: ExecuteQueryOptions): QueryPromise<MyPaymentHistoryData, undefined>;

interface GetQuizQuestionsRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: GetQuizQuestionsVariables): QueryRef<GetQuizQuestionsData, GetQuizQuestionsVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: GetQuizQuestionsVariables): QueryRef<GetQuizQuestionsData, GetQuizQuestionsVariables>;
  operationName: string;
}
export const getQuizQuestionsRef: GetQuizQuestionsRef;

export function getQuizQuestions(vars: GetQuizQuestionsVariables, options?: ExecuteQueryOptions): QueryPromise<GetQuizQuestionsData, GetQuizQuestionsVariables>;
export function getQuizQuestions(dc: DataConnect, vars: GetQuizQuestionsVariables, options?: ExecuteQueryOptions): QueryPromise<GetQuizQuestionsData, GetQuizQuestionsVariables>;

interface StartQuizAttemptRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: StartQuizAttemptVariables): MutationRef<StartQuizAttemptData, StartQuizAttemptVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: StartQuizAttemptVariables): MutationRef<StartQuizAttemptData, StartQuizAttemptVariables>;
  operationName: string;
}
export const startQuizAttemptRef: StartQuizAttemptRef;

export function startQuizAttempt(vars: StartQuizAttemptVariables): MutationPromise<StartQuizAttemptData, StartQuizAttemptVariables>;
export function startQuizAttempt(dc: DataConnect, vars: StartQuizAttemptVariables): MutationPromise<StartQuizAttemptData, StartQuizAttemptVariables>;

interface SubmitQuizAnswerRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: SubmitQuizAnswerVariables): MutationRef<SubmitQuizAnswerData, SubmitQuizAnswerVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: SubmitQuizAnswerVariables): MutationRef<SubmitQuizAnswerData, SubmitQuizAnswerVariables>;
  operationName: string;
}
export const submitQuizAnswerRef: SubmitQuizAnswerRef;

export function submitQuizAnswer(vars: SubmitQuizAnswerVariables): MutationPromise<SubmitQuizAnswerData, SubmitQuizAnswerVariables>;
export function submitQuizAnswer(dc: DataConnect, vars: SubmitQuizAnswerVariables): MutationPromise<SubmitQuizAnswerData, SubmitQuizAnswerVariables>;

interface FinishQuizAttemptIfOpenRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: FinishQuizAttemptIfOpenVariables): MutationRef<FinishQuizAttemptIfOpenData, FinishQuizAttemptIfOpenVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: FinishQuizAttemptIfOpenVariables): MutationRef<FinishQuizAttemptIfOpenData, FinishQuizAttemptIfOpenVariables>;
  operationName: string;
}
export const finishQuizAttemptIfOpenRef: FinishQuizAttemptIfOpenRef;

export function finishQuizAttemptIfOpen(vars: FinishQuizAttemptIfOpenVariables): MutationPromise<FinishQuizAttemptIfOpenData, FinishQuizAttemptIfOpenVariables>;
export function finishQuizAttemptIfOpen(dc: DataConnect, vars: FinishQuizAttemptIfOpenVariables): MutationPromise<FinishQuizAttemptIfOpenData, FinishQuizAttemptIfOpenVariables>;

interface GetExpiredAttemptsRef {
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<GetExpiredAttemptsData, undefined>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect): QueryRef<GetExpiredAttemptsData, undefined>;
  operationName: string;
}
export const getExpiredAttemptsRef: GetExpiredAttemptsRef;

export function getExpiredAttempts(options?: ExecuteQueryOptions): QueryPromise<GetExpiredAttemptsData, undefined>;
export function getExpiredAttempts(dc: DataConnect, options?: ExecuteQueryOptions): QueryPromise<GetExpiredAttemptsData, undefined>;

interface GetUserQuizAttemptsRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: GetUserQuizAttemptsVariables): QueryRef<GetUserQuizAttemptsData, GetUserQuizAttemptsVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: GetUserQuizAttemptsVariables): QueryRef<GetUserQuizAttemptsData, GetUserQuizAttemptsVariables>;
  operationName: string;
}
export const getUserQuizAttemptsRef: GetUserQuizAttemptsRef;

export function getUserQuizAttempts(vars: GetUserQuizAttemptsVariables, options?: ExecuteQueryOptions): QueryPromise<GetUserQuizAttemptsData, GetUserQuizAttemptsVariables>;
export function getUserQuizAttempts(dc: DataConnect, vars: GetUserQuizAttemptsVariables, options?: ExecuteQueryOptions): QueryPromise<GetUserQuizAttemptsData, GetUserQuizAttemptsVariables>;

interface GetQuizAttemptByIdRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: GetQuizAttemptByIdVariables): QueryRef<GetQuizAttemptByIdData, GetQuizAttemptByIdVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: GetQuizAttemptByIdVariables): QueryRef<GetQuizAttemptByIdData, GetQuizAttemptByIdVariables>;
  operationName: string;
}
export const getQuizAttemptByIdRef: GetQuizAttemptByIdRef;

export function getQuizAttemptById(vars: GetQuizAttemptByIdVariables, options?: ExecuteQueryOptions): QueryPromise<GetQuizAttemptByIdData, GetQuizAttemptByIdVariables>;
export function getQuizAttemptById(dc: DataConnect, vars: GetQuizAttemptByIdVariables, options?: ExecuteQueryOptions): QueryPromise<GetQuizAttemptByIdData, GetQuizAttemptByIdVariables>;

interface GetQuizQuestionPointsRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: GetQuizQuestionPointsVariables): QueryRef<GetQuizQuestionPointsData, GetQuizQuestionPointsVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: GetQuizQuestionPointsVariables): QueryRef<GetQuizQuestionPointsData, GetQuizQuestionPointsVariables>;
  operationName: string;
}
export const getQuizQuestionPointsRef: GetQuizQuestionPointsRef;

export function getQuizQuestionPoints(vars: GetQuizQuestionPointsVariables, options?: ExecuteQueryOptions): QueryPromise<GetQuizQuestionPointsData, GetQuizQuestionPointsVariables>;
export function getQuizQuestionPoints(dc: DataConnect, vars: GetQuizQuestionPointsVariables, options?: ExecuteQueryOptions): QueryPromise<GetQuizQuestionPointsData, GetQuizQuestionPointsVariables>;

interface GetAttemptAnswersWithCorrectRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: GetAttemptAnswersWithCorrectVariables): QueryRef<GetAttemptAnswersWithCorrectData, GetAttemptAnswersWithCorrectVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: GetAttemptAnswersWithCorrectVariables): QueryRef<GetAttemptAnswersWithCorrectData, GetAttemptAnswersWithCorrectVariables>;
  operationName: string;
}
export const getAttemptAnswersWithCorrectRef: GetAttemptAnswersWithCorrectRef;

export function getAttemptAnswersWithCorrect(vars: GetAttemptAnswersWithCorrectVariables, options?: ExecuteQueryOptions): QueryPromise<GetAttemptAnswersWithCorrectData, GetAttemptAnswersWithCorrectVariables>;
export function getAttemptAnswersWithCorrect(dc: DataConnect, vars: GetAttemptAnswersWithCorrectVariables, options?: ExecuteQueryOptions): QueryPromise<GetAttemptAnswersWithCorrectData, GetAttemptAnswersWithCorrectVariables>;

interface GetQuizSettingsRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: GetQuizSettingsVariables): QueryRef<GetQuizSettingsData, GetQuizSettingsVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: GetQuizSettingsVariables): QueryRef<GetQuizSettingsData, GetQuizSettingsVariables>;
  operationName: string;
}
export const getQuizSettingsRef: GetQuizSettingsRef;

export function getQuizSettings(vars: GetQuizSettingsVariables, options?: ExecuteQueryOptions): QueryPromise<GetQuizSettingsData, GetQuizSettingsVariables>;
export function getQuizSettings(dc: DataConnect, vars: GetQuizSettingsVariables, options?: ExecuteQueryOptions): QueryPromise<GetQuizSettingsData, GetQuizSettingsVariables>;

interface GetQuestionOptionsRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: GetQuestionOptionsVariables): QueryRef<GetQuestionOptionsData, GetQuestionOptionsVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: GetQuestionOptionsVariables): QueryRef<GetQuestionOptionsData, GetQuestionOptionsVariables>;
  operationName: string;
}
export const getQuestionOptionsRef: GetQuestionOptionsRef;

export function getQuestionOptions(vars: GetQuestionOptionsVariables, options?: ExecuteQueryOptions): QueryPromise<GetQuestionOptionsData, GetQuestionOptionsVariables>;
export function getQuestionOptions(dc: DataConnect, vars: GetQuestionOptionsVariables, options?: ExecuteQueryOptions): QueryPromise<GetQuestionOptionsData, GetQuestionOptionsVariables>;

interface GetOptionWithQuestionRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: GetOptionWithQuestionVariables): QueryRef<GetOptionWithQuestionData, GetOptionWithQuestionVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: GetOptionWithQuestionVariables): QueryRef<GetOptionWithQuestionData, GetOptionWithQuestionVariables>;
  operationName: string;
}
export const getOptionWithQuestionRef: GetOptionWithQuestionRef;

export function getOptionWithQuestion(vars: GetOptionWithQuestionVariables, options?: ExecuteQueryOptions): QueryPromise<GetOptionWithQuestionData, GetOptionWithQuestionVariables>;
export function getOptionWithQuestion(dc: DataConnect, vars: GetOptionWithQuestionVariables, options?: ExecuteQueryOptions): QueryPromise<GetOptionWithQuestionData, GetOptionWithQuestionVariables>;

interface GetActiveQuizSessionRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: GetActiveQuizSessionVariables): QueryRef<GetActiveQuizSessionData, GetActiveQuizSessionVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: GetActiveQuizSessionVariables): QueryRef<GetActiveQuizSessionData, GetActiveQuizSessionVariables>;
  operationName: string;
}
export const getActiveQuizSessionRef: GetActiveQuizSessionRef;

export function getActiveQuizSession(vars: GetActiveQuizSessionVariables, options?: ExecuteQueryOptions): QueryPromise<GetActiveQuizSessionData, GetActiveQuizSessionVariables>;
export function getActiveQuizSession(dc: DataConnect, vars: GetActiveQuizSessionVariables, options?: ExecuteQueryOptions): QueryPromise<GetActiveQuizSessionData, GetActiveQuizSessionVariables>;

interface AdminGetQuizRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: AdminGetQuizVariables): QueryRef<AdminGetQuizData, AdminGetQuizVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: AdminGetQuizVariables): QueryRef<AdminGetQuizData, AdminGetQuizVariables>;
  operationName: string;
}
export const adminGetQuizRef: AdminGetQuizRef;

export function adminGetQuiz(vars: AdminGetQuizVariables, options?: ExecuteQueryOptions): QueryPromise<AdminGetQuizData, AdminGetQuizVariables>;
export function adminGetQuiz(dc: DataConnect, vars: AdminGetQuizVariables, options?: ExecuteQueryOptions): QueryPromise<AdminGetQuizData, AdminGetQuizVariables>;

interface AdminCreateQuizRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: AdminCreateQuizVariables): MutationRef<AdminCreateQuizData, AdminCreateQuizVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: AdminCreateQuizVariables): MutationRef<AdminCreateQuizData, AdminCreateQuizVariables>;
  operationName: string;
}
export const adminCreateQuizRef: AdminCreateQuizRef;

export function adminCreateQuiz(vars: AdminCreateQuizVariables): MutationPromise<AdminCreateQuizData, AdminCreateQuizVariables>;
export function adminCreateQuiz(dc: DataConnect, vars: AdminCreateQuizVariables): MutationPromise<AdminCreateQuizData, AdminCreateQuizVariables>;

interface AdminUpdateQuizRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: AdminUpdateQuizVariables): MutationRef<AdminUpdateQuizData, AdminUpdateQuizVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: AdminUpdateQuizVariables): MutationRef<AdminUpdateQuizData, AdminUpdateQuizVariables>;
  operationName: string;
}
export const adminUpdateQuizRef: AdminUpdateQuizRef;

export function adminUpdateQuiz(vars: AdminUpdateQuizVariables): MutationPromise<AdminUpdateQuizData, AdminUpdateQuizVariables>;
export function adminUpdateQuiz(dc: DataConnect, vars: AdminUpdateQuizVariables): MutationPromise<AdminUpdateQuizData, AdminUpdateQuizVariables>;

interface AdminDeleteQuizRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: AdminDeleteQuizVariables): MutationRef<AdminDeleteQuizData, AdminDeleteQuizVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: AdminDeleteQuizVariables): MutationRef<AdminDeleteQuizData, AdminDeleteQuizVariables>;
  operationName: string;
}
export const adminDeleteQuizRef: AdminDeleteQuizRef;

export function adminDeleteQuiz(vars: AdminDeleteQuizVariables): MutationPromise<AdminDeleteQuizData, AdminDeleteQuizVariables>;
export function adminDeleteQuiz(dc: DataConnect, vars: AdminDeleteQuizVariables): MutationPromise<AdminDeleteQuizData, AdminDeleteQuizVariables>;

interface AdminCreateQuizQuestionRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: AdminCreateQuizQuestionVariables): MutationRef<AdminCreateQuizQuestionData, AdminCreateQuizQuestionVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: AdminCreateQuizQuestionVariables): MutationRef<AdminCreateQuizQuestionData, AdminCreateQuizQuestionVariables>;
  operationName: string;
}
export const adminCreateQuizQuestionRef: AdminCreateQuizQuestionRef;

export function adminCreateQuizQuestion(vars: AdminCreateQuizQuestionVariables): MutationPromise<AdminCreateQuizQuestionData, AdminCreateQuizQuestionVariables>;
export function adminCreateQuizQuestion(dc: DataConnect, vars: AdminCreateQuizQuestionVariables): MutationPromise<AdminCreateQuizQuestionData, AdminCreateQuizQuestionVariables>;

interface AdminUpdateQuizQuestionRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: AdminUpdateQuizQuestionVariables): MutationRef<AdminUpdateQuizQuestionData, AdminUpdateQuizQuestionVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: AdminUpdateQuizQuestionVariables): MutationRef<AdminUpdateQuizQuestionData, AdminUpdateQuizQuestionVariables>;
  operationName: string;
}
export const adminUpdateQuizQuestionRef: AdminUpdateQuizQuestionRef;

export function adminUpdateQuizQuestion(vars: AdminUpdateQuizQuestionVariables): MutationPromise<AdminUpdateQuizQuestionData, AdminUpdateQuizQuestionVariables>;
export function adminUpdateQuizQuestion(dc: DataConnect, vars: AdminUpdateQuizQuestionVariables): MutationPromise<AdminUpdateQuizQuestionData, AdminUpdateQuizQuestionVariables>;

interface AdminSoftDeleteQuizQuestionRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: AdminSoftDeleteQuizQuestionVariables): MutationRef<AdminSoftDeleteQuizQuestionData, AdminSoftDeleteQuizQuestionVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: AdminSoftDeleteQuizQuestionVariables): MutationRef<AdminSoftDeleteQuizQuestionData, AdminSoftDeleteQuizQuestionVariables>;
  operationName: string;
}
export const adminSoftDeleteQuizQuestionRef: AdminSoftDeleteQuizQuestionRef;

export function adminSoftDeleteQuizQuestion(vars: AdminSoftDeleteQuizQuestionVariables): MutationPromise<AdminSoftDeleteQuizQuestionData, AdminSoftDeleteQuizQuestionVariables>;
export function adminSoftDeleteQuizQuestion(dc: DataConnect, vars: AdminSoftDeleteQuizQuestionVariables): MutationPromise<AdminSoftDeleteQuizQuestionData, AdminSoftDeleteQuizQuestionVariables>;

interface AdminUpdateQuizQuestionOrderRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: AdminUpdateQuizQuestionOrderVariables): MutationRef<AdminUpdateQuizQuestionOrderData, AdminUpdateQuizQuestionOrderVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: AdminUpdateQuizQuestionOrderVariables): MutationRef<AdminUpdateQuizQuestionOrderData, AdminUpdateQuizQuestionOrderVariables>;
  operationName: string;
}
export const adminUpdateQuizQuestionOrderRef: AdminUpdateQuizQuestionOrderRef;

export function adminUpdateQuizQuestionOrder(vars: AdminUpdateQuizQuestionOrderVariables): MutationPromise<AdminUpdateQuizQuestionOrderData, AdminUpdateQuizQuestionOrderVariables>;
export function adminUpdateQuizQuestionOrder(dc: DataConnect, vars: AdminUpdateQuizQuestionOrderVariables): MutationPromise<AdminUpdateQuizQuestionOrderData, AdminUpdateQuizQuestionOrderVariables>;

interface AdminCreateQuizOptionRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: AdminCreateQuizOptionVariables): MutationRef<AdminCreateQuizOptionData, AdminCreateQuizOptionVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: AdminCreateQuizOptionVariables): MutationRef<AdminCreateQuizOptionData, AdminCreateQuizOptionVariables>;
  operationName: string;
}
export const adminCreateQuizOptionRef: AdminCreateQuizOptionRef;

export function adminCreateQuizOption(vars: AdminCreateQuizOptionVariables): MutationPromise<AdminCreateQuizOptionData, AdminCreateQuizOptionVariables>;
export function adminCreateQuizOption(dc: DataConnect, vars: AdminCreateQuizOptionVariables): MutationPromise<AdminCreateQuizOptionData, AdminCreateQuizOptionVariables>;

interface AdminUpdateQuizOptionRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: AdminUpdateQuizOptionVariables): MutationRef<AdminUpdateQuizOptionData, AdminUpdateQuizOptionVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: AdminUpdateQuizOptionVariables): MutationRef<AdminUpdateQuizOptionData, AdminUpdateQuizOptionVariables>;
  operationName: string;
}
export const adminUpdateQuizOptionRef: AdminUpdateQuizOptionRef;

export function adminUpdateQuizOption(vars: AdminUpdateQuizOptionVariables): MutationPromise<AdminUpdateQuizOptionData, AdminUpdateQuizOptionVariables>;
export function adminUpdateQuizOption(dc: DataConnect, vars: AdminUpdateQuizOptionVariables): MutationPromise<AdminUpdateQuizOptionData, AdminUpdateQuizOptionVariables>;

interface AdminDeleteQuizOptionRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: AdminDeleteQuizOptionVariables): MutationRef<AdminDeleteQuizOptionData, AdminDeleteQuizOptionVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: AdminDeleteQuizOptionVariables): MutationRef<AdminDeleteQuizOptionData, AdminDeleteQuizOptionVariables>;
  operationName: string;
}
export const adminDeleteQuizOptionRef: AdminDeleteQuizOptionRef;

export function adminDeleteQuizOption(vars: AdminDeleteQuizOptionVariables): MutationPromise<AdminDeleteQuizOptionData, AdminDeleteQuizOptionVariables>;
export function adminDeleteQuizOption(dc: DataConnect, vars: AdminDeleteQuizOptionVariables): MutationPromise<AdminDeleteQuizOptionData, AdminDeleteQuizOptionVariables>;

interface AdminUpdateQuizOptionOrderRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: AdminUpdateQuizOptionOrderVariables): MutationRef<AdminUpdateQuizOptionOrderData, AdminUpdateQuizOptionOrderVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: AdminUpdateQuizOptionOrderVariables): MutationRef<AdminUpdateQuizOptionOrderData, AdminUpdateQuizOptionOrderVariables>;
  operationName: string;
}
export const adminUpdateQuizOptionOrderRef: AdminUpdateQuizOptionOrderRef;

export function adminUpdateQuizOptionOrder(vars: AdminUpdateQuizOptionOrderVariables): MutationPromise<AdminUpdateQuizOptionOrderData, AdminUpdateQuizOptionOrderVariables>;
export function adminUpdateQuizOptionOrder(dc: DataConnect, vars: AdminUpdateQuizOptionOrderVariables): MutationPromise<AdminUpdateQuizOptionOrderData, AdminUpdateQuizOptionOrderVariables>;

interface UpsertCourseRatingRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: UpsertCourseRatingVariables): MutationRef<UpsertCourseRatingData, UpsertCourseRatingVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: UpsertCourseRatingVariables): MutationRef<UpsertCourseRatingData, UpsertCourseRatingVariables>;
  operationName: string;
}
export const upsertCourseRatingRef: UpsertCourseRatingRef;

export function upsertCourseRating(vars: UpsertCourseRatingVariables): MutationPromise<UpsertCourseRatingData, UpsertCourseRatingVariables>;
export function upsertCourseRating(dc: DataConnect, vars: UpsertCourseRatingVariables): MutationPromise<UpsertCourseRatingData, UpsertCourseRatingVariables>;

interface DeleteCourseRatingRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: DeleteCourseRatingVariables): MutationRef<DeleteCourseRatingData, DeleteCourseRatingVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: DeleteCourseRatingVariables): MutationRef<DeleteCourseRatingData, DeleteCourseRatingVariables>;
  operationName: string;
}
export const deleteCourseRatingRef: DeleteCourseRatingRef;

export function deleteCourseRating(vars: DeleteCourseRatingVariables): MutationPromise<DeleteCourseRatingData, DeleteCourseRatingVariables>;
export function deleteCourseRating(dc: DataConnect, vars: DeleteCourseRatingVariables): MutationPromise<DeleteCourseRatingData, DeleteCourseRatingVariables>;

interface GetMyCourseRatingRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: GetMyCourseRatingVariables): QueryRef<GetMyCourseRatingData, GetMyCourseRatingVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: GetMyCourseRatingVariables): QueryRef<GetMyCourseRatingData, GetMyCourseRatingVariables>;
  operationName: string;
}
export const getMyCourseRatingRef: GetMyCourseRatingRef;

export function getMyCourseRating(vars: GetMyCourseRatingVariables, options?: ExecuteQueryOptions): QueryPromise<GetMyCourseRatingData, GetMyCourseRatingVariables>;
export function getMyCourseRating(dc: DataConnect, vars: GetMyCourseRatingVariables, options?: ExecuteQueryOptions): QueryPromise<GetMyCourseRatingData, GetMyCourseRatingVariables>;

interface ListCourseRatingsRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: ListCourseRatingsVariables): QueryRef<ListCourseRatingsData, ListCourseRatingsVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: ListCourseRatingsVariables): QueryRef<ListCourseRatingsData, ListCourseRatingsVariables>;
  operationName: string;
}
export const listCourseRatingsRef: ListCourseRatingsRef;

export function listCourseRatings(vars: ListCourseRatingsVariables, options?: ExecuteQueryOptions): QueryPromise<ListCourseRatingsData, ListCourseRatingsVariables>;
export function listCourseRatings(dc: DataConnect, vars: ListCourseRatingsVariables, options?: ExecuteQueryOptions): QueryPromise<ListCourseRatingsData, ListCourseRatingsVariables>;

interface GetCourseRatingsForSummaryRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: GetCourseRatingsForSummaryVariables): QueryRef<GetCourseRatingsForSummaryData, GetCourseRatingsForSummaryVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: GetCourseRatingsForSummaryVariables): QueryRef<GetCourseRatingsForSummaryData, GetCourseRatingsForSummaryVariables>;
  operationName: string;
}
export const getCourseRatingsForSummaryRef: GetCourseRatingsForSummaryRef;

export function getCourseRatingsForSummary(vars: GetCourseRatingsForSummaryVariables, options?: ExecuteQueryOptions): QueryPromise<GetCourseRatingsForSummaryData, GetCourseRatingsForSummaryVariables>;
export function getCourseRatingsForSummary(dc: DataConnect, vars: GetCourseRatingsForSummaryVariables, options?: ExecuteQueryOptions): QueryPromise<GetCourseRatingsForSummaryData, GetCourseRatingsForSummaryVariables>;

interface AdminUpdateCourseRatingAggregateRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: AdminUpdateCourseRatingAggregateVariables): MutationRef<AdminUpdateCourseRatingAggregateData, AdminUpdateCourseRatingAggregateVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: AdminUpdateCourseRatingAggregateVariables): MutationRef<AdminUpdateCourseRatingAggregateData, AdminUpdateCourseRatingAggregateVariables>;
  operationName: string;
}
export const adminUpdateCourseRatingAggregateRef: AdminUpdateCourseRatingAggregateRef;

export function adminUpdateCourseRatingAggregate(vars: AdminUpdateCourseRatingAggregateVariables): MutationPromise<AdminUpdateCourseRatingAggregateData, AdminUpdateCourseRatingAggregateVariables>;
export function adminUpdateCourseRatingAggregate(dc: DataConnect, vars: AdminUpdateCourseRatingAggregateVariables): MutationPromise<AdminUpdateCourseRatingAggregateData, AdminUpdateCourseRatingAggregateVariables>;

interface GetMyCourseAccessRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: GetMyCourseAccessVariables): QueryRef<GetMyCourseAccessData, GetMyCourseAccessVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: GetMyCourseAccessVariables): QueryRef<GetMyCourseAccessData, GetMyCourseAccessVariables>;
  operationName: string;
}
export const getMyCourseAccessRef: GetMyCourseAccessRef;

export function getMyCourseAccess(vars: GetMyCourseAccessVariables, options?: ExecuteQueryOptions): QueryPromise<GetMyCourseAccessData, GetMyCourseAccessVariables>;
export function getMyCourseAccess(dc: DataConnect, vars: GetMyCourseAccessVariables, options?: ExecuteQueryOptions): QueryPromise<GetMyCourseAccessData, GetMyCourseAccessVariables>;

interface GetMyMissionAccessRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: GetMyMissionAccessVariables): QueryRef<GetMyMissionAccessData, GetMyMissionAccessVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: GetMyMissionAccessVariables): QueryRef<GetMyMissionAccessData, GetMyMissionAccessVariables>;
  operationName: string;
}
export const getMyMissionAccessRef: GetMyMissionAccessRef;

export function getMyMissionAccess(vars: GetMyMissionAccessVariables, options?: ExecuteQueryOptions): QueryPromise<GetMyMissionAccessData, GetMyMissionAccessVariables>;
export function getMyMissionAccess(dc: DataConnect, vars: GetMyMissionAccessVariables, options?: ExecuteQueryOptions): QueryPromise<GetMyMissionAccessData, GetMyMissionAccessVariables>;

interface GetQuestionCourseRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: GetQuestionCourseVariables): QueryRef<GetQuestionCourseData, GetQuestionCourseVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: GetQuestionCourseVariables): QueryRef<GetQuestionCourseData, GetQuestionCourseVariables>;
  operationName: string;
}
export const getQuestionCourseRef: GetQuestionCourseRef;

export function getQuestionCourse(vars: GetQuestionCourseVariables, options?: ExecuteQueryOptions): QueryPromise<GetQuestionCourseData, GetQuestionCourseVariables>;
export function getQuestionCourse(dc: DataConnect, vars: GetQuestionCourseVariables, options?: ExecuteQueryOptions): QueryPromise<GetQuestionCourseData, GetQuestionCourseVariables>;

interface GetOptionCourseRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: GetOptionCourseVariables): QueryRef<GetOptionCourseData, GetOptionCourseVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: GetOptionCourseVariables): QueryRef<GetOptionCourseData, GetOptionCourseVariables>;
  operationName: string;
}
export const getOptionCourseRef: GetOptionCourseRef;

export function getOptionCourse(vars: GetOptionCourseVariables, options?: ExecuteQueryOptions): QueryPromise<GetOptionCourseData, GetOptionCourseVariables>;
export function getOptionCourse(dc: DataConnect, vars: GetOptionCourseVariables, options?: ExecuteQueryOptions): QueryPromise<GetOptionCourseData, GetOptionCourseVariables>;

interface GetSectionCourseRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: GetSectionCourseVariables): QueryRef<GetSectionCourseData, GetSectionCourseVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: GetSectionCourseVariables): QueryRef<GetSectionCourseData, GetSectionCourseVariables>;
  operationName: string;
}
export const getSectionCourseRef: GetSectionCourseRef;

export function getSectionCourse(vars: GetSectionCourseVariables, options?: ExecuteQueryOptions): QueryPromise<GetSectionCourseData, GetSectionCourseVariables>;
export function getSectionCourse(dc: DataConnect, vars: GetSectionCourseVariables, options?: ExecuteQueryOptions): QueryPromise<GetSectionCourseData, GetSectionCourseVariables>;

interface GetMicroLessonMissionRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: GetMicroLessonMissionVariables): QueryRef<GetMicroLessonMissionData, GetMicroLessonMissionVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: GetMicroLessonMissionVariables): QueryRef<GetMicroLessonMissionData, GetMicroLessonMissionVariables>;
  operationName: string;
}
export const getMicroLessonMissionRef: GetMicroLessonMissionRef;

export function getMicroLessonMission(vars: GetMicroLessonMissionVariables, options?: ExecuteQueryOptions): QueryPromise<GetMicroLessonMissionData, GetMicroLessonMissionVariables>;
export function getMicroLessonMission(dc: DataConnect, vars: GetMicroLessonMissionVariables, options?: ExecuteQueryOptions): QueryPromise<GetMicroLessonMissionData, GetMicroLessonMissionVariables>;

interface GetCriterionMissionRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: GetCriterionMissionVariables): QueryRef<GetCriterionMissionData, GetCriterionMissionVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: GetCriterionMissionVariables): QueryRef<GetCriterionMissionData, GetCriterionMissionVariables>;
  operationName: string;
}
export const getCriterionMissionRef: GetCriterionMissionRef;

export function getCriterionMission(vars: GetCriterionMissionVariables, options?: ExecuteQueryOptions): QueryPromise<GetCriterionMissionData, GetCriterionMissionVariables>;
export function getCriterionMission(dc: DataConnect, vars: GetCriterionMissionVariables, options?: ExecuteQueryOptions): QueryPromise<GetCriterionMissionData, GetCriterionMissionVariables>;

interface GetTemplateMissionRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: GetTemplateMissionVariables): QueryRef<GetTemplateMissionData, GetTemplateMissionVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: GetTemplateMissionVariables): QueryRef<GetTemplateMissionData, GetTemplateMissionVariables>;
  operationName: string;
}
export const getTemplateMissionRef: GetTemplateMissionRef;

export function getTemplateMission(vars: GetTemplateMissionVariables, options?: ExecuteQueryOptions): QueryPromise<GetTemplateMissionData, GetTemplateMissionVariables>;
export function getTemplateMission(dc: DataConnect, vars: GetTemplateMissionVariables, options?: ExecuteQueryOptions): QueryPromise<GetTemplateMissionData, GetTemplateMissionVariables>;

interface GetCourseSessionsRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: GetCourseSessionsVariables): QueryRef<GetCourseSessionsData, GetCourseSessionsVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: GetCourseSessionsVariables): QueryRef<GetCourseSessionsData, GetCourseSessionsVariables>;
  operationName: string;
}
export const getCourseSessionsRef: GetCourseSessionsRef;

export function getCourseSessions(vars: GetCourseSessionsVariables, options?: ExecuteQueryOptions): QueryPromise<GetCourseSessionsData, GetCourseSessionsVariables>;
export function getCourseSessions(dc: DataConnect, vars: GetCourseSessionsVariables, options?: ExecuteQueryOptions): QueryPromise<GetCourseSessionsData, GetCourseSessionsVariables>;

interface CheckInToSessionRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: CheckInToSessionVariables): MutationRef<CheckInToSessionData, CheckInToSessionVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: CheckInToSessionVariables): MutationRef<CheckInToSessionData, CheckInToSessionVariables>;
  operationName: string;
}
export const checkInToSessionRef: CheckInToSessionRef;

export function checkInToSession(vars: CheckInToSessionVariables): MutationPromise<CheckInToSessionData, CheckInToSessionVariables>;
export function checkInToSession(dc: DataConnect, vars: CheckInToSessionVariables): MutationPromise<CheckInToSessionData, CheckInToSessionVariables>;

interface SyncUserRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: SyncUserVariables): MutationRef<SyncUserData, SyncUserVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: SyncUserVariables): MutationRef<SyncUserData, SyncUserVariables>;
  operationName: string;
}
export const syncUserRef: SyncUserRef;

export function syncUser(vars: SyncUserVariables): MutationPromise<SyncUserData, SyncUserVariables>;
export function syncUser(dc: DataConnect, vars: SyncUserVariables): MutationPromise<SyncUserData, SyncUserVariables>;

interface GetMeRef {
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<GetMeData, undefined>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect): QueryRef<GetMeData, undefined>;
  operationName: string;
}
export const getMeRef: GetMeRef;

export function getMe(options?: ExecuteQueryOptions): QueryPromise<GetMeData, undefined>;
export function getMe(dc: DataConnect, options?: ExecuteQueryOptions): QueryPromise<GetMeData, undefined>;

interface UpdateMyProfileRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars?: UpdateMyProfileVariables): MutationRef<UpdateMyProfileData, UpdateMyProfileVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars?: UpdateMyProfileVariables): MutationRef<UpdateMyProfileData, UpdateMyProfileVariables>;
  operationName: string;
}
export const updateMyProfileRef: UpdateMyProfileRef;

export function updateMyProfile(vars?: UpdateMyProfileVariables): MutationPromise<UpdateMyProfileData, UpdateMyProfileVariables>;
export function updateMyProfile(dc: DataConnect, vars?: UpdateMyProfileVariables): MutationPromise<UpdateMyProfileData, UpdateMyProfileVariables>;

interface MyCertificatesRef {
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<MyCertificatesData, undefined>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect): QueryRef<MyCertificatesData, undefined>;
  operationName: string;
}
export const myCertificatesRef: MyCertificatesRef;

export function myCertificates(options?: ExecuteQueryOptions): QueryPromise<MyCertificatesData, undefined>;
export function myCertificates(dc: DataConnect, options?: ExecuteQueryOptions): QueryPromise<MyCertificatesData, undefined>;

interface VerifyCertificateRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: VerifyCertificateVariables): QueryRef<VerifyCertificateData, VerifyCertificateVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: VerifyCertificateVariables): QueryRef<VerifyCertificateData, VerifyCertificateVariables>;
  operationName: string;
}
export const verifyCertificateRef: VerifyCertificateRef;

export function verifyCertificate(vars: VerifyCertificateVariables, options?: ExecuteQueryOptions): QueryPromise<VerifyCertificateData, VerifyCertificateVariables>;
export function verifyCertificate(dc: DataConnect, vars: VerifyCertificateVariables, options?: ExecuteQueryOptions): QueryPromise<VerifyCertificateData, VerifyCertificateVariables>;

