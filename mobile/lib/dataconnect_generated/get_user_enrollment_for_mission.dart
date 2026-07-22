part of 'generated.dart';

class GetUserEnrollmentForMissionVariablesBuilder {
  String missionId;

  final FirebaseDataConnect _dataConnect;
  GetUserEnrollmentForMissionVariablesBuilder(this._dataConnect, {required  this.missionId,});
  Deserializer<GetUserEnrollmentForMissionData> dataDeserializer = (dynamic json)  => GetUserEnrollmentForMissionData.fromJson(jsonDecode(json));
  Serializer<GetUserEnrollmentForMissionVariables> varsSerializer = (GetUserEnrollmentForMissionVariables vars) => jsonEncode(vars.toJson());
  Future<QueryResult<GetUserEnrollmentForMissionData, GetUserEnrollmentForMissionVariables>> execute({QueryFetchPolicy fetchPolicy = QueryFetchPolicy.preferCache}) {
    return ref().execute(fetchPolicy: fetchPolicy);
  }

  QueryRef<GetUserEnrollmentForMissionData, GetUserEnrollmentForMissionVariables> ref() {
    GetUserEnrollmentForMissionVariables vars= GetUserEnrollmentForMissionVariables(missionId: missionId,);
    return _dataConnect.query("GetUserEnrollmentForMission", dataDeserializer, varsSerializer, vars);
  }
}

@immutable
class GetUserEnrollmentForMissionEnrollments {
  final String id;
  final EnumValue<EnrollmentStatus> status;
  final Timestamp? completedAt;
  GetUserEnrollmentForMissionEnrollments.fromJson(dynamic json):
  
  id = nativeFromJson<String>(json['id']),
  status = enrollmentStatusDeserializer(json['status']),
  completedAt = json['completedAt'] == null ? null : Timestamp.fromJson(json['completedAt']);
  @override
  bool operator ==(Object other) {
    if(identical(this, other)) {
      return true;
    }
    if(other.runtimeType != runtimeType) {
      return false;
    }

    final GetUserEnrollmentForMissionEnrollments otherTyped = other as GetUserEnrollmentForMissionEnrollments;
    return id == otherTyped.id && 
    status == otherTyped.status && 
    completedAt == otherTyped.completedAt;
    
  }
  @override
  int get hashCode => Object.hashAll([id.hashCode, status.hashCode, completedAt.hashCode]);
  

  Map<String, dynamic> toJson() {
    Map<String, dynamic> json = {};
    json['id'] = nativeToJson<String>(id);
    json['status'] = 
    enrollmentStatusSerializer(status)
    ;
    if (completedAt != null) {
      json['completedAt'] = completedAt!.toJson();
    }
    return json;
  }

  GetUserEnrollmentForMissionEnrollments({
    required this.id,
    required this.status,
    this.completedAt,
  });
}

@immutable
class GetUserEnrollmentForMissionData {
  final List<GetUserEnrollmentForMissionEnrollments> enrollments;
  GetUserEnrollmentForMissionData.fromJson(dynamic json):
  
  enrollments = (json['enrollments'] as List<dynamic>)
        .map((e) => GetUserEnrollmentForMissionEnrollments.fromJson(e))
        .toList();
  @override
  bool operator ==(Object other) {
    if(identical(this, other)) {
      return true;
    }
    if(other.runtimeType != runtimeType) {
      return false;
    }

    final GetUserEnrollmentForMissionData otherTyped = other as GetUserEnrollmentForMissionData;
    return enrollments == otherTyped.enrollments;
    
  }
  @override
  int get hashCode => enrollments.hashCode;
  

  Map<String, dynamic> toJson() {
    Map<String, dynamic> json = {};
    json['enrollments'] = enrollments.map((e) => e.toJson()).toList();
    return json;
  }

  GetUserEnrollmentForMissionData({
    required this.enrollments,
  });
}

@immutable
class GetUserEnrollmentForMissionVariables {
  final String missionId;
  @Deprecated('fromJson is deprecated for Variable classes as they are no longer required for deserialization.')
  GetUserEnrollmentForMissionVariables.fromJson(Map<String, dynamic> json):
  
  missionId = nativeFromJson<String>(json['missionId']);
  @override
  bool operator ==(Object other) {
    if(identical(this, other)) {
      return true;
    }
    if(other.runtimeType != runtimeType) {
      return false;
    }

    final GetUserEnrollmentForMissionVariables otherTyped = other as GetUserEnrollmentForMissionVariables;
    return missionId == otherTyped.missionId;
    
  }
  @override
  int get hashCode => missionId.hashCode;
  

  Map<String, dynamic> toJson() {
    Map<String, dynamic> json = {};
    json['missionId'] = nativeToJson<String>(missionId);
    return json;
  }

  GetUserEnrollmentForMissionVariables({
    required this.missionId,
  });
}

