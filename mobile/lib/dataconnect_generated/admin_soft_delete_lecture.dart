part of 'generated.dart';

class AdminSoftDeleteLectureVariablesBuilder {
  String lectureId;

  final FirebaseDataConnect _dataConnect;
  AdminSoftDeleteLectureVariablesBuilder(this._dataConnect, {required  this.lectureId,});
  Deserializer<AdminSoftDeleteLectureData> dataDeserializer = (dynamic json)  => AdminSoftDeleteLectureData.fromJson(jsonDecode(json));
  Serializer<AdminSoftDeleteLectureVariables> varsSerializer = (AdminSoftDeleteLectureVariables vars) => jsonEncode(vars.toJson());
  Future<OperationResult<AdminSoftDeleteLectureData, AdminSoftDeleteLectureVariables>> execute() {
    return ref().execute();
  }

  MutationRef<AdminSoftDeleteLectureData, AdminSoftDeleteLectureVariables> ref() {
    AdminSoftDeleteLectureVariables vars= AdminSoftDeleteLectureVariables(lectureId: lectureId,);
    return _dataConnect.mutation("AdminSoftDeleteLecture", dataDeserializer, varsSerializer, vars);
  }
}

@immutable
class AdminSoftDeleteLectureCourseLectureUpdate {
  final String id;
  AdminSoftDeleteLectureCourseLectureUpdate.fromJson(dynamic json):
  
  id = nativeFromJson<String>(json['id']);
  @override
  bool operator ==(Object other) {
    if(identical(this, other)) {
      return true;
    }
    if(other.runtimeType != runtimeType) {
      return false;
    }

    final AdminSoftDeleteLectureCourseLectureUpdate otherTyped = other as AdminSoftDeleteLectureCourseLectureUpdate;
    return id == otherTyped.id;
    
  }
  @override
  int get hashCode => id.hashCode;
  

  Map<String, dynamic> toJson() {
    Map<String, dynamic> json = {};
    json['id'] = nativeToJson<String>(id);
    return json;
  }

  AdminSoftDeleteLectureCourseLectureUpdate({
    required this.id,
  });
}

@immutable
class AdminSoftDeleteLectureData {
  final AdminSoftDeleteLectureCourseLectureUpdate? courseLecture_update;
  AdminSoftDeleteLectureData.fromJson(dynamic json):
  
  courseLecture_update = json['courseLecture_update'] == null ? null : AdminSoftDeleteLectureCourseLectureUpdate.fromJson(json['courseLecture_update']);
  @override
  bool operator ==(Object other) {
    if(identical(this, other)) {
      return true;
    }
    if(other.runtimeType != runtimeType) {
      return false;
    }

    final AdminSoftDeleteLectureData otherTyped = other as AdminSoftDeleteLectureData;
    return courseLecture_update == otherTyped.courseLecture_update;
    
  }
  @override
  int get hashCode => courseLecture_update.hashCode;
  

  Map<String, dynamic> toJson() {
    Map<String, dynamic> json = {};
    if (courseLecture_update != null) {
      json['courseLecture_update'] = courseLecture_update!.toJson();
    }
    return json;
  }

  AdminSoftDeleteLectureData({
    this.courseLecture_update,
  });
}

@immutable
class AdminSoftDeleteLectureVariables {
  final String lectureId;
  @Deprecated('fromJson is deprecated for Variable classes as they are no longer required for deserialization.')
  AdminSoftDeleteLectureVariables.fromJson(Map<String, dynamic> json):
  
  lectureId = nativeFromJson<String>(json['lectureId']);
  @override
  bool operator ==(Object other) {
    if(identical(this, other)) {
      return true;
    }
    if(other.runtimeType != runtimeType) {
      return false;
    }

    final AdminSoftDeleteLectureVariables otherTyped = other as AdminSoftDeleteLectureVariables;
    return lectureId == otherTyped.lectureId;
    
  }
  @override
  int get hashCode => lectureId.hashCode;
  

  Map<String, dynamic> toJson() {
    Map<String, dynamic> json = {};
    json['lectureId'] = nativeToJson<String>(lectureId);
    return json;
  }

  AdminSoftDeleteLectureVariables({
    required this.lectureId,
  });
}

