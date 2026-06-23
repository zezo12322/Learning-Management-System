part of 'generated.dart';

class MyCertificatesVariablesBuilder {
  
  final FirebaseDataConnect _dataConnect;
  MyCertificatesVariablesBuilder(this._dataConnect, );
  Deserializer<MyCertificatesData> dataDeserializer = (dynamic json)  => MyCertificatesData.fromJson(jsonDecode(json));
  
  Future<QueryResult<MyCertificatesData, void>> execute({QueryFetchPolicy fetchPolicy = QueryFetchPolicy.preferCache}) {
    return ref().execute(fetchPolicy: fetchPolicy);
  }

  QueryRef<MyCertificatesData, void> ref() {
    
    return _dataConnect.query('MyCertificates', dataDeserializer, emptySerializer, null);
  }
}

@immutable
class MyCertificatesCertificates {
  final String id;
  final Timestamp issuedAt;
  final Timestamp? expiresAt;
  final EnumValue<CertificateTarget> targetType;
  final String verificationHash;
  final String assetUrl;
  final MyCertificatesCertificatesCourse? course;
  final MyCertificatesCertificatesMission? mission;
  MyCertificatesCertificates.fromJson(dynamic json):
  
  id = nativeFromJson<String>(json['id']),
  issuedAt = Timestamp.fromJson(json['issuedAt']),
  expiresAt = json['expiresAt'] == null ? null : Timestamp.fromJson(json['expiresAt']),
  targetType = certificateTargetDeserializer(json['targetType']),
  verificationHash = nativeFromJson<String>(json['verificationHash']),
  assetUrl = nativeFromJson<String>(json['assetUrl']),
  course = json['course'] == null ? null : MyCertificatesCertificatesCourse.fromJson(json['course']),
  mission = json['mission'] == null ? null : MyCertificatesCertificatesMission.fromJson(json['mission']);
  @override
  bool operator ==(Object other) {
    if(identical(this, other)) {
      return true;
    }
    if(other.runtimeType != runtimeType) {
      return false;
    }

    final MyCertificatesCertificates otherTyped = other as MyCertificatesCertificates;
    return id == otherTyped.id && 
    issuedAt == otherTyped.issuedAt && 
    expiresAt == otherTyped.expiresAt && 
    targetType == otherTyped.targetType && 
    verificationHash == otherTyped.verificationHash && 
    assetUrl == otherTyped.assetUrl && 
    course == otherTyped.course && 
    mission == otherTyped.mission;
    
  }
  @override
  int get hashCode => Object.hashAll([id.hashCode, issuedAt.hashCode, expiresAt.hashCode, targetType.hashCode, verificationHash.hashCode, assetUrl.hashCode, course.hashCode, mission.hashCode]);
  

  Map<String, dynamic> toJson() {
    Map<String, dynamic> json = {};
    json['id'] = nativeToJson<String>(id);
    json['issuedAt'] = issuedAt.toJson();
    if (expiresAt != null) {
      json['expiresAt'] = expiresAt!.toJson();
    }
    json['targetType'] = 
    certificateTargetSerializer(targetType)
    ;
    json['verificationHash'] = nativeToJson<String>(verificationHash);
    json['assetUrl'] = nativeToJson<String>(assetUrl);
    if (course != null) {
      json['course'] = course!.toJson();
    }
    if (mission != null) {
      json['mission'] = mission!.toJson();
    }
    return json;
  }

  MyCertificatesCertificates({
    required this.id,
    required this.issuedAt,
    this.expiresAt,
    required this.targetType,
    required this.verificationHash,
    required this.assetUrl,
    this.course,
    this.mission,
  });
}

@immutable
class MyCertificatesCertificatesCourse {
  final String title;
  MyCertificatesCertificatesCourse.fromJson(dynamic json):
  
  title = nativeFromJson<String>(json['title']);
  @override
  bool operator ==(Object other) {
    if(identical(this, other)) {
      return true;
    }
    if(other.runtimeType != runtimeType) {
      return false;
    }

    final MyCertificatesCertificatesCourse otherTyped = other as MyCertificatesCertificatesCourse;
    return title == otherTyped.title;
    
  }
  @override
  int get hashCode => title.hashCode;
  

  Map<String, dynamic> toJson() {
    Map<String, dynamic> json = {};
    json['title'] = nativeToJson<String>(title);
    return json;
  }

  MyCertificatesCertificatesCourse({
    required this.title,
  });
}

@immutable
class MyCertificatesCertificatesMission {
  final String title;
  MyCertificatesCertificatesMission.fromJson(dynamic json):
  
  title = nativeFromJson<String>(json['title']);
  @override
  bool operator ==(Object other) {
    if(identical(this, other)) {
      return true;
    }
    if(other.runtimeType != runtimeType) {
      return false;
    }

    final MyCertificatesCertificatesMission otherTyped = other as MyCertificatesCertificatesMission;
    return title == otherTyped.title;
    
  }
  @override
  int get hashCode => title.hashCode;
  

  Map<String, dynamic> toJson() {
    Map<String, dynamic> json = {};
    json['title'] = nativeToJson<String>(title);
    return json;
  }

  MyCertificatesCertificatesMission({
    required this.title,
  });
}

@immutable
class MyCertificatesData {
  final List<MyCertificatesCertificates> certificates;
  MyCertificatesData.fromJson(dynamic json):
  
  certificates = (json['certificates'] as List<dynamic>)
        .map((e) => MyCertificatesCertificates.fromJson(e))
        .toList();
  @override
  bool operator ==(Object other) {
    if(identical(this, other)) {
      return true;
    }
    if(other.runtimeType != runtimeType) {
      return false;
    }

    final MyCertificatesData otherTyped = other as MyCertificatesData;
    return certificates == otherTyped.certificates;
    
  }
  @override
  int get hashCode => certificates.hashCode;
  

  Map<String, dynamic> toJson() {
    Map<String, dynamic> json = {};
    json['certificates'] = certificates.map((e) => e.toJson()).toList();
    return json;
  }

  MyCertificatesData({
    required this.certificates,
  });
}

