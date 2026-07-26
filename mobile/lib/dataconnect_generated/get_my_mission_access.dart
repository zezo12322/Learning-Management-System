part of 'generated.dart';

class GetMyMissionAccessVariablesBuilder {
  String missionId;

  final FirebaseDataConnect _dataConnect;
  GetMyMissionAccessVariablesBuilder(this._dataConnect, {required  this.missionId,});
  Deserializer<GetMyMissionAccessData> dataDeserializer = (dynamic json)  => GetMyMissionAccessData.fromJson(jsonDecode(json));
  Serializer<GetMyMissionAccessVariables> varsSerializer = (GetMyMissionAccessVariables vars) => jsonEncode(vars.toJson());
  Future<QueryResult<GetMyMissionAccessData, GetMyMissionAccessVariables>> execute({QueryFetchPolicy fetchPolicy = QueryFetchPolicy.preferCache}) {
    return ref().execute(fetchPolicy: fetchPolicy);
  }

  QueryRef<GetMyMissionAccessData, GetMyMissionAccessVariables> ref() {
    GetMyMissionAccessVariables vars= GetMyMissionAccessVariables(missionId: missionId,);
    return _dataConnect.query("GetMyMissionAccess", dataDeserializer, varsSerializer, vars);
  }
}

@immutable
class GetMyMissionAccessMission {
  final String id;
  final GetMyMissionAccessMissionAuthor author;
  final GetMyMissionAccessMissionCreatedBy createdBy;
  final GetMyMissionAccessMissionCourse? course;
  GetMyMissionAccessMission.fromJson(dynamic json):
  
  id = nativeFromJson<String>(json['id']),
  author = GetMyMissionAccessMissionAuthor.fromJson(json['author']),
  createdBy = GetMyMissionAccessMissionCreatedBy.fromJson(json['createdBy']),
  course = json['course'] == null ? null : GetMyMissionAccessMissionCourse.fromJson(json['course']);
  @override
  bool operator ==(Object other) {
    if(identical(this, other)) {
      return true;
    }
    if(other.runtimeType != runtimeType) {
      return false;
    }

    final GetMyMissionAccessMission otherTyped = other as GetMyMissionAccessMission;
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

  GetMyMissionAccessMission({
    required this.id,
    required this.author,
    required this.createdBy,
    this.course,
  });
}

@immutable
class GetMyMissionAccessMissionAuthor {
  final String id;
  GetMyMissionAccessMissionAuthor.fromJson(dynamic json):
  
  id = nativeFromJson<String>(json['id']);
  @override
  bool operator ==(Object other) {
    if(identical(this, other)) {
      return true;
    }
    if(other.runtimeType != runtimeType) {
      return false;
    }

    final GetMyMissionAccessMissionAuthor otherTyped = other as GetMyMissionAccessMissionAuthor;
    return id == otherTyped.id;
    
  }
  @override
  int get hashCode => id.hashCode;
  

  Map<String, dynamic> toJson() {
    Map<String, dynamic> json = {};
    json['id'] = nativeToJson<String>(id);
    return json;
  }

  GetMyMissionAccessMissionAuthor({
    required this.id,
  });
}

@immutable
class GetMyMissionAccessMissionCreatedBy {
  final String id;
  GetMyMissionAccessMissionCreatedBy.fromJson(dynamic json):
  
  id = nativeFromJson<String>(json['id']);
  @override
  bool operator ==(Object other) {
    if(identical(this, other)) {
      return true;
    }
    if(other.runtimeType != runtimeType) {
      return false;
    }

    final GetMyMissionAccessMissionCreatedBy otherTyped = other as GetMyMissionAccessMissionCreatedBy;
    return id == otherTyped.id;
    
  }
  @override
  int get hashCode => id.hashCode;
  

  Map<String, dynamic> toJson() {
    Map<String, dynamic> json = {};
    json['id'] = nativeToJson<String>(id);
    return json;
  }

  GetMyMissionAccessMissionCreatedBy({
    required this.id,
  });
}

@immutable
class GetMyMissionAccessMissionCourse {
  final String id;
  final GetMyMissionAccessMissionCourseAuthor author;
  final GetMyMissionAccessMissionCourseCreatedBy createdBy;
  final List<GetMyMissionAccessMissionCourseMyMissionCourseInstructorLink> myMissionCourseInstructorLink;
  GetMyMissionAccessMissionCourse.fromJson(dynamic json):
  
  id = nativeFromJson<String>(json['id']),
  author = GetMyMissionAccessMissionCourseAuthor.fromJson(json['author']),
  createdBy = GetMyMissionAccessMissionCourseCreatedBy.fromJson(json['createdBy']),
  myMissionCourseInstructorLink = (json['myMissionCourseInstructorLink'] as List<dynamic>)
        .map((e) => GetMyMissionAccessMissionCourseMyMissionCourseInstructorLink.fromJson(e))
        .toList();
  @override
  bool operator ==(Object other) {
    if(identical(this, other)) {
      return true;
    }
    if(other.runtimeType != runtimeType) {
      return false;
    }

    final GetMyMissionAccessMissionCourse otherTyped = other as GetMyMissionAccessMissionCourse;
    return id == otherTyped.id && 
    author == otherTyped.author && 
    createdBy == otherTyped.createdBy && 
    myMissionCourseInstructorLink == otherTyped.myMissionCourseInstructorLink;
    
  }
  @override
  int get hashCode => Object.hashAll([id.hashCode, author.hashCode, createdBy.hashCode, myMissionCourseInstructorLink.hashCode]);
  

  Map<String, dynamic> toJson() {
    Map<String, dynamic> json = {};
    json['id'] = nativeToJson<String>(id);
    json['author'] = author.toJson();
    json['createdBy'] = createdBy.toJson();
    json['myMissionCourseInstructorLink'] = myMissionCourseInstructorLink.map((e) => e.toJson()).toList();
    return json;
  }

  GetMyMissionAccessMissionCourse({
    required this.id,
    required this.author,
    required this.createdBy,
    required this.myMissionCourseInstructorLink,
  });
}

@immutable
class GetMyMissionAccessMissionCourseAuthor {
  final String id;
  GetMyMissionAccessMissionCourseAuthor.fromJson(dynamic json):
  
  id = nativeFromJson<String>(json['id']);
  @override
  bool operator ==(Object other) {
    if(identical(this, other)) {
      return true;
    }
    if(other.runtimeType != runtimeType) {
      return false;
    }

    final GetMyMissionAccessMissionCourseAuthor otherTyped = other as GetMyMissionAccessMissionCourseAuthor;
    return id == otherTyped.id;
    
  }
  @override
  int get hashCode => id.hashCode;
  

  Map<String, dynamic> toJson() {
    Map<String, dynamic> json = {};
    json['id'] = nativeToJson<String>(id);
    return json;
  }

  GetMyMissionAccessMissionCourseAuthor({
    required this.id,
  });
}

@immutable
class GetMyMissionAccessMissionCourseCreatedBy {
  final String id;
  GetMyMissionAccessMissionCourseCreatedBy.fromJson(dynamic json):
  
  id = nativeFromJson<String>(json['id']);
  @override
  bool operator ==(Object other) {
    if(identical(this, other)) {
      return true;
    }
    if(other.runtimeType != runtimeType) {
      return false;
    }

    final GetMyMissionAccessMissionCourseCreatedBy otherTyped = other as GetMyMissionAccessMissionCourseCreatedBy;
    return id == otherTyped.id;
    
  }
  @override
  int get hashCode => id.hashCode;
  

  Map<String, dynamic> toJson() {
    Map<String, dynamic> json = {};
    json['id'] = nativeToJson<String>(id);
    return json;
  }

  GetMyMissionAccessMissionCourseCreatedBy({
    required this.id,
  });
}

@immutable
class GetMyMissionAccessMissionCourseMyMissionCourseInstructorLink {
  final GetMyMissionAccessMissionCourseMyMissionCourseInstructorLinkUser user;
  GetMyMissionAccessMissionCourseMyMissionCourseInstructorLink.fromJson(dynamic json):
  
  user = GetMyMissionAccessMissionCourseMyMissionCourseInstructorLinkUser.fromJson(json['user']);
  @override
  bool operator ==(Object other) {
    if(identical(this, other)) {
      return true;
    }
    if(other.runtimeType != runtimeType) {
      return false;
    }

    final GetMyMissionAccessMissionCourseMyMissionCourseInstructorLink otherTyped = other as GetMyMissionAccessMissionCourseMyMissionCourseInstructorLink;
    return user == otherTyped.user;
    
  }
  @override
  int get hashCode => user.hashCode;
  

  Map<String, dynamic> toJson() {
    Map<String, dynamic> json = {};
    json['user'] = user.toJson();
    return json;
  }

  GetMyMissionAccessMissionCourseMyMissionCourseInstructorLink({
    required this.user,
  });
}

@immutable
class GetMyMissionAccessMissionCourseMyMissionCourseInstructorLinkUser {
  final String id;
  GetMyMissionAccessMissionCourseMyMissionCourseInstructorLinkUser.fromJson(dynamic json):
  
  id = nativeFromJson<String>(json['id']);
  @override
  bool operator ==(Object other) {
    if(identical(this, other)) {
      return true;
    }
    if(other.runtimeType != runtimeType) {
      return false;
    }

    final GetMyMissionAccessMissionCourseMyMissionCourseInstructorLinkUser otherTyped = other as GetMyMissionAccessMissionCourseMyMissionCourseInstructorLinkUser;
    return id == otherTyped.id;
    
  }
  @override
  int get hashCode => id.hashCode;
  

  Map<String, dynamic> toJson() {
    Map<String, dynamic> json = {};
    json['id'] = nativeToJson<String>(id);
    return json;
  }

  GetMyMissionAccessMissionCourseMyMissionCourseInstructorLinkUser({
    required this.id,
  });
}

@immutable
class GetMyMissionAccessData {
  final GetMyMissionAccessMission? mission;
  GetMyMissionAccessData.fromJson(dynamic json):
  
  mission = json['mission'] == null ? null : GetMyMissionAccessMission.fromJson(json['mission']);
  @override
  bool operator ==(Object other) {
    if(identical(this, other)) {
      return true;
    }
    if(other.runtimeType != runtimeType) {
      return false;
    }

    final GetMyMissionAccessData otherTyped = other as GetMyMissionAccessData;
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

  GetMyMissionAccessData({
    this.mission,
  });
}

@immutable
class GetMyMissionAccessVariables {
  final String missionId;
  @Deprecated('fromJson is deprecated for Variable classes as they are no longer required for deserialization.')
  GetMyMissionAccessVariables.fromJson(Map<String, dynamic> json):
  
  missionId = nativeFromJson<String>(json['missionId']);
  @override
  bool operator ==(Object other) {
    if(identical(this, other)) {
      return true;
    }
    if(other.runtimeType != runtimeType) {
      return false;
    }

    final GetMyMissionAccessVariables otherTyped = other as GetMyMissionAccessVariables;
    return missionId == otherTyped.missionId;
    
  }
  @override
  int get hashCode => missionId.hashCode;
  

  Map<String, dynamic> toJson() {
    Map<String, dynamic> json = {};
    json['missionId'] = nativeToJson<String>(missionId);
    return json;
  }

  GetMyMissionAccessVariables({
    required this.missionId,
  });
}

