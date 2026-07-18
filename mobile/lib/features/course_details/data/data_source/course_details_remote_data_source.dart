import 'package:optimatech_lms/core/network/api_service.dart';
import 'package:optimatech_lms/features/course_details/data/models/course_curriculum_model.dart';
import 'package:optimatech_lms/features/course_details/domain/entities/course_curriculum_entity.dart';
import 'package:firebase_auth/firebase_auth.dart';

abstract class CourseDetailsRemoteDataSource {
  Future<CourseCurriculumModel> getCourseCurriculum(String courseId);
  Future<void> enrollInCourse(String courseId);
}

class CourseDetailsRemoteDataSourceImpl
    implements CourseDetailsRemoteDataSource {
  final ApiService apiService;

  const CourseDetailsRemoteDataSourceImpl({required this.apiService});

  @override
  Future<CourseCurriculumModel> getCourseCurriculum(String courseId) async {
    try {
      final user = FirebaseAuth.instance.currentUser;
      if (user != null) {
        final token = await user.getIdToken();
        if (token != null) {
          apiService.setAuthToken(token);
        }
      }
      final formattedCourseId = courseId.length == 32 && !courseId.contains('-')
          ? '${courseId.substring(0, 8)}-${courseId.substring(8, 12)}-${courseId.substring(12, 16)}-${courseId.substring(16, 20)}-${courseId.substring(20)}'
          : courseId;
      final response = await apiService.get('/catalog/courses/$formattedCourseId/curriculum');
      return CourseCurriculumModel.fromJson(response.data, courseId);
    } catch (e) {
      throw Exception('Failed to fetch course curriculum: $e');
    }
  }

  @override
  Future<void> enrollInCourse(String courseId) async {
    try {
      final user = FirebaseAuth.instance.currentUser;
      if (user != null) {
        final token = await user.getIdToken();
        if (token != null) {
          apiService.setAuthToken(token);
        }
      }
      final formattedCourseId = courseId.length == 32 && !courseId.contains('-')
          ? '${courseId.substring(0, 8)}-${courseId.substring(8, 12)}-${courseId.substring(12, 16)}-${courseId.substring(16, 20)}-${courseId.substring(20)}'
          : courseId;
      await apiService.post('/courses/$formattedCourseId/enroll', data: {});
    } catch (e) {
      throw Exception('Failed to enroll in course: $e');
    }
  }
}

