part of 'generated.dart';

class GetOptionCourseVariablesBuilder {
  String optionId;

  final FirebaseDataConnect _dataConnect;
  GetOptionCourseVariablesBuilder(this._dataConnect, {required  this.optionId,});
  Deserializer<GetOptionCourseData> dataDeserializer = (dynamic json)  => GetOptionCourseData.fromJson(jsonDecode(json));
  Serializer<GetOptionCourseVariables> varsSerializer = (GetOptionCourseVariables vars) => jsonEncode(vars.toJson());
  Future<QueryResult<GetOptionCourseData, GetOptionCourseVariables>> execute({QueryFetchPolicy fetchPolicy = QueryFetchPolicy.preferCache}) {
    return ref().execute(fetchPolicy: fetchPolicy);
  }

  QueryRef<GetOptionCourseData, GetOptionCourseVariables> ref() {
    GetOptionCourseVariables vars= GetOptionCourseVariables(optionId: optionId,);
    return _dataConnect.query("GetOptionCourse", dataDeserializer, varsSerializer, vars);
  }
}

@immutable
class GetOptionCourseQuizOption {
  final GetOptionCourseQuizOptionQuestion question;
  GetOptionCourseQuizOption.fromJson(dynamic json):
  
  question = GetOptionCourseQuizOptionQuestion.fromJson(json['question']);
  @override
  bool operator ==(Object other) {
    if(identical(this, other)) {
      return true;
    }
    if(other.runtimeType != runtimeType) {
      return false;
    }

    final GetOptionCourseQuizOption otherTyped = other as GetOptionCourseQuizOption;
    return question == otherTyped.question;
    
  }
  @override
  int get hashCode => question.hashCode;
  

  Map<String, dynamic> toJson() {
    Map<String, dynamic> json = {};
    json['question'] = question.toJson();
    return json;
  }

  GetOptionCourseQuizOption({
    required this.question,
  });
}

@immutable
class GetOptionCourseQuizOptionQuestion {
  final GetOptionCourseQuizOptionQuestionQuiz quiz;
  GetOptionCourseQuizOptionQuestion.fromJson(dynamic json):
  
  quiz = GetOptionCourseQuizOptionQuestionQuiz.fromJson(json['quiz']);
  @override
  bool operator ==(Object other) {
    if(identical(this, other)) {
      return true;
    }
    if(other.runtimeType != runtimeType) {
      return false;
    }

    final GetOptionCourseQuizOptionQuestion otherTyped = other as GetOptionCourseQuizOptionQuestion;
    return quiz == otherTyped.quiz;
    
  }
  @override
  int get hashCode => quiz.hashCode;
  

  Map<String, dynamic> toJson() {
    Map<String, dynamic> json = {};
    json['quiz'] = quiz.toJson();
    return json;
  }

  GetOptionCourseQuizOptionQuestion({
    required this.quiz,
  });
}

@immutable
class GetOptionCourseQuizOptionQuestionQuiz {
  final GetOptionCourseQuizOptionQuestionQuizLecture lecture;
  GetOptionCourseQuizOptionQuestionQuiz.fromJson(dynamic json):
  
  lecture = GetOptionCourseQuizOptionQuestionQuizLecture.fromJson(json['lecture']);
  @override
  bool operator ==(Object other) {
    if(identical(this, other)) {
      return true;
    }
    if(other.runtimeType != runtimeType) {
      return false;
    }

    final GetOptionCourseQuizOptionQuestionQuiz otherTyped = other as GetOptionCourseQuizOptionQuestionQuiz;
    return lecture == otherTyped.lecture;
    
  }
  @override
  int get hashCode => lecture.hashCode;
  

  Map<String, dynamic> toJson() {
    Map<String, dynamic> json = {};
    json['lecture'] = lecture.toJson();
    return json;
  }

  GetOptionCourseQuizOptionQuestionQuiz({
    required this.lecture,
  });
}

@immutable
class GetOptionCourseQuizOptionQuestionQuizLecture {
  final GetOptionCourseQuizOptionQuestionQuizLectureSection section;
  GetOptionCourseQuizOptionQuestionQuizLecture.fromJson(dynamic json):
  
  section = GetOptionCourseQuizOptionQuestionQuizLectureSection.fromJson(json['section']);
  @override
  bool operator ==(Object other) {
    if(identical(this, other)) {
      return true;
    }
    if(other.runtimeType != runtimeType) {
      return false;
    }

    final GetOptionCourseQuizOptionQuestionQuizLecture otherTyped = other as GetOptionCourseQuizOptionQuestionQuizLecture;
    return section == otherTyped.section;
    
  }
  @override
  int get hashCode => section.hashCode;
  

  Map<String, dynamic> toJson() {
    Map<String, dynamic> json = {};
    json['section'] = section.toJson();
    return json;
  }

  GetOptionCourseQuizOptionQuestionQuizLecture({
    required this.section,
  });
}

@immutable
class GetOptionCourseQuizOptionQuestionQuizLectureSection {
  final GetOptionCourseQuizOptionQuestionQuizLectureSectionCourse course;
  GetOptionCourseQuizOptionQuestionQuizLectureSection.fromJson(dynamic json):
  
  course = GetOptionCourseQuizOptionQuestionQuizLectureSectionCourse.fromJson(json['course']);
  @override
  bool operator ==(Object other) {
    if(identical(this, other)) {
      return true;
    }
    if(other.runtimeType != runtimeType) {
      return false;
    }

    final GetOptionCourseQuizOptionQuestionQuizLectureSection otherTyped = other as GetOptionCourseQuizOptionQuestionQuizLectureSection;
    return course == otherTyped.course;
    
  }
  @override
  int get hashCode => course.hashCode;
  

  Map<String, dynamic> toJson() {
    Map<String, dynamic> json = {};
    json['course'] = course.toJson();
    return json;
  }

  GetOptionCourseQuizOptionQuestionQuizLectureSection({
    required this.course,
  });
}

@immutable
class GetOptionCourseQuizOptionQuestionQuizLectureSectionCourse {
  final String id;
  GetOptionCourseQuizOptionQuestionQuizLectureSectionCourse.fromJson(dynamic json):
  
  id = nativeFromJson<String>(json['id']);
  @override
  bool operator ==(Object other) {
    if(identical(this, other)) {
      return true;
    }
    if(other.runtimeType != runtimeType) {
      return false;
    }

    final GetOptionCourseQuizOptionQuestionQuizLectureSectionCourse otherTyped = other as GetOptionCourseQuizOptionQuestionQuizLectureSectionCourse;
    return id == otherTyped.id;
    
  }
  @override
  int get hashCode => id.hashCode;
  

  Map<String, dynamic> toJson() {
    Map<String, dynamic> json = {};
    json['id'] = nativeToJson<String>(id);
    return json;
  }

  GetOptionCourseQuizOptionQuestionQuizLectureSectionCourse({
    required this.id,
  });
}

@immutable
class GetOptionCourseData {
  final GetOptionCourseQuizOption? quizOption;
  GetOptionCourseData.fromJson(dynamic json):
  
  quizOption = json['quizOption'] == null ? null : GetOptionCourseQuizOption.fromJson(json['quizOption']);
  @override
  bool operator ==(Object other) {
    if(identical(this, other)) {
      return true;
    }
    if(other.runtimeType != runtimeType) {
      return false;
    }

    final GetOptionCourseData otherTyped = other as GetOptionCourseData;
    return quizOption == otherTyped.quizOption;
    
  }
  @override
  int get hashCode => quizOption.hashCode;
  

  Map<String, dynamic> toJson() {
    Map<String, dynamic> json = {};
    if (quizOption != null) {
      json['quizOption'] = quizOption!.toJson();
    }
    return json;
  }

  GetOptionCourseData({
    this.quizOption,
  });
}

@immutable
class GetOptionCourseVariables {
  final String optionId;
  @Deprecated('fromJson is deprecated for Variable classes as they are no longer required for deserialization.')
  GetOptionCourseVariables.fromJson(Map<String, dynamic> json):
  
  optionId = nativeFromJson<String>(json['optionId']);
  @override
  bool operator ==(Object other) {
    if(identical(this, other)) {
      return true;
    }
    if(other.runtimeType != runtimeType) {
      return false;
    }

    final GetOptionCourseVariables otherTyped = other as GetOptionCourseVariables;
    return optionId == otherTyped.optionId;
    
  }
  @override
  int get hashCode => optionId.hashCode;
  

  Map<String, dynamic> toJson() {
    Map<String, dynamic> json = {};
    json['optionId'] = nativeToJson<String>(optionId);
    return json;
  }

  GetOptionCourseVariables({
    required this.optionId,
  });
}

