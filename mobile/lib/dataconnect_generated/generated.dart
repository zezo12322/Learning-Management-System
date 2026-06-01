library dataconnect_generated;
import 'package:firebase_data_connect/firebase_data_connect.dart';
import 'package:flutter/foundation.dart';
import 'dart:convert';
import 'package:flutter/foundation.dart';

part 'my_certificates.dart';

part 'verify_certificate.dart';

part 'get_pending_submissions.dart';

part 'enroll_in_course.dart';

part 'enroll_in_mission.dart';

part 'update_lecture_progress.dart';

part 'get_quiz_questions.dart';

part 'start_quiz_attempt.dart';

part 'submit_quiz_answer.dart';

part 'finish_quiz_attempt.dart';

part 'get_course_sessions.dart';

part 'check_in_to_session.dart';

part 'list_published_courses.dart';

part 'get_course_curriculum.dart';

part 'log_payment.dart';

part 'add_payment_item.dart';

part 'my_payment_history.dart';

part 'submit_mission.dart';

part 'my_submissions.dart';

part 'grade_submission.dart';

part 'sync_user.dart';

part 'get_me.dart';

part 'update_my_profile.dart';



  enum AttendanceMethod {
    
      QR,
    
      MANUAL,
    
  }
  
  String attendanceMethodSerializer(EnumValue<AttendanceMethod> e) {
    return e.stringValue;
  }
  EnumValue<AttendanceMethod> attendanceMethodDeserializer(dynamic data) {
    switch (data) {
      
      case 'QR':
        return const Known(AttendanceMethod.QR);
      
      case 'MANUAL':
        return const Known(AttendanceMethod.MANUAL);
      
      default:
        return Unknown(data);
    }
  }
  

  enum AttendanceStatus {
    
      PRESENT,
    
      LATE,
    
      EXCUSED,
    
      UNEXCUSED,
    
  }
  
  String attendanceStatusSerializer(EnumValue<AttendanceStatus> e) {
    return e.stringValue;
  }
  EnumValue<AttendanceStatus> attendanceStatusDeserializer(dynamic data) {
    switch (data) {
      
      case 'PRESENT':
        return const Known(AttendanceStatus.PRESENT);
      
      case 'LATE':
        return const Known(AttendanceStatus.LATE);
      
      case 'EXCUSED':
        return const Known(AttendanceStatus.EXCUSED);
      
      case 'UNEXCUSED':
        return const Known(AttendanceStatus.UNEXCUSED);
      
      default:
        return Unknown(data);
    }
  }
  

  enum LectureType {
    
      VIDEO,
    
      READING,
    
      INTERACTIVE,
    
      QUIZ,
    
  }
  
  String lectureTypeSerializer(EnumValue<LectureType> e) {
    return e.stringValue;
  }
  EnumValue<LectureType> lectureTypeDeserializer(dynamic data) {
    switch (data) {
      
      case 'VIDEO':
        return const Known(LectureType.VIDEO);
      
      case 'READING':
        return const Known(LectureType.READING);
      
      case 'INTERACTIVE':
        return const Known(LectureType.INTERACTIVE);
      
      case 'QUIZ':
        return const Known(LectureType.QUIZ);
      
      default:
        return Unknown(data);
    }
  }
  

  enum PaymentGateway {
    
      FAWRY,
    
      PAYMOB,
    
      INSTAPAY,
    
  }
  
  String paymentGatewaySerializer(EnumValue<PaymentGateway> e) {
    return e.stringValue;
  }
  EnumValue<PaymentGateway> paymentGatewayDeserializer(dynamic data) {
    switch (data) {
      
      case 'FAWRY':
        return const Known(PaymentGateway.FAWRY);
      
      case 'PAYMOB':
        return const Known(PaymentGateway.PAYMOB);
      
      case 'INSTAPAY':
        return const Known(PaymentGateway.INSTAPAY);
      
      default:
        return Unknown(data);
    }
  }
  

  enum PaymentStatus {
    
      PENDING,
    
      COMPLETED,
    
      FAILED,
    
      REFUNDED,
    
  }
  
  String paymentStatusSerializer(EnumValue<PaymentStatus> e) {
    return e.stringValue;
  }
  EnumValue<PaymentStatus> paymentStatusDeserializer(dynamic data) {
    switch (data) {
      
      case 'PENDING':
        return const Known(PaymentStatus.PENDING);
      
      case 'COMPLETED':
        return const Known(PaymentStatus.COMPLETED);
      
      case 'FAILED':
        return const Known(PaymentStatus.FAILED);
      
      case 'REFUNDED':
        return const Known(PaymentStatus.REFUNDED);
      
      default:
        return Unknown(data);
    }
  }
  

  enum SessionType {
    
      ONLINE,
    
      OFFLINE,
    
  }
  
  String sessionTypeSerializer(EnumValue<SessionType> e) {
    return e.stringValue;
  }
  EnumValue<SessionType> sessionTypeDeserializer(dynamic data) {
    switch (data) {
      
      case 'ONLINE':
        return const Known(SessionType.ONLINE);
      
      case 'OFFLINE':
        return const Known(SessionType.OFFLINE);
      
      default:
        return Unknown(data);
    }
  }
  



String enumSerializer(Enum e) {
  return e.name;
}



/// A sealed class representing either a known enum value or an unknown string value.
@immutable
sealed class EnumValue<T extends Enum> {
  const EnumValue();

  

  /// The string representation of the value.
  String get stringValue;
  @override
  String toString() {
    return "EnumValue($stringValue)";
  }
}

/// Represents a known, valid enum value.
class Known<T extends Enum> extends EnumValue<T> {
  /// The actual enum value.
  final T value;

  const Known(this.value);

  @override
  String get stringValue => value.name;

  @override
  String toString() {
    return "Known($stringValue)";
  }
}
/// Represents an unknown or unrecognized enum value.
class Unknown extends EnumValue<Never> {
  /// The raw string value that couldn't be mapped to a known enum.
  @override
  final String stringValue;

  const Unknown(this.stringValue);
  @override
  String toString() {
    return "Unknown($stringValue)";
  }
}

class DefaultConnector {
  
  
  MyCertificatesVariablesBuilder myCertificates () {
    return MyCertificatesVariablesBuilder(dataConnect, );
  }
  
  
  VerifyCertificateVariablesBuilder verifyCertificate ({required String hash, }) {
    return VerifyCertificateVariablesBuilder(dataConnect, hash: hash,);
  }
  
  
  GetPendingSubmissionsVariablesBuilder getPendingSubmissions () {
    return GetPendingSubmissionsVariablesBuilder(dataConnect, );
  }
  
  
  EnrollInCourseVariablesBuilder enrollInCourse ({required String courseId, }) {
    return EnrollInCourseVariablesBuilder(dataConnect, courseId: courseId,);
  }
  
  
  EnrollInMissionVariablesBuilder enrollInMission ({required String missionId, }) {
    return EnrollInMissionVariablesBuilder(dataConnect, missionId: missionId,);
  }
  
  
  UpdateLectureProgressVariablesBuilder updateLectureProgress ({required String lectureId, required int lastWatchedSecond, }) {
    return UpdateLectureProgressVariablesBuilder(dataConnect, lectureId: lectureId,lastWatchedSecond: lastWatchedSecond,);
  }
  
  
  GetQuizQuestionsVariablesBuilder getQuizQuestions ({required String lectureId, }) {
    return GetQuizQuestionsVariablesBuilder(dataConnect, lectureId: lectureId,);
  }
  
  
  StartQuizAttemptVariablesBuilder startQuizAttempt ({required String quizId, }) {
    return StartQuizAttemptVariablesBuilder(dataConnect, quizId: quizId,);
  }
  
  
  SubmitQuizAnswerVariablesBuilder submitQuizAnswer ({required String attemptId, required String questionId, required int selectedIndex, }) {
    return SubmitQuizAnswerVariablesBuilder(dataConnect, attemptId: attemptId,questionId: questionId,selectedIndex: selectedIndex,);
  }
  
  
  FinishQuizAttemptVariablesBuilder finishQuizAttempt ({required String attemptId, }) {
    return FinishQuizAttemptVariablesBuilder(dataConnect, attemptId: attemptId,);
  }
  
  
  GetCourseSessionsVariablesBuilder getCourseSessions ({required String courseId, }) {
    return GetCourseSessionsVariablesBuilder(dataConnect, courseId: courseId,);
  }
  
  
  CheckInToSessionVariablesBuilder checkInToSession ({required String sessionId, required AttendanceStatus status, required AttendanceMethod method, }) {
    return CheckInToSessionVariablesBuilder(dataConnect, sessionId: sessionId,status: status,method: method,);
  }
  
  
  ListPublishedCoursesVariablesBuilder listPublishedCourses () {
    return ListPublishedCoursesVariablesBuilder(dataConnect, );
  }
  
  
  GetCourseCurriculumVariablesBuilder getCourseCurriculum ({required String courseId, }) {
    return GetCourseCurriculumVariablesBuilder(dataConnect, courseId: courseId,);
  }
  
  
  LogPaymentVariablesBuilder logPayment ({required PaymentGateway gateway, required String referenceId, }) {
    return LogPaymentVariablesBuilder(dataConnect, gateway: gateway,referenceId: referenceId,);
  }
  
  
  AddPaymentItemVariablesBuilder addPaymentItem ({required String paymentId, required double price, }) {
    return AddPaymentItemVariablesBuilder(dataConnect, paymentId: paymentId,price: price,);
  }
  
  
  MyPaymentHistoryVariablesBuilder myPaymentHistory () {
    return MyPaymentHistoryVariablesBuilder(dataConnect, );
  }
  
  
  SubmitMissionVariablesBuilder submitMission ({required String missionId, required String fileUrl, }) {
    return SubmitMissionVariablesBuilder(dataConnect, missionId: missionId,fileUrl: fileUrl,);
  }
  
  
  MySubmissionsVariablesBuilder mySubmissions () {
    return MySubmissionsVariablesBuilder(dataConnect, );
  }
  
  
  GradeSubmissionVariablesBuilder gradeSubmission ({required String submissionId, required dynamic criteriaScores, }) {
    return GradeSubmissionVariablesBuilder(dataConnect, submissionId: submissionId,criteriaScores: criteriaScores,);
  }
  
  
  SyncUserVariablesBuilder syncUser ({required String uid, required String email, required String name, }) {
    return SyncUserVariablesBuilder(dataConnect, uid: uid,email: email,name: name,);
  }
  
  
  GetMeVariablesBuilder getMe () {
    return GetMeVariablesBuilder(dataConnect, );
  }
  
  
  UpdateMyProfileVariablesBuilder updateMyProfile () {
    return UpdateMyProfileVariablesBuilder(dataConnect, );
  }
  

  static ConnectorConfig connectorConfig = ConnectorConfig(
    'europe-west8',
    'default',
    'learning-management-syst-3cc3a-service',
  );

  DefaultConnector({required this.dataConnect});
  static DefaultConnector get instance {
    
    CacheSettings cacheSettings = CacheSettings(
      maxAge: Duration(milliseconds:0),
      storage: CacheStorage.persistent,
    );
    
    return DefaultConnector(
        dataConnect: FirebaseDataConnect.instanceFor(
            connectorConfig: connectorConfig,
            
            cacheSettings: cacheSettings,
            
            sdkType: CallerSDKType.generated));
  }

  FirebaseDataConnect dataConnect;
}
