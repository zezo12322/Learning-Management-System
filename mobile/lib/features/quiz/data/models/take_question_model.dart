import 'take_option_model.dart';

class TakeQuestionModel {
  final String id;
  final String questionText;
  final int points;
  final List<TakeOptionModel> options;

  const TakeQuestionModel({
    required this.id,
    required this.questionText,
    required this.points,
    required this.options,
  });

  factory TakeQuestionModel.fromJson(Map<String, dynamic> json) {
    final rawOptions = (json['takeOptions'] ?? json['options'] ?? []) as List;
    return TakeQuestionModel(
      id: (json['id'] ?? '').toString(),
      questionText: (json['questionText'] ?? json['text'] ?? '').toString(),
      points: json['points'] is num ? (json['points'] as num).toInt() : 1,
      options: rawOptions
          .whereType<Map>()
          .map((o) => TakeOptionModel.fromJson(Map<String, dynamic>.from(o)))
          .toList(),
    );
  }
}
