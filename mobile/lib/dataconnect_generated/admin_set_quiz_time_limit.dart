part of 'generated.dart';

class AdminSetQuizTimeLimitVariablesBuilder {
  String quizId;
  final Optional<int> _timeLimitMinutes = Optional.optional(nativeFromJson, nativeToJson);

  final FirebaseDataConnect _dataConnect;  AdminSetQuizTimeLimitVariablesBuilder timeLimitMinutes(int? t) {
   _timeLimitMinutes.value = t;
   return this;
  }

  AdminSetQuizTimeLimitVariablesBuilder(this._dataConnect, {required  this.quizId,});
  Deserializer<AdminSetQuizTimeLimitData> dataDeserializer = (dynamic json)  => AdminSetQuizTimeLimitData.fromJson(jsonDecode(json));
  Serializer<AdminSetQuizTimeLimitVariables> varsSerializer = (AdminSetQuizTimeLimitVariables vars) => jsonEncode(vars.toJson());
  Future<OperationResult<AdminSetQuizTimeLimitData, AdminSetQuizTimeLimitVariables>> execute() {
    return ref().execute();
  }

  MutationRef<AdminSetQuizTimeLimitData, AdminSetQuizTimeLimitVariables> ref() {
    AdminSetQuizTimeLimitVariables vars= AdminSetQuizTimeLimitVariables(quizId: quizId,timeLimitMinutes: _timeLimitMinutes,);
    return _dataConnect.mutation('AdminSetQuizTimeLimit', dataDeserializer, varsSerializer, vars);
  }
}

@immutable
class AdminSetQuizTimeLimitCourseQuizUpdate {
  final String id;
  AdminSetQuizTimeLimitCourseQuizUpdate.fromJson(dynamic json):
  
  id = nativeFromJson<String>(json['id']);
  @override
  bool operator ==(Object other) {
    if(identical(this, other)) {
      return true;
    }
    if(other.runtimeType != runtimeType) {
      return false;
    }

    final AdminSetQuizTimeLimitCourseQuizUpdate otherTyped = other as AdminSetQuizTimeLimitCourseQuizUpdate;
    return id == otherTyped.id;
    
  }
  @override
  int get hashCode => id.hashCode;
  

  Map<String, dynamic> toJson() {
    Map<String, dynamic> json = {};
    json['id'] = nativeToJson<String>(id);
    return json;
  }

  AdminSetQuizTimeLimitCourseQuizUpdate({
    required this.id,
  });
}

@immutable
class AdminSetQuizTimeLimitData {
  final AdminSetQuizTimeLimitCourseQuizUpdate? courseQuiz_update;
  AdminSetQuizTimeLimitData.fromJson(dynamic json):
  
  courseQuiz_update = json['courseQuiz_update'] == null ? null : AdminSetQuizTimeLimitCourseQuizUpdate.fromJson(json['courseQuiz_update']);
  @override
  bool operator ==(Object other) {
    if(identical(this, other)) {
      return true;
    }
    if(other.runtimeType != runtimeType) {
      return false;
    }

    final AdminSetQuizTimeLimitData otherTyped = other as AdminSetQuizTimeLimitData;
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

  AdminSetQuizTimeLimitData({
    this.courseQuiz_update,
  });
}

@immutable
class AdminSetQuizTimeLimitVariables {
  final String quizId;
  late final Optional<int>timeLimitMinutes;
  @Deprecated('fromJson is deprecated for Variable classes as they are no longer required for deserialization.')
  AdminSetQuizTimeLimitVariables.fromJson(Map<String, dynamic> json):
  
  quizId = nativeFromJson<String>(json['quizId']) {
  
  
  
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

    final AdminSetQuizTimeLimitVariables otherTyped = other as AdminSetQuizTimeLimitVariables;
    return quizId == otherTyped.quizId && 
    timeLimitMinutes == otherTyped.timeLimitMinutes;
    
  }
  @override
  int get hashCode => Object.hashAll([quizId.hashCode, timeLimitMinutes.hashCode]);
  

  Map<String, dynamic> toJson() {
    Map<String, dynamic> json = {};
    json['quizId'] = nativeToJson<String>(quizId);
    if(timeLimitMinutes.state == OptionalState.set) {
      json['timeLimitMinutes'] = timeLimitMinutes.toJson();
    }
    return json;
  }

  AdminSetQuizTimeLimitVariables({
    required this.quizId,
    required this.timeLimitMinutes,
  });
}

