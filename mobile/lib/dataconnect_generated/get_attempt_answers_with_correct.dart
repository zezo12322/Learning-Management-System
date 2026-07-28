part of 'generated.dart';

class GetAttemptAnswersWithCorrectVariablesBuilder {
  String attemptId;

  final FirebaseDataConnect _dataConnect;
  GetAttemptAnswersWithCorrectVariablesBuilder(this._dataConnect, {required  this.attemptId,});
  Deserializer<GetAttemptAnswersWithCorrectData> dataDeserializer = (dynamic json)  => GetAttemptAnswersWithCorrectData.fromJson(jsonDecode(json));
  Serializer<GetAttemptAnswersWithCorrectVariables> varsSerializer = (GetAttemptAnswersWithCorrectVariables vars) => jsonEncode(vars.toJson());
  Future<QueryResult<GetAttemptAnswersWithCorrectData, GetAttemptAnswersWithCorrectVariables>> execute({QueryFetchPolicy fetchPolicy = QueryFetchPolicy.preferCache}) {
    return ref().execute(fetchPolicy: fetchPolicy);
  }

  QueryRef<GetAttemptAnswersWithCorrectData, GetAttemptAnswersWithCorrectVariables> ref() {
    GetAttemptAnswersWithCorrectVariables vars= GetAttemptAnswersWithCorrectVariables(attemptId: attemptId,);
    return _dataConnect.query("GetAttemptAnswersWithCorrect", dataDeserializer, varsSerializer, vars);
  }
}

@immutable
class GetAttemptAnswersWithCorrectQuizAttemptAnswers {
  final GetAttemptAnswersWithCorrectQuizAttemptAnswersQuestion question;
  final GetAttemptAnswersWithCorrectQuizAttemptAnswersSelectedOption selectedOption;
  GetAttemptAnswersWithCorrectQuizAttemptAnswers.fromJson(dynamic json):
  
  question = GetAttemptAnswersWithCorrectQuizAttemptAnswersQuestion.fromJson(json['question']),
  selectedOption = GetAttemptAnswersWithCorrectQuizAttemptAnswersSelectedOption.fromJson(json['selectedOption']);
  @override
  bool operator ==(Object other) {
    if(identical(this, other)) {
      return true;
    }
    if(other.runtimeType != runtimeType) {
      return false;
    }

    final GetAttemptAnswersWithCorrectQuizAttemptAnswers otherTyped = other as GetAttemptAnswersWithCorrectQuizAttemptAnswers;
    return question == otherTyped.question && 
    selectedOption == otherTyped.selectedOption;
    
  }
  @override
  int get hashCode => Object.hashAll([question.hashCode, selectedOption.hashCode]);
  

  Map<String, dynamic> toJson() {
    Map<String, dynamic> json = {};
    json['question'] = question.toJson();
    json['selectedOption'] = selectedOption.toJson();
    return json;
  }

  GetAttemptAnswersWithCorrectQuizAttemptAnswers({
    required this.question,
    required this.selectedOption,
  });
}

@immutable
class GetAttemptAnswersWithCorrectQuizAttemptAnswersQuestion {
  final String id;
  final double points;
  GetAttemptAnswersWithCorrectQuizAttemptAnswersQuestion.fromJson(dynamic json):
  
  id = nativeFromJson<String>(json['id']),
  points = nativeFromJson<double>(json['points']);
  @override
  bool operator ==(Object other) {
    if(identical(this, other)) {
      return true;
    }
    if(other.runtimeType != runtimeType) {
      return false;
    }

    final GetAttemptAnswersWithCorrectQuizAttemptAnswersQuestion otherTyped = other as GetAttemptAnswersWithCorrectQuizAttemptAnswersQuestion;
    return id == otherTyped.id && 
    points == otherTyped.points;
    
  }
  @override
  int get hashCode => Object.hashAll([id.hashCode, points.hashCode]);
  

  Map<String, dynamic> toJson() {
    Map<String, dynamic> json = {};
    json['id'] = nativeToJson<String>(id);
    json['points'] = nativeToJson<double>(points);
    return json;
  }

  GetAttemptAnswersWithCorrectQuizAttemptAnswersQuestion({
    required this.id,
    required this.points,
  });
}

@immutable
class GetAttemptAnswersWithCorrectQuizAttemptAnswersSelectedOption {
  final String id;
  final bool isCorrect;
  GetAttemptAnswersWithCorrectQuizAttemptAnswersSelectedOption.fromJson(dynamic json):
  
  id = nativeFromJson<String>(json['id']),
  isCorrect = nativeFromJson<bool>(json['isCorrect']);
  @override
  bool operator ==(Object other) {
    if(identical(this, other)) {
      return true;
    }
    if(other.runtimeType != runtimeType) {
      return false;
    }

    final GetAttemptAnswersWithCorrectQuizAttemptAnswersSelectedOption otherTyped = other as GetAttemptAnswersWithCorrectQuizAttemptAnswersSelectedOption;
    return id == otherTyped.id && 
    isCorrect == otherTyped.isCorrect;
    
  }
  @override
  int get hashCode => Object.hashAll([id.hashCode, isCorrect.hashCode]);
  

  Map<String, dynamic> toJson() {
    Map<String, dynamic> json = {};
    json['id'] = nativeToJson<String>(id);
    json['isCorrect'] = nativeToJson<bool>(isCorrect);
    return json;
  }

  GetAttemptAnswersWithCorrectQuizAttemptAnswersSelectedOption({
    required this.id,
    required this.isCorrect,
  });
}

@immutable
class GetAttemptAnswersWithCorrectData {
  final List<GetAttemptAnswersWithCorrectQuizAttemptAnswers> quizAttemptAnswers;
  GetAttemptAnswersWithCorrectData.fromJson(dynamic json):
  
  quizAttemptAnswers = (json['quizAttemptAnswers'] as List<dynamic>)
        .map((e) => GetAttemptAnswersWithCorrectQuizAttemptAnswers.fromJson(e))
        .toList();
  @override
  bool operator ==(Object other) {
    if(identical(this, other)) {
      return true;
    }
    if(other.runtimeType != runtimeType) {
      return false;
    }

    final GetAttemptAnswersWithCorrectData otherTyped = other as GetAttemptAnswersWithCorrectData;
    return quizAttemptAnswers == otherTyped.quizAttemptAnswers;
    
  }
  @override
  int get hashCode => quizAttemptAnswers.hashCode;
  

  Map<String, dynamic> toJson() {
    Map<String, dynamic> json = {};
    json['quizAttemptAnswers'] = quizAttemptAnswers.map((e) => e.toJson()).toList();
    return json;
  }

  GetAttemptAnswersWithCorrectData({
    required this.quizAttemptAnswers,
  });
}

@immutable
class GetAttemptAnswersWithCorrectVariables {
  final String attemptId;
  @Deprecated('fromJson is deprecated for Variable classes as they are no longer required for deserialization.')
  GetAttemptAnswersWithCorrectVariables.fromJson(Map<String, dynamic> json):
  
  attemptId = nativeFromJson<String>(json['attemptId']);
  @override
  bool operator ==(Object other) {
    if(identical(this, other)) {
      return true;
    }
    if(other.runtimeType != runtimeType) {
      return false;
    }

    final GetAttemptAnswersWithCorrectVariables otherTyped = other as GetAttemptAnswersWithCorrectVariables;
    return attemptId == otherTyped.attemptId;
    
  }
  @override
  int get hashCode => attemptId.hashCode;
  

  Map<String, dynamic> toJson() {
    Map<String, dynamic> json = {};
    json['attemptId'] = nativeToJson<String>(attemptId);
    return json;
  }

  GetAttemptAnswersWithCorrectVariables({
    required this.attemptId,
  });
}

