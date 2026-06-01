part of 'generated.dart';

class AddPaymentItemVariablesBuilder {
  String paymentId;
  Optional<String> _courseId = Optional.optional(nativeFromJson, nativeToJson);
  Optional<String> _missionId = Optional.optional(nativeFromJson, nativeToJson);
  Optional<String> _subscriptionPlanId = Optional.optional(nativeFromJson, nativeToJson);
  double price;

  final FirebaseDataConnect _dataConnect;  AddPaymentItemVariablesBuilder courseId(String? t) {
   _courseId.value = t;
   return this;
  }
  AddPaymentItemVariablesBuilder missionId(String? t) {
   _missionId.value = t;
   return this;
  }
  AddPaymentItemVariablesBuilder subscriptionPlanId(String? t) {
   _subscriptionPlanId.value = t;
   return this;
  }

  AddPaymentItemVariablesBuilder(this._dataConnect, {required  this.paymentId,required  this.price,});
  Deserializer<AddPaymentItemData> dataDeserializer = (dynamic json)  => AddPaymentItemData.fromJson(jsonDecode(json));
  Serializer<AddPaymentItemVariables> varsSerializer = (AddPaymentItemVariables vars) => jsonEncode(vars.toJson());
  Future<OperationResult<AddPaymentItemData, AddPaymentItemVariables>> execute() {
    return ref().execute();
  }

  MutationRef<AddPaymentItemData, AddPaymentItemVariables> ref() {
    AddPaymentItemVariables vars= AddPaymentItemVariables(paymentId: paymentId,courseId: _courseId,missionId: _missionId,subscriptionPlanId: _subscriptionPlanId,price: price,);
    return _dataConnect.mutation("AddPaymentItem", dataDeserializer, varsSerializer, vars);
  }
}

@immutable
class AddPaymentItemPaymentItemInsert {
  final String id;
  AddPaymentItemPaymentItemInsert.fromJson(dynamic json):
  
  id = nativeFromJson<String>(json['id']);
  @override
  bool operator ==(Object other) {
    if(identical(this, other)) {
      return true;
    }
    if(other.runtimeType != runtimeType) {
      return false;
    }

    final AddPaymentItemPaymentItemInsert otherTyped = other as AddPaymentItemPaymentItemInsert;
    return id == otherTyped.id;
    
  }
  @override
  int get hashCode => id.hashCode;
  

  Map<String, dynamic> toJson() {
    Map<String, dynamic> json = {};
    json['id'] = nativeToJson<String>(id);
    return json;
  }

  AddPaymentItemPaymentItemInsert({
    required this.id,
  });
}

@immutable
class AddPaymentItemData {
  final AddPaymentItemPaymentItemInsert paymentItem_insert;
  AddPaymentItemData.fromJson(dynamic json):
  
  paymentItem_insert = AddPaymentItemPaymentItemInsert.fromJson(json['paymentItem_insert']);
  @override
  bool operator ==(Object other) {
    if(identical(this, other)) {
      return true;
    }
    if(other.runtimeType != runtimeType) {
      return false;
    }

    final AddPaymentItemData otherTyped = other as AddPaymentItemData;
    return paymentItem_insert == otherTyped.paymentItem_insert;
    
  }
  @override
  int get hashCode => paymentItem_insert.hashCode;
  

  Map<String, dynamic> toJson() {
    Map<String, dynamic> json = {};
    json['paymentItem_insert'] = paymentItem_insert.toJson();
    return json;
  }

  AddPaymentItemData({
    required this.paymentItem_insert,
  });
}

@immutable
class AddPaymentItemVariables {
  final String paymentId;
  late final Optional<String>courseId;
  late final Optional<String>missionId;
  late final Optional<String>subscriptionPlanId;
  final double price;
  @Deprecated('fromJson is deprecated for Variable classes as they are no longer required for deserialization.')
  AddPaymentItemVariables.fromJson(Map<String, dynamic> json):
  
  paymentId = nativeFromJson<String>(json['paymentId']),
  price = nativeFromJson<double>(json['price']) {
  
  
  
    courseId = Optional.optional(nativeFromJson, nativeToJson);
    courseId.value = json['courseId'] == null ? null : nativeFromJson<String>(json['courseId']);
  
  
    missionId = Optional.optional(nativeFromJson, nativeToJson);
    missionId.value = json['missionId'] == null ? null : nativeFromJson<String>(json['missionId']);
  
  
    subscriptionPlanId = Optional.optional(nativeFromJson, nativeToJson);
    subscriptionPlanId.value = json['subscriptionPlanId'] == null ? null : nativeFromJson<String>(json['subscriptionPlanId']);
  
  
  }
  @override
  bool operator ==(Object other) {
    if(identical(this, other)) {
      return true;
    }
    if(other.runtimeType != runtimeType) {
      return false;
    }

    final AddPaymentItemVariables otherTyped = other as AddPaymentItemVariables;
    return paymentId == otherTyped.paymentId && 
    courseId == otherTyped.courseId && 
    missionId == otherTyped.missionId && 
    subscriptionPlanId == otherTyped.subscriptionPlanId && 
    price == otherTyped.price;
    
  }
  @override
  int get hashCode => Object.hashAll([paymentId.hashCode, courseId.hashCode, missionId.hashCode, subscriptionPlanId.hashCode, price.hashCode]);
  

  Map<String, dynamic> toJson() {
    Map<String, dynamic> json = {};
    json['paymentId'] = nativeToJson<String>(paymentId);
    if(courseId.state == OptionalState.set) {
      json['courseId'] = courseId.toJson();
    }
    if(missionId.state == OptionalState.set) {
      json['missionId'] = missionId.toJson();
    }
    if(subscriptionPlanId.state == OptionalState.set) {
      json['subscriptionPlanId'] = subscriptionPlanId.toJson();
    }
    json['price'] = nativeToJson<double>(price);
    return json;
  }

  AddPaymentItemVariables({
    required this.paymentId,
    required this.courseId,
    required this.missionId,
    required this.subscriptionPlanId,
    required this.price,
  });
}

