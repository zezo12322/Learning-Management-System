part of 'generated.dart';

class AdminUpdateQuizOptionOrderVariablesBuilder {
  String optionId;
  int order;

  final FirebaseDataConnect _dataConnect;
  AdminUpdateQuizOptionOrderVariablesBuilder(this._dataConnect, {required  this.optionId,required  this.order,});
  Deserializer<AdminUpdateQuizOptionOrderData> dataDeserializer = (dynamic json)  => AdminUpdateQuizOptionOrderData.fromJson(jsonDecode(json));
  Serializer<AdminUpdateQuizOptionOrderVariables> varsSerializer = (AdminUpdateQuizOptionOrderVariables vars) => jsonEncode(vars.toJson());
  Future<OperationResult<AdminUpdateQuizOptionOrderData, AdminUpdateQuizOptionOrderVariables>> execute() {
    return ref().execute();
  }

  MutationRef<AdminUpdateQuizOptionOrderData, AdminUpdateQuizOptionOrderVariables> ref() {
    AdminUpdateQuizOptionOrderVariables vars= AdminUpdateQuizOptionOrderVariables(optionId: optionId,order: order,);
    return _dataConnect.mutation("AdminUpdateQuizOptionOrder", dataDeserializer, varsSerializer, vars);
  }
}

@immutable
class AdminUpdateQuizOptionOrderQuizOptionUpdate {
  final String id;
  AdminUpdateQuizOptionOrderQuizOptionUpdate.fromJson(dynamic json):
  
  id = nativeFromJson<String>(json['id']);
  @override
  bool operator ==(Object other) {
    if(identical(this, other)) {
      return true;
    }
    if(other.runtimeType != runtimeType) {
      return false;
    }

    final AdminUpdateQuizOptionOrderQuizOptionUpdate otherTyped = other as AdminUpdateQuizOptionOrderQuizOptionUpdate;
    return id == otherTyped.id;
    
  }
  @override
  int get hashCode => id.hashCode;
  

  Map<String, dynamic> toJson() {
    Map<String, dynamic> json = {};
    json['id'] = nativeToJson<String>(id);
    return json;
  }

  AdminUpdateQuizOptionOrderQuizOptionUpdate({
    required this.id,
  });
}

@immutable
class AdminUpdateQuizOptionOrderData {
  final AdminUpdateQuizOptionOrderQuizOptionUpdate? quizOption_update;
  AdminUpdateQuizOptionOrderData.fromJson(dynamic json):
  
  quizOption_update = json['quizOption_update'] == null ? null : AdminUpdateQuizOptionOrderQuizOptionUpdate.fromJson(json['quizOption_update']);
  @override
  bool operator ==(Object other) {
    if(identical(this, other)) {
      return true;
    }
    if(other.runtimeType != runtimeType) {
      return false;
    }

    final AdminUpdateQuizOptionOrderData otherTyped = other as AdminUpdateQuizOptionOrderData;
    return quizOption_update == otherTyped.quizOption_update;
    
  }
  @override
  int get hashCode => quizOption_update.hashCode;
  

  Map<String, dynamic> toJson() {
    Map<String, dynamic> json = {};
    if (quizOption_update != null) {
      json['quizOption_update'] = quizOption_update!.toJson();
    }
    return json;
  }

  AdminUpdateQuizOptionOrderData({
    this.quizOption_update,
  });
}

@immutable
class AdminUpdateQuizOptionOrderVariables {
  final String optionId;
  final int order;
  @Deprecated('fromJson is deprecated for Variable classes as they are no longer required for deserialization.')
  AdminUpdateQuizOptionOrderVariables.fromJson(Map<String, dynamic> json):
  
  optionId = nativeFromJson<String>(json['optionId']),
  order = nativeFromJson<int>(json['order']);
  @override
  bool operator ==(Object other) {
    if(identical(this, other)) {
      return true;
    }
    if(other.runtimeType != runtimeType) {
      return false;
    }

    final AdminUpdateQuizOptionOrderVariables otherTyped = other as AdminUpdateQuizOptionOrderVariables;
    return optionId == otherTyped.optionId && 
    order == otherTyped.order;
    
  }
  @override
  int get hashCode => Object.hashAll([optionId.hashCode, order.hashCode]);
  

  Map<String, dynamic> toJson() {
    Map<String, dynamic> json = {};
    json['optionId'] = nativeToJson<String>(optionId);
    json['order'] = nativeToJson<int>(order);
    return json;
  }

  AdminUpdateQuizOptionOrderVariables({
    required this.optionId,
    required this.order,
  });
}

