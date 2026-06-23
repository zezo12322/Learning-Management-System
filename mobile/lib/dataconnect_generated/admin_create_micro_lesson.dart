part of 'generated.dart';

class AdminCreateMicroLessonVariablesBuilder {
  String missionId;
  String title;
  LectureType type;
  final Optional<String> _assetUrl = Optional.optional(nativeFromJson, nativeToJson);
  final Optional<String> _content = Optional.optional(nativeFromJson, nativeToJson);
  final Optional<int> _durationSeconds = Optional.optional(nativeFromJson, nativeToJson);
  int order;

  final FirebaseDataConnect _dataConnect;  AdminCreateMicroLessonVariablesBuilder assetUrl(String? t) {
   _assetUrl.value = t;
   return this;
  }
  AdminCreateMicroLessonVariablesBuilder content(String? t) {
   _content.value = t;
   return this;
  }
  AdminCreateMicroLessonVariablesBuilder durationSeconds(int? t) {
   _durationSeconds.value = t;
   return this;
  }

  AdminCreateMicroLessonVariablesBuilder(this._dataConnect, {required  this.missionId,required  this.title,required  this.type,required  this.order,});
  Deserializer<AdminCreateMicroLessonData> dataDeserializer = (dynamic json)  => AdminCreateMicroLessonData.fromJson(jsonDecode(json));
  Serializer<AdminCreateMicroLessonVariables> varsSerializer = (AdminCreateMicroLessonVariables vars) => jsonEncode(vars.toJson());
  Future<OperationResult<AdminCreateMicroLessonData, AdminCreateMicroLessonVariables>> execute() {
    return ref().execute();
  }

  MutationRef<AdminCreateMicroLessonData, AdminCreateMicroLessonVariables> ref() {
    AdminCreateMicroLessonVariables vars= AdminCreateMicroLessonVariables(missionId: missionId,title: title,type: type,assetUrl: _assetUrl,content: _content,durationSeconds: _durationSeconds,order: order,);
    return _dataConnect.mutation('AdminCreateMicroLesson', dataDeserializer, varsSerializer, vars);
  }
}

@immutable
class AdminCreateMicroLessonMissionMicroLessonInsert {
  final String id;
  AdminCreateMicroLessonMissionMicroLessonInsert.fromJson(dynamic json):
  
  id = nativeFromJson<String>(json['id']);
  @override
  bool operator ==(Object other) {
    if(identical(this, other)) {
      return true;
    }
    if(other.runtimeType != runtimeType) {
      return false;
    }

    final AdminCreateMicroLessonMissionMicroLessonInsert otherTyped = other as AdminCreateMicroLessonMissionMicroLessonInsert;
    return id == otherTyped.id;
    
  }
  @override
  int get hashCode => id.hashCode;
  

  Map<String, dynamic> toJson() {
    Map<String, dynamic> json = {};
    json['id'] = nativeToJson<String>(id);
    return json;
  }

  AdminCreateMicroLessonMissionMicroLessonInsert({
    required this.id,
  });
}

@immutable
class AdminCreateMicroLessonData {
  final AdminCreateMicroLessonMissionMicroLessonInsert missionMicroLesson_insert;
  AdminCreateMicroLessonData.fromJson(dynamic json):
  
  missionMicroLesson_insert = AdminCreateMicroLessonMissionMicroLessonInsert.fromJson(json['missionMicroLesson_insert']);
  @override
  bool operator ==(Object other) {
    if(identical(this, other)) {
      return true;
    }
    if(other.runtimeType != runtimeType) {
      return false;
    }

    final AdminCreateMicroLessonData otherTyped = other as AdminCreateMicroLessonData;
    return missionMicroLesson_insert == otherTyped.missionMicroLesson_insert;
    
  }
  @override
  int get hashCode => missionMicroLesson_insert.hashCode;
  

  Map<String, dynamic> toJson() {
    Map<String, dynamic> json = {};
    json['missionMicroLesson_insert'] = missionMicroLesson_insert.toJson();
    return json;
  }

  AdminCreateMicroLessonData({
    required this.missionMicroLesson_insert,
  });
}

@immutable
class AdminCreateMicroLessonVariables {
  final String missionId;
  final String title;
  final LectureType type;
  late final Optional<String>assetUrl;
  late final Optional<String>content;
  late final Optional<int>durationSeconds;
  final int order;
  @Deprecated('fromJson is deprecated for Variable classes as they are no longer required for deserialization.')
  AdminCreateMicroLessonVariables.fromJson(Map<String, dynamic> json):
  
  missionId = nativeFromJson<String>(json['missionId']),
  title = nativeFromJson<String>(json['title']),
  type = LectureType.values.byName(json['type']),
  order = nativeFromJson<int>(json['order']) {
  
  
  
  
  
    assetUrl = Optional.optional(nativeFromJson, nativeToJson);
    assetUrl.value = json['assetUrl'] == null ? null : nativeFromJson<String>(json['assetUrl']);
  
  
    content = Optional.optional(nativeFromJson, nativeToJson);
    content.value = json['content'] == null ? null : nativeFromJson<String>(json['content']);
  
  
    durationSeconds = Optional.optional(nativeFromJson, nativeToJson);
    durationSeconds.value = json['durationSeconds'] == null ? null : nativeFromJson<int>(json['durationSeconds']);
  
  
  }
  @override
  bool operator ==(Object other) {
    if(identical(this, other)) {
      return true;
    }
    if(other.runtimeType != runtimeType) {
      return false;
    }

    final AdminCreateMicroLessonVariables otherTyped = other as AdminCreateMicroLessonVariables;
    return missionId == otherTyped.missionId && 
    title == otherTyped.title && 
    type == otherTyped.type && 
    assetUrl == otherTyped.assetUrl && 
    content == otherTyped.content && 
    durationSeconds == otherTyped.durationSeconds && 
    order == otherTyped.order;
    
  }
  @override
  int get hashCode => Object.hashAll([missionId.hashCode, title.hashCode, type.hashCode, assetUrl.hashCode, content.hashCode, durationSeconds.hashCode, order.hashCode]);
  

  Map<String, dynamic> toJson() {
    Map<String, dynamic> json = {};
    json['missionId'] = nativeToJson<String>(missionId);
    json['title'] = nativeToJson<String>(title);
    json['type'] = 
    type.name
    ;
    if(assetUrl.state == OptionalState.set) {
      json['assetUrl'] = assetUrl.toJson();
    }
    if(content.state == OptionalState.set) {
      json['content'] = content.toJson();
    }
    if(durationSeconds.state == OptionalState.set) {
      json['durationSeconds'] = durationSeconds.toJson();
    }
    json['order'] = nativeToJson<int>(order);
    return json;
  }

  AdminCreateMicroLessonVariables({
    required this.missionId,
    required this.title,
    required this.type,
    required this.assetUrl,
    required this.content,
    required this.durationSeconds,
    required this.order,
  });
}

