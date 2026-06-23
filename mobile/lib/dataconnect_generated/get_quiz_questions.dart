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
    return _dataConnect.query('GetQuizQuestions', dataDeserializer, varsSerializer, vars);
  }
}

@immutable
class GetQuizQuestionsCourseQuizs {
  final String id;
  final double passingScore;
  final int maxAttempts;
  final int? timeLimitMinutes;
  final List<GetQuizQuestionsCourseQuizsTakeQuestions> takeQuestions;
  GetQuizQuestionsCourseQuizs.fromJson(dynamic json):
  
  id = nativeFromJson<String>(json['id']),
  passingScore = nativeFromJson<double>(json['passingScore']),
  maxAttempts = nativeFromJson<int>(json['maxAttempts']),
  timeLimitMinutes = json['timeLimitMinutes'] == null ? null : nativeFromJson<int>(json['timeLimitMinutes']),
  takeQuestions = (json['takeQuestions'] as List<dynamic>)
        .map((e) => GetQuizQuestionsCourseQuizsTakeQuestions.fromJson(e))
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
    timeLimitMinutes == otherTyped.timeLimitMinutes && 
    takeQuestions == otherTyped.takeQuestions;
    
  }
  @override
  int get hashCode => Object.hashAll([id.hashCode, passingScore.hashCode, maxAttempts.hashCode, timeLimitMinutes.hashCode, takeQuestions.hashCode]);
  

  Map<String, dynamic> toJson() {
    Map<String, dynamic> json = {};
    json['id'] = nativeToJson<String>(id);
    json['passingScore'] = nativeToJson<double>(passingScore);
    json['maxAttempts'] = nativeToJson<int>(maxAttempts);
    if (timeLimitMinutes != null) {
      json['timeLimitMinutes'] = nativeToJson<int?>(timeLimitMinutes);
    }
    json['takeQuestions'] = takeQuestions.map((e) => e.toJson()).toList();
    return json;
  }

  GetQuizQuestionsCourseQuizs({
    required this.id,
    required this.passingScore,
    required this.maxAttempts,
    this.timeLimitMinutes,
    required this.takeQuestions,
  });
}

@immutable
class GetQuizQuestionsCourseQuizsTakeQuestions {
  final String id;
  final String questionText;
  final double points;
  final List<GetQuizQuestionsCourseQuizsTakeQuestionsTakeOptions> takeOptions;
  GetQuizQuestionsCourseQuizsTakeQuestions.fromJson(dynamic json):
  
  id = nativeFromJson<String>(json['id']),
  questionText = nativeFromJson<String>(json['questionText']),
  points = nativeFromJson<double>(json['points']),
  takeOptions = (json['takeOptions'] as List<dynamic>)
        .map((e) => GetQuizQuestionsCourseQuizsTakeQuestionsTakeOptions.fromJson(e))
        .toList();
  @override
  bool operator ==(Object other) {
    if(identical(this, other)) {
      return true;
    }
    if(other.runtimeType != runtimeType) {
      return false;
    }

    final GetQuizQuestionsCourseQuizsTakeQuestions otherTyped = other as GetQuizQuestionsCourseQuizsTakeQuestions;
    return id == otherTyped.id && 
    questionText == otherTyped.questionText && 
    points == otherTyped.points && 
    takeOptions == otherTyped.takeOptions;
    
  }
  @override
  int get hashCode => Object.hashAll([id.hashCode, questionText.hashCode, points.hashCode, takeOptions.hashCode]);
  

  Map<String, dynamic> toJson() {
    Map<String, dynamic> json = {};
    json['id'] = nativeToJson<String>(id);
    json['questionText'] = nativeToJson<String>(questionText);
    json['points'] = nativeToJson<double>(points);
    json['takeOptions'] = takeOptions.map((e) => e.toJson()).toList();
    return json;
  }

  GetQuizQuestionsCourseQuizsTakeQuestions({
    required this.id,
    required this.questionText,
    required this.points,
    required this.takeOptions,
  });
}

@immutable
class GetQuizQuestionsCourseQuizsTakeQuestionsTakeOptions {
  final String id;
  final String text;
  GetQuizQuestionsCourseQuizsTakeQuestionsTakeOptions.fromJson(dynamic json):
  
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

    final GetQuizQuestionsCourseQuizsTakeQuestionsTakeOptions otherTyped = other as GetQuizQuestionsCourseQuizsTakeQuestionsTakeOptions;
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

  GetQuizQuestionsCourseQuizsTakeQuestionsTakeOptions({
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

