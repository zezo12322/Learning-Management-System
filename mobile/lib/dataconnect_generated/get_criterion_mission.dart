part of 'generated.dart';

class GetCriterionMissionVariablesBuilder {
  String criterionId;

  final FirebaseDataConnect _dataConnect;
  GetCriterionMissionVariablesBuilder(this._dataConnect, {required  this.criterionId,});
  Deserializer<GetCriterionMissionData> dataDeserializer = (dynamic json)  => GetCriterionMissionData.fromJson(jsonDecode(json));
  Serializer<GetCriterionMissionVariables> varsSerializer = (GetCriterionMissionVariables vars) => jsonEncode(vars.toJson());
  Future<QueryResult<GetCriterionMissionData, GetCriterionMissionVariables>> execute({QueryFetchPolicy fetchPolicy = QueryFetchPolicy.preferCache}) {
    return ref().execute(fetchPolicy: fetchPolicy);
  }

  QueryRef<GetCriterionMissionData, GetCriterionMissionVariables> ref() {
    GetCriterionMissionVariables vars= GetCriterionMissionVariables(criterionId: criterionId,);
    return _dataConnect.query("GetCriterionMission", dataDeserializer, varsSerializer, vars);
  }
}

@immutable
class GetCriterionMissionRubricCriterion {
  final GetCriterionMissionRubricCriterionMission mission;
  GetCriterionMissionRubricCriterion.fromJson(dynamic json):
  
  mission = GetCriterionMissionRubricCriterionMission.fromJson(json['mission']);
  @override
  bool operator ==(Object other) {
    if(identical(this, other)) {
      return true;
    }
    if(other.runtimeType != runtimeType) {
      return false;
    }

    final GetCriterionMissionRubricCriterion otherTyped = other as GetCriterionMissionRubricCriterion;
    return mission == otherTyped.mission;
    
  }
  @override
  int get hashCode => mission.hashCode;
  

  Map<String, dynamic> toJson() {
    Map<String, dynamic> json = {};
    json['mission'] = mission.toJson();
    return json;
  }

  GetCriterionMissionRubricCriterion({
    required this.mission,
  });
}

@immutable
class GetCriterionMissionRubricCriterionMission {
  final String id;
  final GetCriterionMissionRubricCriterionMissionAuthor author;
  final GetCriterionMissionRubricCriterionMissionCreatedBy createdBy;
  final GetCriterionMissionRubricCriterionMissionCourse? course;
  GetCriterionMissionRubricCriterionMission.fromJson(dynamic json):
  
  id = nativeFromJson<String>(json['id']),
  author = GetCriterionMissionRubricCriterionMissionAuthor.fromJson(json['author']),
  createdBy = GetCriterionMissionRubricCriterionMissionCreatedBy.fromJson(json['createdBy']),
  course = json['course'] == null ? null : GetCriterionMissionRubricCriterionMissionCourse.fromJson(json['course']);
  @override
  bool operator ==(Object other) {
    if(identical(this, other)) {
      return true;
    }
    if(other.runtimeType != runtimeType) {
      return false;
    }

    final GetCriterionMissionRubricCriterionMission otherTyped = other as GetCriterionMissionRubricCriterionMission;
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

  GetCriterionMissionRubricCriterionMission({
    required this.id,
    required this.author,
    required this.createdBy,
    this.course,
  });
}

@immutable
class GetCriterionMissionRubricCriterionMissionAuthor {
  final String id;
  GetCriterionMissionRubricCriterionMissionAuthor.fromJson(dynamic json):
  
  id = nativeFromJson<String>(json['id']);
  @override
  bool operator ==(Object other) {
    if(identical(this, other)) {
      return true;
    }
    if(other.runtimeType != runtimeType) {
      return false;
    }

    final GetCriterionMissionRubricCriterionMissionAuthor otherTyped = other as GetCriterionMissionRubricCriterionMissionAuthor;
    return id == otherTyped.id;
    
  }
  @override
  int get hashCode => id.hashCode;
  

  Map<String, dynamic> toJson() {
    Map<String, dynamic> json = {};
    json['id'] = nativeToJson<String>(id);
    return json;
  }

  GetCriterionMissionRubricCriterionMissionAuthor({
    required this.id,
  });
}

@immutable
class GetCriterionMissionRubricCriterionMissionCreatedBy {
  final String id;
  GetCriterionMissionRubricCriterionMissionCreatedBy.fromJson(dynamic json):
  
  id = nativeFromJson<String>(json['id']);
  @override
  bool operator ==(Object other) {
    if(identical(this, other)) {
      return true;
    }
    if(other.runtimeType != runtimeType) {
      return false;
    }

    final GetCriterionMissionRubricCriterionMissionCreatedBy otherTyped = other as GetCriterionMissionRubricCriterionMissionCreatedBy;
    return id == otherTyped.id;
    
  }
  @override
  int get hashCode => id.hashCode;
  

  Map<String, dynamic> toJson() {
    Map<String, dynamic> json = {};
    json['id'] = nativeToJson<String>(id);
    return json;
  }

  GetCriterionMissionRubricCriterionMissionCreatedBy({
    required this.id,
  });
}

@immutable
class GetCriterionMissionRubricCriterionMissionCourse {
  final String id;
  final GetCriterionMissionRubricCriterionMissionCourseAuthor author;
  final GetCriterionMissionRubricCriterionMissionCourseCreatedBy createdBy;
  GetCriterionMissionRubricCriterionMissionCourse.fromJson(dynamic json):
  
  id = nativeFromJson<String>(json['id']),
  author = GetCriterionMissionRubricCriterionMissionCourseAuthor.fromJson(json['author']),
  createdBy = GetCriterionMissionRubricCriterionMissionCourseCreatedBy.fromJson(json['createdBy']);
  @override
  bool operator ==(Object other) {
    if(identical(this, other)) {
      return true;
    }
    if(other.runtimeType != runtimeType) {
      return false;
    }

    final GetCriterionMissionRubricCriterionMissionCourse otherTyped = other as GetCriterionMissionRubricCriterionMissionCourse;
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

  GetCriterionMissionRubricCriterionMissionCourse({
    required this.id,
    required this.author,
    required this.createdBy,
  });
}

@immutable
class GetCriterionMissionRubricCriterionMissionCourseAuthor {
  final String id;
  GetCriterionMissionRubricCriterionMissionCourseAuthor.fromJson(dynamic json):
  
  id = nativeFromJson<String>(json['id']);
  @override
  bool operator ==(Object other) {
    if(identical(this, other)) {
      return true;
    }
    if(other.runtimeType != runtimeType) {
      return false;
    }

    final GetCriterionMissionRubricCriterionMissionCourseAuthor otherTyped = other as GetCriterionMissionRubricCriterionMissionCourseAuthor;
    return id == otherTyped.id;
    
  }
  @override
  int get hashCode => id.hashCode;
  

  Map<String, dynamic> toJson() {
    Map<String, dynamic> json = {};
    json['id'] = nativeToJson<String>(id);
    return json;
  }

  GetCriterionMissionRubricCriterionMissionCourseAuthor({
    required this.id,
  });
}

@immutable
class GetCriterionMissionRubricCriterionMissionCourseCreatedBy {
  final String id;
  GetCriterionMissionRubricCriterionMissionCourseCreatedBy.fromJson(dynamic json):
  
  id = nativeFromJson<String>(json['id']);
  @override
  bool operator ==(Object other) {
    if(identical(this, other)) {
      return true;
    }
    if(other.runtimeType != runtimeType) {
      return false;
    }

    final GetCriterionMissionRubricCriterionMissionCourseCreatedBy otherTyped = other as GetCriterionMissionRubricCriterionMissionCourseCreatedBy;
    return id == otherTyped.id;
    
  }
  @override
  int get hashCode => id.hashCode;
  

  Map<String, dynamic> toJson() {
    Map<String, dynamic> json = {};
    json['id'] = nativeToJson<String>(id);
    return json;
  }

  GetCriterionMissionRubricCriterionMissionCourseCreatedBy({
    required this.id,
  });
}

@immutable
class GetCriterionMissionData {
  final GetCriterionMissionRubricCriterion? rubricCriterion;
  GetCriterionMissionData.fromJson(dynamic json):
  
  rubricCriterion = json['rubricCriterion'] == null ? null : GetCriterionMissionRubricCriterion.fromJson(json['rubricCriterion']);
  @override
  bool operator ==(Object other) {
    if(identical(this, other)) {
      return true;
    }
    if(other.runtimeType != runtimeType) {
      return false;
    }

    final GetCriterionMissionData otherTyped = other as GetCriterionMissionData;
    return rubricCriterion == otherTyped.rubricCriterion;
    
  }
  @override
  int get hashCode => rubricCriterion.hashCode;
  

  Map<String, dynamic> toJson() {
    Map<String, dynamic> json = {};
    if (rubricCriterion != null) {
      json['rubricCriterion'] = rubricCriterion!.toJson();
    }
    return json;
  }

  GetCriterionMissionData({
    this.rubricCriterion,
  });
}

@immutable
class GetCriterionMissionVariables {
  final String criterionId;
  @Deprecated('fromJson is deprecated for Variable classes as they are no longer required for deserialization.')
  GetCriterionMissionVariables.fromJson(Map<String, dynamic> json):
  
  criterionId = nativeFromJson<String>(json['criterionId']);
  @override
  bool operator ==(Object other) {
    if(identical(this, other)) {
      return true;
    }
    if(other.runtimeType != runtimeType) {
      return false;
    }

    final GetCriterionMissionVariables otherTyped = other as GetCriterionMissionVariables;
    return criterionId == otherTyped.criterionId;
    
  }
  @override
  int get hashCode => criterionId.hashCode;
  

  Map<String, dynamic> toJson() {
    Map<String, dynamic> json = {};
    json['criterionId'] = nativeToJson<String>(criterionId);
    return json;
  }

  GetCriterionMissionVariables({
    required this.criterionId,
  });
}

