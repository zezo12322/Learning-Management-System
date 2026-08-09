import 'package:dartz/dartz.dart';
import 'package:optimatech_lms/core/error/failures.dart';
import 'package:optimatech_lms/features/course_learning/domain/repositories/course_learning_repository.dart';

class UpdateLectureProgressUseCase {
  final CourseLearningRepository repository;

  UpdateLectureProgressUseCase(this.repository);

  /// [watchedSeconds] is time actually spent playing, which the server needs
  /// alongside the position before it will mark a lecture complete.
  Future<Either<Failure, void>> call({
    required String lectureId,
    required int lastWatchedSecond,
    int? watchedSeconds,
  }) {
    return repository.updateLectureProgress(
      lectureId: lectureId,
      lastWatchedSecond: lastWatchedSecond,
      watchedSeconds: watchedSeconds,
    );
  }
}
