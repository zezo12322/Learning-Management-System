part of 'generated.dart';

class GetMissionTemplatesVariablesBuilder {
  String missionId;

  final FirebaseDataConnect _dataConnect;
  GetMissionTemplatesVariablesBuilder(this._dataConnect, {required  this.missionId,});
  Deserializer<GetMissionTemplatesData> dataDeserializer = (dynamic json)  => GetMissionTemplatesData.fromJson(jsonDecode(json));
  Serializer<GetMissionTemplatesVariables> varsSerializer = (GetMissionTemplatesVariables vars) => jsonEncode(vars.toJson());
  Future<QueryResult<GetMissionTemplatesData, GetMissionTemplatesVariables>> execute({QueryFetchPolicy fetchPolicy = QueryFetchPolicy.preferCache}) {
    return ref().execute(fetchPolicy: fetchPolicy);
  }

  QueryRef<GetMissionTemplatesData, GetMissionTemplatesVariables> ref() {
    GetMissionTemplatesVariables vars= GetMissionTemplatesVariables(missionId: missionId,);
    return _dataConnect.query("GetMissionTemplates", dataDeserializer, varsSerializer, vars);
  }
}

@immutable
class GetMissionTemplatesMissionTemplates {
  final String id;
  final String title;
  final String fileUrl;
  final String fileType;
  GetMissionTemplatesMissionTemplates.fromJson(dynamic json):
  
  id = nativeFromJson<String>(json['id']),
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

    final GetMissionTemplatesMissionTemplates otherTyped = other as GetMissionTemplatesMissionTemplates;
    return id == otherTyped.id && 
    title == otherTyped.title && 
    fileUrl == otherTyped.fileUrl && 
    fileType == otherTyped.fileType;
    
  }
  @override
  int get hashCode => Object.hashAll([id.hashCode, title.hashCode, fileUrl.hashCode, fileType.hashCode]);
  

  Map<String, dynamic> toJson() {
    Map<String, dynamic> json = {};
    json['id'] = nativeToJson<String>(id);
    json['title'] = nativeToJson<String>(title);
    json['fileUrl'] = nativeToJson<String>(fileUrl);
    json['fileType'] = nativeToJson<String>(fileType);
    return json;
  }

  GetMissionTemplatesMissionTemplates({
    required this.id,
    required this.title,
    required this.fileUrl,
    required this.fileType,
  });
}

@immutable
class GetMissionTemplatesData {
  final List<GetMissionTemplatesMissionTemplates> missionTemplates;
  GetMissionTemplatesData.fromJson(dynamic json):
  
  missionTemplates = (json['missionTemplates'] as List<dynamic>)
        .map((e) => GetMissionTemplatesMissionTemplates.fromJson(e))
        .toList();
  @override
  bool operator ==(Object other) {
    if(identical(this, other)) {
      return true;
    }
    if(other.runtimeType != runtimeType) {
      return false;
    }

    final GetMissionTemplatesData otherTyped = other as GetMissionTemplatesData;
    return missionTemplates == otherTyped.missionTemplates;
    
  }
  @override
  int get hashCode => missionTemplates.hashCode;
  

  Map<String, dynamic> toJson() {
    Map<String, dynamic> json = {};
    json['missionTemplates'] = missionTemplates.map((e) => e.toJson()).toList();
    return json;
  }

  GetMissionTemplatesData({
    required this.missionTemplates,
  });
}

@immutable
class GetMissionTemplatesVariables {
  final String missionId;
  @Deprecated('fromJson is deprecated for Variable classes as they are no longer required for deserialization.')
  GetMissionTemplatesVariables.fromJson(Map<String, dynamic> json):
  
  missionId = nativeFromJson<String>(json['missionId']);
  @override
  bool operator ==(Object other) {
    if(identical(this, other)) {
      return true;
    }
    if(other.runtimeType != runtimeType) {
      return false;
    }

    final GetMissionTemplatesVariables otherTyped = other as GetMissionTemplatesVariables;
    return missionId == otherTyped.missionId;
    
  }
  @override
  int get hashCode => missionId.hashCode;
  

  Map<String, dynamic> toJson() {
    Map<String, dynamic> json = {};
    json['missionId'] = nativeToJson<String>(missionId);
    return json;
  }

  GetMissionTemplatesVariables({
    required this.missionId,
  });
}

