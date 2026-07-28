part of 'generated.dart';

class AdminSoftDeleteMissionVariablesBuilder {
  String missionId;

  final FirebaseDataConnect _dataConnect;
  AdminSoftDeleteMissionVariablesBuilder(this._dataConnect, {required  this.missionId,});
  Deserializer<AdminSoftDeleteMissionData> dataDeserializer = (dynamic json)  => AdminSoftDeleteMissionData.fromJson(jsonDecode(json));
  Serializer<AdminSoftDeleteMissionVariables> varsSerializer = (AdminSoftDeleteMissionVariables vars) => jsonEncode(vars.toJson());
  Future<OperationResult<AdminSoftDeleteMissionData, AdminSoftDeleteMissionVariables>> execute() {
    return ref().execute();
  }

  MutationRef<AdminSoftDeleteMissionData, AdminSoftDeleteMissionVariables> ref() {
    AdminSoftDeleteMissionVariables vars= AdminSoftDeleteMissionVariables(missionId: missionId,);
    return _dataConnect.mutation("AdminSoftDeleteMission", dataDeserializer, varsSerializer, vars);
  }
}

@immutable
class AdminSoftDeleteMissionMissionUpdate {
  final String id;
  AdminSoftDeleteMissionMissionUpdate.fromJson(dynamic json):
  
  id = nativeFromJson<String>(json['id']);
  @override
  bool operator ==(Object other) {
    if(identical(this, other)) {
      return true;
    }
    if(other.runtimeType != runtimeType) {
      return false;
    }

    final AdminSoftDeleteMissionMissionUpdate otherTyped = other as AdminSoftDeleteMissionMissionUpdate;
    return id == otherTyped.id;
    
  }
  @override
  int get hashCode => id.hashCode;
  

  Map<String, dynamic> toJson() {
    Map<String, dynamic> json = {};
    json['id'] = nativeToJson<String>(id);
    return json;
  }

  AdminSoftDeleteMissionMissionUpdate({
    required this.id,
  });
}

@immutable
class AdminSoftDeleteMissionData {
  final AdminSoftDeleteMissionMissionUpdate? mission_update;
  AdminSoftDeleteMissionData.fromJson(dynamic json):
  
  mission_update = json['mission_update'] == null ? null : AdminSoftDeleteMissionMissionUpdate.fromJson(json['mission_update']);
  @override
  bool operator ==(Object other) {
    if(identical(this, other)) {
      return true;
    }
    if(other.runtimeType != runtimeType) {
      return false;
    }

    final AdminSoftDeleteMissionData otherTyped = other as AdminSoftDeleteMissionData;
    return mission_update == otherTyped.mission_update;
    
  }
  @override
  int get hashCode => mission_update.hashCode;
  

  Map<String, dynamic> toJson() {
    Map<String, dynamic> json = {};
    if (mission_update != null) {
      json['mission_update'] = mission_update!.toJson();
    }
    return json;
  }

  AdminSoftDeleteMissionData({
    this.mission_update,
  });
}

@immutable
class AdminSoftDeleteMissionVariables {
  final String missionId;
  @Deprecated('fromJson is deprecated for Variable classes as they are no longer required for deserialization.')
  AdminSoftDeleteMissionVariables.fromJson(Map<String, dynamic> json):
  
  missionId = nativeFromJson<String>(json['missionId']);
  @override
  bool operator ==(Object other) {
    if(identical(this, other)) {
      return true;
    }
    if(other.runtimeType != runtimeType) {
      return false;
    }

    final AdminSoftDeleteMissionVariables otherTyped = other as AdminSoftDeleteMissionVariables;
    return missionId == otherTyped.missionId;
    
  }
  @override
  int get hashCode => missionId.hashCode;
  

  Map<String, dynamic> toJson() {
    Map<String, dynamic> json = {};
    json['missionId'] = nativeToJson<String>(missionId);
    return json;
  }

  AdminSoftDeleteMissionVariables({
    required this.missionId,
  });
}

