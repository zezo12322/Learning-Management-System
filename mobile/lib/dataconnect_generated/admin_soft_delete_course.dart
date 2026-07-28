part of 'generated.dart';

class AdminSoftDeleteCourseVariablesBuilder {
  String courseId;

  final FirebaseDataConnect _dataConnect;
  AdminSoftDeleteCourseVariablesBuilder(this._dataConnect, {required  this.courseId,});
  Deserializer<AdminSoftDeleteCourseData> dataDeserializer = (dynamic json)  => AdminSoftDeleteCourseData.fromJson(jsonDecode(json));
  Serializer<AdminSoftDeleteCourseVariables> varsSerializer = (AdminSoftDeleteCourseVariables vars) => jsonEncode(vars.toJson());
  Future<OperationResult<AdminSoftDeleteCourseData, AdminSoftDeleteCourseVariables>> execute() {
    return ref().execute();
  }

  MutationRef<AdminSoftDeleteCourseData, AdminSoftDeleteCourseVariables> ref() {
    AdminSoftDeleteCourseVariables vars= AdminSoftDeleteCourseVariables(courseId: courseId,);
    return _dataConnect.mutation("AdminSoftDeleteCourse", dataDeserializer, varsSerializer, vars);
  }
}

@immutable
class AdminSoftDeleteCourseCourseUpdate {
  final String id;
  AdminSoftDeleteCourseCourseUpdate.fromJson(dynamic json):
  
  id = nativeFromJson<String>(json['id']);
  @override
  bool operator ==(Object other) {
    if(identical(this, other)) {
      return true;
    }
    if(other.runtimeType != runtimeType) {
      return false;
    }

    final AdminSoftDeleteCourseCourseUpdate otherTyped = other as AdminSoftDeleteCourseCourseUpdate;
    return id == otherTyped.id;
    
  }
  @override
  int get hashCode => id.hashCode;
  

  Map<String, dynamic> toJson() {
    Map<String, dynamic> json = {};
    json['id'] = nativeToJson<String>(id);
    return json;
  }

  AdminSoftDeleteCourseCourseUpdate({
    required this.id,
  });
}

@immutable
class AdminSoftDeleteCourseData {
  final AdminSoftDeleteCourseCourseUpdate? course_update;
  AdminSoftDeleteCourseData.fromJson(dynamic json):
  
  course_update = json['course_update'] == null ? null : AdminSoftDeleteCourseCourseUpdate.fromJson(json['course_update']);
  @override
  bool operator ==(Object other) {
    if(identical(this, other)) {
      return true;
    }
    if(other.runtimeType != runtimeType) {
      return false;
    }

    final AdminSoftDeleteCourseData otherTyped = other as AdminSoftDeleteCourseData;
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

  AdminSoftDeleteCourseData({
    this.course_update,
  });
}

@immutable
class AdminSoftDeleteCourseVariables {
  final String courseId;
  @Deprecated('fromJson is deprecated for Variable classes as they are no longer required for deserialization.')
  AdminSoftDeleteCourseVariables.fromJson(Map<String, dynamic> json):
  
  courseId = nativeFromJson<String>(json['courseId']);
  @override
  bool operator ==(Object other) {
    if(identical(this, other)) {
      return true;
    }
    if(other.runtimeType != runtimeType) {
      return false;
    }

    final AdminSoftDeleteCourseVariables otherTyped = other as AdminSoftDeleteCourseVariables;
    return courseId == otherTyped.courseId;
    
  }
  @override
  int get hashCode => courseId.hashCode;
  

  Map<String, dynamic> toJson() {
    Map<String, dynamic> json = {};
    json['courseId'] = nativeToJson<String>(courseId);
    return json;
  }

  AdminSoftDeleteCourseVariables({
    required this.courseId,
  });
}

