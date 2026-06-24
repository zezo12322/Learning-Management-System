part of 'generated.dart';

class GetQuestionOptionsVariablesBuilder {
  String questionId;

  final FirebaseDataConnect _dataConnect;
  GetQuestionOptionsVariablesBuilder(this._dataConnect, {required  this.questionId,});
  Deserializer<GetQuestionOptionsData> dataDeserializer = (dynamic json)  => GetQuestionOptionsData.fromJson(jsonDecode(json));
  Serializer<GetQuestionOptionsVariables> varsSerializer = (GetQuestionOptionsVariables vars) => jsonEncode(vars.toJson());
  Future<QueryResult<GetQuestionOptionsData, GetQuestionOptionsVariables>> execute({QueryFetchPolicy fetchPolicy = QueryFetchPolicy.preferCache}) {
    return ref().execute(fetchPolicy: fetchPolicy);
  }

  QueryRef<GetQuestionOptionsData, GetQuestionOptionsVariables> ref() {
    GetQuestionOptionsVariables vars= GetQuestionOptionsVariables(questionId: questionId,);
    return _dataConnect.query("GetQuestionOptions", dataDeserializer, varsSerializer, vars);
  }
}

@immutable
class GetQuestionOptionsQuizOptions {
  final String id;
  final String text;
  final int order;
  final bool isCorrect;
  GetQuestionOptionsQuizOptions.fromJson(dynamic json):
  
  id = nativeFromJson<String>(json['id']),
  text = nativeFromJson<String>(json['text']),
  order = nativeFromJson<int>(json['order']),
  isCorrect = nativeFromJson<bool>(json['isCorrect']);
  @override
  bool operator ==(Object other) {
    if(identical(this, other)) {
      return true;
    }
    if(other.runtimeType != runtimeType) {
      return false;
    }

    final GetQuestionOptionsQuizOptions otherTyped = other as GetQuestionOptionsQuizOptions;
    return id == otherTyped.id && 
    text == otherTyped.text && 
    order == otherTyped.order && 
    isCorrect == otherTyped.isCorrect;
    
  }
  @override
  int get hashCode => Object.hashAll([id.hashCode, text.hashCode, order.hashCode, isCorrect.hashCode]);
  

  Map<String, dynamic> toJson() {
    Map<String, dynamic> json = {};
    json['id'] = nativeToJson<String>(id);
    json['text'] = nativeToJson<String>(text);
    json['order'] = nativeToJson<int>(order);
    json['isCorrect'] = nativeToJson<bool>(isCorrect);
    return json;
  }

  GetQuestionOptionsQuizOptions({
    required this.id,
    required this.text,
    required this.order,
    required this.isCorrect,
  });
}

@immutable
class GetQuestionOptionsData {
  final List<GetQuestionOptionsQuizOptions> quizOptions;
  GetQuestionOptionsData.fromJson(dynamic json):
  
  quizOptions = (json['quizOptions'] as List<dynamic>)
        .map((e) => GetQuestionOptionsQuizOptions.fromJson(e))
        .toList();
  @override
  bool operator ==(Object other) {
    if(identical(this, other)) {
      return true;
    }
    if(other.runtimeType != runtimeType) {
      return false;
    }

    final GetQuestionOptionsData otherTyped = other as GetQuestionOptionsData;
    return quizOptions == otherTyped.quizOptions;
    
  }
  @override
  int get hashCode => quizOptions.hashCode;
  

  Map<String, dynamic> toJson() {
    Map<String, dynamic> json = {};
    json['quizOptions'] = quizOptions.map((e) => e.toJson()).toList();
    return json;
  }

  GetQuestionOptionsData({
    required this.quizOptions,
  });
}

@immutable
class GetQuestionOptionsVariables {
  final String questionId;
  @Deprecated('fromJson is deprecated for Variable classes as they are no longer required for deserialization.')
  GetQuestionOptionsVariables.fromJson(Map<String, dynamic> json):
  
  questionId = nativeFromJson<String>(json['questionId']);
  @override
  bool operator ==(Object other) {
    if(identical(this, other)) {
      return true;
    }
    if(other.runtimeType != runtimeType) {
      return false;
    }

    final GetQuestionOptionsVariables otherTyped = other as GetQuestionOptionsVariables;
    return questionId == otherTyped.questionId;
    
  }
  @override
  int get hashCode => questionId.hashCode;
  

  Map<String, dynamic> toJson() {
    Map<String, dynamic> json = {};
    json['questionId'] = nativeToJson<String>(questionId);
    return json;
  }

  GetQuestionOptionsVariables({
    required this.questionId,
  });
}

