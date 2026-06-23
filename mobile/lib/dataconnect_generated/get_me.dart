part of 'generated.dart';

class GetMeVariablesBuilder {
  
  final FirebaseDataConnect _dataConnect;
  GetMeVariablesBuilder(this._dataConnect, );
  Deserializer<GetMeData> dataDeserializer = (dynamic json)  => GetMeData.fromJson(jsonDecode(json));
  
  Future<QueryResult<GetMeData, void>> execute({QueryFetchPolicy fetchPolicy = QueryFetchPolicy.preferCache}) {
    return ref().execute(fetchPolicy: fetchPolicy);
  }

  QueryRef<GetMeData, void> ref() {
    
    return _dataConnect.query('GetMe', dataDeserializer, emptySerializer, null);
  }
}

@immutable
class GetMeUser {
  final String id;
  final String email;
  final String name;
  final String? avatar;
  final Timestamp createdAt;
  final Timestamp? lastLogin;
  final GetMeUserProfileOnUser? profile_on_user;
  final List<GetMeUserUserRolesOnUser> userRoles_on_user;
  GetMeUser.fromJson(dynamic json):
  
  id = nativeFromJson<String>(json['id']),
  email = nativeFromJson<String>(json['email']),
  name = nativeFromJson<String>(json['name']),
  avatar = json['avatar'] == null ? null : nativeFromJson<String>(json['avatar']),
  createdAt = Timestamp.fromJson(json['createdAt']),
  lastLogin = json['lastLogin'] == null ? null : Timestamp.fromJson(json['lastLogin']),
  profile_on_user = json['profile_on_user'] == null ? null : GetMeUserProfileOnUser.fromJson(json['profile_on_user']),
  userRoles_on_user = (json['userRoles_on_user'] as List<dynamic>)
        .map((e) => GetMeUserUserRolesOnUser.fromJson(e))
        .toList();
  @override
  bool operator ==(Object other) {
    if(identical(this, other)) {
      return true;
    }
    if(other.runtimeType != runtimeType) {
      return false;
    }

    final GetMeUser otherTyped = other as GetMeUser;
    return id == otherTyped.id && 
    email == otherTyped.email && 
    name == otherTyped.name && 
    avatar == otherTyped.avatar && 
    createdAt == otherTyped.createdAt && 
    lastLogin == otherTyped.lastLogin && 
    profile_on_user == otherTyped.profile_on_user && 
    userRoles_on_user == otherTyped.userRoles_on_user;
    
  }
  @override
  int get hashCode => Object.hashAll([id.hashCode, email.hashCode, name.hashCode, avatar.hashCode, createdAt.hashCode, lastLogin.hashCode, profile_on_user.hashCode, userRoles_on_user.hashCode]);
  

  Map<String, dynamic> toJson() {
    Map<String, dynamic> json = {};
    json['id'] = nativeToJson<String>(id);
    json['email'] = nativeToJson<String>(email);
    json['name'] = nativeToJson<String>(name);
    if (avatar != null) {
      json['avatar'] = nativeToJson<String?>(avatar);
    }
    json['createdAt'] = createdAt.toJson();
    if (lastLogin != null) {
      json['lastLogin'] = lastLogin!.toJson();
    }
    if (profile_on_user != null) {
      json['profile_on_user'] = profile_on_user!.toJson();
    }
    json['userRoles_on_user'] = userRoles_on_user.map((e) => e.toJson()).toList();
    return json;
  }

  GetMeUser({
    required this.id,
    required this.email,
    required this.name,
    this.avatar,
    required this.createdAt,
    this.lastLogin,
    this.profile_on_user,
    required this.userRoles_on_user,
  });
}

@immutable
class GetMeUserProfileOnUser {
  final String? bio;
  final String? company;
  final String? phone;
  final AnyValue? syncedPreferences;
  GetMeUserProfileOnUser.fromJson(dynamic json):
  
  bio = json['bio'] == null ? null : nativeFromJson<String>(json['bio']),
  company = json['company'] == null ? null : nativeFromJson<String>(json['company']),
  phone = json['phone'] == null ? null : nativeFromJson<String>(json['phone']),
  syncedPreferences = json['syncedPreferences'] == null ? null : AnyValue.fromJson(json['syncedPreferences']);
  @override
  bool operator ==(Object other) {
    if(identical(this, other)) {
      return true;
    }
    if(other.runtimeType != runtimeType) {
      return false;
    }

    final GetMeUserProfileOnUser otherTyped = other as GetMeUserProfileOnUser;
    return bio == otherTyped.bio && 
    company == otherTyped.company && 
    phone == otherTyped.phone && 
    syncedPreferences == otherTyped.syncedPreferences;
    
  }
  @override
  int get hashCode => Object.hashAll([bio.hashCode, company.hashCode, phone.hashCode, syncedPreferences.hashCode]);
  

  Map<String, dynamic> toJson() {
    Map<String, dynamic> json = {};
    if (bio != null) {
      json['bio'] = nativeToJson<String?>(bio);
    }
    if (company != null) {
      json['company'] = nativeToJson<String?>(company);
    }
    if (phone != null) {
      json['phone'] = nativeToJson<String?>(phone);
    }
    if (syncedPreferences != null) {
      json['syncedPreferences'] = syncedPreferences!.toJson();
    }
    return json;
  }

  GetMeUserProfileOnUser({
    this.bio,
    this.company,
    this.phone,
    this.syncedPreferences,
  });
}

@immutable
class GetMeUserUserRolesOnUser {
  final GetMeUserUserRolesOnUserRole role;
  GetMeUserUserRolesOnUser.fromJson(dynamic json):
  
  role = GetMeUserUserRolesOnUserRole.fromJson(json['role']);
  @override
  bool operator ==(Object other) {
    if(identical(this, other)) {
      return true;
    }
    if(other.runtimeType != runtimeType) {
      return false;
    }

    final GetMeUserUserRolesOnUser otherTyped = other as GetMeUserUserRolesOnUser;
    return role == otherTyped.role;
    
  }
  @override
  int get hashCode => role.hashCode;
  

  Map<String, dynamic> toJson() {
    Map<String, dynamic> json = {};
    json['role'] = role.toJson();
    return json;
  }

  GetMeUserUserRolesOnUser({
    required this.role,
  });
}

@immutable
class GetMeUserUserRolesOnUserRole {
  final String name;
  GetMeUserUserRolesOnUserRole.fromJson(dynamic json):
  
  name = nativeFromJson<String>(json['name']);
  @override
  bool operator ==(Object other) {
    if(identical(this, other)) {
      return true;
    }
    if(other.runtimeType != runtimeType) {
      return false;
    }

    final GetMeUserUserRolesOnUserRole otherTyped = other as GetMeUserUserRolesOnUserRole;
    return name == otherTyped.name;
    
  }
  @override
  int get hashCode => name.hashCode;
  

  Map<String, dynamic> toJson() {
    Map<String, dynamic> json = {};
    json['name'] = nativeToJson<String>(name);
    return json;
  }

  GetMeUserUserRolesOnUserRole({
    required this.name,
  });
}

@immutable
class GetMeData {
  final GetMeUser? user;
  GetMeData.fromJson(dynamic json):
  
  user = json['user'] == null ? null : GetMeUser.fromJson(json['user']);
  @override
  bool operator ==(Object other) {
    if(identical(this, other)) {
      return true;
    }
    if(other.runtimeType != runtimeType) {
      return false;
    }

    final GetMeData otherTyped = other as GetMeData;
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

  GetMeData({
    this.user,
  });
}

