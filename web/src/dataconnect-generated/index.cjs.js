const { queryRef, executeQuery, validateArgsWithOptions, mutationRef, executeMutation, validateArgs, makeMemoryCacheProvider } = require('firebase/data-connect');

const AttendanceMethod = {
  QR: "QR",
  MANUAL: "MANUAL",
}
exports.AttendanceMethod = AttendanceMethod;

const AttendanceStatus = {
  PRESENT: "PRESENT",
  LATE: "LATE",
  EXCUSED: "EXCUSED",
  UNEXCUSED: "UNEXCUSED",
}
exports.AttendanceStatus = AttendanceStatus;

const BillingCycle = {
  MONTHLY: "MONTHLY",
  QUARTERLY: "QUARTERLY",
  YEARLY: "YEARLY",
}
exports.BillingCycle = BillingCycle;

const CertificateTarget = {
  COURSE: "COURSE",
  MISSION: "MISSION",
}
exports.CertificateTarget = CertificateTarget;

const CourseLevel = {
  BEGINNER: "BEGINNER",
  INTERMEDIATE: "INTERMEDIATE",
  ADVANCED: "ADVANCED",
}
exports.CourseLevel = CourseLevel;

const LectureType = {
  VIDEO: "VIDEO",
  READING: "READING",
  INTERACTIVE: "INTERACTIVE",
  QUIZ: "QUIZ",
}
exports.LectureType = LectureType;

const PaymentGateway = {
  FAWRY: "FAWRY",
  PAYMOB: "PAYMOB",
  INSTAPAY: "INSTAPAY",
}
exports.PaymentGateway = PaymentGateway;

const PaymentItemTarget = {
  COURSE: "COURSE",
  MISSION: "MISSION",
  SUBSCRIPTION: "SUBSCRIPTION",
}
exports.PaymentItemTarget = PaymentItemTarget;

const PaymentStatus = {
  PENDING: "PENDING",
  COMPLETED: "COMPLETED",
  FAILED: "FAILED",
  REFUNDED: "REFUNDED",
}
exports.PaymentStatus = PaymentStatus;

const SessionType = {
  ONLINE: "ONLINE",
  OFFLINE: "OFFLINE",
}
exports.SessionType = SessionType;

const SubmissionStatus = {
  PENDING: "PENDING",
  GRADED: "GRADED",
  RETURNED: "RETURNED",
  REJECTED: "REJECTED",
}
exports.SubmissionStatus = SubmissionStatus;

const connectorConfig = {
  connector: 'default',
  service: 'learning-management-syst-3cc3a-service',
  location: 'europe-west8'
};
exports.connectorConfig = connectorConfig;
const dataConnectSettings = {
  cacheSettings: {
    cacheProvider: makeMemoryCacheProvider()
  }
};
exports.dataConnectSettings = dataConnectSettings;

const enrollInCourseRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'EnrollInCourse', inputVars);
}
enrollInCourseRef.operationName = 'EnrollInCourse';
exports.enrollInCourseRef = enrollInCourseRef;

exports.enrollInCourse = function enrollInCourse(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dcOrVars, vars, true);
  return executeMutation(enrollInCourseRef(dcInstance, inputVars));
}
;

const enrollInMissionRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'EnrollInMission', inputVars);
}
enrollInMissionRef.operationName = 'EnrollInMission';
exports.enrollInMissionRef = enrollInMissionRef;

exports.enrollInMission = function enrollInMission(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dcOrVars, vars, true);
  return executeMutation(enrollInMissionRef(dcInstance, inputVars));
}
;

const updateLectureProgressRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'UpdateLectureProgress', inputVars);
}
updateLectureProgressRef.operationName = 'UpdateLectureProgress';
exports.updateLectureProgressRef = updateLectureProgressRef;

exports.updateLectureProgress = function updateLectureProgress(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dcOrVars, vars, true);
  return executeMutation(updateLectureProgressRef(dcInstance, inputVars));
}
;

const getCourseSessionsRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'GetCourseSessions', inputVars);
}
getCourseSessionsRef.operationName = 'GetCourseSessions';
exports.getCourseSessionsRef = getCourseSessionsRef;

exports.getCourseSessions = function getCourseSessions(dcOrVars, varsOrOptions, options) {
  
  const { dc: dcInstance, vars: inputVars, options: inputOpts } = validateArgsWithOptions(connectorConfig, dcOrVars, varsOrOptions, options, true, true);
  return executeQuery(getCourseSessionsRef(dcInstance, inputVars), inputOpts && { fetchPolicy: inputOpts.fetchPolicy });
}
;

const checkInToSessionRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'CheckInToSession', inputVars);
}
checkInToSessionRef.operationName = 'CheckInToSession';
exports.checkInToSessionRef = checkInToSessionRef;

exports.checkInToSession = function checkInToSession(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dcOrVars, vars, true);
  return executeMutation(checkInToSessionRef(dcInstance, inputVars));
}
;

const syncUserRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'SyncUser', inputVars);
}
syncUserRef.operationName = 'SyncUser';
exports.syncUserRef = syncUserRef;

exports.syncUser = function syncUser(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dcOrVars, vars, true);
  return executeMutation(syncUserRef(dcInstance, inputVars));
}
;

const getMeRef = (dc) => {
  const { dc: dcInstance} = validateArgs(connectorConfig, dc, undefined);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'GetMe');
}
getMeRef.operationName = 'GetMe';
exports.getMeRef = getMeRef;

exports.getMe = function getMe(dcOrOptions, options) {
  
  const { dc: dcInstance, vars: inputVars, options: inputOpts } = validateArgsWithOptions(connectorConfig, dcOrOptions, options, undefined,false, false);
  return executeQuery(getMeRef(dcInstance, inputVars), inputOpts && { fetchPolicy: inputOpts.fetchPolicy });
}
;

const updateMyProfileRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'UpdateMyProfile', inputVars);
}
updateMyProfileRef.operationName = 'UpdateMyProfile';
exports.updateMyProfileRef = updateMyProfileRef;

exports.updateMyProfile = function updateMyProfile(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dcOrVars, vars);
  return executeMutation(updateMyProfileRef(dcInstance, inputVars));
}
;

const myCertificatesRef = (dc) => {
  const { dc: dcInstance} = validateArgs(connectorConfig, dc, undefined);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'MyCertificates');
}
myCertificatesRef.operationName = 'MyCertificates';
exports.myCertificatesRef = myCertificatesRef;

exports.myCertificates = function myCertificates(dcOrOptions, options) {
  
  const { dc: dcInstance, vars: inputVars, options: inputOpts } = validateArgsWithOptions(connectorConfig, dcOrOptions, options, undefined,false, false);
  return executeQuery(myCertificatesRef(dcInstance, inputVars), inputOpts && { fetchPolicy: inputOpts.fetchPolicy });
}
;

const verifyCertificateRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'VerifyCertificate', inputVars);
}
verifyCertificateRef.operationName = 'VerifyCertificate';
exports.verifyCertificateRef = verifyCertificateRef;

exports.verifyCertificate = function verifyCertificate(dcOrVars, varsOrOptions, options) {
  
  const { dc: dcInstance, vars: inputVars, options: inputOpts } = validateArgsWithOptions(connectorConfig, dcOrVars, varsOrOptions, options, true, true);
  return executeQuery(verifyCertificateRef(dcInstance, inputVars), inputOpts && { fetchPolicy: inputOpts.fetchPolicy });
}
;

const logPaymentRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'LogPayment', inputVars);
}
logPaymentRef.operationName = 'LogPayment';
exports.logPaymentRef = logPaymentRef;

exports.logPayment = function logPayment(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dcOrVars, vars, true);
  return executeMutation(logPaymentRef(dcInstance, inputVars));
}
;

const addPaymentItemRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'AddPaymentItem', inputVars);
}
addPaymentItemRef.operationName = 'AddPaymentItem';
exports.addPaymentItemRef = addPaymentItemRef;

exports.addPaymentItem = function addPaymentItem(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dcOrVars, vars, true);
  return executeMutation(addPaymentItemRef(dcInstance, inputVars));
}
;

const myPaymentHistoryRef = (dc) => {
  const { dc: dcInstance} = validateArgs(connectorConfig, dc, undefined);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'MyPaymentHistory');
}
myPaymentHistoryRef.operationName = 'MyPaymentHistory';
exports.myPaymentHistoryRef = myPaymentHistoryRef;

exports.myPaymentHistory = function myPaymentHistory(dcOrOptions, options) {
  
  const { dc: dcInstance, vars: inputVars, options: inputOpts } = validateArgsWithOptions(connectorConfig, dcOrOptions, options, undefined,false, false);
  return executeQuery(myPaymentHistoryRef(dcInstance, inputVars), inputOpts && { fetchPolicy: inputOpts.fetchPolicy });
}
;

const submitMissionRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'SubmitMission', inputVars);
}
submitMissionRef.operationName = 'SubmitMission';
exports.submitMissionRef = submitMissionRef;

exports.submitMission = function submitMission(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dcOrVars, vars, true);
  return executeMutation(submitMissionRef(dcInstance, inputVars));
}
;

const gradeSubmissionRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'GradeSubmission', inputVars);
}
gradeSubmissionRef.operationName = 'GradeSubmission';
exports.gradeSubmissionRef = gradeSubmissionRef;

exports.gradeSubmission = function gradeSubmission(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dcOrVars, vars, true);
  return executeMutation(gradeSubmissionRef(dcInstance, inputVars));
}
;

const addCriterionScoreRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'AddCriterionScore', inputVars);
}
addCriterionScoreRef.operationName = 'AddCriterionScore';
exports.addCriterionScoreRef = addCriterionScoreRef;

exports.addCriterionScore = function addCriterionScore(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dcOrVars, vars, true);
  return executeMutation(addCriterionScoreRef(dcInstance, inputVars));
}
;

const mySubmissionsRef = (dc) => {
  const { dc: dcInstance} = validateArgs(connectorConfig, dc, undefined);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'MySubmissions');
}
mySubmissionsRef.operationName = 'MySubmissions';
exports.mySubmissionsRef = mySubmissionsRef;

exports.mySubmissions = function mySubmissions(dcOrOptions, options) {
  
  const { dc: dcInstance, vars: inputVars, options: inputOpts } = validateArgsWithOptions(connectorConfig, dcOrOptions, options, undefined,false, false);
  return executeQuery(mySubmissionsRef(dcInstance, inputVars), inputOpts && { fetchPolicy: inputOpts.fetchPolicy });
}
;

const getQuizQuestionsRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'GetQuizQuestions', inputVars);
}
getQuizQuestionsRef.operationName = 'GetQuizQuestions';
exports.getQuizQuestionsRef = getQuizQuestionsRef;

exports.getQuizQuestions = function getQuizQuestions(dcOrVars, varsOrOptions, options) {
  
  const { dc: dcInstance, vars: inputVars, options: inputOpts } = validateArgsWithOptions(connectorConfig, dcOrVars, varsOrOptions, options, true, true);
  return executeQuery(getQuizQuestionsRef(dcInstance, inputVars), inputOpts && { fetchPolicy: inputOpts.fetchPolicy });
}
;

const startQuizAttemptRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'StartQuizAttempt', inputVars);
}
startQuizAttemptRef.operationName = 'StartQuizAttempt';
exports.startQuizAttemptRef = startQuizAttemptRef;

exports.startQuizAttempt = function startQuizAttempt(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dcOrVars, vars, true);
  return executeMutation(startQuizAttemptRef(dcInstance, inputVars));
}
;

const submitQuizAnswerRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'SubmitQuizAnswer', inputVars);
}
submitQuizAnswerRef.operationName = 'SubmitQuizAnswer';
exports.submitQuizAnswerRef = submitQuizAnswerRef;

exports.submitQuizAnswer = function submitQuizAnswer(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dcOrVars, vars, true);
  return executeMutation(submitQuizAnswerRef(dcInstance, inputVars));
}
;

const finishQuizAttemptRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'FinishQuizAttempt', inputVars);
}
finishQuizAttemptRef.operationName = 'FinishQuizAttempt';
exports.finishQuizAttemptRef = finishQuizAttemptRef;

exports.finishQuizAttempt = function finishQuizAttempt(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dcOrVars, vars, true);
  return executeMutation(finishQuizAttemptRef(dcInstance, inputVars));
}
;

const adminCreateCourseRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'AdminCreateCourse', inputVars);
}
adminCreateCourseRef.operationName = 'AdminCreateCourse';
exports.adminCreateCourseRef = adminCreateCourseRef;

exports.adminCreateCourse = function adminCreateCourse(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dcOrVars, vars, true);
  return executeMutation(adminCreateCourseRef(dcInstance, inputVars));
}
;

const adminDeleteCourseRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'AdminDeleteCourse', inputVars);
}
adminDeleteCourseRef.operationName = 'AdminDeleteCourse';
exports.adminDeleteCourseRef = adminDeleteCourseRef;

exports.adminDeleteCourse = function adminDeleteCourse(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dcOrVars, vars, true);
  return executeMutation(adminDeleteCourseRef(dcInstance, inputVars));
}
;

const adminCreateLectureRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'AdminCreateLecture', inputVars);
}
adminCreateLectureRef.operationName = 'AdminCreateLecture';
exports.adminCreateLectureRef = adminCreateLectureRef;

exports.adminCreateLecture = function adminCreateLecture(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dcOrVars, vars, true);
  return executeMutation(adminCreateLectureRef(dcInstance, inputVars));
}
;

const adminCreateSessionRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'AdminCreateSession', inputVars);
}
adminCreateSessionRef.operationName = 'AdminCreateSession';
exports.adminCreateSessionRef = adminCreateSessionRef;

exports.adminCreateSession = function adminCreateSession(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dcOrVars, vars, true);
  return executeMutation(adminCreateSessionRef(dcInstance, inputVars));
}
;

const adminCancelSessionRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'AdminCancelSession', inputVars);
}
adminCancelSessionRef.operationName = 'AdminCancelSession';
exports.adminCancelSessionRef = adminCancelSessionRef;

exports.adminCancelSession = function adminCancelSession(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dcOrVars, vars, true);
  return executeMutation(adminCancelSessionRef(dcInstance, inputVars));
}
;

const adminCreateSubscriptionTierRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'AdminCreateSubscriptionTier', inputVars);
}
adminCreateSubscriptionTierRef.operationName = 'AdminCreateSubscriptionTier';
exports.adminCreateSubscriptionTierRef = adminCreateSubscriptionTierRef;

exports.adminCreateSubscriptionTier = function adminCreateSubscriptionTier(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dcOrVars, vars, true);
  return executeMutation(adminCreateSubscriptionTierRef(dcInstance, inputVars));
}
;

const adminDeprecateSubscriptionTierRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'AdminDeprecateSubscriptionTier', inputVars);
}
adminDeprecateSubscriptionTierRef.operationName = 'AdminDeprecateSubscriptionTier';
exports.adminDeprecateSubscriptionTierRef = adminDeprecateSubscriptionTierRef;

exports.adminDeprecateSubscriptionTier = function adminDeprecateSubscriptionTier(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dcOrVars, vars, true);
  return executeMutation(adminDeprecateSubscriptionTierRef(dcInstance, inputVars));
}
;

const adminCreateCategoryRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'AdminCreateCategory', inputVars);
}
adminCreateCategoryRef.operationName = 'AdminCreateCategory';
exports.adminCreateCategoryRef = adminCreateCategoryRef;

exports.adminCreateCategory = function adminCreateCategory(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dcOrVars, vars, true);
  return executeMutation(adminCreateCategoryRef(dcInstance, inputVars));
}
;

const listPublishedCoursesRef = (dc) => {
  const { dc: dcInstance} = validateArgs(connectorConfig, dc, undefined);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'ListPublishedCourses');
}
listPublishedCoursesRef.operationName = 'ListPublishedCourses';
exports.listPublishedCoursesRef = listPublishedCoursesRef;

exports.listPublishedCourses = function listPublishedCourses(dcOrOptions, options) {
  
  const { dc: dcInstance, vars: inputVars, options: inputOpts } = validateArgsWithOptions(connectorConfig, dcOrOptions, options, undefined,false, false);
  return executeQuery(listPublishedCoursesRef(dcInstance, inputVars), inputOpts && { fetchPolicy: inputOpts.fetchPolicy });
}
;

const getCourseCurriculumRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'GetCourseCurriculum', inputVars);
}
getCourseCurriculumRef.operationName = 'GetCourseCurriculum';
exports.getCourseCurriculumRef = getCourseCurriculumRef;

exports.getCourseCurriculum = function getCourseCurriculum(dcOrVars, varsOrOptions, options) {
  
  const { dc: dcInstance, vars: inputVars, options: inputOpts } = validateArgsWithOptions(connectorConfig, dcOrVars, varsOrOptions, options, true, true);
  return executeQuery(getCourseCurriculumRef(dcInstance, inputVars), inputOpts && { fetchPolicy: inputOpts.fetchPolicy });
}
;

const getPendingSubmissionsRef = (dc) => {
  const { dc: dcInstance} = validateArgs(connectorConfig, dc, undefined);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'GetPendingSubmissions');
}
getPendingSubmissionsRef.operationName = 'GetPendingSubmissions';
exports.getPendingSubmissionsRef = getPendingSubmissionsRef;

exports.getPendingSubmissions = function getPendingSubmissions(dcOrOptions, options) {
  
  const { dc: dcInstance, vars: inputVars, options: inputOpts } = validateArgsWithOptions(connectorConfig, dcOrOptions, options, undefined,false, false);
  return executeQuery(getPendingSubmissionsRef(dcInstance, inputVars), inputOpts && { fetchPolicy: inputOpts.fetchPolicy });
}
;
