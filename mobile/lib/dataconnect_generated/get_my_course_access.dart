part of 'generated.dart';

class GetMyCourseAccessVariablesBuilder {
  String courseId;

  final FirebaseDataConnect _dataConnect;
  GetMyCourseAccessVariablesBuilder(this._dataConnect, {required  this.courseId,});
  Deserializer<GetMyCourseAccessData> dataDeserializer = (dynamic json)  => GetMyCourseAccessData.fromJson(jsonDecode(json));
  Serializer<GetMyCourseAccessVariables> varsSerializer = (GetMyCourseAccessVariables vars) => jsonEncode(vars.toJson());
  Future<QueryResult<GetMyCourseAccessData, GetMyCourseAccessVariables>> execute({QueryFetchPolicy fetchPolicy = QueryFetchPolicy.preferCache}) {
    return ref().execute(fetchPolicy: fetchPolicy);
  }

  QueryRef<GetMyCourseAccessData, GetMyCourseAccessVariables> ref() {
    GetMyCourseAccessVariables vars= GetMyCourseAccessVariables(courseId: courseId,);
    return _dataConnect.query("GetMyCourseAccess", dataDeserializer, varsSerializer, vars);
  }
}

@immutable
class GetMyCourseAccessCourse {
  final String id;
  final GetMyCourseAccessCourseAuthor author;
  final GetMyCourseAccessCourseCreatedBy createdBy;
  final List<GetMyCourseAccessCourseMyInstructorLink> myInstructorLink;
  GetMyCourseAccessCourse.fromJson(dynamic json):
  
  id = nativeFromJson<String>(json['id']),
  author = GetMyCourseAccessCourseAuthor.fromJson(json['author']),
  createdBy = GetMyCourseAccessCourseCreatedBy.fromJson(json['createdBy']),
  myInstructorLink = (json['myInstructorLink'] as List<dynamic>)
        .map((e) => GetMyCourseAccessCourseMyInstructorLink.fromJson(e))
        .toList();
  @override
  bool operator ==(Object other) {
    if(identical(this, other)) {
      return true;
    }
    if(other.runtimeType != runtimeType) {
      return false;
    }

    final GetMyCourseAccessCourse otherTyped = other as GetMyCourseAccessCourse;
    return id == otherTyped.id && 
    author == otherTyped.author && 
    createdBy == otherTyped.createdBy && 
    myInstructorLink == otherTyped.myInstructorLink;
    
  }
  @override
  int get hashCode => Object.hashAll([id.hashCode, author.hashCode, createdBy.hashCode, myInstructorLink.hashCode]);
  

  Map<String, dynamic> toJson() {
    Map<String, dynamic> json = {};
    json['id'] = nativeToJson<String>(id);
    json['author'] = author.toJson();
    json['createdBy'] = createdBy.toJson();
    json['myInstructorLink'] = myInstructorLink.map((e) => e.toJson()).toList();
    return json;
  }

  GetMyCourseAccessCourse({
    required this.id,
    required this.author,
    required this.createdBy,
    required this.myInstructorLink,
  });
}

@immutable
class GetMyCourseAccessCourseAuthor {
  final String id;
  GetMyCourseAccessCourseAuthor.fromJson(dynamic json):
  
  id = nativeFromJson<String>(json['id']);
  @override
  bool operator ==(Object other) {
    if(identical(this, other)) {
      return true;
    }
    if(other.runtimeType != runtimeType) {
      return false;
    }

    final GetMyCourseAccessCourseAuthor otherTyped = other as GetMyCourseAccessCourseAuthor;
    return id == otherTyped.id;
    
  }
  @override
  int get hashCode => id.hashCode;
  

  Map<String, dynamic> toJson() {
    Map<String, dynamic> json = {};
    json['id'] = nativeToJson<String>(id);
    return json;
  }

  GetMyCourseAccessCourseAuthor({
    required this.id,
  });
}

@immutable
class GetMyCourseAccessCourseCreatedBy {
  final String id;
  GetMyCourseAccessCourseCreatedBy.fromJson(dynamic json):
  
  id = nativeFromJson<String>(json['id']);
  @override
  bool operator ==(Object other) {
    if(identical(this, other)) {
      return true;
    }
    if(other.runtimeType != runtimeType) {
      return false;
    }

    final GetMyCourseAccessCourseCreatedBy otherTyped = other as GetMyCourseAccessCourseCreatedBy;
    return id == otherTyped.id;
    
  }
  @override
  int get hashCode => id.hashCode;
  

  Map<String, dynamic> toJson() {
    Map<String, dynamic> json = {};
    json['id'] = nativeToJson<String>(id);
    return json;
  }

  GetMyCourseAccessCourseCreatedBy({
    required this.id,
  });
}

@immutable
class GetMyCourseAccessCourseMyInstructorLink {
  final GetMyCourseAccessCourseMyInstructorLinkUser user;
  GetMyCourseAccessCourseMyInstructorLink.fromJson(dynamic json):
  
  user = GetMyCourseAccessCourseMyInstructorLinkUser.fromJson(json['user']);
  @override
  bool operator ==(Object other) {
    if(identical(this, other)) {
      return true;
    }
    if(other.runtimeType != runtimeType) {
      return false;
    }

    final GetMyCourseAccessCourseMyInstructorLink otherTyped = other as GetMyCourseAccessCourseMyInstructorLink;
    return user == otherTyped.user;
    
  }
  @override
  int get hashCode => user.hashCode;
  

  Map<String, dynamic> toJson() {
    Map<String, dynamic> json = {};
    json['user'] = user.toJson();
    return json;
  }

  GetMyCourseAccessCourseMyInstructorLink({
    required this.user,
  });
}

@immutable
class GetMyCourseAccessCourseMyInstructorLinkUser {
  final String id;
  GetMyCourseAccessCourseMyInstructorLinkUser.fromJson(dynamic json):
  
  id = nativeFromJson<String>(json['id']);
  @override
  bool operator ==(Object other) {
    if(identical(this, other)) {
      return true;
    }
    if(other.runtimeType != runtimeType) {
      return false;
    }

    final GetMyCourseAccessCourseMyInstructorLinkUser otherTyped = other as GetMyCourseAccessCourseMyInstructorLinkUser;
    return id == otherTyped.id;
    
  }
  @override
  int get hashCode => id.hashCode;
  

  Map<String, dynamic> toJson() {
    Map<String, dynamic> json = {};
    json['id'] = nativeToJson<String>(id);
    return json;
  }

  GetMyCourseAccessCourseMyInstructorLinkUser({
    required this.id,
  });
}

@immutable
class GetMyCourseAccessData {
  final GetMyCourseAccessCourse? course;
  GetMyCourseAccessData.fromJson(dynamic json):
  
  course = json['course'] == null ? null : GetMyCourseAccessCourse.fromJson(json['course']);
  @override
  bool operator ==(Object other) {
    if(identical(this, other)) {
      return true;
    }
    if(other.runtimeType != runtimeType) {
      return false;
    }

    final GetMyCourseAccessData otherTyped = other as GetMyCourseAccessData;
    return course == otherTyped.course;
    
  }
  @override
  int get hashCode => course.hashCode;
  

  Map<String, dynamic> toJson() {
    Map<String, dynamic> json = {};
    if (course != null) {
      json['course'] = course!.toJson();
    }
    return json;
  }

  GetMyCourseAccessData({
    this.course,
  });
}

@immutable
class GetMyCourseAccessVariables {
  final String courseId;
  @Deprecated('fromJson is deprecated for Variable classes as they are no longer required for deserialization.')
  GetMyCourseAccessVariables.fromJson(Map<String, dynamic> json):
  
  courseId = nativeFromJson<String>(json['courseId']);
  @override
  bool operator ==(Object other) {
    if(identical(this, other)) {
      return true;
    }
    if(other.runtimeType != runtimeType) {
      return false;
    }

    final GetMyCourseAccessVariables otherTyped = other as GetMyCourseAccessVariables;
    return courseId == otherTyped.courseId;
    
  }
  @override
  int get hashCode => courseId.hashCode;
  

  Map<String, dynamic> toJson() {
    Map<String, dynamic> json = {};
    json['courseId'] = nativeToJson<String>(courseId);
    return json;
  }

  GetMyCourseAccessVariables({
    required this.courseId,
  });
}

