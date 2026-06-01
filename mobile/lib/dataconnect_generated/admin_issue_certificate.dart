part of 'generated.dart';

class AdminIssueCertificateVariablesBuilder {
  String userId;
  CertificateTarget targetType;
  Optional<String> _courseId = Optional.optional(nativeFromJson, nativeToJson);
  Optional<String> _missionId = Optional.optional(nativeFromJson, nativeToJson);
  Optional<Timestamp> _expiresAt = Optional.optional((json) => json['expiresAt'] = Timestamp.fromJson(json['expiresAt']), defaultSerializer);
  String verificationHash;
  String assetUrl;

  final FirebaseDataConnect _dataConnect;  AdminIssueCertificateVariablesBuilder courseId(String? t) {
   _courseId.value = t;
   return this;
  }
  AdminIssueCertificateVariablesBuilder missionId(String? t) {
   _missionId.value = t;
   return this;
  }
  AdminIssueCertificateVariablesBuilder expiresAt(Timestamp? t) {
   _expiresAt.value = t;
   return this;
  }

  AdminIssueCertificateVariablesBuilder(this._dataConnect, {required  this.userId,required  this.targetType,required  this.verificationHash,required  this.assetUrl,});
  Deserializer<AdminIssueCertificateData> dataDeserializer = (dynamic json)  => AdminIssueCertificateData.fromJson(jsonDecode(json));
  Serializer<AdminIssueCertificateVariables> varsSerializer = (AdminIssueCertificateVariables vars) => jsonEncode(vars.toJson());
  Future<OperationResult<AdminIssueCertificateData, AdminIssueCertificateVariables>> execute() {
    return ref().execute();
  }

  MutationRef<AdminIssueCertificateData, AdminIssueCertificateVariables> ref() {
    AdminIssueCertificateVariables vars= AdminIssueCertificateVariables(userId: userId,targetType: targetType,courseId: _courseId,missionId: _missionId,expiresAt: _expiresAt,verificationHash: verificationHash,assetUrl: assetUrl,);
    return _dataConnect.mutation("AdminIssueCertificate", dataDeserializer, varsSerializer, vars);
  }
}

@immutable
class AdminIssueCertificateCertificateInsert {
  final String id;
  AdminIssueCertificateCertificateInsert.fromJson(dynamic json):
  
  id = nativeFromJson<String>(json['id']);
  @override
  bool operator ==(Object other) {
    if(identical(this, other)) {
      return true;
    }
    if(other.runtimeType != runtimeType) {
      return false;
    }

    final AdminIssueCertificateCertificateInsert otherTyped = other as AdminIssueCertificateCertificateInsert;
    return id == otherTyped.id;
    
  }
  @override
  int get hashCode => id.hashCode;
  

  Map<String, dynamic> toJson() {
    Map<String, dynamic> json = {};
    json['id'] = nativeToJson<String>(id);
    return json;
  }

  AdminIssueCertificateCertificateInsert({
    required this.id,
  });
}

@immutable
class AdminIssueCertificateData {
  final AdminIssueCertificateCertificateInsert certificate_insert;
  AdminIssueCertificateData.fromJson(dynamic json):
  
  certificate_insert = AdminIssueCertificateCertificateInsert.fromJson(json['certificate_insert']);
  @override
  bool operator ==(Object other) {
    if(identical(this, other)) {
      return true;
    }
    if(other.runtimeType != runtimeType) {
      return false;
    }

    final AdminIssueCertificateData otherTyped = other as AdminIssueCertificateData;
    return certificate_insert == otherTyped.certificate_insert;
    
  }
  @override
  int get hashCode => certificate_insert.hashCode;
  

  Map<String, dynamic> toJson() {
    Map<String, dynamic> json = {};
    json['certificate_insert'] = certificate_insert.toJson();
    return json;
  }

  AdminIssueCertificateData({
    required this.certificate_insert,
  });
}

@immutable
class AdminIssueCertificateVariables {
  final String userId;
  final CertificateTarget targetType;
  late final Optional<String>courseId;
  late final Optional<String>missionId;
  late final Optional<Timestamp>expiresAt;
  final String verificationHash;
  final String assetUrl;
  @Deprecated('fromJson is deprecated for Variable classes as they are no longer required for deserialization.')
  AdminIssueCertificateVariables.fromJson(Map<String, dynamic> json):
  
  userId = nativeFromJson<String>(json['userId']),
  targetType = CertificateTarget.values.byName(json['targetType']),
  verificationHash = nativeFromJson<String>(json['verificationHash']),
  assetUrl = nativeFromJson<String>(json['assetUrl']) {
  
  
  
  
    courseId = Optional.optional(nativeFromJson, nativeToJson);
    courseId.value = json['courseId'] == null ? null : nativeFromJson<String>(json['courseId']);
  
  
    missionId = Optional.optional(nativeFromJson, nativeToJson);
    missionId.value = json['missionId'] == null ? null : nativeFromJson<String>(json['missionId']);
  
  
    expiresAt = Optional.optional((json) => json['expiresAt'] = Timestamp.fromJson(json['expiresAt']), defaultSerializer);
    expiresAt.value = json['expiresAt'] == null ? null : Timestamp.fromJson(json['expiresAt']);
  
  
  
  }
  @override
  bool operator ==(Object other) {
    if(identical(this, other)) {
      return true;
    }
    if(other.runtimeType != runtimeType) {
      return false;
    }

    final AdminIssueCertificateVariables otherTyped = other as AdminIssueCertificateVariables;
    return userId == otherTyped.userId && 
    targetType == otherTyped.targetType && 
    courseId == otherTyped.courseId && 
    missionId == otherTyped.missionId && 
    expiresAt == otherTyped.expiresAt && 
    verificationHash == otherTyped.verificationHash && 
    assetUrl == otherTyped.assetUrl;
    
  }
  @override
  int get hashCode => Object.hashAll([userId.hashCode, targetType.hashCode, courseId.hashCode, missionId.hashCode, expiresAt.hashCode, verificationHash.hashCode, assetUrl.hashCode]);
  

  Map<String, dynamic> toJson() {
    Map<String, dynamic> json = {};
    json['userId'] = nativeToJson<String>(userId);
    json['targetType'] = 
    targetType.name
    ;
    if(courseId.state == OptionalState.set) {
      json['courseId'] = courseId.toJson();
    }
    if(missionId.state == OptionalState.set) {
      json['missionId'] = missionId.toJson();
    }
    if(expiresAt.state == OptionalState.set) {
      json['expiresAt'] = expiresAt.toJson();
    }
    json['verificationHash'] = nativeToJson<String>(verificationHash);
    json['assetUrl'] = nativeToJson<String>(assetUrl);
    return json;
  }

  AdminIssueCertificateVariables({
    required this.userId,
    required this.targetType,
    required this.courseId,
    required this.missionId,
    required this.expiresAt,
    required this.verificationHash,
    required this.assetUrl,
  });
}

