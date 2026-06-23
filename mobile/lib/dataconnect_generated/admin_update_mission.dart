part of 'generated.dart';

class AdminUpdateMissionVariablesBuilder {
  String missionId;
  final Optional<String> _title = Optional.optional(nativeFromJson, nativeToJson);
  final Optional<String> _scenarioDescription = Optional.optional(nativeFromJson, nativeToJson);
  final Optional<int> _durationMinutes = Optional.optional(nativeFromJson, nativeToJson);
  final Optional<String> _categoryId = Optional.optional(nativeFromJson, nativeToJson);
  final Optional<MissionDifficulty> _difficulty = Optional.optional((data) => MissionDifficulty.values.byName(data), enumSerializer);
  final Optional<List<String>> _skillsTested = Optional.optional(listDeserializer(nativeFromJson), listSerializer(nativeToJson));
  final Optional<String> _courseId = Optional.optional(nativeFromJson, nativeToJson);

  final FirebaseDataConnect _dataConnect;  AdminUpdateMissionVariablesBuilder title(String? t) {
   _title.value = t;
   return this;
  }
  AdminUpdateMissionVariablesBuilder scenarioDescription(String? t) {
   _scenarioDescription.value = t;
   return this;
  }
  AdminUpdateMissionVariablesBuilder durationMinutes(int? t) {
   _durationMinutes.value = t;
   return this;
  }
  AdminUpdateMissionVariablesBuilder categoryId(String? t) {
   _categoryId.value = t;
   return this;
  }
  AdminUpdateMissionVariablesBuilder difficulty(MissionDifficulty? t) {
   _difficulty.value = t;
   return this;
  }
  AdminUpdateMissionVariablesBuilder skillsTested(List<String>? t) {
   _skillsTested.value = t;
   return this;
  }
  AdminUpdateMissionVariablesBuilder courseId(String? t) {
   _courseId.value = t;
   return this;
  }

  AdminUpdateMissionVariablesBuilder(this._dataConnect, {required  this.missionId,});
  Deserializer<AdminUpdateMissionData> dataDeserializer = (dynamic json)  => AdminUpdateMissionData.fromJson(jsonDecode(json));
  Serializer<AdminUpdateMissionVariables> varsSerializer = (AdminUpdateMissionVariables vars) => jsonEncode(vars.toJson());
  Future<OperationResult<AdminUpdateMissionData, AdminUpdateMissionVariables>> execute() {
    return ref().execute();
  }

  MutationRef<AdminUpdateMissionData, AdminUpdateMissionVariables> ref() {
    AdminUpdateMissionVariables vars= AdminUpdateMissionVariables(missionId: missionId,title: _title,scenarioDescription: _scenarioDescription,durationMinutes: _durationMinutes,categoryId: _categoryId,difficulty: _difficulty,skillsTested: _skillsTested,courseId: _courseId,);
    return _dataConnect.mutation('AdminUpdateMission', dataDeserializer, varsSerializer, vars);
  }
}

@immutable
class AdminUpdateMissionMissionUpdate {
  final String id;
  AdminUpdateMissionMissionUpdate.fromJson(dynamic json):
  
  id = nativeFromJson<String>(json['id']);
  @override
  bool operator ==(Object other) {
    if(identical(this, other)) {
      return true;
    }
    if(other.runtimeType != runtimeType) {
      return false;
    }

    final AdminUpdateMissionMissionUpdate otherTyped = other as AdminUpdateMissionMissionUpdate;
    return id == otherTyped.id;
    
  }
  @override
  int get hashCode => id.hashCode;
  

  Map<String, dynamic> toJson() {
    Map<String, dynamic> json = {};
    json['id'] = nativeToJson<String>(id);
    return json;
  }

  AdminUpdateMissionMissionUpdate({
    required this.id,
  });
}

@immutable
class AdminUpdateMissionData {
  final AdminUpdateMissionMissionUpdate? mission_update;
  AdminUpdateMissionData.fromJson(dynamic json):
  
  mission_update = json['mission_update'] == null ? null : AdminUpdateMissionMissionUpdate.fromJson(json['mission_update']);
  @override
  bool operator ==(Object other) {
    if(identical(this, other)) {
      return true;
    }
    if(other.runtimeType != runtimeType) {
      return false;
    }

    final AdminUpdateMissionData otherTyped = other as AdminUpdateMissionData;
    return mission_update == otherTyped.mission_update;
    
  }
  @override
  int get hashCode => mission_update.hashCode;
  

  Map<String, dynamic> toJson() {
    Map<String, dynamic> json = {};
    if (mission_update != null) {
      json['mission_update'] = mission_update!.toJson();
    }
    return json;
  }

  AdminUpdateMissionData({
    this.mission_update,
  });
}

@immutable
class AdminUpdateMissionVariables {
  final String missionId;
  late final Optional<String>title;
  late final Optional<String>scenarioDescription;
  late final Optional<int>durationMinutes;
  late final Optional<String>categoryId;
  late final Optional<MissionDifficulty>difficulty;
  late final Optional<List<String>>skillsTested;
  late final Optional<String>courseId;
  @Deprecated('fromJson is deprecated for Variable classes as they are no longer required for deserialization.')
  AdminUpdateMissionVariables.fromJson(Map<String, dynamic> json):
  
  missionId = nativeFromJson<String>(json['missionId']) {
  
  
  
    title = Optional.optional(nativeFromJson, nativeToJson);
    title.value = json['title'] == null ? null : nativeFromJson<String>(json['title']);
  
  
    scenarioDescription = Optional.optional(nativeFromJson, nativeToJson);
    scenarioDescription.value = json['scenarioDescription'] == null ? null : nativeFromJson<String>(json['scenarioDescription']);
  
  
    durationMinutes = Optional.optional(nativeFromJson, nativeToJson);
    durationMinutes.value = json['durationMinutes'] == null ? null : nativeFromJson<int>(json['durationMinutes']);
  
  
    categoryId = Optional.optional(nativeFromJson, nativeToJson);
    categoryId.value = json['categoryId'] == null ? null : nativeFromJson<String>(json['categoryId']);
  
  
    difficulty = Optional.optional((data) => MissionDifficulty.values.byName(data), enumSerializer);
    difficulty.value = json['difficulty'] == null ? null : MissionDifficulty.values.byName(json['difficulty']);
  
  
    skillsTested = Optional.optional(listDeserializer(nativeFromJson), listSerializer(nativeToJson));
    skillsTested.value = json['skillsTested'] == null ? null : (json['skillsTested'] as List<dynamic>)
        .map((e) => nativeFromJson<String>(e))
        .toList();
  
  
    courseId = Optional.optional(nativeFromJson, nativeToJson);
    courseId.value = json['courseId'] == null ? null : nativeFromJson<String>(json['courseId']);
  
  }
  @override
  bool operator ==(Object other) {
    if(identical(this, other)) {
      return true;
    }
    if(other.runtimeType != runtimeType) {
      return false;
    }

    final AdminUpdateMissionVariables otherTyped = other as AdminUpdateMissionVariables;
    return missionId == otherTyped.missionId && 
    title == otherTyped.title && 
    scenarioDescription == otherTyped.scenarioDescription && 
    durationMinutes == otherTyped.durationMinutes && 
    categoryId == otherTyped.categoryId && 
    difficulty == otherTyped.difficulty && 
    skillsTested == otherTyped.skillsTested && 
    courseId == otherTyped.courseId;
    
  }
  @override
  int get hashCode => Object.hashAll([missionId.hashCode, title.hashCode, scenarioDescription.hashCode, durationMinutes.hashCode, categoryId.hashCode, difficulty.hashCode, skillsTested.hashCode, courseId.hashCode]);
  

  Map<String, dynamic> toJson() {
    Map<String, dynamic> json = {};
    json['missionId'] = nativeToJson<String>(missionId);
    if(title.state == OptionalState.set) {
      json['title'] = title.toJson();
    }
    if(scenarioDescription.state == OptionalState.set) {
      json['scenarioDescription'] = scenarioDescription.toJson();
    }
    if(durationMinutes.state == OptionalState.set) {
      json['durationMinutes'] = durationMinutes.toJson();
    }
    if(categoryId.state == OptionalState.set) {
      json['categoryId'] = categoryId.toJson();
    }
    if(difficulty.state == OptionalState.set) {
      json['difficulty'] = difficulty.toJson();
    }
    if(skillsTested.state == OptionalState.set) {
      json['skillsTested'] = skillsTested.toJson();
    }
    if(courseId.state == OptionalState.set) {
      json['courseId'] = courseId.toJson();
    }
    return json;
  }

  AdminUpdateMissionVariables({
    required this.missionId,
    required this.title,
    required this.scenarioDescription,
    required this.durationMinutes,
    required this.categoryId,
    required this.difficulty,
    required this.skillsTested,
    required this.courseId,
  });
}

