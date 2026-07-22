part of 'generated.dart';

class FinishQuizAttemptIfOpenVariablesBuilder {
  String attemptId;
  double score;
  bool passed;

  final FirebaseDataConnect _dataConnect;
  FinishQuizAttemptIfOpenVariablesBuilder(this._dataConnect, {required  this.attemptId,required  this.score,required  this.passed,});
  Deserializer<FinishQuizAttemptIfOpenData> dataDeserializer = (dynamic json)  => FinishQuizAttemptIfOpenData.fromJson(jsonDecode(json));
  Serializer<FinishQuizAttemptIfOpenVariables> varsSerializer = (FinishQuizAttemptIfOpenVariables vars) => jsonEncode(vars.toJson());
  Future<OperationResult<FinishQuizAttemptIfOpenData, FinishQuizAttemptIfOpenVariables>> execute() {
    return ref().execute();
  }

  MutationRef<FinishQuizAttemptIfOpenData, FinishQuizAttemptIfOpenVariables> ref() {
    FinishQuizAttemptIfOpenVariables vars= FinishQuizAttemptIfOpenVariables(attemptId: attemptId,score: score,passed: passed,);
    return _dataConnect.mutation("FinishQuizAttemptIfOpen", dataDeserializer, varsSerializer, vars);
  }
}

@immutable
class FinishQuizAttemptIfOpenData {
  final int quizAttempt_updateMany;
  FinishQuizAttemptIfOpenData.fromJson(dynamic json):
  
  quizAttempt_updateMany = nativeFromJson<int>(json['quizAttempt_updateMany']);
  @override
  bool operator ==(Object other) {
    if(identical(this, other)) {
      return true;
    }
    if(other.runtimeType != runtimeType) {
      return false;
    }

    final FinishQuizAttemptIfOpenData otherTyped = other as FinishQuizAttemptIfOpenData;
    return quizAttempt_updateMany == otherTyped.quizAttempt_updateMany;
    
  }
  @override
  int get hashCode => quizAttempt_updateMany.hashCode;
  

  Map<String, dynamic> toJson() {
    Map<String, dynamic> json = {};
    json['quizAttempt_updateMany'] = nativeToJson<int>(quizAttempt_updateMany);
    return json;
  }

  FinishQuizAttemptIfOpenData({
    required this.quizAttempt_updateMany,
  });
}

@immutable
class FinishQuizAttemptIfOpenVariables {
  final String attemptId;
  final double score;
  final bool passed;
  @Deprecated('fromJson is deprecated for Variable classes as they are no longer required for deserialization.')
  FinishQuizAttemptIfOpenVariables.fromJson(Map<String, dynamic> json):
  
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

    final FinishQuizAttemptIfOpenVariables otherTyped = other as FinishQuizAttemptIfOpenVariables;
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

  FinishQuizAttemptIfOpenVariables({
    required this.attemptId,
    required this.score,
    required this.passed,
  });
}

