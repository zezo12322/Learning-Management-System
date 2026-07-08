part of 'generated.dart';

class AssignNewRoleFnVariablesBuilder {
  String uid;
  String roleId;

  final FirebaseDataConnect _dataConnect;
  AssignNewRoleFnVariablesBuilder(this._dataConnect, {required  this.uid,required  this.roleId,});
  Deserializer<AssignNewRoleFnData> dataDeserializer = (dynamic json)  => AssignNewRoleFnData.fromJson(jsonDecode(json));
  Serializer<AssignNewRoleFnVariables> varsSerializer = (AssignNewRoleFnVariables vars) => jsonEncode(vars.toJson());
  Future<OperationResult<AssignNewRoleFnData, AssignNewRoleFnVariables>> execute() {
    return ref().execute();
  }

  MutationRef<AssignNewRoleFnData, AssignNewRoleFnVariables> ref() {
    AssignNewRoleFnVariables vars= AssignNewRoleFnVariables(uid: uid,roleId: roleId,);
    return _dataConnect.mutation("AssignNewRoleFn", dataDeserializer, varsSerializer, vars);
  }
}

@immutable
class AssignNewRoleFnUserRoleInsert {
  final String userId;
  final String roleId;
  AssignNewRoleFnUserRoleInsert.fromJson(dynamic json):
  
  userId = nativeFromJson<String>(json['userId']),
  roleId = nativeFromJson<String>(json['roleId']);
  @override
  bool operator ==(Object other) {
    if(identical(this, other)) {
      return true;
    }
    if(other.runtimeType != runtimeType) {
      return false;
    }

    final AssignNewRoleFnUserRoleInsert otherTyped = other as AssignNewRoleFnUserRoleInsert;
    return userId == otherTyped.userId && 
    roleId == otherTyped.roleId;
    
  }
  @override
  int get hashCode => Object.hashAll([userId.hashCode, roleId.hashCode]);
  

  Map<String, dynamic> toJson() {
    Map<String, dynamic> json = {};
    json['userId'] = nativeToJson<String>(userId);
    json['roleId'] = nativeToJson<String>(roleId);
    return json;
  }

  AssignNewRoleFnUserRoleInsert({
    required this.userId,
    required this.roleId,
  });
}

@immutable
class AssignNewRoleFnData {
  final AssignNewRoleFnUserRoleInsert userRole_insert;
  AssignNewRoleFnData.fromJson(dynamic json):
  
  userRole_insert = AssignNewRoleFnUserRoleInsert.fromJson(json['userRole_insert']);
  @override
  bool operator ==(Object other) {
    if(identical(this, other)) {
      return true;
    }
    if(other.runtimeType != runtimeType) {
      return false;
    }

    final AssignNewRoleFnData otherTyped = other as AssignNewRoleFnData;
    return userRole_insert == otherTyped.userRole_insert;
    
  }
  @override
  int get hashCode => userRole_insert.hashCode;
  

  Map<String, dynamic> toJson() {
    Map<String, dynamic> json = {};
    json['userRole_insert'] = userRole_insert.toJson();
    return json;
  }

  AssignNewRoleFnData({
    required this.userRole_insert,
  });
}

@immutable
class AssignNewRoleFnVariables {
  final String uid;
  final String roleId;
  @Deprecated('fromJson is deprecated for Variable classes as they are no longer required for deserialization.')
  AssignNewRoleFnVariables.fromJson(Map<String, dynamic> json):
  
  uid = nativeFromJson<String>(json['uid']),
  roleId = nativeFromJson<String>(json['roleId']);
  @override
  bool operator ==(Object other) {
    if(identical(this, other)) {
      return true;
    }
    if(other.runtimeType != runtimeType) {
      return false;
    }

    final AssignNewRoleFnVariables otherTyped = other as AssignNewRoleFnVariables;
    return uid == otherTyped.uid && 
    roleId == otherTyped.roleId;
    
  }
  @override
  int get hashCode => Object.hashAll([uid.hashCode, roleId.hashCode]);
  

  Map<String, dynamic> toJson() {
    Map<String, dynamic> json = {};
    json['uid'] = nativeToJson<String>(uid);
    json['roleId'] = nativeToJson<String>(roleId);
    return json;
  }

  AssignNewRoleFnVariables({
    required this.uid,
    required this.roleId,
  });
}

