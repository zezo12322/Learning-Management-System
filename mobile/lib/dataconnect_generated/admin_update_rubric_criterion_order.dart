part of 'generated.dart';

class AdminUpdateRubricCriterionOrderVariablesBuilder {
  String criterionId;
  int order;

  final FirebaseDataConnect _dataConnect;
  AdminUpdateRubricCriterionOrderVariablesBuilder(this._dataConnect, {required  this.criterionId,required  this.order,});
  Deserializer<AdminUpdateRubricCriterionOrderData> dataDeserializer = (dynamic json)  => AdminUpdateRubricCriterionOrderData.fromJson(jsonDecode(json));
  Serializer<AdminUpdateRubricCriterionOrderVariables> varsSerializer = (AdminUpdateRubricCriterionOrderVariables vars) => jsonEncode(vars.toJson());
  Future<OperationResult<AdminUpdateRubricCriterionOrderData, AdminUpdateRubricCriterionOrderVariables>> execute() {
    return ref().execute();
  }

  MutationRef<AdminUpdateRubricCriterionOrderData, AdminUpdateRubricCriterionOrderVariables> ref() {
    AdminUpdateRubricCriterionOrderVariables vars= AdminUpdateRubricCriterionOrderVariables(criterionId: criterionId,order: order,);
    return _dataConnect.mutation("AdminUpdateRubricCriterionOrder", dataDeserializer, varsSerializer, vars);
  }
}

@immutable
class AdminUpdateRubricCriterionOrderRubricCriterionUpdate {
  final String id;
  AdminUpdateRubricCriterionOrderRubricCriterionUpdate.fromJson(dynamic json):
  
  id = nativeFromJson<String>(json['id']);
  @override
  bool operator ==(Object other) {
    if(identical(this, other)) {
      return true;
    }
    if(other.runtimeType != runtimeType) {
      return false;
    }

    final AdminUpdateRubricCriterionOrderRubricCriterionUpdate otherTyped = other as AdminUpdateRubricCriterionOrderRubricCriterionUpdate;
    return id == otherTyped.id;
    
  }
  @override
  int get hashCode => id.hashCode;
  

  Map<String, dynamic> toJson() {
    Map<String, dynamic> json = {};
    json['id'] = nativeToJson<String>(id);
    return json;
  }

  AdminUpdateRubricCriterionOrderRubricCriterionUpdate({
    required this.id,
  });
}

@immutable
class AdminUpdateRubricCriterionOrderData {
  final AdminUpdateRubricCriterionOrderRubricCriterionUpdate? rubricCriterion_update;
  AdminUpdateRubricCriterionOrderData.fromJson(dynamic json):
  
  rubricCriterion_update = json['rubricCriterion_update'] == null ? null : AdminUpdateRubricCriterionOrderRubricCriterionUpdate.fromJson(json['rubricCriterion_update']);
  @override
  bool operator ==(Object other) {
    if(identical(this, other)) {
      return true;
    }
    if(other.runtimeType != runtimeType) {
      return false;
    }

    final AdminUpdateRubricCriterionOrderData otherTyped = other as AdminUpdateRubricCriterionOrderData;
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

  AdminUpdateRubricCriterionOrderData({
    this.rubricCriterion_update,
  });
}

@immutable
class AdminUpdateRubricCriterionOrderVariables {
  final String criterionId;
  final int order;
  @Deprecated('fromJson is deprecated for Variable classes as they are no longer required for deserialization.')
  AdminUpdateRubricCriterionOrderVariables.fromJson(Map<String, dynamic> json):
  
  criterionId = nativeFromJson<String>(json['criterionId']),
  order = nativeFromJson<int>(json['order']);
  @override
  bool operator ==(Object other) {
    if(identical(this, other)) {
      return true;
    }
    if(other.runtimeType != runtimeType) {
      return false;
    }

    final AdminUpdateRubricCriterionOrderVariables otherTyped = other as AdminUpdateRubricCriterionOrderVariables;
    return criterionId == otherTyped.criterionId && 
    order == otherTyped.order;
    
  }
  @override
  int get hashCode => Object.hashAll([criterionId.hashCode, order.hashCode]);
  

  Map<String, dynamic> toJson() {
    Map<String, dynamic> json = {};
    json['criterionId'] = nativeToJson<String>(criterionId);
    json['order'] = nativeToJson<int>(order);
    return json;
  }

  AdminUpdateRubricCriterionOrderVariables({
    required this.criterionId,
    required this.order,
  });
}

