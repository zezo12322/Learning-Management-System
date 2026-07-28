part of 'generated.dart';

class GetUserQuizAttemptsVariablesBuilder {
  String quizId;

  final FirebaseDataConnect _dataConnect;
  GetUserQuizAttemptsVariablesBuilder(this._dataConnect, {required  this.quizId,});
  Deserializer<GetUserQuizAttemptsData> dataDeserializer = (dynamic json)  => GetUserQuizAttemptsData.fromJson(jsonDecode(json));
  Serializer<GetUserQuizAttemptsVariables> varsSerializer = (GetUserQuizAttemptsVariables vars) => jsonEncode(vars.toJson());
  Future<QueryResult<GetUserQuizAttemptsData, GetUserQuizAttemptsVariables>> execute({QueryFetchPolicy fetchPolicy = QueryFetchPolicy.preferCache}) {
    return ref().execute(fetchPolicy: fetchPolicy);
  }

  QueryRef<GetUserQuizAttemptsData, GetUserQuizAttemptsVariables> ref() {
    GetUserQuizAttemptsVariables vars= GetUserQuizAttemptsVariables(quizId: quizId,);
    return _dataConnect.query("GetUserQuizAttempts", dataDeserializer, varsSerializer, vars);
  }
}

@immutable
class GetUserQuizAttemptsQuizAttempts {
  final String id;
  final Timestamp? completedAt;
  final double? score;
  final bool? passed;
  final Timestamp startedAt;
  GetUserQuizAttemptsQuizAttempts.fromJson(dynamic json):
  
  id = nativeFromJson<String>(json['id']),
  completedAt = json['completedAt'] == null ? null : Timestamp.fromJson(json['completedAt']),
  score = json['score'] == null ? null : nativeFromJson<double>(json['score']),
  passed = json['passed'] == null ? null : nativeFromJson<bool>(json['passed']),
  startedAt = Timestamp.fromJson(json['startedAt']);
  @override
  bool operator ==(Object other) {
    if(identical(this, other)) {
      return true;
    }
    if(other.runtimeType != runtimeType) {
      return false;
    }

    final GetUserQuizAttemptsQuizAttempts otherTyped = other as GetUserQuizAttemptsQuizAttempts;
    return id == otherTyped.id && 
    completedAt == otherTyped.completedAt && 
    score == otherTyped.score && 
    passed == otherTyped.passed && 
    startedAt == otherTyped.startedAt;
    
  }
  @override
  int get hashCode => Object.hashAll([id.hashCode, completedAt.hashCode, score.hashCode, passed.hashCode, startedAt.hashCode]);
  

  Map<String, dynamic> toJson() {
    Map<String, dynamic> json = {};
    json['id'] = nativeToJson<String>(id);
    if (completedAt != null) {
      json['completedAt'] = completedAt!.toJson();
    }
    if (score != null) {
      json['score'] = nativeToJson<double?>(score);
    }
    if (passed != null) {
      json['passed'] = nativeToJson<bool?>(passed);
    }
    json['startedAt'] = startedAt.toJson();
    return json;
  }

  GetUserQuizAttemptsQuizAttempts({
    required this.id,
    this.completedAt,
    this.score,
    this.passed,
    required this.startedAt,
  });
}

@immutable
class GetUserQuizAttemptsData {
  final List<GetUserQuizAttemptsQuizAttempts> quizAttempts;
  GetUserQuizAttemptsData.fromJson(dynamic json):
  
  quizAttempts = (json['quizAttempts'] as List<dynamic>)
        .map((e) => GetUserQuizAttemptsQuizAttempts.fromJson(e))
        .toList();
  @override
  bool operator ==(Object other) {
    if(identical(this, other)) {
      return true;
    }
    if(other.runtimeType != runtimeType) {
      return false;
    }

    final GetUserQuizAttemptsData otherTyped = other as GetUserQuizAttemptsData;
    return quizAttempts == otherTyped.quizAttempts;
    
  }
  @override
  int get hashCode => quizAttempts.hashCode;
  

  Map<String, dynamic> toJson() {
    Map<String, dynamic> json = {};
    json['quizAttempts'] = quizAttempts.map((e) => e.toJson()).toList();
    return json;
  }

  GetUserQuizAttemptsData({
    required this.quizAttempts,
  });
}

@immutable
class GetUserQuizAttemptsVariables {
  final String quizId;
  @Deprecated('fromJson is deprecated for Variable classes as they are no longer required for deserialization.')
  GetUserQuizAttemptsVariables.fromJson(Map<String, dynamic> json):
  
  quizId = nativeFromJson<String>(json['quizId']);
  @override
  bool operator ==(Object other) {
    if(identical(this, other)) {
      return true;
    }
    if(other.runtimeType != runtimeType) {
      return false;
    }

    final GetUserQuizAttemptsVariables otherTyped = other as GetUserQuizAttemptsVariables;
    return quizId == otherTyped.quizId;
    
  }
  @override
  int get hashCode => quizId.hashCode;
  

  Map<String, dynamic> toJson() {
    Map<String, dynamic> json = {};
    json['quizId'] = nativeToJson<String>(quizId);
    return json;
  }

  GetUserQuizAttemptsVariables({
    required this.quizId,
  });
}

