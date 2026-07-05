part of 'generated.dart';

class AdminCreateMissionVariablesBuilder {
  String title;
  String scenarioDescription;
  int durationMinutes;
  String categoryId;
  MissionDifficulty difficulty;
  List<String> skillsTested;
  Optional<String> _courseId = Optional.optional(nativeFromJson, nativeToJson);
  String authorId;

  final FirebaseDataConnect _dataConnect;  AdminCreateMissionVariablesBuilder courseId(String? t) {
   _courseId.value = t;
   return this;
  }

  AdminCreateMissionVariablesBuilder(this._dataConnect, {required  this.title,required  this.scenarioDescription,required  this.durationMinutes,required  this.categoryId,required  this.difficulty,required  this.skillsTested,required  this.authorId,});
  Deserializer<AdminCreateMissionData> dataDeserializer = (dynamic json)  => AdminCreateMissionData.fromJson(jsonDecode(json));
  Serializer<AdminCreateMissionVariables> varsSerializer = (AdminCreateMissionVariables vars) => jsonEncode(vars.toJson());
  Future<OperationResult<AdminCreateMissionData, AdminCreateMissionVariables>> execute() {
    return ref().execute();
  }

  MutationRef<AdminCreateMissionData, AdminCreateMissionVariables> ref() {
    AdminCreateMissionVariables vars= AdminCreateMissionVariables(title: title,scenarioDescription: scenarioDescription,durationMinutes: durationMinutes,categoryId: categoryId,difficulty: difficulty,skillsTested: skillsTested,courseId: _courseId,authorId: authorId,);
    return _dataConnect.mutation("AdminCreateMission", dataDeserializer, varsSerializer, vars);
  }
}

@immutable
class AdminCreateMissionMissionInsert {
  final String id;
  AdminCreateMissionMissionInsert.fromJson(dynamic json):
  
  id = nativeFromJson<String>(json['id']);
  @override
  bool operator ==(Object other) {
    if(identical(this, other)) {
      return true;
    }
    if(other.runtimeType != runtimeType) {
      return false;
    }

    final AdminCreateMissionMissionInsert otherTyped = other as AdminCreateMissionMissionInsert;
    return id == otherTyped.id;
    
  }
  @override
  int get hashCode => id.hashCode;
  

  Map<String, dynamic> toJson() {
    Map<String, dynamic> json = {};
    json['id'] = nativeToJson<String>(id);
    return json;
  }

  AdminCreateMissionMissionInsert({
    required this.id,
  });
}

@immutable
class AdminCreateMissionData {
  final AdminCreateMissionMissionInsert mission_insert;
  AdminCreateMissionData.fromJson(dynamic json):
  
  mission_insert = AdminCreateMissionMissionInsert.fromJson(json['mission_insert']);
  @override
  bool operator ==(Object other) {
    if(identical(this, other)) {
      return true;
    }
    if(other.runtimeType != runtimeType) {
      return false;
    }

    final AdminCreateMissionData otherTyped = other as AdminCreateMissionData;
    return mission_insert == otherTyped.mission_insert;
    
  }
  @override
  int get hashCode => mission_insert.hashCode;
  

  Map<String, dynamic> toJson() {
    Map<String, dynamic> json = {};
    json['mission_insert'] = mission_insert.toJson();
    return json;
  }

  AdminCreateMissionData({
    required this.mission_insert,
  });
}

@immutable
class AdminCreateMissionVariables {
  final String title;
  final String scenarioDescription;
  final int durationMinutes;
  final String categoryId;
  final MissionDifficulty difficulty;
  final List<String> skillsTested;
  late final Optional<String>courseId;
  final String authorId;
  @Deprecated('fromJson is deprecated for Variable classes as they are no longer required for deserialization.')
  AdminCreateMissionVariables.fromJson(Map<String, dynamic> json):
  
  title = nativeFromJson<String>(json['title']),
  scenarioDescription = nativeFromJson<String>(json['scenarioDescription']),
  durationMinutes = nativeFromJson<int>(json['durationMinutes']),
  categoryId = nativeFromJson<String>(json['categoryId']),
  difficulty = MissionDifficulty.values.byName(json['difficulty']),
  skillsTested = (json['skillsTested'] as List<dynamic>)
        .map((e) => nativeFromJson<String>(e))
        .toList(),
  authorId = nativeFromJson<String>(json['authorId']) {
  
  
  
  
  
  
  
  
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

    final AdminCreateMissionVariables otherTyped = other as AdminCreateMissionVariables;
    return title == otherTyped.title && 
    scenarioDescription == otherTyped.scenarioDescription && 
    durationMinutes == otherTyped.durationMinutes && 
    categoryId == otherTyped.categoryId && 
    difficulty == otherTyped.difficulty && 
    skillsTested == otherTyped.skillsTested && 
    courseId == otherTyped.courseId && 
    authorId == otherTyped.authorId;
    
  }
  @override
  int get hashCode => Object.hashAll([title.hashCode, scenarioDescription.hashCode, durationMinutes.hashCode, categoryId.hashCode, difficulty.hashCode, skillsTested.hashCode, courseId.hashCode, authorId.hashCode]);
  

  Map<String, dynamic> toJson() {
    Map<String, dynamic> json = {};
    json['title'] = nativeToJson<String>(title);
    json['scenarioDescription'] = nativeToJson<String>(scenarioDescription);
    json['durationMinutes'] = nativeToJson<int>(durationMinutes);
    json['categoryId'] = nativeToJson<String>(categoryId);
    json['difficulty'] = 
    difficulty.name
    ;
    json['skillsTested'] = skillsTested.map((e) => nativeToJson<String>(e)).toList();
    if(courseId.state == OptionalState.set) {
      json['courseId'] = courseId.toJson();
    }
    json['authorId'] = nativeToJson<String>(authorId);
    return json;
  }

  AdminCreateMissionVariables({
    required this.title,
    required this.scenarioDescription,
    required this.durationMinutes,
    required this.categoryId,
    required this.difficulty,
    required this.skillsTested,
    required this.courseId,
    required this.authorId,
  });
}

