part of 'generated.dart';

class GetMicroLessonMissionVariablesBuilder {
  String microLessonId;

  final FirebaseDataConnect _dataConnect;
  GetMicroLessonMissionVariablesBuilder(this._dataConnect, {required  this.microLessonId,});
  Deserializer<GetMicroLessonMissionData> dataDeserializer = (dynamic json)  => GetMicroLessonMissionData.fromJson(jsonDecode(json));
  Serializer<GetMicroLessonMissionVariables> varsSerializer = (GetMicroLessonMissionVariables vars) => jsonEncode(vars.toJson());
  Future<QueryResult<GetMicroLessonMissionData, GetMicroLessonMissionVariables>> execute({QueryFetchPolicy fetchPolicy = QueryFetchPolicy.preferCache}) {
    return ref().execute(fetchPolicy: fetchPolicy);
  }

  QueryRef<GetMicroLessonMissionData, GetMicroLessonMissionVariables> ref() {
    GetMicroLessonMissionVariables vars= GetMicroLessonMissionVariables(microLessonId: microLessonId,);
    return _dataConnect.query("GetMicroLessonMission", dataDeserializer, varsSerializer, vars);
  }
}

@immutable
class GetMicroLessonMissionMissionMicroLesson {
  final GetMicroLessonMissionMissionMicroLessonMission mission;
  GetMicroLessonMissionMissionMicroLesson.fromJson(dynamic json):
  
  mission = GetMicroLessonMissionMissionMicroLessonMission.fromJson(json['mission']);
  @override
  bool operator ==(Object other) {
    if(identical(this, other)) {
      return true;
    }
    if(other.runtimeType != runtimeType) {
      return false;
    }

    final GetMicroLessonMissionMissionMicroLesson otherTyped = other as GetMicroLessonMissionMissionMicroLesson;
    return mission == otherTyped.mission;
    
  }
  @override
  int get hashCode => mission.hashCode;
  

  Map<String, dynamic> toJson() {
    Map<String, dynamic> json = {};
    json['mission'] = mission.toJson();
    return json;
  }

  GetMicroLessonMissionMissionMicroLesson({
    required this.mission,
  });
}

@immutable
class GetMicroLessonMissionMissionMicroLessonMission {
  final String id;
  final GetMicroLessonMissionMissionMicroLessonMissionAuthor author;
  final GetMicroLessonMissionMissionMicroLessonMissionCreatedBy createdBy;
  final GetMicroLessonMissionMissionMicroLessonMissionCourse? course;
  GetMicroLessonMissionMissionMicroLessonMission.fromJson(dynamic json):
  
  id = nativeFromJson<String>(json['id']),
  author = GetMicroLessonMissionMissionMicroLessonMissionAuthor.fromJson(json['author']),
  createdBy = GetMicroLessonMissionMissionMicroLessonMissionCreatedBy.fromJson(json['createdBy']),
  course = json['course'] == null ? null : GetMicroLessonMissionMissionMicroLessonMissionCourse.fromJson(json['course']);
  @override
  bool operator ==(Object other) {
    if(identical(this, other)) {
      return true;
    }
    if(other.runtimeType != runtimeType) {
      return false;
    }

    final GetMicroLessonMissionMissionMicroLessonMission otherTyped = other as GetMicroLessonMissionMissionMicroLessonMission;
    return id == otherTyped.id && 
    author == otherTyped.author && 
    createdBy == otherTyped.createdBy && 
    course == otherTyped.course;
    
  }
  @override
  int get hashCode => Object.hashAll([id.hashCode, author.hashCode, createdBy.hashCode, course.hashCode]);
  

  Map<String, dynamic> toJson() {
    Map<String, dynamic> json = {};
    json['id'] = nativeToJson<String>(id);
    json['author'] = author.toJson();
    json['createdBy'] = createdBy.toJson();
    if (course != null) {
      json['course'] = course!.toJson();
    }
    return json;
  }

  GetMicroLessonMissionMissionMicroLessonMission({
    required this.id,
    required this.author,
    required this.createdBy,
    this.course,
  });
}

@immutable
class GetMicroLessonMissionMissionMicroLessonMissionAuthor {
  final String id;
  GetMicroLessonMissionMissionMicroLessonMissionAuthor.fromJson(dynamic json):
  
  id = nativeFromJson<String>(json['id']);
  @override
  bool operator ==(Object other) {
    if(identical(this, other)) {
      return true;
    }
    if(other.runtimeType != runtimeType) {
      return false;
    }

    final GetMicroLessonMissionMissionMicroLessonMissionAuthor otherTyped = other as GetMicroLessonMissionMissionMicroLessonMissionAuthor;
    return id == otherTyped.id;
    
  }
  @override
  int get hashCode => id.hashCode;
  

  Map<String, dynamic> toJson() {
    Map<String, dynamic> json = {};
    json['id'] = nativeToJson<String>(id);
    return json;
  }

  GetMicroLessonMissionMissionMicroLessonMissionAuthor({
    required this.id,
  });
}

@immutable
class GetMicroLessonMissionMissionMicroLessonMissionCreatedBy {
  final String id;
  GetMicroLessonMissionMissionMicroLessonMissionCreatedBy.fromJson(dynamic json):
  
  id = nativeFromJson<String>(json['id']);
  @override
  bool operator ==(Object other) {
    if(identical(this, other)) {
      return true;
    }
    if(other.runtimeType != runtimeType) {
      return false;
    }

    final GetMicroLessonMissionMissionMicroLessonMissionCreatedBy otherTyped = other as GetMicroLessonMissionMissionMicroLessonMissionCreatedBy;
    return id == otherTyped.id;
    
  }
  @override
  int get hashCode => id.hashCode;
  

  Map<String, dynamic> toJson() {
    Map<String, dynamic> json = {};
    json['id'] = nativeToJson<String>(id);
    return json;
  }

  GetMicroLessonMissionMissionMicroLessonMissionCreatedBy({
    required this.id,
  });
}

@immutable
class GetMicroLessonMissionMissionMicroLessonMissionCourse {
  final String id;
  final GetMicroLessonMissionMissionMicroLessonMissionCourseAuthor author;
  final GetMicroLessonMissionMissionMicroLessonMissionCourseCreatedBy createdBy;
  GetMicroLessonMissionMissionMicroLessonMissionCourse.fromJson(dynamic json):
  
  id = nativeFromJson<String>(json['id']),
  author = GetMicroLessonMissionMissionMicroLessonMissionCourseAuthor.fromJson(json['author']),
  createdBy = GetMicroLessonMissionMissionMicroLessonMissionCourseCreatedBy.fromJson(json['createdBy']);
  @override
  bool operator ==(Object other) {
    if(identical(this, other)) {
      return true;
    }
    if(other.runtimeType != runtimeType) {
      return false;
    }

    final GetMicroLessonMissionMissionMicroLessonMissionCourse otherTyped = other as GetMicroLessonMissionMissionMicroLessonMissionCourse;
    return id == otherTyped.id && 
    author == otherTyped.author && 
    createdBy == otherTyped.createdBy;
    
  }
  @override
  int get hashCode => Object.hashAll([id.hashCode, author.hashCode, createdBy.hashCode]);
  

  Map<String, dynamic> toJson() {
    Map<String, dynamic> json = {};
    json['id'] = nativeToJson<String>(id);
    json['author'] = author.toJson();
    json['createdBy'] = createdBy.toJson();
    return json;
  }

  GetMicroLessonMissionMissionMicroLessonMissionCourse({
    required this.id,
    required this.author,
    required this.createdBy,
  });
}

@immutable
class GetMicroLessonMissionMissionMicroLessonMissionCourseAuthor {
  final String id;
  GetMicroLessonMissionMissionMicroLessonMissionCourseAuthor.fromJson(dynamic json):
  
  id = nativeFromJson<String>(json['id']);
  @override
  bool operator ==(Object other) {
    if(identical(this, other)) {
      return true;
    }
    if(other.runtimeType != runtimeType) {
      return false;
    }

    final GetMicroLessonMissionMissionMicroLessonMissionCourseAuthor otherTyped = other as GetMicroLessonMissionMissionMicroLessonMissionCourseAuthor;
    return id == otherTyped.id;
    
  }
  @override
  int get hashCode => id.hashCode;
  

  Map<String, dynamic> toJson() {
    Map<String, dynamic> json = {};
    json['id'] = nativeToJson<String>(id);
    return json;
  }

  GetMicroLessonMissionMissionMicroLessonMissionCourseAuthor({
    required this.id,
  });
}

@immutable
class GetMicroLessonMissionMissionMicroLessonMissionCourseCreatedBy {
  final String id;
  GetMicroLessonMissionMissionMicroLessonMissionCourseCreatedBy.fromJson(dynamic json):
  
  id = nativeFromJson<String>(json['id']);
  @override
  bool operator ==(Object other) {
    if(identical(this, other)) {
      return true;
    }
    if(other.runtimeType != runtimeType) {
      return false;
    }

    final GetMicroLessonMissionMissionMicroLessonMissionCourseCreatedBy otherTyped = other as GetMicroLessonMissionMissionMicroLessonMissionCourseCreatedBy;
    return id == otherTyped.id;
    
  }
  @override
  int get hashCode => id.hashCode;
  

  Map<String, dynamic> toJson() {
    Map<String, dynamic> json = {};
    json['id'] = nativeToJson<String>(id);
    return json;
  }

  GetMicroLessonMissionMissionMicroLessonMissionCourseCreatedBy({
    required this.id,
  });
}

@immutable
class GetMicroLessonMissionData {
  final GetMicroLessonMissionMissionMicroLesson? missionMicroLesson;
  GetMicroLessonMissionData.fromJson(dynamic json):
  
  missionMicroLesson = json['missionMicroLesson'] == null ? null : GetMicroLessonMissionMissionMicroLesson.fromJson(json['missionMicroLesson']);
  @override
  bool operator ==(Object other) {
    if(identical(this, other)) {
      return true;
    }
    if(other.runtimeType != runtimeType) {
      return false;
    }

    final GetMicroLessonMissionData otherTyped = other as GetMicroLessonMissionData;
    return missionMicroLesson == otherTyped.missionMicroLesson;
    
  }
  @override
  int get hashCode => missionMicroLesson.hashCode;
  

  Map<String, dynamic> toJson() {
    Map<String, dynamic> json = {};
    if (missionMicroLesson != null) {
      json['missionMicroLesson'] = missionMicroLesson!.toJson();
    }
    return json;
  }

  GetMicroLessonMissionData({
    this.missionMicroLesson,
  });
}

@immutable
class GetMicroLessonMissionVariables {
  final String microLessonId;
  @Deprecated('fromJson is deprecated for Variable classes as they are no longer required for deserialization.')
  GetMicroLessonMissionVariables.fromJson(Map<String, dynamic> json):
  
  microLessonId = nativeFromJson<String>(json['microLessonId']);
  @override
  bool operator ==(Object other) {
    if(identical(this, other)) {
      return true;
    }
    if(other.runtimeType != runtimeType) {
      return false;
    }

    final GetMicroLessonMissionVariables otherTyped = other as GetMicroLessonMissionVariables;
    return microLessonId == otherTyped.microLessonId;
    
  }
  @override
  int get hashCode => microLessonId.hashCode;
  

  Map<String, dynamic> toJson() {
    Map<String, dynamic> json = {};
    json['microLessonId'] = nativeToJson<String>(microLessonId);
    return json;
  }

  GetMicroLessonMissionVariables({
    required this.microLessonId,
  });
}

