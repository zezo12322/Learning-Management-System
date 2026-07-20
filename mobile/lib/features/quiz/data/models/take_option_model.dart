class TakeOptionModel {
  final String id;
  final String text;

  const TakeOptionModel({required this.id, required this.text});

  factory TakeOptionModel.fromJson(Map<String, dynamic> json) {
    return TakeOptionModel(
      id: (json['id'] ?? '').toString(),
      text: (json['text'] ?? json['optionText'] ?? '').toString(),
    );
  }
}
