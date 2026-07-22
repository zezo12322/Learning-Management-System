part of 'generated.dart';

class GetEnrollmentForUserMissionVariablesBuilder {
  String userId;
  String missionId;

  final FirebaseDataConnect _dataConnect;
  GetEnrollmentForUserMissionVariablesBuilder(this._dataConnect, {required  this.userId,required  this.missionId,});
  Deserializer<GetEnrollmentForUserMissionData> dataDeserializer = (dynamic json)  => GetEnrollmentForUserMissionData.fromJson(jsonDecode(json));
  Serializer<GetEnrollmentForUserMissionVariables> varsSerializer = (GetEnrollmentForUserMissionVariables vars) => jsonEncode(vars.toJson());
  Future<QueryResult<GetEnrollmentForUserMissionData, GetEnrollmentForUserMissionVariables>> execute({QueryFetchPolicy fetchPolicy = QueryFetchPolicy.preferCache}) {
    return ref().execute(fetchPolicy: fetchPolicy);
  }

  QueryRef<GetEnrollmentForUserMissionData, GetEnrollmentForUserMissionVariables> ref() {
    GetEnrollmentForUserMissionVariables vars= GetEnrollmentForUserMissionVariables(userId: userId,missionId: missionId,);
    return _dataConnect.query("GetEnrollmentForUserMission", dataDeserializer, varsSerializer, vars);
  }
}

@immutable
class GetEnrollmentForUserMissionEnrollments {
  final String id;
  final EnumValue<EnrollmentStatus> status;
  final Timestamp? completedAt;
  GetEnrollmentForUserMissionEnrollments.fromJson(dynamic json):
  
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

    final GetEnrollmentForUserMissionEnrollments otherTyped = other as GetEnrollmentForUserMissionEnrollments;
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

  GetEnrollmentForUserMissionEnrollments({
    required this.id,
    required this.status,
    this.completedAt,
  });
}

@immutable
class GetEnrollmentForUserMissionData {
  final List<GetEnrollmentForUserMissionEnrollments> enrollments;
  GetEnrollmentForUserMissionData.fromJson(dynamic json):
  
  enrollments = (json['enrollments'] as List<dynamic>)
        .map((e) => GetEnrollmentForUserMissionEnrollments.fromJson(e))
        .toList();
  @override
  bool operator ==(Object other) {
    if(identical(this, other)) {
      return true;
    }
    if(other.runtimeType != runtimeType) {
      return false;
    }

    final GetEnrollmentForUserMissionData otherTyped = other as GetEnrollmentForUserMissionData;
    return enrollments == otherTyped.enrollments;
    
  }
  @override
  int get hashCode => enrollments.hashCode;
  

  Map<String, dynamic> toJson() {
    Map<String, dynamic> json = {};
    json['enrollments'] = enrollments.map((e) => e.toJson()).toList();
    return json;
  }

  GetEnrollmentForUserMissionData({
    required this.enrollments,
  });
}

@immutable
class GetEnrollmentForUserMissionVariables {
  final String userId;
  final String missionId;
  @Deprecated('fromJson is deprecated for Variable classes as they are no longer required for deserialization.')
  GetEnrollmentForUserMissionVariables.fromJson(Map<String, dynamic> json):
  
  userId = nativeFromJson<String>(json['userId']),
  missionId = nativeFromJson<String>(json['missionId']);
  @override
  bool operator ==(Object other) {
    if(identical(this, other)) {
      return true;
    }
    if(other.runtimeType != runtimeType) {
      return false;
    }

    final GetEnrollmentForUserMissionVariables otherTyped = other as GetEnrollmentForUserMissionVariables;
    return userId == otherTyped.userId && 
    missionId == otherTyped.missionId;
    
  }
  @override
  int get hashCode => Object.hashAll([userId.hashCode, missionId.hashCode]);
  

  Map<String, dynamic> toJson() {
    Map<String, dynamic> json = {};
    json['userId'] = nativeToJson<String>(userId);
    json['missionId'] = nativeToJson<String>(missionId);
    return json;
  }

  GetEnrollmentForUserMissionVariables({
    required this.userId,
    required this.missionId,
  });
}

