part of 'generated.dart';

class AdminUpdateLectureVariablesBuilder {
  String lectureId;
  Optional<String> _title = Optional.optional(nativeFromJson, nativeToJson);
  Optional<LectureType> _type = Optional.optional((data) => LectureType.values.byName(data), enumSerializer);
  Optional<String> _videoUrl = Optional.optional(nativeFromJson, nativeToJson);
  Optional<String> _content = Optional.optional(nativeFromJson, nativeToJson);
  Optional<int> _duration = Optional.optional(nativeFromJson, nativeToJson);
  Optional<String> _transcriptUrl = Optional.optional(nativeFromJson, nativeToJson);
  Optional<bool> _isFreePreview = Optional.optional(nativeFromJson, nativeToJson);

  final FirebaseDataConnect _dataConnect;  AdminUpdateLectureVariablesBuilder title(String? t) {
   _title.value = t;
   return this;
  }
  AdminUpdateLectureVariablesBuilder type(LectureType? t) {
   _type.value = t;
   return this;
  }
  AdminUpdateLectureVariablesBuilder videoUrl(String? t) {
   _videoUrl.value = t;
   return this;
  }
  AdminUpdateLectureVariablesBuilder content(String? t) {
   _content.value = t;
   return this;
  }
  AdminUpdateLectureVariablesBuilder duration(int? t) {
   _duration.value = t;
   return this;
  }
  AdminUpdateLectureVariablesBuilder transcriptUrl(String? t) {
   _transcriptUrl.value = t;
   return this;
  }
  AdminUpdateLectureVariablesBuilder isFreePreview(bool? t) {
   _isFreePreview.value = t;
   return this;
  }

  AdminUpdateLectureVariablesBuilder(this._dataConnect, {required  this.lectureId,});
  Deserializer<AdminUpdateLectureData> dataDeserializer = (dynamic json)  => AdminUpdateLectureData.fromJson(jsonDecode(json));
  Serializer<AdminUpdateLectureVariables> varsSerializer = (AdminUpdateLectureVariables vars) => jsonEncode(vars.toJson());
  Future<OperationResult<AdminUpdateLectureData, AdminUpdateLectureVariables>> execute() {
    return ref().execute();
  }

  MutationRef<AdminUpdateLectureData, AdminUpdateLectureVariables> ref() {
    AdminUpdateLectureVariables vars= AdminUpdateLectureVariables(lectureId: lectureId,title: _title,type: _type,videoUrl: _videoUrl,content: _content,duration: _duration,transcriptUrl: _transcriptUrl,isFreePreview: _isFreePreview,);
    return _dataConnect.mutation("AdminUpdateLecture", dataDeserializer, varsSerializer, vars);
  }
}

@immutable
class AdminUpdateLectureCourseLectureUpdate {
  final String id;
  AdminUpdateLectureCourseLectureUpdate.fromJson(dynamic json):
  
  id = nativeFromJson<String>(json['id']);
  @override
  bool operator ==(Object other) {
    if(identical(this, other)) {
      return true;
    }
    if(other.runtimeType != runtimeType) {
      return false;
    }

    final AdminUpdateLectureCourseLectureUpdate otherTyped = other as AdminUpdateLectureCourseLectureUpdate;
    return id == otherTyped.id;
    
  }
  @override
  int get hashCode => id.hashCode;
  

  Map<String, dynamic> toJson() {
    Map<String, dynamic> json = {};
    json['id'] = nativeToJson<String>(id);
    return json;
  }

  AdminUpdateLectureCourseLectureUpdate({
    required this.id,
  });
}

@immutable
class AdminUpdateLectureData {
  final AdminUpdateLectureCourseLectureUpdate? courseLecture_update;
  AdminUpdateLectureData.fromJson(dynamic json):
  
  courseLecture_update = json['courseLecture_update'] == null ? null : AdminUpdateLectureCourseLectureUpdate.fromJson(json['courseLecture_update']);
  @override
  bool operator ==(Object other) {
    if(identical(this, other)) {
      return true;
    }
    if(other.runtimeType != runtimeType) {
      return false;
    }

    final AdminUpdateLectureData otherTyped = other as AdminUpdateLectureData;
    return courseLecture_update == otherTyped.courseLecture_update;
    
  }
  @override
  int get hashCode => courseLecture_update.hashCode;
  

  Map<String, dynamic> toJson() {
    Map<String, dynamic> json = {};
    if (courseLecture_update != null) {
      json['courseLecture_update'] = courseLecture_update!.toJson();
    }
    return json;
  }

  AdminUpdateLectureData({
    this.courseLecture_update,
  });
}

@immutable
class AdminUpdateLectureVariables {
  final String lectureId;
  late final Optional<String>title;
  late final Optional<LectureType>type;
  late final Optional<String>videoUrl;
  late final Optional<String>content;
  late final Optional<int>duration;
  late final Optional<String>transcriptUrl;
  late final Optional<bool>isFreePreview;
  @Deprecated('fromJson is deprecated for Variable classes as they are no longer required for deserialization.')
  AdminUpdateLectureVariables.fromJson(Map<String, dynamic> json):
  
  lectureId = nativeFromJson<String>(json['lectureId']) {
  
  
  
    title = Optional.optional(nativeFromJson, nativeToJson);
    title.value = json['title'] == null ? null : nativeFromJson<String>(json['title']);
  
  
    type = Optional.optional((data) => LectureType.values.byName(data), enumSerializer);
    type.value = json['type'] == null ? null : LectureType.values.byName(json['type']);
  
  
    videoUrl = Optional.optional(nativeFromJson, nativeToJson);
    videoUrl.value = json['videoUrl'] == null ? null : nativeFromJson<String>(json['videoUrl']);
  
  
    content = Optional.optional(nativeFromJson, nativeToJson);
    content.value = json['content'] == null ? null : nativeFromJson<String>(json['content']);
  
  
    duration = Optional.optional(nativeFromJson, nativeToJson);
    duration.value = json['duration'] == null ? null : nativeFromJson<int>(json['duration']);
  
  
    transcriptUrl = Optional.optional(nativeFromJson, nativeToJson);
    transcriptUrl.value = json['transcriptUrl'] == null ? null : nativeFromJson<String>(json['transcriptUrl']);
  
  
    isFreePreview = Optional.optional(nativeFromJson, nativeToJson);
    isFreePreview.value = json['isFreePreview'] == null ? null : nativeFromJson<bool>(json['isFreePreview']);
  
  }
  @override
  bool operator ==(Object other) {
    if(identical(this, other)) {
      return true;
    }
    if(other.runtimeType != runtimeType) {
      return false;
    }

    final AdminUpdateLectureVariables otherTyped = other as AdminUpdateLectureVariables;
    return lectureId == otherTyped.lectureId && 
    title == otherTyped.title && 
    type == otherTyped.type && 
    videoUrl == otherTyped.videoUrl && 
    content == otherTyped.content && 
    duration == otherTyped.duration && 
    transcriptUrl == otherTyped.transcriptUrl && 
    isFreePreview == otherTyped.isFreePreview;
    
  }
  @override
  int get hashCode => Object.hashAll([lectureId.hashCode, title.hashCode, type.hashCode, videoUrl.hashCode, content.hashCode, duration.hashCode, transcriptUrl.hashCode, isFreePreview.hashCode]);
  

  Map<String, dynamic> toJson() {
    Map<String, dynamic> json = {};
    json['lectureId'] = nativeToJson<String>(lectureId);
    if(title.state == OptionalState.set) {
      json['title'] = title.toJson();
    }
    if(type.state == OptionalState.set) {
      json['type'] = type.toJson();
    }
    if(videoUrl.state == OptionalState.set) {
      json['videoUrl'] = videoUrl.toJson();
    }
    if(content.state == OptionalState.set) {
      json['content'] = content.toJson();
    }
    if(duration.state == OptionalState.set) {
      json['duration'] = duration.toJson();
    }
    if(transcriptUrl.state == OptionalState.set) {
      json['transcriptUrl'] = transcriptUrl.toJson();
    }
    if(isFreePreview.state == OptionalState.set) {
      json['isFreePreview'] = isFreePreview.toJson();
    }
    return json;
  }

  AdminUpdateLectureVariables({
    required this.lectureId,
    required this.title,
    required this.type,
    required this.videoUrl,
    required this.content,
    required this.duration,
    required this.transcriptUrl,
    required this.isFreePreview,
  });
}

