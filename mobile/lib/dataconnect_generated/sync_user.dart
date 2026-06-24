part of 'generated.dart';

class SyncUserVariablesBuilder {
  String email;
  String name;
  Optional<String> _avatar = Optional.optional(nativeFromJson, nativeToJson);

  final FirebaseDataConnect _dataConnect;  SyncUserVariablesBuilder avatar(String? t) {
   _avatar.value = t;
   return this;
  }

  SyncUserVariablesBuilder(this._dataConnect, {required  this.email,required  this.name,});
  Deserializer<SyncUserData> dataDeserializer = (dynamic json)  => SyncUserData.fromJson(jsonDecode(json));
  Serializer<SyncUserVariables> varsSerializer = (SyncUserVariables vars) => jsonEncode(vars.toJson());
  Future<OperationResult<SyncUserData, SyncUserVariables>> execute() {
    return ref().execute();
  }

  MutationRef<SyncUserData, SyncUserVariables> ref() {
    SyncUserVariables vars= SyncUserVariables(email: email,name: name,avatar: _avatar,);
    return _dataConnect.mutation("SyncUser", dataDeserializer, varsSerializer, vars);
  }
}

@immutable
class SyncUserUserUpsert {
  final String id;
  SyncUserUserUpsert.fromJson(dynamic json):
  
  id = nativeFromJson<String>(json['id']);
  @override
  bool operator ==(Object other) {
    if(identical(this, other)) {
      return true;
    }
    if(other.runtimeType != runtimeType) {
      return false;
    }

    final SyncUserUserUpsert otherTyped = other as SyncUserUserUpsert;
    return id == otherTyped.id;
    
  }
  @override
  int get hashCode => id.hashCode;
  

  Map<String, dynamic> toJson() {
    Map<String, dynamic> json = {};
    json['id'] = nativeToJson<String>(id);
    return json;
  }

  SyncUserUserUpsert({
    required this.id,
  });
}

@immutable
class SyncUserData {
  final SyncUserUserUpsert user_upsert;
  SyncUserData.fromJson(dynamic json):
  
  user_upsert = SyncUserUserUpsert.fromJson(json['user_upsert']);
  @override
  bool operator ==(Object other) {
    if(identical(this, other)) {
      return true;
    }
    if(other.runtimeType != runtimeType) {
      return false;
    }

    final SyncUserData otherTyped = other as SyncUserData;
    return user_upsert == otherTyped.user_upsert;
    
  }
  @override
  int get hashCode => user_upsert.hashCode;
  

  Map<String, dynamic> toJson() {
    Map<String, dynamic> json = {};
    json['user_upsert'] = user_upsert.toJson();
    return json;
  }

  SyncUserData({
    required this.user_upsert,
  });
}

@immutable
class SyncUserVariables {
  final String email;
  final String name;
  late final Optional<String>avatar;
  @Deprecated('fromJson is deprecated for Variable classes as they are no longer required for deserialization.')
  SyncUserVariables.fromJson(Map<String, dynamic> json):
  
  email = nativeFromJson<String>(json['email']),
  name = nativeFromJson<String>(json['name']) {
  
  
  
  
    avatar = Optional.optional(nativeFromJson, nativeToJson);
    avatar.value = json['avatar'] == null ? null : nativeFromJson<String>(json['avatar']);
  
  }
  @override
  bool operator ==(Object other) {
    if(identical(this, other)) {
      return true;
    }
    if(other.runtimeType != runtimeType) {
      return false;
    }

    final SyncUserVariables otherTyped = other as SyncUserVariables;
    return email == otherTyped.email && 
    name == otherTyped.name && 
    avatar == otherTyped.avatar;
    
  }
  @override
  int get hashCode => Object.hashAll([email.hashCode, name.hashCode, avatar.hashCode]);
  

  Map<String, dynamic> toJson() {
    Map<String, dynamic> json = {};
    json['email'] = nativeToJson<String>(email);
    json['name'] = nativeToJson<String>(name);
    if(avatar.state == OptionalState.set) {
      json['avatar'] = avatar.toJson();
    }
    return json;
  }

  SyncUserVariables({
    required this.email,
    required this.name,
    required this.avatar,
  });
}

