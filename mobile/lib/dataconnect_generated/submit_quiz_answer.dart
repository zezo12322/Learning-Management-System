part of 'generated.dart';

class SubmitQuizAnswerVariablesBuilder {
  String attemptId;
  String questionId;
  String optionId;

  final FirebaseDataConnect _dataConnect;
  SubmitQuizAnswerVariablesBuilder(this._dataConnect, {required  this.attemptId,required  this.questionId,required  this.optionId,});
  Deserializer<SubmitQuizAnswerData> dataDeserializer = (dynamic json)  => SubmitQuizAnswerData.fromJson(jsonDecode(json));
  Serializer<SubmitQuizAnswerVariables> varsSerializer = (SubmitQuizAnswerVariables vars) => jsonEncode(vars.toJson());
  Future<OperationResult<SubmitQuizAnswerData, SubmitQuizAnswerVariables>> execute() {
    return ref().execute();
  }

  MutationRef<SubmitQuizAnswerData, SubmitQuizAnswerVariables> ref() {
    SubmitQuizAnswerVariables vars= SubmitQuizAnswerVariables(attemptId: attemptId,questionId: questionId,optionId: optionId,);
    return _dataConnect.mutation("SubmitQuizAnswer", dataDeserializer, varsSerializer, vars);
  }
}

@immutable
class SubmitQuizAnswerQuizAttemptAnswerUpsert {
  final String attemptId;
  final String questionId;
  SubmitQuizAnswerQuizAttemptAnswerUpsert.fromJson(dynamic json):
  
  attemptId = nativeFromJson<String>(json['attemptId']),
  questionId = nativeFromJson<String>(json['questionId']);
  @override
  bool operator ==(Object other) {
    if(identical(this, other)) {
      return true;
    }
    if(other.runtimeType != runtimeType) {
      return false;
    }

    final SubmitQuizAnswerQuizAttemptAnswerUpsert otherTyped = other as SubmitQuizAnswerQuizAttemptAnswerUpsert;
    return attemptId == otherTyped.attemptId && 
    questionId == otherTyped.questionId;
    
  }
  @override
  int get hashCode => Object.hashAll([attemptId.hashCode, questionId.hashCode]);
  

  Map<String, dynamic> toJson() {
    Map<String, dynamic> json = {};
    json['attemptId'] = nativeToJson<String>(attemptId);
    json['questionId'] = nativeToJson<String>(questionId);
    return json;
  }

  SubmitQuizAnswerQuizAttemptAnswerUpsert({
    required this.attemptId,
    required this.questionId,
  });
}

@immutable
class SubmitQuizAnswerData {
  final SubmitQuizAnswerQuizAttemptAnswerUpsert quizAttemptAnswer_upsert;
  SubmitQuizAnswerData.fromJson(dynamic json):
  
  quizAttemptAnswer_upsert = SubmitQuizAnswerQuizAttemptAnswerUpsert.fromJson(json['quizAttemptAnswer_upsert']);
  @override
  bool operator ==(Object other) {
    if(identical(this, other)) {
      return true;
    }
    if(other.runtimeType != runtimeType) {
      return false;
    }

    final SubmitQuizAnswerData otherTyped = other as SubmitQuizAnswerData;
    return quizAttemptAnswer_upsert == otherTyped.quizAttemptAnswer_upsert;
    
  }
  @override
  int get hashCode => quizAttemptAnswer_upsert.hashCode;
  

  Map<String, dynamic> toJson() {
    Map<String, dynamic> json = {};
    json['quizAttemptAnswer_upsert'] = quizAttemptAnswer_upsert.toJson();
    return json;
  }

  SubmitQuizAnswerData({
    required this.quizAttemptAnswer_upsert,
  });
}

@immutable
class SubmitQuizAnswerVariables {
  final String attemptId;
  final String questionId;
  final String optionId;
  @Deprecated('fromJson is deprecated for Variable classes as they are no longer required for deserialization.')
  SubmitQuizAnswerVariables.fromJson(Map<String, dynamic> json):
  
  attemptId = nativeFromJson<String>(json['attemptId']),
  questionId = nativeFromJson<String>(json['questionId']),
  optionId = nativeFromJson<String>(json['optionId']);
  @override
  bool operator ==(Object other) {
    if(identical(this, other)) {
      return true;
    }
    if(other.runtimeType != runtimeType) {
      return false;
    }

    final SubmitQuizAnswerVariables otherTyped = other as SubmitQuizAnswerVariables;
    return attemptId == otherTyped.attemptId && 
    questionId == otherTyped.questionId && 
    optionId == otherTyped.optionId;
    
  }
  @override
  int get hashCode => Object.hashAll([attemptId.hashCode, questionId.hashCode, optionId.hashCode]);
  

  Map<String, dynamic> toJson() {
    Map<String, dynamic> json = {};
    json['attemptId'] = nativeToJson<String>(attemptId);
    json['questionId'] = nativeToJson<String>(questionId);
    json['optionId'] = nativeToJson<String>(optionId);
    return json;
  }

  SubmitQuizAnswerVariables({
    required this.attemptId,
    required this.questionId,
    required this.optionId,
  });
}

