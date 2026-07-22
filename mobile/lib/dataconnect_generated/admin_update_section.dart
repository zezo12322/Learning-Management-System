part of 'generated.dart';

class AdminUpdateSectionVariablesBuilder {
  String sectionId;
  String title;

  final FirebaseDataConnect _dataConnect;
  AdminUpdateSectionVariablesBuilder(this._dataConnect, {required  this.sectionId,required  this.title,});
  Deserializer<AdminUpdateSectionData> dataDeserializer = (dynamic json)  => AdminUpdateSectionData.fromJson(jsonDecode(json));
  Serializer<AdminUpdateSectionVariables> varsSerializer = (AdminUpdateSectionVariables vars) => jsonEncode(vars.toJson());
  Future<OperationResult<AdminUpdateSectionData, AdminUpdateSectionVariables>> execute() {
    return ref().execute();
  }

  MutationRef<AdminUpdateSectionData, AdminUpdateSectionVariables> ref() {
    AdminUpdateSectionVariables vars= AdminUpdateSectionVariables(sectionId: sectionId,title: title,);
    return _dataConnect.mutation("AdminUpdateSection", dataDeserializer, varsSerializer, vars);
  }
}

@immutable
class AdminUpdateSectionCourseSectionUpdate {
  final String id;
  AdminUpdateSectionCourseSectionUpdate.fromJson(dynamic json):
  
  id = nativeFromJson<String>(json['id']);
  @override
  bool operator ==(Object other) {
    if(identical(this, other)) {
      return true;
    }
    if(other.runtimeType != runtimeType) {
      return false;
    }

    final AdminUpdateSectionCourseSectionUpdate otherTyped = other as AdminUpdateSectionCourseSectionUpdate;
    return id == otherTyped.id;
    
  }
  @override
  int get hashCode => id.hashCode;
  

  Map<String, dynamic> toJson() {
    Map<String, dynamic> json = {};
    json['id'] = nativeToJson<String>(id);
    return json;
  }

  AdminUpdateSectionCourseSectionUpdate({
    required this.id,
  });
}

@immutable
class AdminUpdateSectionData {
  final AdminUpdateSectionCourseSectionUpdate? courseSection_update;
  AdminUpdateSectionData.fromJson(dynamic json):
  
  courseSection_update = json['courseSection_update'] == null ? null : AdminUpdateSectionCourseSectionUpdate.fromJson(json['courseSection_update']);
  @override
  bool operator ==(Object other) {
    if(identical(this, other)) {
      return true;
    }
    if(other.runtimeType != runtimeType) {
      return false;
    }

    final AdminUpdateSectionData otherTyped = other as AdminUpdateSectionData;
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

  AdminUpdateSectionData({
    this.courseSection_update,
  });
}

@immutable
class AdminUpdateSectionVariables {
  final String sectionId;
  final String title;
  @Deprecated('fromJson is deprecated for Variable classes as they are no longer required for deserialization.')
  AdminUpdateSectionVariables.fromJson(Map<String, dynamic> json):
  
  sectionId = nativeFromJson<String>(json['sectionId']),
  title = nativeFromJson<String>(json['title']);
  @override
  bool operator ==(Object other) {
    if(identical(this, other)) {
      return true;
    }
    if(other.runtimeType != runtimeType) {
      return false;
    }

    final AdminUpdateSectionVariables otherTyped = other as AdminUpdateSectionVariables;
    return sectionId == otherTyped.sectionId && 
    title == otherTyped.title;
    
  }
  @override
  int get hashCode => Object.hashAll([sectionId.hashCode, title.hashCode]);
  

  Map<String, dynamic> toJson() {
    Map<String, dynamic> json = {};
    json['sectionId'] = nativeToJson<String>(sectionId);
    json['title'] = nativeToJson<String>(title);
    return json;
  }

  AdminUpdateSectionVariables({
    required this.sectionId,
    required this.title,
  });
}

