part of 'generated.dart';

class CreateDefaultUserFnVariablesBuilder {
  String uid;
  String email;
  String name;
  String nid;

  final FirebaseDataConnect _dataConnect;
  CreateDefaultUserFnVariablesBuilder(this._dataConnect, {required  this.uid,required  this.email,required  this.name,required  this.nid,});
  Deserializer<CreateDefaultUserFnData> dataDeserializer = (dynamic json)  => CreateDefaultUserFnData.fromJson(jsonDecode(json));
  Serializer<CreateDefaultUserFnVariables> varsSerializer = (CreateDefaultUserFnVariables vars) => jsonEncode(vars.toJson());
  Future<OperationResult<CreateDefaultUserFnData, CreateDefaultUserFnVariables>> execute() {
    return ref().execute();
  }

  MutationRef<CreateDefaultUserFnData, CreateDefaultUserFnVariables> ref() {
    CreateDefaultUserFnVariables vars= CreateDefaultUserFnVariables(uid: uid,email: email,name: name,nid: nid,);
    return _dataConnect.mutation("CreateDefaultUserFn", dataDeserializer, varsSerializer, vars);
  }
}

@immutable
class CreateDefaultUserFnUserInsert {
  final String id;
  CreateDefaultUserFnUserInsert.fromJson(dynamic json):
  
  id = nativeFromJson<String>(json['id']);
  @override
  bool operator ==(Object other) {
    if(identical(this, other)) {
      return true;
    }
    if(other.runtimeType != runtimeType) {
      return false;
    }

    final CreateDefaultUserFnUserInsert otherTyped = other as CreateDefaultUserFnUserInsert;
    return id == otherTyped.id;
    
  }
  @override
  int get hashCode => id.hashCode;
  

  Map<String, dynamic> toJson() {
    Map<String, dynamic> json = {};
    json['id'] = nativeToJson<String>(id);
    return json;
  }

  CreateDefaultUserFnUserInsert({
    required this.id,
  });
}

@immutable
class CreateDefaultUserFnUserRoleInsert {
  final String userId;
  final String roleId;
  CreateDefaultUserFnUserRoleInsert.fromJson(dynamic json):
  
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

    final CreateDefaultUserFnUserRoleInsert otherTyped = other as CreateDefaultUserFnUserRoleInsert;
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

  CreateDefaultUserFnUserRoleInsert({
    required this.userId,
    required this.roleId,
  });
}

@immutable
class CreateDefaultUserFnData {
  final CreateDefaultUserFnUserInsert user_insert;
  final CreateDefaultUserFnUserRoleInsert userRole_insert;
  CreateDefaultUserFnData.fromJson(dynamic json):
  
  user_insert = CreateDefaultUserFnUserInsert.fromJson(json['user_insert']),
  userRole_insert = CreateDefaultUserFnUserRoleInsert.fromJson(json['userRole_insert']);
  @override
  bool operator ==(Object other) {
    if(identical(this, other)) {
      return true;
    }
    if(other.runtimeType != runtimeType) {
      return false;
    }

    final CreateDefaultUserFnData otherTyped = other as CreateDefaultUserFnData;
    return user_insert == otherTyped.user_insert && 
    userRole_insert == otherTyped.userRole_insert;
    
  }
  @override
  int get hashCode => Object.hashAll([user_insert.hashCode, userRole_insert.hashCode]);
  

  Map<String, dynamic> toJson() {
    Map<String, dynamic> json = {};
    json['user_insert'] = user_insert.toJson();
    json['userRole_insert'] = userRole_insert.toJson();
    return json;
  }

  CreateDefaultUserFnData({
    required this.user_insert,
    required this.userRole_insert,
  });
}

@immutable
class CreateDefaultUserFnVariables {
  final String uid;
  final String email;
  final String name;
  final String nid;
  @Deprecated('fromJson is deprecated for Variable classes as they are no longer required for deserialization.')
  CreateDefaultUserFnVariables.fromJson(Map<String, dynamic> json):
  
  uid = nativeFromJson<String>(json['uid']),
  email = nativeFromJson<String>(json['email']),
  name = nativeFromJson<String>(json['name']),
  nid = nativeFromJson<String>(json['nid']);
  @override
  bool operator ==(Object other) {
    if(identical(this, other)) {
      return true;
    }
    if(other.runtimeType != runtimeType) {
      return false;
    }

    final CreateDefaultUserFnVariables otherTyped = other as CreateDefaultUserFnVariables;
    return uid == otherTyped.uid && 
    email == otherTyped.email && 
    name == otherTyped.name && 
    nid == otherTyped.nid;
    
  }
  @override
  int get hashCode => Object.hashAll([uid.hashCode, email.hashCode, name.hashCode, nid.hashCode]);
  

  Map<String, dynamic> toJson() {
    Map<String, dynamic> json = {};
    json['uid'] = nativeToJson<String>(uid);
    json['email'] = nativeToJson<String>(email);
    json['name'] = nativeToJson<String>(name);
    json['nid'] = nativeToJson<String>(nid);
    return json;
  }

  CreateDefaultUserFnVariables({
    required this.uid,
    required this.email,
    required this.name,
    required this.nid,
  });
}

