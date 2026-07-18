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

  Future<Either<Failure, void>> updateLectureProgress({
    required String lectureId,
    required int lastWatchedSecond,
    bool completed = false,
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
