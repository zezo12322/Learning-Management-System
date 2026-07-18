import 'package:dartz/dartz.dart';
import 'package:easy_localization/easy_localization.dart';
import 'package:optimatech_lms/core/error/exceptions.dart';
import 'package:optimatech_lms/core/error/failures.dart';
import 'package:optimatech_lms/features/courses/domain/entities/courses_entity.dart';
import 'package:optimatech_lms/features/courses/domain/entities/enrolled_course_entity.dart';

import '../../domain/repositories/courses_repository.dart';
import '../datasources/courses_remote_datasource/courses_remote_datasource.dart';

class CoursesRepositoryImpl implements CoursesRepository {
  final CoursesRemoteDatasource _remoteDatasource;
  CoursesRepositoryImpl(this._remoteDatasource);

  @override
  Future<Either<Failure, List<CourseEntity>>> getPublishedCourses() async{
    try{
      final courses = await _remoteDatasource.getPublishedCourses();
      return right(courses.map((c) => c.toEntity()).toList());
    }on CustomExceptions catch(e){
      return left(ServerFailure(e.message));
    }catch (e){
      return left(ServerFailure('auth.error.genericError'.tr()));
    }
  }

  @override
  Future<Either<Failure, List<EnrolledCourseEntity>>> getContinueLearning() async {
    try {
      final courses = await _remoteDatasource.getContinueLearning();
      return right(courses.map((c) => c.toEntity()).toList());
    } on CustomExceptions catch (e) {
      return left(ServerFailure(e.message));
    } catch (e) {
      return left(ServerFailure('auth.error.genericError'.tr()));
    }
  }

  @override
  Future<Either<Failure, List<CourseEntity>>> getRecommended({int limit = 10}) async {
    try {
      final courses = await _remoteDatasource.getRecommended(limit: limit);
      return right(courses.map((c) => c.toEntity()).toList());
    } on CustomExceptions catch (e) {
      return left(ServerFailure(e.message));
    } catch (e) {
      return left(ServerFailure('auth.error.genericError'.tr()));
    }
  }
}
