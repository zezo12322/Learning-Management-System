part of 'generated.dart';

class GetOptionWithQuestionVariablesBuilder {
  String optionId;

  final FirebaseDataConnect _dataConnect;
  GetOptionWithQuestionVariablesBuilder(this._dataConnect, {required  this.optionId,});
  Deserializer<GetOptionWithQuestionData> dataDeserializer = (dynamic json)  => GetOptionWithQuestionData.fromJson(jsonDecode(json));
  Serializer<GetOptionWithQuestionVariables> varsSerializer = (GetOptionWithQuestionVariables vars) => jsonEncode(vars.toJson());
  Future<QueryResult<GetOptionWithQuestionData, GetOptionWithQuestionVariables>> execute({QueryFetchPolicy fetchPolicy = QueryFetchPolicy.preferCache}) {
    return ref().execute(fetchPolicy: fetchPolicy);
  }

  QueryRef<GetOptionWithQuestionData, GetOptionWithQuestionVariables> ref() {
    GetOptionWithQuestionVariables vars= GetOptionWithQuestionVariables(optionId: optionId,);
    return _dataConnect.query("GetOptionWithQuestion", dataDeserializer, varsSerializer, vars);
  }
}

@immutable
class GetOptionWithQuestionQuizOption {
  final String id;
  final GetOptionWithQuestionQuizOptionQuestion question;
  GetOptionWithQuestionQuizOption.fromJson(dynamic json):
  
  id = nativeFromJson<String>(json['id']),
  question = GetOptionWithQuestionQuizOptionQuestion.fromJson(json['question']);
  @override
  bool operator ==(Object other) {
    if(identical(this, other)) {
      return true;
    }
    if(other.runtimeType != runtimeType) {
      return false;
    }

    final GetOptionWithQuestionQuizOption otherTyped = other as GetOptionWithQuestionQuizOption;
    return id == otherTyped.id && 
    question == otherTyped.question;
    
  }
  @override
  int get hashCode => Object.hashAll([id.hashCode, question.hashCode]);
  

  Map<String, dynamic> toJson() {
    Map<String, dynamic> json = {};
    json['id'] = nativeToJson<String>(id);
    json['question'] = question.toJson();
    return json;
  }

  GetOptionWithQuestionQuizOption({
    required this.id,
    required this.question,
  });
}

@immutable
class GetOptionWithQuestionQuizOptionQuestion {
  final String id;
  final GetOptionWithQuestionQuizOptionQuestionQuiz quiz;
  GetOptionWithQuestionQuizOptionQuestion.fromJson(dynamic json):
  
  id = nativeFromJson<String>(json['id']),
  quiz = GetOptionWithQuestionQuizOptionQuestionQuiz.fromJson(json['quiz']);
  @override
  bool operator ==(Object other) {
    if(identical(this, other)) {
      return true;
    }
    if(other.runtimeType != runtimeType) {
      return false;
    }

    final GetOptionWithQuestionQuizOptionQuestion otherTyped = other as GetOptionWithQuestionQuizOptionQuestion;
    return id == otherTyped.id && 
    quiz == otherTyped.quiz;
    
  }
  @override
  int get hashCode => Object.hashAll([id.hashCode, quiz.hashCode]);
  

  Map<String, dynamic> toJson() {
    Map<String, dynamic> json = {};
    json['id'] = nativeToJson<String>(id);
    json['quiz'] = quiz.toJson();
    return json;
  }

  GetOptionWithQuestionQuizOptionQuestion({
    required this.id,
    required this.quiz,
  });
}

@immutable
class GetOptionWithQuestionQuizOptionQuestionQuiz {
  final String id;
  GetOptionWithQuestionQuizOptionQuestionQuiz.fromJson(dynamic json):
  
  id = nativeFromJson<String>(json['id']);
  @override
  bool operator ==(Object other) {
    if(identical(this, other)) {
      return true;
    }
    if(other.runtimeType != runtimeType) {
      return false;
    }

    final GetOptionWithQuestionQuizOptionQuestionQuiz otherTyped = other as GetOptionWithQuestionQuizOptionQuestionQuiz;
    return id == otherTyped.id;
    
  }
  @override
  int get hashCode => id.hashCode;
  

  Map<String, dynamic> toJson() {
    Map<String, dynamic> json = {};
    json['id'] = nativeToJson<String>(id);
    return json;
  }

  GetOptionWithQuestionQuizOptionQuestionQuiz({
    required this.id,
  });
}

@immutable
class GetOptionWithQuestionData {
  final GetOptionWithQuestionQuizOption? quizOption;
  GetOptionWithQuestionData.fromJson(dynamic json):
  
  quizOption = json['quizOption'] == null ? null : GetOptionWithQuestionQuizOption.fromJson(json['quizOption']);
  @override
  bool operator ==(Object other) {
    if(identical(this, other)) {
      return true;
    }
    if(other.runtimeType != runtimeType) {
      return false;
    }

    final GetOptionWithQuestionData otherTyped = other as GetOptionWithQuestionData;
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

  GetOptionWithQuestionData({
    this.quizOption,
  });
}

@immutable
class GetOptionWithQuestionVariables {
  final String optionId;
  @Deprecated('fromJson is deprecated for Variable classes as they are no longer required for deserialization.')
  GetOptionWithQuestionVariables.fromJson(Map<String, dynamic> json):
  
  optionId = nativeFromJson<String>(json['optionId']);
  @override
  bool operator ==(Object other) {
    if(identical(this, other)) {
      return true;
    }
    if(other.runtimeType != runtimeType) {
      return false;
    }

    final GetOptionWithQuestionVariables otherTyped = other as GetOptionWithQuestionVariables;
    return optionId == otherTyped.optionId;
    
  }
  @override
  int get hashCode => optionId.hashCode;
  

  Map<String, dynamic> toJson() {
    Map<String, dynamic> json = {};
    json['optionId'] = nativeToJson<String>(optionId);
    return json;
  }

  GetOptionWithQuestionVariables({
    required this.optionId,
  });
}

