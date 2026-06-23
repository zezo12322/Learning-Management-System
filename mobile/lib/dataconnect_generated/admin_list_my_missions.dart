part of 'generated.dart';

class AdminListMyMissionsVariablesBuilder {
  
  final FirebaseDataConnect _dataConnect;
  AdminListMyMissionsVariablesBuilder(this._dataConnect, );
  Deserializer<AdminListMyMissionsData> dataDeserializer = (dynamic json)  => AdminListMyMissionsData.fromJson(jsonDecode(json));
  
  Future<QueryResult<AdminListMyMissionsData, void>> execute({QueryFetchPolicy fetchPolicy = QueryFetchPolicy.preferCache}) {
    return ref().execute(fetchPolicy: fetchPolicy);
  }

  QueryRef<AdminListMyMissionsData, void> ref() {
    
    return _dataConnect.query('AdminListMyMissions', dataDeserializer, emptySerializer, null);
  }
}

@immutable
class AdminListMyMissionsMissions {
  final String id;
  final String title;
  final EnumValue<MissionDifficulty> difficulty;
  final int durationMinutes;
  final Timestamp updatedAt;
  final AdminListMyMissionsMissionsCategory category;
  final AdminListMyMissionsMissionsCourse? course;
  AdminListMyMissionsMissions.fromJson(dynamic json):
  
  id = nativeFromJson<String>(json['id']),
  title = nativeFromJson<String>(json['title']),
  difficulty = missionDifficultyDeserializer(json['difficulty']),
  durationMinutes = nativeFromJson<int>(json['durationMinutes']),
  updatedAt = Timestamp.fromJson(json['updatedAt']),
  category = AdminListMyMissionsMissionsCategory.fromJson(json['category']),
  course = json['course'] == null ? null : AdminListMyMissionsMissionsCourse.fromJson(json['course']);
  @override
  bool operator ==(Object other) {
    if(identical(this, other)) {
      return true;
    }
    if(other.runtimeType != runtimeType) {
      return false;
    }

    final AdminListMyMissionsMissions otherTyped = other as AdminListMyMissionsMissions;
    return id == otherTyped.id && 
    title == otherTyped.title && 
    difficulty == otherTyped.difficulty && 
    durationMinutes == otherTyped.durationMinutes && 
    updatedAt == otherTyped.updatedAt && 
    category == otherTyped.category && 
    course == otherTyped.course;
    
  }
  @override
  int get hashCode => Object.hashAll([id.hashCode, title.hashCode, difficulty.hashCode, durationMinutes.hashCode, updatedAt.hashCode, category.hashCode, course.hashCode]);
  

  Map<String, dynamic> toJson() {
    Map<String, dynamic> json = {};
    json['id'] = nativeToJson<String>(id);
    json['title'] = nativeToJson<String>(title);
    json['difficulty'] = 
    missionDifficultySerializer(difficulty)
    ;
    json['durationMinutes'] = nativeToJson<int>(durationMinutes);
    json['updatedAt'] = updatedAt.toJson();
    json['category'] = category.toJson();
    if (course != null) {
      json['course'] = course!.toJson();
    }
    return json;
  }

  AdminListMyMissionsMissions({
    required this.id,
    required this.title,
    required this.difficulty,
    required this.durationMinutes,
    required this.updatedAt,
    required this.category,
    this.course,
  });
}

@immutable
class AdminListMyMissionsMissionsCategory {
  final String name;
  AdminListMyMissionsMissionsCategory.fromJson(dynamic json):
  
  name = nativeFromJson<String>(json['name']);
  @override
  bool operator ==(Object other) {
    if(identical(this, other)) {
      return true;
    }
    if(other.runtimeType != runtimeType) {
      return false;
    }

    final AdminListMyMissionsMissionsCategory otherTyped = other as AdminListMyMissionsMissionsCategory;
    return name == otherTyped.name;
    
  }
  @override
  int get hashCode => name.hashCode;
  

  Map<String, dynamic> toJson() {
    Map<String, dynamic> json = {};
    json['name'] = nativeToJson<String>(name);
    return json;
  }

  AdminListMyMissionsMissionsCategory({
    required this.name,
  });
}

@immutable
class AdminListMyMissionsMissionsCourse {
  final String id;
  final String title;
  AdminListMyMissionsMissionsCourse.fromJson(dynamic json):
  
  id = nativeFromJson<String>(json['id']),
  title = nativeFromJson<String>(json['title']);
  @override
  bool operator ==(Object other) {
    if(identical(this, other)) {
      return true;
    }
    if(other.runtimeType != runtimeType) {
      return false;
    }

    final AdminListMyMissionsMissionsCourse otherTyped = other as AdminListMyMissionsMissionsCourse;
    return id == otherTyped.id && 
    title == otherTyped.title;
    
  }
  @override
  int get hashCode => Object.hashAll([id.hashCode, title.hashCode]);
  

  Map<String, dynamic> toJson() {
    Map<String, dynamic> json = {};
    json['id'] = nativeToJson<String>(id);
    json['title'] = nativeToJson<String>(title);
    return json;
  }

  AdminListMyMissionsMissionsCourse({
    required this.id,
    required this.title,
  });
}

@immutable
class AdminListMyMissionsData {
  final List<AdminListMyMissionsMissions> missions;
  AdminListMyMissionsData.fromJson(dynamic json):
  
  missions = (json['missions'] as List<dynamic>)
        .map((e) => AdminListMyMissionsMissions.fromJson(e))
        .toList();
  @override
  bool operator ==(Object other) {
    if(identical(this, other)) {
      return true;
    }
    if(other.runtimeType != runtimeType) {
      return false;
    }

    final AdminListMyMissionsData otherTyped = other as AdminListMyMissionsData;
    return missions == otherTyped.missions;
    
  }
  @override
  int get hashCode => missions.hashCode;
  

  Map<String, dynamic> toJson() {
    Map<String, dynamic> json = {};
    json['missions'] = missions.map((e) => e.toJson()).toList();
    return json;
  }

  AdminListMyMissionsData({
    required this.missions,
  });
}

