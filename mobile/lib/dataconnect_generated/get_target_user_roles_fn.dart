part of 'generated.dart';

class GetTargetUserRolesFnVariablesBuilder {
  String uid;

  final FirebaseDataConnect _dataConnect;
  GetTargetUserRolesFnVariablesBuilder(this._dataConnect, {required  this.uid,});
  Deserializer<GetTargetUserRolesFnData> dataDeserializer = (dynamic json)  => GetTargetUserRolesFnData.fromJson(jsonDecode(json));
  Serializer<GetTargetUserRolesFnVariables> varsSerializer = (GetTargetUserRolesFnVariables vars) => jsonEncode(vars.toJson());
  Future<QueryResult<GetTargetUserRolesFnData, GetTargetUserRolesFnVariables>> execute({QueryFetchPolicy fetchPolicy = QueryFetchPolicy.preferCache}) {
    return ref().execute(fetchPolicy: fetchPolicy);
  }

  QueryRef<GetTargetUserRolesFnData, GetTargetUserRolesFnVariables> ref() {
    GetTargetUserRolesFnVariables vars= GetTargetUserRolesFnVariables(uid: uid,);
    return _dataConnect.query("GetTargetUserRolesFn", dataDeserializer, varsSerializer, vars);
  }
}

@immutable
class GetTargetUserRolesFnUser {
  final List<GetTargetUserRolesFnUserUserRolesOnUser> userRoles_on_user;
  GetTargetUserRolesFnUser.fromJson(dynamic json):
  
  userRoles_on_user = (json['userRoles_on_user'] as List<dynamic>)
        .map((e) => GetTargetUserRolesFnUserUserRolesOnUser.fromJson(e))
        .toList();
  @override
  bool operator ==(Object other) {
    if(identical(this, other)) {
      return true;
    }
    if(other.runtimeType != runtimeType) {
      return false;
    }

    final GetTargetUserRolesFnUser otherTyped = other as GetTargetUserRolesFnUser;
    return userRoles_on_user == otherTyped.userRoles_on_user;
    
  }
  @override
  int get hashCode => userRoles_on_user.hashCode;
  

  Map<String, dynamic> toJson() {
    Map<String, dynamic> json = {};
    json['userRoles_on_user'] = userRoles_on_user.map((e) => e.toJson()).toList();
    return json;
  }

  GetTargetUserRolesFnUser({
    required this.userRoles_on_user,
  });
}

@immutable
class GetTargetUserRolesFnUserUserRolesOnUser {
  final String roleId;
  GetTargetUserRolesFnUserUserRolesOnUser.fromJson(dynamic json):
  
  roleId = nativeFromJson<String>(json['roleId']);
  @override
  bool operator ==(Object other) {
    if(identical(this, other)) {
      return true;
    }
    if(other.runtimeType != runtimeType) {
      return false;
    }

    final GetTargetUserRolesFnUserUserRolesOnUser otherTyped = other as GetTargetUserRolesFnUserUserRolesOnUser;
    return roleId == otherTyped.roleId;
    
  }
  @override
  int get hashCode => roleId.hashCode;
  

  Map<String, dynamic> toJson() {
    Map<String, dynamic> json = {};
    json['roleId'] = nativeToJson<String>(roleId);
    return json;
  }

  GetTargetUserRolesFnUserUserRolesOnUser({
    required this.roleId,
  });
}

@immutable
class GetTargetUserRolesFnData {
  final GetTargetUserRolesFnUser? user;
  GetTargetUserRolesFnData.fromJson(dynamic json):
  
  user = json['user'] == null ? null : GetTargetUserRolesFnUser.fromJson(json['user']);
  @override
  bool operator ==(Object other) {
    if(identical(this, other)) {
      return true;
    }
    if(other.runtimeType != runtimeType) {
      return false;
    }

    final GetTargetUserRolesFnData otherTyped = other as GetTargetUserRolesFnData;
    return user == otherTyped.user;
    
  }
  @override
  int get hashCode => user.hashCode;
  

  Map<String, dynamic> toJson() {
    Map<String, dynamic> json = {};
    if (user != null) {
      json['user'] = user!.toJson();
    }
    return json;
  }

  GetTargetUserRolesFnData({
    this.user,
  });
}

@immutable
class GetTargetUserRolesFnVariables {
  final String uid;
  @Deprecated('fromJson is deprecated for Variable classes as they are no longer required for deserialization.')
  GetTargetUserRolesFnVariables.fromJson(Map<String, dynamic> json):
  
  uid = nativeFromJson<String>(json['uid']);
  @override
  bool operator ==(Object other) {
    if(identical(this, other)) {
      return true;
    }
    if(other.runtimeType != runtimeType) {
      return false;
    }

    final GetTargetUserRolesFnVariables otherTyped = other as GetTargetUserRolesFnVariables;
    return uid == otherTyped.uid;
    
  }
  @override
  int get hashCode => uid.hashCode;
  

  Map<String, dynamic> toJson() {
    Map<String, dynamic> json = {};
    json['uid'] = nativeToJson<String>(uid);
    return json;
  }

  GetTargetUserRolesFnVariables({
    required this.uid,
  });
}

