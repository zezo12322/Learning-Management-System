import 'package:equatable/equatable.dart';
import 'package:optimatech_lms/features/quiz/data/models/quiz_result_model.dart';
import 'package:optimatech_lms/features/quiz/data/models/take_quiz_model.dart';

abstract class QuizState extends Equatable {
  const QuizState();

  @override
  List<Object?> get props => [];
}

class QuizInitial extends QuizState {}

class QuizLoading extends QuizState {}

class QuizError extends QuizState {
  final String message;
  const QuizError(this.message);

  @override
  List<Object?> get props => [message];
}

class QuizTaking extends QuizState {
  final TakeQuizModel quiz;
  final String attemptId;
  final int currentIndex;

  /// questionId -> selected optionId
  final Map<String, String> answers;
  final bool isFinishing;

  const QuizTaking({
    required this.quiz,
    required this.attemptId,
    this.currentIndex = 0,
    this.answers = const {},
    this.isFinishing = false,
  });

  QuizTaking copyWith({
    int? currentIndex,
    Map<String, String>? answers,
    bool? isFinishing,
  }) {
    return QuizTaking(
      quiz: quiz,
      attemptId: attemptId,
      currentIndex: currentIndex ?? this.currentIndex,
      answers: answers ?? this.answers,
      isFinishing: isFinishing ?? this.isFinishing,
    );
  }

  bool get isLastQuestion => currentIndex >= quiz.questions.length - 1;
  int get answeredCount => answers.length;

  @override
  List<Object?> get props => [quiz.id, attemptId, currentIndex, answers, isFinishing];
}

class QuizFinished extends QuizState {
  final QuizResultModel result;
  const QuizFinished(this.result);

  @override
  List<Object?> get props => [result.score, result.maxScore, result.passed];
}
