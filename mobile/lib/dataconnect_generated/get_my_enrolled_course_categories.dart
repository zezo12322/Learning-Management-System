part of 'generated.dart';

class GetMyEnrolledCourseCategoriesVariablesBuilder {
  
  final FirebaseDataConnect _dataConnect;
  GetMyEnrolledCourseCategoriesVariablesBuilder(this._dataConnect, );
  Deserializer<GetMyEnrolledCourseCategoriesData> dataDeserializer = (dynamic json)  => GetMyEnrolledCourseCategoriesData.fromJson(jsonDecode(json));
  
  Future<QueryResult<GetMyEnrolledCourseCategoriesData, void>> execute({QueryFetchPolicy fetchPolicy = QueryFetchPolicy.preferCache}) {
    return ref().execute(fetchPolicy: fetchPolicy);
  }

  QueryRef<GetMyEnrolledCourseCategoriesData, void> ref() {
    
    return _dataConnect.query("GetMyEnrolledCourseCategories", dataDeserializer, emptySerializer, null);
  }
}

@immutable
class GetMyEnrolledCourseCategoriesEnrollments {
  final GetMyEnrolledCourseCategoriesEnrollmentsCourse? course;
  GetMyEnrolledCourseCategoriesEnrollments.fromJson(dynamic json):
  
  course = json['course'] == null ? null : GetMyEnrolledCourseCategoriesEnrollmentsCourse.fromJson(json['course']);
  @override
  bool operator ==(Object other) {
    if(identical(this, other)) {
      return true;
    }
    if(other.runtimeType != runtimeType) {
      return false;
    }

    final GetMyEnrolledCourseCategoriesEnrollments otherTyped = other as GetMyEnrolledCourseCategoriesEnrollments;
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

  GetMyEnrolledCourseCategoriesEnrollments({
    this.course,
  });
}

@immutable
class GetMyEnrolledCourseCategoriesEnrollmentsCourse {
  final String id;
  final Timestamp? deletedAt;
  final EnumValue<CourseStatus> status;
  final GetMyEnrolledCourseCategoriesEnrollmentsCourseCategory category;
  GetMyEnrolledCourseCategoriesEnrollmentsCourse.fromJson(dynamic json):
  
  id = nativeFromJson<String>(json['id']),
  deletedAt = json['deletedAt'] == null ? null : Timestamp.fromJson(json['deletedAt']),
  status = courseStatusDeserializer(json['status']),
  category = GetMyEnrolledCourseCategoriesEnrollmentsCourseCategory.fromJson(json['category']);
  @override
  bool operator ==(Object other) {
    if(identical(this, other)) {
      return true;
    }
    if(other.runtimeType != runtimeType) {
      return false;
    }

    final GetMyEnrolledCourseCategoriesEnrollmentsCourse otherTyped = other as GetMyEnrolledCourseCategoriesEnrollmentsCourse;
    return id == otherTyped.id && 
    deletedAt == otherTyped.deletedAt && 
    status == otherTyped.status && 
    category == otherTyped.category;
    
  }
  @override
  int get hashCode => Object.hashAll([id.hashCode, deletedAt.hashCode, status.hashCode, category.hashCode]);
  

  Map<String, dynamic> toJson() {
    Map<String, dynamic> json = {};
    json['id'] = nativeToJson<String>(id);
    if (deletedAt != null) {
      json['deletedAt'] = deletedAt!.toJson();
    }
    json['status'] = 
    courseStatusSerializer(status)
    ;
    json['category'] = category.toJson();
    return json;
  }

  GetMyEnrolledCourseCategoriesEnrollmentsCourse({
    required this.id,
    this.deletedAt,
    required this.status,
    required this.category,
  });
}

@immutable
class GetMyEnrolledCourseCategoriesEnrollmentsCourseCategory {
  final String id;
  GetMyEnrolledCourseCategoriesEnrollmentsCourseCategory.fromJson(dynamic json):
  
  id = nativeFromJson<String>(json['id']);
  @override
  bool operator ==(Object other) {
    if(identical(this, other)) {
      return true;
    }
    if(other.runtimeType != runtimeType) {
      return false;
    }

    final GetMyEnrolledCourseCategoriesEnrollmentsCourseCategory otherTyped = other as GetMyEnrolledCourseCategoriesEnrollmentsCourseCategory;
    return id == otherTyped.id;
    
  }
  @override
  int get hashCode => id.hashCode;
  

  Map<String, dynamic> toJson() {
    Map<String, dynamic> json = {};
    json['id'] = nativeToJson<String>(id);
    return json;
  }

  GetMyEnrolledCourseCategoriesEnrollmentsCourseCategory({
    required this.id,
  });
}

@immutable
class GetMyEnrolledCourseCategoriesData {
  final List<GetMyEnrolledCourseCategoriesEnrollments> enrollments;
  GetMyEnrolledCourseCategoriesData.fromJson(dynamic json):
  
  enrollments = (json['enrollments'] as List<dynamic>)
        .map((e) => GetMyEnrolledCourseCategoriesEnrollments.fromJson(e))
        .toList();
  @override
  bool operator ==(Object other) {
    if(identical(this, other)) {
      return true;
    }
    if(other.runtimeType != runtimeType) {
      return false;
    }

    final GetMyEnrolledCourseCategoriesData otherTyped = other as GetMyEnrolledCourseCategoriesData;
    return enrollments == otherTyped.enrollments;
    
  }
  @override
  int get hashCode => enrollments.hashCode;
  

  Map<String, dynamic> toJson() {
    Map<String, dynamic> json = {};
    json['enrollments'] = enrollments.map((e) => e.toJson()).toList();
    return json;
  }

  GetMyEnrolledCourseCategoriesData({
    required this.enrollments,
  });
}

