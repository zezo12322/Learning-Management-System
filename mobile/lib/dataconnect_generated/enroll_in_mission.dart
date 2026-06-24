part of 'generated.dart';

class EnrollInMissionVariablesBuilder {
  String missionId;

  final FirebaseDataConnect _dataConnect;
  EnrollInMissionVariablesBuilder(this._dataConnect, {required  this.missionId,});
  Deserializer<EnrollInMissionData> dataDeserializer = (dynamic json)  => EnrollInMissionData.fromJson(jsonDecode(json));
  Serializer<EnrollInMissionVariables> varsSerializer = (EnrollInMissionVariables vars) => jsonEncode(vars.toJson());
  Future<OperationResult<EnrollInMissionData, EnrollInMissionVariables>> execute() {
    return ref().execute();
  }

  MutationRef<EnrollInMissionData, EnrollInMissionVariables> ref() {
    EnrollInMissionVariables vars= EnrollInMissionVariables(missionId: missionId,);
    return _dataConnect.mutation("EnrollInMission", dataDeserializer, varsSerializer, vars);
  }
}

@immutable
class EnrollInMissionEnrollmentInsert {
  final String id;
  EnrollInMissionEnrollmentInsert.fromJson(dynamic json):
  
  id = nativeFromJson<String>(json['id']);
  @override
  bool operator ==(Object other) {
    if(identical(this, other)) {
      return true;
    }
    if(other.runtimeType != runtimeType) {
      return false;
    }

    final EnrollInMissionEnrollmentInsert otherTyped = other as EnrollInMissionEnrollmentInsert;
    return id == otherTyped.id;
    
  }
  @override
  int get hashCode => id.hashCode;
  

  Map<String, dynamic> toJson() {
    Map<String, dynamic> json = {};
    json['id'] = nativeToJson<String>(id);
    return json;
  }

  EnrollInMissionEnrollmentInsert({
    required this.id,
  });
}

@immutable
class EnrollInMissionData {
  final EnrollInMissionEnrollmentInsert enrollment_insert;
  EnrollInMissionData.fromJson(dynamic json):
  
  enrollment_insert = EnrollInMissionEnrollmentInsert.fromJson(json['enrollment_insert']);
  @override
  bool operator ==(Object other) {
    if(identical(this, other)) {
      return true;
    }
    if(other.runtimeType != runtimeType) {
      return false;
    }

    final EnrollInMissionData otherTyped = other as EnrollInMissionData;
    return enrollment_insert == otherTyped.enrollment_insert;
    
  }
  @override
  int get hashCode => enrollment_insert.hashCode;
  

  Map<String, dynamic> toJson() {
    Map<String, dynamic> json = {};
    json['enrollment_insert'] = enrollment_insert.toJson();
    return json;
  }

  EnrollInMissionData({
    required this.enrollment_insert,
  });
}

@immutable
class EnrollInMissionVariables {
  final String missionId;
  @Deprecated('fromJson is deprecated for Variable classes as they are no longer required for deserialization.')
  EnrollInMissionVariables.fromJson(Map<String, dynamic> json):
  
  missionId = nativeFromJson<String>(json['missionId']);
  @override
  bool operator ==(Object other) {
    if(identical(this, other)) {
      return true;
    }
    if(other.runtimeType != runtimeType) {
      return false;
    }

    final EnrollInMissionVariables otherTyped = other as EnrollInMissionVariables;
    return missionId == otherTyped.missionId;
    
  }
  @override
  int get hashCode => missionId.hashCode;
  

  Map<String, dynamic> toJson() {
    Map<String, dynamic> json = {};
    json['missionId'] = nativeToJson<String>(missionId);
    return json;
  }

  EnrollInMissionVariables({
    required this.missionId,
  });
}

