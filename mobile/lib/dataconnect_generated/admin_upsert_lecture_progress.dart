part of 'generated.dart';

class AdminUpsertLectureProgressVariablesBuilder {
  String userId;
  String lectureId;
  int lastWatchedSecond;
  Optional<Timestamp> _completedAt = Optional.optional((json) => json['completedAt'] = Timestamp.fromJson(json['completedAt']), defaultSerializer);

  final FirebaseDataConnect _dataConnect;  AdminUpsertLectureProgressVariablesBuilder completedAt(Timestamp? t) {
   _completedAt.value = t;
   return this;
  }

  AdminUpsertLectureProgressVariablesBuilder(this._dataConnect, {required  this.userId,required  this.lectureId,required  this.lastWatchedSecond,});
  Deserializer<AdminUpsertLectureProgressData> dataDeserializer = (dynamic json)  => AdminUpsertLectureProgressData.fromJson(jsonDecode(json));
  Serializer<AdminUpsertLectureProgressVariables> varsSerializer = (AdminUpsertLectureProgressVariables vars) => jsonEncode(vars.toJson());
  Future<OperationResult<AdminUpsertLectureProgressData, AdminUpsertLectureProgressVariables>> execute() {
    return ref().execute();
  }

  MutationRef<AdminUpsertLectureProgressData, AdminUpsertLectureProgressVariables> ref() {
    AdminUpsertLectureProgressVariables vars= AdminUpsertLectureProgressVariables(userId: userId,lectureId: lectureId,lastWatchedSecond: lastWatchedSecond,completedAt: _completedAt,);
    return _dataConnect.mutation("AdminUpsertLectureProgress", dataDeserializer, varsSerializer, vars);
  }
}

@immutable
class AdminUpsertLectureProgressLectureProgressUpsert {
  final String userId;
  final String lectureId;
  AdminUpsertLectureProgressLectureProgressUpsert.fromJson(dynamic json):
  
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

    final AdminUpsertLectureProgressLectureProgressUpsert otherTyped = other as AdminUpsertLectureProgressLectureProgressUpsert;
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

  AdminUpsertLectureProgressLectureProgressUpsert({
    required this.userId,
    required this.lectureId,
  });
}

@immutable
class AdminUpsertLectureProgressData {
  final AdminUpsertLectureProgressLectureProgressUpsert lectureProgress_upsert;
  AdminUpsertLectureProgressData.fromJson(dynamic json):
  
  lectureProgress_upsert = AdminUpsertLectureProgressLectureProgressUpsert.fromJson(json['lectureProgress_upsert']);
  @override
  bool operator ==(Object other) {
    if(identical(this, other)) {
      return true;
    }
    if(other.runtimeType != runtimeType) {
      return false;
    }

    final AdminUpsertLectureProgressData otherTyped = other as AdminUpsertLectureProgressData;
    return lectureProgress_upsert == otherTyped.lectureProgress_upsert;
    
  }
  @override
  int get hashCode => lectureProgress_upsert.hashCode;
  

  Map<String, dynamic> toJson() {
    Map<String, dynamic> json = {};
    json['lectureProgress_upsert'] = lectureProgress_upsert.toJson();
    return json;
  }

  AdminUpsertLectureProgressData({
    required this.lectureProgress_upsert,
  });
}

@immutable
class AdminUpsertLectureProgressVariables {
  final String userId;
  final String lectureId;
  final int lastWatchedSecond;
  late final Optional<Timestamp>completedAt;
  @Deprecated('fromJson is deprecated for Variable classes as they are no longer required for deserialization.')
  AdminUpsertLectureProgressVariables.fromJson(Map<String, dynamic> json):
  
  userId = nativeFromJson<String>(json['userId']),
  lectureId = nativeFromJson<String>(json['lectureId']),
  lastWatchedSecond = nativeFromJson<int>(json['lastWatchedSecond']) {
  
  
  
  
  
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

    final AdminUpsertLectureProgressVariables otherTyped = other as AdminUpsertLectureProgressVariables;
    return userId == otherTyped.userId && 
    lectureId == otherTyped.lectureId && 
    lastWatchedSecond == otherTyped.lastWatchedSecond && 
    completedAt == otherTyped.completedAt;
    
  }
  @override
  int get hashCode => Object.hashAll([userId.hashCode, lectureId.hashCode, lastWatchedSecond.hashCode, completedAt.hashCode]);
  

  Map<String, dynamic> toJson() {
    Map<String, dynamic> json = {};
    json['userId'] = nativeToJson<String>(userId);
    json['lectureId'] = nativeToJson<String>(lectureId);
    json['lastWatchedSecond'] = nativeToJson<int>(lastWatchedSecond);
    if(completedAt.state == OptionalState.set) {
      json['completedAt'] = completedAt.toJson();
    }
    return json;
  }

  AdminUpsertLectureProgressVariables({
    required this.userId,
    required this.lectureId,
    required this.lastWatchedSecond,
    required this.completedAt,
  });
}

