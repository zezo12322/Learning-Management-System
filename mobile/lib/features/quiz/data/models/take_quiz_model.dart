import 'take_question_model.dart';

class TakeQuizModel {
  final String id;
  final int? timeLimitMinutes;
  final List<TakeQuestionModel> questions;

  const TakeQuizModel({
    required this.id,
    this.timeLimitMinutes,
    required this.questions,
  });

  factory TakeQuizModel.fromJson(Map<String, dynamic> json, {String? quizId}) {
    final rawQuestions = (json['takeQuestions'] ?? json['questions'] ?? []) as List;
    return TakeQuizModel(
      id: (json['id'] ?? quizId ?? '').toString(),
      timeLimitMinutes:
          json['timeLimitMinutes'] is num ? (json['timeLimitMinutes'] as num).toInt() : null,
      questions: rawQuestions
          .whereType<Map>()
          .map((q) => TakeQuestionModel.fromJson(Map<String, dynamic>.from(q)))
          .toList(),
    );
  }
}
