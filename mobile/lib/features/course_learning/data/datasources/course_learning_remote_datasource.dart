import 'package:firebase_auth/firebase_auth.dart';
import 'package:optimatech_lms/core/config/app_config.dart';
import 'package:optimatech_lms/core/error/exceptions.dart';
import 'package:optimatech_lms/core/helper_function/lecture_type.dart';
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
      final response = await apiService.get('/catalog/courses/$courseId/curriculum');
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
      final response = await apiService.get('/lectures/$lectureId');
      final model = LectureContentModel.fromJson(response.data);

      // The `videoUrl` this endpoint returns is a signed URL to the raw
      // master.m3u8 in storage, whose segment and key URIs are *relative*. A
      // player resolving them drops the signature and every segment comes back
      // 403, so the raw URL is unplayable. The streaming endpoint serves the
      // same playlist with absolute signed segment URLs and a tokenised key
      // URL, so video lectures are pointed at that instead.
      if (model.type == LectureContentType.video && model.videoUrl != null) {
        return model.copyWith(
          videoUrl: '${AppConfig.apiBaseUrl}/lectures/$lectureId/stream/manifest',
        );
      }
      return model;
    } catch (e) {
      throw CustomExceptions(message: 'Failed to fetch Lecture Content: $e');
    }
  }

  @override
  Future<void> updateLectureProgress(String lectureId, int lastWatchedSecond, {bool completed = false}) async {
    try {
      await _setAuthToken();
      // NestJS route: PUT /api/v1/lectures/:lectureId/progress
      await apiService.put('/lectures/$lectureId/progress', data: {
        'lastWatchedSecond': lastWatchedSecond,
        'completed': completed,
      });
    } catch (e) {
      throw CustomExceptions(message: 'Failed to update lecture progress: $e');
    }
  }
}