import 'package:dartz/dartz.dart';
import 'package:optimatech_lms/core/error/failures.dart';
import '../entities/home_course_entity.dart';
import '../entities/student_progress_entity.dart';

abstract class HomeRepository {
  Future<Either<Failure, List<StudentProgressEntity>>>
      getContinueLearningCourses();
  Future<Either<Failure, List<HomeCourseEntity>>> getPopularCourses();
  Future<Either<Failure, List<HomeCourseEntity>>> getRecommendedCourses();
}
