import 'package:dartz/dartz.dart';
import 'package:optimatech_lms/core/error/failures.dart';
import '../entities/student_progress_entity.dart';
import '../repositories/home_repository.dart';

class GetContinueLearningCoursesUseCase {
  final HomeRepository repository;

  GetContinueLearningCoursesUseCase(this.repository);

  Future<Either<Failure, StudentProgressEntity?>> call() async {
    return await repository.getContinueLearningCourses();
  }
}
