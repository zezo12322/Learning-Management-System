part of 'generated.dart';

class AddCriterionScoreVariablesBuilder {
  String submissionId;
  String criterionId;
  double score;

  final FirebaseDataConnect _dataConnect;
  AddCriterionScoreVariablesBuilder(this._dataConnect, {required  this.submissionId,required  this.criterionId,required  this.score,});
  Deserializer<AddCriterionScoreData> dataDeserializer = (dynamic json)  => AddCriterionScoreData.fromJson(jsonDecode(json));
  Serializer<AddCriterionScoreVariables> varsSerializer = (AddCriterionScoreVariables vars) => jsonEncode(vars.toJson());
  Future<OperationResult<AddCriterionScoreData, AddCriterionScoreVariables>> execute() {
    return ref().execute();
  }

  MutationRef<AddCriterionScoreData, AddCriterionScoreVariables> ref() {
    AddCriterionScoreVariables vars= AddCriterionScoreVariables(submissionId: submissionId,criterionId: criterionId,score: score,);
    return _dataConnect.mutation('AddCriterionScore', dataDeserializer, varsSerializer, vars);
  }
}

@immutable
class AddCriterionScoreMissionSubmissionScoreInsert {
  final String submissionId;
  final String criterionId;
  AddCriterionScoreMissionSubmissionScoreInsert.fromJson(dynamic json):
  
  submissionId = nativeFromJson<String>(json['submissionId']),
  criterionId = nativeFromJson<String>(json['criterionId']);
  @override
  bool operator ==(Object other) {
    if(identical(this, other)) {
      return true;
    }
    if(other.runtimeType != runtimeType) {
      return false;
    }

    final AddCriterionScoreMissionSubmissionScoreInsert otherTyped = other as AddCriterionScoreMissionSubmissionScoreInsert;
    return submissionId == otherTyped.submissionId && 
    criterionId == otherTyped.criterionId;
    
  }
  @override
  int get hashCode => Object.hashAll([submissionId.hashCode, criterionId.hashCode]);
  

  Map<String, dynamic> toJson() {
    Map<String, dynamic> json = {};
    json['submissionId'] = nativeToJson<String>(submissionId);
    json['criterionId'] = nativeToJson<String>(criterionId);
    return json;
  }

  AddCriterionScoreMissionSubmissionScoreInsert({
    required this.submissionId,
    required this.criterionId,
  });
}

@immutable
class AddCriterionScoreData {
  final AddCriterionScoreMissionSubmissionScoreInsert missionSubmissionScore_insert;
  AddCriterionScoreData.fromJson(dynamic json):
  
  missionSubmissionScore_insert = AddCriterionScoreMissionSubmissionScoreInsert.fromJson(json['missionSubmissionScore_insert']);
  @override
  bool operator ==(Object other) {
    if(identical(this, other)) {
      return true;
    }
    if(other.runtimeType != runtimeType) {
      return false;
    }

    final AddCriterionScoreData otherTyped = other as AddCriterionScoreData;
    return missionSubmissionScore_insert == otherTyped.missionSubmissionScore_insert;
    
  }
  @override
  int get hashCode => missionSubmissionScore_insert.hashCode;
  

  Map<String, dynamic> toJson() {
    Map<String, dynamic> json = {};
    json['missionSubmissionScore_insert'] = missionSubmissionScore_insert.toJson();
    return json;
  }

  AddCriterionScoreData({
    required this.missionSubmissionScore_insert,
  });
}

@immutable
class AddCriterionScoreVariables {
  final String submissionId;
  final String criterionId;
  final double score;
  @Deprecated('fromJson is deprecated for Variable classes as they are no longer required for deserialization.')
  AddCriterionScoreVariables.fromJson(Map<String, dynamic> json):
  
  submissionId = nativeFromJson<String>(json['submissionId']),
  criterionId = nativeFromJson<String>(json['criterionId']),
  score = nativeFromJson<double>(json['score']);
  @override
  bool operator ==(Object other) {
    if(identical(this, other)) {
      return true;
    }
    if(other.runtimeType != runtimeType) {
      return false;
    }

    final AddCriterionScoreVariables otherTyped = other as AddCriterionScoreVariables;
    return submissionId == otherTyped.submissionId && 
    criterionId == otherTyped.criterionId && 
    score == otherTyped.score;
    
  }
  @override
  int get hashCode => Object.hashAll([submissionId.hashCode, criterionId.hashCode, score.hashCode]);
  

  Map<String, dynamic> toJson() {
    Map<String, dynamic> json = {};
    json['submissionId'] = nativeToJson<String>(submissionId);
    json['criterionId'] = nativeToJson<String>(criterionId);
    json['score'] = nativeToJson<double>(score);
    return json;
  }

  AddCriterionScoreVariables({
    required this.submissionId,
    required this.criterionId,
    required this.score,
  });
}

