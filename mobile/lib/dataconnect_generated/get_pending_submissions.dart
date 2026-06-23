part of 'generated.dart';

class GetPendingSubmissionsVariablesBuilder {
  
  final FirebaseDataConnect _dataConnect;
  GetPendingSubmissionsVariablesBuilder(this._dataConnect, );
  Deserializer<GetPendingSubmissionsData> dataDeserializer = (dynamic json)  => GetPendingSubmissionsData.fromJson(jsonDecode(json));
  
  Future<QueryResult<GetPendingSubmissionsData, void>> execute({QueryFetchPolicy fetchPolicy = QueryFetchPolicy.preferCache}) {
    return ref().execute(fetchPolicy: fetchPolicy);
  }

  QueryRef<GetPendingSubmissionsData, void> ref() {
    
    return _dataConnect.query('GetPendingSubmissions', dataDeserializer, emptySerializer, null);
  }
}

@immutable
class GetPendingSubmissionsMissionSubmissions {
  final String id;
  final String fileUrl;
  final Timestamp submittedAt;
  final int attemptNumber;
  final GetPendingSubmissionsMissionSubmissionsStudent student;
  final GetPendingSubmissionsMissionSubmissionsMission mission;
  GetPendingSubmissionsMissionSubmissions.fromJson(dynamic json):
  
  id = nativeFromJson<String>(json['id']),
  fileUrl = nativeFromJson<String>(json['fileUrl']),
  submittedAt = Timestamp.fromJson(json['submittedAt']),
  attemptNumber = nativeFromJson<int>(json['attemptNumber']),
  student = GetPendingSubmissionsMissionSubmissionsStudent.fromJson(json['student']),
  mission = GetPendingSubmissionsMissionSubmissionsMission.fromJson(json['mission']);
  @override
  bool operator ==(Object other) {
    if(identical(this, other)) {
      return true;
    }
    if(other.runtimeType != runtimeType) {
      return false;
    }

    final GetPendingSubmissionsMissionSubmissions otherTyped = other as GetPendingSubmissionsMissionSubmissions;
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

  GetPendingSubmissionsMissionSubmissions({
    required this.id,
    required this.fileUrl,
    required this.submittedAt,
    required this.attemptNumber,
    required this.student,
    required this.mission,
  });
}

@immutable
class GetPendingSubmissionsMissionSubmissionsStudent {
  final String name;
  final String email;
  GetPendingSubmissionsMissionSubmissionsStudent.fromJson(dynamic json):
  
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

    final GetPendingSubmissionsMissionSubmissionsStudent otherTyped = other as GetPendingSubmissionsMissionSubmissionsStudent;
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

  GetPendingSubmissionsMissionSubmissionsStudent({
    required this.name,
    required this.email,
  });
}

@immutable
class GetPendingSubmissionsMissionSubmissionsMission {
  final String title;
  final EnumValue<MissionDifficulty> difficulty;
  final GetPendingSubmissionsMissionSubmissionsMissionCourse? course;
  GetPendingSubmissionsMissionSubmissionsMission.fromJson(dynamic json):
  
  title = nativeFromJson<String>(json['title']),
  difficulty = missionDifficultyDeserializer(json['difficulty']),
  course = json['course'] == null ? null : GetPendingSubmissionsMissionSubmissionsMissionCourse.fromJson(json['course']);
  @override
  bool operator ==(Object other) {
    if(identical(this, other)) {
      return true;
    }
    if(other.runtimeType != runtimeType) {
      return false;
    }

    final GetPendingSubmissionsMissionSubmissionsMission otherTyped = other as GetPendingSubmissionsMissionSubmissionsMission;
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

  GetPendingSubmissionsMissionSubmissionsMission({
    required this.title,
    required this.difficulty,
    this.course,
  });
}

@immutable
class GetPendingSubmissionsMissionSubmissionsMissionCourse {
  final String title;
  GetPendingSubmissionsMissionSubmissionsMissionCourse.fromJson(dynamic json):
  
  title = nativeFromJson<String>(json['title']);
  @override
  bool operator ==(Object other) {
    if(identical(this, other)) {
      return true;
    }
    if(other.runtimeType != runtimeType) {
      return false;
    }

    final GetPendingSubmissionsMissionSubmissionsMissionCourse otherTyped = other as GetPendingSubmissionsMissionSubmissionsMissionCourse;
    return title == otherTyped.title;
    
  }
  @override
  int get hashCode => title.hashCode;
  

  Map<String, dynamic> toJson() {
    Map<String, dynamic> json = {};
    json['title'] = nativeToJson<String>(title);
    return json;
  }

  GetPendingSubmissionsMissionSubmissionsMissionCourse({
    required this.title,
  });
}

@immutable
class GetPendingSubmissionsData {
  final List<GetPendingSubmissionsMissionSubmissions> missionSubmissions;
  GetPendingSubmissionsData.fromJson(dynamic json):
  
  missionSubmissions = (json['missionSubmissions'] as List<dynamic>)
        .map((e) => GetPendingSubmissionsMissionSubmissions.fromJson(e))
        .toList();
  @override
  bool operator ==(Object other) {
    if(identical(this, other)) {
      return true;
    }
    if(other.runtimeType != runtimeType) {
      return false;
    }

    final GetPendingSubmissionsData otherTyped = other as GetPendingSubmissionsData;
    return missionSubmissions == otherTyped.missionSubmissions;
    
  }
  @override
  int get hashCode => missionSubmissions.hashCode;
  

  Map<String, dynamic> toJson() {
    Map<String, dynamic> json = {};
    json['missionSubmissions'] = missionSubmissions.map((e) => e.toJson()).toList();
    return json;
  }

  GetPendingSubmissionsData({
    required this.missionSubmissions,
  });
}

