part of 'generated.dart';

class AdminAddCourseInstructorVariablesBuilder {
  String courseId;
  String userId;

  final FirebaseDataConnect _dataConnect;
  AdminAddCourseInstructorVariablesBuilder(this._dataConnect, {required  this.courseId,required  this.userId,});
  Deserializer<AdminAddCourseInstructorData> dataDeserializer = (dynamic json)  => AdminAddCourseInstructorData.fromJson(jsonDecode(json));
  Serializer<AdminAddCourseInstructorVariables> varsSerializer = (AdminAddCourseInstructorVariables vars) => jsonEncode(vars.toJson());
  Future<OperationResult<AdminAddCourseInstructorData, AdminAddCourseInstructorVariables>> execute() {
    return ref().execute();
  }

  MutationRef<AdminAddCourseInstructorData, AdminAddCourseInstructorVariables> ref() {
    AdminAddCourseInstructorVariables vars= AdminAddCourseInstructorVariables(courseId: courseId,userId: userId,);
    return _dataConnect.mutation("AdminAddCourseInstructor", dataDeserializer, varsSerializer, vars);
  }
}

@immutable
class AdminAddCourseInstructorCourseInstructorInsert {
  final String courseId;
  final String userId;
  AdminAddCourseInstructorCourseInstructorInsert.fromJson(dynamic json):
  
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

    final AdminAddCourseInstructorCourseInstructorInsert otherTyped = other as AdminAddCourseInstructorCourseInstructorInsert;
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

  AdminAddCourseInstructorCourseInstructorInsert({
    required this.courseId,
    required this.userId,
  });
}

@immutable
class AdminAddCourseInstructorData {
  final AdminAddCourseInstructorCourseInstructorInsert courseInstructor_insert;
  AdminAddCourseInstructorData.fromJson(dynamic json):
  
  courseInstructor_insert = AdminAddCourseInstructorCourseInstructorInsert.fromJson(json['courseInstructor_insert']);
  @override
  bool operator ==(Object other) {
    if(identical(this, other)) {
      return true;
    }
    if(other.runtimeType != runtimeType) {
      return false;
    }

    final AdminAddCourseInstructorData otherTyped = other as AdminAddCourseInstructorData;
    return courseInstructor_insert == otherTyped.courseInstructor_insert;
    
  }
  @override
  int get hashCode => courseInstructor_insert.hashCode;
  

  Map<String, dynamic> toJson() {
    Map<String, dynamic> json = {};
    json['courseInstructor_insert'] = courseInstructor_insert.toJson();
    return json;
  }

  AdminAddCourseInstructorData({
    required this.courseInstructor_insert,
  });
}

@immutable
class AdminAddCourseInstructorVariables {
  final String courseId;
  final String userId;
  @Deprecated('fromJson is deprecated for Variable classes as they are no longer required for deserialization.')
  AdminAddCourseInstructorVariables.fromJson(Map<String, dynamic> json):
  
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

    final AdminAddCourseInstructorVariables otherTyped = other as AdminAddCourseInstructorVariables;
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

  AdminAddCourseInstructorVariables({
    required this.courseId,
    required this.userId,
  });
}

