part of 'generated.dart';

class MySubmissionsVariablesBuilder {
  
  final FirebaseDataConnect _dataConnect;
  MySubmissionsVariablesBuilder(this._dataConnect, );
  Deserializer<MySubmissionsData> dataDeserializer = (dynamic json)  => MySubmissionsData.fromJson(jsonDecode(json));
  
  Future<QueryResult<MySubmissionsData, void>> execute({QueryFetchPolicy fetchPolicy = QueryFetchPolicy.preferCache}) {
    return ref().execute(fetchPolicy: fetchPolicy);
  }

  QueryRef<MySubmissionsData, void> ref() {
    
    return _dataConnect.query('MySubmissions', dataDeserializer, emptySerializer, null);
  }
}

@immutable
class MySubmissionsMissionSubmissions {
  final String id;
  final String fileUrl;
  final EnumValue<SubmissionStatus> status;
  final String? feedback;
  final Timestamp submittedAt;
  final List<MySubmissionsMissionSubmissionsMissionSubmissionScoresOnSubmission> missionSubmissionScores_on_submission;
  final MySubmissionsMissionSubmissionsMission mission;
  MySubmissionsMissionSubmissions.fromJson(dynamic json):
  
  id = nativeFromJson<String>(json['id']),
  fileUrl = nativeFromJson<String>(json['fileUrl']),
  status = submissionStatusDeserializer(json['status']),
  feedback = json['feedback'] == null ? null : nativeFromJson<String>(json['feedback']),
  submittedAt = Timestamp.fromJson(json['submittedAt']),
  missionSubmissionScores_on_submission = (json['missionSubmissionScores_on_submission'] as List<dynamic>)
        .map((e) => MySubmissionsMissionSubmissionsMissionSubmissionScoresOnSubmission.fromJson(e))
        .toList(),
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
    status == otherTyped.status && 
    feedback == otherTyped.feedback && 
    submittedAt == otherTyped.submittedAt && 
    missionSubmissionScores_on_submission == otherTyped.missionSubmissionScores_on_submission && 
    mission == otherTyped.mission;
    
  }
  @override
  int get hashCode => Object.hashAll([id.hashCode, fileUrl.hashCode, status.hashCode, feedback.hashCode, submittedAt.hashCode, missionSubmissionScores_on_submission.hashCode, mission.hashCode]);
  

  Map<String, dynamic> toJson() {
    Map<String, dynamic> json = {};
    json['id'] = nativeToJson<String>(id);
    json['fileUrl'] = nativeToJson<String>(fileUrl);
    json['status'] = 
    submissionStatusSerializer(status)
    ;
    if (feedback != null) {
      json['feedback'] = nativeToJson<String?>(feedback);
    }
    json['submittedAt'] = submittedAt.toJson();
    json['missionSubmissionScores_on_submission'] = missionSubmissionScores_on_submission.map((e) => e.toJson()).toList();
    json['mission'] = mission.toJson();
    return json;
  }

  MySubmissionsMissionSubmissions({
    required this.id,
    required this.fileUrl,
    required this.status,
    this.feedback,
    required this.submittedAt,
    required this.missionSubmissionScores_on_submission,
    required this.mission,
  });
}

@immutable
class MySubmissionsMissionSubmissionsMissionSubmissionScoresOnSubmission {
  final double score;
  final MySubmissionsMissionSubmissionsMissionSubmissionScoresOnSubmissionCriterion criterion;
  MySubmissionsMissionSubmissionsMissionSubmissionScoresOnSubmission.fromJson(dynamic json):
  
  score = nativeFromJson<double>(json['score']),
  criterion = MySubmissionsMissionSubmissionsMissionSubmissionScoresOnSubmissionCriterion.fromJson(json['criterion']);
  @override
  bool operator ==(Object other) {
    if(identical(this, other)) {
      return true;
    }
    if(other.runtimeType != runtimeType) {
      return false;
    }

    final MySubmissionsMissionSubmissionsMissionSubmissionScoresOnSubmission otherTyped = other as MySubmissionsMissionSubmissionsMissionSubmissionScoresOnSubmission;
    return score == otherTyped.score && 
    criterion == otherTyped.criterion;
    
  }
  @override
  int get hashCode => Object.hashAll([score.hashCode, criterion.hashCode]);
  

  Map<String, dynamic> toJson() {
    Map<String, dynamic> json = {};
    json['score'] = nativeToJson<double>(score);
    json['criterion'] = criterion.toJson();
    return json;
  }

  MySubmissionsMissionSubmissionsMissionSubmissionScoresOnSubmission({
    required this.score,
    required this.criterion,
  });
}

@immutable
class MySubmissionsMissionSubmissionsMissionSubmissionScoresOnSubmissionCriterion {
  final String criterionName;
  final double maxPoints;
  MySubmissionsMissionSubmissionsMissionSubmissionScoresOnSubmissionCriterion.fromJson(dynamic json):
  
  criterionName = nativeFromJson<String>(json['criterionName']),
  maxPoints = nativeFromJson<double>(json['maxPoints']);
  @override
  bool operator ==(Object other) {
    if(identical(this, other)) {
      return true;
    }
    if(other.runtimeType != runtimeType) {
      return false;
    }

    final MySubmissionsMissionSubmissionsMissionSubmissionScoresOnSubmissionCriterion otherTyped = other as MySubmissionsMissionSubmissionsMissionSubmissionScoresOnSubmissionCriterion;
    return criterionName == otherTyped.criterionName && 
    maxPoints == otherTyped.maxPoints;
    
  }
  @override
  int get hashCode => Object.hashAll([criterionName.hashCode, maxPoints.hashCode]);
  

  Map<String, dynamic> toJson() {
    Map<String, dynamic> json = {};
    json['criterionName'] = nativeToJson<String>(criterionName);
    json['maxPoints'] = nativeToJson<double>(maxPoints);
    return json;
  }

  MySubmissionsMissionSubmissionsMissionSubmissionScoresOnSubmissionCriterion({
    required this.criterionName,
    required this.maxPoints,
  });
}

@immutable
class MySubmissionsMissionSubmissionsMission {
  final String title;
  final EnumValue<MissionDifficulty> difficulty;
  MySubmissionsMissionSubmissionsMission.fromJson(dynamic json):
  
  title = nativeFromJson<String>(json['title']),
  difficulty = missionDifficultyDeserializer(json['difficulty']);
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
    json['difficulty'] = 
    missionDifficultySerializer(difficulty)
    ;
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

