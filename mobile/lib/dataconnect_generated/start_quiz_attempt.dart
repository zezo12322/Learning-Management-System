part of 'generated.dart';

class StartQuizAttemptVariablesBuilder {
  String quizId;
  String userId;

  final FirebaseDataConnect _dataConnect;
  StartQuizAttemptVariablesBuilder(this._dataConnect, {required  this.quizId,required  this.userId,});
  Deserializer<StartQuizAttemptData> dataDeserializer = (dynamic json)  => StartQuizAttemptData.fromJson(jsonDecode(json));
  Serializer<StartQuizAttemptVariables> varsSerializer = (StartQuizAttemptVariables vars) => jsonEncode(vars.toJson());
  Future<OperationResult<StartQuizAttemptData, StartQuizAttemptVariables>> execute() {
    return ref().execute();
  }

  MutationRef<StartQuizAttemptData, StartQuizAttemptVariables> ref() {
    StartQuizAttemptVariables vars= StartQuizAttemptVariables(quizId: quizId,userId: userId,);
    return _dataConnect.mutation("StartQuizAttempt", dataDeserializer, varsSerializer, vars);
  }
}

@immutable
class StartQuizAttemptQuizAttemptInsert {
  final String id;
  StartQuizAttemptQuizAttemptInsert.fromJson(dynamic json):
  
  id = nativeFromJson<String>(json['id']);
  @override
  bool operator ==(Object other) {
    if(identical(this, other)) {
      return true;
    }
    if(other.runtimeType != runtimeType) {
      return false;
    }

    final StartQuizAttemptQuizAttemptInsert otherTyped = other as StartQuizAttemptQuizAttemptInsert;
    return id == otherTyped.id;
    
  }
  @override
  int get hashCode => id.hashCode;
  

  Map<String, dynamic> toJson() {
    Map<String, dynamic> json = {};
    json['id'] = nativeToJson<String>(id);
    return json;
  }

  StartQuizAttemptQuizAttemptInsert({
    required this.id,
  });
}

@immutable
class StartQuizAttemptData {
  final StartQuizAttemptQuizAttemptInsert quizAttempt_insert;
  StartQuizAttemptData.fromJson(dynamic json):
  
  quizAttempt_insert = StartQuizAttemptQuizAttemptInsert.fromJson(json['quizAttempt_insert']);
  @override
  bool operator ==(Object other) {
    if(identical(this, other)) {
      return true;
    }
    if(other.runtimeType != runtimeType) {
      return false;
    }

    final StartQuizAttemptData otherTyped = other as StartQuizAttemptData;
    return quizAttempt_insert == otherTyped.quizAttempt_insert;
    
  }
  @override
  int get hashCode => quizAttempt_insert.hashCode;
  

  Map<String, dynamic> toJson() {
    Map<String, dynamic> json = {};
    json['quizAttempt_insert'] = quizAttempt_insert.toJson();
    return json;
  }

  StartQuizAttemptData({
    required this.quizAttempt_insert,
  });
}

@immutable
class StartQuizAttemptVariables {
  final String quizId;
  final String userId;
  @Deprecated('fromJson is deprecated for Variable classes as they are no longer required for deserialization.')
  StartQuizAttemptVariables.fromJson(Map<String, dynamic> json):
  
  quizId = nativeFromJson<String>(json['quizId']),
  userId = nativeFromJson<String>(json['userId']);
  @override
  bool operator ==(Object other) {
    if(identical(this, other)) {
      return true;
    }
    if(other.runtimeType != runtimeType) {
      return false;
    }

    final StartQuizAttemptVariables otherTyped = other as StartQuizAttemptVariables;
    return quizId == otherTyped.quizId && 
    userId == otherTyped.userId;
    
  }
  @override
  int get hashCode => Object.hashAll([quizId.hashCode, userId.hashCode]);
  

  Map<String, dynamic> toJson() {
    Map<String, dynamic> json = {};
    json['quizId'] = nativeToJson<String>(quizId);
    json['userId'] = nativeToJson<String>(userId);
    return json;
  }

  StartQuizAttemptVariables({
    required this.quizId,
    required this.userId,
  });
}

