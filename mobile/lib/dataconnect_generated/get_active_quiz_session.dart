part of 'generated.dart';

class GetActiveQuizSessionVariablesBuilder {
  String attemptId;

  final FirebaseDataConnect _dataConnect;
  GetActiveQuizSessionVariablesBuilder(this._dataConnect, {required  this.attemptId,});
  Deserializer<GetActiveQuizSessionData> dataDeserializer = (dynamic json)  => GetActiveQuizSessionData.fromJson(jsonDecode(json));
  Serializer<GetActiveQuizSessionVariables> varsSerializer = (GetActiveQuizSessionVariables vars) => jsonEncode(vars.toJson());
  Future<QueryResult<GetActiveQuizSessionData, GetActiveQuizSessionVariables>> execute({QueryFetchPolicy fetchPolicy = QueryFetchPolicy.preferCache}) {
    return ref().execute(fetchPolicy: fetchPolicy);
  }

  QueryRef<GetActiveQuizSessionData, GetActiveQuizSessionVariables> ref() {
    GetActiveQuizSessionVariables vars= GetActiveQuizSessionVariables(attemptId: attemptId,);
    return _dataConnect.query('GetActiveQuizSession', dataDeserializer, varsSerializer, vars);
  }
}

@immutable
class GetActiveQuizSessionQuizAttempt {
  final String id;
  final Timestamp startedAt;
  final Timestamp? completedAt;
  final GetActiveQuizSessionQuizAttemptQuiz quiz;
  GetActiveQuizSessionQuizAttempt.fromJson(dynamic json):
  
  id = nativeFromJson<String>(json['id']),
  startedAt = Timestamp.fromJson(json['startedAt']),
  completedAt = json['completedAt'] == null ? null : Timestamp.fromJson(json['completedAt']),
  quiz = GetActiveQuizSessionQuizAttemptQuiz.fromJson(json['quiz']);
  @override
  bool operator ==(Object other) {
    if(identical(this, other)) {
      return true;
    }
    if(other.runtimeType != runtimeType) {
      return false;
    }

    final GetActiveQuizSessionQuizAttempt otherTyped = other as GetActiveQuizSessionQuizAttempt;
    return id == otherTyped.id && 
    startedAt == otherTyped.startedAt && 
    completedAt == otherTyped.completedAt && 
    quiz == otherTyped.quiz;
    
  }
  @override
  int get hashCode => Object.hashAll([id.hashCode, startedAt.hashCode, completedAt.hashCode, quiz.hashCode]);
  

  Map<String, dynamic> toJson() {
    Map<String, dynamic> json = {};
    json['id'] = nativeToJson<String>(id);
    json['startedAt'] = startedAt.toJson();
    if (completedAt != null) {
      json['completedAt'] = completedAt!.toJson();
    }
    json['quiz'] = quiz.toJson();
    return json;
  }

  GetActiveQuizSessionQuizAttempt({
    required this.id,
    required this.startedAt,
    this.completedAt,
    required this.quiz,
  });
}

@immutable
class GetActiveQuizSessionQuizAttemptQuiz {
  final int? timeLimitMinutes;
  final double passingScore;
  GetActiveQuizSessionQuizAttemptQuiz.fromJson(dynamic json):
  
  timeLimitMinutes = json['timeLimitMinutes'] == null ? null : nativeFromJson<int>(json['timeLimitMinutes']),
  passingScore = nativeFromJson<double>(json['passingScore']);
  @override
  bool operator ==(Object other) {
    if(identical(this, other)) {
      return true;
    }
    if(other.runtimeType != runtimeType) {
      return false;
    }

    final GetActiveQuizSessionQuizAttemptQuiz otherTyped = other as GetActiveQuizSessionQuizAttemptQuiz;
    return timeLimitMinutes == otherTyped.timeLimitMinutes && 
    passingScore == otherTyped.passingScore;
    
  }
  @override
  int get hashCode => Object.hashAll([timeLimitMinutes.hashCode, passingScore.hashCode]);
  

  Map<String, dynamic> toJson() {
    Map<String, dynamic> json = {};
    if (timeLimitMinutes != null) {
      json['timeLimitMinutes'] = nativeToJson<int?>(timeLimitMinutes);
    }
    json['passingScore'] = nativeToJson<double>(passingScore);
    return json;
  }

  GetActiveQuizSessionQuizAttemptQuiz({
    this.timeLimitMinutes,
    required this.passingScore,
  });
}

@immutable
class GetActiveQuizSessionData {
  final GetActiveQuizSessionQuizAttempt? quizAttempt;
  GetActiveQuizSessionData.fromJson(dynamic json):
  
  quizAttempt = json['quizAttempt'] == null ? null : GetActiveQuizSessionQuizAttempt.fromJson(json['quizAttempt']);
  @override
  bool operator ==(Object other) {
    if(identical(this, other)) {
      return true;
    }
    if(other.runtimeType != runtimeType) {
      return false;
    }

    final GetActiveQuizSessionData otherTyped = other as GetActiveQuizSessionData;
    return quizAttempt == otherTyped.quizAttempt;
    
  }
  @override
  int get hashCode => quizAttempt.hashCode;
  

  Map<String, dynamic> toJson() {
    Map<String, dynamic> json = {};
    if (quizAttempt != null) {
      json['quizAttempt'] = quizAttempt!.toJson();
    }
    return json;
  }

  GetActiveQuizSessionData({
    this.quizAttempt,
  });
}

@immutable
class GetActiveQuizSessionVariables {
  final String attemptId;
  @Deprecated('fromJson is deprecated for Variable classes as they are no longer required for deserialization.')
  GetActiveQuizSessionVariables.fromJson(Map<String, dynamic> json):
  
  attemptId = nativeFromJson<String>(json['attemptId']);
  @override
  bool operator ==(Object other) {
    if(identical(this, other)) {
      return true;
    }
    if(other.runtimeType != runtimeType) {
      return false;
    }

    final GetActiveQuizSessionVariables otherTyped = other as GetActiveQuizSessionVariables;
    return attemptId == otherTyped.attemptId;
    
  }
  @override
  int get hashCode => attemptId.hashCode;
  

  Map<String, dynamic> toJson() {
    Map<String, dynamic> json = {};
    json['attemptId'] = nativeToJson<String>(attemptId);
    return json;
  }

  GetActiveQuizSessionVariables({
    required this.attemptId,
  });
}

