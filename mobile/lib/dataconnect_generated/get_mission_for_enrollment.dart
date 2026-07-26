part of 'generated.dart';

class GetMissionForEnrollmentVariablesBuilder {
  String missionId;

  final FirebaseDataConnect _dataConnect;
  GetMissionForEnrollmentVariablesBuilder(this._dataConnect, {required  this.missionId,});
  Deserializer<GetMissionForEnrollmentData> dataDeserializer = (dynamic json)  => GetMissionForEnrollmentData.fromJson(jsonDecode(json));
  Serializer<GetMissionForEnrollmentVariables> varsSerializer = (GetMissionForEnrollmentVariables vars) => jsonEncode(vars.toJson());
  Future<QueryResult<GetMissionForEnrollmentData, GetMissionForEnrollmentVariables>> execute({QueryFetchPolicy fetchPolicy = QueryFetchPolicy.preferCache}) {
    return ref().execute(fetchPolicy: fetchPolicy);
  }

  QueryRef<GetMissionForEnrollmentData, GetMissionForEnrollmentVariables> ref() {
    GetMissionForEnrollmentVariables vars= GetMissionForEnrollmentVariables(missionId: missionId,);
    return _dataConnect.query("GetMissionForEnrollment", dataDeserializer, varsSerializer, vars);
  }
}

@immutable
class GetMissionForEnrollmentMission {
  final String id;
  final Timestamp? deletedAt;
  GetMissionForEnrollmentMission.fromJson(dynamic json):
  
  id = nativeFromJson<String>(json['id']),
  deletedAt = json['deletedAt'] == null ? null : Timestamp.fromJson(json['deletedAt']);
  @override
  bool operator ==(Object other) {
    if(identical(this, other)) {
      return true;
    }
    if(other.runtimeType != runtimeType) {
      return false;
    }

    final GetMissionForEnrollmentMission otherTyped = other as GetMissionForEnrollmentMission;
    return id == otherTyped.id && 
    deletedAt == otherTyped.deletedAt;
    
  }
  @override
  int get hashCode => Object.hashAll([id.hashCode, deletedAt.hashCode]);
  

  Map<String, dynamic> toJson() {
    Map<String, dynamic> json = {};
    json['id'] = nativeToJson<String>(id);
    if (deletedAt != null) {
      json['deletedAt'] = deletedAt!.toJson();
    }
    return json;
  }

  GetMissionForEnrollmentMission({
    required this.id,
    this.deletedAt,
  });
}

@immutable
class GetMissionForEnrollmentData {
  final GetMissionForEnrollmentMission? mission;
  GetMissionForEnrollmentData.fromJson(dynamic json):
  
  mission = json['mission'] == null ? null : GetMissionForEnrollmentMission.fromJson(json['mission']);
  @override
  bool operator ==(Object other) {
    if(identical(this, other)) {
      return true;
    }
    if(other.runtimeType != runtimeType) {
      return false;
    }

    final GetMissionForEnrollmentData otherTyped = other as GetMissionForEnrollmentData;
    return mission == otherTyped.mission;
    
  }
  @override
  int get hashCode => mission.hashCode;
  

  Map<String, dynamic> toJson() {
    Map<String, dynamic> json = {};
    if (mission != null) {
      json['mission'] = mission!.toJson();
    }
    return json;
  }

  GetMissionForEnrollmentData({
    this.mission,
  });
}

@immutable
class GetMissionForEnrollmentVariables {
  final String missionId;
  @Deprecated('fromJson is deprecated for Variable classes as they are no longer required for deserialization.')
  GetMissionForEnrollmentVariables.fromJson(Map<String, dynamic> json):
  
  missionId = nativeFromJson<String>(json['missionId']);
  @override
  bool operator ==(Object other) {
    if(identical(this, other)) {
      return true;
    }
    if(other.runtimeType != runtimeType) {
      return false;
    }

    final GetMissionForEnrollmentVariables otherTyped = other as GetMissionForEnrollmentVariables;
    return missionId == otherTyped.missionId;
    
  }
  @override
  int get hashCode => missionId.hashCode;
  

  Map<String, dynamic> toJson() {
    Map<String, dynamic> json = {};
    json['missionId'] = nativeToJson<String>(missionId);
    return json;
  }

  GetMissionForEnrollmentVariables({
    required this.missionId,
  });
}

