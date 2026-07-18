import 'package:dartz/dartz.dart';
import 'package:optimatech_lms/core/error/failures.dart';
import 'package:optimatech_lms/features/courses/domain/entities/courses_entity.dart';
import 'package:optimatech_lms/features/courses/domain/entities/enrolled_course_entity.dart';

abstract class CoursesRepository {
  /// Returns published courses list.
  Future<Either<Failure, List<CourseEntity>>> getPublishedCourses();
  
  /// Returns enrolled courses for continuing learning.
  Future<Either<Failure, List<EnrolledCourseEntity>>> getContinueLearning();
  
  /// Returns recommended courses based on user's interests.
  Future<Either<Failure, List<CourseEntity>>> getRecommended({int limit = 10});
}
