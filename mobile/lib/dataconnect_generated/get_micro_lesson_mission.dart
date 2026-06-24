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
  GetMicroLessonMissionMissionMicroLessonMission.fromJson(dynamic json):
  
  id = nativeFromJson<String>(json['id']);
  @override
  bool operator ==(Object other) {
    if(identical(this, other)) {
      return true;
    }
    if(other.runtimeType != runtimeType) {
      return false;
    }

    final GetMicroLessonMissionMissionMicroLessonMission otherTyped = other as GetMicroLessonMissionMissionMicroLessonMission;
    return id == otherTyped.id;
    
  }
  @override
  int get hashCode => id.hashCode;
  

  Map<String, dynamic> toJson() {
    Map<String, dynamic> json = {};
    json['id'] = nativeToJson<String>(id);
    return json;
  }

  GetMicroLessonMissionMissionMicroLessonMission({
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

