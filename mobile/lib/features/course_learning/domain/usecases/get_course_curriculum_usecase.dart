import 'package:dartz/dartz.dart';
import 'package:optimatech_lms/core/error/failures.dart';
import 'package:optimatech_lms/features/course_learning/domain/entities/course_curriculum_entity.dart';
import 'package:optimatech_lms/features/course_learning/domain/repositories/course_learning_repository.dart';

class GetCourseCurriculumUseCase {
  final CourseLearningRepository repository;

  GetCourseCurriculumUseCase(this.repository);

  Future<Either<Failure, CourseCurriculumEntity>> call(String courseId) async {
    return await repository.getCourseCurriculum(courseId: courseId);
  }
}
