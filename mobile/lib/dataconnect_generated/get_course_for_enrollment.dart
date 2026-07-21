part of 'generated.dart';

class GetCourseForEnrollmentVariablesBuilder {
  String courseId;

  final FirebaseDataConnect _dataConnect;
  GetCourseForEnrollmentVariablesBuilder(this._dataConnect, {required  this.courseId,});
  Deserializer<GetCourseForEnrollmentData> dataDeserializer = (dynamic json)  => GetCourseForEnrollmentData.fromJson(jsonDecode(json));
  Serializer<GetCourseForEnrollmentVariables> varsSerializer = (GetCourseForEnrollmentVariables vars) => jsonEncode(vars.toJson());
  Future<QueryResult<GetCourseForEnrollmentData, GetCourseForEnrollmentVariables>> execute({QueryFetchPolicy fetchPolicy = QueryFetchPolicy.preferCache}) {
    return ref().execute(fetchPolicy: fetchPolicy);
  }

  QueryRef<GetCourseForEnrollmentData, GetCourseForEnrollmentVariables> ref() {
    GetCourseForEnrollmentVariables vars= GetCourseForEnrollmentVariables(courseId: courseId,);
    return _dataConnect.query("GetCourseForEnrollment", dataDeserializer, varsSerializer, vars);
  }
}

@immutable
class GetCourseForEnrollmentCourse {
  final String id;
  final EnumValue<CourseStatus> status;
  final int price;
  final Timestamp? deletedAt;
  GetCourseForEnrollmentCourse.fromJson(dynamic json):
  
  id = nativeFromJson<String>(json['id']),
  status = courseStatusDeserializer(json['status']),
  price = nativeFromJson<int>(json['price']),
  deletedAt = json['deletedAt'] == null ? null : Timestamp.fromJson(json['deletedAt']);
  @override
  bool operator ==(Object other) {
    if(identical(this, other)) {
      return true;
    }
    if(other.runtimeType != runtimeType) {
      return false;
    }

    final GetCourseForEnrollmentCourse otherTyped = other as GetCourseForEnrollmentCourse;
    return id == otherTyped.id && 
    status == otherTyped.status && 
    price == otherTyped.price && 
    deletedAt == otherTyped.deletedAt;
    
  }
  @override
  int get hashCode => Object.hashAll([id.hashCode, status.hashCode, price.hashCode, deletedAt.hashCode]);
  

  Map<String, dynamic> toJson() {
    Map<String, dynamic> json = {};
    json['id'] = nativeToJson<String>(id);
    json['status'] = 
    courseStatusSerializer(status)
    ;
    json['price'] = nativeToJson<int>(price);
    if (deletedAt != null) {
      json['deletedAt'] = deletedAt!.toJson();
    }
    return json;
  }

  GetCourseForEnrollmentCourse({
    required this.id,
    required this.status,
    required this.price,
    this.deletedAt,
  });
}

@immutable
class GetCourseForEnrollmentData {
  final GetCourseForEnrollmentCourse? course;
  GetCourseForEnrollmentData.fromJson(dynamic json):
  
  course = json['course'] == null ? null : GetCourseForEnrollmentCourse.fromJson(json['course']);
  @override
  bool operator ==(Object other) {
    if(identical(this, other)) {
      return true;
    }
    if(other.runtimeType != runtimeType) {
      return false;
    }

    final GetCourseForEnrollmentData otherTyped = other as GetCourseForEnrollmentData;
    return course == otherTyped.course;
    
  }
  @override
  int get hashCode => course.hashCode;
  

  Map<String, dynamic> toJson() {
    Map<String, dynamic> json = {};
    if (course != null) {
      json['course'] = course!.toJson();
    }
    return json;
  }

  GetCourseForEnrollmentData({
    this.course,
  });
}

@immutable
class GetCourseForEnrollmentVariables {
  final String courseId;
  @Deprecated('fromJson is deprecated for Variable classes as they are no longer required for deserialization.')
  GetCourseForEnrollmentVariables.fromJson(Map<String, dynamic> json):
  
  courseId = nativeFromJson<String>(json['courseId']);
  @override
  bool operator ==(Object other) {
    if(identical(this, other)) {
      return true;
    }
    if(other.runtimeType != runtimeType) {
      return false;
    }

    final GetCourseForEnrollmentVariables otherTyped = other as GetCourseForEnrollmentVariables;
    return courseId == otherTyped.courseId;
    
  }
  @override
  int get hashCode => courseId.hashCode;
  

  Map<String, dynamic> toJson() {
    Map<String, dynamic> json = {};
    json['courseId'] = nativeToJson<String>(courseId);
    return json;
  }

  GetCourseForEnrollmentVariables({
    required this.courseId,
  });
}

