part of 'generated.dart';

class CreateDefaultUserAndProfileFnVariablesBuilder {
  String uid;
  String email;
  String name;

  final FirebaseDataConnect _dataConnect;
  CreateDefaultUserAndProfileFnVariablesBuilder(this._dataConnect, {required  this.uid,required  this.email,required  this.name,});
  Deserializer<CreateDefaultUserAndProfileFnData> dataDeserializer = (dynamic json)  => CreateDefaultUserAndProfileFnData.fromJson(jsonDecode(json));
  Serializer<CreateDefaultUserAndProfileFnVariables> varsSerializer = (CreateDefaultUserAndProfileFnVariables vars) => jsonEncode(vars.toJson());
  Future<OperationResult<CreateDefaultUserAndProfileFnData, CreateDefaultUserAndProfileFnVariables>> execute() {
    return ref().execute();
  }

  MutationRef<CreateDefaultUserAndProfileFnData, CreateDefaultUserAndProfileFnVariables> ref() {
    CreateDefaultUserAndProfileFnVariables vars= CreateDefaultUserAndProfileFnVariables(uid: uid,email: email,name: name,);
    return _dataConnect.mutation("CreateDefaultUserAndProfileFn", dataDeserializer, varsSerializer, vars);
  }
}

@immutable
class CreateDefaultUserAndProfileFnUserInsert {
  final String id;
  CreateDefaultUserAndProfileFnUserInsert.fromJson(dynamic json):
  
  id = nativeFromJson<String>(json['id']);
  @override
  bool operator ==(Object other) {
    if(identical(this, other)) {
      return true;
    }
    if(other.runtimeType != runtimeType) {
      return false;
    }

    final CreateDefaultUserAndProfileFnUserInsert otherTyped = other as CreateDefaultUserAndProfileFnUserInsert;
    return id == otherTyped.id;
    
  }
  @override
  int get hashCode => id.hashCode;
  

  Map<String, dynamic> toJson() {
    Map<String, dynamic> json = {};
    json['id'] = nativeToJson<String>(id);
    return json;
  }

  CreateDefaultUserAndProfileFnUserInsert({
    required this.id,
  });
}

@immutable
class CreateDefaultUserAndProfileFnProfileInsert {
  final String userId;
  CreateDefaultUserAndProfileFnProfileInsert.fromJson(dynamic json):
  
  userId = nativeFromJson<String>(json['userId']);
  @override
  bool operator ==(Object other) {
    if(identical(this, other)) {
      return true;
    }
    if(other.runtimeType != runtimeType) {
      return false;
    }

    final CreateDefaultUserAndProfileFnProfileInsert otherTyped = other as CreateDefaultUserAndProfileFnProfileInsert;
    return userId == otherTyped.userId;
    
  }
  @override
  int get hashCode => userId.hashCode;
  

  Map<String, dynamic> toJson() {
    Map<String, dynamic> json = {};
    json['userId'] = nativeToJson<String>(userId);
    return json;
  }

  CreateDefaultUserAndProfileFnProfileInsert({
    required this.userId,
  });
}

@immutable
class CreateDefaultUserAndProfileFnUserRoleInsert {
  final String userId;
  final String roleId;
  CreateDefaultUserAndProfileFnUserRoleInsert.fromJson(dynamic json):
  
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

    final CreateDefaultUserAndProfileFnUserRoleInsert otherTyped = other as CreateDefaultUserAndProfileFnUserRoleInsert;
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

  CreateDefaultUserAndProfileFnUserRoleInsert({
    required this.userId,
    required this.roleId,
  });
}

@immutable
class CreateDefaultUserAndProfileFnData {
  final CreateDefaultUserAndProfileFnUserInsert user_insert;
  final CreateDefaultUserAndProfileFnProfileInsert profile_insert;
  final CreateDefaultUserAndProfileFnUserRoleInsert userRole_insert;
  CreateDefaultUserAndProfileFnData.fromJson(dynamic json):
  
  user_insert = CreateDefaultUserAndProfileFnUserInsert.fromJson(json['user_insert']),
  profile_insert = CreateDefaultUserAndProfileFnProfileInsert.fromJson(json['profile_insert']),
  userRole_insert = CreateDefaultUserAndProfileFnUserRoleInsert.fromJson(json['userRole_insert']);
  @override
  bool operator ==(Object other) {
    if(identical(this, other)) {
      return true;
    }
    if(other.runtimeType != runtimeType) {
      return false;
    }

    final CreateDefaultUserAndProfileFnData otherTyped = other as CreateDefaultUserAndProfileFnData;
    return user_insert == otherTyped.user_insert && 
    profile_insert == otherTyped.profile_insert && 
    userRole_insert == otherTyped.userRole_insert;
    
  }
  @override
  int get hashCode => Object.hashAll([user_insert.hashCode, profile_insert.hashCode, userRole_insert.hashCode]);
  

  Map<String, dynamic> toJson() {
    Map<String, dynamic> json = {};
    json['user_insert'] = user_insert.toJson();
    json['profile_insert'] = profile_insert.toJson();
    json['userRole_insert'] = userRole_insert.toJson();
    return json;
  }

  CreateDefaultUserAndProfileFnData({
    required this.user_insert,
    required this.profile_insert,
    required this.userRole_insert,
  });
}

@immutable
class CreateDefaultUserAndProfileFnVariables {
  final String uid;
  final String email;
  final String name;
  @Deprecated('fromJson is deprecated for Variable classes as they are no longer required for deserialization.')
  CreateDefaultUserAndProfileFnVariables.fromJson(Map<String, dynamic> json):
  
  uid = nativeFromJson<String>(json['uid']),
  email = nativeFromJson<String>(json['email']),
  name = nativeFromJson<String>(json['name']);
  @override
  bool operator ==(Object other) {
    if(identical(this, other)) {
      return true;
    }
    if(other.runtimeType != runtimeType) {
      return false;
    }

    final CreateDefaultUserAndProfileFnVariables otherTyped = other as CreateDefaultUserAndProfileFnVariables;
    return uid == otherTyped.uid && 
    email == otherTyped.email && 
    name == otherTyped.name;
    
  }
  @override
  int get hashCode => Object.hashAll([uid.hashCode, email.hashCode, name.hashCode]);
  

  Map<String, dynamic> toJson() {
    Map<String, dynamic> json = {};
    json['uid'] = nativeToJson<String>(uid);
    json['email'] = nativeToJson<String>(email);
    json['name'] = nativeToJson<String>(name);
    return json;
  }

  CreateDefaultUserAndProfileFnVariables({
    required this.uid,
    required this.email,
    required this.name,
  });
}

