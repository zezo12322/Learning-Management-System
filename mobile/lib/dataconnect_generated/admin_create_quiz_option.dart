part of 'generated.dart';

class AdminCreateQuizOptionVariablesBuilder {
  String questionId;
  String text;
  int order;
  bool isCorrect;

  final FirebaseDataConnect _dataConnect;
  AdminCreateQuizOptionVariablesBuilder(this._dataConnect, {required  this.questionId,required  this.text,required  this.order,required  this.isCorrect,});
  Deserializer<AdminCreateQuizOptionData> dataDeserializer = (dynamic json)  => AdminCreateQuizOptionData.fromJson(jsonDecode(json));
  Serializer<AdminCreateQuizOptionVariables> varsSerializer = (AdminCreateQuizOptionVariables vars) => jsonEncode(vars.toJson());
  Future<OperationResult<AdminCreateQuizOptionData, AdminCreateQuizOptionVariables>> execute() {
    return ref().execute();
  }

  MutationRef<AdminCreateQuizOptionData, AdminCreateQuizOptionVariables> ref() {
    AdminCreateQuizOptionVariables vars= AdminCreateQuizOptionVariables(questionId: questionId,text: text,order: order,isCorrect: isCorrect,);
    return _dataConnect.mutation("AdminCreateQuizOption", dataDeserializer, varsSerializer, vars);
  }
}

@immutable
class AdminCreateQuizOptionQuizOptionInsert {
  final String id;
  AdminCreateQuizOptionQuizOptionInsert.fromJson(dynamic json):
  
  id = nativeFromJson<String>(json['id']);
  @override
  bool operator ==(Object other) {
    if(identical(this, other)) {
      return true;
    }
    if(other.runtimeType != runtimeType) {
      return false;
    }

    final AdminCreateQuizOptionQuizOptionInsert otherTyped = other as AdminCreateQuizOptionQuizOptionInsert;
    return id == otherTyped.id;
    
  }
  @override
  int get hashCode => id.hashCode;
  

  Map<String, dynamic> toJson() {
    Map<String, dynamic> json = {};
    json['id'] = nativeToJson<String>(id);
    return json;
  }

  AdminCreateQuizOptionQuizOptionInsert({
    required this.id,
  });
}

@immutable
class AdminCreateQuizOptionData {
  final AdminCreateQuizOptionQuizOptionInsert quizOption_insert;
  AdminCreateQuizOptionData.fromJson(dynamic json):
  
  quizOption_insert = AdminCreateQuizOptionQuizOptionInsert.fromJson(json['quizOption_insert']);
  @override
  bool operator ==(Object other) {
    if(identical(this, other)) {
      return true;
    }
    if(other.runtimeType != runtimeType) {
      return false;
    }

    final AdminCreateQuizOptionData otherTyped = other as AdminCreateQuizOptionData;
    return quizOption_insert == otherTyped.quizOption_insert;
    
  }
  @override
  int get hashCode => quizOption_insert.hashCode;
  

  Map<String, dynamic> toJson() {
    Map<String, dynamic> json = {};
    json['quizOption_insert'] = quizOption_insert.toJson();
    return json;
  }

  AdminCreateQuizOptionData({
    required this.quizOption_insert,
  });
}

@immutable
class AdminCreateQuizOptionVariables {
  final String questionId;
  final String text;
  final int order;
  final bool isCorrect;
  @Deprecated('fromJson is deprecated for Variable classes as they are no longer required for deserialization.')
  AdminCreateQuizOptionVariables.fromJson(Map<String, dynamic> json):
  
  questionId = nativeFromJson<String>(json['questionId']),
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

    final AdminCreateQuizOptionVariables otherTyped = other as AdminCreateQuizOptionVariables;
    return questionId == otherTyped.questionId && 
    text == otherTyped.text && 
    order == otherTyped.order && 
    isCorrect == otherTyped.isCorrect;
    
  }
  @override
  int get hashCode => Object.hashAll([questionId.hashCode, text.hashCode, order.hashCode, isCorrect.hashCode]);
  

  Map<String, dynamic> toJson() {
    Map<String, dynamic> json = {};
    json['questionId'] = nativeToJson<String>(questionId);
    json['text'] = nativeToJson<String>(text);
    json['order'] = nativeToJson<int>(order);
    json['isCorrect'] = nativeToJson<bool>(isCorrect);
    return json;
  }

  AdminCreateQuizOptionVariables({
    required this.questionId,
    required this.text,
    required this.order,
    required this.isCorrect,
  });
}

