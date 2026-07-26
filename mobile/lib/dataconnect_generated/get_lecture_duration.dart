part of 'generated.dart';

class GetLectureDurationVariablesBuilder {
  String lectureId;

  final FirebaseDataConnect _dataConnect;
  GetLectureDurationVariablesBuilder(this._dataConnect, {required  this.lectureId,});
  Deserializer<GetLectureDurationData> dataDeserializer = (dynamic json)  => GetLectureDurationData.fromJson(jsonDecode(json));
  Serializer<GetLectureDurationVariables> varsSerializer = (GetLectureDurationVariables vars) => jsonEncode(vars.toJson());
  Future<QueryResult<GetLectureDurationData, GetLectureDurationVariables>> execute({QueryFetchPolicy fetchPolicy = QueryFetchPolicy.preferCache}) {
    return ref().execute(fetchPolicy: fetchPolicy);
  }

  QueryRef<GetLectureDurationData, GetLectureDurationVariables> ref() {
    GetLectureDurationVariables vars= GetLectureDurationVariables(lectureId: lectureId,);
    return _dataConnect.query("GetLectureDuration", dataDeserializer, varsSerializer, vars);
  }
}

@immutable
class GetLectureDurationCourseLecture {
  final String id;
  final int? duration;
  final GetLectureDurationCourseLectureSection section;
  GetLectureDurationCourseLecture.fromJson(dynamic json):
  
  id = nativeFromJson<String>(json['id']),
  duration = json['duration'] == null ? null : nativeFromJson<int>(json['duration']),
  section = GetLectureDurationCourseLectureSection.fromJson(json['section']);
  @override
  bool operator ==(Object other) {
    if(identical(this, other)) {
      return true;
    }
    if(other.runtimeType != runtimeType) {
      return false;
    }

    final GetLectureDurationCourseLecture otherTyped = other as GetLectureDurationCourseLecture;
    return id == otherTyped.id && 
    duration == otherTyped.duration && 
    section == otherTyped.section;
    
  }
  @override
  int get hashCode => Object.hashAll([id.hashCode, duration.hashCode, section.hashCode]);
  

  Map<String, dynamic> toJson() {
    Map<String, dynamic> json = {};
    json['id'] = nativeToJson<String>(id);
    if (duration != null) {
      json['duration'] = nativeToJson<int?>(duration);
    }
    json['section'] = section.toJson();
    return json;
  }

  GetLectureDurationCourseLecture({
    required this.id,
    this.duration,
    required this.section,
  });
}

@immutable
class GetLectureDurationCourseLectureSection {
  final GetLectureDurationCourseLectureSectionCourse course;
  GetLectureDurationCourseLectureSection.fromJson(dynamic json):
  
  course = GetLectureDurationCourseLectureSectionCourse.fromJson(json['course']);
  @override
  bool operator ==(Object other) {
    if(identical(this, other)) {
      return true;
    }
    if(other.runtimeType != runtimeType) {
      return false;
    }

    final GetLectureDurationCourseLectureSection otherTyped = other as GetLectureDurationCourseLectureSection;
    return course == otherTyped.course;
    
  }
  @override
  int get hashCode => course.hashCode;
  

  Map<String, dynamic> toJson() {
    Map<String, dynamic> json = {};
    json['course'] = course.toJson();
    return json;
  }

  GetLectureDurationCourseLectureSection({
    required this.course,
  });
}

@immutable
class GetLectureDurationCourseLectureSectionCourse {
  final String id;
  GetLectureDurationCourseLectureSectionCourse.fromJson(dynamic json):
  
  id = nativeFromJson<String>(json['id']);
  @override
  bool operator ==(Object other) {
    if(identical(this, other)) {
      return true;
    }
    if(other.runtimeType != runtimeType) {
      return false;
    }

    final GetLectureDurationCourseLectureSectionCourse otherTyped = other as GetLectureDurationCourseLectureSectionCourse;
    return id == otherTyped.id;
    
  }
  @override
  int get hashCode => id.hashCode;
  

  Map<String, dynamic> toJson() {
    Map<String, dynamic> json = {};
    json['id'] = nativeToJson<String>(id);
    return json;
  }

  GetLectureDurationCourseLectureSectionCourse({
    required this.id,
  });
}

@immutable
class GetLectureDurationData {
  final GetLectureDurationCourseLecture? courseLecture;
  GetLectureDurationData.fromJson(dynamic json):
  
  courseLecture = json['courseLecture'] == null ? null : GetLectureDurationCourseLecture.fromJson(json['courseLecture']);
  @override
  bool operator ==(Object other) {
    if(identical(this, other)) {
      return true;
    }
    if(other.runtimeType != runtimeType) {
      return false;
    }

    final GetLectureDurationData otherTyped = other as GetLectureDurationData;
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

  GetLectureDurationData({
    this.courseLecture,
  });
}

@immutable
class GetLectureDurationVariables {
  final String lectureId;
  @Deprecated('fromJson is deprecated for Variable classes as they are no longer required for deserialization.')
  GetLectureDurationVariables.fromJson(Map<String, dynamic> json):
  
  lectureId = nativeFromJson<String>(json['lectureId']);
  @override
  bool operator ==(Object other) {
    if(identical(this, other)) {
      return true;
    }
    if(other.runtimeType != runtimeType) {
      return false;
    }

    final GetLectureDurationVariables otherTyped = other as GetLectureDurationVariables;
    return lectureId == otherTyped.lectureId;
    
  }
  @override
  int get hashCode => lectureId.hashCode;
  

  Map<String, dynamic> toJson() {
    Map<String, dynamic> json = {};
    json['lectureId'] = nativeToJson<String>(lectureId);
    return json;
  }

  GetLectureDurationVariables({
    required this.lectureId,
  });
}

