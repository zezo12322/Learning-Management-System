part of 'generated.dart';

class EnrollInCourseVariablesBuilder {
  String courseId;

  final FirebaseDataConnect _dataConnect;
  EnrollInCourseVariablesBuilder(this._dataConnect, {required  this.courseId,});
  Deserializer<EnrollInCourseData> dataDeserializer = (dynamic json)  => EnrollInCourseData.fromJson(jsonDecode(json));
  Serializer<EnrollInCourseVariables> varsSerializer = (EnrollInCourseVariables vars) => jsonEncode(vars.toJson());
  Future<OperationResult<EnrollInCourseData, EnrollInCourseVariables>> execute() {
    return ref().execute();
  }

  MutationRef<EnrollInCourseData, EnrollInCourseVariables> ref() {
    EnrollInCourseVariables vars= EnrollInCourseVariables(courseId: courseId,);
    return _dataConnect.mutation("EnrollInCourse", dataDeserializer, varsSerializer, vars);
  }
}

@immutable
class EnrollInCourseEnrollmentInsert {
  final String id;
  EnrollInCourseEnrollmentInsert.fromJson(dynamic json):
  
  id = nativeFromJson<String>(json['id']);
  @override
  bool operator ==(Object other) {
    if(identical(this, other)) {
      return true;
    }
    if(other.runtimeType != runtimeType) {
      return false;
    }

    final EnrollInCourseEnrollmentInsert otherTyped = other as EnrollInCourseEnrollmentInsert;
    return id == otherTyped.id;
    
  }
  @override
  int get hashCode => id.hashCode;
  

  Map<String, dynamic> toJson() {
    Map<String, dynamic> json = {};
    json['id'] = nativeToJson<String>(id);
    return json;
  }

  EnrollInCourseEnrollmentInsert({
    required this.id,
  });
}

@immutable
class EnrollInCourseData {
  final EnrollInCourseEnrollmentInsert enrollment_insert;
  EnrollInCourseData.fromJson(dynamic json):
  
  enrollment_insert = EnrollInCourseEnrollmentInsert.fromJson(json['enrollment_insert']);
  @override
  bool operator ==(Object other) {
    if(identical(this, other)) {
      return true;
    }
    if(other.runtimeType != runtimeType) {
      return false;
    }

    final EnrollInCourseData otherTyped = other as EnrollInCourseData;
    return enrollment_insert == otherTyped.enrollment_insert;
    
  }
  @override
  int get hashCode => enrollment_insert.hashCode;
  

  Map<String, dynamic> toJson() {
    Map<String, dynamic> json = {};
    json['enrollment_insert'] = enrollment_insert.toJson();
    return json;
  }

  EnrollInCourseData({
    required this.enrollment_insert,
  });
}

@immutable
class EnrollInCourseVariables {
  final String courseId;
  @Deprecated('fromJson is deprecated for Variable classes as they are no longer required for deserialization.')
  EnrollInCourseVariables.fromJson(Map<String, dynamic> json):
  
  courseId = nativeFromJson<String>(json['courseId']);
  @override
  bool operator ==(Object other) {
    if(identical(this, other)) {
      return true;
    }
    if(other.runtimeType != runtimeType) {
      return false;
    }

    final EnrollInCourseVariables otherTyped = other as EnrollInCourseVariables;
    return courseId == otherTyped.courseId;
    
  }
  @override
  int get hashCode => courseId.hashCode;
  

  Map<String, dynamic> toJson() {
    Map<String, dynamic> json = {};
    json['courseId'] = nativeToJson<String>(courseId);
    return json;
  }

  EnrollInCourseVariables({
    required this.courseId,
  });
}

