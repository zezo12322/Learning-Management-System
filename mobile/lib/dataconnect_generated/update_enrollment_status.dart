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
class UpdateEnrollmentStatusData {
  final int enrollment_updateMany;
  UpdateEnrollmentStatusData.fromJson(dynamic json):
  
  enrollment_updateMany = nativeFromJson<int>(json['enrollment_updateMany']);
  @override
  bool operator ==(Object other) {
    if(identical(this, other)) {
      return true;
    }
    if(other.runtimeType != runtimeType) {
      return false;
    }

    final UpdateEnrollmentStatusData otherTyped = other as UpdateEnrollmentStatusData;
    return enrollment_updateMany == otherTyped.enrollment_updateMany;
    
  }
  @override
  int get hashCode => enrollment_updateMany.hashCode;
  

  Map<String, dynamic> toJson() {
    Map<String, dynamic> json = {};
    json['enrollment_updateMany'] = nativeToJson<int>(enrollment_updateMany);
    return json;
  }

  UpdateEnrollmentStatusData({
    required this.enrollment_updateMany,
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

