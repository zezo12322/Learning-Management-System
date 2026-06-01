part of 'generated.dart';

class AdminCreateQuizVariablesBuilder {
  String lectureId;
  double passingScore;
  int maxAttempts;

  final FirebaseDataConnect _dataConnect;
  AdminCreateQuizVariablesBuilder(this._dataConnect, {required  this.lectureId,required  this.passingScore,required  this.maxAttempts,});
  Deserializer<AdminCreateQuizData> dataDeserializer = (dynamic json)  => AdminCreateQuizData.fromJson(jsonDecode(json));
  Serializer<AdminCreateQuizVariables> varsSerializer = (AdminCreateQuizVariables vars) => jsonEncode(vars.toJson());
  Future<OperationResult<AdminCreateQuizData, AdminCreateQuizVariables>> execute() {
    return ref().execute();
  }

  MutationRef<AdminCreateQuizData, AdminCreateQuizVariables> ref() {
    AdminCreateQuizVariables vars= AdminCreateQuizVariables(lectureId: lectureId,passingScore: passingScore,maxAttempts: maxAttempts,);
    return _dataConnect.mutation("AdminCreateQuiz", dataDeserializer, varsSerializer, vars);
  }
}

@immutable
class AdminCreateQuizCourseQuizInsert {
  final String id;
  AdminCreateQuizCourseQuizInsert.fromJson(dynamic json):
  
  id = nativeFromJson<String>(json['id']);
  @override
  bool operator ==(Object other) {
    if(identical(this, other)) {
      return true;
    }
    if(other.runtimeType != runtimeType) {
      return false;
    }

    final AdminCreateQuizCourseQuizInsert otherTyped = other as AdminCreateQuizCourseQuizInsert;
    return id == otherTyped.id;
    
  }
  @override
  int get hashCode => id.hashCode;
  

  Map<String, dynamic> toJson() {
    Map<String, dynamic> json = {};
    json['id'] = nativeToJson<String>(id);
    return json;
  }

  AdminCreateQuizCourseQuizInsert({
    required this.id,
  });
}

@immutable
class AdminCreateQuizData {
  final AdminCreateQuizCourseQuizInsert courseQuiz_insert;
  AdminCreateQuizData.fromJson(dynamic json):
  
  courseQuiz_insert = AdminCreateQuizCourseQuizInsert.fromJson(json['courseQuiz_insert']);
  @override
  bool operator ==(Object other) {
    if(identical(this, other)) {
      return true;
    }
    if(other.runtimeType != runtimeType) {
      return false;
    }

    final AdminCreateQuizData otherTyped = other as AdminCreateQuizData;
    return courseQuiz_insert == otherTyped.courseQuiz_insert;
    
  }
  @override
  int get hashCode => courseQuiz_insert.hashCode;
  

  Map<String, dynamic> toJson() {
    Map<String, dynamic> json = {};
    json['courseQuiz_insert'] = courseQuiz_insert.toJson();
    return json;
  }

  AdminCreateQuizData({
    required this.courseQuiz_insert,
  });
}

@immutable
class AdminCreateQuizVariables {
  final String lectureId;
  final double passingScore;
  final int maxAttempts;
  @Deprecated('fromJson is deprecated for Variable classes as they are no longer required for deserialization.')
  AdminCreateQuizVariables.fromJson(Map<String, dynamic> json):
  
  lectureId = nativeFromJson<String>(json['lectureId']),
  passingScore = nativeFromJson<double>(json['passingScore']),
  maxAttempts = nativeFromJson<int>(json['maxAttempts']);
  @override
  bool operator ==(Object other) {
    if(identical(this, other)) {
      return true;
    }
    if(other.runtimeType != runtimeType) {
      return false;
    }

    final AdminCreateQuizVariables otherTyped = other as AdminCreateQuizVariables;
    return lectureId == otherTyped.lectureId && 
    passingScore == otherTyped.passingScore && 
    maxAttempts == otherTyped.maxAttempts;
    
  }
  @override
  int get hashCode => Object.hashAll([lectureId.hashCode, passingScore.hashCode, maxAttempts.hashCode]);
  

  Map<String, dynamic> toJson() {
    Map<String, dynamic> json = {};
    json['lectureId'] = nativeToJson<String>(lectureId);
    json['passingScore'] = nativeToJson<double>(passingScore);
    json['maxAttempts'] = nativeToJson<int>(maxAttempts);
    return json;
  }

  AdminCreateQuizVariables({
    required this.lectureId,
    required this.passingScore,
    required this.maxAttempts,
  });
}

