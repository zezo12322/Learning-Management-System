part of 'generated.dart';

class GetCourseCurriculumVariablesBuilder {
  String courseId;

  final FirebaseDataConnect _dataConnect;
  GetCourseCurriculumVariablesBuilder(this._dataConnect, {required  this.courseId,});
  Deserializer<GetCourseCurriculumData> dataDeserializer = (dynamic json)  => GetCourseCurriculumData.fromJson(jsonDecode(json));
  Serializer<GetCourseCurriculumVariables> varsSerializer = (GetCourseCurriculumVariables vars) => jsonEncode(vars.toJson());
  Future<QueryResult<GetCourseCurriculumData, GetCourseCurriculumVariables>> execute({QueryFetchPolicy fetchPolicy = QueryFetchPolicy.preferCache}) {
    return ref().execute(fetchPolicy: fetchPolicy);
  }

  QueryRef<GetCourseCurriculumData, GetCourseCurriculumVariables> ref() {
    GetCourseCurriculumVariables vars= GetCourseCurriculumVariables(courseId: courseId,);
    return _dataConnect.query('GetCourseCurriculum', dataDeserializer, varsSerializer, vars);
  }
}

@immutable
class GetCourseCurriculumCourse {
  final String id;
  final String title;
  final String? description;
  final String language;
  final List<GetCourseCurriculumCoursePublishedSections> publishedSections;
  GetCourseCurriculumCourse.fromJson(dynamic json):
  
  id = nativeFromJson<String>(json['id']),
  title = nativeFromJson<String>(json['title']),
  description = json['description'] == null ? null : nativeFromJson<String>(json['description']),
  language = nativeFromJson<String>(json['language']),
  publishedSections = (json['publishedSections'] as List<dynamic>)
        .map((e) => GetCourseCurriculumCoursePublishedSections.fromJson(e))
        .toList();
  @override
  bool operator ==(Object other) {
    if(identical(this, other)) {
      return true;
    }
    if(other.runtimeType != runtimeType) {
      return false;
    }

    final GetCourseCurriculumCourse otherTyped = other as GetCourseCurriculumCourse;
    return id == otherTyped.id && 
    title == otherTyped.title && 
    description == otherTyped.description && 
    language == otherTyped.language && 
    publishedSections == otherTyped.publishedSections;
    
  }
  @override
  int get hashCode => Object.hashAll([id.hashCode, title.hashCode, description.hashCode, language.hashCode, publishedSections.hashCode]);
  

  Map<String, dynamic> toJson() {
    Map<String, dynamic> json = {};
    json['id'] = nativeToJson<String>(id);
    json['title'] = nativeToJson<String>(title);
    if (description != null) {
      json['description'] = nativeToJson<String?>(description);
    }
    json['language'] = nativeToJson<String>(language);
    json['publishedSections'] = publishedSections.map((e) => e.toJson()).toList();
    return json;
  }

  GetCourseCurriculumCourse({
    required this.id,
    required this.title,
    this.description,
    required this.language,
    required this.publishedSections,
  });
}

@immutable
class GetCourseCurriculumCoursePublishedSections {
  final String id;
  final String title;
  final List<GetCourseCurriculumCoursePublishedSectionsPublishedLectures> publishedLectures;
  GetCourseCurriculumCoursePublishedSections.fromJson(dynamic json):
  
  id = nativeFromJson<String>(json['id']),
  title = nativeFromJson<String>(json['title']),
  publishedLectures = (json['publishedLectures'] as List<dynamic>)
        .map((e) => GetCourseCurriculumCoursePublishedSectionsPublishedLectures.fromJson(e))
        .toList();
  @override
  bool operator ==(Object other) {
    if(identical(this, other)) {
      return true;
    }
    if(other.runtimeType != runtimeType) {
      return false;
    }

    final GetCourseCurriculumCoursePublishedSections otherTyped = other as GetCourseCurriculumCoursePublishedSections;
    return id == otherTyped.id && 
    title == otherTyped.title && 
    publishedLectures == otherTyped.publishedLectures;
    
  }
  @override
  int get hashCode => Object.hashAll([id.hashCode, title.hashCode, publishedLectures.hashCode]);
  

  Map<String, dynamic> toJson() {
    Map<String, dynamic> json = {};
    json['id'] = nativeToJson<String>(id);
    json['title'] = nativeToJson<String>(title);
    json['publishedLectures'] = publishedLectures.map((e) => e.toJson()).toList();
    return json;
  }

  GetCourseCurriculumCoursePublishedSections({
    required this.id,
    required this.title,
    required this.publishedLectures,
  });
}

@immutable
class GetCourseCurriculumCoursePublishedSectionsPublishedLectures {
  final String id;
  final String title;
  final EnumValue<LectureType> type;
  final String? content;
  final int? duration;
  final bool isFreePreview;
  GetCourseCurriculumCoursePublishedSectionsPublishedLectures.fromJson(dynamic json):
  
  id = nativeFromJson<String>(json['id']),
  title = nativeFromJson<String>(json['title']),
  type = lectureTypeDeserializer(json['type']),
  content = json['content'] == null ? null : nativeFromJson<String>(json['content']),
  duration = json['duration'] == null ? null : nativeFromJson<int>(json['duration']),
  isFreePreview = nativeFromJson<bool>(json['isFreePreview']);
  @override
  bool operator ==(Object other) {
    if(identical(this, other)) {
      return true;
    }
    if(other.runtimeType != runtimeType) {
      return false;
    }

    final GetCourseCurriculumCoursePublishedSectionsPublishedLectures otherTyped = other as GetCourseCurriculumCoursePublishedSectionsPublishedLectures;
    return id == otherTyped.id && 
    title == otherTyped.title && 
    type == otherTyped.type && 
    content == otherTyped.content && 
    duration == otherTyped.duration && 
    isFreePreview == otherTyped.isFreePreview;
    
  }
  @override
  int get hashCode => Object.hashAll([id.hashCode, title.hashCode, type.hashCode, content.hashCode, duration.hashCode, isFreePreview.hashCode]);
  

  Map<String, dynamic> toJson() {
    Map<String, dynamic> json = {};
    json['id'] = nativeToJson<String>(id);
    json['title'] = nativeToJson<String>(title);
    json['type'] = 
    lectureTypeSerializer(type)
    ;
    if (content != null) {
      json['content'] = nativeToJson<String?>(content);
    }
    if (duration != null) {
      json['duration'] = nativeToJson<int?>(duration);
    }
    json['isFreePreview'] = nativeToJson<bool>(isFreePreview);
    return json;
  }

  GetCourseCurriculumCoursePublishedSectionsPublishedLectures({
    required this.id,
    required this.title,
    required this.type,
    this.content,
    this.duration,
    required this.isFreePreview,
  });
}

@immutable
class GetCourseCurriculumData {
  final GetCourseCurriculumCourse? course;
  GetCourseCurriculumData.fromJson(dynamic json):
  
  course = json['course'] == null ? null : GetCourseCurriculumCourse.fromJson(json['course']);
  @override
  bool operator ==(Object other) {
    if(identical(this, other)) {
      return true;
    }
    if(other.runtimeType != runtimeType) {
      return false;
    }

    final GetCourseCurriculumData otherTyped = other as GetCourseCurriculumData;
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

  GetCourseCurriculumData({
    this.course,
  });
}

@immutable
class GetCourseCurriculumVariables {
  final String courseId;
  @Deprecated('fromJson is deprecated for Variable classes as they are no longer required for deserialization.')
  GetCourseCurriculumVariables.fromJson(Map<String, dynamic> json):
  
  courseId = nativeFromJson<String>(json['courseId']);
  @override
  bool operator ==(Object other) {
    if(identical(this, other)) {
      return true;
    }
    if(other.runtimeType != runtimeType) {
      return false;
    }

    final GetCourseCurriculumVariables otherTyped = other as GetCourseCurriculumVariables;
    return courseId == otherTyped.courseId;
    
  }
  @override
  int get hashCode => courseId.hashCode;
  

  Map<String, dynamic> toJson() {
    Map<String, dynamic> json = {};
    json['courseId'] = nativeToJson<String>(courseId);
    return json;
  }

  GetCourseCurriculumVariables({
    required this.courseId,
  });
}

