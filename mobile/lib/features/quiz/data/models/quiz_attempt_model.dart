class QuizAttemptModel {
  final String attemptId;

  const QuizAttemptModel({required this.attemptId});

  /// `POST /courses/:courseId/quizzes/:quizId/attempts` returns the Data Connect
  /// mutation result verbatim, and `StartQuizAttempt` is a bare
  /// `quizAttempt_insert` (`dataconnect/default/quizzes.gql:24-26`) — so the id
  /// arrives wrapped:
  ///
  /// ```json
  /// { "quizAttempt_insert": { "id": "…" } }
  /// ```
  ///
  /// The previous version looked under `attempt` and then at the top level, and
  /// coalesced a miss to `''` — which produced request paths with an empty
  /// segment (`/attempts//answers`) instead of an error anyone could see. The
  /// wrapper is checked first now, and an id that cannot be found throws.
  factory QuizAttemptModel.fromJson(Map<String, dynamic> json) {
    final candidates = <dynamic>[
      json['quizAttempt_insert'],
      json['attempt'],
      json,
    ];

    for (final candidate in candidates) {
      if (candidate is! Map) continue;
      final source = Map<String, dynamic>.from(candidate);
      final id = (source['id'] ?? source['attemptId'])?.toString();
      if (id != null && id.isNotEmpty) {
        return QuizAttemptModel(attemptId: id);
      }
    }

    throw const FormatException(
      'Quiz attempt response carried no attempt id (expected quizAttempt_insert.id)',
    );
  }
}
