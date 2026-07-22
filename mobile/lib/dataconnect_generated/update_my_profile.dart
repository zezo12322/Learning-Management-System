part of 'generated.dart';

class UpdateMyProfileVariablesBuilder {
  Optional<String> _bio = Optional.optional(nativeFromJson, nativeToJson);
  Optional<String> _company = Optional.optional(nativeFromJson, nativeToJson);
  Optional<String> _phone = Optional.optional(nativeFromJson, nativeToJson);
  Optional<AnyValue> _preferences = Optional.optional(AnyValue.fromJson, defaultSerializer);

  final FirebaseDataConnect _dataConnect;
  UpdateMyProfileVariablesBuilder bio(String? t) {
   _bio.value = t;
   return this;
  }
  UpdateMyProfileVariablesBuilder company(String? t) {
   _company.value = t;
   return this;
  }
  UpdateMyProfileVariablesBuilder phone(String? t) {
   _phone.value = t;
   return this;
  }
  UpdateMyProfileVariablesBuilder preferences(AnyValue? t) {
   _preferences.value = t;
   return this;
  }

  UpdateMyProfileVariablesBuilder(this._dataConnect, );
  Deserializer<UpdateMyProfileData> dataDeserializer = (dynamic json)  => UpdateMyProfileData.fromJson(jsonDecode(json));
  Serializer<UpdateMyProfileVariables> varsSerializer = (UpdateMyProfileVariables vars) => jsonEncode(vars.toJson());
  Future<OperationResult<UpdateMyProfileData, UpdateMyProfileVariables>> execute() {
    return ref().execute();
  }

  MutationRef<UpdateMyProfileData, UpdateMyProfileVariables> ref() {
    UpdateMyProfileVariables vars= UpdateMyProfileVariables(bio: _bio,company: _company,phone: _phone,preferences: _preferences,);
    return _dataConnect.mutation("UpdateMyProfile", dataDeserializer, varsSerializer, vars);
  }
}

@immutable
class UpdateMyProfileProfileUpsert {
  final String userId;
  UpdateMyProfileProfileUpsert.fromJson(dynamic json):
  
  userId = nativeFromJson<String>(json['userId']);
  @override
  bool operator ==(Object other) {
    if(identical(this, other)) {
      return true;
    }
    if(other.runtimeType != runtimeType) {
      return false;
    }

    final UpdateMyProfileProfileUpsert otherTyped = other as UpdateMyProfileProfileUpsert;
    return userId == otherTyped.userId;
    
  }
  @override
  int get hashCode => userId.hashCode;
  

  Map<String, dynamic> toJson() {
    Map<String, dynamic> json = {};
    json['userId'] = nativeToJson<String>(userId);
    return json;
  }

  UpdateMyProfileProfileUpsert({
    required this.userId,
  });
}

@immutable
class UpdateMyProfileData {
  final UpdateMyProfileProfileUpsert profile_upsert;
  UpdateMyProfileData.fromJson(dynamic json):
  
  profile_upsert = UpdateMyProfileProfileUpsert.fromJson(json['profile_upsert']);
  @override
  bool operator ==(Object other) {
    if(identical(this, other)) {
      return true;
    }
    if(other.runtimeType != runtimeType) {
      return false;
    }

    final UpdateMyProfileData otherTyped = other as UpdateMyProfileData;
    return profile_upsert == otherTyped.profile_upsert;
    
  }
  @override
  int get hashCode => profile_upsert.hashCode;
  

  Map<String, dynamic> toJson() {
    Map<String, dynamic> json = {};
    json['profile_upsert'] = profile_upsert.toJson();
    return json;
  }

  UpdateMyProfileData({
    required this.profile_upsert,
  });
}

@immutable
class UpdateMyProfileVariables {
  late final Optional<String>bio;
  late final Optional<String>company;
  late final Optional<String>phone;
  late final Optional<AnyValue>preferences;
  @Deprecated('fromJson is deprecated for Variable classes as they are no longer required for deserialization.')
  UpdateMyProfileVariables.fromJson(Map<String, dynamic> json) {
  
  
    bio = Optional.optional(nativeFromJson, nativeToJson);
    bio.value = json['bio'] == null ? null : nativeFromJson<String>(json['bio']);
  
  
    company = Optional.optional(nativeFromJson, nativeToJson);
    company.value = json['company'] == null ? null : nativeFromJson<String>(json['company']);
  
  
    phone = Optional.optional(nativeFromJson, nativeToJson);
    phone.value = json['phone'] == null ? null : nativeFromJson<String>(json['phone']);
  
  
    preferences = Optional.optional(AnyValue.fromJson, defaultSerializer);
    preferences.value = json['preferences'] == null ? null : AnyValue.fromJson(json['preferences']);
  
  }
  @override
  bool operator ==(Object other) {
    if(identical(this, other)) {
      return true;
    }
    if(other.runtimeType != runtimeType) {
      return false;
    }

    final UpdateMyProfileVariables otherTyped = other as UpdateMyProfileVariables;
    return bio == otherTyped.bio && 
    company == otherTyped.company && 
    phone == otherTyped.phone && 
    preferences == otherTyped.preferences;
    
  }
  @override
  int get hashCode => Object.hashAll([bio.hashCode, company.hashCode, phone.hashCode, preferences.hashCode]);
  

  Map<String, dynamic> toJson() {
    Map<String, dynamic> json = {};
    if(bio.state == OptionalState.set) {
      json['bio'] = bio.toJson();
    }
    if(company.state == OptionalState.set) {
      json['company'] = company.toJson();
    }
    if(phone.state == OptionalState.set) {
      json['phone'] = phone.toJson();
    }
    if(preferences.state == OptionalState.set) {
      json['preferences'] = preferences.toJson();
    }
    return json;
  }

  UpdateMyProfileVariables({
    required this.bio,
    required this.company,
    required this.phone,
    required this.preferences,
  });
}

