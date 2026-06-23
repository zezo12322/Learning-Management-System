part of 'generated.dart';

class AdminUpdateQuizVariablesBuilder {
  String quizId;
  final Optional<double> _passingScore = Optional.optional(nativeFromJson, nativeToJson);
  final Optional<int> _maxAttempts = Optional.optional(nativeFromJson, nativeToJson);
  final Optional<int> _timeLimitMinutes = Optional.optional(nativeFromJson, nativeToJson);

  final FirebaseDataConnect _dataConnect;  AdminUpdateQuizVariablesBuilder passingScore(double? t) {
   _passingScore.value = t;
   return this;
  }
  AdminUpdateQuizVariablesBuilder maxAttempts(int? t) {
   _maxAttempts.value = t;
   return this;
  }
  AdminUpdateQuizVariablesBuilder timeLimitMinutes(int? t) {
   _timeLimitMinutes.value = t;
   return this;
  }

  AdminUpdateQuizVariablesBuilder(this._dataConnect, {required  this.quizId,});
  Deserializer<AdminUpdateQuizData> dataDeserializer = (dynamic json)  => AdminUpdateQuizData.fromJson(jsonDecode(json));
  Serializer<AdminUpdateQuizVariables> varsSerializer = (AdminUpdateQuizVariables vars) => jsonEncode(vars.toJson());
  Future<OperationResult<AdminUpdateQuizData, AdminUpdateQuizVariables>> execute() {
    return ref().execute();
  }

  MutationRef<AdminUpdateQuizData, AdminUpdateQuizVariables> ref() {
    AdminUpdateQuizVariables vars= AdminUpdateQuizVariables(quizId: quizId,passingScore: _passingScore,maxAttempts: _maxAttempts,timeLimitMinutes: _timeLimitMinutes,);
    return _dataConnect.mutation('AdminUpdateQuiz', dataDeserializer, varsSerializer, vars);
  }
}

@immutable
class AdminUpdateQuizCourseQuizUpdate {
  final String id;
  AdminUpdateQuizCourseQuizUpdate.fromJson(dynamic json):
  
  id = nativeFromJson<String>(json['id']);
  @override
  bool operator ==(Object other) {
    if(identical(this, other)) {
      return true;
    }
    if(other.runtimeType != runtimeType) {
      return false;
    }

    final AdminUpdateQuizCourseQuizUpdate otherTyped = other as AdminUpdateQuizCourseQuizUpdate;
    return id == otherTyped.id;
    
  }
  @override
  int get hashCode => id.hashCode;
  

  Map<String, dynamic> toJson() {
    Map<String, dynamic> json = {};
    json['id'] = nativeToJson<String>(id);
    return json;
  }

  AdminUpdateQuizCourseQuizUpdate({
    required this.id,
  });
}

@immutable
class AdminUpdateQuizData {
  final AdminUpdateQuizCourseQuizUpdate? courseQuiz_update;
  AdminUpdateQuizData.fromJson(dynamic json):
  
  courseQuiz_update = json['courseQuiz_update'] == null ? null : AdminUpdateQuizCourseQuizUpdate.fromJson(json['courseQuiz_update']);
  @override
  bool operator ==(Object other) {
    if(identical(this, other)) {
      return true;
    }
    if(other.runtimeType != runtimeType) {
      return false;
    }

    final AdminUpdateQuizData otherTyped = other as AdminUpdateQuizData;
    return courseQuiz_update == otherTyped.courseQuiz_update;
    
  }
  @override
  int get hashCode => courseQuiz_update.hashCode;
  

  Map<String, dynamic> toJson() {
    Map<String, dynamic> json = {};
    if (courseQuiz_update != null) {
      json['courseQuiz_update'] = courseQuiz_update!.toJson();
    }
    return json;
  }

  AdminUpdateQuizData({
    this.courseQuiz_update,
  });
}

@immutable
class AdminUpdateQuizVariables {
  final String quizId;
  late final Optional<double>passingScore;
  late final Optional<int>maxAttempts;
  late final Optional<int>timeLimitMinutes;
  @Deprecated('fromJson is deprecated for Variable classes as they are no longer required for deserialization.')
  AdminUpdateQuizVariables.fromJson(Map<String, dynamic> json):
  
  quizId = nativeFromJson<String>(json['quizId']) {
  
  
  
    passingScore = Optional.optional(nativeFromJson, nativeToJson);
    passingScore.value = json['passingScore'] == null ? null : nativeFromJson<double>(json['passingScore']);
  
  
    maxAttempts = Optional.optional(nativeFromJson, nativeToJson);
    maxAttempts.value = json['maxAttempts'] == null ? null : nativeFromJson<int>(json['maxAttempts']);
  
  
    timeLimitMinutes = Optional.optional(nativeFromJson, nativeToJson);
    timeLimitMinutes.value = json['timeLimitMinutes'] == null ? null : nativeFromJson<int>(json['timeLimitMinutes']);
  
  }
  @override
  bool operator ==(Object other) {
    if(identical(this, other)) {
      return true;
    }
    if(other.runtimeType != runtimeType) {
      return false;
    }

    final AdminUpdateQuizVariables otherTyped = other as AdminUpdateQuizVariables;
    return quizId == otherTyped.quizId && 
    passingScore == otherTyped.passingScore && 
    maxAttempts == otherTyped.maxAttempts && 
    timeLimitMinutes == otherTyped.timeLimitMinutes;
    
  }
  @override
  int get hashCode => Object.hashAll([quizId.hashCode, passingScore.hashCode, maxAttempts.hashCode, timeLimitMinutes.hashCode]);
  

  Map<String, dynamic> toJson() {
    Map<String, dynamic> json = {};
    json['quizId'] = nativeToJson<String>(quizId);
    if(passingScore.state == OptionalState.set) {
      json['passingScore'] = passingScore.toJson();
    }
    if(maxAttempts.state == OptionalState.set) {
      json['maxAttempts'] = maxAttempts.toJson();
    }
    if(timeLimitMinutes.state == OptionalState.set) {
      json['timeLimitMinutes'] = timeLimitMinutes.toJson();
    }
    return json;
  }

  AdminUpdateQuizVariables({
    required this.quizId,
    required this.passingScore,
    required this.maxAttempts,
    required this.timeLimitMinutes,
  });
}

