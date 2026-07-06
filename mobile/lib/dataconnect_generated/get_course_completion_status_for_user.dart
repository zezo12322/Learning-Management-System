part of 'generated.dart';

class GetCourseCompletionStatusForUserVariablesBuilder {
  String courseId;
  String userId;

  final FirebaseDataConnect _dataConnect;
  GetCourseCompletionStatusForUserVariablesBuilder(this._dataConnect, {required  this.courseId,required  this.userId,});
  Deserializer<GetCourseCompletionStatusForUserData> dataDeserializer = (dynamic json)  => GetCourseCompletionStatusForUserData.fromJson(jsonDecode(json));
  Serializer<GetCourseCompletionStatusForUserVariables> varsSerializer = (GetCourseCompletionStatusForUserVariables vars) => jsonEncode(vars.toJson());
  Future<QueryResult<GetCourseCompletionStatusForUserData, GetCourseCompletionStatusForUserVariables>> execute({QueryFetchPolicy fetchPolicy = QueryFetchPolicy.preferCache}) {
    return ref().execute(fetchPolicy: fetchPolicy);
  }

  QueryRef<GetCourseCompletionStatusForUserData, GetCourseCompletionStatusForUserVariables> ref() {
    GetCourseCompletionStatusForUserVariables vars= GetCourseCompletionStatusForUserVariables(courseId: courseId,userId: userId,);
    return _dataConnect.query("GetCourseCompletionStatusForUser", dataDeserializer, varsSerializer, vars);
  }
}

@immutable
class GetCourseCompletionStatusForUserSections {
  final List<GetCourseCompletionStatusForUserSectionsUserCompletionLectures> userCompletionLectures;
  GetCourseCompletionStatusForUserSections.fromJson(dynamic json):
  
  userCompletionLectures = (json['userCompletionLectures'] as List<dynamic>)
        .map((e) => GetCourseCompletionStatusForUserSectionsUserCompletionLectures.fromJson(e))
        .toList();
  @override
  bool operator ==(Object other) {
    if(identical(this, other)) {
      return true;
    }
    if(other.runtimeType != runtimeType) {
      return false;
    }

    final GetCourseCompletionStatusForUserSections otherTyped = other as GetCourseCompletionStatusForUserSections;
    return userCompletionLectures == otherTyped.userCompletionLectures;
    
  }
  @override
  int get hashCode => userCompletionLectures.hashCode;
  

  Map<String, dynamic> toJson() {
    Map<String, dynamic> json = {};
    json['userCompletionLectures'] = userCompletionLectures.map((e) => e.toJson()).toList();
    return json;
  }

  GetCourseCompletionStatusForUserSections({
    required this.userCompletionLectures,
  });
}

@immutable
class GetCourseCompletionStatusForUserSectionsUserCompletionLectures {
  final String id;
  final List<GetCourseCompletionStatusForUserSectionsUserCompletionLecturesUserCompletionProgress> userCompletionProgress;
  GetCourseCompletionStatusForUserSectionsUserCompletionLectures.fromJson(dynamic json):
  
  id = nativeFromJson<String>(json['id']),
  userCompletionProgress = (json['userCompletionProgress'] as List<dynamic>)
        .map((e) => GetCourseCompletionStatusForUserSectionsUserCompletionLecturesUserCompletionProgress.fromJson(e))
        .toList();
  @override
  bool operator ==(Object other) {
    if(identical(this, other)) {
      return true;
    }
    if(other.runtimeType != runtimeType) {
      return false;
    }

    final GetCourseCompletionStatusForUserSectionsUserCompletionLectures otherTyped = other as GetCourseCompletionStatusForUserSectionsUserCompletionLectures;
    return id == otherTyped.id && 
    userCompletionProgress == otherTyped.userCompletionProgress;
    
  }
  @override
  int get hashCode => Object.hashAll([id.hashCode, userCompletionProgress.hashCode]);
  

  Map<String, dynamic> toJson() {
    Map<String, dynamic> json = {};
    json['id'] = nativeToJson<String>(id);
    json['userCompletionProgress'] = userCompletionProgress.map((e) => e.toJson()).toList();
    return json;
  }

  GetCourseCompletionStatusForUserSectionsUserCompletionLectures({
    required this.id,
    required this.userCompletionProgress,
  });
}

@immutable
class GetCourseCompletionStatusForUserSectionsUserCompletionLecturesUserCompletionProgress {
  final Timestamp? completedAt;
  GetCourseCompletionStatusForUserSectionsUserCompletionLecturesUserCompletionProgress.fromJson(dynamic json):
  
  completedAt = json['completedAt'] == null ? null : Timestamp.fromJson(json['completedAt']);
  @override
  bool operator ==(Object other) {
    if(identical(this, other)) {
      return true;
    }
    if(other.runtimeType != runtimeType) {
      return false;
    }

    final GetCourseCompletionStatusForUserSectionsUserCompletionLecturesUserCompletionProgress otherTyped = other as GetCourseCompletionStatusForUserSectionsUserCompletionLecturesUserCompletionProgress;
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

  GetCourseCompletionStatusForUserSectionsUserCompletionLecturesUserCompletionProgress({
    this.completedAt,
  });
}

@immutable
class GetCourseCompletionStatusForUserData {
  final List<GetCourseCompletionStatusForUserSections> sections;
  GetCourseCompletionStatusForUserData.fromJson(dynamic json):
  
  sections = (json['sections'] as List<dynamic>)
        .map((e) => GetCourseCompletionStatusForUserSections.fromJson(e))
        .toList();
  @override
  bool operator ==(Object other) {
    if(identical(this, other)) {
      return true;
    }
    if(other.runtimeType != runtimeType) {
      return false;
    }

    final GetCourseCompletionStatusForUserData otherTyped = other as GetCourseCompletionStatusForUserData;
    return sections == otherTyped.sections;
    
  }
  @override
  int get hashCode => sections.hashCode;
  

  Map<String, dynamic> toJson() {
    Map<String, dynamic> json = {};
    json['sections'] = sections.map((e) => e.toJson()).toList();
    return json;
  }

  GetCourseCompletionStatusForUserData({
    required this.sections,
  });
}

@immutable
class GetCourseCompletionStatusForUserVariables {
  final String courseId;
  final String userId;
  @Deprecated('fromJson is deprecated for Variable classes as they are no longer required for deserialization.')
  GetCourseCompletionStatusForUserVariables.fromJson(Map<String, dynamic> json):
  
  courseId = nativeFromJson<String>(json['courseId']),
  userId = nativeFromJson<String>(json['userId']);
  @override
  bool operator ==(Object other) {
    if(identical(this, other)) {
      return true;
    }
    if(other.runtimeType != runtimeType) {
      return false;
    }

    final GetCourseCompletionStatusForUserVariables otherTyped = other as GetCourseCompletionStatusForUserVariables;
    return courseId == otherTyped.courseId && 
    userId == otherTyped.userId;
    
  }
  @override
  int get hashCode => Object.hashAll([courseId.hashCode, userId.hashCode]);
  

  Map<String, dynamic> toJson() {
    Map<String, dynamic> json = {};
    json['courseId'] = nativeToJson<String>(courseId);
    json['userId'] = nativeToJson<String>(userId);
    return json;
  }

  GetCourseCompletionStatusForUserVariables({
    required this.courseId,
    required this.userId,
  });
}

