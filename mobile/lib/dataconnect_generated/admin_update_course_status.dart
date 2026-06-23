part of 'generated.dart';

class AdminUpdateCourseStatusVariablesBuilder {
  String courseId;
  CourseStatus status;

  final FirebaseDataConnect _dataConnect;
  AdminUpdateCourseStatusVariablesBuilder(this._dataConnect, {required  this.courseId,required  this.status,});
  Deserializer<AdminUpdateCourseStatusData> dataDeserializer = (dynamic json)  => AdminUpdateCourseStatusData.fromJson(jsonDecode(json));
  Serializer<AdminUpdateCourseStatusVariables> varsSerializer = (AdminUpdateCourseStatusVariables vars) => jsonEncode(vars.toJson());
  Future<OperationResult<AdminUpdateCourseStatusData, AdminUpdateCourseStatusVariables>> execute() {
    return ref().execute();
  }

  MutationRef<AdminUpdateCourseStatusData, AdminUpdateCourseStatusVariables> ref() {
    AdminUpdateCourseStatusVariables vars= AdminUpdateCourseStatusVariables(courseId: courseId,status: status,);
    return _dataConnect.mutation('AdminUpdateCourseStatus', dataDeserializer, varsSerializer, vars);
  }
}

@immutable
class AdminUpdateCourseStatusCourseUpdate {
  final String id;
  AdminUpdateCourseStatusCourseUpdate.fromJson(dynamic json):
  
  id = nativeFromJson<String>(json['id']);
  @override
  bool operator ==(Object other) {
    if(identical(this, other)) {
      return true;
    }
    if(other.runtimeType != runtimeType) {
      return false;
    }

    final AdminUpdateCourseStatusCourseUpdate otherTyped = other as AdminUpdateCourseStatusCourseUpdate;
    return id == otherTyped.id;
    
  }
  @override
  int get hashCode => id.hashCode;
  

  Map<String, dynamic> toJson() {
    Map<String, dynamic> json = {};
    json['id'] = nativeToJson<String>(id);
    return json;
  }

  AdminUpdateCourseStatusCourseUpdate({
    required this.id,
  });
}

@immutable
class AdminUpdateCourseStatusData {
  final AdminUpdateCourseStatusCourseUpdate? course_update;
  AdminUpdateCourseStatusData.fromJson(dynamic json):
  
  course_update = json['course_update'] == null ? null : AdminUpdateCourseStatusCourseUpdate.fromJson(json['course_update']);
  @override
  bool operator ==(Object other) {
    if(identical(this, other)) {
      return true;
    }
    if(other.runtimeType != runtimeType) {
      return false;
    }

    final AdminUpdateCourseStatusData otherTyped = other as AdminUpdateCourseStatusData;
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

  AdminUpdateCourseStatusData({
    this.course_update,
  });
}

@immutable
class AdminUpdateCourseStatusVariables {
  final String courseId;
  final CourseStatus status;
  @Deprecated('fromJson is deprecated for Variable classes as they are no longer required for deserialization.')
  AdminUpdateCourseStatusVariables.fromJson(Map<String, dynamic> json):
  
  courseId = nativeFromJson<String>(json['courseId']),
  status = CourseStatus.values.byName(json['status']);
  @override
  bool operator ==(Object other) {
    if(identical(this, other)) {
      return true;
    }
    if(other.runtimeType != runtimeType) {
      return false;
    }

    final AdminUpdateCourseStatusVariables otherTyped = other as AdminUpdateCourseStatusVariables;
    return courseId == otherTyped.courseId && 
    status == otherTyped.status;
    
  }
  @override
  int get hashCode => Object.hashAll([courseId.hashCode, status.hashCode]);
  

  Map<String, dynamic> toJson() {
    Map<String, dynamic> json = {};
    json['courseId'] = nativeToJson<String>(courseId);
    json['status'] = 
    status.name
    ;
    return json;
  }

  AdminUpdateCourseStatusVariables({
    required this.courseId,
    required this.status,
  });
}

