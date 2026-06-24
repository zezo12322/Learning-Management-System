part of 'generated.dart';

class AddPaymentItemVariablesBuilder {
  String paymentId;
  PaymentItemTarget targetType;
  Optional<String> _courseId = Optional.optional(nativeFromJson, nativeToJson);
  Optional<String> _missionId = Optional.optional(nativeFromJson, nativeToJson);
  Optional<String> _subscriptionTierId = Optional.optional(nativeFromJson, nativeToJson);
  int price;

  final FirebaseDataConnect _dataConnect;  AddPaymentItemVariablesBuilder courseId(String? t) {
   _courseId.value = t;
   return this;
  }
  AddPaymentItemVariablesBuilder missionId(String? t) {
   _missionId.value = t;
   return this;
  }
  AddPaymentItemVariablesBuilder subscriptionTierId(String? t) {
   _subscriptionTierId.value = t;
   return this;
  }

  AddPaymentItemVariablesBuilder(this._dataConnect, {required  this.paymentId,required  this.targetType,required  this.price,});
  Deserializer<AddPaymentItemData> dataDeserializer = (dynamic json)  => AddPaymentItemData.fromJson(jsonDecode(json));
  Serializer<AddPaymentItemVariables> varsSerializer = (AddPaymentItemVariables vars) => jsonEncode(vars.toJson());
  Future<OperationResult<AddPaymentItemData, AddPaymentItemVariables>> execute() {
    return ref().execute();
  }

  MutationRef<AddPaymentItemData, AddPaymentItemVariables> ref() {
    AddPaymentItemVariables vars= AddPaymentItemVariables(paymentId: paymentId,targetType: targetType,courseId: _courseId,missionId: _missionId,subscriptionTierId: _subscriptionTierId,price: price,);
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
  final PaymentItemTarget targetType;
  late final Optional<String>courseId;
  late final Optional<String>missionId;
  late final Optional<String>subscriptionTierId;
  final int price;
  @Deprecated('fromJson is deprecated for Variable classes as they are no longer required for deserialization.')
  AddPaymentItemVariables.fromJson(Map<String, dynamic> json):
  
  paymentId = nativeFromJson<String>(json['paymentId']),
  targetType = PaymentItemTarget.values.byName(json['targetType']),
  price = nativeFromJson<int>(json['price']) {
  
  
  
  
    courseId = Optional.optional(nativeFromJson, nativeToJson);
    courseId.value = json['courseId'] == null ? null : nativeFromJson<String>(json['courseId']);
  
  
    missionId = Optional.optional(nativeFromJson, nativeToJson);
    missionId.value = json['missionId'] == null ? null : nativeFromJson<String>(json['missionId']);
  
  
    subscriptionTierId = Optional.optional(nativeFromJson, nativeToJson);
    subscriptionTierId.value = json['subscriptionTierId'] == null ? null : nativeFromJson<String>(json['subscriptionTierId']);
  
  
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
    targetType == otherTyped.targetType && 
    courseId == otherTyped.courseId && 
    missionId == otherTyped.missionId && 
    subscriptionTierId == otherTyped.subscriptionTierId && 
    price == otherTyped.price;
    
  }
  @override
  int get hashCode => Object.hashAll([paymentId.hashCode, targetType.hashCode, courseId.hashCode, missionId.hashCode, subscriptionTierId.hashCode, price.hashCode]);
  

  Map<String, dynamic> toJson() {
    Map<String, dynamic> json = {};
    json['paymentId'] = nativeToJson<String>(paymentId);
    json['targetType'] = 
    targetType.name
    ;
    if(courseId.state == OptionalState.set) {
      json['courseId'] = courseId.toJson();
    }
    if(missionId.state == OptionalState.set) {
      json['missionId'] = missionId.toJson();
    }
    if(subscriptionTierId.state == OptionalState.set) {
      json['subscriptionTierId'] = subscriptionTierId.toJson();
    }
    json['price'] = nativeToJson<int>(price);
    return json;
  }

  AddPaymentItemVariables({
    required this.paymentId,
    required this.targetType,
    required this.courseId,
    required this.missionId,
    required this.subscriptionTierId,
    required this.price,
  });
}

