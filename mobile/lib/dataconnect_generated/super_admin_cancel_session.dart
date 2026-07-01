part of 'generated.dart';

class SuperAdminCancelSessionVariablesBuilder {
  String sessionId;

  final FirebaseDataConnect _dataConnect;
  SuperAdminCancelSessionVariablesBuilder(this._dataConnect, {required  this.sessionId,});
  Deserializer<SuperAdminCancelSessionData> dataDeserializer = (dynamic json)  => SuperAdminCancelSessionData.fromJson(jsonDecode(json));
  Serializer<SuperAdminCancelSessionVariables> varsSerializer = (SuperAdminCancelSessionVariables vars) => jsonEncode(vars.toJson());
  Future<OperationResult<SuperAdminCancelSessionData, SuperAdminCancelSessionVariables>> execute() {
    return ref().execute();
  }

  MutationRef<SuperAdminCancelSessionData, SuperAdminCancelSessionVariables> ref() {
    SuperAdminCancelSessionVariables vars= SuperAdminCancelSessionVariables(sessionId: sessionId,);
    return _dataConnect.mutation("SuperAdminCancelSession", dataDeserializer, varsSerializer, vars);
  }
}

@immutable
class SuperAdminCancelSessionSessionUpdate {
  final String id;
  SuperAdminCancelSessionSessionUpdate.fromJson(dynamic json):
  
  id = nativeFromJson<String>(json['id']);
  @override
  bool operator ==(Object other) {
    if(identical(this, other)) {
      return true;
    }
    if(other.runtimeType != runtimeType) {
      return false;
    }

    final SuperAdminCancelSessionSessionUpdate otherTyped = other as SuperAdminCancelSessionSessionUpdate;
    return id == otherTyped.id;
    
  }
  @override
  int get hashCode => id.hashCode;
  

  Map<String, dynamic> toJson() {
    Map<String, dynamic> json = {};
    json['id'] = nativeToJson<String>(id);
    return json;
  }

  SuperAdminCancelSessionSessionUpdate({
    required this.id,
  });
}

@immutable
class SuperAdminCancelSessionData {
  final SuperAdminCancelSessionSessionUpdate? session_update;
  SuperAdminCancelSessionData.fromJson(dynamic json):
  
  session_update = json['session_update'] == null ? null : SuperAdminCancelSessionSessionUpdate.fromJson(json['session_update']);
  @override
  bool operator ==(Object other) {
    if(identical(this, other)) {
      return true;
    }
    if(other.runtimeType != runtimeType) {
      return false;
    }

    final SuperAdminCancelSessionData otherTyped = other as SuperAdminCancelSessionData;
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

  SuperAdminCancelSessionData({
    this.session_update,
  });
}

@immutable
class SuperAdminCancelSessionVariables {
  final String sessionId;
  @Deprecated('fromJson is deprecated for Variable classes as they are no longer required for deserialization.')
  SuperAdminCancelSessionVariables.fromJson(Map<String, dynamic> json):
  
  sessionId = nativeFromJson<String>(json['sessionId']);
  @override
  bool operator ==(Object other) {
    if(identical(this, other)) {
      return true;
    }
    if(other.runtimeType != runtimeType) {
      return false;
    }

    final SuperAdminCancelSessionVariables otherTyped = other as SuperAdminCancelSessionVariables;
    return sessionId == otherTyped.sessionId;
    
  }
  @override
  int get hashCode => sessionId.hashCode;
  

  Map<String, dynamic> toJson() {
    Map<String, dynamic> json = {};
    json['sessionId'] = nativeToJson<String>(sessionId);
    return json;
  }

  SuperAdminCancelSessionVariables({
    required this.sessionId,
  });
}

