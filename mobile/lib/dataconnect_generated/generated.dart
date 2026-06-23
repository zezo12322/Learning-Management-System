library dataconnect_generated;
import 'package:firebase_data_connect/firebase_data_connect.dart';
import 'package:flutter/foundation.dart';
import 'dart:convert';
import 'package:flutter/foundation.dart';

part 'admin_create_course.dart';

part 'admin_delete_course.dart';

part 'admin_create_lecture.dart';

part 'admin_create_session.dart';

part 'admin_cancel_session.dart';

part 'admin_create_subscription_tier.dart';

part 'admin_deprecate_subscription_tier.dart';

part 'admin_create_category.dart';

part 'my_certificates.dart';

part 'verify_certificate.dart';

part 'list_published_courses.dart';

part 'get_course_curriculum.dart';

part 'get_lecture_content.dart';

part 'get_user_lecture_progress.dart';

part 'get_my_course_progress.dart';

part 'admin_get_course.dart';

part 'admin_list_my_courses.dart';

part 'admin_update_course.dart';

part 'admin_update_course_status.dart';

part 'admin_create_section.dart';

part 'admin_update_section.dart';

part 'admin_delete_section.dart';

part 'admin_update_section_order.dart';

part 'admin_create_lecture_full.dart';

part 'admin_update_lecture.dart';

part 'admin_soft_delete_lecture.dart';

part 'admin_update_lecture_order.dart';

part 'admin_move_lecture_to_section.dart';

part 'log_payment.dart';

part 'add_payment_item.dart';

part 'my_payment_history.dart';

part 'get_pending_submissions.dart';

part 'admin_add_course_instructor.dart';

part 'admin_remove_course_instructor.dart';

part 'get_course_instructors.dart';

part 'enroll_in_course.dart';

part 'enroll_in_mission.dart';

part 'update_lecture_progress.dart';

part 'get_course_completion_status.dart';

part 'update_enrollment_status.dart';

part 'get_user_enrollment_for_course.dart';

part 'get_user_enrollment_for_mission.dart';

part 'submit_mission.dart';

part 'my_submissions.dart';

part 'grade_submission.dart';

part 'add_criterion_score.dart';

part 'admin_create_mission.dart';

part 'admin_update_mission.dart';

part 'admin_soft_delete_mission.dart';

part 'admin_get_mission.dart';

part 'admin_list_my_missions.dart';

part 'admin_create_micro_lesson.dart';

part 'admin_update_micro_lesson.dart';

part 'admin_delete_micro_lesson.dart';

part 'admin_update_micro_lesson_order.dart';

part 'admin_create_mission_template.dart';

part 'admin_delete_mission_template.dart';

part 'get_mission_templates.dart';

part 'admin_create_rubric_criterion.dart';

part 'admin_update_rubric_criterion.dart';

part 'admin_delete_rubric_criterion.dart';

part 'admin_update_rubric_criterion_order.dart';

part 'get_quiz_questions.dart';

part 'start_quiz_attempt.dart';

part 'submit_quiz_answer.dart';

part 'finish_quiz_attempt.dart';

part 'get_user_quiz_attempts.dart';

part 'get_quiz_attempt_by_id.dart';

part 'get_attempt_answers_with_correct.dart';

part 'get_active_quiz_session.dart';

part 'admin_get_quiz.dart';

part 'admin_create_quiz.dart';

part 'admin_update_quiz.dart';

part 'admin_delete_quiz.dart';

part 'admin_create_quiz_question.dart';

part 'admin_update_quiz_question.dart';

part 'admin_soft_delete_quiz_question.dart';

part 'admin_update_quiz_question_order.dart';

part 'admin_create_quiz_option.dart';

part 'admin_update_quiz_option.dart';

part 'admin_delete_quiz_option.dart';

part 'admin_update_quiz_option_order.dart';

part 'admin_set_quiz_time_limit.dart';

part 'get_course_sessions.dart';

part 'check_in_to_session.dart';

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
  

  enum EnrollmentStatus {
    
      ACTIVE,
    
      COMPLETED,
    
      DROPPED,
    
      SUSPENDED,
    
  }
  
  String enrollmentStatusSerializer(EnumValue<EnrollmentStatus> e) {
    return e.stringValue;
  }
  EnumValue<EnrollmentStatus> enrollmentStatusDeserializer(dynamic data) {
    switch (data) {
      
      case 'ACTIVE':
        return const Known(EnrollmentStatus.ACTIVE);
      
      case 'COMPLETED':
        return const Known(EnrollmentStatus.COMPLETED);
      
      case 'DROPPED':
        return const Known(EnrollmentStatus.DROPPED);
      
      case 'SUSPENDED':
        return const Known(EnrollmentStatus.SUSPENDED);
      
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
    return 'EnumValue($stringValue)';
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
    return 'Known($stringValue)';
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
    return 'Unknown($stringValue)';
  }
}

class DefaultConnector {
  
  
  AdminCreateCourseVariablesBuilder adminCreateCourse ({required String title, required int price, required String language, required CourseLevel level, required String categoryId, required List<String> tags, }) {
    return AdminCreateCourseVariablesBuilder(dataConnect, title: title,price: price,language: language,level: level,categoryId: categoryId,tags: tags,);
  }
  
  
  AdminDeleteCourseVariablesBuilder adminDeleteCourse ({required String courseId, }) {
    return AdminDeleteCourseVariablesBuilder(dataConnect, courseId: courseId,);
  }
  
  
  AdminCreateLectureVariablesBuilder adminCreateLecture ({required String sectionId, required String title, required LectureType type, required int order, }) {
    return AdminCreateLectureVariablesBuilder(dataConnect, sectionId: sectionId,title: title,type: type,order: order,);
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
  
  
  AdminCreateCategoryVariablesBuilder adminCreateCategory ({required String name, }) {
    return AdminCreateCategoryVariablesBuilder(dataConnect, name: name,);
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
  
  
  GetLectureContentVariablesBuilder getLectureContent ({required String lectureId, }) {
    return GetLectureContentVariablesBuilder(dataConnect, lectureId: lectureId,);
  }
  
  
  GetUserLectureProgressVariablesBuilder getUserLectureProgress ({required String lectureId, }) {
    return GetUserLectureProgressVariablesBuilder(dataConnect, lectureId: lectureId,);
  }
  
  
  GetMyCourseProgressVariablesBuilder getMyCourseProgress ({required String courseId, }) {
    return GetMyCourseProgressVariablesBuilder(dataConnect, courseId: courseId,);
  }
  
  
  AdminGetCourseVariablesBuilder adminGetCourse ({required String courseId, }) {
    return AdminGetCourseVariablesBuilder(dataConnect, courseId: courseId,);
  }
  
  
  AdminListMyCoursesVariablesBuilder adminListMyCourses () {
    return AdminListMyCoursesVariablesBuilder(dataConnect, );
  }
  
  
  AdminUpdateCourseVariablesBuilder adminUpdateCourse ({required String courseId, }) {
    return AdminUpdateCourseVariablesBuilder(dataConnect, courseId: courseId,);
  }
  
  
  AdminUpdateCourseStatusVariablesBuilder adminUpdateCourseStatus ({required String courseId, required CourseStatus status, }) {
    return AdminUpdateCourseStatusVariablesBuilder(dataConnect, courseId: courseId,status: status,);
  }
  
  
  AdminCreateSectionVariablesBuilder adminCreateSection ({required String courseId, required String title, required int order, }) {
    return AdminCreateSectionVariablesBuilder(dataConnect, courseId: courseId,title: title,order: order,);
  }
  
  
  AdminUpdateSectionVariablesBuilder adminUpdateSection ({required String sectionId, required String title, }) {
    return AdminUpdateSectionVariablesBuilder(dataConnect, sectionId: sectionId,title: title,);
  }
  
  
  AdminDeleteSectionVariablesBuilder adminDeleteSection ({required String sectionId, }) {
    return AdminDeleteSectionVariablesBuilder(dataConnect, sectionId: sectionId,);
  }
  
  
  AdminUpdateSectionOrderVariablesBuilder adminUpdateSectionOrder ({required String sectionId, required int order, }) {
    return AdminUpdateSectionOrderVariablesBuilder(dataConnect, sectionId: sectionId,order: order,);
  }
  
  
  AdminCreateLectureFullVariablesBuilder adminCreateLectureFull ({required String sectionId, required String title, required LectureType type, required bool isFreePreview, required int order, }) {
    return AdminCreateLectureFullVariablesBuilder(dataConnect, sectionId: sectionId,title: title,type: type,isFreePreview: isFreePreview,order: order,);
  }
  
  
  AdminUpdateLectureVariablesBuilder adminUpdateLecture ({required String lectureId, }) {
    return AdminUpdateLectureVariablesBuilder(dataConnect, lectureId: lectureId,);
  }
  
  
  AdminSoftDeleteLectureVariablesBuilder adminSoftDeleteLecture ({required String lectureId, }) {
    return AdminSoftDeleteLectureVariablesBuilder(dataConnect, lectureId: lectureId,);
  }
  
  
  AdminUpdateLectureOrderVariablesBuilder adminUpdateLectureOrder ({required String lectureId, required int order, }) {
    return AdminUpdateLectureOrderVariablesBuilder(dataConnect, lectureId: lectureId,order: order,);
  }
  
  
  AdminMoveLectureToSectionVariablesBuilder adminMoveLectureToSection ({required String lectureId, required String newSectionId, required int order, }) {
    return AdminMoveLectureToSectionVariablesBuilder(dataConnect, lectureId: lectureId,newSectionId: newSectionId,order: order,);
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
  
  
  GetPendingSubmissionsVariablesBuilder getPendingSubmissions () {
    return GetPendingSubmissionsVariablesBuilder(dataConnect, );
  }
  
  
  AdminAddCourseInstructorVariablesBuilder adminAddCourseInstructor ({required String courseId, required String userId, }) {
    return AdminAddCourseInstructorVariablesBuilder(dataConnect, courseId: courseId,userId: userId,);
  }
  
  
  AdminRemoveCourseInstructorVariablesBuilder adminRemoveCourseInstructor ({required String courseId, required String userId, }) {
    return AdminRemoveCourseInstructorVariablesBuilder(dataConnect, courseId: courseId,userId: userId,);
  }
  
  
  GetCourseInstructorsVariablesBuilder getCourseInstructors ({required String courseId, }) {
    return GetCourseInstructorsVariablesBuilder(dataConnect, courseId: courseId,);
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
  
  
  GetCourseCompletionStatusVariablesBuilder getCourseCompletionStatus ({required String courseId, }) {
    return GetCourseCompletionStatusVariablesBuilder(dataConnect, courseId: courseId,);
  }
  
  
  UpdateEnrollmentStatusVariablesBuilder updateEnrollmentStatus ({required String enrollmentId, required EnrollmentStatus status, }) {
    return UpdateEnrollmentStatusVariablesBuilder(dataConnect, enrollmentId: enrollmentId,status: status,);
  }
  
  
  GetUserEnrollmentForCourseVariablesBuilder getUserEnrollmentForCourse ({required String courseId, }) {
    return GetUserEnrollmentForCourseVariablesBuilder(dataConnect, courseId: courseId,);
  }
  
  
  GetUserEnrollmentForMissionVariablesBuilder getUserEnrollmentForMission ({required String missionId, }) {
    return GetUserEnrollmentForMissionVariablesBuilder(dataConnect, missionId: missionId,);
  }
  
  
  SubmitMissionVariablesBuilder submitMission ({required String missionId, required String fileUrl, }) {
    return SubmitMissionVariablesBuilder(dataConnect, missionId: missionId,fileUrl: fileUrl,);
  }
  
  
  MySubmissionsVariablesBuilder mySubmissions () {
    return MySubmissionsVariablesBuilder(dataConnect, );
  }
  
  
  GradeSubmissionVariablesBuilder gradeSubmission ({required String submissionId, }) {
    return GradeSubmissionVariablesBuilder(dataConnect, submissionId: submissionId,);
  }
  
  
  AddCriterionScoreVariablesBuilder addCriterionScore ({required String submissionId, required String criterionId, required double score, }) {
    return AddCriterionScoreVariablesBuilder(dataConnect, submissionId: submissionId,criterionId: criterionId,score: score,);
  }
  
  
  AdminCreateMissionVariablesBuilder adminCreateMission ({required String title, required String scenarioDescription, required int durationMinutes, required String categoryId, required MissionDifficulty difficulty, required List<String> skillsTested, }) {
    return AdminCreateMissionVariablesBuilder(dataConnect, title: title,scenarioDescription: scenarioDescription,durationMinutes: durationMinutes,categoryId: categoryId,difficulty: difficulty,skillsTested: skillsTested,);
  }
  
  
  AdminUpdateMissionVariablesBuilder adminUpdateMission ({required String missionId, }) {
    return AdminUpdateMissionVariablesBuilder(dataConnect, missionId: missionId,);
  }
  
  
  AdminSoftDeleteMissionVariablesBuilder adminSoftDeleteMission ({required String missionId, }) {
    return AdminSoftDeleteMissionVariablesBuilder(dataConnect, missionId: missionId,);
  }
  
  
  AdminGetMissionVariablesBuilder adminGetMission ({required String missionId, }) {
    return AdminGetMissionVariablesBuilder(dataConnect, missionId: missionId,);
  }
  
  
  AdminListMyMissionsVariablesBuilder adminListMyMissions () {
    return AdminListMyMissionsVariablesBuilder(dataConnect, );
  }
  
  
  AdminCreateMicroLessonVariablesBuilder adminCreateMicroLesson ({required String missionId, required String title, required LectureType type, required int order, }) {
    return AdminCreateMicroLessonVariablesBuilder(dataConnect, missionId: missionId,title: title,type: type,order: order,);
  }
  
  
  AdminUpdateMicroLessonVariablesBuilder adminUpdateMicroLesson ({required String microLessonId, }) {
    return AdminUpdateMicroLessonVariablesBuilder(dataConnect, microLessonId: microLessonId,);
  }
  
  
  AdminDeleteMicroLessonVariablesBuilder adminDeleteMicroLesson ({required String microLessonId, }) {
    return AdminDeleteMicroLessonVariablesBuilder(dataConnect, microLessonId: microLessonId,);
  }
  
  
  AdminUpdateMicroLessonOrderVariablesBuilder adminUpdateMicroLessonOrder ({required String microLessonId, required int order, }) {
    return AdminUpdateMicroLessonOrderVariablesBuilder(dataConnect, microLessonId: microLessonId,order: order,);
  }
  
  
  AdminCreateMissionTemplateVariablesBuilder adminCreateMissionTemplate ({required String missionId, required String title, required String fileUrl, required String fileType, }) {
    return AdminCreateMissionTemplateVariablesBuilder(dataConnect, missionId: missionId,title: title,fileUrl: fileUrl,fileType: fileType,);
  }
  
  
  AdminDeleteMissionTemplateVariablesBuilder adminDeleteMissionTemplate ({required String templateId, }) {
    return AdminDeleteMissionTemplateVariablesBuilder(dataConnect, templateId: templateId,);
  }
  
  
  GetMissionTemplatesVariablesBuilder getMissionTemplates ({required String missionId, }) {
    return GetMissionTemplatesVariablesBuilder(dataConnect, missionId: missionId,);
  }
  
  
  AdminCreateRubricCriterionVariablesBuilder adminCreateRubricCriterion ({required String missionId, required String criterionName, required double maxPoints, required int order, }) {
    return AdminCreateRubricCriterionVariablesBuilder(dataConnect, missionId: missionId,criterionName: criterionName,maxPoints: maxPoints,order: order,);
  }
  
  
  AdminUpdateRubricCriterionVariablesBuilder adminUpdateRubricCriterion ({required String criterionId, }) {
    return AdminUpdateRubricCriterionVariablesBuilder(dataConnect, criterionId: criterionId,);
  }
  
  
  AdminDeleteRubricCriterionVariablesBuilder adminDeleteRubricCriterion ({required String criterionId, }) {
    return AdminDeleteRubricCriterionVariablesBuilder(dataConnect, criterionId: criterionId,);
  }
  
  
  AdminUpdateRubricCriterionOrderVariablesBuilder adminUpdateRubricCriterionOrder ({required String criterionId, required int order, }) {
    return AdminUpdateRubricCriterionOrderVariablesBuilder(dataConnect, criterionId: criterionId,order: order,);
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
  
  
  GetUserQuizAttemptsVariablesBuilder getUserQuizAttempts ({required String quizId, }) {
    return GetUserQuizAttemptsVariablesBuilder(dataConnect, quizId: quizId,);
  }
  
  
  GetQuizAttemptByIdVariablesBuilder getQuizAttemptById ({required String attemptId, }) {
    return GetQuizAttemptByIdVariablesBuilder(dataConnect, attemptId: attemptId,);
  }
  
  
  GetAttemptAnswersWithCorrectVariablesBuilder getAttemptAnswersWithCorrect ({required String attemptId, }) {
    return GetAttemptAnswersWithCorrectVariablesBuilder(dataConnect, attemptId: attemptId,);
  }
  
  
  GetActiveQuizSessionVariablesBuilder getActiveQuizSession ({required String attemptId, }) {
    return GetActiveQuizSessionVariablesBuilder(dataConnect, attemptId: attemptId,);
  }
  
  
  AdminGetQuizVariablesBuilder adminGetQuiz ({required String quizId, }) {
    return AdminGetQuizVariablesBuilder(dataConnect, quizId: quizId,);
  }
  
  
  AdminCreateQuizVariablesBuilder adminCreateQuiz ({required String lectureId, required double passingScore, required int maxAttempts, }) {
    return AdminCreateQuizVariablesBuilder(dataConnect, lectureId: lectureId,passingScore: passingScore,maxAttempts: maxAttempts,);
  }
  
  
  AdminUpdateQuizVariablesBuilder adminUpdateQuiz ({required String quizId, }) {
    return AdminUpdateQuizVariablesBuilder(dataConnect, quizId: quizId,);
  }
  
  
  AdminDeleteQuizVariablesBuilder adminDeleteQuiz ({required String quizId, }) {
    return AdminDeleteQuizVariablesBuilder(dataConnect, quizId: quizId,);
  }
  
  
  AdminCreateQuizQuestionVariablesBuilder adminCreateQuizQuestion ({required String quizId, required String questionText, required int order, required double points, }) {
    return AdminCreateQuizQuestionVariablesBuilder(dataConnect, quizId: quizId,questionText: questionText,order: order,points: points,);
  }
  
  
  AdminUpdateQuizQuestionVariablesBuilder adminUpdateQuizQuestion ({required String questionId, }) {
    return AdminUpdateQuizQuestionVariablesBuilder(dataConnect, questionId: questionId,);
  }
  
  
  AdminSoftDeleteQuizQuestionVariablesBuilder adminSoftDeleteQuizQuestion ({required String questionId, }) {
    return AdminSoftDeleteQuizQuestionVariablesBuilder(dataConnect, questionId: questionId,);
  }
  
  
  AdminUpdateQuizQuestionOrderVariablesBuilder adminUpdateQuizQuestionOrder ({required String questionId, required int order, }) {
    return AdminUpdateQuizQuestionOrderVariablesBuilder(dataConnect, questionId: questionId,order: order,);
  }
  
  
  AdminCreateQuizOptionVariablesBuilder adminCreateQuizOption ({required String questionId, required String text, required int order, required bool isCorrect, }) {
    return AdminCreateQuizOptionVariablesBuilder(dataConnect, questionId: questionId,text: text,order: order,isCorrect: isCorrect,);
  }
  
  
  AdminUpdateQuizOptionVariablesBuilder adminUpdateQuizOption ({required String optionId, }) {
    return AdminUpdateQuizOptionVariablesBuilder(dataConnect, optionId: optionId,);
  }
  
  
  AdminDeleteQuizOptionVariablesBuilder adminDeleteQuizOption ({required String optionId, }) {
    return AdminDeleteQuizOptionVariablesBuilder(dataConnect, optionId: optionId,);
  }
  
  
  AdminUpdateQuizOptionOrderVariablesBuilder adminUpdateQuizOptionOrder ({required String optionId, required int order, }) {
    return AdminUpdateQuizOptionOrderVariablesBuilder(dataConnect, optionId: optionId,order: order,);
  }
  
  
  AdminSetQuizTimeLimitVariablesBuilder adminSetQuizTimeLimit ({required String quizId, }) {
    return AdminSetQuizTimeLimitVariablesBuilder(dataConnect, quizId: quizId,);
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
  

  static ConnectorConfig connectorConfig = ConnectorConfig(
    'europe-west8',
    'default',
    'learning-management-syst-3cc3a-service',
  );

  DefaultConnector({required this.dataConnect});
  static DefaultConnector get instance {
    
    CacheSettings cacheSettings = CacheSettings(
      maxAge: const Duration(),
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
