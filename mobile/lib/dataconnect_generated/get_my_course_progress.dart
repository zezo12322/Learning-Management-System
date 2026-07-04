part of 'generated.dart';

class GetMyCourseProgressVariablesBuilder {
  String courseId;

  final FirebaseDataConnect _dataConnect;
  GetMyCourseProgressVariablesBuilder(this._dataConnect, {required  this.courseId,});
  Deserializer<GetMyCourseProgressData> dataDeserializer = (dynamic json)  => GetMyCourseProgressData.fromJson(jsonDecode(json));
  Serializer<GetMyCourseProgressVariables> varsSerializer = (GetMyCourseProgressVariables vars) => jsonEncode(vars.toJson());
  Future<QueryResult<GetMyCourseProgressData, GetMyCourseProgressVariables>> execute({QueryFetchPolicy fetchPolicy = QueryFetchPolicy.preferCache}) {
    return ref().execute(fetchPolicy: fetchPolicy);
  }

  QueryRef<GetMyCourseProgressData, GetMyCourseProgressVariables> ref() {
    GetMyCourseProgressVariables vars= GetMyCourseProgressVariables(courseId: courseId,);
    return _dataConnect.query("GetMyCourseProgress", dataDeserializer, varsSerializer, vars);
  }
}

@immutable
class GetMyCourseProgressSections {
  final String id;
  final String title;
  final List<GetMyCourseProgressSectionsProgressLectures> progressLectures;
  GetMyCourseProgressSections.fromJson(dynamic json):
  
  id = nativeFromJson<String>(json['id']),
  title = nativeFromJson<String>(json['title']),
  progressLectures = (json['progressLectures'] as List<dynamic>)
        .map((e) => GetMyCourseProgressSectionsProgressLectures.fromJson(e))
        .toList();
  @override
  bool operator ==(Object other) {
    if(identical(this, other)) {
      return true;
    }
    if(other.runtimeType != runtimeType) {
      return false;
    }

    final GetMyCourseProgressSections otherTyped = other as GetMyCourseProgressSections;
    return id == otherTyped.id && 
    title == otherTyped.title && 
    progressLectures == otherTyped.progressLectures;
    
  }
  @override
  int get hashCode => Object.hashAll([id.hashCode, title.hashCode, progressLectures.hashCode]);
  

  Map<String, dynamic> toJson() {
    Map<String, dynamic> json = {};
    json['id'] = nativeToJson<String>(id);
    json['title'] = nativeToJson<String>(title);
    json['progressLectures'] = progressLectures.map((e) => e.toJson()).toList();
    return json;
  }

  GetMyCourseProgressSections({
    required this.id,
    required this.title,
    required this.progressLectures,
  });
}

@immutable
class GetMyCourseProgressSectionsProgressLectures {
  final String id;
  final String title;
  final List<GetMyCourseProgressSectionsProgressLecturesUserProgress> userProgress;
  GetMyCourseProgressSectionsProgressLectures.fromJson(dynamic json):
  
  id = nativeFromJson<String>(json['id']),
  title = nativeFromJson<String>(json['title']),
  userProgress = (json['userProgress'] as List<dynamic>)
        .map((e) => GetMyCourseProgressSectionsProgressLecturesUserProgress.fromJson(e))
        .toList();
  @override
  bool operator ==(Object other) {
    if(identical(this, other)) {
      return true;
    }
    if(other.runtimeType != runtimeType) {
      return false;
    }

    final GetMyCourseProgressSectionsProgressLectures otherTyped = other as GetMyCourseProgressSectionsProgressLectures;
    return id == otherTyped.id && 
    title == otherTyped.title && 
    userProgress == otherTyped.userProgress;
    
  }
  @override
  int get hashCode => Object.hashAll([id.hashCode, title.hashCode, userProgress.hashCode]);
  

  Map<String, dynamic> toJson() {
    Map<String, dynamic> json = {};
    json['id'] = nativeToJson<String>(id);
    json['title'] = nativeToJson<String>(title);
    json['userProgress'] = userProgress.map((e) => e.toJson()).toList();
    return json;
  }

  GetMyCourseProgressSectionsProgressLectures({
    required this.id,
    required this.title,
    required this.userProgress,
  });
}

@immutable
class GetMyCourseProgressSectionsProgressLecturesUserProgress {
  final Timestamp? completedAt;
  GetMyCourseProgressSectionsProgressLecturesUserProgress.fromJson(dynamic json):
  
  completedAt = json['completedAt'] == null ? null : Timestamp.fromJson(json['completedAt']);
  @override
  bool operator ==(Object other) {
    if(identical(this, other)) {
      return true;
    }
    if(other.runtimeType != runtimeType) {
      return false;
    }

    final GetMyCourseProgressSectionsProgressLecturesUserProgress otherTyped = other as GetMyCourseProgressSectionsProgressLecturesUserProgress;
    return completedAt == otherTyped.completedAt;
    
  }
  @override
  int get hashCode => completedAt.hashCode;
  

  Map<String, dynamic> toJson() {
    Map<String, dynamic> json = {};
    if (completedAt != null) {
      json['completedAt'] = completedAt!.toJson();
    }
    return json;
  }

  GetMyCourseProgressSectionsProgressLecturesUserProgress({
    this.completedAt,
  });
}

@immutable
class GetMyCourseProgressData {
  final List<GetMyCourseProgressSections> sections;
  GetMyCourseProgressData.fromJson(dynamic json):
  
  sections = (json['sections'] as List<dynamic>)
        .map((e) => GetMyCourseProgressSections.fromJson(e))
        .toList();
  @override
  bool operator ==(Object other) {
    if(identical(this, other)) {
      return true;
    }
    if(other.runtimeType != runtimeType) {
      return false;
    }

    final GetMyCourseProgressData otherTyped = other as GetMyCourseProgressData;
    return sections == otherTyped.sections;
    
  }
  @override
  int get hashCode => sections.hashCode;
  

  Map<String, dynamic> toJson() {
    Map<String, dynamic> json = {};
    json['sections'] = sections.map((e) => e.toJson()).toList();
    return json;
  }

  GetMyCourseProgressData({
    required this.sections,
  });
}

@immutable
class GetMyCourseProgressVariables {
  final String courseId;
  @Deprecated('fromJson is deprecated for Variable classes as they are no longer required for deserialization.')
  GetMyCourseProgressVariables.fromJson(Map<String, dynamic> json):
  
  courseId = nativeFromJson<String>(json['courseId']);
  @override
  bool operator ==(Object other) {
    if(identical(this, other)) {
      return true;
    }
    if(other.runtimeType != runtimeType) {
      return false;
    }

    final GetMyCourseProgressVariables otherTyped = other as GetMyCourseProgressVariables;
    return courseId == otherTyped.courseId;
    
  }
  @override
  int get hashCode => courseId.hashCode;
  

  Map<String, dynamic> toJson() {
    Map<String, dynamic> json = {};
    json['courseId'] = nativeToJson<String>(courseId);
    return json;
  }

  GetMyCourseProgressVariables({
    required this.courseId,
  });
}

