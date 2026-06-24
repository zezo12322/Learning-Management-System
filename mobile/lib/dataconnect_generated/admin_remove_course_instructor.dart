part of 'generated.dart';

class AdminRemoveCourseInstructorVariablesBuilder {
  String courseId;
  String userId;

  final FirebaseDataConnect _dataConnect;
  AdminRemoveCourseInstructorVariablesBuilder(this._dataConnect, {required  this.courseId,required  this.userId,});
  Deserializer<AdminRemoveCourseInstructorData> dataDeserializer = (dynamic json)  => AdminRemoveCourseInstructorData.fromJson(jsonDecode(json));
  Serializer<AdminRemoveCourseInstructorVariables> varsSerializer = (AdminRemoveCourseInstructorVariables vars) => jsonEncode(vars.toJson());
  Future<OperationResult<AdminRemoveCourseInstructorData, AdminRemoveCourseInstructorVariables>> execute() {
    return ref().execute();
  }

  MutationRef<AdminRemoveCourseInstructorData, AdminRemoveCourseInstructorVariables> ref() {
    AdminRemoveCourseInstructorVariables vars= AdminRemoveCourseInstructorVariables(courseId: courseId,userId: userId,);
    return _dataConnect.mutation("AdminRemoveCourseInstructor", dataDeserializer, varsSerializer, vars);
  }
}

@immutable
class AdminRemoveCourseInstructorCourseInstructorDelete {
  final String courseId;
  final String userId;
  AdminRemoveCourseInstructorCourseInstructorDelete.fromJson(dynamic json):
  
  courseId = nativeFromJson<String>(json['courseId']),
  userId = nativeFromJson<String>(json['userId']);
  @override
  bool operator ==(Object other) {
    if(identical(this, other)) {
      return true;
    }
    if(other.runtimeType != runtimeType) {
      return false;
    }

    final AdminRemoveCourseInstructorCourseInstructorDelete otherTyped = other as AdminRemoveCourseInstructorCourseInstructorDelete;
    return courseId == otherTyped.courseId && 
    userId == otherTyped.userId;
    
  }
  @override
  int get hashCode => Object.hashAll([courseId.hashCode, userId.hashCode]);
  

  Map<String, dynamic> toJson() {
    Map<String, dynamic> json = {};
    json['courseId'] = nativeToJson<String>(courseId);
    json['userId'] = nativeToJson<String>(userId);
    return json;
  }

  AdminRemoveCourseInstructorCourseInstructorDelete({
    required this.courseId,
    required this.userId,
  });
}

@immutable
class AdminRemoveCourseInstructorData {
  final AdminRemoveCourseInstructorCourseInstructorDelete? courseInstructor_delete;
  AdminRemoveCourseInstructorData.fromJson(dynamic json):
  
  courseInstructor_delete = json['courseInstructor_delete'] == null ? null : AdminRemoveCourseInstructorCourseInstructorDelete.fromJson(json['courseInstructor_delete']);
  @override
  bool operator ==(Object other) {
    if(identical(this, other)) {
      return true;
    }
    if(other.runtimeType != runtimeType) {
      return false;
    }

    final AdminRemoveCourseInstructorData otherTyped = other as AdminRemoveCourseInstructorData;
    return courseInstructor_delete == otherTyped.courseInstructor_delete;
    
  }
  @override
  int get hashCode => courseInstructor_delete.hashCode;
  

  Map<String, dynamic> toJson() {
    Map<String, dynamic> json = {};
    if (courseInstructor_delete != null) {
      json['courseInstructor_delete'] = courseInstructor_delete!.toJson();
    }
    return json;
  }

  AdminRemoveCourseInstructorData({
    this.courseInstructor_delete,
  });
}

@immutable
class AdminRemoveCourseInstructorVariables {
  final String courseId;
  final String userId;
  @Deprecated('fromJson is deprecated for Variable classes as they are no longer required for deserialization.')
  AdminRemoveCourseInstructorVariables.fromJson(Map<String, dynamic> json):
  
  courseId = nativeFromJson<String>(json['courseId']),
  userId = nativeFromJson<String>(json['userId']);
  @override
  bool operator ==(Object other) {
    if(identical(this, other)) {
      return true;
    }
    if(other.runtimeType != runtimeType) {
      return false;
    }

    final AdminRemoveCourseInstructorVariables otherTyped = other as AdminRemoveCourseInstructorVariables;
    return courseId == otherTyped.courseId && 
    userId == otherTyped.userId;
    
  }
  @override
  int get hashCode => Object.hashAll([courseId.hashCode, userId.hashCode]);
  

  Map<String, dynamic> toJson() {
    Map<String, dynamic> json = {};
    json['courseId'] = nativeToJson<String>(courseId);
    json['userId'] = nativeToJson<String>(userId);
    return json;
  }

  AdminRemoveCourseInstructorVariables({
    required this.courseId,
    required this.userId,
  });
}

