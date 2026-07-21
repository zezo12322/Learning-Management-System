part of 'generated.dart';

class UpdateLectureProgressVariablesBuilder {
  String lectureId;
  int lastWatchedSecond;
  Optional<Timestamp> _completedAt = Optional.optional((json) => json['completedAt'] = Timestamp.fromJson(json['completedAt']), defaultSerializer);
  String userId;

  final FirebaseDataConnect _dataConnect;  UpdateLectureProgressVariablesBuilder completedAt(Timestamp? t) {
   _completedAt.value = t;
   return this;
  }

  UpdateLectureProgressVariablesBuilder(this._dataConnect, {required  this.lectureId,required  this.lastWatchedSecond,required  this.userId,});
  Deserializer<UpdateLectureProgressData> dataDeserializer = (dynamic json)  => UpdateLectureProgressData.fromJson(jsonDecode(json));
  Serializer<UpdateLectureProgressVariables> varsSerializer = (UpdateLectureProgressVariables vars) => jsonEncode(vars.toJson());
  Future<OperationResult<UpdateLectureProgressData, UpdateLectureProgressVariables>> execute() {
    return ref().execute();
  }

  MutationRef<UpdateLectureProgressData, UpdateLectureProgressVariables> ref() {
    UpdateLectureProgressVariables vars= UpdateLectureProgressVariables(lectureId: lectureId,lastWatchedSecond: lastWatchedSecond,completedAt: _completedAt,userId: userId,);
    return _dataConnect.mutation("UpdateLectureProgress", dataDeserializer, varsSerializer, vars);
  }
}

@immutable
class UpdateLectureProgressLectureProgressUpsert {
  final String userId;
  final String lectureId;
  UpdateLectureProgressLectureProgressUpsert.fromJson(dynamic json):
  
  userId = nativeFromJson<String>(json['userId']),
  lectureId = nativeFromJson<String>(json['lectureId']);
  @override
  bool operator ==(Object other) {
    if(identical(this, other)) {
      return true;
    }
    if(other.runtimeType != runtimeType) {
      return false;
    }

    final UpdateLectureProgressLectureProgressUpsert otherTyped = other as UpdateLectureProgressLectureProgressUpsert;
    return userId == otherTyped.userId && 
    lectureId == otherTyped.lectureId;
    
  }
  @override
  int get hashCode => Object.hashAll([userId.hashCode, lectureId.hashCode]);
  

  Map<String, dynamic> toJson() {
    Map<String, dynamic> json = {};
    json['userId'] = nativeToJson<String>(userId);
    json['lectureId'] = nativeToJson<String>(lectureId);
    return json;
  }

  UpdateLectureProgressLectureProgressUpsert({
    required this.userId,
    required this.lectureId,
  });
}

@immutable
class UpdateLectureProgressData {
  final UpdateLectureProgressLectureProgressUpsert lectureProgress_upsert;
  UpdateLectureProgressData.fromJson(dynamic json):
  
  lectureProgress_upsert = UpdateLectureProgressLectureProgressUpsert.fromJson(json['lectureProgress_upsert']);
  @override
  bool operator ==(Object other) {
    if(identical(this, other)) {
      return true;
    }
    if(other.runtimeType != runtimeType) {
      return false;
    }

    final UpdateLectureProgressData otherTyped = other as UpdateLectureProgressData;
    return lectureProgress_upsert == otherTyped.lectureProgress_upsert;
    
  }
  @override
  int get hashCode => lectureProgress_upsert.hashCode;
  

  Map<String, dynamic> toJson() {
    Map<String, dynamic> json = {};
    json['lectureProgress_upsert'] = lectureProgress_upsert.toJson();
    return json;
  }

  UpdateLectureProgressData({
    required this.lectureProgress_upsert,
  });
}

@immutable
class UpdateLectureProgressVariables {
  final String lectureId;
  final int lastWatchedSecond;
  late final Optional<Timestamp>completedAt;
  final String userId;
  @Deprecated('fromJson is deprecated for Variable classes as they are no longer required for deserialization.')
  UpdateLectureProgressVariables.fromJson(Map<String, dynamic> json):
  
  lectureId = nativeFromJson<String>(json['lectureId']),
  lastWatchedSecond = nativeFromJson<int>(json['lastWatchedSecond']),
  userId = nativeFromJson<String>(json['userId']) {
  
  
  
  
    completedAt = Optional.optional((json) => json['completedAt'] = Timestamp.fromJson(json['completedAt']), defaultSerializer);
    completedAt.value = json['completedAt'] == null ? null : Timestamp.fromJson(json['completedAt']);
  
  
  }
  @override
  bool operator ==(Object other) {
    if(identical(this, other)) {
      return true;
    }
    if(other.runtimeType != runtimeType) {
      return false;
    }

    final UpdateLectureProgressVariables otherTyped = other as UpdateLectureProgressVariables;
    return lectureId == otherTyped.lectureId && 
    lastWatchedSecond == otherTyped.lastWatchedSecond && 
    completedAt == otherTyped.completedAt && 
    userId == otherTyped.userId;
    
  }
  @override
  int get hashCode => Object.hashAll([lectureId.hashCode, lastWatchedSecond.hashCode, completedAt.hashCode, userId.hashCode]);
  

  Map<String, dynamic> toJson() {
    Map<String, dynamic> json = {};
    json['lectureId'] = nativeToJson<String>(lectureId);
    json['lastWatchedSecond'] = nativeToJson<int>(lastWatchedSecond);
    if(completedAt.state == OptionalState.set) {
      json['completedAt'] = completedAt.toJson();
    }
    json['userId'] = nativeToJson<String>(userId);
    return json;
  }

  UpdateLectureProgressVariables({
    required this.lectureId,
    required this.lastWatchedSecond,
    required this.completedAt,
    required this.userId,
  });
}

