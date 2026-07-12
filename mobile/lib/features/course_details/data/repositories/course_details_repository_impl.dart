import 'package:optimatech_lms/features/course_details/data/data_source/course_details_remote_data_source.dart';
import 'package:optimatech_lms/features/course_details/domain/entities/course_curriculum_entity.dart';
import 'package:optimatech_lms/features/course_details/domain/repositories/course_details_repository.dart';

class CourseDetailsRepositoryImpl implements CourseDetailsRepository {
  final CourseDetailsRemoteDataSource remoteDataSource;

  const CourseDetailsRepositoryImpl({required this.remoteDataSource});

  @override
  Future<CourseCurriculumEntity> getCourseCurriculum(String courseId) async {
    return await remoteDataSource.getCourseCurriculum(courseId);
  }

  @override
  Future<void> enrollInCourse(String courseId) async {
    return await remoteDataSource.enrollInCourse(courseId);
  }
}
