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

export enum PaymentGateway {
  FAWRY = "FAWRY",
  PAYMOB = "PAYMOB",
  INSTAPAY = "INSTAPAY",
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
  id: UUIDString;
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

interface FinishQuizAttemptRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: FinishQuizAttemptVariables): MutationRef<FinishQuizAttemptData, FinishQuizAttemptVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: FinishQuizAttemptVariables): MutationRef<FinishQuizAttemptData, FinishQuizAttemptVariables>;
  operationName: string;
}
export const finishQuizAttemptRef: FinishQuizAttemptRef;

export function finishQuizAttempt(vars: FinishQuizAttemptVariables): MutationPromise<FinishQuizAttemptData, FinishQuizAttemptVariables>;
export function finishQuizAttempt(dc: DataConnect, vars: FinishQuizAttemptVariables): MutationPromise<FinishQuizAttemptData, FinishQuizAttemptVariables>;

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

