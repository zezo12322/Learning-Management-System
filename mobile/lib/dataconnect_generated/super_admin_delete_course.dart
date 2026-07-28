part of 'generated.dart';

class SuperAdminDeleteCourseVariablesBuilder {
  String courseId;

  final FirebaseDataConnect _dataConnect;
  SuperAdminDeleteCourseVariablesBuilder(this._dataConnect, {required  this.courseId,});
  Deserializer<SuperAdminDeleteCourseData> dataDeserializer = (dynamic json)  => SuperAdminDeleteCourseData.fromJson(jsonDecode(json));
  Serializer<SuperAdminDeleteCourseVariables> varsSerializer = (SuperAdminDeleteCourseVariables vars) => jsonEncode(vars.toJson());
  Future<OperationResult<SuperAdminDeleteCourseData, SuperAdminDeleteCourseVariables>> execute() {
    return ref().execute();
  }

  MutationRef<SuperAdminDeleteCourseData, SuperAdminDeleteCourseVariables> ref() {
    SuperAdminDeleteCourseVariables vars= SuperAdminDeleteCourseVariables(courseId: courseId,);
    return _dataConnect.mutation("SuperAdminDeleteCourse", dataDeserializer, varsSerializer, vars);
  }
}

@immutable
class SuperAdminDeleteCourseCourseUpdate {
  final String id;
  SuperAdminDeleteCourseCourseUpdate.fromJson(dynamic json):
  
  id = nativeFromJson<String>(json['id']);
  @override
  bool operator ==(Object other) {
    if(identical(this, other)) {
      return true;
    }
    if(other.runtimeType != runtimeType) {
      return false;
    }

    final SuperAdminDeleteCourseCourseUpdate otherTyped = other as SuperAdminDeleteCourseCourseUpdate;
    return id == otherTyped.id;
    
  }
  @override
  int get hashCode => id.hashCode;
  

  Map<String, dynamic> toJson() {
    Map<String, dynamic> json = {};
    json['id'] = nativeToJson<String>(id);
    return json;
  }

  SuperAdminDeleteCourseCourseUpdate({
    required this.id,
  });
}

@immutable
class SuperAdminDeleteCourseData {
  final SuperAdminDeleteCourseCourseUpdate? course_update;
  SuperAdminDeleteCourseData.fromJson(dynamic json):
  
  course_update = json['course_update'] == null ? null : SuperAdminDeleteCourseCourseUpdate.fromJson(json['course_update']);
  @override
  bool operator ==(Object other) {
    if(identical(this, other)) {
      return true;
    }
    if(other.runtimeType != runtimeType) {
      return false;
    }

    final SuperAdminDeleteCourseData otherTyped = other as SuperAdminDeleteCourseData;
    return course_update == otherTyped.course_update;
    
  }
  @override
  int get hashCode => course_update.hashCode;
  

  Map<String, dynamic> toJson() {
    Map<String, dynamic> json = {};
    if (course_update != null) {
      json['course_update'] = course_update!.toJson();
    }
    return json;
  }

  SuperAdminDeleteCourseData({
    this.course_update,
  });
}

@immutable
class SuperAdminDeleteCourseVariables {
  final String courseId;
  @Deprecated('fromJson is deprecated for Variable classes as they are no longer required for deserialization.')
  SuperAdminDeleteCourseVariables.fromJson(Map<String, dynamic> json):
  
  courseId = nativeFromJson<String>(json['courseId']);
  @override
  bool operator ==(Object other) {
    if(identical(this, other)) {
      return true;
    }
    if(other.runtimeType != runtimeType) {
      return false;
    }

    final SuperAdminDeleteCourseVariables otherTyped = other as SuperAdminDeleteCourseVariables;
    return courseId == otherTyped.courseId;
    
  }
  @override
  int get hashCode => courseId.hashCode;
  

  Map<String, dynamic> toJson() {
    Map<String, dynamic> json = {};
    json['courseId'] = nativeToJson<String>(courseId);
    return json;
  }

  SuperAdminDeleteCourseVariables({
    required this.courseId,
  });
}

