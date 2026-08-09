import 'package:optimatech_lms/features/quiz/data/models/quiz_attempt_model.dart';
import 'package:optimatech_lms/features/quiz/data/models/quiz_result_model.dart';
import 'package:optimatech_lms/features/quiz/data/models/take_quiz_model.dart';

abstract class QuizRepository {
  /// Quiz id attached to a lecture, or `null` when there is none.
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
