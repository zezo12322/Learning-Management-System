part of 'generated.dart';

class VerifyCertificateVariablesBuilder {
  String hash;

  final FirebaseDataConnect _dataConnect;
  VerifyCertificateVariablesBuilder(this._dataConnect, {required  this.hash,});
  Deserializer<VerifyCertificateData> dataDeserializer = (dynamic json)  => VerifyCertificateData.fromJson(jsonDecode(json));
  Serializer<VerifyCertificateVariables> varsSerializer = (VerifyCertificateVariables vars) => jsonEncode(vars.toJson());
  Future<QueryResult<VerifyCertificateData, VerifyCertificateVariables>> execute({QueryFetchPolicy fetchPolicy = QueryFetchPolicy.preferCache}) {
    return ref().execute(fetchPolicy: fetchPolicy);
  }

  QueryRef<VerifyCertificateData, VerifyCertificateVariables> ref() {
    VerifyCertificateVariables vars= VerifyCertificateVariables(hash: hash,);
    return _dataConnect.query("VerifyCertificate", dataDeserializer, varsSerializer, vars);
  }
}

@immutable
class VerifyCertificateCertificates {
  final Timestamp issuedAt;
  final Timestamp? expiresAt;
  final EnumValue<CertificateTarget> targetType;
  final String assetUrl;
  final VerifyCertificateCertificatesUser user;
  final VerifyCertificateCertificatesCourse? course;
  final VerifyCertificateCertificatesMission? mission;
  VerifyCertificateCertificates.fromJson(dynamic json):
  
  issuedAt = Timestamp.fromJson(json['issuedAt']),
  expiresAt = json['expiresAt'] == null ? null : Timestamp.fromJson(json['expiresAt']),
  targetType = certificateTargetDeserializer(json['targetType']),
  assetUrl = nativeFromJson<String>(json['assetUrl']),
  user = VerifyCertificateCertificatesUser.fromJson(json['user']),
  course = json['course'] == null ? null : VerifyCertificateCertificatesCourse.fromJson(json['course']),
  mission = json['mission'] == null ? null : VerifyCertificateCertificatesMission.fromJson(json['mission']);
  @override
  bool operator ==(Object other) {
    if(identical(this, other)) {
      return true;
    }
    if(other.runtimeType != runtimeType) {
      return false;
    }

    final VerifyCertificateCertificates otherTyped = other as VerifyCertificateCertificates;
    return issuedAt == otherTyped.issuedAt && 
    expiresAt == otherTyped.expiresAt && 
    targetType == otherTyped.targetType && 
    assetUrl == otherTyped.assetUrl && 
    user == otherTyped.user && 
    course == otherTyped.course && 
    mission == otherTyped.mission;
    
  }
  @override
  int get hashCode => Object.hashAll([issuedAt.hashCode, expiresAt.hashCode, targetType.hashCode, assetUrl.hashCode, user.hashCode, course.hashCode, mission.hashCode]);
  

  Map<String, dynamic> toJson() {
    Map<String, dynamic> json = {};
    json['issuedAt'] = issuedAt.toJson();
    if (expiresAt != null) {
      json['expiresAt'] = expiresAt!.toJson();
    }
    json['targetType'] = 
    certificateTargetSerializer(targetType)
    ;
    json['assetUrl'] = nativeToJson<String>(assetUrl);
    json['user'] = user.toJson();
    if (course != null) {
      json['course'] = course!.toJson();
    }
    if (mission != null) {
      json['mission'] = mission!.toJson();
    }
    return json;
  }

  VerifyCertificateCertificates({
    required this.issuedAt,
    this.expiresAt,
    required this.targetType,
    required this.assetUrl,
    required this.user,
    this.course,
    this.mission,
  });
}

@immutable
class VerifyCertificateCertificatesUser {
  final String name;
  VerifyCertificateCertificatesUser.fromJson(dynamic json):
  
  name = nativeFromJson<String>(json['name']);
  @override
  bool operator ==(Object other) {
    if(identical(this, other)) {
      return true;
    }
    if(other.runtimeType != runtimeType) {
      return false;
    }

    final VerifyCertificateCertificatesUser otherTyped = other as VerifyCertificateCertificatesUser;
    return name == otherTyped.name;
    
  }
  @override
  int get hashCode => name.hashCode;
  

  Map<String, dynamic> toJson() {
    Map<String, dynamic> json = {};
    json['name'] = nativeToJson<String>(name);
    return json;
  }

  VerifyCertificateCertificatesUser({
    required this.name,
  });
}

@immutable
class VerifyCertificateCertificatesCourse {
  final String title;
  VerifyCertificateCertificatesCourse.fromJson(dynamic json):
  
  title = nativeFromJson<String>(json['title']);
  @override
  bool operator ==(Object other) {
    if(identical(this, other)) {
      return true;
    }
    if(other.runtimeType != runtimeType) {
      return false;
    }

    final VerifyCertificateCertificatesCourse otherTyped = other as VerifyCertificateCertificatesCourse;
    return title == otherTyped.title;
    
  }
  @override
  int get hashCode => title.hashCode;
  

  Map<String, dynamic> toJson() {
    Map<String, dynamic> json = {};
    json['title'] = nativeToJson<String>(title);
    return json;
  }

  VerifyCertificateCertificatesCourse({
    required this.title,
  });
}

@immutable
class VerifyCertificateCertificatesMission {
  final String title;
  VerifyCertificateCertificatesMission.fromJson(dynamic json):
  
  title = nativeFromJson<String>(json['title']);
  @override
  bool operator ==(Object other) {
    if(identical(this, other)) {
      return true;
    }
    if(other.runtimeType != runtimeType) {
      return false;
    }

    final VerifyCertificateCertificatesMission otherTyped = other as VerifyCertificateCertificatesMission;
    return title == otherTyped.title;
    
  }
  @override
  int get hashCode => title.hashCode;
  

  Map<String, dynamic> toJson() {
    Map<String, dynamic> json = {};
    json['title'] = nativeToJson<String>(title);
    return json;
  }

  VerifyCertificateCertificatesMission({
    required this.title,
  });
}

@immutable
class VerifyCertificateData {
  final List<VerifyCertificateCertificates> certificates;
  VerifyCertificateData.fromJson(dynamic json):
  
  certificates = (json['certificates'] as List<dynamic>)
        .map((e) => VerifyCertificateCertificates.fromJson(e))
        .toList();
  @override
  bool operator ==(Object other) {
    if(identical(this, other)) {
      return true;
    }
    if(other.runtimeType != runtimeType) {
      return false;
    }

    final VerifyCertificateData otherTyped = other as VerifyCertificateData;
    return certificates == otherTyped.certificates;
    
  }
  @override
  int get hashCode => certificates.hashCode;
  

  Map<String, dynamic> toJson() {
    Map<String, dynamic> json = {};
    json['certificates'] = certificates.map((e) => e.toJson()).toList();
    return json;
  }

  VerifyCertificateData({
    required this.certificates,
  });
}

@immutable
class VerifyCertificateVariables {
  final String hash;
  @Deprecated('fromJson is deprecated for Variable classes as they are no longer required for deserialization.')
  VerifyCertificateVariables.fromJson(Map<String, dynamic> json):
  
  hash = nativeFromJson<String>(json['hash']);
  @override
  bool operator ==(Object other) {
    if(identical(this, other)) {
      return true;
    }
    if(other.runtimeType != runtimeType) {
      return false;
    }

    final VerifyCertificateVariables otherTyped = other as VerifyCertificateVariables;
    return hash == otherTyped.hash;
    
  }
  @override
  int get hashCode => hash.hashCode;
  

  Map<String, dynamic> toJson() {
    Map<String, dynamic> json = {};
    json['hash'] = nativeToJson<String>(hash);
    return json;
  }

  VerifyCertificateVariables({
    required this.hash,
  });
}

