part of 'generated.dart';

class GetUserClaimsFnVariablesBuilder {
  String uid;

  final FirebaseDataConnect _dataConnect;
  GetUserClaimsFnVariablesBuilder(this._dataConnect, {required  this.uid,});
  Deserializer<GetUserClaimsFnData> dataDeserializer = (dynamic json)  => GetUserClaimsFnData.fromJson(jsonDecode(json));
  Serializer<GetUserClaimsFnVariables> varsSerializer = (GetUserClaimsFnVariables vars) => jsonEncode(vars.toJson());
  Future<QueryResult<GetUserClaimsFnData, GetUserClaimsFnVariables>> execute({QueryFetchPolicy fetchPolicy = QueryFetchPolicy.preferCache}) {
    return ref().execute(fetchPolicy: fetchPolicy);
  }

  QueryRef<GetUserClaimsFnData, GetUserClaimsFnVariables> ref() {
    GetUserClaimsFnVariables vars= GetUserClaimsFnVariables(uid: uid,);
    return _dataConnect.query("GetUserClaimsFn", dataDeserializer, varsSerializer, vars);
  }
}

@immutable
class GetUserClaimsFnUser {
  final List<GetUserClaimsFnUserUserRolesOnUser> userRoles_on_user;
  final GetUserClaimsFnUserProfileOnUser? profile_on_user;
  GetUserClaimsFnUser.fromJson(dynamic json):
  
  userRoles_on_user = (json['userRoles_on_user'] as List<dynamic>)
        .map((e) => GetUserClaimsFnUserUserRolesOnUser.fromJson(e))
        .toList(),
  profile_on_user = json['profile_on_user'] == null ? null : GetUserClaimsFnUserProfileOnUser.fromJson(json['profile_on_user']);
  @override
  bool operator ==(Object other) {
    if(identical(this, other)) {
      return true;
    }
    if(other.runtimeType != runtimeType) {
      return false;
    }

    final GetUserClaimsFnUser otherTyped = other as GetUserClaimsFnUser;
    return userRoles_on_user == otherTyped.userRoles_on_user && 
    profile_on_user == otherTyped.profile_on_user;
    
  }
  @override
  int get hashCode => Object.hashAll([userRoles_on_user.hashCode, profile_on_user.hashCode]);
  

  Map<String, dynamic> toJson() {
    Map<String, dynamic> json = {};
    json['userRoles_on_user'] = userRoles_on_user.map((e) => e.toJson()).toList();
    if (profile_on_user != null) {
      json['profile_on_user'] = profile_on_user!.toJson();
    }
    return json;
  }

  GetUserClaimsFnUser({
    required this.userRoles_on_user,
    this.profile_on_user,
  });
}

@immutable
class GetUserClaimsFnUserUserRolesOnUser {
  final GetUserClaimsFnUserUserRolesOnUserRole role;
  GetUserClaimsFnUserUserRolesOnUser.fromJson(dynamic json):
  
  role = GetUserClaimsFnUserUserRolesOnUserRole.fromJson(json['role']);
  @override
  bool operator ==(Object other) {
    if(identical(this, other)) {
      return true;
    }
    if(other.runtimeType != runtimeType) {
      return false;
    }

    final GetUserClaimsFnUserUserRolesOnUser otherTyped = other as GetUserClaimsFnUserUserRolesOnUser;
    return role == otherTyped.role;
    
  }
  @override
  int get hashCode => role.hashCode;
  

  Map<String, dynamic> toJson() {
    Map<String, dynamic> json = {};
    json['role'] = role.toJson();
    return json;
  }

  GetUserClaimsFnUserUserRolesOnUser({
    required this.role,
  });
}

@immutable
class GetUserClaimsFnUserUserRolesOnUserRole {
  final String name;
  GetUserClaimsFnUserUserRolesOnUserRole.fromJson(dynamic json):
  
  name = nativeFromJson<String>(json['name']);
  @override
  bool operator ==(Object other) {
    if(identical(this, other)) {
      return true;
    }
    if(other.runtimeType != runtimeType) {
      return false;
    }

    final GetUserClaimsFnUserUserRolesOnUserRole otherTyped = other as GetUserClaimsFnUserUserRolesOnUserRole;
    return name == otherTyped.name;
    
  }
  @override
  int get hashCode => name.hashCode;
  

  Map<String, dynamic> toJson() {
    Map<String, dynamic> json = {};
    json['name'] = nativeToJson<String>(name);
    return json;
  }

  GetUserClaimsFnUserUserRolesOnUserRole({
    required this.name,
  });
}

@immutable
class GetUserClaimsFnUserProfileOnUser {
  final String? company;
  GetUserClaimsFnUserProfileOnUser.fromJson(dynamic json):
  
  company = json['company'] == null ? null : nativeFromJson<String>(json['company']);
  @override
  bool operator ==(Object other) {
    if(identical(this, other)) {
      return true;
    }
    if(other.runtimeType != runtimeType) {
      return false;
    }

    final GetUserClaimsFnUserProfileOnUser otherTyped = other as GetUserClaimsFnUserProfileOnUser;
    return company == otherTyped.company;
    
  }
  @override
  int get hashCode => company.hashCode;
  

  Map<String, dynamic> toJson() {
    Map<String, dynamic> json = {};
    if (company != null) {
      json['company'] = nativeToJson<String?>(company);
    }
    return json;
  }

  GetUserClaimsFnUserProfileOnUser({
    this.company,
  });
}

@immutable
class GetUserClaimsFnData {
  final GetUserClaimsFnUser? user;
  GetUserClaimsFnData.fromJson(dynamic json):
  
  user = json['user'] == null ? null : GetUserClaimsFnUser.fromJson(json['user']);
  @override
  bool operator ==(Object other) {
    if(identical(this, other)) {
      return true;
    }
    if(other.runtimeType != runtimeType) {
      return false;
    }

    final GetUserClaimsFnData otherTyped = other as GetUserClaimsFnData;
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

  GetUserClaimsFnData({
    this.user,
  });
}

@immutable
class GetUserClaimsFnVariables {
  final String uid;
  @Deprecated('fromJson is deprecated for Variable classes as they are no longer required for deserialization.')
  GetUserClaimsFnVariables.fromJson(Map<String, dynamic> json):
  
  uid = nativeFromJson<String>(json['uid']);
  @override
  bool operator ==(Object other) {
    if(identical(this, other)) {
      return true;
    }
    if(other.runtimeType != runtimeType) {
      return false;
    }

    final GetUserClaimsFnVariables otherTyped = other as GetUserClaimsFnVariables;
    return uid == otherTyped.uid;
    
  }
  @override
  int get hashCode => uid.hashCode;
  

  Map<String, dynamic> toJson() {
    Map<String, dynamic> json = {};
    json['uid'] = nativeToJson<String>(uid);
    return json;
  }

  GetUserClaimsFnVariables({
    required this.uid,
  });
}

