part of 'generated.dart';

class InstructorDeleteCourseVariablesBuilder {
  String courseId;

  final FirebaseDataConnect _dataConnect;
  InstructorDeleteCourseVariablesBuilder(this._dataConnect, {required  this.courseId,});
  Deserializer<InstructorDeleteCourseData> dataDeserializer = (dynamic json)  => InstructorDeleteCourseData.fromJson(jsonDecode(json));
  Serializer<InstructorDeleteCourseVariables> varsSerializer = (InstructorDeleteCourseVariables vars) => jsonEncode(vars.toJson());
  Future<OperationResult<InstructorDeleteCourseData, InstructorDeleteCourseVariables>> execute() {
    return ref().execute();
  }

  MutationRef<InstructorDeleteCourseData, InstructorDeleteCourseVariables> ref() {
    InstructorDeleteCourseVariables vars= InstructorDeleteCourseVariables(courseId: courseId,);
    return _dataConnect.mutation("InstructorDeleteCourse", dataDeserializer, varsSerializer, vars);
  }
}

@immutable
class InstructorDeleteCourseData {
  final int course_updateMany;
  InstructorDeleteCourseData.fromJson(dynamic json):
  
  course_updateMany = nativeFromJson<int>(json['course_updateMany']);
  @override
  bool operator ==(Object other) {
    if(identical(this, other)) {
      return true;
    }
    if(other.runtimeType != runtimeType) {
      return false;
    }

    final InstructorDeleteCourseData otherTyped = other as InstructorDeleteCourseData;
    return course_updateMany == otherTyped.course_updateMany;
    
  }
  @override
  int get hashCode => course_updateMany.hashCode;
  

  Map<String, dynamic> toJson() {
    Map<String, dynamic> json = {};
    json['course_updateMany'] = nativeToJson<int>(course_updateMany);
    return json;
  }

  InstructorDeleteCourseData({
    required this.course_updateMany,
  });
}

@immutable
class InstructorDeleteCourseVariables {
  final String courseId;
  @Deprecated('fromJson is deprecated for Variable classes as they are no longer required for deserialization.')
  InstructorDeleteCourseVariables.fromJson(Map<String, dynamic> json):
  
  courseId = nativeFromJson<String>(json['courseId']);
  @override
  bool operator ==(Object other) {
    if(identical(this, other)) {
      return true;
    }
    if(other.runtimeType != runtimeType) {
      return false;
    }

    final InstructorDeleteCourseVariables otherTyped = other as InstructorDeleteCourseVariables;
    return courseId == otherTyped.courseId;
    
  }
  @override
  int get hashCode => courseId.hashCode;
  

  Map<String, dynamic> toJson() {
    Map<String, dynamic> json = {};
    json['courseId'] = nativeToJson<String>(courseId);
    return json;
  }

  InstructorDeleteCourseVariables({
    required this.courseId,
  });
}

