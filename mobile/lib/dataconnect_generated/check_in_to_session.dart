part of 'generated.dart';

class CheckInToSessionVariablesBuilder {
  String sessionId;
  AttendanceStatus status;
  AttendanceMethod method;

  final FirebaseDataConnect _dataConnect;
  CheckInToSessionVariablesBuilder(this._dataConnect, {required  this.sessionId,required  this.status,required  this.method,});
  Deserializer<CheckInToSessionData> dataDeserializer = (dynamic json)  => CheckInToSessionData.fromJson(jsonDecode(json));
  Serializer<CheckInToSessionVariables> varsSerializer = (CheckInToSessionVariables vars) => jsonEncode(vars.toJson());
  Future<OperationResult<CheckInToSessionData, CheckInToSessionVariables>> execute() {
    return ref().execute();
  }

  MutationRef<CheckInToSessionData, CheckInToSessionVariables> ref() {
    CheckInToSessionVariables vars= CheckInToSessionVariables(sessionId: sessionId,status: status,method: method,);
    return _dataConnect.mutation("CheckInToSession", dataDeserializer, varsSerializer, vars);
  }
}

@immutable
class CheckInToSessionAttendanceInsert {
  final String id;
  CheckInToSessionAttendanceInsert.fromJson(dynamic json):
  
  id = nativeFromJson<String>(json['id']);
  @override
  bool operator ==(Object other) {
    if(identical(this, other)) {
      return true;
    }
    if(other.runtimeType != runtimeType) {
      return false;
    }

    final CheckInToSessionAttendanceInsert otherTyped = other as CheckInToSessionAttendanceInsert;
    return id == otherTyped.id;
    
  }
  @override
  int get hashCode => id.hashCode;
  

  Map<String, dynamic> toJson() {
    Map<String, dynamic> json = {};
    json['id'] = nativeToJson<String>(id);
    return json;
  }

  CheckInToSessionAttendanceInsert({
    required this.id,
  });
}

@immutable
class CheckInToSessionData {
  final CheckInToSessionAttendanceInsert attendance_insert;
  CheckInToSessionData.fromJson(dynamic json):
  
  attendance_insert = CheckInToSessionAttendanceInsert.fromJson(json['attendance_insert']);
  @override
  bool operator ==(Object other) {
    if(identical(this, other)) {
      return true;
    }
    if(other.runtimeType != runtimeType) {
      return false;
    }

    final CheckInToSessionData otherTyped = other as CheckInToSessionData;
    return attendance_insert == otherTyped.attendance_insert;
    
  }
  @override
  int get hashCode => attendance_insert.hashCode;
  

  Map<String, dynamic> toJson() {
    Map<String, dynamic> json = {};
    json['attendance_insert'] = attendance_insert.toJson();
    return json;
  }

  CheckInToSessionData({
    required this.attendance_insert,
  });
}

@immutable
class CheckInToSessionVariables {
  final String sessionId;
  final AttendanceStatus status;
  final AttendanceMethod method;
  @Deprecated('fromJson is deprecated for Variable classes as they are no longer required for deserialization.')
  CheckInToSessionVariables.fromJson(Map<String, dynamic> json):
  
  sessionId = nativeFromJson<String>(json['sessionId']),
  status = AttendanceStatus.values.byName(json['status']),
  method = AttendanceMethod.values.byName(json['method']);
  @override
  bool operator ==(Object other) {
    if(identical(this, other)) {
      return true;
    }
    if(other.runtimeType != runtimeType) {
      return false;
    }

    final CheckInToSessionVariables otherTyped = other as CheckInToSessionVariables;
    return sessionId == otherTyped.sessionId && 
    status == otherTyped.status && 
    method == otherTyped.method;
    
  }
  @override
  int get hashCode => Object.hashAll([sessionId.hashCode, status.hashCode, method.hashCode]);
  

  Map<String, dynamic> toJson() {
    Map<String, dynamic> json = {};
    json['sessionId'] = nativeToJson<String>(sessionId);
    json['status'] = 
    status.name
    ;
    json['method'] = 
    method.name
    ;
    return json;
  }

  CheckInToSessionVariables({
    required this.sessionId,
    required this.status,
    required this.method,
  });
}

