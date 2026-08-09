import 'package:firebase_auth/firebase_auth.dart';
import 'package:optimatech_lms/core/utils/constants.dart';
import 'package:optimatech_lms/core/error/exceptions.dart';
import 'package:optimatech_lms/core/helper_function/lecture_type.dart';
import 'package:optimatech_lms/core/network/api_service.dart';
import 'package:optimatech_lms/features/course_learning/data/models/curriculum_model.dart';
import 'package:optimatech_lms/features/course_learning/data/models/lecture_content_model.dart';
import 'package:optimatech_lms/core/error/user_facing_message.dart';

abstract class CourseLearningRemoteDataSource {
  Future<CourseCurriculumModel> getCourseCurriculum(String courseId);
  Future<LectureContentModel> getLectureContent(String lectureId);

  /// Synchronous write, for the explicit "mark complete" action where the
  /// caller needs the result now.
  Future<void> updateLectureProgress(String lectureId, int lastWatchedSecond, {bool completed = false});

  /// Fire-and-forget heartbeat while the video plays.
  Future<void> recordLectureProgress(String lectureId, int lastWatchedSecond);
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
      throw CustomExceptions(message: userFacingMessage(e));
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
          // `AppConstants.baseUrl`, not `AppConfig.apiBaseUrl`: those are two
          // independent sources of truth that only agree by coincidence. The
          // rest of the app (ApiService) uses AppConstants, so with
          // `useLocalBackend = true` the manifest would point at production
          // while every other call went to localhost — and the player scopes
          // the auth header to the host AppConstants names.
          videoUrl: '${AppConstants.baseUrl}/lectures/$lectureId/stream/manifest',
        );
      }
      return model;
    } catch (e) {
      throw CustomExceptions(message: userFacingMessage(e));
    }
  }

  @override
  Future<void> updateLectureProgress(String lectureId, int lastWatchedSecond, {bool completed = false}) async {
    try {
      await _setAuthToken();
      // PUT is the synchronous path — it writes through Data Connect and
      // returns the derived completion, which is what "mark complete" needs.
      await apiService.put('/lectures/$lectureId/progress', data: {
        'lastWatchedSecond': lastWatchedSecond,
        'completed': completed,
      });
    } catch (e) {
      throw CustomExceptions(message: userFacingMessage(e));
    }
  }

  /// `POST /lectures/:lectureId/progress` — validates, enqueues, and answers
  /// 202 without touching the database. The queue collapses a burst of
  /// heartbeats for the same (user, lecture) into one pending job, so a player
  /// reporting every 10 seconds costs one write per lecture rather than one per
  /// tick. The controller says as much: heartbeats belong here, and the
  /// synchronous PUT is kept for explicit actions.
  @override
  Future<void> recordLectureProgress(String lectureId, int lastWatchedSecond) async {
    try {
      await _setAuthToken();
      await apiService.post('/lectures/$lectureId/progress', data: {
        'lastWatchedSecond': lastWatchedSecond,
      });
    } catch (e) {
      throw CustomExceptions(message: userFacingMessage(e));
    }
  }
}