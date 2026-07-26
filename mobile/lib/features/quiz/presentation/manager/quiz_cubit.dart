import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:optimatech_lms/features/quiz/domain/repositories/quiz_repository.dart';
import 'package:optimatech_lms/features/quiz/presentation/manager/quiz_state.dart';

class QuizCubit extends Cubit<QuizState> {
  final QuizRepository repository;

  QuizCubit(this.repository) : super(QuizInitial());

  String _courseId = '';
  String _quizId = '';

  Future<void> start(String courseId, String quizId) async {
    _courseId = courseId;
    _quizId = quizId;
    emit(QuizLoading());
    try {
      final quiz = await repository.getQuizForTaking(courseId, quizId);
      final attempt = await repository.startAttempt(courseId, quizId);
      emit(QuizTaking(quiz: quiz, attemptId: attempt.attemptId));
    } catch (e) {
      emit(QuizError(e.toString()));
    }
  }

  void selectOption(String questionId, String optionId) {
    final s = state;
    if (s is QuizTaking && !s.isFinishing) {
      final updated = Map<String, String>.from(s.answers)..[questionId] = optionId;
      emit(s.copyWith(answers: updated));
    }
  }

  void goToIndex(int index) {
    final s = state;
    if (s is QuizTaking && index >= 0 && index < s.quiz.questions.length) {
      emit(s.copyWith(currentIndex: index));
    }
  }

  void next() {
    final s = state;
    if (s is QuizTaking) goToIndex(s.currentIndex + 1);
  }

  void previous() {
    final s = state;
    if (s is QuizTaking) goToIndex(s.currentIndex - 1);
  }

  /// Submits all collected answers, then finishes the attempt.
  Future<void> finish() async {
    final s = state;
    if (s is! QuizTaking || s.isFinishing) return;
    emit(s.copyWith(isFinishing: true));
    try {
      for (final entry in s.answers.entries) {
        await repository.submitAnswer(
          _courseId,
          _quizId,
          s.attemptId,
          questionId: entry.key,
          optionId: entry.value,
        );
      }
      final result = await repository.finishAttempt(_courseId, _quizId, s.attemptId);
      emit(QuizFinished(result));
    } catch (e) {
      emit(QuizError(e.toString()));
    }
  }

  Future<void> retry() => start(_courseId, _quizId);
}
