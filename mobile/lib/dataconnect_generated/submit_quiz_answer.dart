part of 'generated.dart';

class SubmitQuizAnswerVariablesBuilder {
  String attemptId;
  String questionId;
  int selectedIndex;

  final FirebaseDataConnect _dataConnect;
  SubmitQuizAnswerVariablesBuilder(this._dataConnect, {required  this.attemptId,required  this.questionId,required  this.selectedIndex,});
  Deserializer<SubmitQuizAnswerData> dataDeserializer = (dynamic json)  => SubmitQuizAnswerData.fromJson(jsonDecode(json));
  Serializer<SubmitQuizAnswerVariables> varsSerializer = (SubmitQuizAnswerVariables vars) => jsonEncode(vars.toJson());
  Future<OperationResult<SubmitQuizAnswerData, SubmitQuizAnswerVariables>> execute() {
    return ref().execute();
  }

  MutationRef<SubmitQuizAnswerData, SubmitQuizAnswerVariables> ref() {
    SubmitQuizAnswerVariables vars= SubmitQuizAnswerVariables(attemptId: attemptId,questionId: questionId,selectedIndex: selectedIndex,);
    return _dataConnect.mutation("SubmitQuizAnswer", dataDeserializer, varsSerializer, vars);
  }
}

@immutable
class SubmitQuizAnswerQuizAttemptAnswerInsert {
  final String attemptId;
  final String questionId;
  SubmitQuizAnswerQuizAttemptAnswerInsert.fromJson(dynamic json):
  
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

    final SubmitQuizAnswerQuizAttemptAnswerInsert otherTyped = other as SubmitQuizAnswerQuizAttemptAnswerInsert;
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

  SubmitQuizAnswerQuizAttemptAnswerInsert({
    required this.attemptId,
    required this.questionId,
  });
}

@immutable
class SubmitQuizAnswerData {
  final SubmitQuizAnswerQuizAttemptAnswerInsert quizAttemptAnswer_insert;
  SubmitQuizAnswerData.fromJson(dynamic json):
  
  quizAttemptAnswer_insert = SubmitQuizAnswerQuizAttemptAnswerInsert.fromJson(json['quizAttemptAnswer_insert']);
  @override
  bool operator ==(Object other) {
    if(identical(this, other)) {
      return true;
    }
    if(other.runtimeType != runtimeType) {
      return false;
    }

    final SubmitQuizAnswerData otherTyped = other as SubmitQuizAnswerData;
    return quizAttemptAnswer_insert == otherTyped.quizAttemptAnswer_insert;
    
  }
  @override
  int get hashCode => quizAttemptAnswer_insert.hashCode;
  

  Map<String, dynamic> toJson() {
    Map<String, dynamic> json = {};
    json['quizAttemptAnswer_insert'] = quizAttemptAnswer_insert.toJson();
    return json;
  }

  SubmitQuizAnswerData({
    required this.quizAttemptAnswer_insert,
  });
}

@immutable
class SubmitQuizAnswerVariables {
  final String attemptId;
  final String questionId;
  final int selectedIndex;
  @Deprecated('fromJson is deprecated for Variable classes as they are no longer required for deserialization.')
  SubmitQuizAnswerVariables.fromJson(Map<String, dynamic> json):
  
  attemptId = nativeFromJson<String>(json['attemptId']),
  questionId = nativeFromJson<String>(json['questionId']),
  selectedIndex = nativeFromJson<int>(json['selectedIndex']);
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
    selectedIndex == otherTyped.selectedIndex;
    
  }
  @override
  int get hashCode => Object.hashAll([attemptId.hashCode, questionId.hashCode, selectedIndex.hashCode]);
  

  Map<String, dynamic> toJson() {
    Map<String, dynamic> json = {};
    json['attemptId'] = nativeToJson<String>(attemptId);
    json['questionId'] = nativeToJson<String>(questionId);
    json['selectedIndex'] = nativeToJson<int>(selectedIndex);
    return json;
  }

  SubmitQuizAnswerVariables({
    required this.attemptId,
    required this.questionId,
    required this.selectedIndex,
  });
}

