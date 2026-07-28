part of 'generated.dart';

class GradeSubmissionVariablesBuilder {
  String submissionId;
  Optional<String> _feedback = Optional.optional(nativeFromJson, nativeToJson);
  String graderId;

  final FirebaseDataConnect _dataConnect;  GradeSubmissionVariablesBuilder feedback(String? t) {
   _feedback.value = t;
   return this;
  }

  GradeSubmissionVariablesBuilder(this._dataConnect, {required  this.submissionId,required  this.graderId,});
  Deserializer<GradeSubmissionData> dataDeserializer = (dynamic json)  => GradeSubmissionData.fromJson(jsonDecode(json));
  Serializer<GradeSubmissionVariables> varsSerializer = (GradeSubmissionVariables vars) => jsonEncode(vars.toJson());
  Future<OperationResult<GradeSubmissionData, GradeSubmissionVariables>> execute() {
    return ref().execute();
  }

  MutationRef<GradeSubmissionData, GradeSubmissionVariables> ref() {
    GradeSubmissionVariables vars= GradeSubmissionVariables(submissionId: submissionId,feedback: _feedback,graderId: graderId,);
    return _dataConnect.mutation("GradeSubmission", dataDeserializer, varsSerializer, vars);
  }
}

@immutable
class GradeSubmissionMissionSubmissionUpdate {
  final String id;
  GradeSubmissionMissionSubmissionUpdate.fromJson(dynamic json):
  
  id = nativeFromJson<String>(json['id']);
  @override
  bool operator ==(Object other) {
    if(identical(this, other)) {
      return true;
    }
    if(other.runtimeType != runtimeType) {
      return false;
    }

    final GradeSubmissionMissionSubmissionUpdate otherTyped = other as GradeSubmissionMissionSubmissionUpdate;
    return id == otherTyped.id;
    
  }
  @override
  int get hashCode => id.hashCode;
  

  Map<String, dynamic> toJson() {
    Map<String, dynamic> json = {};
    json['id'] = nativeToJson<String>(id);
    return json;
  }

  GradeSubmissionMissionSubmissionUpdate({
    required this.id,
  });
}

@immutable
class GradeSubmissionData {
  final GradeSubmissionMissionSubmissionUpdate? missionSubmission_update;
  GradeSubmissionData.fromJson(dynamic json):
  
  missionSubmission_update = json['missionSubmission_update'] == null ? null : GradeSubmissionMissionSubmissionUpdate.fromJson(json['missionSubmission_update']);
  @override
  bool operator ==(Object other) {
    if(identical(this, other)) {
      return true;
    }
    if(other.runtimeType != runtimeType) {
      return false;
    }

    final GradeSubmissionData otherTyped = other as GradeSubmissionData;
    return missionSubmission_update == otherTyped.missionSubmission_update;
    
  }
  @override
  int get hashCode => missionSubmission_update.hashCode;
  

  Map<String, dynamic> toJson() {
    Map<String, dynamic> json = {};
    if (missionSubmission_update != null) {
      json['missionSubmission_update'] = missionSubmission_update!.toJson();
    }
    return json;
  }

  GradeSubmissionData({
    this.missionSubmission_update,
  });
}

@immutable
class GradeSubmissionVariables {
  final String submissionId;
  late final Optional<String>feedback;
  final String graderId;
  @Deprecated('fromJson is deprecated for Variable classes as they are no longer required for deserialization.')
  GradeSubmissionVariables.fromJson(Map<String, dynamic> json):
  
  submissionId = nativeFromJson<String>(json['submissionId']),
  graderId = nativeFromJson<String>(json['graderId']) {
  
  
  
    feedback = Optional.optional(nativeFromJson, nativeToJson);
    feedback.value = json['feedback'] == null ? null : nativeFromJson<String>(json['feedback']);
  
  
  }
  @override
  bool operator ==(Object other) {
    if(identical(this, other)) {
      return true;
    }
    if(other.runtimeType != runtimeType) {
      return false;
    }

    final GradeSubmissionVariables otherTyped = other as GradeSubmissionVariables;
    return submissionId == otherTyped.submissionId && 
    feedback == otherTyped.feedback && 
    graderId == otherTyped.graderId;
    
  }
  @override
  int get hashCode => Object.hashAll([submissionId.hashCode, feedback.hashCode, graderId.hashCode]);
  

  Map<String, dynamic> toJson() {
    Map<String, dynamic> json = {};
    json['submissionId'] = nativeToJson<String>(submissionId);
    if(feedback.state == OptionalState.set) {
      json['feedback'] = feedback.toJson();
    }
    json['graderId'] = nativeToJson<String>(graderId);
    return json;
  }

  GradeSubmissionVariables({
    required this.submissionId,
    required this.feedback,
    required this.graderId,
  });
}

