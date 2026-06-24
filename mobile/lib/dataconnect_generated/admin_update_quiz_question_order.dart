part of 'generated.dart';

class AdminUpdateQuizQuestionOrderVariablesBuilder {
  String questionId;
  int order;

  final FirebaseDataConnect _dataConnect;
  AdminUpdateQuizQuestionOrderVariablesBuilder(this._dataConnect, {required  this.questionId,required  this.order,});
  Deserializer<AdminUpdateQuizQuestionOrderData> dataDeserializer = (dynamic json)  => AdminUpdateQuizQuestionOrderData.fromJson(jsonDecode(json));
  Serializer<AdminUpdateQuizQuestionOrderVariables> varsSerializer = (AdminUpdateQuizQuestionOrderVariables vars) => jsonEncode(vars.toJson());
  Future<OperationResult<AdminUpdateQuizQuestionOrderData, AdminUpdateQuizQuestionOrderVariables>> execute() {
    return ref().execute();
  }

  MutationRef<AdminUpdateQuizQuestionOrderData, AdminUpdateQuizQuestionOrderVariables> ref() {
    AdminUpdateQuizQuestionOrderVariables vars= AdminUpdateQuizQuestionOrderVariables(questionId: questionId,order: order,);
    return _dataConnect.mutation("AdminUpdateQuizQuestionOrder", dataDeserializer, varsSerializer, vars);
  }
}

@immutable
class AdminUpdateQuizQuestionOrderQuizQuestionUpdate {
  final String id;
  AdminUpdateQuizQuestionOrderQuizQuestionUpdate.fromJson(dynamic json):
  
  id = nativeFromJson<String>(json['id']);
  @override
  bool operator ==(Object other) {
    if(identical(this, other)) {
      return true;
    }
    if(other.runtimeType != runtimeType) {
      return false;
    }

    final AdminUpdateQuizQuestionOrderQuizQuestionUpdate otherTyped = other as AdminUpdateQuizQuestionOrderQuizQuestionUpdate;
    return id == otherTyped.id;
    
  }
  @override
  int get hashCode => id.hashCode;
  

  Map<String, dynamic> toJson() {
    Map<String, dynamic> json = {};
    json['id'] = nativeToJson<String>(id);
    return json;
  }

  AdminUpdateQuizQuestionOrderQuizQuestionUpdate({
    required this.id,
  });
}

@immutable
class AdminUpdateQuizQuestionOrderData {
  final AdminUpdateQuizQuestionOrderQuizQuestionUpdate? quizQuestion_update;
  AdminUpdateQuizQuestionOrderData.fromJson(dynamic json):
  
  quizQuestion_update = json['quizQuestion_update'] == null ? null : AdminUpdateQuizQuestionOrderQuizQuestionUpdate.fromJson(json['quizQuestion_update']);
  @override
  bool operator ==(Object other) {
    if(identical(this, other)) {
      return true;
    }
    if(other.runtimeType != runtimeType) {
      return false;
    }

    final AdminUpdateQuizQuestionOrderData otherTyped = other as AdminUpdateQuizQuestionOrderData;
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

  AdminUpdateQuizQuestionOrderData({
    this.quizQuestion_update,
  });
}

@immutable
class AdminUpdateQuizQuestionOrderVariables {
  final String questionId;
  final int order;
  @Deprecated('fromJson is deprecated for Variable classes as they are no longer required for deserialization.')
  AdminUpdateQuizQuestionOrderVariables.fromJson(Map<String, dynamic> json):
  
  questionId = nativeFromJson<String>(json['questionId']),
  order = nativeFromJson<int>(json['order']);
  @override
  bool operator ==(Object other) {
    if(identical(this, other)) {
      return true;
    }
    if(other.runtimeType != runtimeType) {
      return false;
    }

    final AdminUpdateQuizQuestionOrderVariables otherTyped = other as AdminUpdateQuizQuestionOrderVariables;
    return questionId == otherTyped.questionId && 
    order == otherTyped.order;
    
  }
  @override
  int get hashCode => Object.hashAll([questionId.hashCode, order.hashCode]);
  

  Map<String, dynamic> toJson() {
    Map<String, dynamic> json = {};
    json['questionId'] = nativeToJson<String>(questionId);
    json['order'] = nativeToJson<int>(order);
    return json;
  }

  AdminUpdateQuizQuestionOrderVariables({
    required this.questionId,
    required this.order,
  });
}

