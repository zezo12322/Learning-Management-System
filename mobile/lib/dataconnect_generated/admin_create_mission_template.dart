part of 'generated.dart';

class AdminCreateMissionTemplateVariablesBuilder {
  String missionId;
  String title;
  String fileUrl;
  String fileType;

  final FirebaseDataConnect _dataConnect;
  AdminCreateMissionTemplateVariablesBuilder(this._dataConnect, {required  this.missionId,required  this.title,required  this.fileUrl,required  this.fileType,});
  Deserializer<AdminCreateMissionTemplateData> dataDeserializer = (dynamic json)  => AdminCreateMissionTemplateData.fromJson(jsonDecode(json));
  Serializer<AdminCreateMissionTemplateVariables> varsSerializer = (AdminCreateMissionTemplateVariables vars) => jsonEncode(vars.toJson());
  Future<OperationResult<AdminCreateMissionTemplateData, AdminCreateMissionTemplateVariables>> execute() {
    return ref().execute();
  }

  MutationRef<AdminCreateMissionTemplateData, AdminCreateMissionTemplateVariables> ref() {
    AdminCreateMissionTemplateVariables vars= AdminCreateMissionTemplateVariables(missionId: missionId,title: title,fileUrl: fileUrl,fileType: fileType,);
    return _dataConnect.mutation("AdminCreateMissionTemplate", dataDeserializer, varsSerializer, vars);
  }
}

@immutable
class AdminCreateMissionTemplateMissionTemplateInsert {
  final String id;
  AdminCreateMissionTemplateMissionTemplateInsert.fromJson(dynamic json):
  
  id = nativeFromJson<String>(json['id']);
  @override
  bool operator ==(Object other) {
    if(identical(this, other)) {
      return true;
    }
    if(other.runtimeType != runtimeType) {
      return false;
    }

    final AdminCreateMissionTemplateMissionTemplateInsert otherTyped = other as AdminCreateMissionTemplateMissionTemplateInsert;
    return id == otherTyped.id;
    
  }
  @override
  int get hashCode => id.hashCode;
  

  Map<String, dynamic> toJson() {
    Map<String, dynamic> json = {};
    json['id'] = nativeToJson<String>(id);
    return json;
  }

  AdminCreateMissionTemplateMissionTemplateInsert({
    required this.id,
  });
}

@immutable
class AdminCreateMissionTemplateData {
  final AdminCreateMissionTemplateMissionTemplateInsert missionTemplate_insert;
  AdminCreateMissionTemplateData.fromJson(dynamic json):
  
  missionTemplate_insert = AdminCreateMissionTemplateMissionTemplateInsert.fromJson(json['missionTemplate_insert']);
  @override
  bool operator ==(Object other) {
    if(identical(this, other)) {
      return true;
    }
    if(other.runtimeType != runtimeType) {
      return false;
    }

    final AdminCreateMissionTemplateData otherTyped = other as AdminCreateMissionTemplateData;
    return missionTemplate_insert == otherTyped.missionTemplate_insert;
    
  }
  @override
  int get hashCode => missionTemplate_insert.hashCode;
  

  Map<String, dynamic> toJson() {
    Map<String, dynamic> json = {};
    json['missionTemplate_insert'] = missionTemplate_insert.toJson();
    return json;
  }

  AdminCreateMissionTemplateData({
    required this.missionTemplate_insert,
  });
}

@immutable
class AdminCreateMissionTemplateVariables {
  final String missionId;
  final String title;
  final String fileUrl;
  final String fileType;
  @Deprecated('fromJson is deprecated for Variable classes as they are no longer required for deserialization.')
  AdminCreateMissionTemplateVariables.fromJson(Map<String, dynamic> json):
  
  missionId = nativeFromJson<String>(json['missionId']),
  title = nativeFromJson<String>(json['title']),
  fileUrl = nativeFromJson<String>(json['fileUrl']),
  fileType = nativeFromJson<String>(json['fileType']);
  @override
  bool operator ==(Object other) {
    if(identical(this, other)) {
      return true;
    }
    if(other.runtimeType != runtimeType) {
      return false;
    }

    final AdminCreateMissionTemplateVariables otherTyped = other as AdminCreateMissionTemplateVariables;
    return missionId == otherTyped.missionId && 
    title == otherTyped.title && 
    fileUrl == otherTyped.fileUrl && 
    fileType == otherTyped.fileType;
    
  }
  @override
  int get hashCode => Object.hashAll([missionId.hashCode, title.hashCode, fileUrl.hashCode, fileType.hashCode]);
  

  Map<String, dynamic> toJson() {
    Map<String, dynamic> json = {};
    json['missionId'] = nativeToJson<String>(missionId);
    json['title'] = nativeToJson<String>(title);
    json['fileUrl'] = nativeToJson<String>(fileUrl);
    json['fileType'] = nativeToJson<String>(fileType);
    return json;
  }

  AdminCreateMissionTemplateVariables({
    required this.missionId,
    required this.title,
    required this.fileUrl,
    required this.fileType,
  });
}

