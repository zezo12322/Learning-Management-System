part of 'generated.dart';

class InstructorCoursesVariablesBuilder {
  
  final FirebaseDataConnect _dataConnect;
  InstructorCoursesVariablesBuilder(this._dataConnect, );
  Deserializer<InstructorCoursesData> dataDeserializer = (dynamic json)  => InstructorCoursesData.fromJson(jsonDecode(json));
  
  Future<QueryResult<InstructorCoursesData, void>> execute({QueryFetchPolicy fetchPolicy = QueryFetchPolicy.preferCache}) {
    return ref().execute(fetchPolicy: fetchPolicy);
  }

  QueryRef<InstructorCoursesData, void> ref() {
    
    return _dataConnect.query("InstructorCourses", dataDeserializer, emptySerializer, null);
  }
}

@immutable
class InstructorCoursesCourses {
  final String id;
  final String title;
  final EnumValue<CourseStatus> status;
  final Timestamp createdAt;
  final int price;
  final String language;
  final EnumValue<CourseLevel> level;
  InstructorCoursesCourses.fromJson(dynamic json):
  
  id = nativeFromJson<String>(json['id']),
  title = nativeFromJson<String>(json['title']),
  status = courseStatusDeserializer(json['status']),
  createdAt = Timestamp.fromJson(json['createdAt']),
  price = nativeFromJson<int>(json['price']),
  language = nativeFromJson<String>(json['language']),
  level = courseLevelDeserializer(json['level']);
  @override
  bool operator ==(Object other) {
    if(identical(this, other)) {
      return true;
    }
    if(other.runtimeType != runtimeType) {
      return false;
    }

    final InstructorCoursesCourses otherTyped = other as InstructorCoursesCourses;
    return id == otherTyped.id && 
    title == otherTyped.title && 
    status == otherTyped.status && 
    createdAt == otherTyped.createdAt && 
    price == otherTyped.price && 
    language == otherTyped.language && 
    level == otherTyped.level;
    
  }
  @override
  int get hashCode => Object.hashAll([id.hashCode, title.hashCode, status.hashCode, createdAt.hashCode, price.hashCode, language.hashCode, level.hashCode]);
  

  Map<String, dynamic> toJson() {
    Map<String, dynamic> json = {};
    json['id'] = nativeToJson<String>(id);
    json['title'] = nativeToJson<String>(title);
    json['status'] = 
    courseStatusSerializer(status)
    ;
    json['createdAt'] = createdAt.toJson();
    json['price'] = nativeToJson<int>(price);
    json['language'] = nativeToJson<String>(language);
    json['level'] = 
    courseLevelSerializer(level)
    ;
    return json;
  }

  InstructorCoursesCourses({
    required this.id,
    required this.title,
    required this.status,
    required this.createdAt,
    required this.price,
    required this.language,
    required this.level,
  });
}

@immutable
class InstructorCoursesData {
  final List<InstructorCoursesCourses> courses;
  InstructorCoursesData.fromJson(dynamic json):
  
  courses = (json['courses'] as List<dynamic>)
        .map((e) => InstructorCoursesCourses.fromJson(e))
        .toList();
  @override
  bool operator ==(Object other) {
    if(identical(this, other)) {
      return true;
    }
    if(other.runtimeType != runtimeType) {
      return false;
    }

    final InstructorCoursesData otherTyped = other as InstructorCoursesData;
    return courses == otherTyped.courses;
    
  }
  @override
  int get hashCode => courses.hashCode;
  

  Map<String, dynamic> toJson() {
    Map<String, dynamic> json = {};
    json['courses'] = courses.map((e) => e.toJson()).toList();
    return json;
  }

  InstructorCoursesData({
    required this.courses,
  });
}

