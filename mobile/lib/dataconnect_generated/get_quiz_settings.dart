part of 'generated.dart';

class GetQuizSettingsVariablesBuilder {
  String quizId;

  final FirebaseDataConnect _dataConnect;
  GetQuizSettingsVariablesBuilder(this._dataConnect, {required  this.quizId,});
  Deserializer<GetQuizSettingsData> dataDeserializer = (dynamic json)  => GetQuizSettingsData.fromJson(jsonDecode(json));
  Serializer<GetQuizSettingsVariables> varsSerializer = (GetQuizSettingsVariables vars) => jsonEncode(vars.toJson());
  Future<QueryResult<GetQuizSettingsData, GetQuizSettingsVariables>> execute({QueryFetchPolicy fetchPolicy = QueryFetchPolicy.preferCache}) {
    return ref().execute(fetchPolicy: fetchPolicy);
  }

  QueryRef<GetQuizSettingsData, GetQuizSettingsVariables> ref() {
    GetQuizSettingsVariables vars= GetQuizSettingsVariables(quizId: quizId,);
    return _dataConnect.query("GetQuizSettings", dataDeserializer, varsSerializer, vars);
  }
}

@immutable
class GetQuizSettingsCourseQuiz {
  final String id;
  final double passingScore;
  final int maxAttempts;
  final int? timeLimitMinutes;
  final GetQuizSettingsCourseQuizLecture lecture;
  GetQuizSettingsCourseQuiz.fromJson(dynamic json):
  
  id = nativeFromJson<String>(json['id']),
  passingScore = nativeFromJson<double>(json['passingScore']),
  maxAttempts = nativeFromJson<int>(json['maxAttempts']),
  timeLimitMinutes = json['timeLimitMinutes'] == null ? null : nativeFromJson<int>(json['timeLimitMinutes']),
  lecture = GetQuizSettingsCourseQuizLecture.fromJson(json['lecture']);
  @override
  bool operator ==(Object other) {
    if(identical(this, other)) {
      return true;
    }
    if(other.runtimeType != runtimeType) {
      return false;
    }

    final GetQuizSettingsCourseQuiz otherTyped = other as GetQuizSettingsCourseQuiz;
    return id == otherTyped.id && 
    passingScore == otherTyped.passingScore && 
    maxAttempts == otherTyped.maxAttempts && 
    timeLimitMinutes == otherTyped.timeLimitMinutes && 
    lecture == otherTyped.lecture;
    
  }
  @override
  int get hashCode => Object.hashAll([id.hashCode, passingScore.hashCode, maxAttempts.hashCode, timeLimitMinutes.hashCode, lecture.hashCode]);
  

  Map<String, dynamic> toJson() {
    Map<String, dynamic> json = {};
    json['id'] = nativeToJson<String>(id);
    json['passingScore'] = nativeToJson<double>(passingScore);
    json['maxAttempts'] = nativeToJson<int>(maxAttempts);
    if (timeLimitMinutes != null) {
      json['timeLimitMinutes'] = nativeToJson<int?>(timeLimitMinutes);
    }
    json['lecture'] = lecture.toJson();
    return json;
  }

  GetQuizSettingsCourseQuiz({
    required this.id,
    required this.passingScore,
    required this.maxAttempts,
    this.timeLimitMinutes,
    required this.lecture,
  });
}

@immutable
class GetQuizSettingsCourseQuizLecture {
  final String id;
  final EnumValue<LectureType> type;
  final GetQuizSettingsCourseQuizLectureSection section;
  GetQuizSettingsCourseQuizLecture.fromJson(dynamic json):
  
  id = nativeFromJson<String>(json['id']),
  type = lectureTypeDeserializer(json['type']),
  section = GetQuizSettingsCourseQuizLectureSection.fromJson(json['section']);
  @override
  bool operator ==(Object other) {
    if(identical(this, other)) {
      return true;
    }
    if(other.runtimeType != runtimeType) {
      return false;
    }

    final GetQuizSettingsCourseQuizLecture otherTyped = other as GetQuizSettingsCourseQuizLecture;
    return id == otherTyped.id && 
    type == otherTyped.type && 
    section == otherTyped.section;
    
  }
  @override
  int get hashCode => Object.hashAll([id.hashCode, type.hashCode, section.hashCode]);
  

  Map<String, dynamic> toJson() {
    Map<String, dynamic> json = {};
    json['id'] = nativeToJson<String>(id);
    json['type'] = 
    lectureTypeSerializer(type)
    ;
    json['section'] = section.toJson();
    return json;
  }

  GetQuizSettingsCourseQuizLecture({
    required this.id,
    required this.type,
    required this.section,
  });
}

@immutable
class GetQuizSettingsCourseQuizLectureSection {
  final GetQuizSettingsCourseQuizLectureSectionCourse course;
  GetQuizSettingsCourseQuizLectureSection.fromJson(dynamic json):
  
  course = GetQuizSettingsCourseQuizLectureSectionCourse.fromJson(json['course']);
  @override
  bool operator ==(Object other) {
    if(identical(this, other)) {
      return true;
    }
    if(other.runtimeType != runtimeType) {
      return false;
    }

    final GetQuizSettingsCourseQuizLectureSection otherTyped = other as GetQuizSettingsCourseQuizLectureSection;
    return course == otherTyped.course;
    
  }
  @override
  int get hashCode => course.hashCode;
  

  Map<String, dynamic> toJson() {
    Map<String, dynamic> json = {};
    json['course'] = course.toJson();
    return json;
  }

  GetQuizSettingsCourseQuizLectureSection({
    required this.course,
  });
}

@immutable
class GetQuizSettingsCourseQuizLectureSectionCourse {
  final String id;
  final GetQuizSettingsCourseQuizLectureSectionCourseAuthor author;
  final GetQuizSettingsCourseQuizLectureSectionCourseCreatedBy createdBy;
  GetQuizSettingsCourseQuizLectureSectionCourse.fromJson(dynamic json):
  
  id = nativeFromJson<String>(json['id']),
  author = GetQuizSettingsCourseQuizLectureSectionCourseAuthor.fromJson(json['author']),
  createdBy = GetQuizSettingsCourseQuizLectureSectionCourseCreatedBy.fromJson(json['createdBy']);
  @override
  bool operator ==(Object other) {
    if(identical(this, other)) {
      return true;
    }
    if(other.runtimeType != runtimeType) {
      return false;
    }

    final GetQuizSettingsCourseQuizLectureSectionCourse otherTyped = other as GetQuizSettingsCourseQuizLectureSectionCourse;
    return id == otherTyped.id && 
    author == otherTyped.author && 
    createdBy == otherTyped.createdBy;
    
  }
  @override
  int get hashCode => Object.hashAll([id.hashCode, author.hashCode, createdBy.hashCode]);
  

  Map<String, dynamic> toJson() {
    Map<String, dynamic> json = {};
    json['id'] = nativeToJson<String>(id);
    json['author'] = author.toJson();
    json['createdBy'] = createdBy.toJson();
    return json;
  }

  GetQuizSettingsCourseQuizLectureSectionCourse({
    required this.id,
    required this.author,
    required this.createdBy,
  });
}

@immutable
class GetQuizSettingsCourseQuizLectureSectionCourseAuthor {
  final String id;
  GetQuizSettingsCourseQuizLectureSectionCourseAuthor.fromJson(dynamic json):
  
  id = nativeFromJson<String>(json['id']);
  @override
  bool operator ==(Object other) {
    if(identical(this, other)) {
      return true;
    }
    if(other.runtimeType != runtimeType) {
      return false;
    }

    final GetQuizSettingsCourseQuizLectureSectionCourseAuthor otherTyped = other as GetQuizSettingsCourseQuizLectureSectionCourseAuthor;
    return id == otherTyped.id;
    
  }
  @override
  int get hashCode => id.hashCode;
  

  Map<String, dynamic> toJson() {
    Map<String, dynamic> json = {};
    json['id'] = nativeToJson<String>(id);
    return json;
  }

  GetQuizSettingsCourseQuizLectureSectionCourseAuthor({
    required this.id,
  });
}

@immutable
class GetQuizSettingsCourseQuizLectureSectionCourseCreatedBy {
  final String id;
  GetQuizSettingsCourseQuizLectureSectionCourseCreatedBy.fromJson(dynamic json):
  
  id = nativeFromJson<String>(json['id']);
  @override
  bool operator ==(Object other) {
    if(identical(this, other)) {
      return true;
    }
    if(other.runtimeType != runtimeType) {
      return false;
    }

    final GetQuizSettingsCourseQuizLectureSectionCourseCreatedBy otherTyped = other as GetQuizSettingsCourseQuizLectureSectionCourseCreatedBy;
    return id == otherTyped.id;
    
  }
  @override
  int get hashCode => id.hashCode;
  

  Map<String, dynamic> toJson() {
    Map<String, dynamic> json = {};
    json['id'] = nativeToJson<String>(id);
    return json;
  }

  GetQuizSettingsCourseQuizLectureSectionCourseCreatedBy({
    required this.id,
  });
}

@immutable
class GetQuizSettingsData {
  final GetQuizSettingsCourseQuiz? courseQuiz;
  GetQuizSettingsData.fromJson(dynamic json):
  
  courseQuiz = json['courseQuiz'] == null ? null : GetQuizSettingsCourseQuiz.fromJson(json['courseQuiz']);
  @override
  bool operator ==(Object other) {
    if(identical(this, other)) {
      return true;
    }
    if(other.runtimeType != runtimeType) {
      return false;
    }

    final GetQuizSettingsData otherTyped = other as GetQuizSettingsData;
    return courseQuiz == otherTyped.courseQuiz;
    
  }
  @override
  int get hashCode => courseQuiz.hashCode;
  

  Map<String, dynamic> toJson() {
    Map<String, dynamic> json = {};
    if (courseQuiz != null) {
      json['courseQuiz'] = courseQuiz!.toJson();
    }
    return json;
  }

  GetQuizSettingsData({
    this.courseQuiz,
  });
}

@immutable
class GetQuizSettingsVariables {
  final String quizId;
  @Deprecated('fromJson is deprecated for Variable classes as they are no longer required for deserialization.')
  GetQuizSettingsVariables.fromJson(Map<String, dynamic> json):
  
  quizId = nativeFromJson<String>(json['quizId']);
  @override
  bool operator ==(Object other) {
    if(identical(this, other)) {
      return true;
    }
    if(other.runtimeType != runtimeType) {
      return false;
    }

    final GetQuizSettingsVariables otherTyped = other as GetQuizSettingsVariables;
    return quizId == otherTyped.quizId;
    
  }
  @override
  int get hashCode => quizId.hashCode;
  

  Map<String, dynamic> toJson() {
    Map<String, dynamic> json = {};
    json['quizId'] = nativeToJson<String>(quizId);
    return json;
  }

  GetQuizSettingsVariables({
    required this.quizId,
  });
}

