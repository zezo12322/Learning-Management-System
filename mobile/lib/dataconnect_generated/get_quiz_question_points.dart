part of 'generated.dart';

class GetQuizQuestionPointsVariablesBuilder {
  String quizId;

  final FirebaseDataConnect _dataConnect;
  GetQuizQuestionPointsVariablesBuilder(this._dataConnect, {required  this.quizId,});
  Deserializer<GetQuizQuestionPointsData> dataDeserializer = (dynamic json)  => GetQuizQuestionPointsData.fromJson(jsonDecode(json));
  Serializer<GetQuizQuestionPointsVariables> varsSerializer = (GetQuizQuestionPointsVariables vars) => jsonEncode(vars.toJson());
  Future<QueryResult<GetQuizQuestionPointsData, GetQuizQuestionPointsVariables>> execute({QueryFetchPolicy fetchPolicy = QueryFetchPolicy.preferCache}) {
    return ref().execute(fetchPolicy: fetchPolicy);
  }

  QueryRef<GetQuizQuestionPointsData, GetQuizQuestionPointsVariables> ref() {
    GetQuizQuestionPointsVariables vars= GetQuizQuestionPointsVariables(quizId: quizId,);
    return _dataConnect.query("GetQuizQuestionPoints", dataDeserializer, varsSerializer, vars);
  }
}

@immutable
class GetQuizQuestionPointsQuizQuestions {
  final String id;
  final double points;
  GetQuizQuestionPointsQuizQuestions.fromJson(dynamic json):
  
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

    final GetQuizQuestionPointsQuizQuestions otherTyped = other as GetQuizQuestionPointsQuizQuestions;
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

  GetQuizQuestionPointsQuizQuestions({
    required this.id,
    required this.points,
  });
}

@immutable
class GetQuizQuestionPointsData {
  final List<GetQuizQuestionPointsQuizQuestions> quizQuestions;
  GetQuizQuestionPointsData.fromJson(dynamic json):
  
  quizQuestions = (json['quizQuestions'] as List<dynamic>)
        .map((e) => GetQuizQuestionPointsQuizQuestions.fromJson(e))
        .toList();
  @override
  bool operator ==(Object other) {
    if(identical(this, other)) {
      return true;
    }
    if(other.runtimeType != runtimeType) {
      return false;
    }

    final GetQuizQuestionPointsData otherTyped = other as GetQuizQuestionPointsData;
    return quizQuestions == otherTyped.quizQuestions;
    
  }
  @override
  int get hashCode => quizQuestions.hashCode;
  

  Map<String, dynamic> toJson() {
    Map<String, dynamic> json = {};
    json['quizQuestions'] = quizQuestions.map((e) => e.toJson()).toList();
    return json;
  }

  GetQuizQuestionPointsData({
    required this.quizQuestions,
  });
}

@immutable
class GetQuizQuestionPointsVariables {
  final String quizId;
  @Deprecated('fromJson is deprecated for Variable classes as they are no longer required for deserialization.')
  GetQuizQuestionPointsVariables.fromJson(Map<String, dynamic> json):
  
  quizId = nativeFromJson<String>(json['quizId']);
  @override
  bool operator ==(Object other) {
    if(identical(this, other)) {
      return true;
    }
    if(other.runtimeType != runtimeType) {
      return false;
    }

    final GetQuizQuestionPointsVariables otherTyped = other as GetQuizQuestionPointsVariables;
    return quizId == otherTyped.quizId;
    
  }
  @override
  int get hashCode => quizId.hashCode;
  

  Map<String, dynamic> toJson() {
    Map<String, dynamic> json = {};
    json['quizId'] = nativeToJson<String>(quizId);
    return json;
  }

  GetQuizQuestionPointsVariables({
    required this.quizId,
  });
}

