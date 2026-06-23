part of 'generated.dart';

class FinishQuizAttemptVariablesBuilder {
  String attemptId;
  double score;
  bool passed;

  final FirebaseDataConnect _dataConnect;
  FinishQuizAttemptVariablesBuilder(this._dataConnect, {required  this.attemptId,required  this.score,required  this.passed,});
  Deserializer<FinishQuizAttemptData> dataDeserializer = (dynamic json)  => FinishQuizAttemptData.fromJson(jsonDecode(json));
  Serializer<FinishQuizAttemptVariables> varsSerializer = (FinishQuizAttemptVariables vars) => jsonEncode(vars.toJson());
  Future<OperationResult<FinishQuizAttemptData, FinishQuizAttemptVariables>> execute() {
    return ref().execute();
  }

  MutationRef<FinishQuizAttemptData, FinishQuizAttemptVariables> ref() {
    FinishQuizAttemptVariables vars= FinishQuizAttemptVariables(attemptId: attemptId,score: score,passed: passed,);
    return _dataConnect.mutation('FinishQuizAttempt', dataDeserializer, varsSerializer, vars);
  }
}

@immutable
class FinishQuizAttemptQuizAttemptUpdate {
  final String id;
  FinishQuizAttemptQuizAttemptUpdate.fromJson(dynamic json):
  
  id = nativeFromJson<String>(json['id']);
  @override
  bool operator ==(Object other) {
    if(identical(this, other)) {
      return true;
    }
    if(other.runtimeType != runtimeType) {
      return false;
    }

    final FinishQuizAttemptQuizAttemptUpdate otherTyped = other as FinishQuizAttemptQuizAttemptUpdate;
    return id == otherTyped.id;
    
  }
  @override
  int get hashCode => id.hashCode;
  

  Map<String, dynamic> toJson() {
    Map<String, dynamic> json = {};
    json['id'] = nativeToJson<String>(id);
    return json;
  }

  FinishQuizAttemptQuizAttemptUpdate({
    required this.id,
  });
}

@immutable
class FinishQuizAttemptData {
  final FinishQuizAttemptQuizAttemptUpdate? quizAttempt_update;
  FinishQuizAttemptData.fromJson(dynamic json):
  
  quizAttempt_update = json['quizAttempt_update'] == null ? null : FinishQuizAttemptQuizAttemptUpdate.fromJson(json['quizAttempt_update']);
  @override
  bool operator ==(Object other) {
    if(identical(this, other)) {
      return true;
    }
    if(other.runtimeType != runtimeType) {
      return false;
    }

    final FinishQuizAttemptData otherTyped = other as FinishQuizAttemptData;
    return quizAttempt_update == otherTyped.quizAttempt_update;
    
  }
  @override
  int get hashCode => quizAttempt_update.hashCode;
  

  Map<String, dynamic> toJson() {
    Map<String, dynamic> json = {};
    if (quizAttempt_update != null) {
      json['quizAttempt_update'] = quizAttempt_update!.toJson();
    }
    return json;
  }

  FinishQuizAttemptData({
    this.quizAttempt_update,
  });
}

@immutable
class FinishQuizAttemptVariables {
  final String attemptId;
  final double score;
  final bool passed;
  @Deprecated('fromJson is deprecated for Variable classes as they are no longer required for deserialization.')
  FinishQuizAttemptVariables.fromJson(Map<String, dynamic> json):
  
  attemptId = nativeFromJson<String>(json['attemptId']),
  score = nativeFromJson<double>(json['score']),
  passed = nativeFromJson<bool>(json['passed']);
  @override
  bool operator ==(Object other) {
    if(identical(this, other)) {
      return true;
    }
    if(other.runtimeType != runtimeType) {
      return false;
    }

    final FinishQuizAttemptVariables otherTyped = other as FinishQuizAttemptVariables;
    return attemptId == otherTyped.attemptId && 
    score == otherTyped.score && 
    passed == otherTyped.passed;
    
  }
  @override
  int get hashCode => Object.hashAll([attemptId.hashCode, score.hashCode, passed.hashCode]);
  

  Map<String, dynamic> toJson() {
    Map<String, dynamic> json = {};
    json['attemptId'] = nativeToJson<String>(attemptId);
    json['score'] = nativeToJson<double>(score);
    json['passed'] = nativeToJson<bool>(passed);
    return json;
  }

  FinishQuizAttemptVariables({
    required this.attemptId,
    required this.score,
    required this.passed,
  });
}

