part of 'generated.dart';

class RemoveRoleFnVariablesBuilder {
  String uid;
  String roleId;

  final FirebaseDataConnect _dataConnect;
  RemoveRoleFnVariablesBuilder(this._dataConnect, {required  this.uid,required  this.roleId,});
  Deserializer<RemoveRoleFnData> dataDeserializer = (dynamic json)  => RemoveRoleFnData.fromJson(jsonDecode(json));
  Serializer<RemoveRoleFnVariables> varsSerializer = (RemoveRoleFnVariables vars) => jsonEncode(vars.toJson());
  Future<OperationResult<RemoveRoleFnData, RemoveRoleFnVariables>> execute() {
    return ref().execute();
  }

  MutationRef<RemoveRoleFnData, RemoveRoleFnVariables> ref() {
    RemoveRoleFnVariables vars= RemoveRoleFnVariables(uid: uid,roleId: roleId,);
    return _dataConnect.mutation("RemoveRoleFn", dataDeserializer, varsSerializer, vars);
  }
}

@immutable
class RemoveRoleFnUserRoleDelete {
  final String userId;
  final String roleId;
  RemoveRoleFnUserRoleDelete.fromJson(dynamic json):
  
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

    final RemoveRoleFnUserRoleDelete otherTyped = other as RemoveRoleFnUserRoleDelete;
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

  RemoveRoleFnUserRoleDelete({
    required this.userId,
    required this.roleId,
  });
}

@immutable
class RemoveRoleFnData {
  final RemoveRoleFnUserRoleDelete? userRole_delete;
  RemoveRoleFnData.fromJson(dynamic json):
  
  userRole_delete = json['userRole_delete'] == null ? null : RemoveRoleFnUserRoleDelete.fromJson(json['userRole_delete']);
  @override
  bool operator ==(Object other) {
    if(identical(this, other)) {
      return true;
    }
    if(other.runtimeType != runtimeType) {
      return false;
    }

    final RemoveRoleFnData otherTyped = other as RemoveRoleFnData;
    return userRole_delete == otherTyped.userRole_delete;
    
  }
  @override
  int get hashCode => userRole_delete.hashCode;
  

  Map<String, dynamic> toJson() {
    Map<String, dynamic> json = {};
    if (userRole_delete != null) {
      json['userRole_delete'] = userRole_delete!.toJson();
    }
    return json;
  }

  RemoveRoleFnData({
    this.userRole_delete,
  });
}

@immutable
class RemoveRoleFnVariables {
  final String uid;
  final String roleId;
  @Deprecated('fromJson is deprecated for Variable classes as they are no longer required for deserialization.')
  RemoveRoleFnVariables.fromJson(Map<String, dynamic> json):
  
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

    final RemoveRoleFnVariables otherTyped = other as RemoveRoleFnVariables;
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

  RemoveRoleFnVariables({
    required this.uid,
    required this.roleId,
  });
}

