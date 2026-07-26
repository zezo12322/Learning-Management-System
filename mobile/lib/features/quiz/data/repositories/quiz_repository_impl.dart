import 'package:optimatech_lms/features/quiz/data/datasources/quiz_remote_datasource.dart';
import 'package:optimatech_lms/features/quiz/data/models/quiz_attempt_model.dart';
import 'package:optimatech_lms/features/quiz/data/models/quiz_result_model.dart';
import 'package:optimatech_lms/features/quiz/data/models/take_quiz_model.dart';
import 'package:optimatech_lms/features/quiz/domain/repositories/quiz_repository.dart';

class QuizRepositoryImpl implements QuizRepository {
  final QuizRemoteDataSource remoteDataSource;

  const QuizRepositoryImpl({required this.remoteDataSource});

  @override
  Future<TakeQuizModel> getQuizForTaking(String courseId, String quizId) =>
      remoteDataSource.getQuizForTaking(courseId, quizId);

  @override
  Future<QuizAttemptModel> startAttempt(String courseId, String quizId) =>
      remoteDataSource.startAttempt(courseId, quizId);

  @override
  Future<void> submitAnswer(
    String courseId,
    String quizId,
    String attemptId, {
    required String questionId,
    required String optionId,
  }) =>
      remoteDataSource.submitAnswer(
        courseId,
        quizId,
        attemptId,
        questionId: questionId,
        optionId: optionId,
      );

  @override
  Future<QuizResultModel> finishAttempt(
    String courseId,
    String quizId,
    String attemptId,
  ) =>
      remoteDataSource.finishAttempt(courseId, quizId, attemptId);
}
