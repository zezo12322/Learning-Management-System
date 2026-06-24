part of 'generated.dart';

class GetLectureContentVariablesBuilder {
  String lectureId;

  final FirebaseDataConnect _dataConnect;
  GetLectureContentVariablesBuilder(this._dataConnect, {required  this.lectureId,});
  Deserializer<GetLectureContentData> dataDeserializer = (dynamic json)  => GetLectureContentData.fromJson(jsonDecode(json));
  Serializer<GetLectureContentVariables> varsSerializer = (GetLectureContentVariables vars) => jsonEncode(vars.toJson());
  Future<QueryResult<GetLectureContentData, GetLectureContentVariables>> execute({QueryFetchPolicy fetchPolicy = QueryFetchPolicy.preferCache}) {
    return ref().execute(fetchPolicy: fetchPolicy);
  }

  QueryRef<GetLectureContentData, GetLectureContentVariables> ref() {
    GetLectureContentVariables vars= GetLectureContentVariables(lectureId: lectureId,);
    return _dataConnect.query("GetLectureContent", dataDeserializer, varsSerializer, vars);
  }
}

@immutable
class GetLectureContentCourseLecture {
  final String id;
  final String title;
  final EnumValue<LectureType> type;
  final String? videoUrl;
  final String? content;
  final int? duration;
  final String? transcriptUrl;
  final bool isFreePreview;
  final GetLectureContentCourseLectureSection section;
  GetLectureContentCourseLecture.fromJson(dynamic json):
  
  id = nativeFromJson<String>(json['id']),
  title = nativeFromJson<String>(json['title']),
  type = lectureTypeDeserializer(json['type']),
  videoUrl = json['videoUrl'] == null ? null : nativeFromJson<String>(json['videoUrl']),
  content = json['content'] == null ? null : nativeFromJson<String>(json['content']),
  duration = json['duration'] == null ? null : nativeFromJson<int>(json['duration']),
  transcriptUrl = json['transcriptUrl'] == null ? null : nativeFromJson<String>(json['transcriptUrl']),
  isFreePreview = nativeFromJson<bool>(json['isFreePreview']),
  section = GetLectureContentCourseLectureSection.fromJson(json['section']);
  @override
  bool operator ==(Object other) {
    if(identical(this, other)) {
      return true;
    }
    if(other.runtimeType != runtimeType) {
      return false;
    }

    final GetLectureContentCourseLecture otherTyped = other as GetLectureContentCourseLecture;
    return id == otherTyped.id && 
    title == otherTyped.title && 
    type == otherTyped.type && 
    videoUrl == otherTyped.videoUrl && 
    content == otherTyped.content && 
    duration == otherTyped.duration && 
    transcriptUrl == otherTyped.transcriptUrl && 
    isFreePreview == otherTyped.isFreePreview && 
    section == otherTyped.section;
    
  }
  @override
  int get hashCode => Object.hashAll([id.hashCode, title.hashCode, type.hashCode, videoUrl.hashCode, content.hashCode, duration.hashCode, transcriptUrl.hashCode, isFreePreview.hashCode, section.hashCode]);
  

  Map<String, dynamic> toJson() {
    Map<String, dynamic> json = {};
    json['id'] = nativeToJson<String>(id);
    json['title'] = nativeToJson<String>(title);
    json['type'] = 
    lectureTypeSerializer(type)
    ;
    if (videoUrl != null) {
      json['videoUrl'] = nativeToJson<String?>(videoUrl);
    }
    if (content != null) {
      json['content'] = nativeToJson<String?>(content);
    }
    if (duration != null) {
      json['duration'] = nativeToJson<int?>(duration);
    }
    if (transcriptUrl != null) {
      json['transcriptUrl'] = nativeToJson<String?>(transcriptUrl);
    }
    json['isFreePreview'] = nativeToJson<bool>(isFreePreview);
    json['section'] = section.toJson();
    return json;
  }

  GetLectureContentCourseLecture({
    required this.id,
    required this.title,
    required this.type,
    this.videoUrl,
    this.content,
    this.duration,
    this.transcriptUrl,
    required this.isFreePreview,
    required this.section,
  });
}

@immutable
class GetLectureContentCourseLectureSection {
  final GetLectureContentCourseLectureSectionCourse course;
  GetLectureContentCourseLectureSection.fromJson(dynamic json):
  
  course = GetLectureContentCourseLectureSectionCourse.fromJson(json['course']);
  @override
  bool operator ==(Object other) {
    if(identical(this, other)) {
      return true;
    }
    if(other.runtimeType != runtimeType) {
      return false;
    }

    final GetLectureContentCourseLectureSection otherTyped = other as GetLectureContentCourseLectureSection;
    return course == otherTyped.course;
    
  }
  @override
  int get hashCode => course.hashCode;
  

  Map<String, dynamic> toJson() {
    Map<String, dynamic> json = {};
    json['course'] = course.toJson();
    return json;
  }

  GetLectureContentCourseLectureSection({
    required this.course,
  });
}

@immutable
class GetLectureContentCourseLectureSectionCourse {
  final String id;
  GetLectureContentCourseLectureSectionCourse.fromJson(dynamic json):
  
  id = nativeFromJson<String>(json['id']);
  @override
  bool operator ==(Object other) {
    if(identical(this, other)) {
      return true;
    }
    if(other.runtimeType != runtimeType) {
      return false;
    }

    final GetLectureContentCourseLectureSectionCourse otherTyped = other as GetLectureContentCourseLectureSectionCourse;
    return id == otherTyped.id;
    
  }
  @override
  int get hashCode => id.hashCode;
  

  Map<String, dynamic> toJson() {
    Map<String, dynamic> json = {};
    json['id'] = nativeToJson<String>(id);
    return json;
  }

  GetLectureContentCourseLectureSectionCourse({
    required this.id,
  });
}

@immutable
class GetLectureContentData {
  final GetLectureContentCourseLecture? courseLecture;
  GetLectureContentData.fromJson(dynamic json):
  
  courseLecture = json['courseLecture'] == null ? null : GetLectureContentCourseLecture.fromJson(json['courseLecture']);
  @override
  bool operator ==(Object other) {
    if(identical(this, other)) {
      return true;
    }
    if(other.runtimeType != runtimeType) {
      return false;
    }

    final GetLectureContentData otherTyped = other as GetLectureContentData;
    return courseLecture == otherTyped.courseLecture;
    
  }
  @override
  int get hashCode => courseLecture.hashCode;
  

  Map<String, dynamic> toJson() {
    Map<String, dynamic> json = {};
    if (courseLecture != null) {
      json['courseLecture'] = courseLecture!.toJson();
    }
    return json;
  }

  GetLectureContentData({
    this.courseLecture,
  });
}

@immutable
class GetLectureContentVariables {
  final String lectureId;
  @Deprecated('fromJson is deprecated for Variable classes as they are no longer required for deserialization.')
  GetLectureContentVariables.fromJson(Map<String, dynamic> json):
  
  lectureId = nativeFromJson<String>(json['lectureId']);
  @override
  bool operator ==(Object other) {
    if(identical(this, other)) {
      return true;
    }
    if(other.runtimeType != runtimeType) {
      return false;
    }

    final GetLectureContentVariables otherTyped = other as GetLectureContentVariables;
    return lectureId == otherTyped.lectureId;
    
  }
  @override
  int get hashCode => lectureId.hashCode;
  

  Map<String, dynamic> toJson() {
    Map<String, dynamic> json = {};
    json['lectureId'] = nativeToJson<String>(lectureId);
    return json;
  }

  GetLectureContentVariables({
    required this.lectureId,
  });
}

