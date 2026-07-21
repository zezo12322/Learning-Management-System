part of 'generated.dart';

class AdminDeleteMissionTemplateVariablesBuilder {
  String templateId;

  final FirebaseDataConnect _dataConnect;
  AdminDeleteMissionTemplateVariablesBuilder(this._dataConnect, {required  this.templateId,});
  Deserializer<AdminDeleteMissionTemplateData> dataDeserializer = (dynamic json)  => AdminDeleteMissionTemplateData.fromJson(jsonDecode(json));
  Serializer<AdminDeleteMissionTemplateVariables> varsSerializer = (AdminDeleteMissionTemplateVariables vars) => jsonEncode(vars.toJson());
  Future<OperationResult<AdminDeleteMissionTemplateData, AdminDeleteMissionTemplateVariables>> execute() {
    return ref().execute();
  }

  MutationRef<AdminDeleteMissionTemplateData, AdminDeleteMissionTemplateVariables> ref() {
    AdminDeleteMissionTemplateVariables vars= AdminDeleteMissionTemplateVariables(templateId: templateId,);
    return _dataConnect.mutation("AdminDeleteMissionTemplate", dataDeserializer, varsSerializer, vars);
  }
}

@immutable
class AdminDeleteMissionTemplateMissionTemplateDelete {
  final String id;
  AdminDeleteMissionTemplateMissionTemplateDelete.fromJson(dynamic json):
  
  id = nativeFromJson<String>(json['id']);
  @override
  bool operator ==(Object other) {
    if(identical(this, other)) {
      return true;
    }
    if(other.runtimeType != runtimeType) {
      return false;
    }

    final AdminDeleteMissionTemplateMissionTemplateDelete otherTyped = other as AdminDeleteMissionTemplateMissionTemplateDelete;
    return id == otherTyped.id;
    
  }
  @override
  int get hashCode => id.hashCode;
  

  Map<String, dynamic> toJson() {
    Map<String, dynamic> json = {};
    json['id'] = nativeToJson<String>(id);
    return json;
  }

  AdminDeleteMissionTemplateMissionTemplateDelete({
    required this.id,
  });
}

@immutable
class AdminDeleteMissionTemplateData {
  final AdminDeleteMissionTemplateMissionTemplateDelete? missionTemplate_delete;
  AdminDeleteMissionTemplateData.fromJson(dynamic json):
  
  missionTemplate_delete = json['missionTemplate_delete'] == null ? null : AdminDeleteMissionTemplateMissionTemplateDelete.fromJson(json['missionTemplate_delete']);
  @override
  bool operator ==(Object other) {
    if(identical(this, other)) {
      return true;
    }
    if(other.runtimeType != runtimeType) {
      return false;
    }

    final AdminDeleteMissionTemplateData otherTyped = other as AdminDeleteMissionTemplateData;
    return missionTemplate_delete == otherTyped.missionTemplate_delete;
    
  }
  @override
  int get hashCode => missionTemplate_delete.hashCode;
  

  Map<String, dynamic> toJson() {
    Map<String, dynamic> json = {};
    if (missionTemplate_delete != null) {
      json['missionTemplate_delete'] = missionTemplate_delete!.toJson();
    }
    return json;
  }

  AdminDeleteMissionTemplateData({
    this.missionTemplate_delete,
  });
}

@immutable
class AdminDeleteMissionTemplateVariables {
  final String templateId;
  @Deprecated('fromJson is deprecated for Variable classes as they are no longer required for deserialization.')
  AdminDeleteMissionTemplateVariables.fromJson(Map<String, dynamic> json):
  
  templateId = nativeFromJson<String>(json['templateId']);
  @override
  bool operator ==(Object other) {
    if(identical(this, other)) {
      return true;
    }
    if(other.runtimeType != runtimeType) {
      return false;
    }

    final AdminDeleteMissionTemplateVariables otherTyped = other as AdminDeleteMissionTemplateVariables;
    return templateId == otherTyped.templateId;
    
  }
  @override
  int get hashCode => templateId.hashCode;
  

  Map<String, dynamic> toJson() {
    Map<String, dynamic> json = {};
    json['templateId'] = nativeToJson<String>(templateId);
    return json;
  }

  AdminDeleteMissionTemplateVariables({
    required this.templateId,
  });
}

