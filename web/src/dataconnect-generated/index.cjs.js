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

const CourseStatus = {
  DRAFT: "DRAFT",
  PUBLISHED: "PUBLISHED",
  ARCHIVED: "ARCHIVED",
}
exports.CourseStatus = CourseStatus;

const EnrollmentStatus = {
  ACTIVE: "ACTIVE",
  COMPLETED: "COMPLETED",
  DROPPED: "DROPPED",
  SUSPENDED: "SUSPENDED",
}
exports.EnrollmentStatus = EnrollmentStatus;

const LectureType = {
  VIDEO: "VIDEO",
  READING: "READING",
  INTERACTIVE: "INTERACTIVE",
  QUIZ: "QUIZ",
}
exports.LectureType = LectureType;

const MissionDifficulty = {
  BEGINNER: "BEGINNER",
  INTERMEDIATE: "INTERMEDIATE",
  ADVANCED: "ADVANCED",
  EXPERT: "EXPERT",
}
exports.MissionDifficulty = MissionDifficulty;

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

const getLectureContentRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'GetLectureContent', inputVars);
}
getLectureContentRef.operationName = 'GetLectureContent';
exports.getLectureContentRef = getLectureContentRef;

exports.getLectureContent = function getLectureContent(dcOrVars, varsOrOptions, options) {
  
  const { dc: dcInstance, vars: inputVars, options: inputOpts } = validateArgsWithOptions(connectorConfig, dcOrVars, varsOrOptions, options, true, true);
  return executeQuery(getLectureContentRef(dcInstance, inputVars), inputOpts && { fetchPolicy: inputOpts.fetchPolicy });
}
;

const getUserLectureProgressRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'GetUserLectureProgress', inputVars);
}
getUserLectureProgressRef.operationName = 'GetUserLectureProgress';
exports.getUserLectureProgressRef = getUserLectureProgressRef;

exports.getUserLectureProgress = function getUserLectureProgress(dcOrVars, varsOrOptions, options) {
  
  const { dc: dcInstance, vars: inputVars, options: inputOpts } = validateArgsWithOptions(connectorConfig, dcOrVars, varsOrOptions, options, true, true);
  return executeQuery(getUserLectureProgressRef(dcInstance, inputVars), inputOpts && { fetchPolicy: inputOpts.fetchPolicy });
}
;

const getMyCourseProgressRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'GetMyCourseProgress', inputVars);
}
getMyCourseProgressRef.operationName = 'GetMyCourseProgress';
exports.getMyCourseProgressRef = getMyCourseProgressRef;

exports.getMyCourseProgress = function getMyCourseProgress(dcOrVars, varsOrOptions, options) {
  
  const { dc: dcInstance, vars: inputVars, options: inputOpts } = validateArgsWithOptions(connectorConfig, dcOrVars, varsOrOptions, options, true, true);
  return executeQuery(getMyCourseProgressRef(dcInstance, inputVars), inputOpts && { fetchPolicy: inputOpts.fetchPolicy });
}
;

const getCourseForEnrollmentRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'GetCourseForEnrollment', inputVars);
}
getCourseForEnrollmentRef.operationName = 'GetCourseForEnrollment';
exports.getCourseForEnrollmentRef = getCourseForEnrollmentRef;

exports.getCourseForEnrollment = function getCourseForEnrollment(dcOrVars, varsOrOptions, options) {
  
  const { dc: dcInstance, vars: inputVars, options: inputOpts } = validateArgsWithOptions(connectorConfig, dcOrVars, varsOrOptions, options, true, true);
  return executeQuery(getCourseForEnrollmentRef(dcInstance, inputVars), inputOpts && { fetchPolicy: inputOpts.fetchPolicy });
}
;

const adminGetCourseRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'AdminGetCourse', inputVars);
}
adminGetCourseRef.operationName = 'AdminGetCourse';
exports.adminGetCourseRef = adminGetCourseRef;

exports.adminGetCourse = function adminGetCourse(dcOrVars, varsOrOptions, options) {
  
  const { dc: dcInstance, vars: inputVars, options: inputOpts } = validateArgsWithOptions(connectorConfig, dcOrVars, varsOrOptions, options, true, true);
  return executeQuery(adminGetCourseRef(dcInstance, inputVars), inputOpts && { fetchPolicy: inputOpts.fetchPolicy });
}
;

const adminListMyCoursesRef = (dc) => {
  const { dc: dcInstance} = validateArgs(connectorConfig, dc, undefined);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'AdminListMyCourses');
}
adminListMyCoursesRef.operationName = 'AdminListMyCourses';
exports.adminListMyCoursesRef = adminListMyCoursesRef;

exports.adminListMyCourses = function adminListMyCourses(dcOrOptions, options) {
  
  const { dc: dcInstance, vars: inputVars, options: inputOpts } = validateArgsWithOptions(connectorConfig, dcOrOptions, options, undefined,false, false);
  return executeQuery(adminListMyCoursesRef(dcInstance, inputVars), inputOpts && { fetchPolicy: inputOpts.fetchPolicy });
}
;

const adminUpdateCourseRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'AdminUpdateCourse', inputVars);
}
adminUpdateCourseRef.operationName = 'AdminUpdateCourse';
exports.adminUpdateCourseRef = adminUpdateCourseRef;

exports.adminUpdateCourse = function adminUpdateCourse(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dcOrVars, vars, true);
  return executeMutation(adminUpdateCourseRef(dcInstance, inputVars));
}
;

const adminUpdateCourseStatusRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'AdminUpdateCourseStatus', inputVars);
}
adminUpdateCourseStatusRef.operationName = 'AdminUpdateCourseStatus';
exports.adminUpdateCourseStatusRef = adminUpdateCourseStatusRef;

exports.adminUpdateCourseStatus = function adminUpdateCourseStatus(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dcOrVars, vars, true);
  return executeMutation(adminUpdateCourseStatusRef(dcInstance, inputVars));
}
;

const adminCreateSectionRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'AdminCreateSection', inputVars);
}
adminCreateSectionRef.operationName = 'AdminCreateSection';
exports.adminCreateSectionRef = adminCreateSectionRef;

exports.adminCreateSection = function adminCreateSection(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dcOrVars, vars, true);
  return executeMutation(adminCreateSectionRef(dcInstance, inputVars));
}
;

const adminUpdateSectionRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'AdminUpdateSection', inputVars);
}
adminUpdateSectionRef.operationName = 'AdminUpdateSection';
exports.adminUpdateSectionRef = adminUpdateSectionRef;

exports.adminUpdateSection = function adminUpdateSection(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dcOrVars, vars, true);
  return executeMutation(adminUpdateSectionRef(dcInstance, inputVars));
}
;

const adminSoftDeleteSectionRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'AdminSoftDeleteSection', inputVars);
}
adminSoftDeleteSectionRef.operationName = 'AdminSoftDeleteSection';
exports.adminSoftDeleteSectionRef = adminSoftDeleteSectionRef;

exports.adminSoftDeleteSection = function adminSoftDeleteSection(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dcOrVars, vars, true);
  return executeMutation(adminSoftDeleteSectionRef(dcInstance, inputVars));
}
;

const adminUpdateSectionOrderRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'AdminUpdateSectionOrder', inputVars);
}
adminUpdateSectionOrderRef.operationName = 'AdminUpdateSectionOrder';
exports.adminUpdateSectionOrderRef = adminUpdateSectionOrderRef;

exports.adminUpdateSectionOrder = function adminUpdateSectionOrder(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dcOrVars, vars, true);
  return executeMutation(adminUpdateSectionOrderRef(dcInstance, inputVars));
}
;

const adminCreateLectureFullRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'AdminCreateLectureFull', inputVars);
}
adminCreateLectureFullRef.operationName = 'AdminCreateLectureFull';
exports.adminCreateLectureFullRef = adminCreateLectureFullRef;

exports.adminCreateLectureFull = function adminCreateLectureFull(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dcOrVars, vars, true);
  return executeMutation(adminCreateLectureFullRef(dcInstance, inputVars));
}
;

const adminUpdateLectureRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'AdminUpdateLecture', inputVars);
}
adminUpdateLectureRef.operationName = 'AdminUpdateLecture';
exports.adminUpdateLectureRef = adminUpdateLectureRef;

exports.adminUpdateLecture = function adminUpdateLecture(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dcOrVars, vars, true);
  return executeMutation(adminUpdateLectureRef(dcInstance, inputVars));
}
;

const adminSoftDeleteLectureRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'AdminSoftDeleteLecture', inputVars);
}
adminSoftDeleteLectureRef.operationName = 'AdminSoftDeleteLecture';
exports.adminSoftDeleteLectureRef = adminSoftDeleteLectureRef;

exports.adminSoftDeleteLecture = function adminSoftDeleteLecture(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dcOrVars, vars, true);
  return executeMutation(adminSoftDeleteLectureRef(dcInstance, inputVars));
}
;

const adminUpdateLectureOrderRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'AdminUpdateLectureOrder', inputVars);
}
adminUpdateLectureOrderRef.operationName = 'AdminUpdateLectureOrder';
exports.adminUpdateLectureOrderRef = adminUpdateLectureOrderRef;

exports.adminUpdateLectureOrder = function adminUpdateLectureOrder(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dcOrVars, vars, true);
  return executeMutation(adminUpdateLectureOrderRef(dcInstance, inputVars));
}
;

const adminMoveLectureToSectionRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'AdminMoveLectureToSection', inputVars);
}
adminMoveLectureToSectionRef.operationName = 'AdminMoveLectureToSection';
exports.adminMoveLectureToSectionRef = adminMoveLectureToSectionRef;

exports.adminMoveLectureToSection = function adminMoveLectureToSection(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dcOrVars, vars, true);
  return executeMutation(adminMoveLectureToSectionRef(dcInstance, inputVars));
}
;

const adminSoftDeleteLecturesBySectionRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'AdminSoftDeleteLecturesBySection', inputVars);
}
adminSoftDeleteLecturesBySectionRef.operationName = 'AdminSoftDeleteLecturesBySection';
exports.adminSoftDeleteLecturesBySectionRef = adminSoftDeleteLecturesBySectionRef;

exports.adminSoftDeleteLecturesBySection = function adminSoftDeleteLecturesBySection(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dcOrVars, vars, true);
  return executeMutation(adminSoftDeleteLecturesBySectionRef(dcInstance, inputVars));
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

const adminAddCourseInstructorRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'AdminAddCourseInstructor', inputVars);
}
adminAddCourseInstructorRef.operationName = 'AdminAddCourseInstructor';
exports.adminAddCourseInstructorRef = adminAddCourseInstructorRef;

exports.adminAddCourseInstructor = function adminAddCourseInstructor(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dcOrVars, vars, true);
  return executeMutation(adminAddCourseInstructorRef(dcInstance, inputVars));
}
;

const adminRemoveCourseInstructorRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'AdminRemoveCourseInstructor', inputVars);
}
adminRemoveCourseInstructorRef.operationName = 'AdminRemoveCourseInstructor';
exports.adminRemoveCourseInstructorRef = adminRemoveCourseInstructorRef;

exports.adminRemoveCourseInstructor = function adminRemoveCourseInstructor(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dcOrVars, vars, true);
  return executeMutation(adminRemoveCourseInstructorRef(dcInstance, inputVars));
}
;

const getCourseInstructorsRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'GetCourseInstructors', inputVars);
}
getCourseInstructorsRef.operationName = 'GetCourseInstructors';
exports.getCourseInstructorsRef = getCourseInstructorsRef;

exports.getCourseInstructors = function getCourseInstructors(dcOrVars, varsOrOptions, options) {
  
  const { dc: dcInstance, vars: inputVars, options: inputOpts } = validateArgsWithOptions(connectorConfig, dcOrVars, varsOrOptions, options, true, true);
  return executeQuery(getCourseInstructorsRef(dcInstance, inputVars), inputOpts && { fetchPolicy: inputOpts.fetchPolicy });
}
;

const getMyCourseAccessRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'GetMyCourseAccess', inputVars);
}
getMyCourseAccessRef.operationName = 'GetMyCourseAccess';
exports.getMyCourseAccessRef = getMyCourseAccessRef;

exports.getMyCourseAccess = function getMyCourseAccess(dcOrVars, varsOrOptions, options) {
  
  const { dc: dcInstance, vars: inputVars, options: inputOpts } = validateArgsWithOptions(connectorConfig, dcOrVars, varsOrOptions, options, true, true);
  return executeQuery(getMyCourseAccessRef(dcInstance, inputVars), inputOpts && { fetchPolicy: inputOpts.fetchPolicy });
}
;

const getMyMissionAccessRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'GetMyMissionAccess', inputVars);
}
getMyMissionAccessRef.operationName = 'GetMyMissionAccess';
exports.getMyMissionAccessRef = getMyMissionAccessRef;

exports.getMyMissionAccess = function getMyMissionAccess(dcOrVars, varsOrOptions, options) {
  
  const { dc: dcInstance, vars: inputVars, options: inputOpts } = validateArgsWithOptions(connectorConfig, dcOrVars, varsOrOptions, options, true, true);
  return executeQuery(getMyMissionAccessRef(dcInstance, inputVars), inputOpts && { fetchPolicy: inputOpts.fetchPolicy });
}
;

const getQuestionCourseRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'GetQuestionCourse', inputVars);
}
getQuestionCourseRef.operationName = 'GetQuestionCourse';
exports.getQuestionCourseRef = getQuestionCourseRef;

exports.getQuestionCourse = function getQuestionCourse(dcOrVars, varsOrOptions, options) {
  
  const { dc: dcInstance, vars: inputVars, options: inputOpts } = validateArgsWithOptions(connectorConfig, dcOrVars, varsOrOptions, options, true, true);
  return executeQuery(getQuestionCourseRef(dcInstance, inputVars), inputOpts && { fetchPolicy: inputOpts.fetchPolicy });
}
;

const getOptionCourseRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'GetOptionCourse', inputVars);
}
getOptionCourseRef.operationName = 'GetOptionCourse';
exports.getOptionCourseRef = getOptionCourseRef;

exports.getOptionCourse = function getOptionCourse(dcOrVars, varsOrOptions, options) {
  
  const { dc: dcInstance, vars: inputVars, options: inputOpts } = validateArgsWithOptions(connectorConfig, dcOrVars, varsOrOptions, options, true, true);
  return executeQuery(getOptionCourseRef(dcInstance, inputVars), inputOpts && { fetchPolicy: inputOpts.fetchPolicy });
}
;

const getSectionCourseRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'GetSectionCourse', inputVars);
}
getSectionCourseRef.operationName = 'GetSectionCourse';
exports.getSectionCourseRef = getSectionCourseRef;

exports.getSectionCourse = function getSectionCourse(dcOrVars, varsOrOptions, options) {
  
  const { dc: dcInstance, vars: inputVars, options: inputOpts } = validateArgsWithOptions(connectorConfig, dcOrVars, varsOrOptions, options, true, true);
  return executeQuery(getSectionCourseRef(dcInstance, inputVars), inputOpts && { fetchPolicy: inputOpts.fetchPolicy });
}
;

const getMicroLessonMissionRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'GetMicroLessonMission', inputVars);
}
getMicroLessonMissionRef.operationName = 'GetMicroLessonMission';
exports.getMicroLessonMissionRef = getMicroLessonMissionRef;

exports.getMicroLessonMission = function getMicroLessonMission(dcOrVars, varsOrOptions, options) {
  
  const { dc: dcInstance, vars: inputVars, options: inputOpts } = validateArgsWithOptions(connectorConfig, dcOrVars, varsOrOptions, options, true, true);
  return executeQuery(getMicroLessonMissionRef(dcInstance, inputVars), inputOpts && { fetchPolicy: inputOpts.fetchPolicy });
}
;

const getCriterionMissionRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'GetCriterionMission', inputVars);
}
getCriterionMissionRef.operationName = 'GetCriterionMission';
exports.getCriterionMissionRef = getCriterionMissionRef;

exports.getCriterionMission = function getCriterionMission(dcOrVars, varsOrOptions, options) {
  
  const { dc: dcInstance, vars: inputVars, options: inputOpts } = validateArgsWithOptions(connectorConfig, dcOrVars, varsOrOptions, options, true, true);
  return executeQuery(getCriterionMissionRef(dcInstance, inputVars), inputOpts && { fetchPolicy: inputOpts.fetchPolicy });
}
;

const getTemplateMissionRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'GetTemplateMission', inputVars);
}
getTemplateMissionRef.operationName = 'GetTemplateMission';
exports.getTemplateMissionRef = getTemplateMissionRef;

exports.getTemplateMission = function getTemplateMission(dcOrVars, varsOrOptions, options) {
  
  const { dc: dcInstance, vars: inputVars, options: inputOpts } = validateArgsWithOptions(connectorConfig, dcOrVars, varsOrOptions, options, true, true);
  return executeQuery(getTemplateMissionRef(dcInstance, inputVars), inputOpts && { fetchPolicy: inputOpts.fetchPolicy });
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

const getUserClaimsRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'GetUserClaims', inputVars);
}
getUserClaimsRef.operationName = 'GetUserClaims';
exports.getUserClaimsRef = getUserClaimsRef;

exports.getUserClaims = function getUserClaims(dcOrVars, varsOrOptions, options) {
  
  const { dc: dcInstance, vars: inputVars, options: inputOpts } = validateArgsWithOptions(connectorConfig, dcOrVars, varsOrOptions, options, true, true);
  return executeQuery(getUserClaimsRef(dcInstance, inputVars), inputOpts && { fetchPolicy: inputOpts.fetchPolicy });
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

const adminUpsertLectureProgressRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'AdminUpsertLectureProgress', inputVars);
}
adminUpsertLectureProgressRef.operationName = 'AdminUpsertLectureProgress';
exports.adminUpsertLectureProgressRef = adminUpsertLectureProgressRef;

exports.adminUpsertLectureProgress = function adminUpsertLectureProgress(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dcOrVars, vars, true);
  return executeMutation(adminUpsertLectureProgressRef(dcInstance, inputVars));
}
;

const getLectureDurationRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'GetLectureDuration', inputVars);
}
getLectureDurationRef.operationName = 'GetLectureDuration';
exports.getLectureDurationRef = getLectureDurationRef;

exports.getLectureDuration = function getLectureDuration(dcOrVars, varsOrOptions, options) {
  
  const { dc: dcInstance, vars: inputVars, options: inputOpts } = validateArgsWithOptions(connectorConfig, dcOrVars, varsOrOptions, options, true, true);
  return executeQuery(getLectureDurationRef(dcInstance, inputVars), inputOpts && { fetchPolicy: inputOpts.fetchPolicy });
}
;

const getCourseCompletionStatusRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'GetCourseCompletionStatus', inputVars);
}
getCourseCompletionStatusRef.operationName = 'GetCourseCompletionStatus';
exports.getCourseCompletionStatusRef = getCourseCompletionStatusRef;

exports.getCourseCompletionStatus = function getCourseCompletionStatus(dcOrVars, varsOrOptions, options) {
  
  const { dc: dcInstance, vars: inputVars, options: inputOpts } = validateArgsWithOptions(connectorConfig, dcOrVars, varsOrOptions, options, true, true);
  return executeQuery(getCourseCompletionStatusRef(dcInstance, inputVars), inputOpts && { fetchPolicy: inputOpts.fetchPolicy });
}
;

const getCourseCompletionStatusForUserRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'GetCourseCompletionStatusForUser', inputVars);
}
getCourseCompletionStatusForUserRef.operationName = 'GetCourseCompletionStatusForUser';
exports.getCourseCompletionStatusForUserRef = getCourseCompletionStatusForUserRef;

exports.getCourseCompletionStatusForUser = function getCourseCompletionStatusForUser(dcOrVars, varsOrOptions, options) {
  
  const { dc: dcInstance, vars: inputVars, options: inputOpts } = validateArgsWithOptions(connectorConfig, dcOrVars, varsOrOptions, options, true, true);
  return executeQuery(getCourseCompletionStatusForUserRef(dcInstance, inputVars), inputOpts && { fetchPolicy: inputOpts.fetchPolicy });
}
;

const getUserEnrollmentForCourseByUserRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'GetUserEnrollmentForCourseByUser', inputVars);
}
getUserEnrollmentForCourseByUserRef.operationName = 'GetUserEnrollmentForCourseByUser';
exports.getUserEnrollmentForCourseByUserRef = getUserEnrollmentForCourseByUserRef;

exports.getUserEnrollmentForCourseByUser = function getUserEnrollmentForCourseByUser(dcOrVars, varsOrOptions, options) {
  
  const { dc: dcInstance, vars: inputVars, options: inputOpts } = validateArgsWithOptions(connectorConfig, dcOrVars, varsOrOptions, options, true, true);
  return executeQuery(getUserEnrollmentForCourseByUserRef(dcInstance, inputVars), inputOpts && { fetchPolicy: inputOpts.fetchPolicy });
}
;

const updateEnrollmentStatusRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'UpdateEnrollmentStatus', inputVars);
}
updateEnrollmentStatusRef.operationName = 'UpdateEnrollmentStatus';
exports.updateEnrollmentStatusRef = updateEnrollmentStatusRef;

exports.updateEnrollmentStatus = function updateEnrollmentStatus(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dcOrVars, vars, true);
  return executeMutation(updateEnrollmentStatusRef(dcInstance, inputVars));
}
;

const getUserEnrollmentForCourseRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'GetUserEnrollmentForCourse', inputVars);
}
getUserEnrollmentForCourseRef.operationName = 'GetUserEnrollmentForCourse';
exports.getUserEnrollmentForCourseRef = getUserEnrollmentForCourseRef;

exports.getUserEnrollmentForCourse = function getUserEnrollmentForCourse(dcOrVars, varsOrOptions, options) {
  
  const { dc: dcInstance, vars: inputVars, options: inputOpts } = validateArgsWithOptions(connectorConfig, dcOrVars, varsOrOptions, options, true, true);
  return executeQuery(getUserEnrollmentForCourseRef(dcInstance, inputVars), inputOpts && { fetchPolicy: inputOpts.fetchPolicy });
}
;

const getUserEnrollmentForMissionRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'GetUserEnrollmentForMission', inputVars);
}
getUserEnrollmentForMissionRef.operationName = 'GetUserEnrollmentForMission';
exports.getUserEnrollmentForMissionRef = getUserEnrollmentForMissionRef;

exports.getUserEnrollmentForMission = function getUserEnrollmentForMission(dcOrVars, varsOrOptions, options) {
  
  const { dc: dcInstance, vars: inputVars, options: inputOpts } = validateArgsWithOptions(connectorConfig, dcOrVars, varsOrOptions, options, true, true);
  return executeQuery(getUserEnrollmentForMissionRef(dcInstance, inputVars), inputOpts && { fetchPolicy: inputOpts.fetchPolicy });
}
;

const getMissionForEnrollmentRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'GetMissionForEnrollment', inputVars);
}
getMissionForEnrollmentRef.operationName = 'GetMissionForEnrollment';
exports.getMissionForEnrollmentRef = getMissionForEnrollmentRef;

exports.getMissionForEnrollment = function getMissionForEnrollment(dcOrVars, varsOrOptions, options) {
  
  const { dc: dcInstance, vars: inputVars, options: inputOpts } = validateArgsWithOptions(connectorConfig, dcOrVars, varsOrOptions, options, true, true);
  return executeQuery(getMissionForEnrollmentRef(dcInstance, inputVars), inputOpts && { fetchPolicy: inputOpts.fetchPolicy });
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

const getSubmissionForGradingRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'GetSubmissionForGrading', inputVars);
}
getSubmissionForGradingRef.operationName = 'GetSubmissionForGrading';
exports.getSubmissionForGradingRef = getSubmissionForGradingRef;

exports.getSubmissionForGrading = function getSubmissionForGrading(dcOrVars, varsOrOptions, options) {
  
  const { dc: dcInstance, vars: inputVars, options: inputOpts } = validateArgsWithOptions(connectorConfig, dcOrVars, varsOrOptions, options, true, true);
  return executeQuery(getSubmissionForGradingRef(dcInstance, inputVars), inputOpts && { fetchPolicy: inputOpts.fetchPolicy });
}
;

const getEnrollmentForUserMissionRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'GetEnrollmentForUserMission', inputVars);
}
getEnrollmentForUserMissionRef.operationName = 'GetEnrollmentForUserMission';
exports.getEnrollmentForUserMissionRef = getEnrollmentForUserMissionRef;

exports.getEnrollmentForUserMission = function getEnrollmentForUserMission(dcOrVars, varsOrOptions, options) {
  
  const { dc: dcInstance, vars: inputVars, options: inputOpts } = validateArgsWithOptions(connectorConfig, dcOrVars, varsOrOptions, options, true, true);
  return executeQuery(getEnrollmentForUserMissionRef(dcInstance, inputVars), inputOpts && { fetchPolicy: inputOpts.fetchPolicy });
}
;

const adminCreateMissionRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'AdminCreateMission', inputVars);
}
adminCreateMissionRef.operationName = 'AdminCreateMission';
exports.adminCreateMissionRef = adminCreateMissionRef;

exports.adminCreateMission = function adminCreateMission(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dcOrVars, vars, true);
  return executeMutation(adminCreateMissionRef(dcInstance, inputVars));
}
;

const adminUpdateMissionRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'AdminUpdateMission', inputVars);
}
adminUpdateMissionRef.operationName = 'AdminUpdateMission';
exports.adminUpdateMissionRef = adminUpdateMissionRef;

exports.adminUpdateMission = function adminUpdateMission(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dcOrVars, vars, true);
  return executeMutation(adminUpdateMissionRef(dcInstance, inputVars));
}
;

const adminSoftDeleteMissionRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'AdminSoftDeleteMission', inputVars);
}
adminSoftDeleteMissionRef.operationName = 'AdminSoftDeleteMission';
exports.adminSoftDeleteMissionRef = adminSoftDeleteMissionRef;

exports.adminSoftDeleteMission = function adminSoftDeleteMission(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dcOrVars, vars, true);
  return executeMutation(adminSoftDeleteMissionRef(dcInstance, inputVars));
}
;

const adminGetMissionRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'AdminGetMission', inputVars);
}
adminGetMissionRef.operationName = 'AdminGetMission';
exports.adminGetMissionRef = adminGetMissionRef;

exports.adminGetMission = function adminGetMission(dcOrVars, varsOrOptions, options) {
  
  const { dc: dcInstance, vars: inputVars, options: inputOpts } = validateArgsWithOptions(connectorConfig, dcOrVars, varsOrOptions, options, true, true);
  return executeQuery(adminGetMissionRef(dcInstance, inputVars), inputOpts && { fetchPolicy: inputOpts.fetchPolicy });
}
;

const adminListMyMissionsRef = (dc) => {
  const { dc: dcInstance} = validateArgs(connectorConfig, dc, undefined);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'AdminListMyMissions');
}
adminListMyMissionsRef.operationName = 'AdminListMyMissions';
exports.adminListMyMissionsRef = adminListMyMissionsRef;

exports.adminListMyMissions = function adminListMyMissions(dcOrOptions, options) {
  
  const { dc: dcInstance, vars: inputVars, options: inputOpts } = validateArgsWithOptions(connectorConfig, dcOrOptions, options, undefined,false, false);
  return executeQuery(adminListMyMissionsRef(dcInstance, inputVars), inputOpts && { fetchPolicy: inputOpts.fetchPolicy });
}
;

const adminCreateMicroLessonRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'AdminCreateMicroLesson', inputVars);
}
adminCreateMicroLessonRef.operationName = 'AdminCreateMicroLesson';
exports.adminCreateMicroLessonRef = adminCreateMicroLessonRef;

exports.adminCreateMicroLesson = function adminCreateMicroLesson(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dcOrVars, vars, true);
  return executeMutation(adminCreateMicroLessonRef(dcInstance, inputVars));
}
;

const adminUpdateMicroLessonRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'AdminUpdateMicroLesson', inputVars);
}
adminUpdateMicroLessonRef.operationName = 'AdminUpdateMicroLesson';
exports.adminUpdateMicroLessonRef = adminUpdateMicroLessonRef;

exports.adminUpdateMicroLesson = function adminUpdateMicroLesson(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dcOrVars, vars, true);
  return executeMutation(adminUpdateMicroLessonRef(dcInstance, inputVars));
}
;

const adminDeleteMicroLessonRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'AdminDeleteMicroLesson', inputVars);
}
adminDeleteMicroLessonRef.operationName = 'AdminDeleteMicroLesson';
exports.adminDeleteMicroLessonRef = adminDeleteMicroLessonRef;

exports.adminDeleteMicroLesson = function adminDeleteMicroLesson(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dcOrVars, vars, true);
  return executeMutation(adminDeleteMicroLessonRef(dcInstance, inputVars));
}
;

const adminUpdateMicroLessonOrderRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'AdminUpdateMicroLessonOrder', inputVars);
}
adminUpdateMicroLessonOrderRef.operationName = 'AdminUpdateMicroLessonOrder';
exports.adminUpdateMicroLessonOrderRef = adminUpdateMicroLessonOrderRef;

exports.adminUpdateMicroLessonOrder = function adminUpdateMicroLessonOrder(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dcOrVars, vars, true);
  return executeMutation(adminUpdateMicroLessonOrderRef(dcInstance, inputVars));
}
;

const adminCreateMissionTemplateRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'AdminCreateMissionTemplate', inputVars);
}
adminCreateMissionTemplateRef.operationName = 'AdminCreateMissionTemplate';
exports.adminCreateMissionTemplateRef = adminCreateMissionTemplateRef;

exports.adminCreateMissionTemplate = function adminCreateMissionTemplate(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dcOrVars, vars, true);
  return executeMutation(adminCreateMissionTemplateRef(dcInstance, inputVars));
}
;

const adminDeleteMissionTemplateRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'AdminDeleteMissionTemplate', inputVars);
}
adminDeleteMissionTemplateRef.operationName = 'AdminDeleteMissionTemplate';
exports.adminDeleteMissionTemplateRef = adminDeleteMissionTemplateRef;

exports.adminDeleteMissionTemplate = function adminDeleteMissionTemplate(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dcOrVars, vars, true);
  return executeMutation(adminDeleteMissionTemplateRef(dcInstance, inputVars));
}
;

const getMissionTemplatesRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'GetMissionTemplates', inputVars);
}
getMissionTemplatesRef.operationName = 'GetMissionTemplates';
exports.getMissionTemplatesRef = getMissionTemplatesRef;

exports.getMissionTemplates = function getMissionTemplates(dcOrVars, varsOrOptions, options) {
  
  const { dc: dcInstance, vars: inputVars, options: inputOpts } = validateArgsWithOptions(connectorConfig, dcOrVars, varsOrOptions, options, true, true);
  return executeQuery(getMissionTemplatesRef(dcInstance, inputVars), inputOpts && { fetchPolicy: inputOpts.fetchPolicy });
}
;

const adminCreateRubricCriterionRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'AdminCreateRubricCriterion', inputVars);
}
adminCreateRubricCriterionRef.operationName = 'AdminCreateRubricCriterion';
exports.adminCreateRubricCriterionRef = adminCreateRubricCriterionRef;

exports.adminCreateRubricCriterion = function adminCreateRubricCriterion(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dcOrVars, vars, true);
  return executeMutation(adminCreateRubricCriterionRef(dcInstance, inputVars));
}
;

const adminUpdateRubricCriterionRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'AdminUpdateRubricCriterion', inputVars);
}
adminUpdateRubricCriterionRef.operationName = 'AdminUpdateRubricCriterion';
exports.adminUpdateRubricCriterionRef = adminUpdateRubricCriterionRef;

exports.adminUpdateRubricCriterion = function adminUpdateRubricCriterion(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dcOrVars, vars, true);
  return executeMutation(adminUpdateRubricCriterionRef(dcInstance, inputVars));
}
;

const adminDeleteRubricCriterionRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'AdminDeleteRubricCriterion', inputVars);
}
adminDeleteRubricCriterionRef.operationName = 'AdminDeleteRubricCriterion';
exports.adminDeleteRubricCriterionRef = adminDeleteRubricCriterionRef;

exports.adminDeleteRubricCriterion = function adminDeleteRubricCriterion(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dcOrVars, vars, true);
  return executeMutation(adminDeleteRubricCriterionRef(dcInstance, inputVars));
}
;

const adminUpdateRubricCriterionOrderRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'AdminUpdateRubricCriterionOrder', inputVars);
}
adminUpdateRubricCriterionOrderRef.operationName = 'AdminUpdateRubricCriterionOrder';
exports.adminUpdateRubricCriterionOrderRef = adminUpdateRubricCriterionOrderRef;

exports.adminUpdateRubricCriterionOrder = function adminUpdateRubricCriterionOrder(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dcOrVars, vars, true);
  return executeMutation(adminUpdateRubricCriterionOrderRef(dcInstance, inputVars));
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

const finishQuizAttemptIfOpenRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'FinishQuizAttemptIfOpen', inputVars);
}
finishQuizAttemptIfOpenRef.operationName = 'FinishQuizAttemptIfOpen';
exports.finishQuizAttemptIfOpenRef = finishQuizAttemptIfOpenRef;

exports.finishQuizAttemptIfOpen = function finishQuizAttemptIfOpen(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dcOrVars, vars, true);
  return executeMutation(finishQuizAttemptIfOpenRef(dcInstance, inputVars));
}
;

const getExpiredAttemptsRef = (dc) => {
  const { dc: dcInstance} = validateArgs(connectorConfig, dc, undefined);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'GetExpiredAttempts');
}
getExpiredAttemptsRef.operationName = 'GetExpiredAttempts';
exports.getExpiredAttemptsRef = getExpiredAttemptsRef;

exports.getExpiredAttempts = function getExpiredAttempts(dcOrOptions, options) {
  
  const { dc: dcInstance, vars: inputVars, options: inputOpts } = validateArgsWithOptions(connectorConfig, dcOrOptions, options, undefined,false, false);
  return executeQuery(getExpiredAttemptsRef(dcInstance, inputVars), inputOpts && { fetchPolicy: inputOpts.fetchPolicy });
}
;

const getUserQuizAttemptsRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'GetUserQuizAttempts', inputVars);
}
getUserQuizAttemptsRef.operationName = 'GetUserQuizAttempts';
exports.getUserQuizAttemptsRef = getUserQuizAttemptsRef;

exports.getUserQuizAttempts = function getUserQuizAttempts(dcOrVars, varsOrOptions, options) {
  
  const { dc: dcInstance, vars: inputVars, options: inputOpts } = validateArgsWithOptions(connectorConfig, dcOrVars, varsOrOptions, options, true, true);
  return executeQuery(getUserQuizAttemptsRef(dcInstance, inputVars), inputOpts && { fetchPolicy: inputOpts.fetchPolicy });
}
;

const getQuizAttemptByIdRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'GetQuizAttemptById', inputVars);
}
getQuizAttemptByIdRef.operationName = 'GetQuizAttemptById';
exports.getQuizAttemptByIdRef = getQuizAttemptByIdRef;

exports.getQuizAttemptById = function getQuizAttemptById(dcOrVars, varsOrOptions, options) {
  
  const { dc: dcInstance, vars: inputVars, options: inputOpts } = validateArgsWithOptions(connectorConfig, dcOrVars, varsOrOptions, options, true, true);
  return executeQuery(getQuizAttemptByIdRef(dcInstance, inputVars), inputOpts && { fetchPolicy: inputOpts.fetchPolicy });
}
;

const getQuizQuestionPointsRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'GetQuizQuestionPoints', inputVars);
}
getQuizQuestionPointsRef.operationName = 'GetQuizQuestionPoints';
exports.getQuizQuestionPointsRef = getQuizQuestionPointsRef;

exports.getQuizQuestionPoints = function getQuizQuestionPoints(dcOrVars, varsOrOptions, options) {
  
  const { dc: dcInstance, vars: inputVars, options: inputOpts } = validateArgsWithOptions(connectorConfig, dcOrVars, varsOrOptions, options, true, true);
  return executeQuery(getQuizQuestionPointsRef(dcInstance, inputVars), inputOpts && { fetchPolicy: inputOpts.fetchPolicy });
}
;

const getAttemptAnswersWithCorrectRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'GetAttemptAnswersWithCorrect', inputVars);
}
getAttemptAnswersWithCorrectRef.operationName = 'GetAttemptAnswersWithCorrect';
exports.getAttemptAnswersWithCorrectRef = getAttemptAnswersWithCorrectRef;

exports.getAttemptAnswersWithCorrect = function getAttemptAnswersWithCorrect(dcOrVars, varsOrOptions, options) {
  
  const { dc: dcInstance, vars: inputVars, options: inputOpts } = validateArgsWithOptions(connectorConfig, dcOrVars, varsOrOptions, options, true, true);
  return executeQuery(getAttemptAnswersWithCorrectRef(dcInstance, inputVars), inputOpts && { fetchPolicy: inputOpts.fetchPolicy });
}
;

const getQuizSettingsRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'GetQuizSettings', inputVars);
}
getQuizSettingsRef.operationName = 'GetQuizSettings';
exports.getQuizSettingsRef = getQuizSettingsRef;

exports.getQuizSettings = function getQuizSettings(dcOrVars, varsOrOptions, options) {
  
  const { dc: dcInstance, vars: inputVars, options: inputOpts } = validateArgsWithOptions(connectorConfig, dcOrVars, varsOrOptions, options, true, true);
  return executeQuery(getQuizSettingsRef(dcInstance, inputVars), inputOpts && { fetchPolicy: inputOpts.fetchPolicy });
}
;

const getQuestionOptionsRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'GetQuestionOptions', inputVars);
}
getQuestionOptionsRef.operationName = 'GetQuestionOptions';
exports.getQuestionOptionsRef = getQuestionOptionsRef;

exports.getQuestionOptions = function getQuestionOptions(dcOrVars, varsOrOptions, options) {
  
  const { dc: dcInstance, vars: inputVars, options: inputOpts } = validateArgsWithOptions(connectorConfig, dcOrVars, varsOrOptions, options, true, true);
  return executeQuery(getQuestionOptionsRef(dcInstance, inputVars), inputOpts && { fetchPolicy: inputOpts.fetchPolicy });
}
;

const getOptionWithQuestionRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'GetOptionWithQuestion', inputVars);
}
getOptionWithQuestionRef.operationName = 'GetOptionWithQuestion';
exports.getOptionWithQuestionRef = getOptionWithQuestionRef;

exports.getOptionWithQuestion = function getOptionWithQuestion(dcOrVars, varsOrOptions, options) {
  
  const { dc: dcInstance, vars: inputVars, options: inputOpts } = validateArgsWithOptions(connectorConfig, dcOrVars, varsOrOptions, options, true, true);
  return executeQuery(getOptionWithQuestionRef(dcInstance, inputVars), inputOpts && { fetchPolicy: inputOpts.fetchPolicy });
}
;

const getActiveQuizSessionRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'GetActiveQuizSession', inputVars);
}
getActiveQuizSessionRef.operationName = 'GetActiveQuizSession';
exports.getActiveQuizSessionRef = getActiveQuizSessionRef;

exports.getActiveQuizSession = function getActiveQuizSession(dcOrVars, varsOrOptions, options) {
  
  const { dc: dcInstance, vars: inputVars, options: inputOpts } = validateArgsWithOptions(connectorConfig, dcOrVars, varsOrOptions, options, true, true);
  return executeQuery(getActiveQuizSessionRef(dcInstance, inputVars), inputOpts && { fetchPolicy: inputOpts.fetchPolicy });
}
;

const adminGetQuizRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'AdminGetQuiz', inputVars);
}
adminGetQuizRef.operationName = 'AdminGetQuiz';
exports.adminGetQuizRef = adminGetQuizRef;

exports.adminGetQuiz = function adminGetQuiz(dcOrVars, varsOrOptions, options) {
  
  const { dc: dcInstance, vars: inputVars, options: inputOpts } = validateArgsWithOptions(connectorConfig, dcOrVars, varsOrOptions, options, true, true);
  return executeQuery(adminGetQuizRef(dcInstance, inputVars), inputOpts && { fetchPolicy: inputOpts.fetchPolicy });
}
;

const adminCreateQuizRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'AdminCreateQuiz', inputVars);
}
adminCreateQuizRef.operationName = 'AdminCreateQuiz';
exports.adminCreateQuizRef = adminCreateQuizRef;

exports.adminCreateQuiz = function adminCreateQuiz(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dcOrVars, vars, true);
  return executeMutation(adminCreateQuizRef(dcInstance, inputVars));
}
;

const adminUpdateQuizRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'AdminUpdateQuiz', inputVars);
}
adminUpdateQuizRef.operationName = 'AdminUpdateQuiz';
exports.adminUpdateQuizRef = adminUpdateQuizRef;

exports.adminUpdateQuiz = function adminUpdateQuiz(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dcOrVars, vars, true);
  return executeMutation(adminUpdateQuizRef(dcInstance, inputVars));
}
;

const adminDeleteQuizRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'AdminDeleteQuiz', inputVars);
}
adminDeleteQuizRef.operationName = 'AdminDeleteQuiz';
exports.adminDeleteQuizRef = adminDeleteQuizRef;

exports.adminDeleteQuiz = function adminDeleteQuiz(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dcOrVars, vars, true);
  return executeMutation(adminDeleteQuizRef(dcInstance, inputVars));
}
;

const adminCreateQuizQuestionRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'AdminCreateQuizQuestion', inputVars);
}
adminCreateQuizQuestionRef.operationName = 'AdminCreateQuizQuestion';
exports.adminCreateQuizQuestionRef = adminCreateQuizQuestionRef;

exports.adminCreateQuizQuestion = function adminCreateQuizQuestion(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dcOrVars, vars, true);
  return executeMutation(adminCreateQuizQuestionRef(dcInstance, inputVars));
}
;

const adminUpdateQuizQuestionRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'AdminUpdateQuizQuestion', inputVars);
}
adminUpdateQuizQuestionRef.operationName = 'AdminUpdateQuizQuestion';
exports.adminUpdateQuizQuestionRef = adminUpdateQuizQuestionRef;

exports.adminUpdateQuizQuestion = function adminUpdateQuizQuestion(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dcOrVars, vars, true);
  return executeMutation(adminUpdateQuizQuestionRef(dcInstance, inputVars));
}
;

const adminSoftDeleteQuizQuestionRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'AdminSoftDeleteQuizQuestion', inputVars);
}
adminSoftDeleteQuizQuestionRef.operationName = 'AdminSoftDeleteQuizQuestion';
exports.adminSoftDeleteQuizQuestionRef = adminSoftDeleteQuizQuestionRef;

exports.adminSoftDeleteQuizQuestion = function adminSoftDeleteQuizQuestion(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dcOrVars, vars, true);
  return executeMutation(adminSoftDeleteQuizQuestionRef(dcInstance, inputVars));
}
;

const adminUpdateQuizQuestionOrderRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'AdminUpdateQuizQuestionOrder', inputVars);
}
adminUpdateQuizQuestionOrderRef.operationName = 'AdminUpdateQuizQuestionOrder';
exports.adminUpdateQuizQuestionOrderRef = adminUpdateQuizQuestionOrderRef;

exports.adminUpdateQuizQuestionOrder = function adminUpdateQuizQuestionOrder(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dcOrVars, vars, true);
  return executeMutation(adminUpdateQuizQuestionOrderRef(dcInstance, inputVars));
}
;

const adminCreateQuizOptionRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'AdminCreateQuizOption', inputVars);
}
adminCreateQuizOptionRef.operationName = 'AdminCreateQuizOption';
exports.adminCreateQuizOptionRef = adminCreateQuizOptionRef;

exports.adminCreateQuizOption = function adminCreateQuizOption(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dcOrVars, vars, true);
  return executeMutation(adminCreateQuizOptionRef(dcInstance, inputVars));
}
;

const adminUpdateQuizOptionRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'AdminUpdateQuizOption', inputVars);
}
adminUpdateQuizOptionRef.operationName = 'AdminUpdateQuizOption';
exports.adminUpdateQuizOptionRef = adminUpdateQuizOptionRef;

exports.adminUpdateQuizOption = function adminUpdateQuizOption(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dcOrVars, vars, true);
  return executeMutation(adminUpdateQuizOptionRef(dcInstance, inputVars));
}
;

const adminDeleteQuizOptionRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'AdminDeleteQuizOption', inputVars);
}
adminDeleteQuizOptionRef.operationName = 'AdminDeleteQuizOption';
exports.adminDeleteQuizOptionRef = adminDeleteQuizOptionRef;

exports.adminDeleteQuizOption = function adminDeleteQuizOption(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dcOrVars, vars, true);
  return executeMutation(adminDeleteQuizOptionRef(dcInstance, inputVars));
}
;

const adminUpdateQuizOptionOrderRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'AdminUpdateQuizOptionOrder', inputVars);
}
adminUpdateQuizOptionOrderRef.operationName = 'AdminUpdateQuizOptionOrder';
exports.adminUpdateQuizOptionOrderRef = adminUpdateQuizOptionOrderRef;

exports.adminUpdateQuizOptionOrder = function adminUpdateQuizOptionOrder(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dcOrVars, vars, true);
  return executeMutation(adminUpdateQuizOptionOrderRef(dcInstance, inputVars));
}
;
