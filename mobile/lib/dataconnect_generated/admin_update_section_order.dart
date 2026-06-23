part of 'generated.dart';

class AdminUpdateSectionOrderVariablesBuilder {
  String sectionId;
  int order;

  final FirebaseDataConnect _dataConnect;
  AdminUpdateSectionOrderVariablesBuilder(this._dataConnect, {required  this.sectionId,required  this.order,});
  Deserializer<AdminUpdateSectionOrderData> dataDeserializer = (dynamic json)  => AdminUpdateSectionOrderData.fromJson(jsonDecode(json));
  Serializer<AdminUpdateSectionOrderVariables> varsSerializer = (AdminUpdateSectionOrderVariables vars) => jsonEncode(vars.toJson());
  Future<OperationResult<AdminUpdateSectionOrderData, AdminUpdateSectionOrderVariables>> execute() {
    return ref().execute();
  }

  MutationRef<AdminUpdateSectionOrderData, AdminUpdateSectionOrderVariables> ref() {
    AdminUpdateSectionOrderVariables vars= AdminUpdateSectionOrderVariables(sectionId: sectionId,order: order,);
    return _dataConnect.mutation('AdminUpdateSectionOrder', dataDeserializer, varsSerializer, vars);
  }
}

@immutable
class AdminUpdateSectionOrderCourseSectionUpdate {
  final String id;
  AdminUpdateSectionOrderCourseSectionUpdate.fromJson(dynamic json):
  
  id = nativeFromJson<String>(json['id']);
  @override
  bool operator ==(Object other) {
    if(identical(this, other)) {
      return true;
    }
    if(other.runtimeType != runtimeType) {
      return false;
    }

    final AdminUpdateSectionOrderCourseSectionUpdate otherTyped = other as AdminUpdateSectionOrderCourseSectionUpdate;
    return id == otherTyped.id;
    
  }
  @override
  int get hashCode => id.hashCode;
  

  Map<String, dynamic> toJson() {
    Map<String, dynamic> json = {};
    json['id'] = nativeToJson<String>(id);
    return json;
  }

  AdminUpdateSectionOrderCourseSectionUpdate({
    required this.id,
  });
}

@immutable
class AdminUpdateSectionOrderData {
  final AdminUpdateSectionOrderCourseSectionUpdate? courseSection_update;
  AdminUpdateSectionOrderData.fromJson(dynamic json):
  
  courseSection_update = json['courseSection_update'] == null ? null : AdminUpdateSectionOrderCourseSectionUpdate.fromJson(json['courseSection_update']);
  @override
  bool operator ==(Object other) {
    if(identical(this, other)) {
      return true;
    }
    if(other.runtimeType != runtimeType) {
      return false;
    }

    final AdminUpdateSectionOrderData otherTyped = other as AdminUpdateSectionOrderData;
    return courseSection_update == otherTyped.courseSection_update;
    
  }
  @override
  int get hashCode => courseSection_update.hashCode;
  

  Map<String, dynamic> toJson() {
    Map<String, dynamic> json = {};
    if (courseSection_update != null) {
      json['courseSection_update'] = courseSection_update!.toJson();
    }
    return json;
  }

  AdminUpdateSectionOrderData({
    this.courseSection_update,
  });
}

@immutable
class AdminUpdateSectionOrderVariables {
  final String sectionId;
  final int order;
  @Deprecated('fromJson is deprecated for Variable classes as they are no longer required for deserialization.')
  AdminUpdateSectionOrderVariables.fromJson(Map<String, dynamic> json):
  
  sectionId = nativeFromJson<String>(json['sectionId']),
  order = nativeFromJson<int>(json['order']);
  @override
  bool operator ==(Object other) {
    if(identical(this, other)) {
      return true;
    }
    if(other.runtimeType != runtimeType) {
      return false;
    }

    final AdminUpdateSectionOrderVariables otherTyped = other as AdminUpdateSectionOrderVariables;
    return sectionId == otherTyped.sectionId && 
    order == otherTyped.order;
    
  }
  @override
  int get hashCode => Object.hashAll([sectionId.hashCode, order.hashCode]);
  

  Map<String, dynamic> toJson() {
    Map<String, dynamic> json = {};
    json['sectionId'] = nativeToJson<String>(sectionId);
    json['order'] = nativeToJson<int>(order);
    return json;
  }

  AdminUpdateSectionOrderVariables({
    required this.sectionId,
    required this.order,
  });
}

