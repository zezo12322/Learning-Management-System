part of 'generated.dart';

class GetUserEnrollmentForCourseByUserVariablesBuilder {
  String courseId;
  String userId;

  final FirebaseDataConnect _dataConnect;
  GetUserEnrollmentForCourseByUserVariablesBuilder(this._dataConnect, {required  this.courseId,required  this.userId,});
  Deserializer<GetUserEnrollmentForCourseByUserData> dataDeserializer = (dynamic json)  => GetUserEnrollmentForCourseByUserData.fromJson(jsonDecode(json));
  Serializer<GetUserEnrollmentForCourseByUserVariables> varsSerializer = (GetUserEnrollmentForCourseByUserVariables vars) => jsonEncode(vars.toJson());
  Future<QueryResult<GetUserEnrollmentForCourseByUserData, GetUserEnrollmentForCourseByUserVariables>> execute({QueryFetchPolicy fetchPolicy = QueryFetchPolicy.preferCache}) {
    return ref().execute(fetchPolicy: fetchPolicy);
  }

  QueryRef<GetUserEnrollmentForCourseByUserData, GetUserEnrollmentForCourseByUserVariables> ref() {
    GetUserEnrollmentForCourseByUserVariables vars= GetUserEnrollmentForCourseByUserVariables(courseId: courseId,userId: userId,);
    return _dataConnect.query("GetUserEnrollmentForCourseByUser", dataDeserializer, varsSerializer, vars);
  }
}

@immutable
class GetUserEnrollmentForCourseByUserEnrollments {
  final String id;
  final EnumValue<EnrollmentStatus> status;
  final Timestamp? completedAt;
  GetUserEnrollmentForCourseByUserEnrollments.fromJson(dynamic json):
  
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

    final GetUserEnrollmentForCourseByUserEnrollments otherTyped = other as GetUserEnrollmentForCourseByUserEnrollments;
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

  GetUserEnrollmentForCourseByUserEnrollments({
    required this.id,
    required this.status,
    this.completedAt,
  });
}

@immutable
class GetUserEnrollmentForCourseByUserData {
  final List<GetUserEnrollmentForCourseByUserEnrollments> enrollments;
  GetUserEnrollmentForCourseByUserData.fromJson(dynamic json):
  
  enrollments = (json['enrollments'] as List<dynamic>)
        .map((e) => GetUserEnrollmentForCourseByUserEnrollments.fromJson(e))
        .toList();
  @override
  bool operator ==(Object other) {
    if(identical(this, other)) {
      return true;
    }
    if(other.runtimeType != runtimeType) {
      return false;
    }

    final GetUserEnrollmentForCourseByUserData otherTyped = other as GetUserEnrollmentForCourseByUserData;
    return enrollments == otherTyped.enrollments;
    
  }
  @override
  int get hashCode => enrollments.hashCode;
  

  Map<String, dynamic> toJson() {
    Map<String, dynamic> json = {};
    json['enrollments'] = enrollments.map((e) => e.toJson()).toList();
    return json;
  }

  GetUserEnrollmentForCourseByUserData({
    required this.enrollments,
  });
}

@immutable
class GetUserEnrollmentForCourseByUserVariables {
  final String courseId;
  final String userId;
  @Deprecated('fromJson is deprecated for Variable classes as they are no longer required for deserialization.')
  GetUserEnrollmentForCourseByUserVariables.fromJson(Map<String, dynamic> json):
  
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

    final GetUserEnrollmentForCourseByUserVariables otherTyped = other as GetUserEnrollmentForCourseByUserVariables;
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

  GetUserEnrollmentForCourseByUserVariables({
    required this.courseId,
    required this.userId,
  });
}

