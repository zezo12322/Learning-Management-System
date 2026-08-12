import 'package:dartz/dartz.dart';
import 'package:optimatech_lms/features/course_learning/domain/entities/course_curriculum_entity.dart';
import 'package:optimatech_lms/features/course_learning/domain/entities/lecture_content_entity.dart';
import '../../../../core/error/failures.dart';

abstract class CourseLearningRepository {
  Future<Either<Failure, CourseCurriculumEntity>> getCourseCurriculum({
    required String courseId,
  });

  Future<Either<Failure, LectureContentEntity>> getLectureContent({
    required String lectureId,
  });

  // Future<Either<Failure, LectureProgressEntity?>> getUserLectureProgress({
  //   required String lectureId,
  // });

  /// Records a lecture position.
  ///
  /// [heartbeat] picks the transport: `true` uses the queued POST, which
  /// answers 202 and collapses a burst of positions for the same lecture into a
  /// single write; `false` uses the synchronous PUT, which the caller needs
  /// when it wants the derived completion back. A player reporting every ten
  /// seconds should always be a heartbeat.
  Future<Either<Failure, void>> updateLectureProgress({
    required String lectureId,
    required int lastWatchedSecond,
    int? watchedSeconds,
    bool heartbeat = false,
  });
  // Future<Either<Failure, bool>> getCourseAccess({
  //   required String courseId,
  // });
  //
  // Future<Either<Failure, bool>> getCourseCompletionStatus({
  //   required String courseId,
  // });
  //
  // Future<Either<Failure, void>> markEnrollmentCompleted({
  //   required String courseId,
  // });
}
