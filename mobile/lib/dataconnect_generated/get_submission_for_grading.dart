part of 'generated.dart';

class GetSubmissionForGradingVariablesBuilder {
  String submissionId;

  final FirebaseDataConnect _dataConnect;
  GetSubmissionForGradingVariablesBuilder(this._dataConnect, {required  this.submissionId,});
  Deserializer<GetSubmissionForGradingData> dataDeserializer = (dynamic json)  => GetSubmissionForGradingData.fromJson(jsonDecode(json));
  Serializer<GetSubmissionForGradingVariables> varsSerializer = (GetSubmissionForGradingVariables vars) => jsonEncode(vars.toJson());
  Future<QueryResult<GetSubmissionForGradingData, GetSubmissionForGradingVariables>> execute({QueryFetchPolicy fetchPolicy = QueryFetchPolicy.preferCache}) {
    return ref().execute(fetchPolicy: fetchPolicy);
  }

  QueryRef<GetSubmissionForGradingData, GetSubmissionForGradingVariables> ref() {
    GetSubmissionForGradingVariables vars= GetSubmissionForGradingVariables(submissionId: submissionId,);
    return _dataConnect.query("GetSubmissionForGrading", dataDeserializer, varsSerializer, vars);
  }
}

@immutable
class GetSubmissionForGradingMissionSubmission {
  final String id;
  final EnumValue<SubmissionStatus> status;
  final int attemptNumber;
  final GetSubmissionForGradingMissionSubmissionMission mission;
  final GetSubmissionForGradingMissionSubmissionStudent student;
  GetSubmissionForGradingMissionSubmission.fromJson(dynamic json):
  
  id = nativeFromJson<String>(json['id']),
  status = submissionStatusDeserializer(json['status']),
  attemptNumber = nativeFromJson<int>(json['attemptNumber']),
  mission = GetSubmissionForGradingMissionSubmissionMission.fromJson(json['mission']),
  student = GetSubmissionForGradingMissionSubmissionStudent.fromJson(json['student']);
  @override
  bool operator ==(Object other) {
    if(identical(this, other)) {
      return true;
    }
    if(other.runtimeType != runtimeType) {
      return false;
    }

    final GetSubmissionForGradingMissionSubmission otherTyped = other as GetSubmissionForGradingMissionSubmission;
    return id == otherTyped.id && 
    status == otherTyped.status && 
    attemptNumber == otherTyped.attemptNumber && 
    mission == otherTyped.mission && 
    student == otherTyped.student;
    
  }
  @override
  int get hashCode => Object.hashAll([id.hashCode, status.hashCode, attemptNumber.hashCode, mission.hashCode, student.hashCode]);
  

  Map<String, dynamic> toJson() {
    Map<String, dynamic> json = {};
    json['id'] = nativeToJson<String>(id);
    json['status'] = 
    submissionStatusSerializer(status)
    ;
    json['attemptNumber'] = nativeToJson<int>(attemptNumber);
    json['mission'] = mission.toJson();
    json['student'] = student.toJson();
    return json;
  }

  GetSubmissionForGradingMissionSubmission({
    required this.id,
    required this.status,
    required this.attemptNumber,
    required this.mission,
    required this.student,
  });
}

@immutable
class GetSubmissionForGradingMissionSubmissionMission {
  final String id;
  GetSubmissionForGradingMissionSubmissionMission.fromJson(dynamic json):
  
  id = nativeFromJson<String>(json['id']);
  @override
  bool operator ==(Object other) {
    if(identical(this, other)) {
      return true;
    }
    if(other.runtimeType != runtimeType) {
      return false;
    }

    final GetSubmissionForGradingMissionSubmissionMission otherTyped = other as GetSubmissionForGradingMissionSubmissionMission;
    return id == otherTyped.id;
    
  }
  @override
  int get hashCode => id.hashCode;
  

  Map<String, dynamic> toJson() {
    Map<String, dynamic> json = {};
    json['id'] = nativeToJson<String>(id);
    return json;
  }

  GetSubmissionForGradingMissionSubmissionMission({
    required this.id,
  });
}

@immutable
class GetSubmissionForGradingMissionSubmissionStudent {
  final String id;
  GetSubmissionForGradingMissionSubmissionStudent.fromJson(dynamic json):
  
  id = nativeFromJson<String>(json['id']);
  @override
  bool operator ==(Object other) {
    if(identical(this, other)) {
      return true;
    }
    if(other.runtimeType != runtimeType) {
      return false;
    }

    final GetSubmissionForGradingMissionSubmissionStudent otherTyped = other as GetSubmissionForGradingMissionSubmissionStudent;
    return id == otherTyped.id;
    
  }
  @override
  int get hashCode => id.hashCode;
  

  Map<String, dynamic> toJson() {
    Map<String, dynamic> json = {};
    json['id'] = nativeToJson<String>(id);
    return json;
  }

  GetSubmissionForGradingMissionSubmissionStudent({
    required this.id,
  });
}

@immutable
class GetSubmissionForGradingData {
  final GetSubmissionForGradingMissionSubmission? missionSubmission;
  GetSubmissionForGradingData.fromJson(dynamic json):
  
  missionSubmission = json['missionSubmission'] == null ? null : GetSubmissionForGradingMissionSubmission.fromJson(json['missionSubmission']);
  @override
  bool operator ==(Object other) {
    if(identical(this, other)) {
      return true;
    }
    if(other.runtimeType != runtimeType) {
      return false;
    }

    final GetSubmissionForGradingData otherTyped = other as GetSubmissionForGradingData;
    return missionSubmission == otherTyped.missionSubmission;
    
  }
  @override
  int get hashCode => missionSubmission.hashCode;
  

  Map<String, dynamic> toJson() {
    Map<String, dynamic> json = {};
    if (missionSubmission != null) {
      json['missionSubmission'] = missionSubmission!.toJson();
    }
    return json;
  }

  GetSubmissionForGradingData({
    this.missionSubmission,
  });
}

@immutable
class GetSubmissionForGradingVariables {
  final String submissionId;
  @Deprecated('fromJson is deprecated for Variable classes as they are no longer required for deserialization.')
  GetSubmissionForGradingVariables.fromJson(Map<String, dynamic> json):
  
  submissionId = nativeFromJson<String>(json['submissionId']);
  @override
  bool operator ==(Object other) {
    if(identical(this, other)) {
      return true;
    }
    if(other.runtimeType != runtimeType) {
      return false;
    }

    final GetSubmissionForGradingVariables otherTyped = other as GetSubmissionForGradingVariables;
    return submissionId == otherTyped.submissionId;
    
  }
  @override
  int get hashCode => submissionId.hashCode;
  

  Map<String, dynamic> toJson() {
    Map<String, dynamic> json = {};
    json['submissionId'] = nativeToJson<String>(submissionId);
    return json;
  }

  GetSubmissionForGradingVariables({
    required this.submissionId,
  });
}

