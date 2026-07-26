part of 'generated.dart';

class GetCourseVideosVariablesBuilder {
  String courseId;

  final FirebaseDataConnect _dataConnect;
  GetCourseVideosVariablesBuilder(this._dataConnect, {required  this.courseId,});
  Deserializer<GetCourseVideosData> dataDeserializer = (dynamic json)  => GetCourseVideosData.fromJson(jsonDecode(json));
  Serializer<GetCourseVideosVariables> varsSerializer = (GetCourseVideosVariables vars) => jsonEncode(vars.toJson());
  Future<QueryResult<GetCourseVideosData, GetCourseVideosVariables>> execute({QueryFetchPolicy fetchPolicy = QueryFetchPolicy.preferCache}) {
    return ref().execute(fetchPolicy: fetchPolicy);
  }

  QueryRef<GetCourseVideosData, GetCourseVideosVariables> ref() {
    GetCourseVideosVariables vars= GetCourseVideosVariables(courseId: courseId,);
    return _dataConnect.query("GetCourseVideos", dataDeserializer, varsSerializer, vars);
  }
}

@immutable
class GetCourseVideosCourse {
  final String id;
  final String title;
  final EnumValue<CourseStatus> status;
  final Timestamp? deletedAt;
  final GetCourseVideosCourseAuthor author;
  final GetCourseVideosCourseCreatedBy createdBy;
  final List<GetCourseVideosCourseVideoSections> videoSections;
  GetCourseVideosCourse.fromJson(dynamic json):
  
  id = nativeFromJson<String>(json['id']),
  title = nativeFromJson<String>(json['title']),
  status = courseStatusDeserializer(json['status']),
  deletedAt = json['deletedAt'] == null ? null : Timestamp.fromJson(json['deletedAt']),
  author = GetCourseVideosCourseAuthor.fromJson(json['author']),
  createdBy = GetCourseVideosCourseCreatedBy.fromJson(json['createdBy']),
  videoSections = (json['videoSections'] as List<dynamic>)
        .map((e) => GetCourseVideosCourseVideoSections.fromJson(e))
        .toList();
  @override
  bool operator ==(Object other) {
    if(identical(this, other)) {
      return true;
    }
    if(other.runtimeType != runtimeType) {
      return false;
    }

    final GetCourseVideosCourse otherTyped = other as GetCourseVideosCourse;
    return id == otherTyped.id && 
    title == otherTyped.title && 
    status == otherTyped.status && 
    deletedAt == otherTyped.deletedAt && 
    author == otherTyped.author && 
    createdBy == otherTyped.createdBy && 
    videoSections == otherTyped.videoSections;
    
  }
  @override
  int get hashCode => Object.hashAll([id.hashCode, title.hashCode, status.hashCode, deletedAt.hashCode, author.hashCode, createdBy.hashCode, videoSections.hashCode]);
  

  Map<String, dynamic> toJson() {
    Map<String, dynamic> json = {};
    json['id'] = nativeToJson<String>(id);
    json['title'] = nativeToJson<String>(title);
    json['status'] = 
    courseStatusSerializer(status)
    ;
    if (deletedAt != null) {
      json['deletedAt'] = deletedAt!.toJson();
    }
    json['author'] = author.toJson();
    json['createdBy'] = createdBy.toJson();
    json['videoSections'] = videoSections.map((e) => e.toJson()).toList();
    return json;
  }

  GetCourseVideosCourse({
    required this.id,
    required this.title,
    required this.status,
    this.deletedAt,
    required this.author,
    required this.createdBy,
    required this.videoSections,
  });
}

@immutable
class GetCourseVideosCourseAuthor {
  final String id;
  GetCourseVideosCourseAuthor.fromJson(dynamic json):
  
  id = nativeFromJson<String>(json['id']);
  @override
  bool operator ==(Object other) {
    if(identical(this, other)) {
      return true;
    }
    if(other.runtimeType != runtimeType) {
      return false;
    }

    final GetCourseVideosCourseAuthor otherTyped = other as GetCourseVideosCourseAuthor;
    return id == otherTyped.id;
    
  }
  @override
  int get hashCode => id.hashCode;
  

  Map<String, dynamic> toJson() {
    Map<String, dynamic> json = {};
    json['id'] = nativeToJson<String>(id);
    return json;
  }

  GetCourseVideosCourseAuthor({
    required this.id,
  });
}

@immutable
class GetCourseVideosCourseCreatedBy {
  final String id;
  GetCourseVideosCourseCreatedBy.fromJson(dynamic json):
  
  id = nativeFromJson<String>(json['id']);
  @override
  bool operator ==(Object other) {
    if(identical(this, other)) {
      return true;
    }
    if(other.runtimeType != runtimeType) {
      return false;
    }

    final GetCourseVideosCourseCreatedBy otherTyped = other as GetCourseVideosCourseCreatedBy;
    return id == otherTyped.id;
    
  }
  @override
  int get hashCode => id.hashCode;
  

  Map<String, dynamic> toJson() {
    Map<String, dynamic> json = {};
    json['id'] = nativeToJson<String>(id);
    return json;
  }

  GetCourseVideosCourseCreatedBy({
    required this.id,
  });
}

@immutable
class GetCourseVideosCourseVideoSections {
  final String id;
  final String title;
  final List<GetCourseVideosCourseVideoSectionsVideoLectures> videoLectures;
  GetCourseVideosCourseVideoSections.fromJson(dynamic json):
  
  id = nativeFromJson<String>(json['id']),
  title = nativeFromJson<String>(json['title']),
  videoLectures = (json['videoLectures'] as List<dynamic>)
        .map((e) => GetCourseVideosCourseVideoSectionsVideoLectures.fromJson(e))
        .toList();
  @override
  bool operator ==(Object other) {
    if(identical(this, other)) {
      return true;
    }
    if(other.runtimeType != runtimeType) {
      return false;
    }

    final GetCourseVideosCourseVideoSections otherTyped = other as GetCourseVideosCourseVideoSections;
    return id == otherTyped.id && 
    title == otherTyped.title && 
    videoLectures == otherTyped.videoLectures;
    
  }
  @override
  int get hashCode => Object.hashAll([id.hashCode, title.hashCode, videoLectures.hashCode]);
  

  Map<String, dynamic> toJson() {
    Map<String, dynamic> json = {};
    json['id'] = nativeToJson<String>(id);
    json['title'] = nativeToJson<String>(title);
    json['videoLectures'] = videoLectures.map((e) => e.toJson()).toList();
    return json;
  }

  GetCourseVideosCourseVideoSections({
    required this.id,
    required this.title,
    required this.videoLectures,
  });
}

@immutable
class GetCourseVideosCourseVideoSectionsVideoLectures {
  final String id;
  final String title;
  final String? content;
  final int? duration;
  final bool isFreePreview;
  final int order;
  GetCourseVideosCourseVideoSectionsVideoLectures.fromJson(dynamic json):
  
  id = nativeFromJson<String>(json['id']),
  title = nativeFromJson<String>(json['title']),
  content = json['content'] == null ? null : nativeFromJson<String>(json['content']),
  duration = json['duration'] == null ? null : nativeFromJson<int>(json['duration']),
  isFreePreview = nativeFromJson<bool>(json['isFreePreview']),
  order = nativeFromJson<int>(json['order']);
  @override
  bool operator ==(Object other) {
    if(identical(this, other)) {
      return true;
    }
    if(other.runtimeType != runtimeType) {
      return false;
    }

    final GetCourseVideosCourseVideoSectionsVideoLectures otherTyped = other as GetCourseVideosCourseVideoSectionsVideoLectures;
    return id == otherTyped.id && 
    title == otherTyped.title && 
    content == otherTyped.content && 
    duration == otherTyped.duration && 
    isFreePreview == otherTyped.isFreePreview && 
    order == otherTyped.order;
    
  }
  @override
  int get hashCode => Object.hashAll([id.hashCode, title.hashCode, content.hashCode, duration.hashCode, isFreePreview.hashCode, order.hashCode]);
  

  Map<String, dynamic> toJson() {
    Map<String, dynamic> json = {};
    json['id'] = nativeToJson<String>(id);
    json['title'] = nativeToJson<String>(title);
    if (content != null) {
      json['content'] = nativeToJson<String?>(content);
    }
    if (duration != null) {
      json['duration'] = nativeToJson<int?>(duration);
    }
    json['isFreePreview'] = nativeToJson<bool>(isFreePreview);
    json['order'] = nativeToJson<int>(order);
    return json;
  }

  GetCourseVideosCourseVideoSectionsVideoLectures({
    required this.id,
    required this.title,
    this.content,
    this.duration,
    required this.isFreePreview,
    required this.order,
  });
}

@immutable
class GetCourseVideosData {
  final GetCourseVideosCourse? course;
  GetCourseVideosData.fromJson(dynamic json):
  
  course = json['course'] == null ? null : GetCourseVideosCourse.fromJson(json['course']);
  @override
  bool operator ==(Object other) {
    if(identical(this, other)) {
      return true;
    }
    if(other.runtimeType != runtimeType) {
      return false;
    }

    final GetCourseVideosData otherTyped = other as GetCourseVideosData;
    return course == otherTyped.course;
    
  }
  @override
  int get hashCode => course.hashCode;
  

  Map<String, dynamic> toJson() {
    Map<String, dynamic> json = {};
    if (course != null) {
      json['course'] = course!.toJson();
    }
    return json;
  }

  GetCourseVideosData({
    this.course,
  });
}

@immutable
class GetCourseVideosVariables {
  final String courseId;
  @Deprecated('fromJson is deprecated for Variable classes as they are no longer required for deserialization.')
  GetCourseVideosVariables.fromJson(Map<String, dynamic> json):
  
  courseId = nativeFromJson<String>(json['courseId']);
  @override
  bool operator ==(Object other) {
    if(identical(this, other)) {
      return true;
    }
    if(other.runtimeType != runtimeType) {
      return false;
    }

    final GetCourseVideosVariables otherTyped = other as GetCourseVideosVariables;
    return courseId == otherTyped.courseId;
    
  }
  @override
  int get hashCode => courseId.hashCode;
  

  Map<String, dynamic> toJson() {
    Map<String, dynamic> json = {};
    json['courseId'] = nativeToJson<String>(courseId);
    return json;
  }

  GetCourseVideosVariables({
    required this.courseId,
  });
}

