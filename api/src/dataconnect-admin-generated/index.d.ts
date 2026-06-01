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
export enum PaymentGateway {
  FAWRY = "FAWRY",
  PAYMOB = "PAYMOB",
  INSTAPAY = "INSTAPAY",
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

export interface AddPaymentItemData {
  paymentItem_insert: PaymentItem_Key;
}

export interface AddPaymentItemVariables {
  paymentId: UUIDString;
  courseId?: UUIDString | null;
  missionId?: UUIDString | null;
  subscriptionPlanId?: UUIDString | null;
  price: number;
}

export interface Attendance_Key {
  id: UUIDString;
  __typename?: 'Attendance_Key';
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
    locationOrUrl: string;
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
    submittedAt?: TimestampString | null;
    student: {
      name: string;
      email: string;
    };
      mission: {
        title: string;
        difficulty: string;
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
      options: unknown;
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
  criteriaScores: unknown;
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
    level: string;
    thumbnail?: string | null;
    tags?: string[] | null;
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
}

export interface MissionMicroLesson_Key {
  id: UUIDString;
  __typename?: 'MissionMicroLesson_Key';
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
    referenceId: string;
    createdAt: TimestampString;
    paymentItems_on_payment: ({
      priceAtPurchase: number;
      course?: {
        title: string;
      };
        mission?: {
          title: string;
        };
          subscriptionPlan?: {
            plan: string;
          };
    })[];
  } & Payment_Key)[];
}

export interface MySubmissionsData {
  missionSubmissions: ({
    id: UUIDString;
    fileUrl: string;
    feedback?: string | null;
    criteriaScores?: unknown | null;
    submittedAt?: TimestampString | null;
    mission: {
      title: string;
      difficulty: string;
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
  quizAttemptAnswer_insert: QuizAttemptAnswer_Key;
}

export interface SubmitQuizAnswerVariables {
  attemptId: UUIDString;
  questionId: UUIDString;
  selectedIndex: number;
}

export interface SubscriptionPlan_Key {
  id: UUIDString;
  __typename?: 'SubscriptionPlan_Key';
}

export interface SyncUserData {
  user_upsert: User_Key;
}

export interface SyncUserVariables {
  uid: string;
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

export interface User_Key {
  id: string;
  __typename?: 'User_Key';
}

export interface VerifyCertificateData {
  certificates: ({
    issuedAt: TimestampString;
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

/** Generated Node Admin SDK operation action function for the 'GetPendingSubmissions' Query. Allow users to execute without passing in DataConnect. */
export function getPendingSubmissions(dc: DataConnect, options?: OperationOptions): Promise<ExecuteOperationResponse<GetPendingSubmissionsData>>;
/** Generated Node Admin SDK operation action function for the 'GetPendingSubmissions' Query. Allow users to pass in custom DataConnect instances. */
export function getPendingSubmissions(options?: OperationOptions): Promise<ExecuteOperationResponse<GetPendingSubmissionsData>>;

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

/** Generated Node Admin SDK operation action function for the 'GetCourseSessions' Query. Allow users to execute without passing in DataConnect. */
export function getCourseSessions(dc: DataConnect, vars: GetCourseSessionsVariables, options?: OperationOptions): Promise<ExecuteOperationResponse<GetCourseSessionsData>>;
/** Generated Node Admin SDK operation action function for the 'GetCourseSessions' Query. Allow users to pass in custom DataConnect instances. */
export function getCourseSessions(vars: GetCourseSessionsVariables, options?: OperationOptions): Promise<ExecuteOperationResponse<GetCourseSessionsData>>;

/** Generated Node Admin SDK operation action function for the 'CheckInToSession' Mutation. Allow users to execute without passing in DataConnect. */
export function checkInToSession(dc: DataConnect, vars: CheckInToSessionVariables, options?: OperationOptions): Promise<ExecuteOperationResponse<CheckInToSessionData>>;
/** Generated Node Admin SDK operation action function for the 'CheckInToSession' Mutation. Allow users to pass in custom DataConnect instances. */
export function checkInToSession(vars: CheckInToSessionVariables, options?: OperationOptions): Promise<ExecuteOperationResponse<CheckInToSessionData>>;

/** Generated Node Admin SDK operation action function for the 'ListPublishedCourses' Query. Allow users to execute without passing in DataConnect. */
export function listPublishedCourses(dc: DataConnect, options?: OperationOptions): Promise<ExecuteOperationResponse<ListPublishedCoursesData>>;
/** Generated Node Admin SDK operation action function for the 'ListPublishedCourses' Query. Allow users to pass in custom DataConnect instances. */
export function listPublishedCourses(options?: OperationOptions): Promise<ExecuteOperationResponse<ListPublishedCoursesData>>;

/** Generated Node Admin SDK operation action function for the 'GetCourseCurriculum' Query. Allow users to execute without passing in DataConnect. */
export function getCourseCurriculum(dc: DataConnect, vars: GetCourseCurriculumVariables, options?: OperationOptions): Promise<ExecuteOperationResponse<GetCourseCurriculumData>>;
/** Generated Node Admin SDK operation action function for the 'GetCourseCurriculum' Query. Allow users to pass in custom DataConnect instances. */
export function getCourseCurriculum(vars: GetCourseCurriculumVariables, options?: OperationOptions): Promise<ExecuteOperationResponse<GetCourseCurriculumData>>;

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

/** Generated Node Admin SDK operation action function for the 'SubmitMission' Mutation. Allow users to execute without passing in DataConnect. */
export function submitMission(dc: DataConnect, vars: SubmitMissionVariables, options?: OperationOptions): Promise<ExecuteOperationResponse<SubmitMissionData>>;
/** Generated Node Admin SDK operation action function for the 'SubmitMission' Mutation. Allow users to pass in custom DataConnect instances. */
export function submitMission(vars: SubmitMissionVariables, options?: OperationOptions): Promise<ExecuteOperationResponse<SubmitMissionData>>;

/** Generated Node Admin SDK operation action function for the 'MySubmissions' Query. Allow users to execute without passing in DataConnect. */
export function mySubmissions(dc: DataConnect, options?: OperationOptions): Promise<ExecuteOperationResponse<MySubmissionsData>>;
/** Generated Node Admin SDK operation action function for the 'MySubmissions' Query. Allow users to pass in custom DataConnect instances. */
export function mySubmissions(options?: OperationOptions): Promise<ExecuteOperationResponse<MySubmissionsData>>;

/** Generated Node Admin SDK operation action function for the 'GradeSubmission' Mutation. Allow users to execute without passing in DataConnect. */
export function gradeSubmission(dc: DataConnect, vars: GradeSubmissionVariables, options?: OperationOptions): Promise<ExecuteOperationResponse<GradeSubmissionData>>;
/** Generated Node Admin SDK operation action function for the 'GradeSubmission' Mutation. Allow users to pass in custom DataConnect instances. */
export function gradeSubmission(vars: GradeSubmissionVariables, options?: OperationOptions): Promise<ExecuteOperationResponse<GradeSubmissionData>>;

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

