part of 'generated.dart';

class AdminDeleteQuizVariablesBuilder {
  String quizId;

  final FirebaseDataConnect _dataConnect;
  AdminDeleteQuizVariablesBuilder(this._dataConnect, {required  this.quizId,});
  Deserializer<AdminDeleteQuizData> dataDeserializer = (dynamic json)  => AdminDeleteQuizData.fromJson(jsonDecode(json));
  Serializer<AdminDeleteQuizVariables> varsSerializer = (AdminDeleteQuizVariables vars) => jsonEncode(vars.toJson());
  Future<OperationResult<AdminDeleteQuizData, AdminDeleteQuizVariables>> execute() {
    return ref().execute();
  }

  MutationRef<AdminDeleteQuizData, AdminDeleteQuizVariables> ref() {
    AdminDeleteQuizVariables vars= AdminDeleteQuizVariables(quizId: quizId,);
    return _dataConnect.mutation("AdminDeleteQuiz", dataDeserializer, varsSerializer, vars);
  }
}

@immutable
class AdminDeleteQuizCourseQuizDelete {
  final String id;
  AdminDeleteQuizCourseQuizDelete.fromJson(dynamic json):
  
  id = nativeFromJson<String>(json['id']);
  @override
  bool operator ==(Object other) {
    if(identical(this, other)) {
      return true;
    }
    if(other.runtimeType != runtimeType) {
      return false;
    }

    final AdminDeleteQuizCourseQuizDelete otherTyped = other as AdminDeleteQuizCourseQuizDelete;
    return id == otherTyped.id;
    
  }
  @override
  int get hashCode => id.hashCode;
  

  Map<String, dynamic> toJson() {
    Map<String, dynamic> json = {};
    json['id'] = nativeToJson<String>(id);
    return json;
  }

  AdminDeleteQuizCourseQuizDelete({
    required this.id,
  });
}

@immutable
class AdminDeleteQuizData {
  final AdminDeleteQuizCourseQuizDelete? courseQuiz_delete;
  AdminDeleteQuizData.fromJson(dynamic json):
  
  courseQuiz_delete = json['courseQuiz_delete'] == null ? null : AdminDeleteQuizCourseQuizDelete.fromJson(json['courseQuiz_delete']);
  @override
  bool operator ==(Object other) {
    if(identical(this, other)) {
      return true;
    }
    if(other.runtimeType != runtimeType) {
      return false;
    }

    final AdminDeleteQuizData otherTyped = other as AdminDeleteQuizData;
    return courseQuiz_delete == otherTyped.courseQuiz_delete;
    
  }
  @override
  int get hashCode => courseQuiz_delete.hashCode;
  

  Map<String, dynamic> toJson() {
    Map<String, dynamic> json = {};
    if (courseQuiz_delete != null) {
      json['courseQuiz_delete'] = courseQuiz_delete!.toJson();
    }
    return json;
  }

  AdminDeleteQuizData({
    this.courseQuiz_delete,
  });
}

@immutable
class AdminDeleteQuizVariables {
  final String quizId;
  @Deprecated('fromJson is deprecated for Variable classes as they are no longer required for deserialization.')
  AdminDeleteQuizVariables.fromJson(Map<String, dynamic> json):
  
  quizId = nativeFromJson<String>(json['quizId']);
  @override
  bool operator ==(Object other) {
    if(identical(this, other)) {
      return true;
    }
    if(other.runtimeType != runtimeType) {
      return false;
    }

    final AdminDeleteQuizVariables otherTyped = other as AdminDeleteQuizVariables;
    return quizId == otherTyped.quizId;
    
  }
  @override
  int get hashCode => quizId.hashCode;
  

  Map<String, dynamic> toJson() {
    Map<String, dynamic> json = {};
    json['quizId'] = nativeToJson<String>(quizId);
    return json;
  }

  AdminDeleteQuizVariables({
    required this.quizId,
  });
}

