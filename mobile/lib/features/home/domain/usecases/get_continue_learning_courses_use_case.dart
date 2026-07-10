import 'package:dartz/dartz.dart';
import 'package:optimatech_lms/core/error/failures.dart';
import 'package:optimatech_lms/features/home/domain/usecases/home_use_case.dart';
import '../entities/student_progress_entity.dart';
import '../repositories/home_repository.dart';

class GetContinueLearningCoursesUseCase
    extends HomeUseCase<List<StudentProgressEntity>, NoParams> {
  final HomeRepository repository;

  GetContinueLearningCoursesUseCase(this.repository);

  @override
  Future<Either<Failure, List<StudentProgressEntity>>> call(
    NoParams? params,
  ) async {
    return await repository.getContinueLearningCourses();
  }
}
