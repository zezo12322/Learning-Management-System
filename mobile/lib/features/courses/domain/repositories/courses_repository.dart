import 'package:dartz/dartz.dart';
import 'package:optimatech_lms/core/error/failures.dart';
import 'package:optimatech_lms/features/courses/domain/entities/courses_entity.dart';

abstract class CoursesRepository {
  /// Returns published courses list.
  Future<Either<Failure, List<CourseEntity>>> getPublishedCourses();
}
