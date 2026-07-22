part of 'generated.dart';

class GetExpiredAttemptsVariablesBuilder {
  
  final FirebaseDataConnect _dataConnect;
  GetExpiredAttemptsVariablesBuilder(this._dataConnect, );
  Deserializer<GetExpiredAttemptsData> dataDeserializer = (dynamic json)  => GetExpiredAttemptsData.fromJson(jsonDecode(json));
  
  Future<QueryResult<GetExpiredAttemptsData, void>> execute({QueryFetchPolicy fetchPolicy = QueryFetchPolicy.preferCache}) {
    return ref().execute(fetchPolicy: fetchPolicy);
  }

  QueryRef<GetExpiredAttemptsData, void> ref() {
    
    return _dataConnect.query("GetExpiredAttempts", dataDeserializer, emptySerializer, null);
  }
}

@immutable
class GetExpiredAttemptsQuizAttempts {
  final String id;
  final Timestamp startedAt;
  final GetExpiredAttemptsQuizAttemptsQuiz quiz;
  GetExpiredAttemptsQuizAttempts.fromJson(dynamic json):
  
  id = nativeFromJson<String>(json['id']),
  startedAt = Timestamp.fromJson(json['startedAt']),
  quiz = GetExpiredAttemptsQuizAttemptsQuiz.fromJson(json['quiz']);
  @override
  bool operator ==(Object other) {
    if(identical(this, other)) {
      return true;
    }
    if(other.runtimeType != runtimeType) {
      return false;
    }

    final GetExpiredAttemptsQuizAttempts otherTyped = other as GetExpiredAttemptsQuizAttempts;
    return id == otherTyped.id && 
    startedAt == otherTyped.startedAt && 
    quiz == otherTyped.quiz;
    
  }
  @override
  int get hashCode => Object.hashAll([id.hashCode, startedAt.hashCode, quiz.hashCode]);
  

  Map<String, dynamic> toJson() {
    Map<String, dynamic> json = {};
    json['id'] = nativeToJson<String>(id);
    json['startedAt'] = startedAt.toJson();
    json['quiz'] = quiz.toJson();
    return json;
  }

  GetExpiredAttemptsQuizAttempts({
    required this.id,
    required this.startedAt,
    required this.quiz,
  });
}

@immutable
class GetExpiredAttemptsQuizAttemptsQuiz {
  final String id;
  final int? timeLimitMinutes;
  GetExpiredAttemptsQuizAttemptsQuiz.fromJson(dynamic json):
  
  id = nativeFromJson<String>(json['id']),
  timeLimitMinutes = json['timeLimitMinutes'] == null ? null : nativeFromJson<int>(json['timeLimitMinutes']);
  @override
  bool operator ==(Object other) {
    if(identical(this, other)) {
      return true;
    }
    if(other.runtimeType != runtimeType) {
      return false;
    }

    final GetExpiredAttemptsQuizAttemptsQuiz otherTyped = other as GetExpiredAttemptsQuizAttemptsQuiz;
    return id == otherTyped.id && 
    timeLimitMinutes == otherTyped.timeLimitMinutes;
    
  }
  @override
  int get hashCode => Object.hashAll([id.hashCode, timeLimitMinutes.hashCode]);
  

  Map<String, dynamic> toJson() {
    Map<String, dynamic> json = {};
    json['id'] = nativeToJson<String>(id);
    if (timeLimitMinutes != null) {
      json['timeLimitMinutes'] = nativeToJson<int?>(timeLimitMinutes);
    }
    return json;
  }

  GetExpiredAttemptsQuizAttemptsQuiz({
    required this.id,
    this.timeLimitMinutes,
  });
}

@immutable
class GetExpiredAttemptsData {
  final List<GetExpiredAttemptsQuizAttempts> quizAttempts;
  GetExpiredAttemptsData.fromJson(dynamic json):
  
  quizAttempts = (json['quizAttempts'] as List<dynamic>)
        .map((e) => GetExpiredAttemptsQuizAttempts.fromJson(e))
        .toList();
  @override
  bool operator ==(Object other) {
    if(identical(this, other)) {
      return true;
    }
    if(other.runtimeType != runtimeType) {
      return false;
    }

    final GetExpiredAttemptsData otherTyped = other as GetExpiredAttemptsData;
    return quizAttempts == otherTyped.quizAttempts;
    
  }
  @override
  int get hashCode => quizAttempts.hashCode;
  

  Map<String, dynamic> toJson() {
    Map<String, dynamic> json = {};
    json['quizAttempts'] = quizAttempts.map((e) => e.toJson()).toList();
    return json;
  }

  GetExpiredAttemptsData({
    required this.quizAttempts,
  });
}

