import 'package:firebase_auth/firebase_auth.dart';
import 'package:optimatech_lms/core/network/api_service.dart';
import 'package:optimatech_lms/features/quiz/data/models/quiz_attempt_model.dart';
import 'package:optimatech_lms/features/quiz/data/models/quiz_result_model.dart';
import 'package:optimatech_lms/features/quiz/data/models/take_quiz_model.dart';

abstract class QuizRemoteDataSource {
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
        '/courses/${_fmt(courseId)}/quizzes/${_fmt(quizId)}/attempts/$attemptId/answers',
        data: {'questionId': questionId, 'optionId': optionId},
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
        '/courses/${_fmt(courseId)}/quizzes/${_fmt(quizId)}/attempts/$attemptId/finish',
        data: {},
      );
      return QuizResultModel.fromJson(_asMap(response.data));
    } catch (e) {
      throw Exception('Failed to finish quiz: $e');
    }
  }
}
