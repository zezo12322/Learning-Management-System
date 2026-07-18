import 'package:optimatech_lms/features/courses/domain/entities/courses_entity.dart';

class EnrolledCourseEntity {
  final String enrollmentId;
  final String status;
  final DateTime enrolledAt;
  final DateTime? completedAt;
  final CourseEntity course;
  final int totalLessons;
  final int completedLessons;
  final int percentage;

  const EnrolledCourseEntity({
    required this.enrollmentId,
    required this.status,
    required this.enrolledAt,
    this.completedAt,
    required this.course,
    required this.totalLessons,
    required this.completedLessons,
    required this.percentage,
  });
}
