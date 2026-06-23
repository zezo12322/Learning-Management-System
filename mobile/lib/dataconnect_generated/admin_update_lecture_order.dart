part of 'generated.dart';

class AdminUpdateLectureOrderVariablesBuilder {
  String lectureId;
  int order;

  final FirebaseDataConnect _dataConnect;
  AdminUpdateLectureOrderVariablesBuilder(this._dataConnect, {required  this.lectureId,required  this.order,});
  Deserializer<AdminUpdateLectureOrderData> dataDeserializer = (dynamic json)  => AdminUpdateLectureOrderData.fromJson(jsonDecode(json));
  Serializer<AdminUpdateLectureOrderVariables> varsSerializer = (AdminUpdateLectureOrderVariables vars) => jsonEncode(vars.toJson());
  Future<OperationResult<AdminUpdateLectureOrderData, AdminUpdateLectureOrderVariables>> execute() {
    return ref().execute();
  }

  MutationRef<AdminUpdateLectureOrderData, AdminUpdateLectureOrderVariables> ref() {
    AdminUpdateLectureOrderVariables vars= AdminUpdateLectureOrderVariables(lectureId: lectureId,order: order,);
    return _dataConnect.mutation('AdminUpdateLectureOrder', dataDeserializer, varsSerializer, vars);
  }
}

@immutable
class AdminUpdateLectureOrderCourseLectureUpdate {
  final String id;
  AdminUpdateLectureOrderCourseLectureUpdate.fromJson(dynamic json):
  
  id = nativeFromJson<String>(json['id']);
  @override
  bool operator ==(Object other) {
    if(identical(this, other)) {
      return true;
    }
    if(other.runtimeType != runtimeType) {
      return false;
    }

    final AdminUpdateLectureOrderCourseLectureUpdate otherTyped = other as AdminUpdateLectureOrderCourseLectureUpdate;
    return id == otherTyped.id;
    
  }
  @override
  int get hashCode => id.hashCode;
  

  Map<String, dynamic> toJson() {
    Map<String, dynamic> json = {};
    json['id'] = nativeToJson<String>(id);
    return json;
  }

  AdminUpdateLectureOrderCourseLectureUpdate({
    required this.id,
  });
}

@immutable
class AdminUpdateLectureOrderData {
  final AdminUpdateLectureOrderCourseLectureUpdate? courseLecture_update;
  AdminUpdateLectureOrderData.fromJson(dynamic json):
  
  courseLecture_update = json['courseLecture_update'] == null ? null : AdminUpdateLectureOrderCourseLectureUpdate.fromJson(json['courseLecture_update']);
  @override
  bool operator ==(Object other) {
    if(identical(this, other)) {
      return true;
    }
    if(other.runtimeType != runtimeType) {
      return false;
    }

    final AdminUpdateLectureOrderData otherTyped = other as AdminUpdateLectureOrderData;
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

  AdminUpdateLectureOrderData({
    this.courseLecture_update,
  });
}

@immutable
class AdminUpdateLectureOrderVariables {
  final String lectureId;
  final int order;
  @Deprecated('fromJson is deprecated for Variable classes as they are no longer required for deserialization.')
  AdminUpdateLectureOrderVariables.fromJson(Map<String, dynamic> json):
  
  lectureId = nativeFromJson<String>(json['lectureId']),
  order = nativeFromJson<int>(json['order']);
  @override
  bool operator ==(Object other) {
    if(identical(this, other)) {
      return true;
    }
    if(other.runtimeType != runtimeType) {
      return false;
    }

    final AdminUpdateLectureOrderVariables otherTyped = other as AdminUpdateLectureOrderVariables;
    return lectureId == otherTyped.lectureId && 
    order == otherTyped.order;
    
  }
  @override
  int get hashCode => Object.hashAll([lectureId.hashCode, order.hashCode]);
  

  Map<String, dynamic> toJson() {
    Map<String, dynamic> json = {};
    json['lectureId'] = nativeToJson<String>(lectureId);
    json['order'] = nativeToJson<int>(order);
    return json;
  }

  AdminUpdateLectureOrderVariables({
    required this.lectureId,
    required this.order,
  });
}

