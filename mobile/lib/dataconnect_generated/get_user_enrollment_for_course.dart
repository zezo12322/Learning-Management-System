part of 'generated.dart';

class GetUserEnrollmentForCourseVariablesBuilder {
  String courseId;

  final FirebaseDataConnect _dataConnect;
  GetUserEnrollmentForCourseVariablesBuilder(this._dataConnect, {required  this.courseId,});
  Deserializer<GetUserEnrollmentForCourseData> dataDeserializer = (dynamic json)  => GetUserEnrollmentForCourseData.fromJson(jsonDecode(json));
  Serializer<GetUserEnrollmentForCourseVariables> varsSerializer = (GetUserEnrollmentForCourseVariables vars) => jsonEncode(vars.toJson());
  Future<QueryResult<GetUserEnrollmentForCourseData, GetUserEnrollmentForCourseVariables>> execute({QueryFetchPolicy fetchPolicy = QueryFetchPolicy.preferCache}) {
    return ref().execute(fetchPolicy: fetchPolicy);
  }

  QueryRef<GetUserEnrollmentForCourseData, GetUserEnrollmentForCourseVariables> ref() {
    GetUserEnrollmentForCourseVariables vars= GetUserEnrollmentForCourseVariables(courseId: courseId,);
    return _dataConnect.query("GetUserEnrollmentForCourse", dataDeserializer, varsSerializer, vars);
  }
}

@immutable
class GetUserEnrollmentForCourseEnrollments {
  final String id;
  final EnumValue<EnrollmentStatus> status;
  final Timestamp? completedAt;
  GetUserEnrollmentForCourseEnrollments.fromJson(dynamic json):
  
  id = nativeFromJson<String>(json['id']),
  status = enrollmentStatusDeserializer(json['status']),
  completedAt = json['completedAt'] == null ? null : Timestamp.fromJson(json['completedAt']);
  @override
  bool operator ==(Object other) {
    if(identical(this, other)) {
      return true;
    }
    if(other.runtimeType != runtimeType) {
      return false;
    }

    final GetUserEnrollmentForCourseEnrollments otherTyped = other as GetUserEnrollmentForCourseEnrollments;
    return id == otherTyped.id && 
    status == otherTyped.status && 
    completedAt == otherTyped.completedAt;
    
  }
  @override
  int get hashCode => Object.hashAll([id.hashCode, status.hashCode, completedAt.hashCode]);
  

  Map<String, dynamic> toJson() {
    Map<String, dynamic> json = {};
    json['id'] = nativeToJson<String>(id);
    json['status'] = 
    enrollmentStatusSerializer(status)
    ;
    if (completedAt != null) {
      json['completedAt'] = completedAt!.toJson();
    }
    return json;
  }

  GetUserEnrollmentForCourseEnrollments({
    required this.id,
    required this.status,
    this.completedAt,
  });
}

@immutable
class GetUserEnrollmentForCourseData {
  final List<GetUserEnrollmentForCourseEnrollments> enrollments;
  GetUserEnrollmentForCourseData.fromJson(dynamic json):
  
  enrollments = (json['enrollments'] as List<dynamic>)
        .map((e) => GetUserEnrollmentForCourseEnrollments.fromJson(e))
        .toList();
  @override
  bool operator ==(Object other) {
    if(identical(this, other)) {
      return true;
    }
    if(other.runtimeType != runtimeType) {
      return false;
    }

    final GetUserEnrollmentForCourseData otherTyped = other as GetUserEnrollmentForCourseData;
    return enrollments == otherTyped.enrollments;
    
  }
  @override
  int get hashCode => enrollments.hashCode;
  

  Map<String, dynamic> toJson() {
    Map<String, dynamic> json = {};
    json['enrollments'] = enrollments.map((e) => e.toJson()).toList();
    return json;
  }

  GetUserEnrollmentForCourseData({
    required this.enrollments,
  });
}

@immutable
class GetUserEnrollmentForCourseVariables {
  final String courseId;
  @Deprecated('fromJson is deprecated for Variable classes as they are no longer required for deserialization.')
  GetUserEnrollmentForCourseVariables.fromJson(Map<String, dynamic> json):
  
  courseId = nativeFromJson<String>(json['courseId']);
  @override
  bool operator ==(Object other) {
    if(identical(this, other)) {
      return true;
    }
    if(other.runtimeType != runtimeType) {
      return false;
    }

    final GetUserEnrollmentForCourseVariables otherTyped = other as GetUserEnrollmentForCourseVariables;
    return courseId == otherTyped.courseId;
    
  }
  @override
  int get hashCode => courseId.hashCode;
  

  Map<String, dynamic> toJson() {
    Map<String, dynamic> json = {};
    json['courseId'] = nativeToJson<String>(courseId);
    return json;
  }

  GetUserEnrollmentForCourseVariables({
    required this.courseId,
  });
}

