part of 'generated.dart';

class AdminUpdateMicroLessonVariablesBuilder {
  String microLessonId;
  Optional<String> _title = Optional.optional(nativeFromJson, nativeToJson);
  Optional<LectureType> _type = Optional.optional((data) => LectureType.values.byName(data), enumSerializer);
  Optional<String> _assetUrl = Optional.optional(nativeFromJson, nativeToJson);
  Optional<String> _content = Optional.optional(nativeFromJson, nativeToJson);
  Optional<int> _durationSeconds = Optional.optional(nativeFromJson, nativeToJson);

  final FirebaseDataConnect _dataConnect;  AdminUpdateMicroLessonVariablesBuilder title(String? t) {
   _title.value = t;
   return this;
  }
  AdminUpdateMicroLessonVariablesBuilder type(LectureType? t) {
   _type.value = t;
   return this;
  }
  AdminUpdateMicroLessonVariablesBuilder assetUrl(String? t) {
   _assetUrl.value = t;
   return this;
  }
  AdminUpdateMicroLessonVariablesBuilder content(String? t) {
   _content.value = t;
   return this;
  }
  AdminUpdateMicroLessonVariablesBuilder durationSeconds(int? t) {
   _durationSeconds.value = t;
   return this;
  }

  AdminUpdateMicroLessonVariablesBuilder(this._dataConnect, {required  this.microLessonId,});
  Deserializer<AdminUpdateMicroLessonData> dataDeserializer = (dynamic json)  => AdminUpdateMicroLessonData.fromJson(jsonDecode(json));
  Serializer<AdminUpdateMicroLessonVariables> varsSerializer = (AdminUpdateMicroLessonVariables vars) => jsonEncode(vars.toJson());
  Future<OperationResult<AdminUpdateMicroLessonData, AdminUpdateMicroLessonVariables>> execute() {
    return ref().execute();
  }

  MutationRef<AdminUpdateMicroLessonData, AdminUpdateMicroLessonVariables> ref() {
    AdminUpdateMicroLessonVariables vars= AdminUpdateMicroLessonVariables(microLessonId: microLessonId,title: _title,type: _type,assetUrl: _assetUrl,content: _content,durationSeconds: _durationSeconds,);
    return _dataConnect.mutation("AdminUpdateMicroLesson", dataDeserializer, varsSerializer, vars);
  }
}

@immutable
class AdminUpdateMicroLessonMissionMicroLessonUpdate {
  final String id;
  AdminUpdateMicroLessonMissionMicroLessonUpdate.fromJson(dynamic json):
  
  id = nativeFromJson<String>(json['id']);
  @override
  bool operator ==(Object other) {
    if(identical(this, other)) {
      return true;
    }
    if(other.runtimeType != runtimeType) {
      return false;
    }

    final AdminUpdateMicroLessonMissionMicroLessonUpdate otherTyped = other as AdminUpdateMicroLessonMissionMicroLessonUpdate;
    return id == otherTyped.id;
    
  }
  @override
  int get hashCode => id.hashCode;
  

  Map<String, dynamic> toJson() {
    Map<String, dynamic> json = {};
    json['id'] = nativeToJson<String>(id);
    return json;
  }

  AdminUpdateMicroLessonMissionMicroLessonUpdate({
    required this.id,
  });
}

@immutable
class AdminUpdateMicroLessonData {
  final AdminUpdateMicroLessonMissionMicroLessonUpdate? missionMicroLesson_update;
  AdminUpdateMicroLessonData.fromJson(dynamic json):
  
  missionMicroLesson_update = json['missionMicroLesson_update'] == null ? null : AdminUpdateMicroLessonMissionMicroLessonUpdate.fromJson(json['missionMicroLesson_update']);
  @override
  bool operator ==(Object other) {
    if(identical(this, other)) {
      return true;
    }
    if(other.runtimeType != runtimeType) {
      return false;
    }

    final AdminUpdateMicroLessonData otherTyped = other as AdminUpdateMicroLessonData;
    return missionMicroLesson_update == otherTyped.missionMicroLesson_update;
    
  }
  @override
  int get hashCode => missionMicroLesson_update.hashCode;
  

  Map<String, dynamic> toJson() {
    Map<String, dynamic> json = {};
    if (missionMicroLesson_update != null) {
      json['missionMicroLesson_update'] = missionMicroLesson_update!.toJson();
    }
    return json;
  }

  AdminUpdateMicroLessonData({
    this.missionMicroLesson_update,
  });
}

@immutable
class AdminUpdateMicroLessonVariables {
  final String microLessonId;
  late final Optional<String>title;
  late final Optional<LectureType>type;
  late final Optional<String>assetUrl;
  late final Optional<String>content;
  late final Optional<int>durationSeconds;
  @Deprecated('fromJson is deprecated for Variable classes as they are no longer required for deserialization.')
  AdminUpdateMicroLessonVariables.fromJson(Map<String, dynamic> json):
  
  microLessonId = nativeFromJson<String>(json['microLessonId']) {
  
  
  
    title = Optional.optional(nativeFromJson, nativeToJson);
    title.value = json['title'] == null ? null : nativeFromJson<String>(json['title']);
  
  
    type = Optional.optional((data) => LectureType.values.byName(data), enumSerializer);
    type.value = json['type'] == null ? null : LectureType.values.byName(json['type']);
  
  
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

    final AdminUpdateMicroLessonVariables otherTyped = other as AdminUpdateMicroLessonVariables;
    return microLessonId == otherTyped.microLessonId && 
    title == otherTyped.title && 
    type == otherTyped.type && 
    assetUrl == otherTyped.assetUrl && 
    content == otherTyped.content && 
    durationSeconds == otherTyped.durationSeconds;
    
  }
  @override
  int get hashCode => Object.hashAll([microLessonId.hashCode, title.hashCode, type.hashCode, assetUrl.hashCode, content.hashCode, durationSeconds.hashCode]);
  

  Map<String, dynamic> toJson() {
    Map<String, dynamic> json = {};
    json['microLessonId'] = nativeToJson<String>(microLessonId);
    if(title.state == OptionalState.set) {
      json['title'] = title.toJson();
    }
    if(type.state == OptionalState.set) {
      json['type'] = type.toJson();
    }
    if(assetUrl.state == OptionalState.set) {
      json['assetUrl'] = assetUrl.toJson();
    }
    if(content.state == OptionalState.set) {
      json['content'] = content.toJson();
    }
    if(durationSeconds.state == OptionalState.set) {
      json['durationSeconds'] = durationSeconds.toJson();
    }
    return json;
  }

  AdminUpdateMicroLessonVariables({
    required this.microLessonId,
    required this.title,
    required this.type,
    required this.assetUrl,
    required this.content,
    required this.durationSeconds,
  });
}

