part of 'generated.dart';

class UpdateEnrollmentStatusVariablesBuilder {
  String enrollmentId;
  EnrollmentStatus status;
  Optional<Timestamp> _completedAt = Optional.optional((json) => json['completedAt'] = Timestamp.fromJson(json['completedAt']), defaultSerializer);

  final FirebaseDataConnect _dataConnect;  UpdateEnrollmentStatusVariablesBuilder completedAt(Timestamp? t) {
   _completedAt.value = t;
   return this;
  }

  UpdateEnrollmentStatusVariablesBuilder(this._dataConnect, {required  this.enrollmentId,required  this.status,});
  Deserializer<UpdateEnrollmentStatusData> dataDeserializer = (dynamic json)  => UpdateEnrollmentStatusData.fromJson(jsonDecode(json));
  Serializer<UpdateEnrollmentStatusVariables> varsSerializer = (UpdateEnrollmentStatusVariables vars) => jsonEncode(vars.toJson());
  Future<OperationResult<UpdateEnrollmentStatusData, UpdateEnrollmentStatusVariables>> execute() {
    return ref().execute();
  }

  MutationRef<UpdateEnrollmentStatusData, UpdateEnrollmentStatusVariables> ref() {
    UpdateEnrollmentStatusVariables vars= UpdateEnrollmentStatusVariables(enrollmentId: enrollmentId,status: status,completedAt: _completedAt,);
    return _dataConnect.mutation("UpdateEnrollmentStatus", dataDeserializer, varsSerializer, vars);
  }
}

@immutable
class UpdateEnrollmentStatusEnrollmentUpdate {
  final String id;
  UpdateEnrollmentStatusEnrollmentUpdate.fromJson(dynamic json):
  
  id = nativeFromJson<String>(json['id']);
  @override
  bool operator ==(Object other) {
    if(identical(this, other)) {
      return true;
    }
    if(other.runtimeType != runtimeType) {
      return false;
    }

    final UpdateEnrollmentStatusEnrollmentUpdate otherTyped = other as UpdateEnrollmentStatusEnrollmentUpdate;
    return id == otherTyped.id;
    
  }
  @override
  int get hashCode => id.hashCode;
  

  Map<String, dynamic> toJson() {
    Map<String, dynamic> json = {};
    json['id'] = nativeToJson<String>(id);
    return json;
  }

  UpdateEnrollmentStatusEnrollmentUpdate({
    required this.id,
  });
}

@immutable
class UpdateEnrollmentStatusData {
  final UpdateEnrollmentStatusEnrollmentUpdate? enrollment_update;
  UpdateEnrollmentStatusData.fromJson(dynamic json):
  
  enrollment_update = json['enrollment_update'] == null ? null : UpdateEnrollmentStatusEnrollmentUpdate.fromJson(json['enrollment_update']);
  @override
  bool operator ==(Object other) {
    if(identical(this, other)) {
      return true;
    }
    if(other.runtimeType != runtimeType) {
      return false;
    }

    final UpdateEnrollmentStatusData otherTyped = other as UpdateEnrollmentStatusData;
    return enrollment_update == otherTyped.enrollment_update;
    
  }
  @override
  int get hashCode => enrollment_update.hashCode;
  

  Map<String, dynamic> toJson() {
    Map<String, dynamic> json = {};
    if (enrollment_update != null) {
      json['enrollment_update'] = enrollment_update!.toJson();
    }
    return json;
  }

  UpdateEnrollmentStatusData({
    this.enrollment_update,
  });
}

@immutable
class UpdateEnrollmentStatusVariables {
  final String enrollmentId;
  final EnrollmentStatus status;
  late final Optional<Timestamp>completedAt;
  @Deprecated('fromJson is deprecated for Variable classes as they are no longer required for deserialization.')
  UpdateEnrollmentStatusVariables.fromJson(Map<String, dynamic> json):
  
  enrollmentId = nativeFromJson<String>(json['enrollmentId']),
  status = EnrollmentStatus.values.byName(json['status']) {
  
  
  
  
    completedAt = Optional.optional((json) => json['completedAt'] = Timestamp.fromJson(json['completedAt']), defaultSerializer);
    completedAt.value = json['completedAt'] == null ? null : Timestamp.fromJson(json['completedAt']);
  
  }
  @override
  bool operator ==(Object other) {
    if(identical(this, other)) {
      return true;
    }
    if(other.runtimeType != runtimeType) {
      return false;
    }

    final UpdateEnrollmentStatusVariables otherTyped = other as UpdateEnrollmentStatusVariables;
    return enrollmentId == otherTyped.enrollmentId && 
    status == otherTyped.status && 
    completedAt == otherTyped.completedAt;
    
  }
  @override
  int get hashCode => Object.hashAll([enrollmentId.hashCode, status.hashCode, completedAt.hashCode]);
  

  Map<String, dynamic> toJson() {
    Map<String, dynamic> json = {};
    json['enrollmentId'] = nativeToJson<String>(enrollmentId);
    json['status'] = 
    status.name
    ;
    if(completedAt.state == OptionalState.set) {
      json['completedAt'] = completedAt.toJson();
    }
    return json;
  }

  UpdateEnrollmentStatusVariables({
    required this.enrollmentId,
    required this.status,
    required this.completedAt,
  });
}

