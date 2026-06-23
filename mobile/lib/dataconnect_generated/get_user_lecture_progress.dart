part of 'generated.dart';

class GetUserLectureProgressVariablesBuilder {
  String lectureId;

  final FirebaseDataConnect _dataConnect;
  GetUserLectureProgressVariablesBuilder(this._dataConnect, {required  this.lectureId,});
  Deserializer<GetUserLectureProgressData> dataDeserializer = (dynamic json)  => GetUserLectureProgressData.fromJson(jsonDecode(json));
  Serializer<GetUserLectureProgressVariables> varsSerializer = (GetUserLectureProgressVariables vars) => jsonEncode(vars.toJson());
  Future<QueryResult<GetUserLectureProgressData, GetUserLectureProgressVariables>> execute({QueryFetchPolicy fetchPolicy = QueryFetchPolicy.preferCache}) {
    return ref().execute(fetchPolicy: fetchPolicy);
  }

  QueryRef<GetUserLectureProgressData, GetUserLectureProgressVariables> ref() {
    GetUserLectureProgressVariables vars= GetUserLectureProgressVariables(lectureId: lectureId,);
    return _dataConnect.query('GetUserLectureProgress', dataDeserializer, varsSerializer, vars);
  }
}

@immutable
class GetUserLectureProgressLectureProgresses {
  final int lastWatchedSecond;
  final Timestamp? completedAt;
  GetUserLectureProgressLectureProgresses.fromJson(dynamic json):
  
  lastWatchedSecond = nativeFromJson<int>(json['lastWatchedSecond']),
  completedAt = json['completedAt'] == null ? null : Timestamp.fromJson(json['completedAt']);
  @override
  bool operator ==(Object other) {
    if(identical(this, other)) {
      return true;
    }
    if(other.runtimeType != runtimeType) {
      return false;
    }

    final GetUserLectureProgressLectureProgresses otherTyped = other as GetUserLectureProgressLectureProgresses;
    return lastWatchedSecond == otherTyped.lastWatchedSecond && 
    completedAt == otherTyped.completedAt;
    
  }
  @override
  int get hashCode => Object.hashAll([lastWatchedSecond.hashCode, completedAt.hashCode]);
  

  Map<String, dynamic> toJson() {
    Map<String, dynamic> json = {};
    json['lastWatchedSecond'] = nativeToJson<int>(lastWatchedSecond);
    if (completedAt != null) {
      json['completedAt'] = completedAt!.toJson();
    }
    return json;
  }

  GetUserLectureProgressLectureProgresses({
    required this.lastWatchedSecond,
    this.completedAt,
  });
}

@immutable
class GetUserLectureProgressData {
  final List<GetUserLectureProgressLectureProgresses> lectureProgresses;
  GetUserLectureProgressData.fromJson(dynamic json):
  
  lectureProgresses = (json['lectureProgresses'] as List<dynamic>)
        .map((e) => GetUserLectureProgressLectureProgresses.fromJson(e))
        .toList();
  @override
  bool operator ==(Object other) {
    if(identical(this, other)) {
      return true;
    }
    if(other.runtimeType != runtimeType) {
      return false;
    }

    final GetUserLectureProgressData otherTyped = other as GetUserLectureProgressData;
    return lectureProgresses == otherTyped.lectureProgresses;
    
  }
  @override
  int get hashCode => lectureProgresses.hashCode;
  

  Map<String, dynamic> toJson() {
    Map<String, dynamic> json = {};
    json['lectureProgresses'] = lectureProgresses.map((e) => e.toJson()).toList();
    return json;
  }

  GetUserLectureProgressData({
    required this.lectureProgresses,
  });
}

@immutable
class GetUserLectureProgressVariables {
  final String lectureId;
  @Deprecated('fromJson is deprecated for Variable classes as they are no longer required for deserialization.')
  GetUserLectureProgressVariables.fromJson(Map<String, dynamic> json):
  
  lectureId = nativeFromJson<String>(json['lectureId']);
  @override
  bool operator ==(Object other) {
    if(identical(this, other)) {
      return true;
    }
    if(other.runtimeType != runtimeType) {
      return false;
    }

    final GetUserLectureProgressVariables otherTyped = other as GetUserLectureProgressVariables;
    return lectureId == otherTyped.lectureId;
    
  }
  @override
  int get hashCode => lectureId.hashCode;
  

  Map<String, dynamic> toJson() {
    Map<String, dynamic> json = {};
    json['lectureId'] = nativeToJson<String>(lectureId);
    return json;
  }

  GetUserLectureProgressVariables({
    required this.lectureId,
  });
}

