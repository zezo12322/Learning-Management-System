part of 'generated.dart';

class GetQuestionCourseVariablesBuilder {
  String questionId;

  final FirebaseDataConnect _dataConnect;
  GetQuestionCourseVariablesBuilder(this._dataConnect, {required  this.questionId,});
  Deserializer<GetQuestionCourseData> dataDeserializer = (dynamic json)  => GetQuestionCourseData.fromJson(jsonDecode(json));
  Serializer<GetQuestionCourseVariables> varsSerializer = (GetQuestionCourseVariables vars) => jsonEncode(vars.toJson());
  Future<QueryResult<GetQuestionCourseData, GetQuestionCourseVariables>> execute({QueryFetchPolicy fetchPolicy = QueryFetchPolicy.preferCache}) {
    return ref().execute(fetchPolicy: fetchPolicy);
  }

  QueryRef<GetQuestionCourseData, GetQuestionCourseVariables> ref() {
    GetQuestionCourseVariables vars= GetQuestionCourseVariables(questionId: questionId,);
    return _dataConnect.query("GetQuestionCourse", dataDeserializer, varsSerializer, vars);
  }
}

@immutable
class GetQuestionCourseQuizQuestion {
  final GetQuestionCourseQuizQuestionQuiz quiz;
  GetQuestionCourseQuizQuestion.fromJson(dynamic json):
  
  quiz = GetQuestionCourseQuizQuestionQuiz.fromJson(json['quiz']);
  @override
  bool operator ==(Object other) {
    if(identical(this, other)) {
      return true;
    }
    if(other.runtimeType != runtimeType) {
      return false;
    }

    final GetQuestionCourseQuizQuestion otherTyped = other as GetQuestionCourseQuizQuestion;
    return quiz == otherTyped.quiz;
    
  }
  @override
  int get hashCode => quiz.hashCode;
  

  Map<String, dynamic> toJson() {
    Map<String, dynamic> json = {};
    json['quiz'] = quiz.toJson();
    return json;
  }

  GetQuestionCourseQuizQuestion({
    required this.quiz,
  });
}

@immutable
class GetQuestionCourseQuizQuestionQuiz {
  final GetQuestionCourseQuizQuestionQuizLecture lecture;
  GetQuestionCourseQuizQuestionQuiz.fromJson(dynamic json):
  
  lecture = GetQuestionCourseQuizQuestionQuizLecture.fromJson(json['lecture']);
  @override
  bool operator ==(Object other) {
    if(identical(this, other)) {
      return true;
    }
    if(other.runtimeType != runtimeType) {
      return false;
    }

    final GetQuestionCourseQuizQuestionQuiz otherTyped = other as GetQuestionCourseQuizQuestionQuiz;
    return lecture == otherTyped.lecture;
    
  }
  @override
  int get hashCode => lecture.hashCode;
  

  Map<String, dynamic> toJson() {
    Map<String, dynamic> json = {};
    json['lecture'] = lecture.toJson();
    return json;
  }

  GetQuestionCourseQuizQuestionQuiz({
    required this.lecture,
  });
}

@immutable
class GetQuestionCourseQuizQuestionQuizLecture {
  final GetQuestionCourseQuizQuestionQuizLectureSection section;
  GetQuestionCourseQuizQuestionQuizLecture.fromJson(dynamic json):
  
  section = GetQuestionCourseQuizQuestionQuizLectureSection.fromJson(json['section']);
  @override
  bool operator ==(Object other) {
    if(identical(this, other)) {
      return true;
    }
    if(other.runtimeType != runtimeType) {
      return false;
    }

    final GetQuestionCourseQuizQuestionQuizLecture otherTyped = other as GetQuestionCourseQuizQuestionQuizLecture;
    return section == otherTyped.section;
    
  }
  @override
  int get hashCode => section.hashCode;
  

  Map<String, dynamic> toJson() {
    Map<String, dynamic> json = {};
    json['section'] = section.toJson();
    return json;
  }

  GetQuestionCourseQuizQuestionQuizLecture({
    required this.section,
  });
}

@immutable
class GetQuestionCourseQuizQuestionQuizLectureSection {
  final GetQuestionCourseQuizQuestionQuizLectureSectionCourse course;
  GetQuestionCourseQuizQuestionQuizLectureSection.fromJson(dynamic json):
  
  course = GetQuestionCourseQuizQuestionQuizLectureSectionCourse.fromJson(json['course']);
  @override
  bool operator ==(Object other) {
    if(identical(this, other)) {
      return true;
    }
    if(other.runtimeType != runtimeType) {
      return false;
    }

    final GetQuestionCourseQuizQuestionQuizLectureSection otherTyped = other as GetQuestionCourseQuizQuestionQuizLectureSection;
    return course == otherTyped.course;
    
  }
  @override
  int get hashCode => course.hashCode;
  

  Map<String, dynamic> toJson() {
    Map<String, dynamic> json = {};
    json['course'] = course.toJson();
    return json;
  }

  GetQuestionCourseQuizQuestionQuizLectureSection({
    required this.course,
  });
}

@immutable
class GetQuestionCourseQuizQuestionQuizLectureSectionCourse {
  final String id;
  GetQuestionCourseQuizQuestionQuizLectureSectionCourse.fromJson(dynamic json):
  
  id = nativeFromJson<String>(json['id']);
  @override
  bool operator ==(Object other) {
    if(identical(this, other)) {
      return true;
    }
    if(other.runtimeType != runtimeType) {
      return false;
    }

    final GetQuestionCourseQuizQuestionQuizLectureSectionCourse otherTyped = other as GetQuestionCourseQuizQuestionQuizLectureSectionCourse;
    return id == otherTyped.id;
    
  }
  @override
  int get hashCode => id.hashCode;
  

  Map<String, dynamic> toJson() {
    Map<String, dynamic> json = {};
    json['id'] = nativeToJson<String>(id);
    return json;
  }

  GetQuestionCourseQuizQuestionQuizLectureSectionCourse({
    required this.id,
  });
}

@immutable
class GetQuestionCourseData {
  final GetQuestionCourseQuizQuestion? quizQuestion;
  GetQuestionCourseData.fromJson(dynamic json):
  
  quizQuestion = json['quizQuestion'] == null ? null : GetQuestionCourseQuizQuestion.fromJson(json['quizQuestion']);
  @override
  bool operator ==(Object other) {
    if(identical(this, other)) {
      return true;
    }
    if(other.runtimeType != runtimeType) {
      return false;
    }

    final GetQuestionCourseData otherTyped = other as GetQuestionCourseData;
    return quizQuestion == otherTyped.quizQuestion;
    
  }
  @override
  int get hashCode => quizQuestion.hashCode;
  

  Map<String, dynamic> toJson() {
    Map<String, dynamic> json = {};
    if (quizQuestion != null) {
      json['quizQuestion'] = quizQuestion!.toJson();
    }
    return json;
  }

  GetQuestionCourseData({
    this.quizQuestion,
  });
}

@immutable
class GetQuestionCourseVariables {
  final String questionId;
  @Deprecated('fromJson is deprecated for Variable classes as they are no longer required for deserialization.')
  GetQuestionCourseVariables.fromJson(Map<String, dynamic> json):
  
  questionId = nativeFromJson<String>(json['questionId']);
  @override
  bool operator ==(Object other) {
    if(identical(this, other)) {
      return true;
    }
    if(other.runtimeType != runtimeType) {
      return false;
    }

    final GetQuestionCourseVariables otherTyped = other as GetQuestionCourseVariables;
    return questionId == otherTyped.questionId;
    
  }
  @override
  int get hashCode => questionId.hashCode;
  

  Map<String, dynamic> toJson() {
    Map<String, dynamic> json = {};
    json['questionId'] = nativeToJson<String>(questionId);
    return json;
  }

  GetQuestionCourseVariables({
    required this.questionId,
  });
}

