part of 'generated.dart';

class MyPaymentHistoryVariablesBuilder {
  
  final FirebaseDataConnect _dataConnect;
  MyPaymentHistoryVariablesBuilder(this._dataConnect, );
  Deserializer<MyPaymentHistoryData> dataDeserializer = (dynamic json)  => MyPaymentHistoryData.fromJson(jsonDecode(json));
  
  Future<QueryResult<MyPaymentHistoryData, void>> execute({QueryFetchPolicy fetchPolicy = QueryFetchPolicy.preferCache}) {
    return ref().execute(fetchPolicy: fetchPolicy);
  }

  QueryRef<MyPaymentHistoryData, void> ref() {
    
    return _dataConnect.query("MyPaymentHistory", dataDeserializer, emptySerializer, null);
  }
}

@immutable
class MyPaymentHistoryPayments {
  final String id;
  final String customerEmailSnapshot;
  final EnumValue<PaymentGateway> gateway;
  final EnumValue<PaymentStatus> status;
  final int amount;
  final String currency;
  final String referenceId;
  final Timestamp createdAt;
  final List<MyPaymentHistoryPaymentsPaymentItemsOnPayment> paymentItems_on_payment;
  MyPaymentHistoryPayments.fromJson(dynamic json):
  
  id = nativeFromJson<String>(json['id']),
  customerEmailSnapshot = nativeFromJson<String>(json['customerEmailSnapshot']),
  gateway = paymentGatewayDeserializer(json['gateway']),
  status = paymentStatusDeserializer(json['status']),
  amount = nativeFromJson<int>(json['amount']),
  currency = nativeFromJson<String>(json['currency']),
  referenceId = nativeFromJson<String>(json['referenceId']),
  createdAt = Timestamp.fromJson(json['createdAt']),
  paymentItems_on_payment = (json['paymentItems_on_payment'] as List<dynamic>)
        .map((e) => MyPaymentHistoryPaymentsPaymentItemsOnPayment.fromJson(e))
        .toList();
  @override
  bool operator ==(Object other) {
    if(identical(this, other)) {
      return true;
    }
    if(other.runtimeType != runtimeType) {
      return false;
    }

    final MyPaymentHistoryPayments otherTyped = other as MyPaymentHistoryPayments;
    return id == otherTyped.id && 
    customerEmailSnapshot == otherTyped.customerEmailSnapshot && 
    gateway == otherTyped.gateway && 
    status == otherTyped.status && 
    amount == otherTyped.amount && 
    currency == otherTyped.currency && 
    referenceId == otherTyped.referenceId && 
    createdAt == otherTyped.createdAt && 
    paymentItems_on_payment == otherTyped.paymentItems_on_payment;
    
  }
  @override
  int get hashCode => Object.hashAll([id.hashCode, customerEmailSnapshot.hashCode, gateway.hashCode, status.hashCode, amount.hashCode, currency.hashCode, referenceId.hashCode, createdAt.hashCode, paymentItems_on_payment.hashCode]);
  

  Map<String, dynamic> toJson() {
    Map<String, dynamic> json = {};
    json['id'] = nativeToJson<String>(id);
    json['customerEmailSnapshot'] = nativeToJson<String>(customerEmailSnapshot);
    json['gateway'] = 
    paymentGatewaySerializer(gateway)
    ;
    json['status'] = 
    paymentStatusSerializer(status)
    ;
    json['amount'] = nativeToJson<int>(amount);
    json['currency'] = nativeToJson<String>(currency);
    json['referenceId'] = nativeToJson<String>(referenceId);
    json['createdAt'] = createdAt.toJson();
    json['paymentItems_on_payment'] = paymentItems_on_payment.map((e) => e.toJson()).toList();
    return json;
  }

  MyPaymentHistoryPayments({
    required this.id,
    required this.customerEmailSnapshot,
    required this.gateway,
    required this.status,
    required this.amount,
    required this.currency,
    required this.referenceId,
    required this.createdAt,
    required this.paymentItems_on_payment,
  });
}

@immutable
class MyPaymentHistoryPaymentsPaymentItemsOnPayment {
  final EnumValue<PaymentItemTarget> targetType;
  final int priceAtPurchase;
  final MyPaymentHistoryPaymentsPaymentItemsOnPaymentCourse? course;
  final MyPaymentHistoryPaymentsPaymentItemsOnPaymentMission? mission;
  final MyPaymentHistoryPaymentsPaymentItemsOnPaymentSubscriptionTier? subscriptionTier;
  MyPaymentHistoryPaymentsPaymentItemsOnPayment.fromJson(dynamic json):
  
  targetType = paymentItemTargetDeserializer(json['targetType']),
  priceAtPurchase = nativeFromJson<int>(json['priceAtPurchase']),
  course = json['course'] == null ? null : MyPaymentHistoryPaymentsPaymentItemsOnPaymentCourse.fromJson(json['course']),
  mission = json['mission'] == null ? null : MyPaymentHistoryPaymentsPaymentItemsOnPaymentMission.fromJson(json['mission']),
  subscriptionTier = json['subscriptionTier'] == null ? null : MyPaymentHistoryPaymentsPaymentItemsOnPaymentSubscriptionTier.fromJson(json['subscriptionTier']);
  @override
  bool operator ==(Object other) {
    if(identical(this, other)) {
      return true;
    }
    if(other.runtimeType != runtimeType) {
      return false;
    }

    final MyPaymentHistoryPaymentsPaymentItemsOnPayment otherTyped = other as MyPaymentHistoryPaymentsPaymentItemsOnPayment;
    return targetType == otherTyped.targetType && 
    priceAtPurchase == otherTyped.priceAtPurchase && 
    course == otherTyped.course && 
    mission == otherTyped.mission && 
    subscriptionTier == otherTyped.subscriptionTier;
    
  }
  @override
  int get hashCode => Object.hashAll([targetType.hashCode, priceAtPurchase.hashCode, course.hashCode, mission.hashCode, subscriptionTier.hashCode]);
  

  Map<String, dynamic> toJson() {
    Map<String, dynamic> json = {};
    json['targetType'] = 
    paymentItemTargetSerializer(targetType)
    ;
    json['priceAtPurchase'] = nativeToJson<int>(priceAtPurchase);
    if (course != null) {
      json['course'] = course!.toJson();
    }
    if (mission != null) {
      json['mission'] = mission!.toJson();
    }
    if (subscriptionTier != null) {
      json['subscriptionTier'] = subscriptionTier!.toJson();
    }
    return json;
  }

  MyPaymentHistoryPaymentsPaymentItemsOnPayment({
    required this.targetType,
    required this.priceAtPurchase,
    this.course,
    this.mission,
    this.subscriptionTier,
  });
}

@immutable
class MyPaymentHistoryPaymentsPaymentItemsOnPaymentCourse {
  final String title;
  MyPaymentHistoryPaymentsPaymentItemsOnPaymentCourse.fromJson(dynamic json):
  
  title = nativeFromJson<String>(json['title']);
  @override
  bool operator ==(Object other) {
    if(identical(this, other)) {
      return true;
    }
    if(other.runtimeType != runtimeType) {
      return false;
    }

    final MyPaymentHistoryPaymentsPaymentItemsOnPaymentCourse otherTyped = other as MyPaymentHistoryPaymentsPaymentItemsOnPaymentCourse;
    return title == otherTyped.title;
    
  }
  @override
  int get hashCode => title.hashCode;
  

  Map<String, dynamic> toJson() {
    Map<String, dynamic> json = {};
    json['title'] = nativeToJson<String>(title);
    return json;
  }

  MyPaymentHistoryPaymentsPaymentItemsOnPaymentCourse({
    required this.title,
  });
}

@immutable
class MyPaymentHistoryPaymentsPaymentItemsOnPaymentMission {
  final String title;
  MyPaymentHistoryPaymentsPaymentItemsOnPaymentMission.fromJson(dynamic json):
  
  title = nativeFromJson<String>(json['title']);
  @override
  bool operator ==(Object other) {
    if(identical(this, other)) {
      return true;
    }
    if(other.runtimeType != runtimeType) {
      return false;
    }

    final MyPaymentHistoryPaymentsPaymentItemsOnPaymentMission otherTyped = other as MyPaymentHistoryPaymentsPaymentItemsOnPaymentMission;
    return title == otherTyped.title;
    
  }
  @override
  int get hashCode => title.hashCode;
  

  Map<String, dynamic> toJson() {
    Map<String, dynamic> json = {};
    json['title'] = nativeToJson<String>(title);
    return json;
  }

  MyPaymentHistoryPaymentsPaymentItemsOnPaymentMission({
    required this.title,
  });
}

@immutable
class MyPaymentHistoryPaymentsPaymentItemsOnPaymentSubscriptionTier {
  final String name;
  MyPaymentHistoryPaymentsPaymentItemsOnPaymentSubscriptionTier.fromJson(dynamic json):
  
  name = nativeFromJson<String>(json['name']);
  @override
  bool operator ==(Object other) {
    if(identical(this, other)) {
      return true;
    }
    if(other.runtimeType != runtimeType) {
      return false;
    }

    final MyPaymentHistoryPaymentsPaymentItemsOnPaymentSubscriptionTier otherTyped = other as MyPaymentHistoryPaymentsPaymentItemsOnPaymentSubscriptionTier;
    return name == otherTyped.name;
    
  }
  @override
  int get hashCode => name.hashCode;
  

  Map<String, dynamic> toJson() {
    Map<String, dynamic> json = {};
    json['name'] = nativeToJson<String>(name);
    return json;
  }

  MyPaymentHistoryPaymentsPaymentItemsOnPaymentSubscriptionTier({
    required this.name,
  });
}

@immutable
class MyPaymentHistoryData {
  final List<MyPaymentHistoryPayments> payments;
  MyPaymentHistoryData.fromJson(dynamic json):
  
  payments = (json['payments'] as List<dynamic>)
        .map((e) => MyPaymentHistoryPayments.fromJson(e))
        .toList();
  @override
  bool operator ==(Object other) {
    if(identical(this, other)) {
      return true;
    }
    if(other.runtimeType != runtimeType) {
      return false;
    }

    final MyPaymentHistoryData otherTyped = other as MyPaymentHistoryData;
    return payments == otherTyped.payments;
    
  }
  @override
  int get hashCode => payments.hashCode;
  

  Map<String, dynamic> toJson() {
    Map<String, dynamic> json = {};
    json['payments'] = payments.map((e) => e.toJson()).toList();
    return json;
  }

  MyPaymentHistoryData({
    required this.payments,
  });
}

