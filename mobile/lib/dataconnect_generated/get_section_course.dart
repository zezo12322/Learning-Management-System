part of 'generated.dart';

class GetSectionCourseVariablesBuilder {
  String sectionId;

  final FirebaseDataConnect _dataConnect;
  GetSectionCourseVariablesBuilder(this._dataConnect, {required  this.sectionId,});
  Deserializer<GetSectionCourseData> dataDeserializer = (dynamic json)  => GetSectionCourseData.fromJson(jsonDecode(json));
  Serializer<GetSectionCourseVariables> varsSerializer = (GetSectionCourseVariables vars) => jsonEncode(vars.toJson());
  Future<QueryResult<GetSectionCourseData, GetSectionCourseVariables>> execute({QueryFetchPolicy fetchPolicy = QueryFetchPolicy.preferCache}) {
    return ref().execute(fetchPolicy: fetchPolicy);
  }

  QueryRef<GetSectionCourseData, GetSectionCourseVariables> ref() {
    GetSectionCourseVariables vars= GetSectionCourseVariables(sectionId: sectionId,);
    return _dataConnect.query("GetSectionCourse", dataDeserializer, varsSerializer, vars);
  }
}

@immutable
class GetSectionCourseCourseSection {
  final GetSectionCourseCourseSectionCourse course;
  GetSectionCourseCourseSection.fromJson(dynamic json):
  
  course = GetSectionCourseCourseSectionCourse.fromJson(json['course']);
  @override
  bool operator ==(Object other) {
    if(identical(this, other)) {
      return true;
    }
    if(other.runtimeType != runtimeType) {
      return false;
    }

    final GetSectionCourseCourseSection otherTyped = other as GetSectionCourseCourseSection;
    return course == otherTyped.course;
    
  }
  @override
  int get hashCode => course.hashCode;
  

  Map<String, dynamic> toJson() {
    Map<String, dynamic> json = {};
    json['course'] = course.toJson();
    return json;
  }

  GetSectionCourseCourseSection({
    required this.course,
  });
}

@immutable
class GetSectionCourseCourseSectionCourse {
  final String id;
  GetSectionCourseCourseSectionCourse.fromJson(dynamic json):
  
  id = nativeFromJson<String>(json['id']);
  @override
  bool operator ==(Object other) {
    if(identical(this, other)) {
      return true;
    }
    if(other.runtimeType != runtimeType) {
      return false;
    }

    final GetSectionCourseCourseSectionCourse otherTyped = other as GetSectionCourseCourseSectionCourse;
    return id == otherTyped.id;
    
  }
  @override
  int get hashCode => id.hashCode;
  

  Map<String, dynamic> toJson() {
    Map<String, dynamic> json = {};
    json['id'] = nativeToJson<String>(id);
    return json;
  }

  GetSectionCourseCourseSectionCourse({
    required this.id,
  });
}

@immutable
class GetSectionCourseData {
  final GetSectionCourseCourseSection? courseSection;
  GetSectionCourseData.fromJson(dynamic json):
  
  courseSection = json['courseSection'] == null ? null : GetSectionCourseCourseSection.fromJson(json['courseSection']);
  @override
  bool operator ==(Object other) {
    if(identical(this, other)) {
      return true;
    }
    if(other.runtimeType != runtimeType) {
      return false;
    }

    final GetSectionCourseData otherTyped = other as GetSectionCourseData;
    return courseSection == otherTyped.courseSection;
    
  }
  @override
  int get hashCode => courseSection.hashCode;
  

  Map<String, dynamic> toJson() {
    Map<String, dynamic> json = {};
    if (courseSection != null) {
      json['courseSection'] = courseSection!.toJson();
    }
    return json;
  }

  GetSectionCourseData({
    this.courseSection,
  });
}

@immutable
class GetSectionCourseVariables {
  final String sectionId;
  @Deprecated('fromJson is deprecated for Variable classes as they are no longer required for deserialization.')
  GetSectionCourseVariables.fromJson(Map<String, dynamic> json):
  
  sectionId = nativeFromJson<String>(json['sectionId']);
  @override
  bool operator ==(Object other) {
    if(identical(this, other)) {
      return true;
    }
    if(other.runtimeType != runtimeType) {
      return false;
    }

    final GetSectionCourseVariables otherTyped = other as GetSectionCourseVariables;
    return sectionId == otherTyped.sectionId;
    
  }
  @override
  int get hashCode => sectionId.hashCode;
  

  Map<String, dynamic> toJson() {
    Map<String, dynamic> json = {};
    json['sectionId'] = nativeToJson<String>(sectionId);
    return json;
  }

  GetSectionCourseVariables({
    required this.sectionId,
  });
}

