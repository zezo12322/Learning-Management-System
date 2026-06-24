part of 'generated.dart';

class GetCourseInstructorsVariablesBuilder {
  String courseId;

  final FirebaseDataConnect _dataConnect;
  GetCourseInstructorsVariablesBuilder(this._dataConnect, {required  this.courseId,});
  Deserializer<GetCourseInstructorsData> dataDeserializer = (dynamic json)  => GetCourseInstructorsData.fromJson(jsonDecode(json));
  Serializer<GetCourseInstructorsVariables> varsSerializer = (GetCourseInstructorsVariables vars) => jsonEncode(vars.toJson());
  Future<QueryResult<GetCourseInstructorsData, GetCourseInstructorsVariables>> execute({QueryFetchPolicy fetchPolicy = QueryFetchPolicy.preferCache}) {
    return ref().execute(fetchPolicy: fetchPolicy);
  }

  QueryRef<GetCourseInstructorsData, GetCourseInstructorsVariables> ref() {
    GetCourseInstructorsVariables vars= GetCourseInstructorsVariables(courseId: courseId,);
    return _dataConnect.query("GetCourseInstructors", dataDeserializer, varsSerializer, vars);
  }
}

@immutable
class GetCourseInstructorsCourseInstructors {
  final GetCourseInstructorsCourseInstructorsUser user;
  GetCourseInstructorsCourseInstructors.fromJson(dynamic json):
  
  user = GetCourseInstructorsCourseInstructorsUser.fromJson(json['user']);
  @override
  bool operator ==(Object other) {
    if(identical(this, other)) {
      return true;
    }
    if(other.runtimeType != runtimeType) {
      return false;
    }

    final GetCourseInstructorsCourseInstructors otherTyped = other as GetCourseInstructorsCourseInstructors;
    return user == otherTyped.user;
    
  }
  @override
  int get hashCode => user.hashCode;
  

  Map<String, dynamic> toJson() {
    Map<String, dynamic> json = {};
    json['user'] = user.toJson();
    return json;
  }

  GetCourseInstructorsCourseInstructors({
    required this.user,
  });
}

@immutable
class GetCourseInstructorsCourseInstructorsUser {
  final String id;
  final String name;
  final String email;
  final String? avatar;
  GetCourseInstructorsCourseInstructorsUser.fromJson(dynamic json):
  
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

    final GetCourseInstructorsCourseInstructorsUser otherTyped = other as GetCourseInstructorsCourseInstructorsUser;
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

  GetCourseInstructorsCourseInstructorsUser({
    required this.id,
    required this.name,
    required this.email,
    this.avatar,
  });
}

@immutable
class GetCourseInstructorsData {
  final List<GetCourseInstructorsCourseInstructors> courseInstructors;
  GetCourseInstructorsData.fromJson(dynamic json):
  
  courseInstructors = (json['courseInstructors'] as List<dynamic>)
        .map((e) => GetCourseInstructorsCourseInstructors.fromJson(e))
        .toList();
  @override
  bool operator ==(Object other) {
    if(identical(this, other)) {
      return true;
    }
    if(other.runtimeType != runtimeType) {
      return false;
    }

    final GetCourseInstructorsData otherTyped = other as GetCourseInstructorsData;
    return courseInstructors == otherTyped.courseInstructors;
    
  }
  @override
  int get hashCode => courseInstructors.hashCode;
  

  Map<String, dynamic> toJson() {
    Map<String, dynamic> json = {};
    json['courseInstructors'] = courseInstructors.map((e) => e.toJson()).toList();
    return json;
  }

  GetCourseInstructorsData({
    required this.courseInstructors,
  });
}

@immutable
class GetCourseInstructorsVariables {
  final String courseId;
  @Deprecated('fromJson is deprecated for Variable classes as they are no longer required for deserialization.')
  GetCourseInstructorsVariables.fromJson(Map<String, dynamic> json):
  
  courseId = nativeFromJson<String>(json['courseId']);
  @override
  bool operator ==(Object other) {
    if(identical(this, other)) {
      return true;
    }
    if(other.runtimeType != runtimeType) {
      return false;
    }

    final GetCourseInstructorsVariables otherTyped = other as GetCourseInstructorsVariables;
    return courseId == otherTyped.courseId;
    
  }
  @override
  int get hashCode => courseId.hashCode;
  

  Map<String, dynamic> toJson() {
    Map<String, dynamic> json = {};
    json['courseId'] = nativeToJson<String>(courseId);
    return json;
  }

  GetCourseInstructorsVariables({
    required this.courseId,
  });
}

