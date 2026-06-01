const { validateAdminArgs } = require('firebase-admin/data-connect');

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

const PaymentGateway = {
  FAWRY: "FAWRY",
  PAYMOB: "PAYMOB",
  INSTAPAY: "INSTAPAY",
}
exports.PaymentGateway = PaymentGateway;

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

const connectorConfig = {
  connector: 'default',
  serviceId: 'learning-management-syst-3cc3a-service',
  location: 'europe-west8'
};
exports.connectorConfig = connectorConfig;

function myCertificates(dcOrOptions, options) {
  const { dc: dcInstance, options: inputOpts} = validateAdminArgs(connectorConfig, dcOrOptions, options, undefined);
  dcInstance.useGen(true);
  return dcInstance.executeQuery('MyCertificates', undefined, inputOpts);
}
exports.myCertificates = myCertificates;

function verifyCertificate(dcOrVarsOrOptions, varsOrOptions, options) {
  const { dc: dcInstance, vars: inputVars, options: inputOpts} = validateAdminArgs(connectorConfig, dcOrVarsOrOptions, varsOrOptions, options, true, true);
  dcInstance.useGen(true);
  return dcInstance.executeQuery('VerifyCertificate', inputVars, inputOpts);
}
exports.verifyCertificate = verifyCertificate;

function logPayment(dcOrVarsOrOptions, varsOrOptions, options) {
  const { dc: dcInstance, vars: inputVars, options: inputOpts} = validateAdminArgs(connectorConfig, dcOrVarsOrOptions, varsOrOptions, options, true, true);
  dcInstance.useGen(true);
  return dcInstance.executeMutation('LogPayment', inputVars, inputOpts);
}
exports.logPayment = logPayment;

function addPaymentItem(dcOrVarsOrOptions, varsOrOptions, options) {
  const { dc: dcInstance, vars: inputVars, options: inputOpts} = validateAdminArgs(connectorConfig, dcOrVarsOrOptions, varsOrOptions, options, true, true);
  dcInstance.useGen(true);
  return dcInstance.executeMutation('AddPaymentItem', inputVars, inputOpts);
}
exports.addPaymentItem = addPaymentItem;

function myPaymentHistory(dcOrOptions, options) {
  const { dc: dcInstance, options: inputOpts} = validateAdminArgs(connectorConfig, dcOrOptions, options, undefined);
  dcInstance.useGen(true);
  return dcInstance.executeQuery('MyPaymentHistory', undefined, inputOpts);
}
exports.myPaymentHistory = myPaymentHistory;

function getPendingSubmissions(dcOrOptions, options) {
  const { dc: dcInstance, options: inputOpts} = validateAdminArgs(connectorConfig, dcOrOptions, options, undefined);
  dcInstance.useGen(true);
  return dcInstance.executeQuery('GetPendingSubmissions', undefined, inputOpts);
}
exports.getPendingSubmissions = getPendingSubmissions;

function getQuizQuestions(dcOrVarsOrOptions, varsOrOptions, options) {
  const { dc: dcInstance, vars: inputVars, options: inputOpts} = validateAdminArgs(connectorConfig, dcOrVarsOrOptions, varsOrOptions, options, true, true);
  dcInstance.useGen(true);
  return dcInstance.executeQuery('GetQuizQuestions', inputVars, inputOpts);
}
exports.getQuizQuestions = getQuizQuestions;

function startQuizAttempt(dcOrVarsOrOptions, varsOrOptions, options) {
  const { dc: dcInstance, vars: inputVars, options: inputOpts} = validateAdminArgs(connectorConfig, dcOrVarsOrOptions, varsOrOptions, options, true, true);
  dcInstance.useGen(true);
  return dcInstance.executeMutation('StartQuizAttempt', inputVars, inputOpts);
}
exports.startQuizAttempt = startQuizAttempt;

function submitQuizAnswer(dcOrVarsOrOptions, varsOrOptions, options) {
  const { dc: dcInstance, vars: inputVars, options: inputOpts} = validateAdminArgs(connectorConfig, dcOrVarsOrOptions, varsOrOptions, options, true, true);
  dcInstance.useGen(true);
  return dcInstance.executeMutation('SubmitQuizAnswer', inputVars, inputOpts);
}
exports.submitQuizAnswer = submitQuizAnswer;

function finishQuizAttempt(dcOrVarsOrOptions, varsOrOptions, options) {
  const { dc: dcInstance, vars: inputVars, options: inputOpts} = validateAdminArgs(connectorConfig, dcOrVarsOrOptions, varsOrOptions, options, true, true);
  dcInstance.useGen(true);
  return dcInstance.executeMutation('FinishQuizAttempt', inputVars, inputOpts);
}
exports.finishQuizAttempt = finishQuizAttempt;

function getCourseSessions(dcOrVarsOrOptions, varsOrOptions, options) {
  const { dc: dcInstance, vars: inputVars, options: inputOpts} = validateAdminArgs(connectorConfig, dcOrVarsOrOptions, varsOrOptions, options, true, true);
  dcInstance.useGen(true);
  return dcInstance.executeQuery('GetCourseSessions', inputVars, inputOpts);
}
exports.getCourseSessions = getCourseSessions;

function checkInToSession(dcOrVarsOrOptions, varsOrOptions, options) {
  const { dc: dcInstance, vars: inputVars, options: inputOpts} = validateAdminArgs(connectorConfig, dcOrVarsOrOptions, varsOrOptions, options, true, true);
  dcInstance.useGen(true);
  return dcInstance.executeMutation('CheckInToSession', inputVars, inputOpts);
}
exports.checkInToSession = checkInToSession;

function listPublishedCourses(dcOrOptions, options) {
  const { dc: dcInstance, options: inputOpts} = validateAdminArgs(connectorConfig, dcOrOptions, options, undefined);
  dcInstance.useGen(true);
  return dcInstance.executeQuery('ListPublishedCourses', undefined, inputOpts);
}
exports.listPublishedCourses = listPublishedCourses;

function getCourseCurriculum(dcOrVarsOrOptions, varsOrOptions, options) {
  const { dc: dcInstance, vars: inputVars, options: inputOpts} = validateAdminArgs(connectorConfig, dcOrVarsOrOptions, varsOrOptions, options, true, true);
  dcInstance.useGen(true);
  return dcInstance.executeQuery('GetCourseCurriculum', inputVars, inputOpts);
}
exports.getCourseCurriculum = getCourseCurriculum;

function enrollInCourse(dcOrVarsOrOptions, varsOrOptions, options) {
  const { dc: dcInstance, vars: inputVars, options: inputOpts} = validateAdminArgs(connectorConfig, dcOrVarsOrOptions, varsOrOptions, options, true, true);
  dcInstance.useGen(true);
  return dcInstance.executeMutation('EnrollInCourse', inputVars, inputOpts);
}
exports.enrollInCourse = enrollInCourse;

function enrollInMission(dcOrVarsOrOptions, varsOrOptions, options) {
  const { dc: dcInstance, vars: inputVars, options: inputOpts} = validateAdminArgs(connectorConfig, dcOrVarsOrOptions, varsOrOptions, options, true, true);
  dcInstance.useGen(true);
  return dcInstance.executeMutation('EnrollInMission', inputVars, inputOpts);
}
exports.enrollInMission = enrollInMission;

function updateLectureProgress(dcOrVarsOrOptions, varsOrOptions, options) {
  const { dc: dcInstance, vars: inputVars, options: inputOpts} = validateAdminArgs(connectorConfig, dcOrVarsOrOptions, varsOrOptions, options, true, true);
  dcInstance.useGen(true);
  return dcInstance.executeMutation('UpdateLectureProgress', inputVars, inputOpts);
}
exports.updateLectureProgress = updateLectureProgress;

function submitMission(dcOrVarsOrOptions, varsOrOptions, options) {
  const { dc: dcInstance, vars: inputVars, options: inputOpts} = validateAdminArgs(connectorConfig, dcOrVarsOrOptions, varsOrOptions, options, true, true);
  dcInstance.useGen(true);
  return dcInstance.executeMutation('SubmitMission', inputVars, inputOpts);
}
exports.submitMission = submitMission;

function mySubmissions(dcOrOptions, options) {
  const { dc: dcInstance, options: inputOpts} = validateAdminArgs(connectorConfig, dcOrOptions, options, undefined);
  dcInstance.useGen(true);
  return dcInstance.executeQuery('MySubmissions', undefined, inputOpts);
}
exports.mySubmissions = mySubmissions;

function gradeSubmission(dcOrVarsOrOptions, varsOrOptions, options) {
  const { dc: dcInstance, vars: inputVars, options: inputOpts} = validateAdminArgs(connectorConfig, dcOrVarsOrOptions, varsOrOptions, options, true, true);
  dcInstance.useGen(true);
  return dcInstance.executeMutation('GradeSubmission', inputVars, inputOpts);
}
exports.gradeSubmission = gradeSubmission;

function syncUser(dcOrVarsOrOptions, varsOrOptions, options) {
  const { dc: dcInstance, vars: inputVars, options: inputOpts} = validateAdminArgs(connectorConfig, dcOrVarsOrOptions, varsOrOptions, options, true, true);
  dcInstance.useGen(true);
  return dcInstance.executeMutation('SyncUser', inputVars, inputOpts);
}
exports.syncUser = syncUser;

function getMe(dcOrOptions, options) {
  const { dc: dcInstance, options: inputOpts} = validateAdminArgs(connectorConfig, dcOrOptions, options, undefined);
  dcInstance.useGen(true);
  return dcInstance.executeQuery('GetMe', undefined, inputOpts);
}
exports.getMe = getMe;

function updateMyProfile(dcOrVarsOrOptions, varsOrOptions, options) {
  const { dc: dcInstance, vars: inputVars, options: inputOpts} = validateAdminArgs(connectorConfig, dcOrVarsOrOptions, varsOrOptions, options, true, false);
  dcInstance.useGen(true);
  return dcInstance.executeMutation('UpdateMyProfile', inputVars, inputOpts);
}
exports.updateMyProfile = updateMyProfile;

