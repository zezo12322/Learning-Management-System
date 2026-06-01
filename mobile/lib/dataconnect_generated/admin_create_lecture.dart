part of 'generated.dart';

class AdminCreateLectureVariablesBuilder {
  String sectionId;
  String title;
  LectureType type;
  Optional<String> _videoUrl = Optional.optional(nativeFromJson, nativeToJson);
  Optional<String> _content = Optional.optional(nativeFromJson, nativeToJson);
  int order;

  final FirebaseDataConnect _dataConnect;  AdminCreateLectureVariablesBuilder videoUrl(String? t) {
   _videoUrl.value = t;
   return this;
  }
  AdminCreateLectureVariablesBuilder content(String? t) {
   _content.value = t;
   return this;
  }

  AdminCreateLectureVariablesBuilder(this._dataConnect, {required  this.sectionId,required  this.title,required  this.type,required  this.order,});
  Deserializer<AdminCreateLectureData> dataDeserializer = (dynamic json)  => AdminCreateLectureData.fromJson(jsonDecode(json));
  Serializer<AdminCreateLectureVariables> varsSerializer = (AdminCreateLectureVariables vars) => jsonEncode(vars.toJson());
  Future<OperationResult<AdminCreateLectureData, AdminCreateLectureVariables>> execute() {
    return ref().execute();
  }

  MutationRef<AdminCreateLectureData, AdminCreateLectureVariables> ref() {
    AdminCreateLectureVariables vars= AdminCreateLectureVariables(sectionId: sectionId,title: title,type: type,videoUrl: _videoUrl,content: _content,order: order,);
    return _dataConnect.mutation("AdminCreateLecture", dataDeserializer, varsSerializer, vars);
  }
}

@immutable
class AdminCreateLectureCourseLectureInsert {
  final String id;
  AdminCreateLectureCourseLectureInsert.fromJson(dynamic json):
  
  id = nativeFromJson<String>(json['id']);
  @override
  bool operator ==(Object other) {
    if(identical(this, other)) {
      return true;
    }
    if(other.runtimeType != runtimeType) {
      return false;
    }

    final AdminCreateLectureCourseLectureInsert otherTyped = other as AdminCreateLectureCourseLectureInsert;
    return id == otherTyped.id;
    
  }
  @override
  int get hashCode => id.hashCode;
  

  Map<String, dynamic> toJson() {
    Map<String, dynamic> json = {};
    json['id'] = nativeToJson<String>(id);
    return json;
  }

  AdminCreateLectureCourseLectureInsert({
    required this.id,
  });
}

@immutable
class AdminCreateLectureData {
  final AdminCreateLectureCourseLectureInsert courseLecture_insert;
  AdminCreateLectureData.fromJson(dynamic json):
  
  courseLecture_insert = AdminCreateLectureCourseLectureInsert.fromJson(json['courseLecture_insert']);
  @override
  bool operator ==(Object other) {
    if(identical(this, other)) {
      return true;
    }
    if(other.runtimeType != runtimeType) {
      return false;
    }

    final AdminCreateLectureData otherTyped = other as AdminCreateLectureData;
    return courseLecture_insert == otherTyped.courseLecture_insert;
    
  }
  @override
  int get hashCode => courseLecture_insert.hashCode;
  

  Map<String, dynamic> toJson() {
    Map<String, dynamic> json = {};
    json['courseLecture_insert'] = courseLecture_insert.toJson();
    return json;
  }

  AdminCreateLectureData({
    required this.courseLecture_insert,
  });
}

@immutable
class AdminCreateLectureVariables {
  final String sectionId;
  final String title;
  final LectureType type;
  late final Optional<String>videoUrl;
  late final Optional<String>content;
  final int order;
  @Deprecated('fromJson is deprecated for Variable classes as they are no longer required for deserialization.')
  AdminCreateLectureVariables.fromJson(Map<String, dynamic> json):
  
  sectionId = nativeFromJson<String>(json['sectionId']),
  title = nativeFromJson<String>(json['title']),
  type = LectureType.values.byName(json['type']),
  order = nativeFromJson<int>(json['order']) {
  
  
  
  
  
    videoUrl = Optional.optional(nativeFromJson, nativeToJson);
    videoUrl.value = json['videoUrl'] == null ? null : nativeFromJson<String>(json['videoUrl']);
  
  
    content = Optional.optional(nativeFromJson, nativeToJson);
    content.value = json['content'] == null ? null : nativeFromJson<String>(json['content']);
  
  
  }
  @override
  bool operator ==(Object other) {
    if(identical(this, other)) {
      return true;
    }
    if(other.runtimeType != runtimeType) {
      return false;
    }

    final AdminCreateLectureVariables otherTyped = other as AdminCreateLectureVariables;
    return sectionId == otherTyped.sectionId && 
    title == otherTyped.title && 
    type == otherTyped.type && 
    videoUrl == otherTyped.videoUrl && 
    content == otherTyped.content && 
    order == otherTyped.order;
    
  }
  @override
  int get hashCode => Object.hashAll([sectionId.hashCode, title.hashCode, type.hashCode, videoUrl.hashCode, content.hashCode, order.hashCode]);
  

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
    json['order'] = nativeToJson<int>(order);
    return json;
  }

  AdminCreateLectureVariables({
    required this.sectionId,
    required this.title,
    required this.type,
    required this.videoUrl,
    required this.content,
    required this.order,
  });
}

