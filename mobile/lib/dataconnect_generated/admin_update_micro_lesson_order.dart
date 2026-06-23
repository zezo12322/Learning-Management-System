part of 'generated.dart';

class AdminUpdateMicroLessonOrderVariablesBuilder {
  String microLessonId;
  int order;

  final FirebaseDataConnect _dataConnect;
  AdminUpdateMicroLessonOrderVariablesBuilder(this._dataConnect, {required  this.microLessonId,required  this.order,});
  Deserializer<AdminUpdateMicroLessonOrderData> dataDeserializer = (dynamic json)  => AdminUpdateMicroLessonOrderData.fromJson(jsonDecode(json));
  Serializer<AdminUpdateMicroLessonOrderVariables> varsSerializer = (AdminUpdateMicroLessonOrderVariables vars) => jsonEncode(vars.toJson());
  Future<OperationResult<AdminUpdateMicroLessonOrderData, AdminUpdateMicroLessonOrderVariables>> execute() {
    return ref().execute();
  }

  MutationRef<AdminUpdateMicroLessonOrderData, AdminUpdateMicroLessonOrderVariables> ref() {
    AdminUpdateMicroLessonOrderVariables vars= AdminUpdateMicroLessonOrderVariables(microLessonId: microLessonId,order: order,);
    return _dataConnect.mutation('AdminUpdateMicroLessonOrder', dataDeserializer, varsSerializer, vars);
  }
}

@immutable
class AdminUpdateMicroLessonOrderMissionMicroLessonUpdate {
  final String id;
  AdminUpdateMicroLessonOrderMissionMicroLessonUpdate.fromJson(dynamic json):
  
  id = nativeFromJson<String>(json['id']);
  @override
  bool operator ==(Object other) {
    if(identical(this, other)) {
      return true;
    }
    if(other.runtimeType != runtimeType) {
      return false;
    }

    final AdminUpdateMicroLessonOrderMissionMicroLessonUpdate otherTyped = other as AdminUpdateMicroLessonOrderMissionMicroLessonUpdate;
    return id == otherTyped.id;
    
  }
  @override
  int get hashCode => id.hashCode;
  

  Map<String, dynamic> toJson() {
    Map<String, dynamic> json = {};
    json['id'] = nativeToJson<String>(id);
    return json;
  }

  AdminUpdateMicroLessonOrderMissionMicroLessonUpdate({
    required this.id,
  });
}

@immutable
class AdminUpdateMicroLessonOrderData {
  final AdminUpdateMicroLessonOrderMissionMicroLessonUpdate? missionMicroLesson_update;
  AdminUpdateMicroLessonOrderData.fromJson(dynamic json):
  
  missionMicroLesson_update = json['missionMicroLesson_update'] == null ? null : AdminUpdateMicroLessonOrderMissionMicroLessonUpdate.fromJson(json['missionMicroLesson_update']);
  @override
  bool operator ==(Object other) {
    if(identical(this, other)) {
      return true;
    }
    if(other.runtimeType != runtimeType) {
      return false;
    }

    final AdminUpdateMicroLessonOrderData otherTyped = other as AdminUpdateMicroLessonOrderData;
    return missionMicroLesson_update == otherTyped.missionMicroLesson_update;
    
  }
  @override
  int get hashCode => missionMicroLesson_update.hashCode;
  

  Map<String, dynamic> toJson() {
    Map<String, dynamic> json = {};
    if (missionMicroLesson_update != null) {
      json['missionMicroLesson_update'] = missionMicroLesson_update!.toJson();
    }
    return json;
  }

  AdminUpdateMicroLessonOrderData({
    this.missionMicroLesson_update,
  });
}

@immutable
class AdminUpdateMicroLessonOrderVariables {
  final String microLessonId;
  final int order;
  @Deprecated('fromJson is deprecated for Variable classes as they are no longer required for deserialization.')
  AdminUpdateMicroLessonOrderVariables.fromJson(Map<String, dynamic> json):
  
  microLessonId = nativeFromJson<String>(json['microLessonId']),
  order = nativeFromJson<int>(json['order']);
  @override
  bool operator ==(Object other) {
    if(identical(this, other)) {
      return true;
    }
    if(other.runtimeType != runtimeType) {
      return false;
    }

    final AdminUpdateMicroLessonOrderVariables otherTyped = other as AdminUpdateMicroLessonOrderVariables;
    return microLessonId == otherTyped.microLessonId && 
    order == otherTyped.order;
    
  }
  @override
  int get hashCode => Object.hashAll([microLessonId.hashCode, order.hashCode]);
  

  Map<String, dynamic> toJson() {
    Map<String, dynamic> json = {};
    json['microLessonId'] = nativeToJson<String>(microLessonId);
    json['order'] = nativeToJson<int>(order);
    return json;
  }

  AdminUpdateMicroLessonOrderVariables({
    required this.microLessonId,
    required this.order,
  });
}

