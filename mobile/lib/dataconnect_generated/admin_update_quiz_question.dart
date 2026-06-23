part of 'generated.dart';

class AdminUpdateQuizQuestionVariablesBuilder {
  String questionId;
  final Optional<String> _questionText = Optional.optional(nativeFromJson, nativeToJson);
  final Optional<double> _points = Optional.optional(nativeFromJson, nativeToJson);
  final Optional<String> _explanation = Optional.optional(nativeFromJson, nativeToJson);

  final FirebaseDataConnect _dataConnect;  AdminUpdateQuizQuestionVariablesBuilder questionText(String? t) {
   _questionText.value = t;
   return this;
  }
  AdminUpdateQuizQuestionVariablesBuilder points(double? t) {
   _points.value = t;
   return this;
  }
  AdminUpdateQuizQuestionVariablesBuilder explanation(String? t) {
   _explanation.value = t;
   return this;
  }

  AdminUpdateQuizQuestionVariablesBuilder(this._dataConnect, {required  this.questionId,});
  Deserializer<AdminUpdateQuizQuestionData> dataDeserializer = (dynamic json)  => AdminUpdateQuizQuestionData.fromJson(jsonDecode(json));
  Serializer<AdminUpdateQuizQuestionVariables> varsSerializer = (AdminUpdateQuizQuestionVariables vars) => jsonEncode(vars.toJson());
  Future<OperationResult<AdminUpdateQuizQuestionData, AdminUpdateQuizQuestionVariables>> execute() {
    return ref().execute();
  }

  MutationRef<AdminUpdateQuizQuestionData, AdminUpdateQuizQuestionVariables> ref() {
    AdminUpdateQuizQuestionVariables vars= AdminUpdateQuizQuestionVariables(questionId: questionId,questionText: _questionText,points: _points,explanation: _explanation,);
    return _dataConnect.mutation('AdminUpdateQuizQuestion', dataDeserializer, varsSerializer, vars);
  }
}

@immutable
class AdminUpdateQuizQuestionQuizQuestionUpdate {
  final String id;
  AdminUpdateQuizQuestionQuizQuestionUpdate.fromJson(dynamic json):
  
  id = nativeFromJson<String>(json['id']);
  @override
  bool operator ==(Object other) {
    if(identical(this, other)) {
      return true;
    }
    if(other.runtimeType != runtimeType) {
      return false;
    }

    final AdminUpdateQuizQuestionQuizQuestionUpdate otherTyped = other as AdminUpdateQuizQuestionQuizQuestionUpdate;
    return id == otherTyped.id;
    
  }
  @override
  int get hashCode => id.hashCode;
  

  Map<String, dynamic> toJson() {
    Map<String, dynamic> json = {};
    json['id'] = nativeToJson<String>(id);
    return json;
  }

  AdminUpdateQuizQuestionQuizQuestionUpdate({
    required this.id,
  });
}

@immutable
class AdminUpdateQuizQuestionData {
  final AdminUpdateQuizQuestionQuizQuestionUpdate? quizQuestion_update;
  AdminUpdateQuizQuestionData.fromJson(dynamic json):
  
  quizQuestion_update = json['quizQuestion_update'] == null ? null : AdminUpdateQuizQuestionQuizQuestionUpdate.fromJson(json['quizQuestion_update']);
  @override
  bool operator ==(Object other) {
    if(identical(this, other)) {
      return true;
    }
    if(other.runtimeType != runtimeType) {
      return false;
    }

    final AdminUpdateQuizQuestionData otherTyped = other as AdminUpdateQuizQuestionData;
    return quizQuestion_update == otherTyped.quizQuestion_update;
    
  }
  @override
  int get hashCode => quizQuestion_update.hashCode;
  

  Map<String, dynamic> toJson() {
    Map<String, dynamic> json = {};
    if (quizQuestion_update != null) {
      json['quizQuestion_update'] = quizQuestion_update!.toJson();
    }
    return json;
  }

  AdminUpdateQuizQuestionData({
    this.quizQuestion_update,
  });
}

@immutable
class AdminUpdateQuizQuestionVariables {
  final String questionId;
  late final Optional<String>questionText;
  late final Optional<double>points;
  late final Optional<String>explanation;
  @Deprecated('fromJson is deprecated for Variable classes as they are no longer required for deserialization.')
  AdminUpdateQuizQuestionVariables.fromJson(Map<String, dynamic> json):
  
  questionId = nativeFromJson<String>(json['questionId']) {
  
  
  
    questionText = Optional.optional(nativeFromJson, nativeToJson);
    questionText.value = json['questionText'] == null ? null : nativeFromJson<String>(json['questionText']);
  
  
    points = Optional.optional(nativeFromJson, nativeToJson);
    points.value = json['points'] == null ? null : nativeFromJson<double>(json['points']);
  
  
    explanation = Optional.optional(nativeFromJson, nativeToJson);
    explanation.value = json['explanation'] == null ? null : nativeFromJson<String>(json['explanation']);
  
  }
  @override
  bool operator ==(Object other) {
    if(identical(this, other)) {
      return true;
    }
    if(other.runtimeType != runtimeType) {
      return false;
    }

    final AdminUpdateQuizQuestionVariables otherTyped = other as AdminUpdateQuizQuestionVariables;
    return questionId == otherTyped.questionId && 
    questionText == otherTyped.questionText && 
    points == otherTyped.points && 
    explanation == otherTyped.explanation;
    
  }
  @override
  int get hashCode => Object.hashAll([questionId.hashCode, questionText.hashCode, points.hashCode, explanation.hashCode]);
  

  Map<String, dynamic> toJson() {
    Map<String, dynamic> json = {};
    json['questionId'] = nativeToJson<String>(questionId);
    if(questionText.state == OptionalState.set) {
      json['questionText'] = questionText.toJson();
    }
    if(points.state == OptionalState.set) {
      json['points'] = points.toJson();
    }
    if(explanation.state == OptionalState.set) {
      json['explanation'] = explanation.toJson();
    }
    return json;
  }

  AdminUpdateQuizQuestionVariables({
    required this.questionId,
    required this.questionText,
    required this.points,
    required this.explanation,
  });
}

