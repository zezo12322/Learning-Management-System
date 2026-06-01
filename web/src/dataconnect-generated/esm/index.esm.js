import { queryRef, executeQuery, validateArgsWithOptions, mutationRef, executeMutation, validateArgs, makeMemoryCacheProvider } from 'firebase/data-connect';

export const AttendanceMethod = {
  QR: "QR",
  MANUAL: "MANUAL",
}

export const AttendanceStatus = {
  PRESENT: "PRESENT",
  LATE: "LATE",
  EXCUSED: "EXCUSED",
  UNEXCUSED: "UNEXCUSED",
}

export const BillingCycle = {
  MONTHLY: "MONTHLY",
  QUARTERLY: "QUARTERLY",
  YEARLY: "YEARLY",
}

export const CertificateTarget = {
  COURSE: "COURSE",
  MISSION: "MISSION",
}

export const CourseLevel = {
  BEGINNER: "BEGINNER",
  INTERMEDIATE: "INTERMEDIATE",
  ADVANCED: "ADVANCED",
}

export const LectureType = {
  VIDEO: "VIDEO",
  READING: "READING",
  INTERACTIVE: "INTERACTIVE",
  QUIZ: "QUIZ",
}

export const PaymentGateway = {
  FAWRY: "FAWRY",
  PAYMOB: "PAYMOB",
  INSTAPAY: "INSTAPAY",
}

export const PaymentItemTarget = {
  COURSE: "COURSE",
  MISSION: "MISSION",
  SUBSCRIPTION: "SUBSCRIPTION",
}

export const PaymentStatus = {
  PENDING: "PENDING",
  COMPLETED: "COMPLETED",
  FAILED: "FAILED",
  REFUNDED: "REFUNDED",
}

export const SessionType = {
  ONLINE: "ONLINE",
  OFFLINE: "OFFLINE",
}

export const SubmissionStatus = {
  PENDING: "PENDING",
  GRADED: "GRADED",
  RETURNED: "RETURNED",
  REJECTED: "REJECTED",
}

export const connectorConfig = {
  connector: 'default',
  service: 'learning-management-syst-3cc3a-service',
  location: 'europe-west8'
};
export const dataConnectSettings = {
  cacheSettings: {
    cacheProvider: makeMemoryCacheProvider()
  }
};
export const enrollInCourseRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'EnrollInCourse', inputVars);
}
enrollInCourseRef.operationName = 'EnrollInCourse';

export function enrollInCourse(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dcOrVars, vars, true);
  return executeMutation(enrollInCourseRef(dcInstance, inputVars));
}

export const enrollInMissionRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'EnrollInMission', inputVars);
}
enrollInMissionRef.operationName = 'EnrollInMission';

export function enrollInMission(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dcOrVars, vars, true);
  return executeMutation(enrollInMissionRef(dcInstance, inputVars));
}

export const updateLectureProgressRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'UpdateLectureProgress', inputVars);
}
updateLectureProgressRef.operationName = 'UpdateLectureProgress';

export function updateLectureProgress(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dcOrVars, vars, true);
  return executeMutation(updateLectureProgressRef(dcInstance, inputVars));
}

export const getCourseSessionsRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'GetCourseSessions', inputVars);
}
getCourseSessionsRef.operationName = 'GetCourseSessions';

export function getCourseSessions(dcOrVars, varsOrOptions, options) {
  
  const { dc: dcInstance, vars: inputVars, options: inputOpts } = validateArgsWithOptions(connectorConfig, dcOrVars, varsOrOptions, options, true, true);
  return executeQuery(getCourseSessionsRef(dcInstance, inputVars), inputOpts && { fetchPolicy: inputOpts.fetchPolicy });
}

export const checkInToSessionRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'CheckInToSession', inputVars);
}
checkInToSessionRef.operationName = 'CheckInToSession';

export function checkInToSession(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dcOrVars, vars, true);
  return executeMutation(checkInToSessionRef(dcInstance, inputVars));
}

export const syncUserRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'SyncUser', inputVars);
}
syncUserRef.operationName = 'SyncUser';

export function syncUser(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dcOrVars, vars, true);
  return executeMutation(syncUserRef(dcInstance, inputVars));
}

export const getMeRef = (dc) => {
  const { dc: dcInstance} = validateArgs(connectorConfig, dc, undefined);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'GetMe');
}
getMeRef.operationName = 'GetMe';

export function getMe(dcOrOptions, options) {
  
  const { dc: dcInstance, vars: inputVars, options: inputOpts } = validateArgsWithOptions(connectorConfig, dcOrOptions, options, undefined,false, false);
  return executeQuery(getMeRef(dcInstance, inputVars), inputOpts && { fetchPolicy: inputOpts.fetchPolicy });
}

export const updateMyProfileRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'UpdateMyProfile', inputVars);
}
updateMyProfileRef.operationName = 'UpdateMyProfile';

export function updateMyProfile(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dcOrVars, vars);
  return executeMutation(updateMyProfileRef(dcInstance, inputVars));
}

export const myCertificatesRef = (dc) => {
  const { dc: dcInstance} = validateArgs(connectorConfig, dc, undefined);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'MyCertificates');
}
myCertificatesRef.operationName = 'MyCertificates';

export function myCertificates(dcOrOptions, options) {
  
  const { dc: dcInstance, vars: inputVars, options: inputOpts } = validateArgsWithOptions(connectorConfig, dcOrOptions, options, undefined,false, false);
  return executeQuery(myCertificatesRef(dcInstance, inputVars), inputOpts && { fetchPolicy: inputOpts.fetchPolicy });
}

export const verifyCertificateRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'VerifyCertificate', inputVars);
}
verifyCertificateRef.operationName = 'VerifyCertificate';

export function verifyCertificate(dcOrVars, varsOrOptions, options) {
  
  const { dc: dcInstance, vars: inputVars, options: inputOpts } = validateArgsWithOptions(connectorConfig, dcOrVars, varsOrOptions, options, true, true);
  return executeQuery(verifyCertificateRef(dcInstance, inputVars), inputOpts && { fetchPolicy: inputOpts.fetchPolicy });
}

export const logPaymentRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'LogPayment', inputVars);
}
logPaymentRef.operationName = 'LogPayment';

export function logPayment(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dcOrVars, vars, true);
  return executeMutation(logPaymentRef(dcInstance, inputVars));
}

export const addPaymentItemRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'AddPaymentItem', inputVars);
}
addPaymentItemRef.operationName = 'AddPaymentItem';

export function addPaymentItem(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dcOrVars, vars, true);
  return executeMutation(addPaymentItemRef(dcInstance, inputVars));
}

export const myPaymentHistoryRef = (dc) => {
  const { dc: dcInstance} = validateArgs(connectorConfig, dc, undefined);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'MyPaymentHistory');
}
myPaymentHistoryRef.operationName = 'MyPaymentHistory';

export function myPaymentHistory(dcOrOptions, options) {
  
  const { dc: dcInstance, vars: inputVars, options: inputOpts } = validateArgsWithOptions(connectorConfig, dcOrOptions, options, undefined,false, false);
  return executeQuery(myPaymentHistoryRef(dcInstance, inputVars), inputOpts && { fetchPolicy: inputOpts.fetchPolicy });
}

export const submitMissionRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'SubmitMission', inputVars);
}
submitMissionRef.operationName = 'SubmitMission';

export function submitMission(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dcOrVars, vars, true);
  return executeMutation(submitMissionRef(dcInstance, inputVars));
}

export const gradeSubmissionRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'GradeSubmission', inputVars);
}
gradeSubmissionRef.operationName = 'GradeSubmission';

export function gradeSubmission(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dcOrVars, vars, true);
  return executeMutation(gradeSubmissionRef(dcInstance, inputVars));
}

export const addCriterionScoreRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'AddCriterionScore', inputVars);
}
addCriterionScoreRef.operationName = 'AddCriterionScore';

export function addCriterionScore(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dcOrVars, vars, true);
  return executeMutation(addCriterionScoreRef(dcInstance, inputVars));
}

export const mySubmissionsRef = (dc) => {
  const { dc: dcInstance} = validateArgs(connectorConfig, dc, undefined);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'MySubmissions');
}
mySubmissionsRef.operationName = 'MySubmissions';

export function mySubmissions(dcOrOptions, options) {
  
  const { dc: dcInstance, vars: inputVars, options: inputOpts } = validateArgsWithOptions(connectorConfig, dcOrOptions, options, undefined,false, false);
  return executeQuery(mySubmissionsRef(dcInstance, inputVars), inputOpts && { fetchPolicy: inputOpts.fetchPolicy });
}

export const getQuizQuestionsRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'GetQuizQuestions', inputVars);
}
getQuizQuestionsRef.operationName = 'GetQuizQuestions';

export function getQuizQuestions(dcOrVars, varsOrOptions, options) {
  
  const { dc: dcInstance, vars: inputVars, options: inputOpts } = validateArgsWithOptions(connectorConfig, dcOrVars, varsOrOptions, options, true, true);
  return executeQuery(getQuizQuestionsRef(dcInstance, inputVars), inputOpts && { fetchPolicy: inputOpts.fetchPolicy });
}

export const startQuizAttemptRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'StartQuizAttempt', inputVars);
}
startQuizAttemptRef.operationName = 'StartQuizAttempt';

export function startQuizAttempt(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dcOrVars, vars, true);
  return executeMutation(startQuizAttemptRef(dcInstance, inputVars));
}

export const submitQuizAnswerRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'SubmitQuizAnswer', inputVars);
}
submitQuizAnswerRef.operationName = 'SubmitQuizAnswer';

export function submitQuizAnswer(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dcOrVars, vars, true);
  return executeMutation(submitQuizAnswerRef(dcInstance, inputVars));
}

export const finishQuizAttemptRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'FinishQuizAttempt', inputVars);
}
finishQuizAttemptRef.operationName = 'FinishQuizAttempt';

export function finishQuizAttempt(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dcOrVars, vars, true);
  return executeMutation(finishQuizAttemptRef(dcInstance, inputVars));
}

export const adminCreateCourseRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'AdminCreateCourse', inputVars);
}
adminCreateCourseRef.operationName = 'AdminCreateCourse';

export function adminCreateCourse(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dcOrVars, vars, true);
  return executeMutation(adminCreateCourseRef(dcInstance, inputVars));
}

export const adminDeleteCourseRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'AdminDeleteCourse', inputVars);
}
adminDeleteCourseRef.operationName = 'AdminDeleteCourse';

export function adminDeleteCourse(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dcOrVars, vars, true);
  return executeMutation(adminDeleteCourseRef(dcInstance, inputVars));
}

export const adminCreateLectureRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'AdminCreateLecture', inputVars);
}
adminCreateLectureRef.operationName = 'AdminCreateLecture';

export function adminCreateLecture(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dcOrVars, vars, true);
  return executeMutation(adminCreateLectureRef(dcInstance, inputVars));
}

export const adminCreateSessionRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'AdminCreateSession', inputVars);
}
adminCreateSessionRef.operationName = 'AdminCreateSession';

export function adminCreateSession(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dcOrVars, vars, true);
  return executeMutation(adminCreateSessionRef(dcInstance, inputVars));
}

export const adminCancelSessionRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'AdminCancelSession', inputVars);
}
adminCancelSessionRef.operationName = 'AdminCancelSession';

export function adminCancelSession(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dcOrVars, vars, true);
  return executeMutation(adminCancelSessionRef(dcInstance, inputVars));
}

export const adminCreateSubscriptionTierRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'AdminCreateSubscriptionTier', inputVars);
}
adminCreateSubscriptionTierRef.operationName = 'AdminCreateSubscriptionTier';

export function adminCreateSubscriptionTier(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dcOrVars, vars, true);
  return executeMutation(adminCreateSubscriptionTierRef(dcInstance, inputVars));
}

export const adminDeprecateSubscriptionTierRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'AdminDeprecateSubscriptionTier', inputVars);
}
adminDeprecateSubscriptionTierRef.operationName = 'AdminDeprecateSubscriptionTier';

export function adminDeprecateSubscriptionTier(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dcOrVars, vars, true);
  return executeMutation(adminDeprecateSubscriptionTierRef(dcInstance, inputVars));
}

export const adminCreateCategoryRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'AdminCreateCategory', inputVars);
}
adminCreateCategoryRef.operationName = 'AdminCreateCategory';

export function adminCreateCategory(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dcOrVars, vars, true);
  return executeMutation(adminCreateCategoryRef(dcInstance, inputVars));
}

export const listPublishedCoursesRef = (dc) => {
  const { dc: dcInstance} = validateArgs(connectorConfig, dc, undefined);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'ListPublishedCourses');
}
listPublishedCoursesRef.operationName = 'ListPublishedCourses';

export function listPublishedCourses(dcOrOptions, options) {
  
  const { dc: dcInstance, vars: inputVars, options: inputOpts } = validateArgsWithOptions(connectorConfig, dcOrOptions, options, undefined,false, false);
  return executeQuery(listPublishedCoursesRef(dcInstance, inputVars), inputOpts && { fetchPolicy: inputOpts.fetchPolicy });
}

export const getCourseCurriculumRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'GetCourseCurriculum', inputVars);
}
getCourseCurriculumRef.operationName = 'GetCourseCurriculum';

export function getCourseCurriculum(dcOrVars, varsOrOptions, options) {
  
  const { dc: dcInstance, vars: inputVars, options: inputOpts } = validateArgsWithOptions(connectorConfig, dcOrVars, varsOrOptions, options, true, true);
  return executeQuery(getCourseCurriculumRef(dcInstance, inputVars), inputOpts && { fetchPolicy: inputOpts.fetchPolicy });
}

export const getPendingSubmissionsRef = (dc) => {
  const { dc: dcInstance} = validateArgs(connectorConfig, dc, undefined);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'GetPendingSubmissions');
}
getPendingSubmissionsRef.operationName = 'GetPendingSubmissions';

export function getPendingSubmissions(dcOrOptions, options) {
  
  const { dc: dcInstance, vars: inputVars, options: inputOpts } = validateArgsWithOptions(connectorConfig, dcOrOptions, options, undefined,false, false);
  return executeQuery(getPendingSubmissionsRef(dcInstance, inputVars), inputOpts && { fetchPolicy: inputOpts.fetchPolicy });
}

