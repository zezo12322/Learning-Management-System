import 'package:firebase_auth/firebase_auth.dart';
import 'package:optimatech_lms/core/network/api_service.dart';
import 'package:optimatech_lms/features/quiz/data/models/quiz_attempt_model.dart';
import 'package:optimatech_lms/features/quiz/data/models/quiz_result_model.dart';
import 'package:optimatech_lms/features/quiz/data/models/take_quiz_model.dart';

abstract class QuizRemoteDataSource {
  /// Resolves the quiz attached to a lecture, so a QUIZ lecture in the player
  /// can open the quiz screen. Returns `null` when the lecture has no quiz.
  Future<String?> getQuizIdForLecture(String courseId, String lectureId);

  Future<TakeQuizModel> getQuizForTaking(String courseId, String quizId);
  Future<QuizAttemptModel> startAttempt(String courseId, String quizId);
  Future<void> submitAnswer(
    String courseId,
    String quizId,
    String attemptId, {
    required String questionId,
    required String optionId,
  });
  Future<QuizResultModel> finishAttempt(
    String courseId,
    String quizId,
    String attemptId,
  );
}

class QuizRemoteDataSourceImpl implements QuizRemoteDataSource {
  final ApiService apiService;

  const QuizRemoteDataSourceImpl({required this.apiService});

  Future<void> _setAuthToken() async {
    final user = FirebaseAuth.instance.currentUser;
    if (user != null) {
      final token = await user.getIdToken();
      if (token != null) {
        apiService.setAuthToken(token);
      }
    }
  }

  /// Backend IDs are UUIDs; some callers pass the 32-char dashless form.
  String _fmt(String id) =>
      (id.length == 32 && !id.contains('-'))
          ? '${id.substring(0, 8)}-${id.substring(8, 12)}-${id.substring(12, 16)}-${id.substring(16, 20)}-${id.substring(20)}'
          : id;

  Map<String, dynamic> _asMap(dynamic data) =>
      data is Map ? Map<String, dynamic>.from(data) : <String, dynamic>{};

  /// `GET /courses/:courseId/lectures/:lectureId/quiz`
  /// (`backend/src/quizzes/quizzes.controller.ts:68`). It is gated to the course
  /// owner, an admin previewing, or an actively-enrolled student, and answers
  /// 404 when the lecture has no quiz — which is a normal outcome here, not an
  /// error, so it maps to `null`.
  ///
  /// This endpoint is why the quiz screen can have an entry point at all: the
  /// note on `QuizViewArgs` said no such route existed, and that stopped being
  /// true when this one shipped.
  @override
  Future<String?> getQuizIdForLecture(String courseId, String lectureId) async {
    try {
      await _setAuthToken();
      final response = await apiService
          .get('/courses/${_fmt(courseId)}/lectures/${_fmt(lectureId)}/quiz');
      final id = _asMap(response.data)['id']?.toString();
      return (id == null || id.isEmpty) ? null : id;
    } catch (_) {
      // No quiz for this lecture, or it is not visible to this caller.
      return null;
    }
  }

  @override
  Future<TakeQuizModel> getQuizForTaking(String courseId, String quizId) async {
    try {
      await _setAuthToken();
      final response = await apiService
          .get('/courses/${_fmt(courseId)}/quizzes/${_fmt(quizId)}/questions');
      return TakeQuizModel.fromJson(_asMap(response.data), quizId: quizId);
    } catch (e) {
      throw Exception('Failed to fetch quiz: $e');
    }
  }

  @override
  Future<QuizAttemptModel> startAttempt(String courseId, String quizId) async {
    try {
      await _setAuthToken();
      final response = await apiService.post(
        '/courses/${_fmt(courseId)}/quizzes/${_fmt(quizId)}/attempts',
        data: {},
      );
      return QuizAttemptModel.fromJson(_asMap(response.data));
    } catch (e) {
      throw Exception('Failed to start quiz attempt: $e');
    }
  }

  @override
  Future<void> submitAnswer(
    String courseId,
    String quizId,
    String attemptId, {
    required String questionId,
    required String optionId,
  }) async {
    try {
      await _setAuthToken();
      await apiService.post(
        '/courses/${_fmt(courseId)}/quizzes/${_fmt(quizId)}/attempts/${_fmt(attemptId)}/answers',
        // `selectedOptionId`, not `optionId`: that is the field name on
        // `SubmitAnswerDto` (backend/src/quizzes/dto/quiz.dto.ts:138), and the
        // global ValidationPipe runs with `forbidNonWhitelisted: true` — so an
        // unknown key is a 400, not a silently ignored extra.
        data: {'questionId': questionId, 'selectedOptionId': optionId},
      );
    } catch (e) {
      throw Exception('Failed to submit answer: $e');
    }
  }

  @override
  Future<QuizResultModel> finishAttempt(
    String courseId,
    String quizId,
    String attemptId,
  ) async {
    try {
      await _setAuthToken();
      final response = await apiService.post(
        '/courses/${_fmt(courseId)}/quizzes/${_fmt(quizId)}/attempts/${_fmt(attemptId)}/finish',
        data: {},
      );
      return QuizResultModel.fromJson(_asMap(response.data));
    } catch (e) {
      throw Exception('Failed to finish quiz: $e');
    }
  }
}
