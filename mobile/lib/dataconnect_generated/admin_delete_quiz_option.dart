part of 'generated.dart';

class AdminDeleteQuizOptionVariablesBuilder {
  String optionId;

  final FirebaseDataConnect _dataConnect;
  AdminDeleteQuizOptionVariablesBuilder(this._dataConnect, {required  this.optionId,});
  Deserializer<AdminDeleteQuizOptionData> dataDeserializer = (dynamic json)  => AdminDeleteQuizOptionData.fromJson(jsonDecode(json));
  Serializer<AdminDeleteQuizOptionVariables> varsSerializer = (AdminDeleteQuizOptionVariables vars) => jsonEncode(vars.toJson());
  Future<OperationResult<AdminDeleteQuizOptionData, AdminDeleteQuizOptionVariables>> execute() {
    return ref().execute();
  }

  MutationRef<AdminDeleteQuizOptionData, AdminDeleteQuizOptionVariables> ref() {
    AdminDeleteQuizOptionVariables vars= AdminDeleteQuizOptionVariables(optionId: optionId,);
    return _dataConnect.mutation("AdminDeleteQuizOption", dataDeserializer, varsSerializer, vars);
  }
}

@immutable
class AdminDeleteQuizOptionQuizOptionDelete {
  final String id;
  AdminDeleteQuizOptionQuizOptionDelete.fromJson(dynamic json):
  
  id = nativeFromJson<String>(json['id']);
  @override
  bool operator ==(Object other) {
    if(identical(this, other)) {
      return true;
    }
    if(other.runtimeType != runtimeType) {
      return false;
    }

    final AdminDeleteQuizOptionQuizOptionDelete otherTyped = other as AdminDeleteQuizOptionQuizOptionDelete;
    return id == otherTyped.id;
    
  }
  @override
  int get hashCode => id.hashCode;
  

  Map<String, dynamic> toJson() {
    Map<String, dynamic> json = {};
    json['id'] = nativeToJson<String>(id);
    return json;
  }

  AdminDeleteQuizOptionQuizOptionDelete({
    required this.id,
  });
}

@immutable
class AdminDeleteQuizOptionData {
  final AdminDeleteQuizOptionQuizOptionDelete? quizOption_delete;
  AdminDeleteQuizOptionData.fromJson(dynamic json):
  
  quizOption_delete = json['quizOption_delete'] == null ? null : AdminDeleteQuizOptionQuizOptionDelete.fromJson(json['quizOption_delete']);
  @override
  bool operator ==(Object other) {
    if(identical(this, other)) {
      return true;
    }
    if(other.runtimeType != runtimeType) {
      return false;
    }

    final AdminDeleteQuizOptionData otherTyped = other as AdminDeleteQuizOptionData;
    return quizOption_delete == otherTyped.quizOption_delete;
    
  }
  @override
  int get hashCode => quizOption_delete.hashCode;
  

  Map<String, dynamic> toJson() {
    Map<String, dynamic> json = {};
    if (quizOption_delete != null) {
      json['quizOption_delete'] = quizOption_delete!.toJson();
    }
    return json;
  }

  AdminDeleteQuizOptionData({
    this.quizOption_delete,
  });
}

@immutable
class AdminDeleteQuizOptionVariables {
  final String optionId;
  @Deprecated('fromJson is deprecated for Variable classes as they are no longer required for deserialization.')
  AdminDeleteQuizOptionVariables.fromJson(Map<String, dynamic> json):
  
  optionId = nativeFromJson<String>(json['optionId']);
  @override
  bool operator ==(Object other) {
    if(identical(this, other)) {
      return true;
    }
    if(other.runtimeType != runtimeType) {
      return false;
    }

    final AdminDeleteQuizOptionVariables otherTyped = other as AdminDeleteQuizOptionVariables;
    return optionId == otherTyped.optionId;
    
  }
  @override
  int get hashCode => optionId.hashCode;
  

  Map<String, dynamic> toJson() {
    Map<String, dynamic> json = {};
    json['optionId'] = nativeToJson<String>(optionId);
    return json;
  }

  AdminDeleteQuizOptionVariables({
    required this.optionId,
  });
}

