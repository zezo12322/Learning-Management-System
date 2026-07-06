import 'package:equatable/equatable.dart';

class StudentProgressEntity extends Equatable {
  final int watchedLessons;
  final int totalLessons;
  final String timeLeft;
  final double progressPercent;

  const StudentProgressEntity({
    required this.watchedLessons,
    required this.totalLessons,
    required this.timeLeft,
    required this.progressPercent,
  });

  @override
  List<Object?> get props => [
        watchedLessons,
        totalLessons,
        timeLeft,
        progressPercent,
      ];
}
