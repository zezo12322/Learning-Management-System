part of 'generated.dart';

class AdminMoveLectureToSectionVariablesBuilder {
  String lectureId;
  String newSectionId;
  int order;

  final FirebaseDataConnect _dataConnect;
  AdminMoveLectureToSectionVariablesBuilder(this._dataConnect, {required  this.lectureId,required  this.newSectionId,required  this.order,});
  Deserializer<AdminMoveLectureToSectionData> dataDeserializer = (dynamic json)  => AdminMoveLectureToSectionData.fromJson(jsonDecode(json));
  Serializer<AdminMoveLectureToSectionVariables> varsSerializer = (AdminMoveLectureToSectionVariables vars) => jsonEncode(vars.toJson());
  Future<OperationResult<AdminMoveLectureToSectionData, AdminMoveLectureToSectionVariables>> execute() {
    return ref().execute();
  }

  MutationRef<AdminMoveLectureToSectionData, AdminMoveLectureToSectionVariables> ref() {
    AdminMoveLectureToSectionVariables vars= AdminMoveLectureToSectionVariables(lectureId: lectureId,newSectionId: newSectionId,order: order,);
    return _dataConnect.mutation("AdminMoveLectureToSection", dataDeserializer, varsSerializer, vars);
  }
}

@immutable
class AdminMoveLectureToSectionCourseLectureUpdate {
  final String id;
  AdminMoveLectureToSectionCourseLectureUpdate.fromJson(dynamic json):
  
  id = nativeFromJson<String>(json['id']);
  @override
  bool operator ==(Object other) {
    if(identical(this, other)) {
      return true;
    }
    if(other.runtimeType != runtimeType) {
      return false;
    }

    final AdminMoveLectureToSectionCourseLectureUpdate otherTyped = other as AdminMoveLectureToSectionCourseLectureUpdate;
    return id == otherTyped.id;
    
  }
  @override
  int get hashCode => id.hashCode;
  

  Map<String, dynamic> toJson() {
    Map<String, dynamic> json = {};
    json['id'] = nativeToJson<String>(id);
    return json;
  }

  AdminMoveLectureToSectionCourseLectureUpdate({
    required this.id,
  });
}

@immutable
class AdminMoveLectureToSectionData {
  final AdminMoveLectureToSectionCourseLectureUpdate? courseLecture_update;
  AdminMoveLectureToSectionData.fromJson(dynamic json):
  
  courseLecture_update = json['courseLecture_update'] == null ? null : AdminMoveLectureToSectionCourseLectureUpdate.fromJson(json['courseLecture_update']);
  @override
  bool operator ==(Object other) {
    if(identical(this, other)) {
      return true;
    }
    if(other.runtimeType != runtimeType) {
      return false;
    }

    final AdminMoveLectureToSectionData otherTyped = other as AdminMoveLectureToSectionData;
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

  AdminMoveLectureToSectionData({
    this.courseLecture_update,
  });
}

@immutable
class AdminMoveLectureToSectionVariables {
  final String lectureId;
  final String newSectionId;
  final int order;
  @Deprecated('fromJson is deprecated for Variable classes as they are no longer required for deserialization.')
  AdminMoveLectureToSectionVariables.fromJson(Map<String, dynamic> json):
  
  lectureId = nativeFromJson<String>(json['lectureId']),
  newSectionId = nativeFromJson<String>(json['newSectionId']),
  order = nativeFromJson<int>(json['order']);
  @override
  bool operator ==(Object other) {
    if(identical(this, other)) {
      return true;
    }
    if(other.runtimeType != runtimeType) {
      return false;
    }

    final AdminMoveLectureToSectionVariables otherTyped = other as AdminMoveLectureToSectionVariables;
    return lectureId == otherTyped.lectureId && 
    newSectionId == otherTyped.newSectionId && 
    order == otherTyped.order;
    
  }
  @override
  int get hashCode => Object.hashAll([lectureId.hashCode, newSectionId.hashCode, order.hashCode]);
  

  Map<String, dynamic> toJson() {
    Map<String, dynamic> json = {};
    json['lectureId'] = nativeToJson<String>(lectureId);
    json['newSectionId'] = nativeToJson<String>(newSectionId);
    json['order'] = nativeToJson<int>(order);
    return json;
  }

  AdminMoveLectureToSectionVariables({
    required this.lectureId,
    required this.newSectionId,
    required this.order,
  });
}

