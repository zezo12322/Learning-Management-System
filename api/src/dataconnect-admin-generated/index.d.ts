import { ConnectorConfig, DataConnect, OperationOptions, ExecuteOperationResponse } from 'firebase-admin/data-connect';

export const connectorConfig: ConnectorConfig;

export type TimestampString = string;
export type UUIDString = string;
export type Int64String = string;
export type DateString = string;

export enum AttendanceMethod {
  QR = "QR",
  MANUAL = "MANUAL",
}
export enum AttendanceStatus {
  PRESENT = "PRESENT",
  LATE = "LATE",
  EXCUSED = "EXCUSED",
  UNEXCUSED = "UNEXCUSED",
}
export enum BillingCycle {
  MONTHLY = "MONTHLY",
  QUARTERLY = "QUARTERLY",
  YEARLY = "YEARLY",
}
export enum CertificateTarget {
  COURSE = "COURSE",
  MISSION = "MISSION",
}
export enum CourseLevel {
  BEGINNER = "BEGINNER",
  INTERMEDIATE = "INTERMEDIATE",
  ADVANCED = "ADVANCED",
}
export enum LectureType {
  VIDEO = "VIDEO",
  READING = "READING",
  INTERACTIVE = "INTERACTIVE",
  QUIZ = "QUIZ",
}
export enum PaymentGateway {
  FAWRY = "FAWRY",
  PAYMOB = "PAYMOB",
  INSTAPAY = "INSTAPAY",
}
export enum PaymentItemTarget {
  COURSE = "COURSE",
  MISSION = "MISSION",
  SUBSCRIPTION = "SUBSCRIPTION",
}
export enum PaymentStatus {
  PENDING = "PENDING",
  COMPLETED = "COMPLETED",
  FAILED = "FAILED",
  REFUNDED = "REFUNDED",
}
export enum SessionType {
  ONLINE = "ONLINE",
  OFFLINE = "OFFLINE",
}
export enum SubmissionStatus {
  PENDING = "PENDING",
  GRADED = "GRADED",
  RETURNED = "RETURNED",
  REJECTED = "REJECTED",
}

export interface AddCriterionScoreData {
  missionSubmissionScore_insert: MissionSubmissionScore_Key;
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

export interface AdminCancelSessionData {
  session_update?: Session_Key | null;
}

export interface AdminCancelSessionVariables {
  sessionId: UUIDString;
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
}

export interface AdminCreateLectureData {
  courseLecture_insert: CourseLecture_Key;
}

export interface AdminCreateLectureVariables {
  sectionId: UUIDString;
  title: string;
  type: LectureType;
  videoUrl?: string | null;
  content?: string | null;
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

export interface AdminDeleteCourseData {
  course_update?: Course_Key | null;
}

export interface AdminDeleteCourseVariables {
  courseId: UUIDString;
}

export interface AdminDeprecateSubscriptionTierData {
  subscriptionTier_update?: SubscriptionTier_Key | null;
}

export interface AdminDeprecateSubscriptionTierVariables {
  tierId: UUIDString;
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

export interface CourseSection_Key {
  id: UUIDString;
  __typename?: 'CourseSection_Key';
}

export interface Course_Key {
  id: UUIDString;
  __typename?: 'Course_Key';
}

export interface EnrollInCourseData {
  enrollment_insert: Enrollment_Key;
}

export interface EnrollInCourseVariables {
  courseId: UUIDString;
}

export interface EnrollInMissionData {
  enrollment_insert: Enrollment_Key;
}

export interface EnrollInMissionVariables {
  missionId: UUIDString;
}

export interface Enrollment_Key {
  id: UUIDString;
  __typename?: 'Enrollment_Key';
}

export interface FinishQuizAttemptData {
  quizAttempt_update?: QuizAttempt_Key | null;
}

export interface FinishQuizAttemptVariables {
  attemptId: UUIDString;
  score: number;
  passed: boolean;
}

export interface GetCourseCurriculumData {
  course?: {
    id: UUIDString;
    title: string;
    description?: string | null;
    language: string;
    courseSections_on_course: ({
      id: UUIDString;
      title: string;
      courseLectures_on_section: ({
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

export interface GetQuizQuestionsData {
  courseQuizs: ({
    id: UUIDString;
    passingScore: number;
    maxAttempts: number;
    quizQuestions_on_quiz: ({
      id: UUIDString;
      questionText: string;
      points: number;
      quizOptions_on_question: ({
        id: UUIDString;
        text: string;
      } & QuizOption_Key)[];
    } & QuizQuestion_Key)[];
  } & CourseQuiz_Key)[];
}

export interface GetQuizQuestionsVariables {
  lectureId: UUIDString;
}

export interface GradeSubmissionData {
  missionSubmission_update?: MissionSubmission_Key | null;
}

export interface GradeSubmissionVariables {
  submissionId: UUIDString;
  feedback?: string | null;
}

export interface LectureProgress_Key {
  userId: string;
  lectureId: UUIDString;
  __typename?: 'LectureProgress_Key';
}

export interface ListPublishedCoursesData {
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
      courseInstructors_on_course: ({
        user: {
          name: string;
          avatar?: string | null;
        };
      })[];
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

export interface Session_Key {
  id: UUIDString;
  __typename?: 'Session_Key';
}

export interface StartQuizAttemptData {
  quizAttempt_insert: QuizAttempt_Key;
}

export interface StartQuizAttemptVariables {
  quizId: UUIDString;
}

export interface SubmitMissionData {
  missionSubmission_insert: MissionSubmission_Key;
}

export interface SubmitMissionVariables {
  missionId: UUIDString;
  fileUrl: string;
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

export interface SyncUserData {
  user_upsert: User_Key;
}

export interface SyncUserVariables {
  email: string;
  name: string;
  avatar?: string | null;
}

export interface UpdateLectureProgressData {
  lectureProgress_upsert: LectureProgress_Key;
}

export interface UpdateLectureProgressVariables {
  lectureId: UUIDString;
  lastWatchedSecond: number;
  completedAt?: TimestampString | null;
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

/** Generated Node Admin SDK operation action function for the 'GetQuizQuestions' Query. Allow users to execute without passing in DataConnect. */
export function getQuizQuestions(dc: DataConnect, vars: GetQuizQuestionsVariables, options?: OperationOptions): Promise<ExecuteOperationResponse<GetQuizQuestionsData>>;
/** Generated Node Admin SDK operation action function for the 'GetQuizQuestions' Query. Allow users to pass in custom DataConnect instances. */
export function getQuizQuestions(vars: GetQuizQuestionsVariables, options?: OperationOptions): Promise<ExecuteOperationResponse<GetQuizQuestionsData>>;

/** Generated Node Admin SDK operation action function for the 'StartQuizAttempt' Mutation. Allow users to execute without passing in DataConnect. */
export function startQuizAttempt(dc: DataConnect, vars: StartQuizAttemptVariables, options?: OperationOptions): Promise<ExecuteOperationResponse<StartQuizAttemptData>>;
/** Generated Node Admin SDK operation action function for the 'StartQuizAttempt' Mutation. Allow users to pass in custom DataConnect instances. */
export function startQuizAttempt(vars: StartQuizAttemptVariables, options?: OperationOptions): Promise<ExecuteOperationResponse<StartQuizAttemptData>>;

/** Generated Node Admin SDK operation action function for the 'SubmitQuizAnswer' Mutation. Allow users to execute without passing in DataConnect. */
export function submitQuizAnswer(dc: DataConnect, vars: SubmitQuizAnswerVariables, options?: OperationOptions): Promise<ExecuteOperationResponse<SubmitQuizAnswerData>>;
/** Generated Node Admin SDK operation action function for the 'SubmitQuizAnswer' Mutation. Allow users to pass in custom DataConnect instances. */
export function submitQuizAnswer(vars: SubmitQuizAnswerVariables, options?: OperationOptions): Promise<ExecuteOperationResponse<SubmitQuizAnswerData>>;

/** Generated Node Admin SDK operation action function for the 'FinishQuizAttempt' Mutation. Allow users to execute without passing in DataConnect. */
export function finishQuizAttempt(dc: DataConnect, vars: FinishQuizAttemptVariables, options?: OperationOptions): Promise<ExecuteOperationResponse<FinishQuizAttemptData>>;
/** Generated Node Admin SDK operation action function for the 'FinishQuizAttempt' Mutation. Allow users to pass in custom DataConnect instances. */
export function finishQuizAttempt(vars: FinishQuizAttemptVariables, options?: OperationOptions): Promise<ExecuteOperationResponse<FinishQuizAttemptData>>;

/** Generated Node Admin SDK operation action function for the 'AdminCreateCourse' Mutation. Allow users to execute without passing in DataConnect. */
export function adminCreateCourse(dc: DataConnect, vars: AdminCreateCourseVariables, options?: OperationOptions): Promise<ExecuteOperationResponse<AdminCreateCourseData>>;
/** Generated Node Admin SDK operation action function for the 'AdminCreateCourse' Mutation. Allow users to pass in custom DataConnect instances. */
export function adminCreateCourse(vars: AdminCreateCourseVariables, options?: OperationOptions): Promise<ExecuteOperationResponse<AdminCreateCourseData>>;

/** Generated Node Admin SDK operation action function for the 'AdminDeleteCourse' Mutation. Allow users to execute without passing in DataConnect. */
export function adminDeleteCourse(dc: DataConnect, vars: AdminDeleteCourseVariables, options?: OperationOptions): Promise<ExecuteOperationResponse<AdminDeleteCourseData>>;
/** Generated Node Admin SDK operation action function for the 'AdminDeleteCourse' Mutation. Allow users to pass in custom DataConnect instances. */
export function adminDeleteCourse(vars: AdminDeleteCourseVariables, options?: OperationOptions): Promise<ExecuteOperationResponse<AdminDeleteCourseData>>;

/** Generated Node Admin SDK operation action function for the 'AdminCreateLecture' Mutation. Allow users to execute without passing in DataConnect. */
export function adminCreateLecture(dc: DataConnect, vars: AdminCreateLectureVariables, options?: OperationOptions): Promise<ExecuteOperationResponse<AdminCreateLectureData>>;
/** Generated Node Admin SDK operation action function for the 'AdminCreateLecture' Mutation. Allow users to pass in custom DataConnect instances. */
export function adminCreateLecture(vars: AdminCreateLectureVariables, options?: OperationOptions): Promise<ExecuteOperationResponse<AdminCreateLectureData>>;

/** Generated Node Admin SDK operation action function for the 'AdminCreateSession' Mutation. Allow users to execute without passing in DataConnect. */
export function adminCreateSession(dc: DataConnect, vars: AdminCreateSessionVariables, options?: OperationOptions): Promise<ExecuteOperationResponse<AdminCreateSessionData>>;
/** Generated Node Admin SDK operation action function for the 'AdminCreateSession' Mutation. Allow users to pass in custom DataConnect instances. */
export function adminCreateSession(vars: AdminCreateSessionVariables, options?: OperationOptions): Promise<ExecuteOperationResponse<AdminCreateSessionData>>;

/** Generated Node Admin SDK operation action function for the 'AdminCancelSession' Mutation. Allow users to execute without passing in DataConnect. */
export function adminCancelSession(dc: DataConnect, vars: AdminCancelSessionVariables, options?: OperationOptions): Promise<ExecuteOperationResponse<AdminCancelSessionData>>;
/** Generated Node Admin SDK operation action function for the 'AdminCancelSession' Mutation. Allow users to pass in custom DataConnect instances. */
export function adminCancelSession(vars: AdminCancelSessionVariables, options?: OperationOptions): Promise<ExecuteOperationResponse<AdminCancelSessionData>>;

/** Generated Node Admin SDK operation action function for the 'AdminCreateSubscriptionTier' Mutation. Allow users to execute without passing in DataConnect. */
export function adminCreateSubscriptionTier(dc: DataConnect, vars: AdminCreateSubscriptionTierVariables, options?: OperationOptions): Promise<ExecuteOperationResponse<AdminCreateSubscriptionTierData>>;
/** Generated Node Admin SDK operation action function for the 'AdminCreateSubscriptionTier' Mutation. Allow users to pass in custom DataConnect instances. */
export function adminCreateSubscriptionTier(vars: AdminCreateSubscriptionTierVariables, options?: OperationOptions): Promise<ExecuteOperationResponse<AdminCreateSubscriptionTierData>>;

/** Generated Node Admin SDK operation action function for the 'AdminDeprecateSubscriptionTier' Mutation. Allow users to execute without passing in DataConnect. */
export function adminDeprecateSubscriptionTier(dc: DataConnect, vars: AdminDeprecateSubscriptionTierVariables, options?: OperationOptions): Promise<ExecuteOperationResponse<AdminDeprecateSubscriptionTierData>>;
/** Generated Node Admin SDK operation action function for the 'AdminDeprecateSubscriptionTier' Mutation. Allow users to pass in custom DataConnect instances. */
export function adminDeprecateSubscriptionTier(vars: AdminDeprecateSubscriptionTierVariables, options?: OperationOptions): Promise<ExecuteOperationResponse<AdminDeprecateSubscriptionTierData>>;

/** Generated Node Admin SDK operation action function for the 'AdminCreateCategory' Mutation. Allow users to execute without passing in DataConnect. */
export function adminCreateCategory(dc: DataConnect, vars: AdminCreateCategoryVariables, options?: OperationOptions): Promise<ExecuteOperationResponse<AdminCreateCategoryData>>;
/** Generated Node Admin SDK operation action function for the 'AdminCreateCategory' Mutation. Allow users to pass in custom DataConnect instances. */
export function adminCreateCategory(vars: AdminCreateCategoryVariables, options?: OperationOptions): Promise<ExecuteOperationResponse<AdminCreateCategoryData>>;

/** Generated Node Admin SDK operation action function for the 'MyCertificates' Query. Allow users to execute without passing in DataConnect. */
export function myCertificates(dc: DataConnect, options?: OperationOptions): Promise<ExecuteOperationResponse<MyCertificatesData>>;
/** Generated Node Admin SDK operation action function for the 'MyCertificates' Query. Allow users to pass in custom DataConnect instances. */
export function myCertificates(options?: OperationOptions): Promise<ExecuteOperationResponse<MyCertificatesData>>;

/** Generated Node Admin SDK operation action function for the 'VerifyCertificate' Query. Allow users to execute without passing in DataConnect. */
export function verifyCertificate(dc: DataConnect, vars: VerifyCertificateVariables, options?: OperationOptions): Promise<ExecuteOperationResponse<VerifyCertificateData>>;
/** Generated Node Admin SDK operation action function for the 'VerifyCertificate' Query. Allow users to pass in custom DataConnect instances. */
export function verifyCertificate(vars: VerifyCertificateVariables, options?: OperationOptions): Promise<ExecuteOperationResponse<VerifyCertificateData>>;

/** Generated Node Admin SDK operation action function for the 'LogPayment' Mutation. Allow users to execute without passing in DataConnect. */
export function logPayment(dc: DataConnect, vars: LogPaymentVariables, options?: OperationOptions): Promise<ExecuteOperationResponse<LogPaymentData>>;
/** Generated Node Admin SDK operation action function for the 'LogPayment' Mutation. Allow users to pass in custom DataConnect instances. */
export function logPayment(vars: LogPaymentVariables, options?: OperationOptions): Promise<ExecuteOperationResponse<LogPaymentData>>;

/** Generated Node Admin SDK operation action function for the 'AddPaymentItem' Mutation. Allow users to execute without passing in DataConnect. */
export function addPaymentItem(dc: DataConnect, vars: AddPaymentItemVariables, options?: OperationOptions): Promise<ExecuteOperationResponse<AddPaymentItemData>>;
/** Generated Node Admin SDK operation action function for the 'AddPaymentItem' Mutation. Allow users to pass in custom DataConnect instances. */
export function addPaymentItem(vars: AddPaymentItemVariables, options?: OperationOptions): Promise<ExecuteOperationResponse<AddPaymentItemData>>;

/** Generated Node Admin SDK operation action function for the 'MyPaymentHistory' Query. Allow users to execute without passing in DataConnect. */
export function myPaymentHistory(dc: DataConnect, options?: OperationOptions): Promise<ExecuteOperationResponse<MyPaymentHistoryData>>;
/** Generated Node Admin SDK operation action function for the 'MyPaymentHistory' Query. Allow users to pass in custom DataConnect instances. */
export function myPaymentHistory(options?: OperationOptions): Promise<ExecuteOperationResponse<MyPaymentHistoryData>>;

/** Generated Node Admin SDK operation action function for the 'EnrollInCourse' Mutation. Allow users to execute without passing in DataConnect. */
export function enrollInCourse(dc: DataConnect, vars: EnrollInCourseVariables, options?: OperationOptions): Promise<ExecuteOperationResponse<EnrollInCourseData>>;
/** Generated Node Admin SDK operation action function for the 'EnrollInCourse' Mutation. Allow users to pass in custom DataConnect instances. */
export function enrollInCourse(vars: EnrollInCourseVariables, options?: OperationOptions): Promise<ExecuteOperationResponse<EnrollInCourseData>>;

/** Generated Node Admin SDK operation action function for the 'EnrollInMission' Mutation. Allow users to execute without passing in DataConnect. */
export function enrollInMission(dc: DataConnect, vars: EnrollInMissionVariables, options?: OperationOptions): Promise<ExecuteOperationResponse<EnrollInMissionData>>;
/** Generated Node Admin SDK operation action function for the 'EnrollInMission' Mutation. Allow users to pass in custom DataConnect instances. */
export function enrollInMission(vars: EnrollInMissionVariables, options?: OperationOptions): Promise<ExecuteOperationResponse<EnrollInMissionData>>;

/** Generated Node Admin SDK operation action function for the 'UpdateLectureProgress' Mutation. Allow users to execute without passing in DataConnect. */
export function updateLectureProgress(dc: DataConnect, vars: UpdateLectureProgressVariables, options?: OperationOptions): Promise<ExecuteOperationResponse<UpdateLectureProgressData>>;
/** Generated Node Admin SDK operation action function for the 'UpdateLectureProgress' Mutation. Allow users to pass in custom DataConnect instances. */
export function updateLectureProgress(vars: UpdateLectureProgressVariables, options?: OperationOptions): Promise<ExecuteOperationResponse<UpdateLectureProgressData>>;

/** Generated Node Admin SDK operation action function for the 'GetCourseSessions' Query. Allow users to execute without passing in DataConnect. */
export function getCourseSessions(dc: DataConnect, vars: GetCourseSessionsVariables, options?: OperationOptions): Promise<ExecuteOperationResponse<GetCourseSessionsData>>;
/** Generated Node Admin SDK operation action function for the 'GetCourseSessions' Query. Allow users to pass in custom DataConnect instances. */
export function getCourseSessions(vars: GetCourseSessionsVariables, options?: OperationOptions): Promise<ExecuteOperationResponse<GetCourseSessionsData>>;

/** Generated Node Admin SDK operation action function for the 'CheckInToSession' Mutation. Allow users to execute without passing in DataConnect. */
export function checkInToSession(dc: DataConnect, vars: CheckInToSessionVariables, options?: OperationOptions): Promise<ExecuteOperationResponse<CheckInToSessionData>>;
/** Generated Node Admin SDK operation action function for the 'CheckInToSession' Mutation. Allow users to pass in custom DataConnect instances. */
export function checkInToSession(vars: CheckInToSessionVariables, options?: OperationOptions): Promise<ExecuteOperationResponse<CheckInToSessionData>>;

/** Generated Node Admin SDK operation action function for the 'SyncUser' Mutation. Allow users to execute without passing in DataConnect. */
export function syncUser(dc: DataConnect, vars: SyncUserVariables, options?: OperationOptions): Promise<ExecuteOperationResponse<SyncUserData>>;
/** Generated Node Admin SDK operation action function for the 'SyncUser' Mutation. Allow users to pass in custom DataConnect instances. */
export function syncUser(vars: SyncUserVariables, options?: OperationOptions): Promise<ExecuteOperationResponse<SyncUserData>>;

/** Generated Node Admin SDK operation action function for the 'GetMe' Query. Allow users to execute without passing in DataConnect. */
export function getMe(dc: DataConnect, options?: OperationOptions): Promise<ExecuteOperationResponse<GetMeData>>;
/** Generated Node Admin SDK operation action function for the 'GetMe' Query. Allow users to pass in custom DataConnect instances. */
export function getMe(options?: OperationOptions): Promise<ExecuteOperationResponse<GetMeData>>;

/** Generated Node Admin SDK operation action function for the 'UpdateMyProfile' Mutation. Allow users to execute without passing in DataConnect. */
export function updateMyProfile(dc: DataConnect, vars?: UpdateMyProfileVariables, options?: OperationOptions): Promise<ExecuteOperationResponse<UpdateMyProfileData>>;
/** Generated Node Admin SDK operation action function for the 'UpdateMyProfile' Mutation. Allow users to pass in custom DataConnect instances. */
export function updateMyProfile(vars?: UpdateMyProfileVariables, options?: OperationOptions): Promise<ExecuteOperationResponse<UpdateMyProfileData>>;

/** Generated Node Admin SDK operation action function for the 'ListPublishedCourses' Query. Allow users to execute without passing in DataConnect. */
export function listPublishedCourses(dc: DataConnect, options?: OperationOptions): Promise<ExecuteOperationResponse<ListPublishedCoursesData>>;
/** Generated Node Admin SDK operation action function for the 'ListPublishedCourses' Query. Allow users to pass in custom DataConnect instances. */
export function listPublishedCourses(options?: OperationOptions): Promise<ExecuteOperationResponse<ListPublishedCoursesData>>;

/** Generated Node Admin SDK operation action function for the 'GetCourseCurriculum' Query. Allow users to execute without passing in DataConnect. */
export function getCourseCurriculum(dc: DataConnect, vars: GetCourseCurriculumVariables, options?: OperationOptions): Promise<ExecuteOperationResponse<GetCourseCurriculumData>>;
/** Generated Node Admin SDK operation action function for the 'GetCourseCurriculum' Query. Allow users to pass in custom DataConnect instances. */
export function getCourseCurriculum(vars: GetCourseCurriculumVariables, options?: OperationOptions): Promise<ExecuteOperationResponse<GetCourseCurriculumData>>;

/** Generated Node Admin SDK operation action function for the 'GetPendingSubmissions' Query. Allow users to execute without passing in DataConnect. */
export function getPendingSubmissions(dc: DataConnect, options?: OperationOptions): Promise<ExecuteOperationResponse<GetPendingSubmissionsData>>;
/** Generated Node Admin SDK operation action function for the 'GetPendingSubmissions' Query. Allow users to pass in custom DataConnect instances. */
export function getPendingSubmissions(options?: OperationOptions): Promise<ExecuteOperationResponse<GetPendingSubmissionsData>>;

/** Generated Node Admin SDK operation action function for the 'SubmitMission' Mutation. Allow users to execute without passing in DataConnect. */
export function submitMission(dc: DataConnect, vars: SubmitMissionVariables, options?: OperationOptions): Promise<ExecuteOperationResponse<SubmitMissionData>>;
/** Generated Node Admin SDK operation action function for the 'SubmitMission' Mutation. Allow users to pass in custom DataConnect instances. */
export function submitMission(vars: SubmitMissionVariables, options?: OperationOptions): Promise<ExecuteOperationResponse<SubmitMissionData>>;

/** Generated Node Admin SDK operation action function for the 'GradeSubmission' Mutation. Allow users to execute without passing in DataConnect. */
export function gradeSubmission(dc: DataConnect, vars: GradeSubmissionVariables, options?: OperationOptions): Promise<ExecuteOperationResponse<GradeSubmissionData>>;
/** Generated Node Admin SDK operation action function for the 'GradeSubmission' Mutation. Allow users to pass in custom DataConnect instances. */
export function gradeSubmission(vars: GradeSubmissionVariables, options?: OperationOptions): Promise<ExecuteOperationResponse<GradeSubmissionData>>;

/** Generated Node Admin SDK operation action function for the 'AddCriterionScore' Mutation. Allow users to execute without passing in DataConnect. */
export function addCriterionScore(dc: DataConnect, vars: AddCriterionScoreVariables, options?: OperationOptions): Promise<ExecuteOperationResponse<AddCriterionScoreData>>;
/** Generated Node Admin SDK operation action function for the 'AddCriterionScore' Mutation. Allow users to pass in custom DataConnect instances. */
export function addCriterionScore(vars: AddCriterionScoreVariables, options?: OperationOptions): Promise<ExecuteOperationResponse<AddCriterionScoreData>>;

/** Generated Node Admin SDK operation action function for the 'MySubmissions' Query. Allow users to execute without passing in DataConnect. */
export function mySubmissions(dc: DataConnect, options?: OperationOptions): Promise<ExecuteOperationResponse<MySubmissionsData>>;
/** Generated Node Admin SDK operation action function for the 'MySubmissions' Query. Allow users to pass in custom DataConnect instances. */
export function mySubmissions(options?: OperationOptions): Promise<ExecuteOperationResponse<MySubmissionsData>>;

