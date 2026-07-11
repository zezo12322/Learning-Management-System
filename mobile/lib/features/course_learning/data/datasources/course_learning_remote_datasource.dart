import 'package:firebase_auth/firebase_auth.dart';
import 'package:optimatech_lms/core/error/exceptions.dart';
import 'package:optimatech_lms/core/network/api_service.dart';
import 'package:optimatech_lms/features/course_learning/data/models/curriculum_model.dart';
import 'package:optimatech_lms/features/course_learning/data/models/lecture_content_model.dart';

abstract class CourseLearningRemoteDataSource {
  Future<CourseCurriculumModel> getCourseCurriculum(String courseId);
  Future<LectureContentModel> getLectureContent(String lectureId);
  Future<void> updateLectureProgress(String lectureId, int lastWatchedSecond, {bool completed = false});
}

class CourseLearningRemoteDataSourceImpl extends CourseLearningRemoteDataSource{
  final ApiService apiService;

  CourseLearningRemoteDataSourceImpl({required this.apiService});

  Future<void> _setAuthToken() async {
    final user = FirebaseAuth.instance.currentUser;
    if (user != null) {
      final token = await user.getIdToken();
      if (token != null) {
        apiService.setAuthToken(token);
      }
    }
  }

  @override
  Future<CourseCurriculumModel> getCourseCurriculum(String courseId) async{
    try{
      await _setAuthToken();
      // NestJS route: GET /api/v1/catalog/courses/:courseId/curriculum
      final response = await apiService.get('/api/v1/catalog/courses/$courseId/curriculum');
      return CourseCurriculumModel.fromJson(response.data);
    } catch (e){
      throw CustomExceptions(message: 'Failed to fetch Course Curriculum: $e');
    }
  }

  @override
  Future<LectureContentModel> getLectureContent(String lectureId) async {
    try {
      await _setAuthToken();
      // NestJS route: GET /api/v1/lectures/:lectureId
      final response = await apiService.get('/api/v1/lectures/$lectureId');
      return LectureContentModel.fromJson(response.data);
    } catch (e) {
      throw CustomExceptions(message: 'Failed to fetch Lecture Content: $e');
    }
  }

  @override
  Future<void> updateLectureProgress(String lectureId, int lastWatchedSecond, {bool completed = false}) async {
    try {
      await _setAuthToken();
      // NestJS route: PUT /api/v1/lectures/:lectureId/progress
      await apiService.put('/api/v1/lectures/$lectureId/progress', data: {
        'lastWatchedSecond': lastWatchedSecond,
        'completed': completed,
      });
    } catch (e) {
      throw CustomExceptions(message: 'Failed to update lecture progress: $e');
    }
  }
}