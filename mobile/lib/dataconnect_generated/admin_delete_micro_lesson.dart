part of 'generated.dart';

class AdminDeleteMicroLessonVariablesBuilder {
  String microLessonId;

  final FirebaseDataConnect _dataConnect;
  AdminDeleteMicroLessonVariablesBuilder(this._dataConnect, {required  this.microLessonId,});
  Deserializer<AdminDeleteMicroLessonData> dataDeserializer = (dynamic json)  => AdminDeleteMicroLessonData.fromJson(jsonDecode(json));
  Serializer<AdminDeleteMicroLessonVariables> varsSerializer = (AdminDeleteMicroLessonVariables vars) => jsonEncode(vars.toJson());
  Future<OperationResult<AdminDeleteMicroLessonData, AdminDeleteMicroLessonVariables>> execute() {
    return ref().execute();
  }

  MutationRef<AdminDeleteMicroLessonData, AdminDeleteMicroLessonVariables> ref() {
    AdminDeleteMicroLessonVariables vars= AdminDeleteMicroLessonVariables(microLessonId: microLessonId,);
    return _dataConnect.mutation("AdminDeleteMicroLesson", dataDeserializer, varsSerializer, vars);
  }
}

@immutable
class AdminDeleteMicroLessonMissionMicroLessonDelete {
  final String id;
  AdminDeleteMicroLessonMissionMicroLessonDelete.fromJson(dynamic json):
  
  id = nativeFromJson<String>(json['id']);
  @override
  bool operator ==(Object other) {
    if(identical(this, other)) {
      return true;
    }
    if(other.runtimeType != runtimeType) {
      return false;
    }

    final AdminDeleteMicroLessonMissionMicroLessonDelete otherTyped = other as AdminDeleteMicroLessonMissionMicroLessonDelete;
    return id == otherTyped.id;
    
  }
  @override
  int get hashCode => id.hashCode;
  

  Map<String, dynamic> toJson() {
    Map<String, dynamic> json = {};
    json['id'] = nativeToJson<String>(id);
    return json;
  }

  AdminDeleteMicroLessonMissionMicroLessonDelete({
    required this.id,
  });
}

@immutable
class AdminDeleteMicroLessonData {
  final AdminDeleteMicroLessonMissionMicroLessonDelete? missionMicroLesson_delete;
  AdminDeleteMicroLessonData.fromJson(dynamic json):
  
  missionMicroLesson_delete = json['missionMicroLesson_delete'] == null ? null : AdminDeleteMicroLessonMissionMicroLessonDelete.fromJson(json['missionMicroLesson_delete']);
  @override
  bool operator ==(Object other) {
    if(identical(this, other)) {
      return true;
    }
    if(other.runtimeType != runtimeType) {
      return false;
    }

    final AdminDeleteMicroLessonData otherTyped = other as AdminDeleteMicroLessonData;
    return missionMicroLesson_delete == otherTyped.missionMicroLesson_delete;
    
  }
  @override
  int get hashCode => missionMicroLesson_delete.hashCode;
  

  Map<String, dynamic> toJson() {
    Map<String, dynamic> json = {};
    if (missionMicroLesson_delete != null) {
      json['missionMicroLesson_delete'] = missionMicroLesson_delete!.toJson();
    }
    return json;
  }

  AdminDeleteMicroLessonData({
    this.missionMicroLesson_delete,
  });
}

@immutable
class AdminDeleteMicroLessonVariables {
  final String microLessonId;
  @Deprecated('fromJson is deprecated for Variable classes as they are no longer required for deserialization.')
  AdminDeleteMicroLessonVariables.fromJson(Map<String, dynamic> json):
  
  microLessonId = nativeFromJson<String>(json['microLessonId']);
  @override
  bool operator ==(Object other) {
    if(identical(this, other)) {
      return true;
    }
    if(other.runtimeType != runtimeType) {
      return false;
    }

    final AdminDeleteMicroLessonVariables otherTyped = other as AdminDeleteMicroLessonVariables;
    return microLessonId == otherTyped.microLessonId;
    
  }
  @override
  int get hashCode => microLessonId.hashCode;
  

  Map<String, dynamic> toJson() {
    Map<String, dynamic> json = {};
    json['microLessonId'] = nativeToJson<String>(microLessonId);
    return json;
  }

  AdminDeleteMicroLessonVariables({
    required this.microLessonId,
  });
}

