import 'package:dartz/dartz.dart';
import 'package:optimatech_lms/core/error/failures.dart';
import 'package:optimatech_lms/features/home/domain/entities/course_entity.dart';
import 'package:optimatech_lms/features/home/domain/usecases/home_use_case.dart';
import '../repositories/home_repository.dart';

class GetPopularCoursesUseCase
    extends HomeUseCase<List<HomeCourseEntity>, NoParams> {
  final HomeRepository repository;

  GetPopularCoursesUseCase(this.repository);

  @override
  Future<Either<Failure, List<HomeCourseEntity>>> call(NoParams? params) async {
    return await repository.getPopularCourses();
  }
}
