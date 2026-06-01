part of 'generated.dart';

class ListSubscriptionTiersVariablesBuilder {
  
  final FirebaseDataConnect _dataConnect;
  ListSubscriptionTiersVariablesBuilder(this._dataConnect, );
  Deserializer<ListSubscriptionTiersData> dataDeserializer = (dynamic json)  => ListSubscriptionTiersData.fromJson(jsonDecode(json));
  
  Future<QueryResult<ListSubscriptionTiersData, void>> execute({QueryFetchPolicy fetchPolicy = QueryFetchPolicy.preferCache}) {
    return ref().execute(fetchPolicy: fetchPolicy);
  }

  QueryRef<ListSubscriptionTiersData, void> ref() {
    
    return _dataConnect.query("ListSubscriptionTiers", dataDeserializer, emptySerializer, null);
  }
}

@immutable
class ListSubscriptionTiersSubscriptionTiers {
  final String id;
  final String name;
  final int price;
  final EnumValue<BillingCycle> billingCycle;
  final List<String> features;
  ListSubscriptionTiersSubscriptionTiers.fromJson(dynamic json):
  
  id = nativeFromJson<String>(json['id']),
  name = nativeFromJson<String>(json['name']),
  price = nativeFromJson<int>(json['price']),
  billingCycle = billingCycleDeserializer(json['billingCycle']),
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

    final ListSubscriptionTiersSubscriptionTiers otherTyped = other as ListSubscriptionTiersSubscriptionTiers;
    return id == otherTyped.id && 
    name == otherTyped.name && 
    price == otherTyped.price && 
    billingCycle == otherTyped.billingCycle && 
    features == otherTyped.features;
    
  }
  @override
  int get hashCode => Object.hashAll([id.hashCode, name.hashCode, price.hashCode, billingCycle.hashCode, features.hashCode]);
  

  Map<String, dynamic> toJson() {
    Map<String, dynamic> json = {};
    json['id'] = nativeToJson<String>(id);
    json['name'] = nativeToJson<String>(name);
    json['price'] = nativeToJson<int>(price);
    json['billingCycle'] = 
    billingCycleSerializer(billingCycle)
    ;
    json['features'] = features.map((e) => nativeToJson<String>(e)).toList();
    return json;
  }

  ListSubscriptionTiersSubscriptionTiers({
    required this.id,
    required this.name,
    required this.price,
    required this.billingCycle,
    required this.features,
  });
}

@immutable
class ListSubscriptionTiersData {
  final List<ListSubscriptionTiersSubscriptionTiers> subscriptionTiers;
  ListSubscriptionTiersData.fromJson(dynamic json):
  
  subscriptionTiers = (json['subscriptionTiers'] as List<dynamic>)
        .map((e) => ListSubscriptionTiersSubscriptionTiers.fromJson(e))
        .toList();
  @override
  bool operator ==(Object other) {
    if(identical(this, other)) {
      return true;
    }
    if(other.runtimeType != runtimeType) {
      return false;
    }

    final ListSubscriptionTiersData otherTyped = other as ListSubscriptionTiersData;
    return subscriptionTiers == otherTyped.subscriptionTiers;
    
  }
  @override
  int get hashCode => subscriptionTiers.hashCode;
  

  Map<String, dynamic> toJson() {
    Map<String, dynamic> json = {};
    json['subscriptionTiers'] = subscriptionTiers.map((e) => e.toJson()).toList();
    return json;
  }

  ListSubscriptionTiersData({
    required this.subscriptionTiers,
  });
}

