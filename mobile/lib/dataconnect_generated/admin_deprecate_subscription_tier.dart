part of 'generated.dart';

class AdminDeprecateSubscriptionTierVariablesBuilder {
  String tierId;

  final FirebaseDataConnect _dataConnect;
  AdminDeprecateSubscriptionTierVariablesBuilder(this._dataConnect, {required  this.tierId,});
  Deserializer<AdminDeprecateSubscriptionTierData> dataDeserializer = (dynamic json)  => AdminDeprecateSubscriptionTierData.fromJson(jsonDecode(json));
  Serializer<AdminDeprecateSubscriptionTierVariables> varsSerializer = (AdminDeprecateSubscriptionTierVariables vars) => jsonEncode(vars.toJson());
  Future<OperationResult<AdminDeprecateSubscriptionTierData, AdminDeprecateSubscriptionTierVariables>> execute() {
    return ref().execute();
  }

  MutationRef<AdminDeprecateSubscriptionTierData, AdminDeprecateSubscriptionTierVariables> ref() {
    AdminDeprecateSubscriptionTierVariables vars= AdminDeprecateSubscriptionTierVariables(tierId: tierId,);
    return _dataConnect.mutation('AdminDeprecateSubscriptionTier', dataDeserializer, varsSerializer, vars);
  }
}

@immutable
class AdminDeprecateSubscriptionTierSubscriptionTierUpdate {
  final String id;
  AdminDeprecateSubscriptionTierSubscriptionTierUpdate.fromJson(dynamic json):
  
  id = nativeFromJson<String>(json['id']);
  @override
  bool operator ==(Object other) {
    if(identical(this, other)) {
      return true;
    }
    if(other.runtimeType != runtimeType) {
      return false;
    }

    final AdminDeprecateSubscriptionTierSubscriptionTierUpdate otherTyped = other as AdminDeprecateSubscriptionTierSubscriptionTierUpdate;
    return id == otherTyped.id;
    
  }
  @override
  int get hashCode => id.hashCode;
  

  Map<String, dynamic> toJson() {
    Map<String, dynamic> json = {};
    json['id'] = nativeToJson<String>(id);
    return json;
  }

  AdminDeprecateSubscriptionTierSubscriptionTierUpdate({
    required this.id,
  });
}

@immutable
class AdminDeprecateSubscriptionTierData {
  final AdminDeprecateSubscriptionTierSubscriptionTierUpdate? subscriptionTier_update;
  AdminDeprecateSubscriptionTierData.fromJson(dynamic json):
  
  subscriptionTier_update = json['subscriptionTier_update'] == null ? null : AdminDeprecateSubscriptionTierSubscriptionTierUpdate.fromJson(json['subscriptionTier_update']);
  @override
  bool operator ==(Object other) {
    if(identical(this, other)) {
      return true;
    }
    if(other.runtimeType != runtimeType) {
      return false;
    }

    final AdminDeprecateSubscriptionTierData otherTyped = other as AdminDeprecateSubscriptionTierData;
    return subscriptionTier_update == otherTyped.subscriptionTier_update;
    
  }
  @override
  int get hashCode => subscriptionTier_update.hashCode;
  

  Map<String, dynamic> toJson() {
    Map<String, dynamic> json = {};
    if (subscriptionTier_update != null) {
      json['subscriptionTier_update'] = subscriptionTier_update!.toJson();
    }
    return json;
  }

  AdminDeprecateSubscriptionTierData({
    this.subscriptionTier_update,
  });
}

@immutable
class AdminDeprecateSubscriptionTierVariables {
  final String tierId;
  @Deprecated('fromJson is deprecated for Variable classes as they are no longer required for deserialization.')
  AdminDeprecateSubscriptionTierVariables.fromJson(Map<String, dynamic> json):
  
  tierId = nativeFromJson<String>(json['tierId']);
  @override
  bool operator ==(Object other) {
    if(identical(this, other)) {
      return true;
    }
    if(other.runtimeType != runtimeType) {
      return false;
    }

    final AdminDeprecateSubscriptionTierVariables otherTyped = other as AdminDeprecateSubscriptionTierVariables;
    return tierId == otherTyped.tierId;
    
  }
  @override
  int get hashCode => tierId.hashCode;
  

  Map<String, dynamic> toJson() {
    Map<String, dynamic> json = {};
    json['tierId'] = nativeToJson<String>(tierId);
    return json;
  }

  AdminDeprecateSubscriptionTierVariables({
    required this.tierId,
  });
}

