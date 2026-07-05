import 'package:dartz/dartz.dart';
import 'package:optimatech_lms/core/error/failures.dart';
import 'package:optimatech_lms/features/home/domain/entities/course_entity.dart';
import '../repositories/home_repository.dart';

class GetPopularCoursesUseCase {
  final HomeRepository repository;

  GetPopularCoursesUseCase(this.repository);

  Future<Either<Failure, List<CourseEntity>>> call() async {
    return await repository.getPopularCourses();
  }
}
