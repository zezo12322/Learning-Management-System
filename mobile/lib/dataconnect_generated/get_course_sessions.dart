part of 'generated.dart';

class GetCourseSessionsVariablesBuilder {
  String courseId;

  final FirebaseDataConnect _dataConnect;
  GetCourseSessionsVariablesBuilder(this._dataConnect, {required  this.courseId,});
  Deserializer<GetCourseSessionsData> dataDeserializer = (dynamic json)  => GetCourseSessionsData.fromJson(jsonDecode(json));
  Serializer<GetCourseSessionsVariables> varsSerializer = (GetCourseSessionsVariables vars) => jsonEncode(vars.toJson());
  Future<QueryResult<GetCourseSessionsData, GetCourseSessionsVariables>> execute({QueryFetchPolicy fetchPolicy = QueryFetchPolicy.preferCache}) {
    return ref().execute(fetchPolicy: fetchPolicy);
  }

  QueryRef<GetCourseSessionsData, GetCourseSessionsVariables> ref() {
    GetCourseSessionsVariables vars= GetCourseSessionsVariables(courseId: courseId,);
    return _dataConnect.query("GetCourseSessions", dataDeserializer, varsSerializer, vars);
  }
}

@immutable
class GetCourseSessionsSessions {
  final String id;
  final String title;
  final Timestamp startTime;
  final Timestamp endTime;
  final EnumValue<SessionType> type;
  final String locationOrUrl;
  GetCourseSessionsSessions.fromJson(dynamic json):
  
  id = nativeFromJson<String>(json['id']),
  title = nativeFromJson<String>(json['title']),
  startTime = Timestamp.fromJson(json['startTime']),
  endTime = Timestamp.fromJson(json['endTime']),
  type = sessionTypeDeserializer(json['type']),
  locationOrUrl = nativeFromJson<String>(json['locationOrUrl']);
  @override
  bool operator ==(Object other) {
    if(identical(this, other)) {
      return true;
    }
    if(other.runtimeType != runtimeType) {
      return false;
    }

    final GetCourseSessionsSessions otherTyped = other as GetCourseSessionsSessions;
    return id == otherTyped.id && 
    title == otherTyped.title && 
    startTime == otherTyped.startTime && 
    endTime == otherTyped.endTime && 
    type == otherTyped.type && 
    locationOrUrl == otherTyped.locationOrUrl;
    
  }
  @override
  int get hashCode => Object.hashAll([id.hashCode, title.hashCode, startTime.hashCode, endTime.hashCode, type.hashCode, locationOrUrl.hashCode]);
  

  Map<String, dynamic> toJson() {
    Map<String, dynamic> json = {};
    json['id'] = nativeToJson<String>(id);
    json['title'] = nativeToJson<String>(title);
    json['startTime'] = startTime.toJson();
    json['endTime'] = endTime.toJson();
    json['type'] = 
    sessionTypeSerializer(type)
    ;
    json['locationOrUrl'] = nativeToJson<String>(locationOrUrl);
    return json;
  }

  GetCourseSessionsSessions({
    required this.id,
    required this.title,
    required this.startTime,
    required this.endTime,
    required this.type,
    required this.locationOrUrl,
  });
}

@immutable
class GetCourseSessionsData {
  final List<GetCourseSessionsSessions> sessions;
  GetCourseSessionsData.fromJson(dynamic json):
  
  sessions = (json['sessions'] as List<dynamic>)
        .map((e) => GetCourseSessionsSessions.fromJson(e))
        .toList();
  @override
  bool operator ==(Object other) {
    if(identical(this, other)) {
      return true;
    }
    if(other.runtimeType != runtimeType) {
      return false;
    }

    final GetCourseSessionsData otherTyped = other as GetCourseSessionsData;
    return sessions == otherTyped.sessions;
    
  }
  @override
  int get hashCode => sessions.hashCode;
  

  Map<String, dynamic> toJson() {
    Map<String, dynamic> json = {};
    json['sessions'] = sessions.map((e) => e.toJson()).toList();
    return json;
  }

  GetCourseSessionsData({
    required this.sessions,
  });
}

@immutable
class GetCourseSessionsVariables {
  final String courseId;
  @Deprecated('fromJson is deprecated for Variable classes as they are no longer required for deserialization.')
  GetCourseSessionsVariables.fromJson(Map<String, dynamic> json):
  
  courseId = nativeFromJson<String>(json['courseId']);
  @override
  bool operator ==(Object other) {
    if(identical(this, other)) {
      return true;
    }
    if(other.runtimeType != runtimeType) {
      return false;
    }

    final GetCourseSessionsVariables otherTyped = other as GetCourseSessionsVariables;
    return courseId == otherTyped.courseId;
    
  }
  @override
  int get hashCode => courseId.hashCode;
  

  Map<String, dynamic> toJson() {
    Map<String, dynamic> json = {};
    json['courseId'] = nativeToJson<String>(courseId);
    return json;
  }

  GetCourseSessionsVariables({
    required this.courseId,
  });
}

