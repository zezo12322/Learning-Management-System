part of 'generated.dart';

class AdminDeleteRubricCriterionVariablesBuilder {
  String criterionId;

  final FirebaseDataConnect _dataConnect;
  AdminDeleteRubricCriterionVariablesBuilder(this._dataConnect, {required  this.criterionId,});
  Deserializer<AdminDeleteRubricCriterionData> dataDeserializer = (dynamic json)  => AdminDeleteRubricCriterionData.fromJson(jsonDecode(json));
  Serializer<AdminDeleteRubricCriterionVariables> varsSerializer = (AdminDeleteRubricCriterionVariables vars) => jsonEncode(vars.toJson());
  Future<OperationResult<AdminDeleteRubricCriterionData, AdminDeleteRubricCriterionVariables>> execute() {
    return ref().execute();
  }

  MutationRef<AdminDeleteRubricCriterionData, AdminDeleteRubricCriterionVariables> ref() {
    AdminDeleteRubricCriterionVariables vars= AdminDeleteRubricCriterionVariables(criterionId: criterionId,);
    return _dataConnect.mutation("AdminDeleteRubricCriterion", dataDeserializer, varsSerializer, vars);
  }
}

@immutable
class AdminDeleteRubricCriterionRubricCriterionDelete {
  final String id;
  AdminDeleteRubricCriterionRubricCriterionDelete.fromJson(dynamic json):
  
  id = nativeFromJson<String>(json['id']);
  @override
  bool operator ==(Object other) {
    if(identical(this, other)) {
      return true;
    }
    if(other.runtimeType != runtimeType) {
      return false;
    }

    final AdminDeleteRubricCriterionRubricCriterionDelete otherTyped = other as AdminDeleteRubricCriterionRubricCriterionDelete;
    return id == otherTyped.id;
    
  }
  @override
  int get hashCode => id.hashCode;
  

  Map<String, dynamic> toJson() {
    Map<String, dynamic> json = {};
    json['id'] = nativeToJson<String>(id);
    return json;
  }

  AdminDeleteRubricCriterionRubricCriterionDelete({
    required this.id,
  });
}

@immutable
class AdminDeleteRubricCriterionData {
  final AdminDeleteRubricCriterionRubricCriterionDelete? rubricCriterion_delete;
  AdminDeleteRubricCriterionData.fromJson(dynamic json):
  
  rubricCriterion_delete = json['rubricCriterion_delete'] == null ? null : AdminDeleteRubricCriterionRubricCriterionDelete.fromJson(json['rubricCriterion_delete']);
  @override
  bool operator ==(Object other) {
    if(identical(this, other)) {
      return true;
    }
    if(other.runtimeType != runtimeType) {
      return false;
    }

    final AdminDeleteRubricCriterionData otherTyped = other as AdminDeleteRubricCriterionData;
    return rubricCriterion_delete == otherTyped.rubricCriterion_delete;
    
  }
  @override
  int get hashCode => rubricCriterion_delete.hashCode;
  

  Map<String, dynamic> toJson() {
    Map<String, dynamic> json = {};
    if (rubricCriterion_delete != null) {
      json['rubricCriterion_delete'] = rubricCriterion_delete!.toJson();
    }
    return json;
  }

  AdminDeleteRubricCriterionData({
    this.rubricCriterion_delete,
  });
}

@immutable
class AdminDeleteRubricCriterionVariables {
  final String criterionId;
  @Deprecated('fromJson is deprecated for Variable classes as they are no longer required for deserialization.')
  AdminDeleteRubricCriterionVariables.fromJson(Map<String, dynamic> json):
  
  criterionId = nativeFromJson<String>(json['criterionId']);
  @override
  bool operator ==(Object other) {
    if(identical(this, other)) {
      return true;
    }
    if(other.runtimeType != runtimeType) {
      return false;
    }

    final AdminDeleteRubricCriterionVariables otherTyped = other as AdminDeleteRubricCriterionVariables;
    return criterionId == otherTyped.criterionId;
    
  }
  @override
  int get hashCode => criterionId.hashCode;
  

  Map<String, dynamic> toJson() {
    Map<String, dynamic> json = {};
    json['criterionId'] = nativeToJson<String>(criterionId);
    return json;
  }

  AdminDeleteRubricCriterionVariables({
    required this.criterionId,
  });
}

