import 'package:optimatech_lms/features/course_details/domain/entities/course_curriculum_entity.dart';

abstract class CourseDetailsRepository {
  Future<CourseCurriculumEntity> getCourseCurriculum(String courseId);
  Future<void> enrollInCourse(String courseId);
  Future<String> createCourseCheckoutUrl({
    required String courseId,
    required int amountCents,
  });
  Future<bool> isEnrolledInCourse(String courseId);
}
