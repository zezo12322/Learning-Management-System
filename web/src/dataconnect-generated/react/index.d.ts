import { EnrollInCourseData, EnrollInCourseVariables, EnrollInMissionData, EnrollInMissionVariables, UpdateLectureProgressData, UpdateLectureProgressVariables, GetCourseSessionsData, GetCourseSessionsVariables, CheckInToSessionData, CheckInToSessionVariables, SyncUserData, SyncUserVariables, GetMeData, UpdateMyProfileData, UpdateMyProfileVariables, MyCertificatesData, VerifyCertificateData, VerifyCertificateVariables, LogPaymentData, LogPaymentVariables, AddPaymentItemData, AddPaymentItemVariables, MyPaymentHistoryData, SubmitMissionData, SubmitMissionVariables, GradeSubmissionData, GradeSubmissionVariables, AddCriterionScoreData, AddCriterionScoreVariables, MySubmissionsData, GetQuizQuestionsData, GetQuizQuestionsVariables, StartQuizAttemptData, StartQuizAttemptVariables, SubmitQuizAnswerData, SubmitQuizAnswerVariables, FinishQuizAttemptData, FinishQuizAttemptVariables, AdminCreateCourseData, AdminCreateCourseVariables, AdminDeleteCourseData, AdminDeleteCourseVariables, AdminCreateLectureData, AdminCreateLectureVariables, AdminCreateSessionData, AdminCreateSessionVariables, AdminCancelSessionData, AdminCancelSessionVariables, AdminCreateSubscriptionTierData, AdminCreateSubscriptionTierVariables, AdminDeprecateSubscriptionTierData, AdminDeprecateSubscriptionTierVariables, AdminCreateCategoryData, AdminCreateCategoryVariables, ListPublishedCoursesData, GetCourseCurriculumData, GetCourseCurriculumVariables, GetPendingSubmissionsData } from '../';
import { UseDataConnectQueryResult, useDataConnectQueryOptions, UseDataConnectMutationResult, useDataConnectMutationOptions} from '@tanstack-query-firebase/react/data-connect';
import { UseQueryResult, UseMutationResult} from '@tanstack/react-query';
import { DataConnect } from 'firebase/data-connect';
import { FirebaseError } from 'firebase/app';


export function useEnrollInCourse(options?: useDataConnectMutationOptions<EnrollInCourseData, FirebaseError, EnrollInCourseVariables>): UseDataConnectMutationResult<EnrollInCourseData, EnrollInCourseVariables>;
export function useEnrollInCourse(dc: DataConnect, options?: useDataConnectMutationOptions<EnrollInCourseData, FirebaseError, EnrollInCourseVariables>): UseDataConnectMutationResult<EnrollInCourseData, EnrollInCourseVariables>;

export function useEnrollInMission(options?: useDataConnectMutationOptions<EnrollInMissionData, FirebaseError, EnrollInMissionVariables>): UseDataConnectMutationResult<EnrollInMissionData, EnrollInMissionVariables>;
export function useEnrollInMission(dc: DataConnect, options?: useDataConnectMutationOptions<EnrollInMissionData, FirebaseError, EnrollInMissionVariables>): UseDataConnectMutationResult<EnrollInMissionData, EnrollInMissionVariables>;

export function useUpdateLectureProgress(options?: useDataConnectMutationOptions<UpdateLectureProgressData, FirebaseError, UpdateLectureProgressVariables>): UseDataConnectMutationResult<UpdateLectureProgressData, UpdateLectureProgressVariables>;
export function useUpdateLectureProgress(dc: DataConnect, options?: useDataConnectMutationOptions<UpdateLectureProgressData, FirebaseError, UpdateLectureProgressVariables>): UseDataConnectMutationResult<UpdateLectureProgressData, UpdateLectureProgressVariables>;

export function useGetCourseSessions(vars: GetCourseSessionsVariables, options?: useDataConnectQueryOptions<GetCourseSessionsData>): UseDataConnectQueryResult<GetCourseSessionsData, GetCourseSessionsVariables>;
export function useGetCourseSessions(dc: DataConnect, vars: GetCourseSessionsVariables, options?: useDataConnectQueryOptions<GetCourseSessionsData>): UseDataConnectQueryResult<GetCourseSessionsData, GetCourseSessionsVariables>;

export function useCheckInToSession(options?: useDataConnectMutationOptions<CheckInToSessionData, FirebaseError, CheckInToSessionVariables>): UseDataConnectMutationResult<CheckInToSessionData, CheckInToSessionVariables>;
export function useCheckInToSession(dc: DataConnect, options?: useDataConnectMutationOptions<CheckInToSessionData, FirebaseError, CheckInToSessionVariables>): UseDataConnectMutationResult<CheckInToSessionData, CheckInToSessionVariables>;

export function useSyncUser(options?: useDataConnectMutationOptions<SyncUserData, FirebaseError, SyncUserVariables>): UseDataConnectMutationResult<SyncUserData, SyncUserVariables>;
export function useSyncUser(dc: DataConnect, options?: useDataConnectMutationOptions<SyncUserData, FirebaseError, SyncUserVariables>): UseDataConnectMutationResult<SyncUserData, SyncUserVariables>;

export function useGetMe(options?: useDataConnectQueryOptions<GetMeData>): UseDataConnectQueryResult<GetMeData, undefined>;
export function useGetMe(dc: DataConnect, options?: useDataConnectQueryOptions<GetMeData>): UseDataConnectQueryResult<GetMeData, undefined>;

export function useUpdateMyProfile(options?: useDataConnectMutationOptions<UpdateMyProfileData, FirebaseError, UpdateMyProfileVariables | void>): UseDataConnectMutationResult<UpdateMyProfileData, UpdateMyProfileVariables>;
export function useUpdateMyProfile(dc: DataConnect, options?: useDataConnectMutationOptions<UpdateMyProfileData, FirebaseError, UpdateMyProfileVariables | void>): UseDataConnectMutationResult<UpdateMyProfileData, UpdateMyProfileVariables>;

export function useMyCertificates(options?: useDataConnectQueryOptions<MyCertificatesData>): UseDataConnectQueryResult<MyCertificatesData, undefined>;
export function useMyCertificates(dc: DataConnect, options?: useDataConnectQueryOptions<MyCertificatesData>): UseDataConnectQueryResult<MyCertificatesData, undefined>;

export function useVerifyCertificate(vars: VerifyCertificateVariables, options?: useDataConnectQueryOptions<VerifyCertificateData>): UseDataConnectQueryResult<VerifyCertificateData, VerifyCertificateVariables>;
export function useVerifyCertificate(dc: DataConnect, vars: VerifyCertificateVariables, options?: useDataConnectQueryOptions<VerifyCertificateData>): UseDataConnectQueryResult<VerifyCertificateData, VerifyCertificateVariables>;

export function useLogPayment(options?: useDataConnectMutationOptions<LogPaymentData, FirebaseError, LogPaymentVariables>): UseDataConnectMutationResult<LogPaymentData, LogPaymentVariables>;
export function useLogPayment(dc: DataConnect, options?: useDataConnectMutationOptions<LogPaymentData, FirebaseError, LogPaymentVariables>): UseDataConnectMutationResult<LogPaymentData, LogPaymentVariables>;

export function useAddPaymentItem(options?: useDataConnectMutationOptions<AddPaymentItemData, FirebaseError, AddPaymentItemVariables>): UseDataConnectMutationResult<AddPaymentItemData, AddPaymentItemVariables>;
export function useAddPaymentItem(dc: DataConnect, options?: useDataConnectMutationOptions<AddPaymentItemData, FirebaseError, AddPaymentItemVariables>): UseDataConnectMutationResult<AddPaymentItemData, AddPaymentItemVariables>;

export function useMyPaymentHistory(options?: useDataConnectQueryOptions<MyPaymentHistoryData>): UseDataConnectQueryResult<MyPaymentHistoryData, undefined>;
export function useMyPaymentHistory(dc: DataConnect, options?: useDataConnectQueryOptions<MyPaymentHistoryData>): UseDataConnectQueryResult<MyPaymentHistoryData, undefined>;

export function useSubmitMission(options?: useDataConnectMutationOptions<SubmitMissionData, FirebaseError, SubmitMissionVariables>): UseDataConnectMutationResult<SubmitMissionData, SubmitMissionVariables>;
export function useSubmitMission(dc: DataConnect, options?: useDataConnectMutationOptions<SubmitMissionData, FirebaseError, SubmitMissionVariables>): UseDataConnectMutationResult<SubmitMissionData, SubmitMissionVariables>;

export function useGradeSubmission(options?: useDataConnectMutationOptions<GradeSubmissionData, FirebaseError, GradeSubmissionVariables>): UseDataConnectMutationResult<GradeSubmissionData, GradeSubmissionVariables>;
export function useGradeSubmission(dc: DataConnect, options?: useDataConnectMutationOptions<GradeSubmissionData, FirebaseError, GradeSubmissionVariables>): UseDataConnectMutationResult<GradeSubmissionData, GradeSubmissionVariables>;

export function useAddCriterionScore(options?: useDataConnectMutationOptions<AddCriterionScoreData, FirebaseError, AddCriterionScoreVariables>): UseDataConnectMutationResult<AddCriterionScoreData, AddCriterionScoreVariables>;
export function useAddCriterionScore(dc: DataConnect, options?: useDataConnectMutationOptions<AddCriterionScoreData, FirebaseError, AddCriterionScoreVariables>): UseDataConnectMutationResult<AddCriterionScoreData, AddCriterionScoreVariables>;

export function useMySubmissions(options?: useDataConnectQueryOptions<MySubmissionsData>): UseDataConnectQueryResult<MySubmissionsData, undefined>;
export function useMySubmissions(dc: DataConnect, options?: useDataConnectQueryOptions<MySubmissionsData>): UseDataConnectQueryResult<MySubmissionsData, undefined>;

export function useGetQuizQuestions(vars: GetQuizQuestionsVariables, options?: useDataConnectQueryOptions<GetQuizQuestionsData>): UseDataConnectQueryResult<GetQuizQuestionsData, GetQuizQuestionsVariables>;
export function useGetQuizQuestions(dc: DataConnect, vars: GetQuizQuestionsVariables, options?: useDataConnectQueryOptions<GetQuizQuestionsData>): UseDataConnectQueryResult<GetQuizQuestionsData, GetQuizQuestionsVariables>;

export function useStartQuizAttempt(options?: useDataConnectMutationOptions<StartQuizAttemptData, FirebaseError, StartQuizAttemptVariables>): UseDataConnectMutationResult<StartQuizAttemptData, StartQuizAttemptVariables>;
export function useStartQuizAttempt(dc: DataConnect, options?: useDataConnectMutationOptions<StartQuizAttemptData, FirebaseError, StartQuizAttemptVariables>): UseDataConnectMutationResult<StartQuizAttemptData, StartQuizAttemptVariables>;

export function useSubmitQuizAnswer(options?: useDataConnectMutationOptions<SubmitQuizAnswerData, FirebaseError, SubmitQuizAnswerVariables>): UseDataConnectMutationResult<SubmitQuizAnswerData, SubmitQuizAnswerVariables>;
export function useSubmitQuizAnswer(dc: DataConnect, options?: useDataConnectMutationOptions<SubmitQuizAnswerData, FirebaseError, SubmitQuizAnswerVariables>): UseDataConnectMutationResult<SubmitQuizAnswerData, SubmitQuizAnswerVariables>;

export function useFinishQuizAttempt(options?: useDataConnectMutationOptions<FinishQuizAttemptData, FirebaseError, FinishQuizAttemptVariables>): UseDataConnectMutationResult<FinishQuizAttemptData, FinishQuizAttemptVariables>;
export function useFinishQuizAttempt(dc: DataConnect, options?: useDataConnectMutationOptions<FinishQuizAttemptData, FirebaseError, FinishQuizAttemptVariables>): UseDataConnectMutationResult<FinishQuizAttemptData, FinishQuizAttemptVariables>;

export function useAdminCreateCourse(options?: useDataConnectMutationOptions<AdminCreateCourseData, FirebaseError, AdminCreateCourseVariables>): UseDataConnectMutationResult<AdminCreateCourseData, AdminCreateCourseVariables>;
export function useAdminCreateCourse(dc: DataConnect, options?: useDataConnectMutationOptions<AdminCreateCourseData, FirebaseError, AdminCreateCourseVariables>): UseDataConnectMutationResult<AdminCreateCourseData, AdminCreateCourseVariables>;

export function useAdminDeleteCourse(options?: useDataConnectMutationOptions<AdminDeleteCourseData, FirebaseError, AdminDeleteCourseVariables>): UseDataConnectMutationResult<AdminDeleteCourseData, AdminDeleteCourseVariables>;
export function useAdminDeleteCourse(dc: DataConnect, options?: useDataConnectMutationOptions<AdminDeleteCourseData, FirebaseError, AdminDeleteCourseVariables>): UseDataConnectMutationResult<AdminDeleteCourseData, AdminDeleteCourseVariables>;

export function useAdminCreateLecture(options?: useDataConnectMutationOptions<AdminCreateLectureData, FirebaseError, AdminCreateLectureVariables>): UseDataConnectMutationResult<AdminCreateLectureData, AdminCreateLectureVariables>;
export function useAdminCreateLecture(dc: DataConnect, options?: useDataConnectMutationOptions<AdminCreateLectureData, FirebaseError, AdminCreateLectureVariables>): UseDataConnectMutationResult<AdminCreateLectureData, AdminCreateLectureVariables>;

export function useAdminCreateSession(options?: useDataConnectMutationOptions<AdminCreateSessionData, FirebaseError, AdminCreateSessionVariables>): UseDataConnectMutationResult<AdminCreateSessionData, AdminCreateSessionVariables>;
export function useAdminCreateSession(dc: DataConnect, options?: useDataConnectMutationOptions<AdminCreateSessionData, FirebaseError, AdminCreateSessionVariables>): UseDataConnectMutationResult<AdminCreateSessionData, AdminCreateSessionVariables>;

export function useAdminCancelSession(options?: useDataConnectMutationOptions<AdminCancelSessionData, FirebaseError, AdminCancelSessionVariables>): UseDataConnectMutationResult<AdminCancelSessionData, AdminCancelSessionVariables>;
export function useAdminCancelSession(dc: DataConnect, options?: useDataConnectMutationOptions<AdminCancelSessionData, FirebaseError, AdminCancelSessionVariables>): UseDataConnectMutationResult<AdminCancelSessionData, AdminCancelSessionVariables>;

export function useAdminCreateSubscriptionTier(options?: useDataConnectMutationOptions<AdminCreateSubscriptionTierData, FirebaseError, AdminCreateSubscriptionTierVariables>): UseDataConnectMutationResult<AdminCreateSubscriptionTierData, AdminCreateSubscriptionTierVariables>;
export function useAdminCreateSubscriptionTier(dc: DataConnect, options?: useDataConnectMutationOptions<AdminCreateSubscriptionTierData, FirebaseError, AdminCreateSubscriptionTierVariables>): UseDataConnectMutationResult<AdminCreateSubscriptionTierData, AdminCreateSubscriptionTierVariables>;

export function useAdminDeprecateSubscriptionTier(options?: useDataConnectMutationOptions<AdminDeprecateSubscriptionTierData, FirebaseError, AdminDeprecateSubscriptionTierVariables>): UseDataConnectMutationResult<AdminDeprecateSubscriptionTierData, AdminDeprecateSubscriptionTierVariables>;
export function useAdminDeprecateSubscriptionTier(dc: DataConnect, options?: useDataConnectMutationOptions<AdminDeprecateSubscriptionTierData, FirebaseError, AdminDeprecateSubscriptionTierVariables>): UseDataConnectMutationResult<AdminDeprecateSubscriptionTierData, AdminDeprecateSubscriptionTierVariables>;

export function useAdminCreateCategory(options?: useDataConnectMutationOptions<AdminCreateCategoryData, FirebaseError, AdminCreateCategoryVariables>): UseDataConnectMutationResult<AdminCreateCategoryData, AdminCreateCategoryVariables>;
export function useAdminCreateCategory(dc: DataConnect, options?: useDataConnectMutationOptions<AdminCreateCategoryData, FirebaseError, AdminCreateCategoryVariables>): UseDataConnectMutationResult<AdminCreateCategoryData, AdminCreateCategoryVariables>;

export function useListPublishedCourses(options?: useDataConnectQueryOptions<ListPublishedCoursesData>): UseDataConnectQueryResult<ListPublishedCoursesData, undefined>;
export function useListPublishedCourses(dc: DataConnect, options?: useDataConnectQueryOptions<ListPublishedCoursesData>): UseDataConnectQueryResult<ListPublishedCoursesData, undefined>;

export function useGetCourseCurriculum(vars: GetCourseCurriculumVariables, options?: useDataConnectQueryOptions<GetCourseCurriculumData>): UseDataConnectQueryResult<GetCourseCurriculumData, GetCourseCurriculumVariables>;
export function useGetCourseCurriculum(dc: DataConnect, vars: GetCourseCurriculumVariables, options?: useDataConnectQueryOptions<GetCourseCurriculumData>): UseDataConnectQueryResult<GetCourseCurriculumData, GetCourseCurriculumVariables>;

export function useGetPendingSubmissions(options?: useDataConnectQueryOptions<GetPendingSubmissionsData>): UseDataConnectQueryResult<GetPendingSubmissionsData, undefined>;
export function useGetPendingSubmissions(dc: DataConnect, options?: useDataConnectQueryOptions<GetPendingSubmissionsData>): UseDataConnectQueryResult<GetPendingSubmissionsData, undefined>;
