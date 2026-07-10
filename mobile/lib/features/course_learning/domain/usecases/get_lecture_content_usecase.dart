import 'package:dartz/dartz.dart';
import 'package:optimatech_lms/core/error/failures.dart';
import 'package:optimatech_lms/features/course_learning/domain/entities/lecture_content_entity.dart';
import 'package:optimatech_lms/features/course_learning/domain/repositories/course_learning_repository.dart';

class GetLectureContentUseCase {
  final CourseLearningRepository repository;

  GetLectureContentUseCase(this.repository);

  Future<Either<Failure, LectureContentEntity>> call(String lectureId) async {
    return await repository.getLectureContent(lectureId: lectureId);
  }
}
