class QuizResultModel {
  final double score;
  final double maxScore;
  final double? passingScore;
  final bool passed;

  const QuizResultModel({
    required this.score,
    required this.maxScore,
    this.passingScore,
    required this.passed,
  });

  factory QuizResultModel.fromJson(Map<String, dynamic> json) {
    final result = json['result'];
    final s = result is Map ? Map<String, dynamic>.from(result) : json;

    double toD(dynamic v) => v is num ? v.toDouble() : 0.0;

    final score = toD(s['score'] ?? s['earnedPoints'] ?? s['correct']);
    final maxScore = toD(s['maxScore'] ?? s['totalPoints'] ?? s['total']);
    final passing = s['passingScore'] is num ? (s['passingScore'] as num).toDouble() : null;

    bool passed;
    if (s['passed'] is bool) {
      passed = s['passed'] as bool;
    } else if (passing != null) {
      passed = score >= passing;
    } else {
      passed = maxScore > 0 && score >= (maxScore / 2);
    }

    return QuizResultModel(
      score: score,
      maxScore: maxScore,
      passingScore: passing,
      passed: passed,
    );
  }
}
