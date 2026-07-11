import 'package:optimatech_lms/core/network/api_service.dart';
import 'package:optimatech_lms/features/course_details/data/models/course_curriculum_model.dart';
import 'package:optimatech_lms/features/course_details/domain/entities/course_curriculum_entity.dart';
import 'package:firebase_auth/firebase_auth.dart';

abstract class CourseDetailsRemoteDataSource {
  Future<CourseCurriculumModel> getCourseCurriculum(String courseId);
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
      final response = await apiService.get('/api/v1/catalog/courses/$courseId/curriculum');
      return CourseCurriculumModel.fromJson(response.data, courseId);
    } catch (e) {
      throw Exception('Failed to fetch course curriculum: $e');
    }
  }
}

