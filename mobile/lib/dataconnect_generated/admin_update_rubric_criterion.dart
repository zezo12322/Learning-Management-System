part of 'generated.dart';

class AdminUpdateRubricCriterionVariablesBuilder {
  String criterionId;
  Optional<String> _criterionName = Optional.optional(nativeFromJson, nativeToJson);
  Optional<String> _description = Optional.optional(nativeFromJson, nativeToJson);
  Optional<double> _maxPoints = Optional.optional(nativeFromJson, nativeToJson);

  final FirebaseDataConnect _dataConnect;  AdminUpdateRubricCriterionVariablesBuilder criterionName(String? t) {
   _criterionName.value = t;
   return this;
  }
  AdminUpdateRubricCriterionVariablesBuilder description(String? t) {
   _description.value = t;
   return this;
  }
  AdminUpdateRubricCriterionVariablesBuilder maxPoints(double? t) {
   _maxPoints.value = t;
   return this;
  }

  AdminUpdateRubricCriterionVariablesBuilder(this._dataConnect, {required  this.criterionId,});
  Deserializer<AdminUpdateRubricCriterionData> dataDeserializer = (dynamic json)  => AdminUpdateRubricCriterionData.fromJson(jsonDecode(json));
  Serializer<AdminUpdateRubricCriterionVariables> varsSerializer = (AdminUpdateRubricCriterionVariables vars) => jsonEncode(vars.toJson());
  Future<OperationResult<AdminUpdateRubricCriterionData, AdminUpdateRubricCriterionVariables>> execute() {
    return ref().execute();
  }

  MutationRef<AdminUpdateRubricCriterionData, AdminUpdateRubricCriterionVariables> ref() {
    AdminUpdateRubricCriterionVariables vars= AdminUpdateRubricCriterionVariables(criterionId: criterionId,criterionName: _criterionName,description: _description,maxPoints: _maxPoints,);
    return _dataConnect.mutation("AdminUpdateRubricCriterion", dataDeserializer, varsSerializer, vars);
  }
}

@immutable
class AdminUpdateRubricCriterionRubricCriterionUpdate {
  final String id;
  AdminUpdateRubricCriterionRubricCriterionUpdate.fromJson(dynamic json):
  
  id = nativeFromJson<String>(json['id']);
  @override
  bool operator ==(Object other) {
    if(identical(this, other)) {
      return true;
    }
    if(other.runtimeType != runtimeType) {
      return false;
    }

    final AdminUpdateRubricCriterionRubricCriterionUpdate otherTyped = other as AdminUpdateRubricCriterionRubricCriterionUpdate;
    return id == otherTyped.id;
    
  }
  @override
  int get hashCode => id.hashCode;
  

  Map<String, dynamic> toJson() {
    Map<String, dynamic> json = {};
    json['id'] = nativeToJson<String>(id);
    return json;
  }

  AdminUpdateRubricCriterionRubricCriterionUpdate({
    required this.id,
  });
}

@immutable
class AdminUpdateRubricCriterionData {
  final AdminUpdateRubricCriterionRubricCriterionUpdate? rubricCriterion_update;
  AdminUpdateRubricCriterionData.fromJson(dynamic json):
  
  rubricCriterion_update = json['rubricCriterion_update'] == null ? null : AdminUpdateRubricCriterionRubricCriterionUpdate.fromJson(json['rubricCriterion_update']);
  @override
  bool operator ==(Object other) {
    if(identical(this, other)) {
      return true;
    }
    if(other.runtimeType != runtimeType) {
      return false;
    }

    final AdminUpdateRubricCriterionData otherTyped = other as AdminUpdateRubricCriterionData;
    return rubricCriterion_update == otherTyped.rubricCriterion_update;
    
  }
  @override
  int get hashCode => rubricCriterion_update.hashCode;
  

  Map<String, dynamic> toJson() {
    Map<String, dynamic> json = {};
    if (rubricCriterion_update != null) {
      json['rubricCriterion_update'] = rubricCriterion_update!.toJson();
    }
    return json;
  }

  AdminUpdateRubricCriterionData({
    this.rubricCriterion_update,
  });
}

@immutable
class AdminUpdateRubricCriterionVariables {
  final String criterionId;
  late final Optional<String>criterionName;
  late final Optional<String>description;
  late final Optional<double>maxPoints;
  @Deprecated('fromJson is deprecated for Variable classes as they are no longer required for deserialization.')
  AdminUpdateRubricCriterionVariables.fromJson(Map<String, dynamic> json):
  
  criterionId = nativeFromJson<String>(json['criterionId']) {
  
  
  
    criterionName = Optional.optional(nativeFromJson, nativeToJson);
    criterionName.value = json['criterionName'] == null ? null : nativeFromJson<String>(json['criterionName']);
  
  
    description = Optional.optional(nativeFromJson, nativeToJson);
    description.value = json['description'] == null ? null : nativeFromJson<String>(json['description']);
  
  
    maxPoints = Optional.optional(nativeFromJson, nativeToJson);
    maxPoints.value = json['maxPoints'] == null ? null : nativeFromJson<double>(json['maxPoints']);
  
  }
  @override
  bool operator ==(Object other) {
    if(identical(this, other)) {
      return true;
    }
    if(other.runtimeType != runtimeType) {
      return false;
    }

    final AdminUpdateRubricCriterionVariables otherTyped = other as AdminUpdateRubricCriterionVariables;
    return criterionId == otherTyped.criterionId && 
    criterionName == otherTyped.criterionName && 
    description == otherTyped.description && 
    maxPoints == otherTyped.maxPoints;
    
  }
  @override
  int get hashCode => Object.hashAll([criterionId.hashCode, criterionName.hashCode, description.hashCode, maxPoints.hashCode]);
  

  Map<String, dynamic> toJson() {
    Map<String, dynamic> json = {};
    json['criterionId'] = nativeToJson<String>(criterionId);
    if(criterionName.state == OptionalState.set) {
      json['criterionName'] = criterionName.toJson();
    }
    if(description.state == OptionalState.set) {
      json['description'] = description.toJson();
    }
    if(maxPoints.state == OptionalState.set) {
      json['maxPoints'] = maxPoints.toJson();
    }
    return json;
  }

  AdminUpdateRubricCriterionVariables({
    required this.criterionId,
    required this.criterionName,
    required this.description,
    required this.maxPoints,
  });
}

