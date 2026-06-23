part of 'generated.dart';

class AdminCreateQuizQuestionVariablesBuilder {
  String quizId;
  String questionText;
  int order;
  double points;
  final Optional<String> _explanation = Optional.optional(nativeFromJson, nativeToJson);

  final FirebaseDataConnect _dataConnect;  AdminCreateQuizQuestionVariablesBuilder explanation(String? t) {
   _explanation.value = t;
   return this;
  }

  AdminCreateQuizQuestionVariablesBuilder(this._dataConnect, {required  this.quizId,required  this.questionText,required  this.order,required  this.points,});
  Deserializer<AdminCreateQuizQuestionData> dataDeserializer = (dynamic json)  => AdminCreateQuizQuestionData.fromJson(jsonDecode(json));
  Serializer<AdminCreateQuizQuestionVariables> varsSerializer = (AdminCreateQuizQuestionVariables vars) => jsonEncode(vars.toJson());
  Future<OperationResult<AdminCreateQuizQuestionData, AdminCreateQuizQuestionVariables>> execute() {
    return ref().execute();
  }

  MutationRef<AdminCreateQuizQuestionData, AdminCreateQuizQuestionVariables> ref() {
    AdminCreateQuizQuestionVariables vars= AdminCreateQuizQuestionVariables(quizId: quizId,questionText: questionText,order: order,points: points,explanation: _explanation,);
    return _dataConnect.mutation('AdminCreateQuizQuestion', dataDeserializer, varsSerializer, vars);
  }
}

@immutable
class AdminCreateQuizQuestionQuizQuestionInsert {
  final String id;
  AdminCreateQuizQuestionQuizQuestionInsert.fromJson(dynamic json):
  
  id = nativeFromJson<String>(json['id']);
  @override
  bool operator ==(Object other) {
    if(identical(this, other)) {
      return true;
    }
    if(other.runtimeType != runtimeType) {
      return false;
    }

    final AdminCreateQuizQuestionQuizQuestionInsert otherTyped = other as AdminCreateQuizQuestionQuizQuestionInsert;
    return id == otherTyped.id;
    
  }
  @override
  int get hashCode => id.hashCode;
  

  Map<String, dynamic> toJson() {
    Map<String, dynamic> json = {};
    json['id'] = nativeToJson<String>(id);
    return json;
  }

  AdminCreateQuizQuestionQuizQuestionInsert({
    required this.id,
  });
}

@immutable
class AdminCreateQuizQuestionData {
  final AdminCreateQuizQuestionQuizQuestionInsert quizQuestion_insert;
  AdminCreateQuizQuestionData.fromJson(dynamic json):
  
  quizQuestion_insert = AdminCreateQuizQuestionQuizQuestionInsert.fromJson(json['quizQuestion_insert']);
  @override
  bool operator ==(Object other) {
    if(identical(this, other)) {
      return true;
    }
    if(other.runtimeType != runtimeType) {
      return false;
    }

    final AdminCreateQuizQuestionData otherTyped = other as AdminCreateQuizQuestionData;
    return quizQuestion_insert == otherTyped.quizQuestion_insert;
    
  }
  @override
  int get hashCode => quizQuestion_insert.hashCode;
  

  Map<String, dynamic> toJson() {
    Map<String, dynamic> json = {};
    json['quizQuestion_insert'] = quizQuestion_insert.toJson();
    return json;
  }

  AdminCreateQuizQuestionData({
    required this.quizQuestion_insert,
  });
}

@immutable
class AdminCreateQuizQuestionVariables {
  final String quizId;
  final String questionText;
  final int order;
  final double points;
  late final Optional<String>explanation;
  @Deprecated('fromJson is deprecated for Variable classes as they are no longer required for deserialization.')
  AdminCreateQuizQuestionVariables.fromJson(Map<String, dynamic> json):
  
  quizId = nativeFromJson<String>(json['quizId']),
  questionText = nativeFromJson<String>(json['questionText']),
  order = nativeFromJson<int>(json['order']),
  points = nativeFromJson<double>(json['points']) {
  
  
  
  
  
  
    explanation = Optional.optional(nativeFromJson, nativeToJson);
    explanation.value = json['explanation'] == null ? null : nativeFromJson<String>(json['explanation']);
  
  }
  @override
  bool operator ==(Object other) {
    if(identical(this, other)) {
      return true;
    }
    if(other.runtimeType != runtimeType) {
      return false;
    }

    final AdminCreateQuizQuestionVariables otherTyped = other as AdminCreateQuizQuestionVariables;
    return quizId == otherTyped.quizId && 
    questionText == otherTyped.questionText && 
    order == otherTyped.order && 
    points == otherTyped.points && 
    explanation == otherTyped.explanation;
    
  }
  @override
  int get hashCode => Object.hashAll([quizId.hashCode, questionText.hashCode, order.hashCode, points.hashCode, explanation.hashCode]);
  

  Map<String, dynamic> toJson() {
    Map<String, dynamic> json = {};
    json['quizId'] = nativeToJson<String>(quizId);
    json['questionText'] = nativeToJson<String>(questionText);
    json['order'] = nativeToJson<int>(order);
    json['points'] = nativeToJson<double>(points);
    if(explanation.state == OptionalState.set) {
      json['explanation'] = explanation.toJson();
    }
    return json;
  }

  AdminCreateQuizQuestionVariables({
    required this.quizId,
    required this.questionText,
    required this.order,
    required this.points,
    required this.explanation,
  });
}

