import 'package:dartz/dartz.dart';
import 'package:optimatech_lms/core/error/failures.dart';
import 'package:optimatech_lms/features/course_learning/domain/repositories/course_learning_repository.dart';

class UpdateLectureProgressUseCase {
  final CourseLearningRepository repository;

  UpdateLectureProgressUseCase(this.repository);

  Future<Either<Failure, void>> call({
    required String lectureId,
    required int lastWatchedSecond,
    bool completed = false,
  }) {
    return repository.updateLectureProgress(
      lectureId: lectureId,
      lastWatchedSecond: lastWatchedSecond,
      completed: completed,
    );
  }
}
