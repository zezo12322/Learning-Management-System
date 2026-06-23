part of 'generated.dart';

class GetQuizAttemptByIdVariablesBuilder {
  String attemptId;

  final FirebaseDataConnect _dataConnect;
  GetQuizAttemptByIdVariablesBuilder(this._dataConnect, {required  this.attemptId,});
  Deserializer<GetQuizAttemptByIdData> dataDeserializer = (dynamic json)  => GetQuizAttemptByIdData.fromJson(jsonDecode(json));
  Serializer<GetQuizAttemptByIdVariables> varsSerializer = (GetQuizAttemptByIdVariables vars) => jsonEncode(vars.toJson());
  Future<QueryResult<GetQuizAttemptByIdData, GetQuizAttemptByIdVariables>> execute({QueryFetchPolicy fetchPolicy = QueryFetchPolicy.preferCache}) {
    return ref().execute(fetchPolicy: fetchPolicy);
  }

  QueryRef<GetQuizAttemptByIdData, GetQuizAttemptByIdVariables> ref() {
    GetQuizAttemptByIdVariables vars= GetQuizAttemptByIdVariables(attemptId: attemptId,);
    return _dataConnect.query('GetQuizAttemptById', dataDeserializer, varsSerializer, vars);
  }
}

@immutable
class GetQuizAttemptByIdQuizAttempt {
  final String id;
  final Timestamp? completedAt;
  final Timestamp startedAt;
  final double? score;
  final bool? passed;
  final GetQuizAttemptByIdQuizAttemptUser user;
  final GetQuizAttemptByIdQuizAttemptQuiz quiz;
  GetQuizAttemptByIdQuizAttempt.fromJson(dynamic json):
  
  id = nativeFromJson<String>(json['id']),
  completedAt = json['completedAt'] == null ? null : Timestamp.fromJson(json['completedAt']),
  startedAt = Timestamp.fromJson(json['startedAt']),
  score = json['score'] == null ? null : nativeFromJson<double>(json['score']),
  passed = json['passed'] == null ? null : nativeFromJson<bool>(json['passed']),
  user = GetQuizAttemptByIdQuizAttemptUser.fromJson(json['user']),
  quiz = GetQuizAttemptByIdQuizAttemptQuiz.fromJson(json['quiz']);
  @override
  bool operator ==(Object other) {
    if(identical(this, other)) {
      return true;
    }
    if(other.runtimeType != runtimeType) {
      return false;
    }

    final GetQuizAttemptByIdQuizAttempt otherTyped = other as GetQuizAttemptByIdQuizAttempt;
    return id == otherTyped.id && 
    completedAt == otherTyped.completedAt && 
    startedAt == otherTyped.startedAt && 
    score == otherTyped.score && 
    passed == otherTyped.passed && 
    user == otherTyped.user && 
    quiz == otherTyped.quiz;
    
  }
  @override
  int get hashCode => Object.hashAll([id.hashCode, completedAt.hashCode, startedAt.hashCode, score.hashCode, passed.hashCode, user.hashCode, quiz.hashCode]);
  

  Map<String, dynamic> toJson() {
    Map<String, dynamic> json = {};
    json['id'] = nativeToJson<String>(id);
    if (completedAt != null) {
      json['completedAt'] = completedAt!.toJson();
    }
    json['startedAt'] = startedAt.toJson();
    if (score != null) {
      json['score'] = nativeToJson<double?>(score);
    }
    if (passed != null) {
      json['passed'] = nativeToJson<bool?>(passed);
    }
    json['user'] = user.toJson();
    json['quiz'] = quiz.toJson();
    return json;
  }

  GetQuizAttemptByIdQuizAttempt({
    required this.id,
    this.completedAt,
    required this.startedAt,
    this.score,
    this.passed,
    required this.user,
    required this.quiz,
  });
}

@immutable
class GetQuizAttemptByIdQuizAttemptUser {
  final String id;
  GetQuizAttemptByIdQuizAttemptUser.fromJson(dynamic json):
  
  id = nativeFromJson<String>(json['id']);
  @override
  bool operator ==(Object other) {
    if(identical(this, other)) {
      return true;
    }
    if(other.runtimeType != runtimeType) {
      return false;
    }

    final GetQuizAttemptByIdQuizAttemptUser otherTyped = other as GetQuizAttemptByIdQuizAttemptUser;
    return id == otherTyped.id;
    
  }
  @override
  int get hashCode => id.hashCode;
  

  Map<String, dynamic> toJson() {
    Map<String, dynamic> json = {};
    json['id'] = nativeToJson<String>(id);
    return json;
  }

  GetQuizAttemptByIdQuizAttemptUser({
    required this.id,
  });
}

@immutable
class GetQuizAttemptByIdQuizAttemptQuiz {
  final String id;
  final double passingScore;
  final int maxAttempts;
  final int? timeLimitMinutes;
  GetQuizAttemptByIdQuizAttemptQuiz.fromJson(dynamic json):
  
  id = nativeFromJson<String>(json['id']),
  passingScore = nativeFromJson<double>(json['passingScore']),
  maxAttempts = nativeFromJson<int>(json['maxAttempts']),
  timeLimitMinutes = json['timeLimitMinutes'] == null ? null : nativeFromJson<int>(json['timeLimitMinutes']);
  @override
  bool operator ==(Object other) {
    if(identical(this, other)) {
      return true;
    }
    if(other.runtimeType != runtimeType) {
      return false;
    }

    final GetQuizAttemptByIdQuizAttemptQuiz otherTyped = other as GetQuizAttemptByIdQuizAttemptQuiz;
    return id == otherTyped.id && 
    passingScore == otherTyped.passingScore && 
    maxAttempts == otherTyped.maxAttempts && 
    timeLimitMinutes == otherTyped.timeLimitMinutes;
    
  }
  @override
  int get hashCode => Object.hashAll([id.hashCode, passingScore.hashCode, maxAttempts.hashCode, timeLimitMinutes.hashCode]);
  

  Map<String, dynamic> toJson() {
    Map<String, dynamic> json = {};
    json['id'] = nativeToJson<String>(id);
    json['passingScore'] = nativeToJson<double>(passingScore);
    json['maxAttempts'] = nativeToJson<int>(maxAttempts);
    if (timeLimitMinutes != null) {
      json['timeLimitMinutes'] = nativeToJson<int?>(timeLimitMinutes);
    }
    return json;
  }

  GetQuizAttemptByIdQuizAttemptQuiz({
    required this.id,
    required this.passingScore,
    required this.maxAttempts,
    this.timeLimitMinutes,
  });
}

@immutable
class GetQuizAttemptByIdData {
  final GetQuizAttemptByIdQuizAttempt? quizAttempt;
  GetQuizAttemptByIdData.fromJson(dynamic json):
  
  quizAttempt = json['quizAttempt'] == null ? null : GetQuizAttemptByIdQuizAttempt.fromJson(json['quizAttempt']);
  @override
  bool operator ==(Object other) {
    if(identical(this, other)) {
      return true;
    }
    if(other.runtimeType != runtimeType) {
      return false;
    }

    final GetQuizAttemptByIdData otherTyped = other as GetQuizAttemptByIdData;
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

  GetQuizAttemptByIdData({
    this.quizAttempt,
  });
}

@immutable
class GetQuizAttemptByIdVariables {
  final String attemptId;
  @Deprecated('fromJson is deprecated for Variable classes as they are no longer required for deserialization.')
  GetQuizAttemptByIdVariables.fromJson(Map<String, dynamic> json):
  
  attemptId = nativeFromJson<String>(json['attemptId']);
  @override
  bool operator ==(Object other) {
    if(identical(this, other)) {
      return true;
    }
    if(other.runtimeType != runtimeType) {
      return false;
    }

    final GetQuizAttemptByIdVariables otherTyped = other as GetQuizAttemptByIdVariables;
    return attemptId == otherTyped.attemptId;
    
  }
  @override
  int get hashCode => attemptId.hashCode;
  

  Map<String, dynamic> toJson() {
    Map<String, dynamic> json = {};
    json['attemptId'] = nativeToJson<String>(attemptId);
    return json;
  }

  GetQuizAttemptByIdVariables({
    required this.attemptId,
  });
}

