part of 'generated.dart';

class SubmitMissionVariablesBuilder {
  String missionId;
  String fileUrl;

  final FirebaseDataConnect _dataConnect;
  SubmitMissionVariablesBuilder(this._dataConnect, {required  this.missionId,required  this.fileUrl,});
  Deserializer<SubmitMissionData> dataDeserializer = (dynamic json)  => SubmitMissionData.fromJson(jsonDecode(json));
  Serializer<SubmitMissionVariables> varsSerializer = (SubmitMissionVariables vars) => jsonEncode(vars.toJson());
  Future<OperationResult<SubmitMissionData, SubmitMissionVariables>> execute() {
    return ref().execute();
  }

  MutationRef<SubmitMissionData, SubmitMissionVariables> ref() {
    SubmitMissionVariables vars= SubmitMissionVariables(missionId: missionId,fileUrl: fileUrl,);
    return _dataConnect.mutation('SubmitMission', dataDeserializer, varsSerializer, vars);
  }
}

@immutable
class SubmitMissionMissionSubmissionInsert {
  final String id;
  SubmitMissionMissionSubmissionInsert.fromJson(dynamic json):
  
  id = nativeFromJson<String>(json['id']);
  @override
  bool operator ==(Object other) {
    if(identical(this, other)) {
      return true;
    }
    if(other.runtimeType != runtimeType) {
      return false;
    }

    final SubmitMissionMissionSubmissionInsert otherTyped = other as SubmitMissionMissionSubmissionInsert;
    return id == otherTyped.id;
    
  }
  @override
  int get hashCode => id.hashCode;
  

  Map<String, dynamic> toJson() {
    Map<String, dynamic> json = {};
    json['id'] = nativeToJson<String>(id);
    return json;
  }

  SubmitMissionMissionSubmissionInsert({
    required this.id,
  });
}

@immutable
class SubmitMissionData {
  final SubmitMissionMissionSubmissionInsert missionSubmission_insert;
  SubmitMissionData.fromJson(dynamic json):
  
  missionSubmission_insert = SubmitMissionMissionSubmissionInsert.fromJson(json['missionSubmission_insert']);
  @override
  bool operator ==(Object other) {
    if(identical(this, other)) {
      return true;
    }
    if(other.runtimeType != runtimeType) {
      return false;
    }

    final SubmitMissionData otherTyped = other as SubmitMissionData;
    return missionSubmission_insert == otherTyped.missionSubmission_insert;
    
  }
  @override
  int get hashCode => missionSubmission_insert.hashCode;
  

  Map<String, dynamic> toJson() {
    Map<String, dynamic> json = {};
    json['missionSubmission_insert'] = missionSubmission_insert.toJson();
    return json;
  }

  SubmitMissionData({
    required this.missionSubmission_insert,
  });
}

@immutable
class SubmitMissionVariables {
  final String missionId;
  final String fileUrl;
  @Deprecated('fromJson is deprecated for Variable classes as they are no longer required for deserialization.')
  SubmitMissionVariables.fromJson(Map<String, dynamic> json):
  
  missionId = nativeFromJson<String>(json['missionId']),
  fileUrl = nativeFromJson<String>(json['fileUrl']);
  @override
  bool operator ==(Object other) {
    if(identical(this, other)) {
      return true;
    }
    if(other.runtimeType != runtimeType) {
      return false;
    }

    final SubmitMissionVariables otherTyped = other as SubmitMissionVariables;
    return missionId == otherTyped.missionId && 
    fileUrl == otherTyped.fileUrl;
    
  }
  @override
  int get hashCode => Object.hashAll([missionId.hashCode, fileUrl.hashCode]);
  

  Map<String, dynamic> toJson() {
    Map<String, dynamic> json = {};
    json['missionId'] = nativeToJson<String>(missionId);
    json['fileUrl'] = nativeToJson<String>(fileUrl);
    return json;
  }

  SubmitMissionVariables({
    required this.missionId,
    required this.fileUrl,
  });
}

