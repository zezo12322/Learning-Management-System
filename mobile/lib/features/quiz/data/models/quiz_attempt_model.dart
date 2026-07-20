class QuizAttemptModel {
  final String attemptId;

  const QuizAttemptModel({required this.attemptId});

  factory QuizAttemptModel.fromJson(Map<String, dynamic> json) {
    // The backend may return the attempt under different shapes; be defensive.
    final attempt = json['attempt'];
    final source = attempt is Map ? Map<String, dynamic>.from(attempt) : json;
    return QuizAttemptModel(
      attemptId: (source['id'] ?? source['attemptId'] ?? '').toString(),
    );
  }
}
