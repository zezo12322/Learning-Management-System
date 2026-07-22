part of 'generated.dart';

class InstructorCancelSessionVariablesBuilder {
  String sessionId;

  final FirebaseDataConnect _dataConnect;
  InstructorCancelSessionVariablesBuilder(this._dataConnect, {required  this.sessionId,});
  Deserializer<InstructorCancelSessionData> dataDeserializer = (dynamic json)  => InstructorCancelSessionData.fromJson(jsonDecode(json));
  Serializer<InstructorCancelSessionVariables> varsSerializer = (InstructorCancelSessionVariables vars) => jsonEncode(vars.toJson());
  Future<OperationResult<InstructorCancelSessionData, InstructorCancelSessionVariables>> execute() {
    return ref().execute();
  }

  MutationRef<InstructorCancelSessionData, InstructorCancelSessionVariables> ref() {
    InstructorCancelSessionVariables vars= InstructorCancelSessionVariables(sessionId: sessionId,);
    return _dataConnect.mutation("InstructorCancelSession", dataDeserializer, varsSerializer, vars);
  }
}

@immutable
class InstructorCancelSessionData {
  final int session_updateMany;
  InstructorCancelSessionData.fromJson(dynamic json):
  
  session_updateMany = nativeFromJson<int>(json['session_updateMany']);
  @override
  bool operator ==(Object other) {
    if(identical(this, other)) {
      return true;
    }
    if(other.runtimeType != runtimeType) {
      return false;
    }

    final InstructorCancelSessionData otherTyped = other as InstructorCancelSessionData;
    return session_updateMany == otherTyped.session_updateMany;
    
  }
  @override
  int get hashCode => session_updateMany.hashCode;
  

  Map<String, dynamic> toJson() {
    Map<String, dynamic> json = {};
    json['session_updateMany'] = nativeToJson<int>(session_updateMany);
    return json;
  }

  InstructorCancelSessionData({
    required this.session_updateMany,
  });
}

@immutable
class InstructorCancelSessionVariables {
  final String sessionId;
  @Deprecated('fromJson is deprecated for Variable classes as they are no longer required for deserialization.')
  InstructorCancelSessionVariables.fromJson(Map<String, dynamic> json):
  
  sessionId = nativeFromJson<String>(json['sessionId']);
  @override
  bool operator ==(Object other) {
    if(identical(this, other)) {
      return true;
    }
    if(other.runtimeType != runtimeType) {
      return false;
    }

    final InstructorCancelSessionVariables otherTyped = other as InstructorCancelSessionVariables;
    return sessionId == otherTyped.sessionId;
    
  }
  @override
  int get hashCode => sessionId.hashCode;
  

  Map<String, dynamic> toJson() {
    Map<String, dynamic> json = {};
    json['sessionId'] = nativeToJson<String>(sessionId);
    return json;
  }

  InstructorCancelSessionVariables({
    required this.sessionId,
  });
}

