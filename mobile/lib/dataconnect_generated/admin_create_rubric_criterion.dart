part of 'generated.dart';

class AdminCreateRubricCriterionVariablesBuilder {
  String missionId;
  String criterionName;
  Optional<String> _description = Optional.optional(nativeFromJson, nativeToJson);
  double maxPoints;
  int order;

  final FirebaseDataConnect _dataConnect;  AdminCreateRubricCriterionVariablesBuilder description(String? t) {
   _description.value = t;
   return this;
  }

  AdminCreateRubricCriterionVariablesBuilder(this._dataConnect, {required  this.missionId,required  this.criterionName,required  this.maxPoints,required  this.order,});
  Deserializer<AdminCreateRubricCriterionData> dataDeserializer = (dynamic json)  => AdminCreateRubricCriterionData.fromJson(jsonDecode(json));
  Serializer<AdminCreateRubricCriterionVariables> varsSerializer = (AdminCreateRubricCriterionVariables vars) => jsonEncode(vars.toJson());
  Future<OperationResult<AdminCreateRubricCriterionData, AdminCreateRubricCriterionVariables>> execute() {
    return ref().execute();
  }

  MutationRef<AdminCreateRubricCriterionData, AdminCreateRubricCriterionVariables> ref() {
    AdminCreateRubricCriterionVariables vars= AdminCreateRubricCriterionVariables(missionId: missionId,criterionName: criterionName,description: _description,maxPoints: maxPoints,order: order,);
    return _dataConnect.mutation("AdminCreateRubricCriterion", dataDeserializer, varsSerializer, vars);
  }
}

@immutable
class AdminCreateRubricCriterionRubricCriterionInsert {
  final String id;
  AdminCreateRubricCriterionRubricCriterionInsert.fromJson(dynamic json):
  
  id = nativeFromJson<String>(json['id']);
  @override
  bool operator ==(Object other) {
    if(identical(this, other)) {
      return true;
    }
    if(other.runtimeType != runtimeType) {
      return false;
    }

    final AdminCreateRubricCriterionRubricCriterionInsert otherTyped = other as AdminCreateRubricCriterionRubricCriterionInsert;
    return id == otherTyped.id;
    
  }
  @override
  int get hashCode => id.hashCode;
  

  Map<String, dynamic> toJson() {
    Map<String, dynamic> json = {};
    json['id'] = nativeToJson<String>(id);
    return json;
  }

  AdminCreateRubricCriterionRubricCriterionInsert({
    required this.id,
  });
}

@immutable
class AdminCreateRubricCriterionData {
  final AdminCreateRubricCriterionRubricCriterionInsert rubricCriterion_insert;
  AdminCreateRubricCriterionData.fromJson(dynamic json):
  
  rubricCriterion_insert = AdminCreateRubricCriterionRubricCriterionInsert.fromJson(json['rubricCriterion_insert']);
  @override
  bool operator ==(Object other) {
    if(identical(this, other)) {
      return true;
    }
    if(other.runtimeType != runtimeType) {
      return false;
    }

    final AdminCreateRubricCriterionData otherTyped = other as AdminCreateRubricCriterionData;
    return rubricCriterion_insert == otherTyped.rubricCriterion_insert;
    
  }
  @override
  int get hashCode => rubricCriterion_insert.hashCode;
  

  Map<String, dynamic> toJson() {
    Map<String, dynamic> json = {};
    json['rubricCriterion_insert'] = rubricCriterion_insert.toJson();
    return json;
  }

  AdminCreateRubricCriterionData({
    required this.rubricCriterion_insert,
  });
}

@immutable
class AdminCreateRubricCriterionVariables {
  final String missionId;
  final String criterionName;
  late final Optional<String>description;
  final double maxPoints;
  final int order;
  @Deprecated('fromJson is deprecated for Variable classes as they are no longer required for deserialization.')
  AdminCreateRubricCriterionVariables.fromJson(Map<String, dynamic> json):
  
  missionId = nativeFromJson<String>(json['missionId']),
  criterionName = nativeFromJson<String>(json['criterionName']),
  maxPoints = nativeFromJson<double>(json['maxPoints']),
  order = nativeFromJson<int>(json['order']) {
  
  
  
  
    description = Optional.optional(nativeFromJson, nativeToJson);
    description.value = json['description'] == null ? null : nativeFromJson<String>(json['description']);
  
  
  
  }
  @override
  bool operator ==(Object other) {
    if(identical(this, other)) {
      return true;
    }
    if(other.runtimeType != runtimeType) {
      return false;
    }

    final AdminCreateRubricCriterionVariables otherTyped = other as AdminCreateRubricCriterionVariables;
    return missionId == otherTyped.missionId && 
    criterionName == otherTyped.criterionName && 
    description == otherTyped.description && 
    maxPoints == otherTyped.maxPoints && 
    order == otherTyped.order;
    
  }
  @override
  int get hashCode => Object.hashAll([missionId.hashCode, criterionName.hashCode, description.hashCode, maxPoints.hashCode, order.hashCode]);
  

  Map<String, dynamic> toJson() {
    Map<String, dynamic> json = {};
    json['missionId'] = nativeToJson<String>(missionId);
    json['criterionName'] = nativeToJson<String>(criterionName);
    if(description.state == OptionalState.set) {
      json['description'] = description.toJson();
    }
    json['maxPoints'] = nativeToJson<double>(maxPoints);
    json['order'] = nativeToJson<int>(order);
    return json;
  }

  AdminCreateRubricCriterionVariables({
    required this.missionId,
    required this.criterionName,
    required this.description,
    required this.maxPoints,
    required this.order,
  });
}

