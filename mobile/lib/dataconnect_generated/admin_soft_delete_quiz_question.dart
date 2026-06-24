part of 'generated.dart';

class AdminSoftDeleteQuizQuestionVariablesBuilder {
  String questionId;

  final FirebaseDataConnect _dataConnect;
  AdminSoftDeleteQuizQuestionVariablesBuilder(this._dataConnect, {required  this.questionId,});
  Deserializer<AdminSoftDeleteQuizQuestionData> dataDeserializer = (dynamic json)  => AdminSoftDeleteQuizQuestionData.fromJson(jsonDecode(json));
  Serializer<AdminSoftDeleteQuizQuestionVariables> varsSerializer = (AdminSoftDeleteQuizQuestionVariables vars) => jsonEncode(vars.toJson());
  Future<OperationResult<AdminSoftDeleteQuizQuestionData, AdminSoftDeleteQuizQuestionVariables>> execute() {
    return ref().execute();
  }

  MutationRef<AdminSoftDeleteQuizQuestionData, AdminSoftDeleteQuizQuestionVariables> ref() {
    AdminSoftDeleteQuizQuestionVariables vars= AdminSoftDeleteQuizQuestionVariables(questionId: questionId,);
    return _dataConnect.mutation("AdminSoftDeleteQuizQuestion", dataDeserializer, varsSerializer, vars);
  }
}

@immutable
class AdminSoftDeleteQuizQuestionQuizQuestionUpdate {
  final String id;
  AdminSoftDeleteQuizQuestionQuizQuestionUpdate.fromJson(dynamic json):
  
  id = nativeFromJson<String>(json['id']);
  @override
  bool operator ==(Object other) {
    if(identical(this, other)) {
      return true;
    }
    if(other.runtimeType != runtimeType) {
      return false;
    }

    final AdminSoftDeleteQuizQuestionQuizQuestionUpdate otherTyped = other as AdminSoftDeleteQuizQuestionQuizQuestionUpdate;
    return id == otherTyped.id;
    
  }
  @override
  int get hashCode => id.hashCode;
  

  Map<String, dynamic> toJson() {
    Map<String, dynamic> json = {};
    json['id'] = nativeToJson<String>(id);
    return json;
  }

  AdminSoftDeleteQuizQuestionQuizQuestionUpdate({
    required this.id,
  });
}

@immutable
class AdminSoftDeleteQuizQuestionData {
  final AdminSoftDeleteQuizQuestionQuizQuestionUpdate? quizQuestion_update;
  AdminSoftDeleteQuizQuestionData.fromJson(dynamic json):
  
  quizQuestion_update = json['quizQuestion_update'] == null ? null : AdminSoftDeleteQuizQuestionQuizQuestionUpdate.fromJson(json['quizQuestion_update']);
  @override
  bool operator ==(Object other) {
    if(identical(this, other)) {
      return true;
    }
    if(other.runtimeType != runtimeType) {
      return false;
    }

    final AdminSoftDeleteQuizQuestionData otherTyped = other as AdminSoftDeleteQuizQuestionData;
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

  AdminSoftDeleteQuizQuestionData({
    this.quizQuestion_update,
  });
}

@immutable
class AdminSoftDeleteQuizQuestionVariables {
  final String questionId;
  @Deprecated('fromJson is deprecated for Variable classes as they are no longer required for deserialization.')
  AdminSoftDeleteQuizQuestionVariables.fromJson(Map<String, dynamic> json):
  
  questionId = nativeFromJson<String>(json['questionId']);
  @override
  bool operator ==(Object other) {
    if(identical(this, other)) {
      return true;
    }
    if(other.runtimeType != runtimeType) {
      return false;
    }

    final AdminSoftDeleteQuizQuestionVariables otherTyped = other as AdminSoftDeleteQuizQuestionVariables;
    return questionId == otherTyped.questionId;
    
  }
  @override
  int get hashCode => questionId.hashCode;
  

  Map<String, dynamic> toJson() {
    Map<String, dynamic> json = {};
    json['questionId'] = nativeToJson<String>(questionId);
    return json;
  }

  AdminSoftDeleteQuizQuestionVariables({
    required this.questionId,
  });
}

