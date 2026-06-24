part of 'generated.dart';

class GetTemplateMissionVariablesBuilder {
  String templateId;

  final FirebaseDataConnect _dataConnect;
  GetTemplateMissionVariablesBuilder(this._dataConnect, {required  this.templateId,});
  Deserializer<GetTemplateMissionData> dataDeserializer = (dynamic json)  => GetTemplateMissionData.fromJson(jsonDecode(json));
  Serializer<GetTemplateMissionVariables> varsSerializer = (GetTemplateMissionVariables vars) => jsonEncode(vars.toJson());
  Future<QueryResult<GetTemplateMissionData, GetTemplateMissionVariables>> execute({QueryFetchPolicy fetchPolicy = QueryFetchPolicy.preferCache}) {
    return ref().execute(fetchPolicy: fetchPolicy);
  }

  QueryRef<GetTemplateMissionData, GetTemplateMissionVariables> ref() {
    GetTemplateMissionVariables vars= GetTemplateMissionVariables(templateId: templateId,);
    return _dataConnect.query("GetTemplateMission", dataDeserializer, varsSerializer, vars);
  }
}

@immutable
class GetTemplateMissionMissionTemplate {
  final GetTemplateMissionMissionTemplateMission mission;
  GetTemplateMissionMissionTemplate.fromJson(dynamic json):
  
  mission = GetTemplateMissionMissionTemplateMission.fromJson(json['mission']);
  @override
  bool operator ==(Object other) {
    if(identical(this, other)) {
      return true;
    }
    if(other.runtimeType != runtimeType) {
      return false;
    }

    final GetTemplateMissionMissionTemplate otherTyped = other as GetTemplateMissionMissionTemplate;
    return mission == otherTyped.mission;
    
  }
  @override
  int get hashCode => mission.hashCode;
  

  Map<String, dynamic> toJson() {
    Map<String, dynamic> json = {};
    json['mission'] = mission.toJson();
    return json;
  }

  GetTemplateMissionMissionTemplate({
    required this.mission,
  });
}

@immutable
class GetTemplateMissionMissionTemplateMission {
  final String id;
  GetTemplateMissionMissionTemplateMission.fromJson(dynamic json):
  
  id = nativeFromJson<String>(json['id']);
  @override
  bool operator ==(Object other) {
    if(identical(this, other)) {
      return true;
    }
    if(other.runtimeType != runtimeType) {
      return false;
    }

    final GetTemplateMissionMissionTemplateMission otherTyped = other as GetTemplateMissionMissionTemplateMission;
    return id == otherTyped.id;
    
  }
  @override
  int get hashCode => id.hashCode;
  

  Map<String, dynamic> toJson() {
    Map<String, dynamic> json = {};
    json['id'] = nativeToJson<String>(id);
    return json;
  }

  GetTemplateMissionMissionTemplateMission({
    required this.id,
  });
}

@immutable
class GetTemplateMissionData {
  final GetTemplateMissionMissionTemplate? missionTemplate;
  GetTemplateMissionData.fromJson(dynamic json):
  
  missionTemplate = json['missionTemplate'] == null ? null : GetTemplateMissionMissionTemplate.fromJson(json['missionTemplate']);
  @override
  bool operator ==(Object other) {
    if(identical(this, other)) {
      return true;
    }
    if(other.runtimeType != runtimeType) {
      return false;
    }

    final GetTemplateMissionData otherTyped = other as GetTemplateMissionData;
    return missionTemplate == otherTyped.missionTemplate;
    
  }
  @override
  int get hashCode => missionTemplate.hashCode;
  

  Map<String, dynamic> toJson() {
    Map<String, dynamic> json = {};
    if (missionTemplate != null) {
      json['missionTemplate'] = missionTemplate!.toJson();
    }
    return json;
  }

  GetTemplateMissionData({
    this.missionTemplate,
  });
}

@immutable
class GetTemplateMissionVariables {
  final String templateId;
  @Deprecated('fromJson is deprecated for Variable classes as they are no longer required for deserialization.')
  GetTemplateMissionVariables.fromJson(Map<String, dynamic> json):
  
  templateId = nativeFromJson<String>(json['templateId']);
  @override
  bool operator ==(Object other) {
    if(identical(this, other)) {
      return true;
    }
    if(other.runtimeType != runtimeType) {
      return false;
    }

    final GetTemplateMissionVariables otherTyped = other as GetTemplateMissionVariables;
    return templateId == otherTyped.templateId;
    
  }
  @override
  int get hashCode => templateId.hashCode;
  

  Map<String, dynamic> toJson() {
    Map<String, dynamic> json = {};
    json['templateId'] = nativeToJson<String>(templateId);
    return json;
  }

  GetTemplateMissionVariables({
    required this.templateId,
  });
}

