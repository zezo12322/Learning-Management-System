part of 'generated.dart';

class GetMyPendingSubmissionsVariablesBuilder {
  
  final FirebaseDataConnect _dataConnect;
  GetMyPendingSubmissionsVariablesBuilder(this._dataConnect, );
  Deserializer<GetMyPendingSubmissionsData> dataDeserializer = (dynamic json)  => GetMyPendingSubmissionsData.fromJson(jsonDecode(json));
  
  Future<QueryResult<GetMyPendingSubmissionsData, void>> execute({QueryFetchPolicy fetchPolicy = QueryFetchPolicy.preferCache}) {
    return ref().execute(fetchPolicy: fetchPolicy);
  }

  QueryRef<GetMyPendingSubmissionsData, void> ref() {
    
    return _dataConnect.query("GetMyPendingSubmissions", dataDeserializer, emptySerializer, null);
  }
}

@immutable
class GetMyPendingSubmissionsMissionSubmissions {
  final String id;
  final String fileUrl;
  final Timestamp submittedAt;
  final int attemptNumber;
  final GetMyPendingSubmissionsMissionSubmissionsStudent student;
  final GetMyPendingSubmissionsMissionSubmissionsMission mission;
  GetMyPendingSubmissionsMissionSubmissions.fromJson(dynamic json):
  
  id = nativeFromJson<String>(json['id']),
  fileUrl = nativeFromJson<String>(json['fileUrl']),
  submittedAt = Timestamp.fromJson(json['submittedAt']),
  attemptNumber = nativeFromJson<int>(json['attemptNumber']),
  student = GetMyPendingSubmissionsMissionSubmissionsStudent.fromJson(json['student']),
  mission = GetMyPendingSubmissionsMissionSubmissionsMission.fromJson(json['mission']);
  @override
  bool operator ==(Object other) {
    if(identical(this, other)) {
      return true;
    }
    if(other.runtimeType != runtimeType) {
      return false;
    }

    final GetMyPendingSubmissionsMissionSubmissions otherTyped = other as GetMyPendingSubmissionsMissionSubmissions;
    return id == otherTyped.id && 
    fileUrl == otherTyped.fileUrl && 
    submittedAt == otherTyped.submittedAt && 
    attemptNumber == otherTyped.attemptNumber && 
    student == otherTyped.student && 
    mission == otherTyped.mission;
    
  }
  @override
  int get hashCode => Object.hashAll([id.hashCode, fileUrl.hashCode, submittedAt.hashCode, attemptNumber.hashCode, student.hashCode, mission.hashCode]);
  

  Map<String, dynamic> toJson() {
    Map<String, dynamic> json = {};
    json['id'] = nativeToJson<String>(id);
    json['fileUrl'] = nativeToJson<String>(fileUrl);
    json['submittedAt'] = submittedAt.toJson();
    json['attemptNumber'] = nativeToJson<int>(attemptNumber);
    json['student'] = student.toJson();
    json['mission'] = mission.toJson();
    return json;
  }

  GetMyPendingSubmissionsMissionSubmissions({
    required this.id,
    required this.fileUrl,
    required this.submittedAt,
    required this.attemptNumber,
    required this.student,
    required this.mission,
  });
}

@immutable
class GetMyPendingSubmissionsMissionSubmissionsStudent {
  final String name;
  final String email;
  GetMyPendingSubmissionsMissionSubmissionsStudent.fromJson(dynamic json):
  
  name = nativeFromJson<String>(json['name']),
  email = nativeFromJson<String>(json['email']);
  @override
  bool operator ==(Object other) {
    if(identical(this, other)) {
      return true;
    }
    if(other.runtimeType != runtimeType) {
      return false;
    }

    final GetMyPendingSubmissionsMissionSubmissionsStudent otherTyped = other as GetMyPendingSubmissionsMissionSubmissionsStudent;
    return name == otherTyped.name && 
    email == otherTyped.email;
    
  }
  @override
  int get hashCode => Object.hashAll([name.hashCode, email.hashCode]);
  

  Map<String, dynamic> toJson() {
    Map<String, dynamic> json = {};
    json['name'] = nativeToJson<String>(name);
    json['email'] = nativeToJson<String>(email);
    return json;
  }

  GetMyPendingSubmissionsMissionSubmissionsStudent({
    required this.name,
    required this.email,
  });
}

@immutable
class GetMyPendingSubmissionsMissionSubmissionsMission {
  final String title;
  final EnumValue<MissionDifficulty> difficulty;
  final GetMyPendingSubmissionsMissionSubmissionsMissionCourse? course;
  GetMyPendingSubmissionsMissionSubmissionsMission.fromJson(dynamic json):
  
  title = nativeFromJson<String>(json['title']),
  difficulty = missionDifficultyDeserializer(json['difficulty']),
  course = json['course'] == null ? null : GetMyPendingSubmissionsMissionSubmissionsMissionCourse.fromJson(json['course']);
  @override
  bool operator ==(Object other) {
    if(identical(this, other)) {
      return true;
    }
    if(other.runtimeType != runtimeType) {
      return false;
    }

    final GetMyPendingSubmissionsMissionSubmissionsMission otherTyped = other as GetMyPendingSubmissionsMissionSubmissionsMission;
    return title == otherTyped.title && 
    difficulty == otherTyped.difficulty && 
    course == otherTyped.course;
    
  }
  @override
  int get hashCode => Object.hashAll([title.hashCode, difficulty.hashCode, course.hashCode]);
  

  Map<String, dynamic> toJson() {
    Map<String, dynamic> json = {};
    json['title'] = nativeToJson<String>(title);
    json['difficulty'] = 
    missionDifficultySerializer(difficulty)
    ;
    if (course != null) {
      json['course'] = course!.toJson();
    }
    return json;
  }

  GetMyPendingSubmissionsMissionSubmissionsMission({
    required this.title,
    required this.difficulty,
    this.course,
  });
}

@immutable
class GetMyPendingSubmissionsMissionSubmissionsMissionCourse {
  final String title;
  GetMyPendingSubmissionsMissionSubmissionsMissionCourse.fromJson(dynamic json):
  
  title = nativeFromJson<String>(json['title']);
  @override
  bool operator ==(Object other) {
    if(identical(this, other)) {
      return true;
    }
    if(other.runtimeType != runtimeType) {
      return false;
    }

    final GetMyPendingSubmissionsMissionSubmissionsMissionCourse otherTyped = other as GetMyPendingSubmissionsMissionSubmissionsMissionCourse;
    return title == otherTyped.title;
    
  }
  @override
  int get hashCode => title.hashCode;
  

  Map<String, dynamic> toJson() {
    Map<String, dynamic> json = {};
    json['title'] = nativeToJson<String>(title);
    return json;
  }

  GetMyPendingSubmissionsMissionSubmissionsMissionCourse({
    required this.title,
  });
}

@immutable
class GetMyPendingSubmissionsData {
  final List<GetMyPendingSubmissionsMissionSubmissions> missionSubmissions;
  GetMyPendingSubmissionsData.fromJson(dynamic json):
  
  missionSubmissions = (json['missionSubmissions'] as List<dynamic>)
        .map((e) => GetMyPendingSubmissionsMissionSubmissions.fromJson(e))
        .toList();
  @override
  bool operator ==(Object other) {
    if(identical(this, other)) {
      return true;
    }
    if(other.runtimeType != runtimeType) {
      return false;
    }

    final GetMyPendingSubmissionsData otherTyped = other as GetMyPendingSubmissionsData;
    return missionSubmissions == otherTyped.missionSubmissions;
    
  }
  @override
  int get hashCode => missionSubmissions.hashCode;
  

  Map<String, dynamic> toJson() {
    Map<String, dynamic> json = {};
    json['missionSubmissions'] = missionSubmissions.map((e) => e.toJson()).toList();
    return json;
  }

  GetMyPendingSubmissionsData({
    required this.missionSubmissions,
  });
}

