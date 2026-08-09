import 'package:optimatech_lms/core/utils/money.dart';
import 'package:optimatech_lms/features/courses/data/models/courses_model.dart';
import 'package:optimatech_lms/dataconnect_generated/generated.dart';
import 'package:optimatech_lms/features/courses/domain/entities/enrolled_course_entity.dart';

class EnrolledCourseModel {
  final String enrollmentId;
  final String status;
  final DateTime enrolledAt;
  final DateTime? completedAt;
  final CourseModel course;
  final int totalLessons;
  final int completedLessons;
  final int percentage;

  const EnrolledCourseModel({
    required this.enrollmentId,
    required this.status,
    required this.enrolledAt,
    this.completedAt,
    required this.course,
    required this.totalLessons,
    required this.completedLessons,
    required this.percentage,
  });

  factory EnrolledCourseModel.fromConnectorResult(GetMyContinueLearningEnrollments result) {
    final courseResult = result.course;
    
    // Calculate progress identical to how NestJS did it
    int totalLessons = 0;
    int completedLessons = 0;

    if (courseResult != null && courseResult.clSections != null) {
      for (var section in courseResult.clSections!) {
        if (section.clLectures != null) {
          for (var lecture in section.clLectures!) {
            totalLessons++;
            if (lecture.clProgress != null && lecture.clProgress!.isNotEmpty) {
              if (lecture.clProgress!.first.completedAt != null) {
                completedLessons++;
              }
            }
          }
        }
      }
    }

    final percentage = totalLessons > 0 
        ? ((completedLessons / totalLessons) * 100).round() 
        : 0;

    return EnrolledCourseModel(
      enrollmentId: result.id,
      status: result.status.stringValue ?? result.status.toString(),
      enrolledAt: result.enrolledAt.toDateTime(),
      completedAt: result.completedAt?.toDateTime(),
      course: CourseModel(
        id: courseResult?.id ?? '',
        title: courseResult?.title ?? '',
        price: egpFromPiastres(courseResult?.price ?? 0),
        level: courseResult?.level.stringValue ?? '',
        thumbnail: courseResult?.thumbnail,
        tags: const [], // Not requested in this specific query
        category: Category(name: courseResult?.category?.name ?? ''),
        author: Author(
          name: courseResult?.author?.name ?? '',
          avatar: courseResult?.author?.avatar,
        ),
        avgRating: 0.0,
        ratingCount: 0,
        enrollmentCount: 0,
      ),
      totalLessons: totalLessons,
      completedLessons: completedLessons,
      percentage: percentage,
    );
  }

  EnrolledCourseEntity toEntity() {
    return EnrolledCourseEntity(
      enrollmentId: enrollmentId,
      status: status,
      enrolledAt: enrolledAt,
      completedAt: completedAt,
      course: course.toEntity(),
      totalLessons: totalLessons,
      completedLessons: completedLessons,
      percentage: percentage,
    );
  }
}
