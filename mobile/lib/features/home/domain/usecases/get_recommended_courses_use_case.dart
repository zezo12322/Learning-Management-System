import 'package:dartz/dartz.dart';
import 'package:optimatech_lms/core/error/failures.dart';
import 'package:optimatech_lms/features/home/domain/usecases/home_use_case.dart';
import '../entities/home_course_entity.dart';
import '../repositories/home_repository.dart';

class GetRecommendedCoursesUseCase
    extends HomeUseCase<List<HomeCourseEntity>, NoParams> {
  final HomeRepository homeRepository;

  GetRecommendedCoursesUseCase(this.homeRepository);

  @override
  Future<Either<Failure, List<HomeCourseEntity>>> call(
    NoParams? params,
  ) async =>
      await homeRepository.getRecommendedCourses();
}
