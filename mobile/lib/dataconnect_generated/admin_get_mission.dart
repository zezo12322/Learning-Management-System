part of 'generated.dart';

class AdminGetMissionVariablesBuilder {
  String missionId;

  final FirebaseDataConnect _dataConnect;
  AdminGetMissionVariablesBuilder(this._dataConnect, {required  this.missionId,});
  Deserializer<AdminGetMissionData> dataDeserializer = (dynamic json)  => AdminGetMissionData.fromJson(jsonDecode(json));
  Serializer<AdminGetMissionVariables> varsSerializer = (AdminGetMissionVariables vars) => jsonEncode(vars.toJson());
  Future<QueryResult<AdminGetMissionData, AdminGetMissionVariables>> execute({QueryFetchPolicy fetchPolicy = QueryFetchPolicy.preferCache}) {
    return ref().execute(fetchPolicy: fetchPolicy);
  }

  QueryRef<AdminGetMissionData, AdminGetMissionVariables> ref() {
    AdminGetMissionVariables vars= AdminGetMissionVariables(missionId: missionId,);
    return _dataConnect.query('AdminGetMission', dataDeserializer, varsSerializer, vars);
  }
}

@immutable
class AdminGetMissionMission {
  final String id;
  final String title;
  final String scenarioDescription;
  final int durationMinutes;
  final EnumValue<MissionDifficulty> difficulty;
  final List<String> skillsTested;
  final Timestamp? deletedAt;
  final Timestamp createdAt;
  final Timestamp updatedAt;
  final AdminGetMissionMissionCategory category;
  final AdminGetMissionMissionCourse? course;
  final AdminGetMissionMissionAuthor author;
  final AdminGetMissionMissionCreatedBy createdBy;
  final List<AdminGetMissionMissionMicroLessons> microLessons;
  final List<AdminGetMissionMissionTemplates> templates;
  final List<AdminGetMissionMissionCriteria> criteria;
  AdminGetMissionMission.fromJson(dynamic json):
  
  id = nativeFromJson<String>(json['id']),
  title = nativeFromJson<String>(json['title']),
  scenarioDescription = nativeFromJson<String>(json['scenarioDescription']),
  durationMinutes = nativeFromJson<int>(json['durationMinutes']),
  difficulty = missionDifficultyDeserializer(json['difficulty']),
  skillsTested = (json['skillsTested'] as List<dynamic>)
        .map((e) => nativeFromJson<String>(e))
        .toList(),
  deletedAt = json['deletedAt'] == null ? null : Timestamp.fromJson(json['deletedAt']),
  createdAt = Timestamp.fromJson(json['createdAt']),
  updatedAt = Timestamp.fromJson(json['updatedAt']),
  category = AdminGetMissionMissionCategory.fromJson(json['category']),
  course = json['course'] == null ? null : AdminGetMissionMissionCourse.fromJson(json['course']),
  author = AdminGetMissionMissionAuthor.fromJson(json['author']),
  createdBy = AdminGetMissionMissionCreatedBy.fromJson(json['createdBy']),
  microLessons = (json['microLessons'] as List<dynamic>)
        .map((e) => AdminGetMissionMissionMicroLessons.fromJson(e))
        .toList(),
  templates = (json['templates'] as List<dynamic>)
        .map((e) => AdminGetMissionMissionTemplates.fromJson(e))
        .toList(),
  criteria = (json['criteria'] as List<dynamic>)
        .map((e) => AdminGetMissionMissionCriteria.fromJson(e))
        .toList();
  @override
  bool operator ==(Object other) {
    if(identical(this, other)) {
      return true;
    }
    if(other.runtimeType != runtimeType) {
      return false;
    }

    final AdminGetMissionMission otherTyped = other as AdminGetMissionMission;
    return id == otherTyped.id && 
    title == otherTyped.title && 
    scenarioDescription == otherTyped.scenarioDescription && 
    durationMinutes == otherTyped.durationMinutes && 
    difficulty == otherTyped.difficulty && 
    skillsTested == otherTyped.skillsTested && 
    deletedAt == otherTyped.deletedAt && 
    createdAt == otherTyped.createdAt && 
    updatedAt == otherTyped.updatedAt && 
    category == otherTyped.category && 
    course == otherTyped.course && 
    author == otherTyped.author && 
    createdBy == otherTyped.createdBy && 
    microLessons == otherTyped.microLessons && 
    templates == otherTyped.templates && 
    criteria == otherTyped.criteria;
    
  }
  @override
  int get hashCode => Object.hashAll([id.hashCode, title.hashCode, scenarioDescription.hashCode, durationMinutes.hashCode, difficulty.hashCode, skillsTested.hashCode, deletedAt.hashCode, createdAt.hashCode, updatedAt.hashCode, category.hashCode, course.hashCode, author.hashCode, createdBy.hashCode, microLessons.hashCode, templates.hashCode, criteria.hashCode]);
  

  Map<String, dynamic> toJson() {
    Map<String, dynamic> json = {};
    json['id'] = nativeToJson<String>(id);
    json['title'] = nativeToJson<String>(title);
    json['scenarioDescription'] = nativeToJson<String>(scenarioDescription);
    json['durationMinutes'] = nativeToJson<int>(durationMinutes);
    json['difficulty'] = 
    missionDifficultySerializer(difficulty)
    ;
    json['skillsTested'] = skillsTested.map((e) => nativeToJson<String>(e)).toList();
    if (deletedAt != null) {
      json['deletedAt'] = deletedAt!.toJson();
    }
    json['createdAt'] = createdAt.toJson();
    json['updatedAt'] = updatedAt.toJson();
    json['category'] = category.toJson();
    if (course != null) {
      json['course'] = course!.toJson();
    }
    json['author'] = author.toJson();
    json['createdBy'] = createdBy.toJson();
    json['microLessons'] = microLessons.map((e) => e.toJson()).toList();
    json['templates'] = templates.map((e) => e.toJson()).toList();
    json['criteria'] = criteria.map((e) => e.toJson()).toList();
    return json;
  }

  AdminGetMissionMission({
    required this.id,
    required this.title,
    required this.scenarioDescription,
    required this.durationMinutes,
    required this.difficulty,
    required this.skillsTested,
    this.deletedAt,
    required this.createdAt,
    required this.updatedAt,
    required this.category,
    this.course,
    required this.author,
    required this.createdBy,
    required this.microLessons,
    required this.templates,
    required this.criteria,
  });
}

@immutable
class AdminGetMissionMissionCategory {
  final String id;
  final String name;
  AdminGetMissionMissionCategory.fromJson(dynamic json):
  
  id = nativeFromJson<String>(json['id']),
  name = nativeFromJson<String>(json['name']);
  @override
  bool operator ==(Object other) {
    if(identical(this, other)) {
      return true;
    }
    if(other.runtimeType != runtimeType) {
      return false;
    }

    final AdminGetMissionMissionCategory otherTyped = other as AdminGetMissionMissionCategory;
    return id == otherTyped.id && 
    name == otherTyped.name;
    
  }
  @override
  int get hashCode => Object.hashAll([id.hashCode, name.hashCode]);
  

  Map<String, dynamic> toJson() {
    Map<String, dynamic> json = {};
    json['id'] = nativeToJson<String>(id);
    json['name'] = nativeToJson<String>(name);
    return json;
  }

  AdminGetMissionMissionCategory({
    required this.id,
    required this.name,
  });
}

@immutable
class AdminGetMissionMissionCourse {
  final String id;
  final String title;
  AdminGetMissionMissionCourse.fromJson(dynamic json):
  
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

    final AdminGetMissionMissionCourse otherTyped = other as AdminGetMissionMissionCourse;
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

  AdminGetMissionMissionCourse({
    required this.id,
    required this.title,
  });
}

@immutable
class AdminGetMissionMissionAuthor {
  final String id;
  final String name;
  final String email;
  final String? avatar;
  AdminGetMissionMissionAuthor.fromJson(dynamic json):
  
  id = nativeFromJson<String>(json['id']),
  name = nativeFromJson<String>(json['name']),
  email = nativeFromJson<String>(json['email']),
  avatar = json['avatar'] == null ? null : nativeFromJson<String>(json['avatar']);
  @override
  bool operator ==(Object other) {
    if(identical(this, other)) {
      return true;
    }
    if(other.runtimeType != runtimeType) {
      return false;
    }

    final AdminGetMissionMissionAuthor otherTyped = other as AdminGetMissionMissionAuthor;
    return id == otherTyped.id && 
    name == otherTyped.name && 
    email == otherTyped.email && 
    avatar == otherTyped.avatar;
    
  }
  @override
  int get hashCode => Object.hashAll([id.hashCode, name.hashCode, email.hashCode, avatar.hashCode]);
  

  Map<String, dynamic> toJson() {
    Map<String, dynamic> json = {};
    json['id'] = nativeToJson<String>(id);
    json['name'] = nativeToJson<String>(name);
    json['email'] = nativeToJson<String>(email);
    if (avatar != null) {
      json['avatar'] = nativeToJson<String?>(avatar);
    }
    return json;
  }

  AdminGetMissionMissionAuthor({
    required this.id,
    required this.name,
    required this.email,
    this.avatar,
  });
}

@immutable
class AdminGetMissionMissionCreatedBy {
  final String id;
  final String name;
  AdminGetMissionMissionCreatedBy.fromJson(dynamic json):
  
  id = nativeFromJson<String>(json['id']),
  name = nativeFromJson<String>(json['name']);
  @override
  bool operator ==(Object other) {
    if(identical(this, other)) {
      return true;
    }
    if(other.runtimeType != runtimeType) {
      return false;
    }

    final AdminGetMissionMissionCreatedBy otherTyped = other as AdminGetMissionMissionCreatedBy;
    return id == otherTyped.id && 
    name == otherTyped.name;
    
  }
  @override
  int get hashCode => Object.hashAll([id.hashCode, name.hashCode]);
  

  Map<String, dynamic> toJson() {
    Map<String, dynamic> json = {};
    json['id'] = nativeToJson<String>(id);
    json['name'] = nativeToJson<String>(name);
    return json;
  }

  AdminGetMissionMissionCreatedBy({
    required this.id,
    required this.name,
  });
}

@immutable
class AdminGetMissionMissionMicroLessons {
  final String id;
  final String title;
  final EnumValue<LectureType> type;
  final String? assetUrl;
  final String? content;
  final int? durationSeconds;
  final int order;
  AdminGetMissionMissionMicroLessons.fromJson(dynamic json):
  
  id = nativeFromJson<String>(json['id']),
  title = nativeFromJson<String>(json['title']),
  type = lectureTypeDeserializer(json['type']),
  assetUrl = json['assetUrl'] == null ? null : nativeFromJson<String>(json['assetUrl']),
  content = json['content'] == null ? null : nativeFromJson<String>(json['content']),
  durationSeconds = json['durationSeconds'] == null ? null : nativeFromJson<int>(json['durationSeconds']),
  order = nativeFromJson<int>(json['order']);
  @override
  bool operator ==(Object other) {
    if(identical(this, other)) {
      return true;
    }
    if(other.runtimeType != runtimeType) {
      return false;
    }

    final AdminGetMissionMissionMicroLessons otherTyped = other as AdminGetMissionMissionMicroLessons;
    return id == otherTyped.id && 
    title == otherTyped.title && 
    type == otherTyped.type && 
    assetUrl == otherTyped.assetUrl && 
    content == otherTyped.content && 
    durationSeconds == otherTyped.durationSeconds && 
    order == otherTyped.order;
    
  }
  @override
  int get hashCode => Object.hashAll([id.hashCode, title.hashCode, type.hashCode, assetUrl.hashCode, content.hashCode, durationSeconds.hashCode, order.hashCode]);
  

  Map<String, dynamic> toJson() {
    Map<String, dynamic> json = {};
    json['id'] = nativeToJson<String>(id);
    json['title'] = nativeToJson<String>(title);
    json['type'] = 
    lectureTypeSerializer(type)
    ;
    if (assetUrl != null) {
      json['assetUrl'] = nativeToJson<String?>(assetUrl);
    }
    if (content != null) {
      json['content'] = nativeToJson<String?>(content);
    }
    if (durationSeconds != null) {
      json['durationSeconds'] = nativeToJson<int?>(durationSeconds);
    }
    json['order'] = nativeToJson<int>(order);
    return json;
  }

  AdminGetMissionMissionMicroLessons({
    required this.id,
    required this.title,
    required this.type,
    this.assetUrl,
    this.content,
    this.durationSeconds,
    required this.order,
  });
}

@immutable
class AdminGetMissionMissionTemplates {
  final String id;
  final String title;
  final String fileUrl;
  final String fileType;
  AdminGetMissionMissionTemplates.fromJson(dynamic json):
  
  id = nativeFromJson<String>(json['id']),
  title = nativeFromJson<String>(json['title']),
  fileUrl = nativeFromJson<String>(json['fileUrl']),
  fileType = nativeFromJson<String>(json['fileType']);
  @override
  bool operator ==(Object other) {
    if(identical(this, other)) {
      return true;
    }
    if(other.runtimeType != runtimeType) {
      return false;
    }

    final AdminGetMissionMissionTemplates otherTyped = other as AdminGetMissionMissionTemplates;
    return id == otherTyped.id && 
    title == otherTyped.title && 
    fileUrl == otherTyped.fileUrl && 
    fileType == otherTyped.fileType;
    
  }
  @override
  int get hashCode => Object.hashAll([id.hashCode, title.hashCode, fileUrl.hashCode, fileType.hashCode]);
  

  Map<String, dynamic> toJson() {
    Map<String, dynamic> json = {};
    json['id'] = nativeToJson<String>(id);
    json['title'] = nativeToJson<String>(title);
    json['fileUrl'] = nativeToJson<String>(fileUrl);
    json['fileType'] = nativeToJson<String>(fileType);
    return json;
  }

  AdminGetMissionMissionTemplates({
    required this.id,
    required this.title,
    required this.fileUrl,
    required this.fileType,
  });
}

@immutable
class AdminGetMissionMissionCriteria {
  final String id;
  final String criterionName;
  final String? description;
  final double maxPoints;
  final int order;
  AdminGetMissionMissionCriteria.fromJson(dynamic json):
  
  id = nativeFromJson<String>(json['id']),
  criterionName = nativeFromJson<String>(json['criterionName']),
  description = json['description'] == null ? null : nativeFromJson<String>(json['description']),
  maxPoints = nativeFromJson<double>(json['maxPoints']),
  order = nativeFromJson<int>(json['order']);
  @override
  bool operator ==(Object other) {
    if(identical(this, other)) {
      return true;
    }
    if(other.runtimeType != runtimeType) {
      return false;
    }

    final AdminGetMissionMissionCriteria otherTyped = other as AdminGetMissionMissionCriteria;
    return id == otherTyped.id && 
    criterionName == otherTyped.criterionName && 
    description == otherTyped.description && 
    maxPoints == otherTyped.maxPoints && 
    order == otherTyped.order;
    
  }
  @override
  int get hashCode => Object.hashAll([id.hashCode, criterionName.hashCode, description.hashCode, maxPoints.hashCode, order.hashCode]);
  

  Map<String, dynamic> toJson() {
    Map<String, dynamic> json = {};
    json['id'] = nativeToJson<String>(id);
    json['criterionName'] = nativeToJson<String>(criterionName);
    if (description != null) {
      json['description'] = nativeToJson<String?>(description);
    }
    json['maxPoints'] = nativeToJson<double>(maxPoints);
    json['order'] = nativeToJson<int>(order);
    return json;
  }

  AdminGetMissionMissionCriteria({
    required this.id,
    required this.criterionName,
    this.description,
    required this.maxPoints,
    required this.order,
  });
}

@immutable
class AdminGetMissionData {
  final AdminGetMissionMission? mission;
  AdminGetMissionData.fromJson(dynamic json):
  
  mission = json['mission'] == null ? null : AdminGetMissionMission.fromJson(json['mission']);
  @override
  bool operator ==(Object other) {
    if(identical(this, other)) {
      return true;
    }
    if(other.runtimeType != runtimeType) {
      return false;
    }

    final AdminGetMissionData otherTyped = other as AdminGetMissionData;
    return mission == otherTyped.mission;
    
  }
  @override
  int get hashCode => mission.hashCode;
  

  Map<String, dynamic> toJson() {
    Map<String, dynamic> json = {};
    if (mission != null) {
      json['mission'] = mission!.toJson();
    }
    return json;
  }

  AdminGetMissionData({
    this.mission,
  });
}

@immutable
class AdminGetMissionVariables {
  final String missionId;
  @Deprecated('fromJson is deprecated for Variable classes as they are no longer required for deserialization.')
  AdminGetMissionVariables.fromJson(Map<String, dynamic> json):
  
  missionId = nativeFromJson<String>(json['missionId']);
  @override
  bool operator ==(Object other) {
    if(identical(this, other)) {
      return true;
    }
    if(other.runtimeType != runtimeType) {
      return false;
    }

    final AdminGetMissionVariables otherTyped = other as AdminGetMissionVariables;
    return missionId == otherTyped.missionId;
    
  }
  @override
  int get hashCode => missionId.hashCode;
  

  Map<String, dynamic> toJson() {
    Map<String, dynamic> json = {};
    json['missionId'] = nativeToJson<String>(missionId);
    return json;
  }

  AdminGetMissionVariables({
    required this.missionId,
  });
}

