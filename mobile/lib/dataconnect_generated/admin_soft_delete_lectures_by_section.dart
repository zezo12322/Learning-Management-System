part of 'generated.dart';

class AdminSoftDeleteLecturesBySectionVariablesBuilder {
  String sectionId;

  final FirebaseDataConnect _dataConnect;
  AdminSoftDeleteLecturesBySectionVariablesBuilder(this._dataConnect, {required  this.sectionId,});
  Deserializer<AdminSoftDeleteLecturesBySectionData> dataDeserializer = (dynamic json)  => AdminSoftDeleteLecturesBySectionData.fromJson(jsonDecode(json));
  Serializer<AdminSoftDeleteLecturesBySectionVariables> varsSerializer = (AdminSoftDeleteLecturesBySectionVariables vars) => jsonEncode(vars.toJson());
  Future<OperationResult<AdminSoftDeleteLecturesBySectionData, AdminSoftDeleteLecturesBySectionVariables>> execute() {
    return ref().execute();
  }

  MutationRef<AdminSoftDeleteLecturesBySectionData, AdminSoftDeleteLecturesBySectionVariables> ref() {
    AdminSoftDeleteLecturesBySectionVariables vars= AdminSoftDeleteLecturesBySectionVariables(sectionId: sectionId,);
    return _dataConnect.mutation("AdminSoftDeleteLecturesBySection", dataDeserializer, varsSerializer, vars);
  }
}

@immutable
class AdminSoftDeleteLecturesBySectionData {
  final int courseLecture_updateMany;
  AdminSoftDeleteLecturesBySectionData.fromJson(dynamic json):
  
  courseLecture_updateMany = nativeFromJson<int>(json['courseLecture_updateMany']);
  @override
  bool operator ==(Object other) {
    if(identical(this, other)) {
      return true;
    }
    if(other.runtimeType != runtimeType) {
      return false;
    }

    final AdminSoftDeleteLecturesBySectionData otherTyped = other as AdminSoftDeleteLecturesBySectionData;
    return courseLecture_updateMany == otherTyped.courseLecture_updateMany;
    
  }
  @override
  int get hashCode => courseLecture_updateMany.hashCode;
  

  Map<String, dynamic> toJson() {
    Map<String, dynamic> json = {};
    json['courseLecture_updateMany'] = nativeToJson<int>(courseLecture_updateMany);
    return json;
  }

  AdminSoftDeleteLecturesBySectionData({
    required this.courseLecture_updateMany,
  });
}

@immutable
class AdminSoftDeleteLecturesBySectionVariables {
  final String sectionId;
  @Deprecated('fromJson is deprecated for Variable classes as they are no longer required for deserialization.')
  AdminSoftDeleteLecturesBySectionVariables.fromJson(Map<String, dynamic> json):
  
  sectionId = nativeFromJson<String>(json['sectionId']);
  @override
  bool operator ==(Object other) {
    if(identical(this, other)) {
      return true;
    }
    if(other.runtimeType != runtimeType) {
      return false;
    }

    final AdminSoftDeleteLecturesBySectionVariables otherTyped = other as AdminSoftDeleteLecturesBySectionVariables;
    return sectionId == otherTyped.sectionId;
    
  }
  @override
  int get hashCode => sectionId.hashCode;
  

  Map<String, dynamic> toJson() {
    Map<String, dynamic> json = {};
    json['sectionId'] = nativeToJson<String>(sectionId);
    return json;
  }

  AdminSoftDeleteLecturesBySectionVariables({
    required this.sectionId,
  });
}

