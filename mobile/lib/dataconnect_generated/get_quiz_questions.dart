part of 'generated.dart';

class GetQuizQuestionsVariablesBuilder {
  String lectureId;

  final FirebaseDataConnect _dataConnect;
  GetQuizQuestionsVariablesBuilder(this._dataConnect, {required  this.lectureId,});
  Deserializer<GetQuizQuestionsData> dataDeserializer = (dynamic json)  => GetQuizQuestionsData.fromJson(jsonDecode(json));
  Serializer<GetQuizQuestionsVariables> varsSerializer = (GetQuizQuestionsVariables vars) => jsonEncode(vars.toJson());
  Future<QueryResult<GetQuizQuestionsData, GetQuizQuestionsVariables>> execute({QueryFetchPolicy fetchPolicy = QueryFetchPolicy.preferCache}) {
    return ref().execute(fetchPolicy: fetchPolicy);
  }

  QueryRef<GetQuizQuestionsData, GetQuizQuestionsVariables> ref() {
    GetQuizQuestionsVariables vars= GetQuizQuestionsVariables(lectureId: lectureId,);
    return _dataConnect.query("GetQuizQuestions", dataDeserializer, varsSerializer, vars);
  }
}

@immutable
class GetQuizQuestionsCourseQuizs {
  final String id;
  final double passingScore;
  final int maxAttempts;
  final List<GetQuizQuestionsCourseQuizsQuizQuestionsOnQuiz> quizQuestions_on_quiz;
  GetQuizQuestionsCourseQuizs.fromJson(dynamic json):
  
  id = nativeFromJson<String>(json['id']),
  passingScore = nativeFromJson<double>(json['passingScore']),
  maxAttempts = nativeFromJson<int>(json['maxAttempts']),
  quizQuestions_on_quiz = (json['quizQuestions_on_quiz'] as List<dynamic>)
        .map((e) => GetQuizQuestionsCourseQuizsQuizQuestionsOnQuiz.fromJson(e))
        .toList();
  @override
  bool operator ==(Object other) {
    if(identical(this, other)) {
      return true;
    }
    if(other.runtimeType != runtimeType) {
      return false;
    }

    final GetQuizQuestionsCourseQuizs otherTyped = other as GetQuizQuestionsCourseQuizs;
    return id == otherTyped.id && 
    passingScore == otherTyped.passingScore && 
    maxAttempts == otherTyped.maxAttempts && 
    quizQuestions_on_quiz == otherTyped.quizQuestions_on_quiz;
    
  }
  @override
  int get hashCode => Object.hashAll([id.hashCode, passingScore.hashCode, maxAttempts.hashCode, quizQuestions_on_quiz.hashCode]);
  

  Map<String, dynamic> toJson() {
    Map<String, dynamic> json = {};
    json['id'] = nativeToJson<String>(id);
    json['passingScore'] = nativeToJson<double>(passingScore);
    json['maxAttempts'] = nativeToJson<int>(maxAttempts);
    json['quizQuestions_on_quiz'] = quizQuestions_on_quiz.map((e) => e.toJson()).toList();
    return json;
  }

  GetQuizQuestionsCourseQuizs({
    required this.id,
    required this.passingScore,
    required this.maxAttempts,
    required this.quizQuestions_on_quiz,
  });
}

@immutable
class GetQuizQuestionsCourseQuizsQuizQuestionsOnQuiz {
  final String id;
  final String questionText;
  final double points;
  final List<GetQuizQuestionsCourseQuizsQuizQuestionsOnQuizQuizOptionsOnQuestion> quizOptions_on_question;
  GetQuizQuestionsCourseQuizsQuizQuestionsOnQuiz.fromJson(dynamic json):
  
  id = nativeFromJson<String>(json['id']),
  questionText = nativeFromJson<String>(json['questionText']),
  points = nativeFromJson<double>(json['points']),
  quizOptions_on_question = (json['quizOptions_on_question'] as List<dynamic>)
        .map((e) => GetQuizQuestionsCourseQuizsQuizQuestionsOnQuizQuizOptionsOnQuestion.fromJson(e))
        .toList();
  @override
  bool operator ==(Object other) {
    if(identical(this, other)) {
      return true;
    }
    if(other.runtimeType != runtimeType) {
      return false;
    }

    final GetQuizQuestionsCourseQuizsQuizQuestionsOnQuiz otherTyped = other as GetQuizQuestionsCourseQuizsQuizQuestionsOnQuiz;
    return id == otherTyped.id && 
    questionText == otherTyped.questionText && 
    points == otherTyped.points && 
    quizOptions_on_question == otherTyped.quizOptions_on_question;
    
  }
  @override
  int get hashCode => Object.hashAll([id.hashCode, questionText.hashCode, points.hashCode, quizOptions_on_question.hashCode]);
  

  Map<String, dynamic> toJson() {
    Map<String, dynamic> json = {};
    json['id'] = nativeToJson<String>(id);
    json['questionText'] = nativeToJson<String>(questionText);
    json['points'] = nativeToJson<double>(points);
    json['quizOptions_on_question'] = quizOptions_on_question.map((e) => e.toJson()).toList();
    return json;
  }

  GetQuizQuestionsCourseQuizsQuizQuestionsOnQuiz({
    required this.id,
    required this.questionText,
    required this.points,
    required this.quizOptions_on_question,
  });
}

@immutable
class GetQuizQuestionsCourseQuizsQuizQuestionsOnQuizQuizOptionsOnQuestion {
  final String id;
  final String text;
  GetQuizQuestionsCourseQuizsQuizQuestionsOnQuizQuizOptionsOnQuestion.fromJson(dynamic json):
  
  id = nativeFromJson<String>(json['id']),
  text = nativeFromJson<String>(json['text']);
  @override
  bool operator ==(Object other) {
    if(identical(this, other)) {
      return true;
    }
    if(other.runtimeType != runtimeType) {
      return false;
    }

    final GetQuizQuestionsCourseQuizsQuizQuestionsOnQuizQuizOptionsOnQuestion otherTyped = other as GetQuizQuestionsCourseQuizsQuizQuestionsOnQuizQuizOptionsOnQuestion;
    return id == otherTyped.id && 
    text == otherTyped.text;
    
  }
  @override
  int get hashCode => Object.hashAll([id.hashCode, text.hashCode]);
  

  Map<String, dynamic> toJson() {
    Map<String, dynamic> json = {};
    json['id'] = nativeToJson<String>(id);
    json['text'] = nativeToJson<String>(text);
    return json;
  }

  GetQuizQuestionsCourseQuizsQuizQuestionsOnQuizQuizOptionsOnQuestion({
    required this.id,
    required this.text,
  });
}

@immutable
class GetQuizQuestionsData {
  final List<GetQuizQuestionsCourseQuizs> courseQuizs;
  GetQuizQuestionsData.fromJson(dynamic json):
  
  courseQuizs = (json['courseQuizs'] as List<dynamic>)
        .map((e) => GetQuizQuestionsCourseQuizs.fromJson(e))
        .toList();
  @override
  bool operator ==(Object other) {
    if(identical(this, other)) {
      return true;
    }
    if(other.runtimeType != runtimeType) {
      return false;
    }

    final GetQuizQuestionsData otherTyped = other as GetQuizQuestionsData;
    return courseQuizs == otherTyped.courseQuizs;
    
  }
  @override
  int get hashCode => courseQuizs.hashCode;
  

  Map<String, dynamic> toJson() {
    Map<String, dynamic> json = {};
    json['courseQuizs'] = courseQuizs.map((e) => e.toJson()).toList();
    return json;
  }

  GetQuizQuestionsData({
    required this.courseQuizs,
  });
}

@immutable
class GetQuizQuestionsVariables {
  final String lectureId;
  @Deprecated('fromJson is deprecated for Variable classes as they are no longer required for deserialization.')
  GetQuizQuestionsVariables.fromJson(Map<String, dynamic> json):
  
  lectureId = nativeFromJson<String>(json['lectureId']);
  @override
  bool operator ==(Object other) {
    if(identical(this, other)) {
      return true;
    }
    if(other.runtimeType != runtimeType) {
      return false;
    }

    final GetQuizQuestionsVariables otherTyped = other as GetQuizQuestionsVariables;
    return lectureId == otherTyped.lectureId;
    
  }
  @override
  int get hashCode => lectureId.hashCode;
  

  Map<String, dynamic> toJson() {
    Map<String, dynamic> json = {};
    json['lectureId'] = nativeToJson<String>(lectureId);
    return json;
  }

  GetQuizQuestionsVariables({
    required this.lectureId,
  });
}

