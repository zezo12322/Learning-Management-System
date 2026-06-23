part of 'generated.dart';

class AdminUpdateQuizOptionVariablesBuilder {
  String optionId;
  final Optional<String> _text = Optional.optional(nativeFromJson, nativeToJson);
  final Optional<bool> _isCorrect = Optional.optional(nativeFromJson, nativeToJson);

  final FirebaseDataConnect _dataConnect;  AdminUpdateQuizOptionVariablesBuilder text(String? t) {
   _text.value = t;
   return this;
  }
  AdminUpdateQuizOptionVariablesBuilder isCorrect(bool? t) {
   _isCorrect.value = t;
   return this;
  }

  AdminUpdateQuizOptionVariablesBuilder(this._dataConnect, {required  this.optionId,});
  Deserializer<AdminUpdateQuizOptionData> dataDeserializer = (dynamic json)  => AdminUpdateQuizOptionData.fromJson(jsonDecode(json));
  Serializer<AdminUpdateQuizOptionVariables> varsSerializer = (AdminUpdateQuizOptionVariables vars) => jsonEncode(vars.toJson());
  Future<OperationResult<AdminUpdateQuizOptionData, AdminUpdateQuizOptionVariables>> execute() {
    return ref().execute();
  }

  MutationRef<AdminUpdateQuizOptionData, AdminUpdateQuizOptionVariables> ref() {
    AdminUpdateQuizOptionVariables vars= AdminUpdateQuizOptionVariables(optionId: optionId,text: _text,isCorrect: _isCorrect,);
    return _dataConnect.mutation('AdminUpdateQuizOption', dataDeserializer, varsSerializer, vars);
  }
}

@immutable
class AdminUpdateQuizOptionQuizOptionUpdate {
  final String id;
  AdminUpdateQuizOptionQuizOptionUpdate.fromJson(dynamic json):
  
  id = nativeFromJson<String>(json['id']);
  @override
  bool operator ==(Object other) {
    if(identical(this, other)) {
      return true;
    }
    if(other.runtimeType != runtimeType) {
      return false;
    }

    final AdminUpdateQuizOptionQuizOptionUpdate otherTyped = other as AdminUpdateQuizOptionQuizOptionUpdate;
    return id == otherTyped.id;
    
  }
  @override
  int get hashCode => id.hashCode;
  

  Map<String, dynamic> toJson() {
    Map<String, dynamic> json = {};
    json['id'] = nativeToJson<String>(id);
    return json;
  }

  AdminUpdateQuizOptionQuizOptionUpdate({
    required this.id,
  });
}

@immutable
class AdminUpdateQuizOptionData {
  final AdminUpdateQuizOptionQuizOptionUpdate? quizOption_update;
  AdminUpdateQuizOptionData.fromJson(dynamic json):
  
  quizOption_update = json['quizOption_update'] == null ? null : AdminUpdateQuizOptionQuizOptionUpdate.fromJson(json['quizOption_update']);
  @override
  bool operator ==(Object other) {
    if(identical(this, other)) {
      return true;
    }
    if(other.runtimeType != runtimeType) {
      return false;
    }

    final AdminUpdateQuizOptionData otherTyped = other as AdminUpdateQuizOptionData;
    return quizOption_update == otherTyped.quizOption_update;
    
  }
  @override
  int get hashCode => quizOption_update.hashCode;
  

  Map<String, dynamic> toJson() {
    Map<String, dynamic> json = {};
    if (quizOption_update != null) {
      json['quizOption_update'] = quizOption_update!.toJson();
    }
    return json;
  }

  AdminUpdateQuizOptionData({
    this.quizOption_update,
  });
}

@immutable
class AdminUpdateQuizOptionVariables {
  final String optionId;
  late final Optional<String>text;
  late final Optional<bool>isCorrect;
  @Deprecated('fromJson is deprecated for Variable classes as they are no longer required for deserialization.')
  AdminUpdateQuizOptionVariables.fromJson(Map<String, dynamic> json):
  
  optionId = nativeFromJson<String>(json['optionId']) {
  
  
  
    text = Optional.optional(nativeFromJson, nativeToJson);
    text.value = json['text'] == null ? null : nativeFromJson<String>(json['text']);
  
  
    isCorrect = Optional.optional(nativeFromJson, nativeToJson);
    isCorrect.value = json['isCorrect'] == null ? null : nativeFromJson<bool>(json['isCorrect']);
  
  }
  @override
  bool operator ==(Object other) {
    if(identical(this, other)) {
      return true;
    }
    if(other.runtimeType != runtimeType) {
      return false;
    }

    final AdminUpdateQuizOptionVariables otherTyped = other as AdminUpdateQuizOptionVariables;
    return optionId == otherTyped.optionId && 
    text == otherTyped.text && 
    isCorrect == otherTyped.isCorrect;
    
  }
  @override
  int get hashCode => Object.hashAll([optionId.hashCode, text.hashCode, isCorrect.hashCode]);
  

  Map<String, dynamic> toJson() {
    Map<String, dynamic> json = {};
    json['optionId'] = nativeToJson<String>(optionId);
    if(text.state == OptionalState.set) {
      json['text'] = text.toJson();
    }
    if(isCorrect.state == OptionalState.set) {
      json['isCorrect'] = isCorrect.toJson();
    }
    return json;
  }

  AdminUpdateQuizOptionVariables({
    required this.optionId,
    required this.text,
    required this.isCorrect,
  });
}

