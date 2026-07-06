import 'package:optimatech_lms/features/home/domain/entities/student_progress_entity.dart';

class StudentProgressModel extends StudentProgressEntity {
  const StudentProgressModel({
    required super.watchedLessons,
    required super.totalLessons,
    required super.timeLeft,
    required super.progressPercent,
  });

  factory StudentProgressModel.fromDataConnect(Map<String, dynamic> json) {
    return StudentProgressModel(
      watchedLessons: json['watchedLessons'] as int? ?? 0,
      totalLessons: json['totalLessons'] as int? ?? 0,
      timeLeft: json['timeLeft'] as String? ?? '',
      progressPercent: (json['progressPercent'] as num?)?.toDouble() ?? 0.0,
    );
  }
}
