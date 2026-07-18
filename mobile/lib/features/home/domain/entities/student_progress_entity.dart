import 'package:equatable/equatable.dart';

class StudentProgressEntity extends Equatable {
  final int watchedLessons;
  final int totalLessons;
  final String timeLeft;
  final double progressPercent;
  final String courseId;
  final String title;
  final String thumbnail;

  const StudentProgressEntity({
    required this.watchedLessons,
    required this.totalLessons,
    required this.timeLeft,
    required this.progressPercent,
    required this.courseId,
    required this.title,
    required this.thumbnail,
  });

  @override
  List<Object?> get props => [
        watchedLessons,
        totalLessons,
        timeLeft,
        progressPercent,
        courseId,
        title,
        thumbnail,
      ];
}
