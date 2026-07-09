import 'package:dartz/dartz.dart';
import 'package:optimatech_lms/core/error/exceptions.dart';
import 'package:optimatech_lms/core/error/failures.dart';
import 'package:optimatech_lms/features/home/data/datasources/home_remote_data_source.dart';
import 'package:optimatech_lms/features/home/domain/entities/course_entity.dart';
import 'package:optimatech_lms/features/home/domain/entities/student_progress_entity.dart';
import 'package:optimatech_lms/features/home/domain/repositories/home_repository.dart';

class HomeRepositoryImpl implements HomeRepository {
  final HomeRemoteDataSource remoteDataSource;

  HomeRepositoryImpl(this.remoteDataSource);

  @override
  Future<Either<Failure, StudentProgressEntity?>>
      getContinueLearningCourses() async {
    try {
      final result = await remoteDataSource.getContinueLearningCourses();
      return Right<Failure, StudentProgressEntity?>(result);
    } on ServerException catch (e) {
      return Left<Failure, StudentProgressEntity?>(ServerFailure(e.message));
    } catch (e) {
      return Left<Failure, StudentProgressEntity?>(ServerFailure(e.toString()));
    }
  }

  @override
  Future<Either<Failure, List<HomeCourseEntity>>> getPopularCourses() async {
    try {
      final result = await remoteDataSource.getPopularCourses();
      return Right<Failure, List<HomeCourseEntity>>(result);
    } on ServerException catch (e) {
      return Left<Failure, List<HomeCourseEntity>>(ServerFailure(e.message));
    } catch (e) {
      return Left<Failure, List<HomeCourseEntity>>(ServerFailure(e.toString()));
    }
  }

  @override
  Future<Either<Failure, List<HomeCourseEntity>>>
      getRecommendedCourses() async {
    try {
      final result = await remoteDataSource.getRecommendedCourses();
      return Right<Failure, List<HomeCourseEntity>>(result);
    } on ServerException catch (e) {
      return Left<Failure, List<HomeCourseEntity>>(ServerFailure(e.message));
    } catch (e) {
      return Left<Failure, List<HomeCourseEntity>>(ServerFailure(e.toString()));
    }
  }
}
