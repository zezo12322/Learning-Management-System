part of 'generated.dart';

class MySubmissionsVariablesBuilder {
  
  final FirebaseDataConnect _dataConnect;
  MySubmissionsVariablesBuilder(this._dataConnect, );
  Deserializer<MySubmissionsData> dataDeserializer = (dynamic json)  => MySubmissionsData.fromJson(jsonDecode(json));
  
  Future<QueryResult<MySubmissionsData, void>> execute({QueryFetchPolicy fetchPolicy = QueryFetchPolicy.preferCache}) {
    return ref().execute(fetchPolicy: fetchPolicy);
  }

  QueryRef<MySubmissionsData, void> ref() {
    
    return _dataConnect.query("MySubmissions", dataDeserializer, emptySerializer, null);
  }
}

@immutable
class MySubmissionsMissionSubmissions {
  final String id;
  final String fileUrl;
  final String? feedback;
  final AnyValue? criteriaScores;
  final Timestamp? submittedAt;
  final MySubmissionsMissionSubmissionsMission mission;
  MySubmissionsMissionSubmissions.fromJson(dynamic json):
  
  id = nativeFromJson<String>(json['id']),
  fileUrl = nativeFromJson<String>(json['fileUrl']),
  feedback = json['feedback'] == null ? null : nativeFromJson<String>(json['feedback']),
  criteriaScores = json['criteriaScores'] == null ? null : AnyValue.fromJson(json['criteriaScores']),
  submittedAt = json['submittedAt'] == null ? null : Timestamp.fromJson(json['submittedAt']),
  mission = MySubmissionsMissionSubmissionsMission.fromJson(json['mission']);
  @override
  bool operator ==(Object other) {
    if(identical(this, other)) {
      return true;
    }
    if(other.runtimeType != runtimeType) {
      return false;
    }

    final MySubmissionsMissionSubmissions otherTyped = other as MySubmissionsMissionSubmissions;
    return id == otherTyped.id && 
    fileUrl == otherTyped.fileUrl && 
    feedback == otherTyped.feedback && 
    criteriaScores == otherTyped.criteriaScores && 
    submittedAt == otherTyped.submittedAt && 
    mission == otherTyped.mission;
    
  }
  @override
  int get hashCode => Object.hashAll([id.hashCode, fileUrl.hashCode, feedback.hashCode, criteriaScores.hashCode, submittedAt.hashCode, mission.hashCode]);
  

  Map<String, dynamic> toJson() {
    Map<String, dynamic> json = {};
    json['id'] = nativeToJson<String>(id);
    json['fileUrl'] = nativeToJson<String>(fileUrl);
    if (feedback != null) {
      json['feedback'] = nativeToJson<String?>(feedback);
    }
    if (criteriaScores != null) {
      json['criteriaScores'] = criteriaScores!.toJson();
    }
    if (submittedAt != null) {
      json['submittedAt'] = submittedAt!.toJson();
    }
    json['mission'] = mission.toJson();
    return json;
  }

  MySubmissionsMissionSubmissions({
    required this.id,
    required this.fileUrl,
    this.feedback,
    this.criteriaScores,
    this.submittedAt,
    required this.mission,
  });
}

@immutable
class MySubmissionsMissionSubmissionsMission {
  final String title;
  final String difficulty;
  MySubmissionsMissionSubmissionsMission.fromJson(dynamic json):
  
  title = nativeFromJson<String>(json['title']),
  difficulty = nativeFromJson<String>(json['difficulty']);
  @override
  bool operator ==(Object other) {
    if(identical(this, other)) {
      return true;
    }
    if(other.runtimeType != runtimeType) {
      return false;
    }

    final MySubmissionsMissionSubmissionsMission otherTyped = other as MySubmissionsMissionSubmissionsMission;
    return title == otherTyped.title && 
    difficulty == otherTyped.difficulty;
    
  }
  @override
  int get hashCode => Object.hashAll([title.hashCode, difficulty.hashCode]);
  

  Map<String, dynamic> toJson() {
    Map<String, dynamic> json = {};
    json['title'] = nativeToJson<String>(title);
    json['difficulty'] = nativeToJson<String>(difficulty);
    return json;
  }

  MySubmissionsMissionSubmissionsMission({
    required this.title,
    required this.difficulty,
  });
}

@immutable
class MySubmissionsData {
  final List<MySubmissionsMissionSubmissions> missionSubmissions;
  MySubmissionsData.fromJson(dynamic json):
  
  missionSubmissions = (json['missionSubmissions'] as List<dynamic>)
        .map((e) => MySubmissionsMissionSubmissions.fromJson(e))
        .toList();
  @override
  bool operator ==(Object other) {
    if(identical(this, other)) {
      return true;
    }
    if(other.runtimeType != runtimeType) {
      return false;
    }

    final MySubmissionsData otherTyped = other as MySubmissionsData;
    return missionSubmissions == otherTyped.missionSubmissions;
    
  }
  @override
  int get hashCode => missionSubmissions.hashCode;
  

  Map<String, dynamic> toJson() {
    Map<String, dynamic> json = {};
    json['missionSubmissions'] = missionSubmissions.map((e) => e.toJson()).toList();
    return json;
  }

  MySubmissionsData({
    required this.missionSubmissions,
  });
}

