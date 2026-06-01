library dataconnect_generated;
import 'package:firebase_data_connect/firebase_data_connect.dart';
import 'package:flutter/foundation.dart';
import 'dart:convert';
import 'package:flutter/foundation.dart';

part 'admin_create_course.dart';

part 'admin_delete_course.dart';

part 'admin_create_course_section.dart';

part 'admin_create_lecture.dart';

part 'instructor_courses.dart';

part 'admin_create_session.dart';

part 'admin_cancel_session.dart';

part 'admin_create_subscription_tier.dart';

part 'admin_deprecate_subscription_tier.dart';

part 'list_subscription_tiers.dart';

part 'admin_create_category.dart';

part 'list_categories.dart';

part 'admin_create_quiz.dart';

part 'admin_create_quiz_question.dart';

part 'admin_create_quiz_option.dart';

part 'admin_create_mission.dart';

part 'admin_create_rubric_criterion.dart';

part 'admin_issue_certificate.dart';

part 'get_pending_submissions.dart';

part 'submit_mission.dart';

part 'grade_submission.dart';

part 'add_criterion_score.dart';

part 'my_submissions.dart';

part 'get_course_sessions.dart';

part 'check_in_to_session.dart';

part 'sync_user.dart';

part 'get_me.dart';

part 'update_my_profile.dart';

part 'my_certificates.dart';

part 'verify_certificate.dart';

part 'list_published_courses.dart';

part 'get_course_curriculum.dart';

part 'log_payment.dart';

part 'add_payment_item.dart';

part 'my_payment_history.dart';

part 'enroll_in_course.dart';

part 'enroll_in_mission.dart';

part 'update_lecture_progress.dart';

part 'get_quiz_questions.dart';

part 'start_quiz_attempt.dart';

part 'submit_quiz_answer.dart';

part 'finish_quiz_attempt.dart';



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
  

  enum BillingCycle {
    
      MONTHLY,
    
      QUARTERLY,
    
      YEARLY,
    
  }
  
  String billingCycleSerializer(EnumValue<BillingCycle> e) {
    return e.stringValue;
  }
  EnumValue<BillingCycle> billingCycleDeserializer(dynamic data) {
    switch (data) {
      
      case 'MONTHLY':
        return const Known(BillingCycle.MONTHLY);
      
      case 'QUARTERLY':
        return const Known(BillingCycle.QUARTERLY);
      
      case 'YEARLY':
        return const Known(BillingCycle.YEARLY);
      
      default:
        return Unknown(data);
    }
  }
  

  enum CertificateTarget {
    
      COURSE,
    
      MISSION,
    
  }
  
  String certificateTargetSerializer(EnumValue<CertificateTarget> e) {
    return e.stringValue;
  }
  EnumValue<CertificateTarget> certificateTargetDeserializer(dynamic data) {
    switch (data) {
      
      case 'COURSE':
        return const Known(CertificateTarget.COURSE);
      
      case 'MISSION':
        return const Known(CertificateTarget.MISSION);
      
      default:
        return Unknown(data);
    }
  }
  

  enum CourseLevel {
    
      BEGINNER,
    
      INTERMEDIATE,
    
      ADVANCED,
    
  }
  
  String courseLevelSerializer(EnumValue<CourseLevel> e) {
    return e.stringValue;
  }
  EnumValue<CourseLevel> courseLevelDeserializer(dynamic data) {
    switch (data) {
      
      case 'BEGINNER':
        return const Known(CourseLevel.BEGINNER);
      
      case 'INTERMEDIATE':
        return const Known(CourseLevel.INTERMEDIATE);
      
      case 'ADVANCED':
        return const Known(CourseLevel.ADVANCED);
      
      default:
        return Unknown(data);
    }
  }
  

  enum CourseStatus {
    
      DRAFT,
    
      PUBLISHED,
    
      ARCHIVED,
    
  }
  
  String courseStatusSerializer(EnumValue<CourseStatus> e) {
    return e.stringValue;
  }
  EnumValue<CourseStatus> courseStatusDeserializer(dynamic data) {
    switch (data) {
      
      case 'DRAFT':
        return const Known(CourseStatus.DRAFT);
      
      case 'PUBLISHED':
        return const Known(CourseStatus.PUBLISHED);
      
      case 'ARCHIVED':
        return const Known(CourseStatus.ARCHIVED);
      
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
  

  enum MissionDifficulty {
    
      BEGINNER,
    
      INTERMEDIATE,
    
      ADVANCED,
    
      EXPERT,
    
  }
  
  String missionDifficultySerializer(EnumValue<MissionDifficulty> e) {
    return e.stringValue;
  }
  EnumValue<MissionDifficulty> missionDifficultyDeserializer(dynamic data) {
    switch (data) {
      
      case 'BEGINNER':
        return const Known(MissionDifficulty.BEGINNER);
      
      case 'INTERMEDIATE':
        return const Known(MissionDifficulty.INTERMEDIATE);
      
      case 'ADVANCED':
        return const Known(MissionDifficulty.ADVANCED);
      
      case 'EXPERT':
        return const Known(MissionDifficulty.EXPERT);
      
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
  

  enum PaymentItemTarget {
    
      COURSE,
    
      MISSION,
    
      SUBSCRIPTION,
    
  }
  
  String paymentItemTargetSerializer(EnumValue<PaymentItemTarget> e) {
    return e.stringValue;
  }
  EnumValue<PaymentItemTarget> paymentItemTargetDeserializer(dynamic data) {
    switch (data) {
      
      case 'COURSE':
        return const Known(PaymentItemTarget.COURSE);
      
      case 'MISSION':
        return const Known(PaymentItemTarget.MISSION);
      
      case 'SUBSCRIPTION':
        return const Known(PaymentItemTarget.SUBSCRIPTION);
      
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
  

  enum SubmissionStatus {
    
      PENDING,
    
      GRADED,
    
      RETURNED,
    
      REJECTED,
    
  }
  
  String submissionStatusSerializer(EnumValue<SubmissionStatus> e) {
    return e.stringValue;
  }
  EnumValue<SubmissionStatus> submissionStatusDeserializer(dynamic data) {
    switch (data) {
      
      case 'PENDING':
        return const Known(SubmissionStatus.PENDING);
      
      case 'GRADED':
        return const Known(SubmissionStatus.GRADED);
      
      case 'RETURNED':
        return const Known(SubmissionStatus.RETURNED);
      
      case 'REJECTED':
        return const Known(SubmissionStatus.REJECTED);
      
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
  
  
  AdminCreateCourseVariablesBuilder adminCreateCourse ({required String title, required int price, required String language, required CourseLevel level, required String categoryId, required List<String> tags, }) {
    return AdminCreateCourseVariablesBuilder(dataConnect, title: title,price: price,language: language,level: level,categoryId: categoryId,tags: tags,);
  }
  
  
  AdminDeleteCourseVariablesBuilder adminDeleteCourse ({required String courseId, }) {
    return AdminDeleteCourseVariablesBuilder(dataConnect, courseId: courseId,);
  }
  
  
  AdminCreateCourseSectionVariablesBuilder adminCreateCourseSection ({required String courseId, required String title, required int order, }) {
    return AdminCreateCourseSectionVariablesBuilder(dataConnect, courseId: courseId,title: title,order: order,);
  }
  
  
  AdminCreateLectureVariablesBuilder adminCreateLecture ({required String sectionId, required String title, required LectureType type, required int order, }) {
    return AdminCreateLectureVariablesBuilder(dataConnect, sectionId: sectionId,title: title,type: type,order: order,);
  }
  
  
  InstructorCoursesVariablesBuilder instructorCourses () {
    return InstructorCoursesVariablesBuilder(dataConnect, );
  }
  
  
  AdminCreateSessionVariablesBuilder adminCreateSession ({required String courseId, required String title, required Timestamp startTime, required Timestamp endTime, required SessionType type, required String locationOrUrl, }) {
    return AdminCreateSessionVariablesBuilder(dataConnect, courseId: courseId,title: title,startTime: startTime,endTime: endTime,type: type,locationOrUrl: locationOrUrl,);
  }
  
  
  AdminCancelSessionVariablesBuilder adminCancelSession ({required String sessionId, }) {
    return AdminCancelSessionVariablesBuilder(dataConnect, sessionId: sessionId,);
  }
  
  
  AdminCreateSubscriptionTierVariablesBuilder adminCreateSubscriptionTier ({required String name, required int price, required BillingCycle billingCycle, required List<String> features, }) {
    return AdminCreateSubscriptionTierVariablesBuilder(dataConnect, name: name,price: price,billingCycle: billingCycle,features: features,);
  }
  
  
  AdminDeprecateSubscriptionTierVariablesBuilder adminDeprecateSubscriptionTier ({required String tierId, }) {
    return AdminDeprecateSubscriptionTierVariablesBuilder(dataConnect, tierId: tierId,);
  }
  
  
  ListSubscriptionTiersVariablesBuilder listSubscriptionTiers () {
    return ListSubscriptionTiersVariablesBuilder(dataConnect, );
  }
  
  
  AdminCreateCategoryVariablesBuilder adminCreateCategory ({required String name, }) {
    return AdminCreateCategoryVariablesBuilder(dataConnect, name: name,);
  }
  
  
  ListCategoriesVariablesBuilder listCategories () {
    return ListCategoriesVariablesBuilder(dataConnect, );
  }
  
  
  AdminCreateQuizVariablesBuilder adminCreateQuiz ({required String lectureId, required double passingScore, required int maxAttempts, }) {
    return AdminCreateQuizVariablesBuilder(dataConnect, lectureId: lectureId,passingScore: passingScore,maxAttempts: maxAttempts,);
  }
  
  
  AdminCreateQuizQuestionVariablesBuilder adminCreateQuizQuestion ({required String quizId, required String questionText, required int order, required String correctOptionId, }) {
    return AdminCreateQuizQuestionVariablesBuilder(dataConnect, quizId: quizId,questionText: questionText,order: order,correctOptionId: correctOptionId,);
  }
  
  
  AdminCreateQuizOptionVariablesBuilder adminCreateQuizOption ({required String questionId, required String text, required int order, }) {
    return AdminCreateQuizOptionVariablesBuilder(dataConnect, questionId: questionId,text: text,order: order,);
  }
  
  
  AdminCreateMissionVariablesBuilder adminCreateMission ({required String title, required String scenarioDescription, required int durationMinutes, required String categoryId, required MissionDifficulty difficulty, required List<String> skillsTested, }) {
    return AdminCreateMissionVariablesBuilder(dataConnect, title: title,scenarioDescription: scenarioDescription,durationMinutes: durationMinutes,categoryId: categoryId,difficulty: difficulty,skillsTested: skillsTested,);
  }
  
  
  AdminCreateRubricCriterionVariablesBuilder adminCreateRubricCriterion ({required String missionId, required String criterionName, required double maxPoints, required int order, }) {
    return AdminCreateRubricCriterionVariablesBuilder(dataConnect, missionId: missionId,criterionName: criterionName,maxPoints: maxPoints,order: order,);
  }
  
  
  AdminIssueCertificateVariablesBuilder adminIssueCertificate ({required String userId, required CertificateTarget targetType, required String verificationHash, required String assetUrl, }) {
    return AdminIssueCertificateVariablesBuilder(dataConnect, userId: userId,targetType: targetType,verificationHash: verificationHash,assetUrl: assetUrl,);
  }
  
  
  GetPendingSubmissionsVariablesBuilder getPendingSubmissions () {
    return GetPendingSubmissionsVariablesBuilder(dataConnect, );
  }
  
  
  SubmitMissionVariablesBuilder submitMission ({required String missionId, required String fileUrl, }) {
    return SubmitMissionVariablesBuilder(dataConnect, missionId: missionId,fileUrl: fileUrl,);
  }
  
  
  GradeSubmissionVariablesBuilder gradeSubmission ({required String submissionId, }) {
    return GradeSubmissionVariablesBuilder(dataConnect, submissionId: submissionId,);
  }
  
  
  AddCriterionScoreVariablesBuilder addCriterionScore ({required String submissionId, required String criterionId, required double score, }) {
    return AddCriterionScoreVariablesBuilder(dataConnect, submissionId: submissionId,criterionId: criterionId,score: score,);
  }
  
  
  MySubmissionsVariablesBuilder mySubmissions () {
    return MySubmissionsVariablesBuilder(dataConnect, );
  }
  
  
  GetCourseSessionsVariablesBuilder getCourseSessions ({required String courseId, }) {
    return GetCourseSessionsVariablesBuilder(dataConnect, courseId: courseId,);
  }
  
  
  CheckInToSessionVariablesBuilder checkInToSession ({required String sessionId, required AttendanceStatus status, required AttendanceMethod method, }) {
    return CheckInToSessionVariablesBuilder(dataConnect, sessionId: sessionId,status: status,method: method,);
  }
  
  
  SyncUserVariablesBuilder syncUser ({required String email, required String name, }) {
    return SyncUserVariablesBuilder(dataConnect, email: email,name: name,);
  }
  
  
  GetMeVariablesBuilder getMe () {
    return GetMeVariablesBuilder(dataConnect, );
  }
  
  
  UpdateMyProfileVariablesBuilder updateMyProfile () {
    return UpdateMyProfileVariablesBuilder(dataConnect, );
  }
  
  
  MyCertificatesVariablesBuilder myCertificates () {
    return MyCertificatesVariablesBuilder(dataConnect, );
  }
  
  
  VerifyCertificateVariablesBuilder verifyCertificate ({required String hash, }) {
    return VerifyCertificateVariablesBuilder(dataConnect, hash: hash,);
  }
  
  
  ListPublishedCoursesVariablesBuilder listPublishedCourses () {
    return ListPublishedCoursesVariablesBuilder(dataConnect, );
  }
  
  
  GetCourseCurriculumVariablesBuilder getCourseCurriculum ({required String courseId, }) {
    return GetCourseCurriculumVariablesBuilder(dataConnect, courseId: courseId,);
  }
  
  
  LogPaymentVariablesBuilder logPayment ({required PaymentGateway gateway, required String referenceId, required int amount, }) {
    return LogPaymentVariablesBuilder(dataConnect, gateway: gateway,referenceId: referenceId,amount: amount,);
  }
  
  
  AddPaymentItemVariablesBuilder addPaymentItem ({required String paymentId, required PaymentItemTarget targetType, required int price, }) {
    return AddPaymentItemVariablesBuilder(dataConnect, paymentId: paymentId,targetType: targetType,price: price,);
  }
  
  
  MyPaymentHistoryVariablesBuilder myPaymentHistory () {
    return MyPaymentHistoryVariablesBuilder(dataConnect, );
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
  
  
  SubmitQuizAnswerVariablesBuilder submitQuizAnswer ({required String attemptId, required String questionId, required String optionId, }) {
    return SubmitQuizAnswerVariablesBuilder(dataConnect, attemptId: attemptId,questionId: questionId,optionId: optionId,);
  }
  
  
  FinishQuizAttemptVariablesBuilder finishQuizAttempt ({required String attemptId, required double score, required bool passed, }) {
    return FinishQuizAttemptVariablesBuilder(dataConnect, attemptId: attemptId,score: score,passed: passed,);
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
