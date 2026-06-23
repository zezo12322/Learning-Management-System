part of 'generated.dart';

class AdminCreateLectureFullVariablesBuilder {
  String sectionId;
  String title;
  LectureType type;
  final Optional<String> _videoUrl = Optional.optional(nativeFromJson, nativeToJson);
  final Optional<String> _content = Optional.optional(nativeFromJson, nativeToJson);
  final Optional<int> _duration = Optional.optional(nativeFromJson, nativeToJson);
  final Optional<String> _transcriptUrl = Optional.optional(nativeFromJson, nativeToJson);
  bool isFreePreview;
  int order;

  final FirebaseDataConnect _dataConnect;  AdminCreateLectureFullVariablesBuilder videoUrl(String? t) {
   _videoUrl.value = t;
   return this;
  }
  AdminCreateLectureFullVariablesBuilder content(String? t) {
   _content.value = t;
   return this;
  }
  AdminCreateLectureFullVariablesBuilder duration(int? t) {
   _duration.value = t;
   return this;
  }
  AdminCreateLectureFullVariablesBuilder transcriptUrl(String? t) {
   _transcriptUrl.value = t;
   return this;
  }

  AdminCreateLectureFullVariablesBuilder(this._dataConnect, {required  this.sectionId,required  this.title,required  this.type,required  this.isFreePreview,required  this.order,});
  Deserializer<AdminCreateLectureFullData> dataDeserializer = (dynamic json)  => AdminCreateLectureFullData.fromJson(jsonDecode(json));
  Serializer<AdminCreateLectureFullVariables> varsSerializer = (AdminCreateLectureFullVariables vars) => jsonEncode(vars.toJson());
  Future<OperationResult<AdminCreateLectureFullData, AdminCreateLectureFullVariables>> execute() {
    return ref().execute();
  }

  MutationRef<AdminCreateLectureFullData, AdminCreateLectureFullVariables> ref() {
    AdminCreateLectureFullVariables vars= AdminCreateLectureFullVariables(sectionId: sectionId,title: title,type: type,videoUrl: _videoUrl,content: _content,duration: _duration,transcriptUrl: _transcriptUrl,isFreePreview: isFreePreview,order: order,);
    return _dataConnect.mutation('AdminCreateLectureFull', dataDeserializer, varsSerializer, vars);
  }
}

@immutable
class AdminCreateLectureFullCourseLectureInsert {
  final String id;
  AdminCreateLectureFullCourseLectureInsert.fromJson(dynamic json):
  
  id = nativeFromJson<String>(json['id']);
  @override
  bool operator ==(Object other) {
    if(identical(this, other)) {
      return true;
    }
    if(other.runtimeType != runtimeType) {
      return false;
    }

    final AdminCreateLectureFullCourseLectureInsert otherTyped = other as AdminCreateLectureFullCourseLectureInsert;
    return id == otherTyped.id;
    
  }
  @override
  int get hashCode => id.hashCode;
  

  Map<String, dynamic> toJson() {
    Map<String, dynamic> json = {};
    json['id'] = nativeToJson<String>(id);
    return json;
  }

  AdminCreateLectureFullCourseLectureInsert({
    required this.id,
  });
}

@immutable
class AdminCreateLectureFullData {
  final AdminCreateLectureFullCourseLectureInsert courseLecture_insert;
  AdminCreateLectureFullData.fromJson(dynamic json):
  
  courseLecture_insert = AdminCreateLectureFullCourseLectureInsert.fromJson(json['courseLecture_insert']);
  @override
  bool operator ==(Object other) {
    if(identical(this, other)) {
      return true;
    }
    if(other.runtimeType != runtimeType) {
      return false;
    }

    final AdminCreateLectureFullData otherTyped = other as AdminCreateLectureFullData;
    return courseLecture_insert == otherTyped.courseLecture_insert;
    
  }
  @override
  int get hashCode => courseLecture_insert.hashCode;
  

  Map<String, dynamic> toJson() {
    Map<String, dynamic> json = {};
    json['courseLecture_insert'] = courseLecture_insert.toJson();
    return json;
  }

  AdminCreateLectureFullData({
    required this.courseLecture_insert,
  });
}

@immutable
class AdminCreateLectureFullVariables {
  final String sectionId;
  final String title;
  final LectureType type;
  late final Optional<String>videoUrl;
  late final Optional<String>content;
  late final Optional<int>duration;
  late final Optional<String>transcriptUrl;
  final bool isFreePreview;
  final int order;
  @Deprecated('fromJson is deprecated for Variable classes as they are no longer required for deserialization.')
  AdminCreateLectureFullVariables.fromJson(Map<String, dynamic> json):
  
  sectionId = nativeFromJson<String>(json['sectionId']),
  title = nativeFromJson<String>(json['title']),
  type = LectureType.values.byName(json['type']),
  isFreePreview = nativeFromJson<bool>(json['isFreePreview']),
  order = nativeFromJson<int>(json['order']) {
  
  
  
  
  
    videoUrl = Optional.optional(nativeFromJson, nativeToJson);
    videoUrl.value = json['videoUrl'] == null ? null : nativeFromJson<String>(json['videoUrl']);
  
  
    content = Optional.optional(nativeFromJson, nativeToJson);
    content.value = json['content'] == null ? null : nativeFromJson<String>(json['content']);
  
  
    duration = Optional.optional(nativeFromJson, nativeToJson);
    duration.value = json['duration'] == null ? null : nativeFromJson<int>(json['duration']);
  
  
    transcriptUrl = Optional.optional(nativeFromJson, nativeToJson);
    transcriptUrl.value = json['transcriptUrl'] == null ? null : nativeFromJson<String>(json['transcriptUrl']);
  
  
  
  }
  @override
  bool operator ==(Object other) {
    if(identical(this, other)) {
      return true;
    }
    if(other.runtimeType != runtimeType) {
      return false;
    }

    final AdminCreateLectureFullVariables otherTyped = other as AdminCreateLectureFullVariables;
    return sectionId == otherTyped.sectionId && 
    title == otherTyped.title && 
    type == otherTyped.type && 
    videoUrl == otherTyped.videoUrl && 
    content == otherTyped.content && 
    duration == otherTyped.duration && 
    transcriptUrl == otherTyped.transcriptUrl && 
    isFreePreview == otherTyped.isFreePreview && 
    order == otherTyped.order;
    
  }
  @override
  int get hashCode => Object.hashAll([sectionId.hashCode, title.hashCode, type.hashCode, videoUrl.hashCode, content.hashCode, duration.hashCode, transcriptUrl.hashCode, isFreePreview.hashCode, order.hashCode]);
  

  Map<String, dynamic> toJson() {
    Map<String, dynamic> json = {};
    json['sectionId'] = nativeToJson<String>(sectionId);
    json['title'] = nativeToJson<String>(title);
    json['type'] = 
    type.name
    ;
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
    json['isFreePreview'] = nativeToJson<bool>(isFreePreview);
    json['order'] = nativeToJson<int>(order);
    return json;
  }

  AdminCreateLectureFullVariables({
    required this.sectionId,
    required this.title,
    required this.type,
    required this.videoUrl,
    required this.content,
    required this.duration,
    required this.transcriptUrl,
    required this.isFreePreview,
    required this.order,
  });
}

