part of 'generated.dart';

class AdminCancelSessionVariablesBuilder {
  String sessionId;

  final FirebaseDataConnect _dataConnect;
  AdminCancelSessionVariablesBuilder(this._dataConnect, {required  this.sessionId,});
  Deserializer<AdminCancelSessionData> dataDeserializer = (dynamic json)  => AdminCancelSessionData.fromJson(jsonDecode(json));
  Serializer<AdminCancelSessionVariables> varsSerializer = (AdminCancelSessionVariables vars) => jsonEncode(vars.toJson());
  Future<OperationResult<AdminCancelSessionData, AdminCancelSessionVariables>> execute() {
    return ref().execute();
  }

  MutationRef<AdminCancelSessionData, AdminCancelSessionVariables> ref() {
    AdminCancelSessionVariables vars= AdminCancelSessionVariables(sessionId: sessionId,);
    return _dataConnect.mutation("AdminCancelSession", dataDeserializer, varsSerializer, vars);
  }
}

@immutable
class AdminCancelSessionSessionUpdate {
  final String id;
  AdminCancelSessionSessionUpdate.fromJson(dynamic json):
  
  id = nativeFromJson<String>(json['id']);
  @override
  bool operator ==(Object other) {
    if(identical(this, other)) {
      return true;
    }
    if(other.runtimeType != runtimeType) {
      return false;
    }

    final AdminCancelSessionSessionUpdate otherTyped = other as AdminCancelSessionSessionUpdate;
    return id == otherTyped.id;
    
  }
  @override
  int get hashCode => id.hashCode;
  

  Map<String, dynamic> toJson() {
    Map<String, dynamic> json = {};
    json['id'] = nativeToJson<String>(id);
    return json;
  }

  AdminCancelSessionSessionUpdate({
    required this.id,
  });
}

@immutable
class AdminCancelSessionData {
  final AdminCancelSessionSessionUpdate? session_update;
  AdminCancelSessionData.fromJson(dynamic json):
  
  session_update = json['session_update'] == null ? null : AdminCancelSessionSessionUpdate.fromJson(json['session_update']);
  @override
  bool operator ==(Object other) {
    if(identical(this, other)) {
      return true;
    }
    if(other.runtimeType != runtimeType) {
      return false;
    }

    final AdminCancelSessionData otherTyped = other as AdminCancelSessionData;
    return session_update == otherTyped.session_update;
    
  }
  @override
  int get hashCode => session_update.hashCode;
  

  Map<String, dynamic> toJson() {
    Map<String, dynamic> json = {};
    if (session_update != null) {
      json['session_update'] = session_update!.toJson();
    }
    return json;
  }

  AdminCancelSessionData({
    this.session_update,
  });
}

@immutable
class AdminCancelSessionVariables {
  final String sessionId;
  @Deprecated('fromJson is deprecated for Variable classes as they are no longer required for deserialization.')
  AdminCancelSessionVariables.fromJson(Map<String, dynamic> json):
  
  sessionId = nativeFromJson<String>(json['sessionId']);
  @override
  bool operator ==(Object other) {
    if(identical(this, other)) {
      return true;
    }
    if(other.runtimeType != runtimeType) {
      return false;
    }

    final AdminCancelSessionVariables otherTyped = other as AdminCancelSessionVariables;
    return sessionId == otherTyped.sessionId;
    
  }
  @override
  int get hashCode => sessionId.hashCode;
  

  Map<String, dynamic> toJson() {
    Map<String, dynamic> json = {};
    json['sessionId'] = nativeToJson<String>(sessionId);
    return json;
  }

  AdminCancelSessionVariables({
    required this.sessionId,
  });
}

