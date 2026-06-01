part of 'generated.dart';

class AdminDeleteCourseVariablesBuilder {
  String courseId;

  final FirebaseDataConnect _dataConnect;
  AdminDeleteCourseVariablesBuilder(this._dataConnect, {required  this.courseId,});
  Deserializer<AdminDeleteCourseData> dataDeserializer = (dynamic json)  => AdminDeleteCourseData.fromJson(jsonDecode(json));
  Serializer<AdminDeleteCourseVariables> varsSerializer = (AdminDeleteCourseVariables vars) => jsonEncode(vars.toJson());
  Future<OperationResult<AdminDeleteCourseData, AdminDeleteCourseVariables>> execute() {
    return ref().execute();
  }

  MutationRef<AdminDeleteCourseData, AdminDeleteCourseVariables> ref() {
    AdminDeleteCourseVariables vars= AdminDeleteCourseVariables(courseId: courseId,);
    return _dataConnect.mutation("AdminDeleteCourse", dataDeserializer, varsSerializer, vars);
  }
}

@immutable
class AdminDeleteCourseCourseUpdate {
  final String id;
  AdminDeleteCourseCourseUpdate.fromJson(dynamic json):
  
  id = nativeFromJson<String>(json['id']);
  @override
  bool operator ==(Object other) {
    if(identical(this, other)) {
      return true;
    }
    if(other.runtimeType != runtimeType) {
      return false;
    }

    final AdminDeleteCourseCourseUpdate otherTyped = other as AdminDeleteCourseCourseUpdate;
    return id == otherTyped.id;
    
  }
  @override
  int get hashCode => id.hashCode;
  

  Map<String, dynamic> toJson() {
    Map<String, dynamic> json = {};
    json['id'] = nativeToJson<String>(id);
    return json;
  }

  AdminDeleteCourseCourseUpdate({
    required this.id,
  });
}

@immutable
class AdminDeleteCourseData {
  final AdminDeleteCourseCourseUpdate? course_update;
  AdminDeleteCourseData.fromJson(dynamic json):
  
  course_update = json['course_update'] == null ? null : AdminDeleteCourseCourseUpdate.fromJson(json['course_update']);
  @override
  bool operator ==(Object other) {
    if(identical(this, other)) {
      return true;
    }
    if(other.runtimeType != runtimeType) {
      return false;
    }

    final AdminDeleteCourseData otherTyped = other as AdminDeleteCourseData;
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

  AdminDeleteCourseData({
    this.course_update,
  });
}

@immutable
class AdminDeleteCourseVariables {
  final String courseId;
  @Deprecated('fromJson is deprecated for Variable classes as they are no longer required for deserialization.')
  AdminDeleteCourseVariables.fromJson(Map<String, dynamic> json):
  
  courseId = nativeFromJson<String>(json['courseId']);
  @override
  bool operator ==(Object other) {
    if(identical(this, other)) {
      return true;
    }
    if(other.runtimeType != runtimeType) {
      return false;
    }

    final AdminDeleteCourseVariables otherTyped = other as AdminDeleteCourseVariables;
    return courseId == otherTyped.courseId;
    
  }
  @override
  int get hashCode => courseId.hashCode;
  

  Map<String, dynamic> toJson() {
    Map<String, dynamic> json = {};
    json['courseId'] = nativeToJson<String>(courseId);
    return json;
  }

  AdminDeleteCourseVariables({
    required this.courseId,
  });
}

