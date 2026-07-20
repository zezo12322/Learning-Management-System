import 'package:optimatech_lms/features/home/domain/entities/student_progress_entity.dart';

class StudentProgressModel extends StudentProgressEntity {
  const StudentProgressModel({
    required super.watchedLessons,
    required super.totalLessons,
    required super.timeLeft,
    required super.progressPercent,
    required super.courseId,
    required super.title,
    required super.thumbnail,
  });

  factory StudentProgressModel.fromDataConnect(Map<String, dynamic> json) {
    return StudentProgressModel(
      watchedLessons: json['watchedLessons'] as int? ?? 0,
      totalLessons: json['totalLessons'] as int? ?? 0,
      timeLeft: json['timeLeft'] as String? ?? '',
      progressPercent: (json['progressPercent'] as num?)?.toDouble() ?? 0.0,
      courseId: json['courseId'] as String? ?? '',
      title: json['title'] as String? ?? '',
      thumbnail: json['thumbnail'] as String? ?? '',
    );
  }
}
