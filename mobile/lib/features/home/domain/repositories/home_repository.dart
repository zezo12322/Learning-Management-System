import 'package:dartz/dartz.dart';
import 'package:optimatech_lms/core/error/failures.dart';
import '../entities/course_entity.dart';
import '../entities/student_progress_entity.dart';

abstract class HomeRepository {
  Future<Either<Failure, StudentProgressEntity?>> getContinueLearningCourses();
  Future<Either<Failure, List<CourseEntity>>> getPopularCourses();
  Future<Either<Failure, List<CourseEntity>>> getRecommendedCourses();
}
