part of 'generated.dart';

class GetUserClaimsVariablesBuilder {
  String uid;

  final FirebaseDataConnect _dataConnect;
  GetUserClaimsVariablesBuilder(this._dataConnect, {required  this.uid,});
  Deserializer<GetUserClaimsData> dataDeserializer = (dynamic json)  => GetUserClaimsData.fromJson(jsonDecode(json));
  Serializer<GetUserClaimsVariables> varsSerializer = (GetUserClaimsVariables vars) => jsonEncode(vars.toJson());
  Future<QueryResult<GetUserClaimsData, GetUserClaimsVariables>> execute({QueryFetchPolicy fetchPolicy = QueryFetchPolicy.preferCache}) {
    return ref().execute(fetchPolicy: fetchPolicy);
  }

  QueryRef<GetUserClaimsData, GetUserClaimsVariables> ref() {
    GetUserClaimsVariables vars= GetUserClaimsVariables(uid: uid,);
    return _dataConnect.query("GetUserClaims", dataDeserializer, varsSerializer, vars);
  }
}

@immutable
class GetUserClaimsUser {
  final String id;
  final List<GetUserClaimsUserUserRolesOnUser> userRoles_on_user;
  final GetUserClaimsUserProfileOnUser? profile_on_user;
  GetUserClaimsUser.fromJson(dynamic json):
  
  id = nativeFromJson<String>(json['id']),
  userRoles_on_user = (json['userRoles_on_user'] as List<dynamic>)
        .map((e) => GetUserClaimsUserUserRolesOnUser.fromJson(e))
        .toList(),
  profile_on_user = json['profile_on_user'] == null ? null : GetUserClaimsUserProfileOnUser.fromJson(json['profile_on_user']);
  @override
  bool operator ==(Object other) {
    if(identical(this, other)) {
      return true;
    }
    if(other.runtimeType != runtimeType) {
      return false;
    }

    final GetUserClaimsUser otherTyped = other as GetUserClaimsUser;
    return id == otherTyped.id && 
    userRoles_on_user == otherTyped.userRoles_on_user && 
    profile_on_user == otherTyped.profile_on_user;
    
  }
  @override
  int get hashCode => Object.hashAll([id.hashCode, userRoles_on_user.hashCode, profile_on_user.hashCode]);
  

  Map<String, dynamic> toJson() {
    Map<String, dynamic> json = {};
    json['id'] = nativeToJson<String>(id);
    json['userRoles_on_user'] = userRoles_on_user.map((e) => e.toJson()).toList();
    if (profile_on_user != null) {
      json['profile_on_user'] = profile_on_user!.toJson();
    }
    return json;
  }

  GetUserClaimsUser({
    required this.id,
    required this.userRoles_on_user,
    this.profile_on_user,
  });
}

@immutable
class GetUserClaimsUserUserRolesOnUser {
  final GetUserClaimsUserUserRolesOnUserRole role;
  GetUserClaimsUserUserRolesOnUser.fromJson(dynamic json):
  
  role = GetUserClaimsUserUserRolesOnUserRole.fromJson(json['role']);
  @override
  bool operator ==(Object other) {
    if(identical(this, other)) {
      return true;
    }
    if(other.runtimeType != runtimeType) {
      return false;
    }

    final GetUserClaimsUserUserRolesOnUser otherTyped = other as GetUserClaimsUserUserRolesOnUser;
    return role == otherTyped.role;
    
  }
  @override
  int get hashCode => role.hashCode;
  

  Map<String, dynamic> toJson() {
    Map<String, dynamic> json = {};
    json['role'] = role.toJson();
    return json;
  }

  GetUserClaimsUserUserRolesOnUser({
    required this.role,
  });
}

@immutable
class GetUserClaimsUserUserRolesOnUserRole {
  final String name;
  GetUserClaimsUserUserRolesOnUserRole.fromJson(dynamic json):
  
  name = nativeFromJson<String>(json['name']);
  @override
  bool operator ==(Object other) {
    if(identical(this, other)) {
      return true;
    }
    if(other.runtimeType != runtimeType) {
      return false;
    }

    final GetUserClaimsUserUserRolesOnUserRole otherTyped = other as GetUserClaimsUserUserRolesOnUserRole;
    return name == otherTyped.name;
    
  }
  @override
  int get hashCode => name.hashCode;
  

  Map<String, dynamic> toJson() {
    Map<String, dynamic> json = {};
    json['name'] = nativeToJson<String>(name);
    return json;
  }

  GetUserClaimsUserUserRolesOnUserRole({
    required this.name,
  });
}

@immutable
class GetUserClaimsUserProfileOnUser {
  final String? company;
  GetUserClaimsUserProfileOnUser.fromJson(dynamic json):
  
  company = json['company'] == null ? null : nativeFromJson<String>(json['company']);
  @override
  bool operator ==(Object other) {
    if(identical(this, other)) {
      return true;
    }
    if(other.runtimeType != runtimeType) {
      return false;
    }

    final GetUserClaimsUserProfileOnUser otherTyped = other as GetUserClaimsUserProfileOnUser;
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

  GetUserClaimsUserProfileOnUser({
    this.company,
  });
}

@immutable
class GetUserClaimsData {
  final GetUserClaimsUser? user;
  GetUserClaimsData.fromJson(dynamic json):
  
  user = json['user'] == null ? null : GetUserClaimsUser.fromJson(json['user']);
  @override
  bool operator ==(Object other) {
    if(identical(this, other)) {
      return true;
    }
    if(other.runtimeType != runtimeType) {
      return false;
    }

    final GetUserClaimsData otherTyped = other as GetUserClaimsData;
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

  GetUserClaimsData({
    this.user,
  });
}

@immutable
class GetUserClaimsVariables {
  final String uid;
  @Deprecated('fromJson is deprecated for Variable classes as they are no longer required for deserialization.')
  GetUserClaimsVariables.fromJson(Map<String, dynamic> json):
  
  uid = nativeFromJson<String>(json['uid']);
  @override
  bool operator ==(Object other) {
    if(identical(this, other)) {
      return true;
    }
    if(other.runtimeType != runtimeType) {
      return false;
    }

    final GetUserClaimsVariables otherTyped = other as GetUserClaimsVariables;
    return uid == otherTyped.uid;
    
  }
  @override
  int get hashCode => uid.hashCode;
  

  Map<String, dynamic> toJson() {
    Map<String, dynamic> json = {};
    json['uid'] = nativeToJson<String>(uid);
    return json;
  }

  GetUserClaimsVariables({
    required this.uid,
  });
}

