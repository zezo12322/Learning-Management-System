part of 'generated.dart';

class AdminCreateSubscriptionTierVariablesBuilder {
  String name;
  int price;
  BillingCycle billingCycle;
  List<String> features;

  final FirebaseDataConnect _dataConnect;
  AdminCreateSubscriptionTierVariablesBuilder(this._dataConnect, {required  this.name,required  this.price,required  this.billingCycle,required  this.features,});
  Deserializer<AdminCreateSubscriptionTierData> dataDeserializer = (dynamic json)  => AdminCreateSubscriptionTierData.fromJson(jsonDecode(json));
  Serializer<AdminCreateSubscriptionTierVariables> varsSerializer = (AdminCreateSubscriptionTierVariables vars) => jsonEncode(vars.toJson());
  Future<OperationResult<AdminCreateSubscriptionTierData, AdminCreateSubscriptionTierVariables>> execute() {
    return ref().execute();
  }

  MutationRef<AdminCreateSubscriptionTierData, AdminCreateSubscriptionTierVariables> ref() {
    AdminCreateSubscriptionTierVariables vars= AdminCreateSubscriptionTierVariables(name: name,price: price,billingCycle: billingCycle,features: features,);
    return _dataConnect.mutation('AdminCreateSubscriptionTier', dataDeserializer, varsSerializer, vars);
  }
}

@immutable
class AdminCreateSubscriptionTierSubscriptionTierInsert {
  final String id;
  AdminCreateSubscriptionTierSubscriptionTierInsert.fromJson(dynamic json):
  
  id = nativeFromJson<String>(json['id']);
  @override
  bool operator ==(Object other) {
    if(identical(this, other)) {
      return true;
    }
    if(other.runtimeType != runtimeType) {
      return false;
    }

    final AdminCreateSubscriptionTierSubscriptionTierInsert otherTyped = other as AdminCreateSubscriptionTierSubscriptionTierInsert;
    return id == otherTyped.id;
    
  }
  @override
  int get hashCode => id.hashCode;
  

  Map<String, dynamic> toJson() {
    Map<String, dynamic> json = {};
    json['id'] = nativeToJson<String>(id);
    return json;
  }

  AdminCreateSubscriptionTierSubscriptionTierInsert({
    required this.id,
  });
}

@immutable
class AdminCreateSubscriptionTierData {
  final AdminCreateSubscriptionTierSubscriptionTierInsert subscriptionTier_insert;
  AdminCreateSubscriptionTierData.fromJson(dynamic json):
  
  subscriptionTier_insert = AdminCreateSubscriptionTierSubscriptionTierInsert.fromJson(json['subscriptionTier_insert']);
  @override
  bool operator ==(Object other) {
    if(identical(this, other)) {
      return true;
    }
    if(other.runtimeType != runtimeType) {
      return false;
    }

    final AdminCreateSubscriptionTierData otherTyped = other as AdminCreateSubscriptionTierData;
    return subscriptionTier_insert == otherTyped.subscriptionTier_insert;
    
  }
  @override
  int get hashCode => subscriptionTier_insert.hashCode;
  

  Map<String, dynamic> toJson() {
    Map<String, dynamic> json = {};
    json['subscriptionTier_insert'] = subscriptionTier_insert.toJson();
    return json;
  }

  AdminCreateSubscriptionTierData({
    required this.subscriptionTier_insert,
  });
}

@immutable
class AdminCreateSubscriptionTierVariables {
  final String name;
  final int price;
  final BillingCycle billingCycle;
  final List<String> features;
  @Deprecated('fromJson is deprecated for Variable classes as they are no longer required for deserialization.')
  AdminCreateSubscriptionTierVariables.fromJson(Map<String, dynamic> json):
  
  name = nativeFromJson<String>(json['name']),
  price = nativeFromJson<int>(json['price']),
  billingCycle = BillingCycle.values.byName(json['billingCycle']),
  features = (json['features'] as List<dynamic>)
        .map((e) => nativeFromJson<String>(e))
        .toList();
  @override
  bool operator ==(Object other) {
    if(identical(this, other)) {
      return true;
    }
    if(other.runtimeType != runtimeType) {
      return false;
    }

    final AdminCreateSubscriptionTierVariables otherTyped = other as AdminCreateSubscriptionTierVariables;
    return name == otherTyped.name && 
    price == otherTyped.price && 
    billingCycle == otherTyped.billingCycle && 
    features == otherTyped.features;
    
  }
  @override
  int get hashCode => Object.hashAll([name.hashCode, price.hashCode, billingCycle.hashCode, features.hashCode]);
  

  Map<String, dynamic> toJson() {
    Map<String, dynamic> json = {};
    json['name'] = nativeToJson<String>(name);
    json['price'] = nativeToJson<int>(price);
    json['billingCycle'] = 
    billingCycle.name
    ;
    json['features'] = features.map((e) => nativeToJson<String>(e)).toList();
    return json;
  }

  AdminCreateSubscriptionTierVariables({
    required this.name,
    required this.price,
    required this.billingCycle,
    required this.features,
  });
}

