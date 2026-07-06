import 'package:dartz/dartz.dart';
import 'package:optimatech_lms/core/error/failures.dart';
import '../entities/course_entity.dart';
import '../repositories/home_repository.dart';

class GetRecommendedCoursesUseCase {
  final HomeRepository repository;

  GetRecommendedCoursesUseCase(this.repository);

  Future<Either<Failure, List<CourseEntity>>> call() async {
    return await repository.getRecommendedCourses();
  }
}
