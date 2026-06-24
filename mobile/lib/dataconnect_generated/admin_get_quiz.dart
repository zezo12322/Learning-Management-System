part of 'generated.dart';

class AdminGetQuizVariablesBuilder {
  String quizId;

  final FirebaseDataConnect _dataConnect;
  AdminGetQuizVariablesBuilder(this._dataConnect, {required  this.quizId,});
  Deserializer<AdminGetQuizData> dataDeserializer = (dynamic json)  => AdminGetQuizData.fromJson(jsonDecode(json));
  Serializer<AdminGetQuizVariables> varsSerializer = (AdminGetQuizVariables vars) => jsonEncode(vars.toJson());
  Future<QueryResult<AdminGetQuizData, AdminGetQuizVariables>> execute({QueryFetchPolicy fetchPolicy = QueryFetchPolicy.preferCache}) {
    return ref().execute(fetchPolicy: fetchPolicy);
  }

  QueryRef<AdminGetQuizData, AdminGetQuizVariables> ref() {
    AdminGetQuizVariables vars= AdminGetQuizVariables(quizId: quizId,);
    return _dataConnect.query("AdminGetQuiz", dataDeserializer, varsSerializer, vars);
  }
}

@immutable
class AdminGetQuizCourseQuiz {
  final String id;
  final double passingScore;
  final int maxAttempts;
  final int? timeLimitMinutes;
  final Timestamp createdAt;
  final Timestamp updatedAt;
  final AdminGetQuizCourseQuizLecture lecture;
  final List<AdminGetQuizCourseQuizAdminQuestions> adminQuestions;
  AdminGetQuizCourseQuiz.fromJson(dynamic json):
  
  id = nativeFromJson<String>(json['id']),
  passingScore = nativeFromJson<double>(json['passingScore']),
  maxAttempts = nativeFromJson<int>(json['maxAttempts']),
  timeLimitMinutes = json['timeLimitMinutes'] == null ? null : nativeFromJson<int>(json['timeLimitMinutes']),
  createdAt = Timestamp.fromJson(json['createdAt']),
  updatedAt = Timestamp.fromJson(json['updatedAt']),
  lecture = AdminGetQuizCourseQuizLecture.fromJson(json['lecture']),
  adminQuestions = (json['adminQuestions'] as List<dynamic>)
        .map((e) => AdminGetQuizCourseQuizAdminQuestions.fromJson(e))
        .toList();
  @override
  bool operator ==(Object other) {
    if(identical(this, other)) {
      return true;
    }
    if(other.runtimeType != runtimeType) {
      return false;
    }

    final AdminGetQuizCourseQuiz otherTyped = other as AdminGetQuizCourseQuiz;
    return id == otherTyped.id && 
    passingScore == otherTyped.passingScore && 
    maxAttempts == otherTyped.maxAttempts && 
    timeLimitMinutes == otherTyped.timeLimitMinutes && 
    createdAt == otherTyped.createdAt && 
    updatedAt == otherTyped.updatedAt && 
    lecture == otherTyped.lecture && 
    adminQuestions == otherTyped.adminQuestions;
    
  }
  @override
  int get hashCode => Object.hashAll([id.hashCode, passingScore.hashCode, maxAttempts.hashCode, timeLimitMinutes.hashCode, createdAt.hashCode, updatedAt.hashCode, lecture.hashCode, adminQuestions.hashCode]);
  

  Map<String, dynamic> toJson() {
    Map<String, dynamic> json = {};
    json['id'] = nativeToJson<String>(id);
    json['passingScore'] = nativeToJson<double>(passingScore);
    json['maxAttempts'] = nativeToJson<int>(maxAttempts);
    if (timeLimitMinutes != null) {
      json['timeLimitMinutes'] = nativeToJson<int?>(timeLimitMinutes);
    }
    json['createdAt'] = createdAt.toJson();
    json['updatedAt'] = updatedAt.toJson();
    json['lecture'] = lecture.toJson();
    json['adminQuestions'] = adminQuestions.map((e) => e.toJson()).toList();
    return json;
  }

  AdminGetQuizCourseQuiz({
    required this.id,
    required this.passingScore,
    required this.maxAttempts,
    this.timeLimitMinutes,
    required this.createdAt,
    required this.updatedAt,
    required this.lecture,
    required this.adminQuestions,
  });
}

@immutable
class AdminGetQuizCourseQuizLecture {
  final String id;
  final String title;
  final AdminGetQuizCourseQuizLectureSection section;
  AdminGetQuizCourseQuizLecture.fromJson(dynamic json):
  
  id = nativeFromJson<String>(json['id']),
  title = nativeFromJson<String>(json['title']),
  section = AdminGetQuizCourseQuizLectureSection.fromJson(json['section']);
  @override
  bool operator ==(Object other) {
    if(identical(this, other)) {
      return true;
    }
    if(other.runtimeType != runtimeType) {
      return false;
    }

    final AdminGetQuizCourseQuizLecture otherTyped = other as AdminGetQuizCourseQuizLecture;
    return id == otherTyped.id && 
    title == otherTyped.title && 
    section == otherTyped.section;
    
  }
  @override
  int get hashCode => Object.hashAll([id.hashCode, title.hashCode, section.hashCode]);
  

  Map<String, dynamic> toJson() {
    Map<String, dynamic> json = {};
    json['id'] = nativeToJson<String>(id);
    json['title'] = nativeToJson<String>(title);
    json['section'] = section.toJson();
    return json;
  }

  AdminGetQuizCourseQuizLecture({
    required this.id,
    required this.title,
    required this.section,
  });
}

@immutable
class AdminGetQuizCourseQuizLectureSection {
  final AdminGetQuizCourseQuizLectureSectionCourse course;
  AdminGetQuizCourseQuizLectureSection.fromJson(dynamic json):
  
  course = AdminGetQuizCourseQuizLectureSectionCourse.fromJson(json['course']);
  @override
  bool operator ==(Object other) {
    if(identical(this, other)) {
      return true;
    }
    if(other.runtimeType != runtimeType) {
      return false;
    }

    final AdminGetQuizCourseQuizLectureSection otherTyped = other as AdminGetQuizCourseQuizLectureSection;
    return course == otherTyped.course;
    
  }
  @override
  int get hashCode => course.hashCode;
  

  Map<String, dynamic> toJson() {
    Map<String, dynamic> json = {};
    json['course'] = course.toJson();
    return json;
  }

  AdminGetQuizCourseQuizLectureSection({
    required this.course,
  });
}

@immutable
class AdminGetQuizCourseQuizLectureSectionCourse {
  final String id;
  AdminGetQuizCourseQuizLectureSectionCourse.fromJson(dynamic json):
  
  id = nativeFromJson<String>(json['id']);
  @override
  bool operator ==(Object other) {
    if(identical(this, other)) {
      return true;
    }
    if(other.runtimeType != runtimeType) {
      return false;
    }

    final AdminGetQuizCourseQuizLectureSectionCourse otherTyped = other as AdminGetQuizCourseQuizLectureSectionCourse;
    return id == otherTyped.id;
    
  }
  @override
  int get hashCode => id.hashCode;
  

  Map<String, dynamic> toJson() {
    Map<String, dynamic> json = {};
    json['id'] = nativeToJson<String>(id);
    return json;
  }

  AdminGetQuizCourseQuizLectureSectionCourse({
    required this.id,
  });
}

@immutable
class AdminGetQuizCourseQuizAdminQuestions {
  final String id;
  final String questionText;
  final int order;
  final double points;
  final String? explanation;
  final List<AdminGetQuizCourseQuizAdminQuestionsAdminOptions> adminOptions;
  AdminGetQuizCourseQuizAdminQuestions.fromJson(dynamic json):
  
  id = nativeFromJson<String>(json['id']),
  questionText = nativeFromJson<String>(json['questionText']),
  order = nativeFromJson<int>(json['order']),
  points = nativeFromJson<double>(json['points']),
  explanation = json['explanation'] == null ? null : nativeFromJson<String>(json['explanation']),
  adminOptions = (json['adminOptions'] as List<dynamic>)
        .map((e) => AdminGetQuizCourseQuizAdminQuestionsAdminOptions.fromJson(e))
        .toList();
  @override
  bool operator ==(Object other) {
    if(identical(this, other)) {
      return true;
    }
    if(other.runtimeType != runtimeType) {
      return false;
    }

    final AdminGetQuizCourseQuizAdminQuestions otherTyped = other as AdminGetQuizCourseQuizAdminQuestions;
    return id == otherTyped.id && 
    questionText == otherTyped.questionText && 
    order == otherTyped.order && 
    points == otherTyped.points && 
    explanation == otherTyped.explanation && 
    adminOptions == otherTyped.adminOptions;
    
  }
  @override
  int get hashCode => Object.hashAll([id.hashCode, questionText.hashCode, order.hashCode, points.hashCode, explanation.hashCode, adminOptions.hashCode]);
  

  Map<String, dynamic> toJson() {
    Map<String, dynamic> json = {};
    json['id'] = nativeToJson<String>(id);
    json['questionText'] = nativeToJson<String>(questionText);
    json['order'] = nativeToJson<int>(order);
    json['points'] = nativeToJson<double>(points);
    if (explanation != null) {
      json['explanation'] = nativeToJson<String?>(explanation);
    }
    json['adminOptions'] = adminOptions.map((e) => e.toJson()).toList();
    return json;
  }

  AdminGetQuizCourseQuizAdminQuestions({
    required this.id,
    required this.questionText,
    required this.order,
    required this.points,
    this.explanation,
    required this.adminOptions,
  });
}

@immutable
class AdminGetQuizCourseQuizAdminQuestionsAdminOptions {
  final String id;
  final String text;
  final int order;
  final bool isCorrect;
  AdminGetQuizCourseQuizAdminQuestionsAdminOptions.fromJson(dynamic json):
  
  id = nativeFromJson<String>(json['id']),
  text = nativeFromJson<String>(json['text']),
  order = nativeFromJson<int>(json['order']),
  isCorrect = nativeFromJson<bool>(json['isCorrect']);
  @override
  bool operator ==(Object other) {
    if(identical(this, other)) {
      return true;
    }
    if(other.runtimeType != runtimeType) {
      return false;
    }

    final AdminGetQuizCourseQuizAdminQuestionsAdminOptions otherTyped = other as AdminGetQuizCourseQuizAdminQuestionsAdminOptions;
    return id == otherTyped.id && 
    text == otherTyped.text && 
    order == otherTyped.order && 
    isCorrect == otherTyped.isCorrect;
    
  }
  @override
  int get hashCode => Object.hashAll([id.hashCode, text.hashCode, order.hashCode, isCorrect.hashCode]);
  

  Map<String, dynamic> toJson() {
    Map<String, dynamic> json = {};
    json['id'] = nativeToJson<String>(id);
    json['text'] = nativeToJson<String>(text);
    json['order'] = nativeToJson<int>(order);
    json['isCorrect'] = nativeToJson<bool>(isCorrect);
    return json;
  }

  AdminGetQuizCourseQuizAdminQuestionsAdminOptions({
    required this.id,
    required this.text,
    required this.order,
    required this.isCorrect,
  });
}

@immutable
class AdminGetQuizData {
  final AdminGetQuizCourseQuiz? courseQuiz;
  AdminGetQuizData.fromJson(dynamic json):
  
  courseQuiz = json['courseQuiz'] == null ? null : AdminGetQuizCourseQuiz.fromJson(json['courseQuiz']);
  @override
  bool operator ==(Object other) {
    if(identical(this, other)) {
      return true;
    }
    if(other.runtimeType != runtimeType) {
      return false;
    }

    final AdminGetQuizData otherTyped = other as AdminGetQuizData;
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

  AdminGetQuizData({
    this.courseQuiz,
  });
}

@immutable
class AdminGetQuizVariables {
  final String quizId;
  @Deprecated('fromJson is deprecated for Variable classes as they are no longer required for deserialization.')
  AdminGetQuizVariables.fromJson(Map<String, dynamic> json):
  
  quizId = nativeFromJson<String>(json['quizId']);
  @override
  bool operator ==(Object other) {
    if(identical(this, other)) {
      return true;
    }
    if(other.runtimeType != runtimeType) {
      return false;
    }

    final AdminGetQuizVariables otherTyped = other as AdminGetQuizVariables;
    return quizId == otherTyped.quizId;
    
  }
  @override
  int get hashCode => quizId.hashCode;
  

  Map<String, dynamic> toJson() {
    Map<String, dynamic> json = {};
    json['quizId'] = nativeToJson<String>(quizId);
    return json;
  }

  AdminGetQuizVariables({
    required this.quizId,
  });
}

