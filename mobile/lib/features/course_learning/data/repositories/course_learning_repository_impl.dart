import 'package:dartz/dartz.dart';
import 'package:easy_localization/easy_localization.dart';
import 'package:optimatech_lms/core/error/exceptions.dart';
import 'package:optimatech_lms/core/error/failures.dart';
import 'package:optimatech_lms/features/course_learning/data/datasources/course_learning_remote_datasource.dart';
import 'package:optimatech_lms/features/course_learning/domain/entities/course_curriculum_entity.dart';
import 'package:optimatech_lms/features/course_learning/domain/entities/lecture_content_entity.dart';
import '../../domain/repositories/course_learning_repository.dart';

class CourseLearningRepositoryImpl implements CourseLearningRepository {
  final CourseLearningRemoteDataSource _remoteDataSource;

  CourseLearningRepositoryImpl({required CourseLearningRemoteDataSource remoteDataSource}) : _remoteDataSource = remoteDataSource;
  // @override
  // Future<Either<Failure, bool>> getCourseAccess({required String courseId}) {
  //   // TDO: implement getCourseAccess
  //   throw UnimplementedError();
  // }
  //
  // @override
  // Future<Either<Failure, bool>> getCourseCompletionStatus({required String courseId}) {
  //   // TDO: implement getCourseCompletionStatus
  //   throw UnimplementedError();
  // }

  @override
  Future<Either<Failure, CourseCurriculumEntity>> getCourseCurriculum({required String courseId}) async{
    try{
      final courseCurriculum = await _remoteDataSource.getCourseCurriculum(courseId);
      return right(courseCurriculum.toEntity());
    }on CustomExceptions catch(e){
      return left(ServerFailure(e.message));
    }catch (e){
      return left(ServerFailure('auth.error.genericError'.tr()));
    }
  }

  @override
  Future<Either<Failure, LectureContentEntity>> getLectureContent({required String lectureId}) async {
    try{
      final lectureContent = await _remoteDataSource.getLectureContent(lectureId);
      return right(lectureContent.toEntity());
    }on CustomExceptions catch(e){
      return left(ServerFailure(e.message));
    }catch (e){
      return left(ServerFailure('auth.error.genericError'.tr()));
    }
  }

  // @override
  // getUserLectureProgress({required String lectureId}) {
  //   // TDO: implement getUserLectureProgress
  //   throw UnimplementedError();
  // }

  // @override
  // Future<Either<Failure, void>> markEnrollmentCompleted({required String courseId}) {
  //   // TDO: implement markEnrollmentCompleted
  //   throw UnimplementedError();
  // }
  //
  // @override
  // Future<Either<Failure, void>> updateLectureProgress({required String lectureId, required int lastWatchedSecond, String? completedAtIso}) {
  //   // TDO: implement updateLectureProgress
  //   throw UnimplementedError();
  // }
}
