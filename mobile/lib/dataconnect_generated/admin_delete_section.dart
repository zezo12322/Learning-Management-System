part of 'generated.dart';

class AdminDeleteSectionVariablesBuilder {
  String sectionId;

  final FirebaseDataConnect _dataConnect;
  AdminDeleteSectionVariablesBuilder(this._dataConnect, {required  this.sectionId,});
  Deserializer<AdminDeleteSectionData> dataDeserializer = (dynamic json)  => AdminDeleteSectionData.fromJson(jsonDecode(json));
  Serializer<AdminDeleteSectionVariables> varsSerializer = (AdminDeleteSectionVariables vars) => jsonEncode(vars.toJson());
  Future<OperationResult<AdminDeleteSectionData, AdminDeleteSectionVariables>> execute() {
    return ref().execute();
  }

  MutationRef<AdminDeleteSectionData, AdminDeleteSectionVariables> ref() {
    AdminDeleteSectionVariables vars= AdminDeleteSectionVariables(sectionId: sectionId,);
    return _dataConnect.mutation('AdminDeleteSection', dataDeserializer, varsSerializer, vars);
  }
}

@immutable
class AdminDeleteSectionCourseSectionDelete {
  final String id;
  AdminDeleteSectionCourseSectionDelete.fromJson(dynamic json):
  
  id = nativeFromJson<String>(json['id']);
  @override
  bool operator ==(Object other) {
    if(identical(this, other)) {
      return true;
    }
    if(other.runtimeType != runtimeType) {
      return false;
    }

    final AdminDeleteSectionCourseSectionDelete otherTyped = other as AdminDeleteSectionCourseSectionDelete;
    return id == otherTyped.id;
    
  }
  @override
  int get hashCode => id.hashCode;
  

  Map<String, dynamic> toJson() {
    Map<String, dynamic> json = {};
    json['id'] = nativeToJson<String>(id);
    return json;
  }

  AdminDeleteSectionCourseSectionDelete({
    required this.id,
  });
}

@immutable
class AdminDeleteSectionData {
  final AdminDeleteSectionCourseSectionDelete? courseSection_delete;
  AdminDeleteSectionData.fromJson(dynamic json):
  
  courseSection_delete = json['courseSection_delete'] == null ? null : AdminDeleteSectionCourseSectionDelete.fromJson(json['courseSection_delete']);
  @override
  bool operator ==(Object other) {
    if(identical(this, other)) {
      return true;
    }
    if(other.runtimeType != runtimeType) {
      return false;
    }

    final AdminDeleteSectionData otherTyped = other as AdminDeleteSectionData;
    return courseSection_delete == otherTyped.courseSection_delete;
    
  }
  @override
  int get hashCode => courseSection_delete.hashCode;
  

  Map<String, dynamic> toJson() {
    Map<String, dynamic> json = {};
    if (courseSection_delete != null) {
      json['courseSection_delete'] = courseSection_delete!.toJson();
    }
    return json;
  }

  AdminDeleteSectionData({
    this.courseSection_delete,
  });
}

@immutable
class AdminDeleteSectionVariables {
  final String sectionId;
  @Deprecated('fromJson is deprecated for Variable classes as they are no longer required for deserialization.')
  AdminDeleteSectionVariables.fromJson(Map<String, dynamic> json):
  
  sectionId = nativeFromJson<String>(json['sectionId']);
  @override
  bool operator ==(Object other) {
    if(identical(this, other)) {
      return true;
    }
    if(other.runtimeType != runtimeType) {
      return false;
    }

    final AdminDeleteSectionVariables otherTyped = other as AdminDeleteSectionVariables;
    return sectionId == otherTyped.sectionId;
    
  }
  @override
  int get hashCode => sectionId.hashCode;
  

  Map<String, dynamic> toJson() {
    Map<String, dynamic> json = {};
    json['sectionId'] = nativeToJson<String>(sectionId);
    return json;
  }

  AdminDeleteSectionVariables({
    required this.sectionId,
  });
}

