part of 'generated.dart';

class AdminSoftDeleteSectionVariablesBuilder {
  String sectionId;

  final FirebaseDataConnect _dataConnect;
  AdminSoftDeleteSectionVariablesBuilder(this._dataConnect, {required  this.sectionId,});
  Deserializer<AdminSoftDeleteSectionData> dataDeserializer = (dynamic json)  => AdminSoftDeleteSectionData.fromJson(jsonDecode(json));
  Serializer<AdminSoftDeleteSectionVariables> varsSerializer = (AdminSoftDeleteSectionVariables vars) => jsonEncode(vars.toJson());
  Future<OperationResult<AdminSoftDeleteSectionData, AdminSoftDeleteSectionVariables>> execute() {
    return ref().execute();
  }

  MutationRef<AdminSoftDeleteSectionData, AdminSoftDeleteSectionVariables> ref() {
    AdminSoftDeleteSectionVariables vars= AdminSoftDeleteSectionVariables(sectionId: sectionId,);
    return _dataConnect.mutation("AdminSoftDeleteSection", dataDeserializer, varsSerializer, vars);
  }
}

@immutable
class AdminSoftDeleteSectionCourseSectionUpdate {
  final String id;
  AdminSoftDeleteSectionCourseSectionUpdate.fromJson(dynamic json):
  
  id = nativeFromJson<String>(json['id']);
  @override
  bool operator ==(Object other) {
    if(identical(this, other)) {
      return true;
    }
    if(other.runtimeType != runtimeType) {
      return false;
    }

    final AdminSoftDeleteSectionCourseSectionUpdate otherTyped = other as AdminSoftDeleteSectionCourseSectionUpdate;
    return id == otherTyped.id;
    
  }
  @override
  int get hashCode => id.hashCode;
  

  Map<String, dynamic> toJson() {
    Map<String, dynamic> json = {};
    json['id'] = nativeToJson<String>(id);
    return json;
  }

  AdminSoftDeleteSectionCourseSectionUpdate({
    required this.id,
  });
}

@immutable
class AdminSoftDeleteSectionData {
  final AdminSoftDeleteSectionCourseSectionUpdate? courseSection_update;
  AdminSoftDeleteSectionData.fromJson(dynamic json):
  
  courseSection_update = json['courseSection_update'] == null ? null : AdminSoftDeleteSectionCourseSectionUpdate.fromJson(json['courseSection_update']);
  @override
  bool operator ==(Object other) {
    if(identical(this, other)) {
      return true;
    }
    if(other.runtimeType != runtimeType) {
      return false;
    }

    final AdminSoftDeleteSectionData otherTyped = other as AdminSoftDeleteSectionData;
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

  AdminSoftDeleteSectionData({
    this.courseSection_update,
  });
}

@immutable
class AdminSoftDeleteSectionVariables {
  final String sectionId;
  @Deprecated('fromJson is deprecated for Variable classes as they are no longer required for deserialization.')
  AdminSoftDeleteSectionVariables.fromJson(Map<String, dynamic> json):
  
  sectionId = nativeFromJson<String>(json['sectionId']);
  @override
  bool operator ==(Object other) {
    if(identical(this, other)) {
      return true;
    }
    if(other.runtimeType != runtimeType) {
      return false;
    }

    final AdminSoftDeleteSectionVariables otherTyped = other as AdminSoftDeleteSectionVariables;
    return sectionId == otherTyped.sectionId;
    
  }
  @override
  int get hashCode => sectionId.hashCode;
  

  Map<String, dynamic> toJson() {
    Map<String, dynamic> json = {};
    json['sectionId'] = nativeToJson<String>(sectionId);
    return json;
  }

  AdminSoftDeleteSectionVariables({
    required this.sectionId,
  });
}

