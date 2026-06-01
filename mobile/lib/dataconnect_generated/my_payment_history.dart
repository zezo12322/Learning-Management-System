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
  final EnumValue<PaymentGateway> gateway;
  final EnumValue<PaymentStatus> status;
  final String referenceId;
  final Timestamp createdAt;
  final List<MyPaymentHistoryPaymentsPaymentItemsOnPayment> paymentItems_on_payment;
  MyPaymentHistoryPayments.fromJson(dynamic json):
  
  id = nativeFromJson<String>(json['id']),
  gateway = paymentGatewayDeserializer(json['gateway']),
  status = paymentStatusDeserializer(json['status']),
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
    gateway == otherTyped.gateway && 
    status == otherTyped.status && 
    referenceId == otherTyped.referenceId && 
    createdAt == otherTyped.createdAt && 
    paymentItems_on_payment == otherTyped.paymentItems_on_payment;
    
  }
  @override
  int get hashCode => Object.hashAll([id.hashCode, gateway.hashCode, status.hashCode, referenceId.hashCode, createdAt.hashCode, paymentItems_on_payment.hashCode]);
  

  Map<String, dynamic> toJson() {
    Map<String, dynamic> json = {};
    json['id'] = nativeToJson<String>(id);
    json['gateway'] = 
    paymentGatewaySerializer(gateway)
    ;
    json['status'] = 
    paymentStatusSerializer(status)
    ;
    json['referenceId'] = nativeToJson<String>(referenceId);
    json['createdAt'] = createdAt.toJson();
    json['paymentItems_on_payment'] = paymentItems_on_payment.map((e) => e.toJson()).toList();
    return json;
  }

  MyPaymentHistoryPayments({
    required this.id,
    required this.gateway,
    required this.status,
    required this.referenceId,
    required this.createdAt,
    required this.paymentItems_on_payment,
  });
}

@immutable
class MyPaymentHistoryPaymentsPaymentItemsOnPayment {
  final double priceAtPurchase;
  final MyPaymentHistoryPaymentsPaymentItemsOnPaymentCourse? course;
  final MyPaymentHistoryPaymentsPaymentItemsOnPaymentMission? mission;
  final MyPaymentHistoryPaymentsPaymentItemsOnPaymentSubscriptionPlan? subscriptionPlan;
  MyPaymentHistoryPaymentsPaymentItemsOnPayment.fromJson(dynamic json):
  
  priceAtPurchase = nativeFromJson<double>(json['priceAtPurchase']),
  course = json['course'] == null ? null : MyPaymentHistoryPaymentsPaymentItemsOnPaymentCourse.fromJson(json['course']),
  mission = json['mission'] == null ? null : MyPaymentHistoryPaymentsPaymentItemsOnPaymentMission.fromJson(json['mission']),
  subscriptionPlan = json['subscriptionPlan'] == null ? null : MyPaymentHistoryPaymentsPaymentItemsOnPaymentSubscriptionPlan.fromJson(json['subscriptionPlan']);
  @override
  bool operator ==(Object other) {
    if(identical(this, other)) {
      return true;
    }
    if(other.runtimeType != runtimeType) {
      return false;
    }

    final MyPaymentHistoryPaymentsPaymentItemsOnPayment otherTyped = other as MyPaymentHistoryPaymentsPaymentItemsOnPayment;
    return priceAtPurchase == otherTyped.priceAtPurchase && 
    course == otherTyped.course && 
    mission == otherTyped.mission && 
    subscriptionPlan == otherTyped.subscriptionPlan;
    
  }
  @override
  int get hashCode => Object.hashAll([priceAtPurchase.hashCode, course.hashCode, mission.hashCode, subscriptionPlan.hashCode]);
  

  Map<String, dynamic> toJson() {
    Map<String, dynamic> json = {};
    json['priceAtPurchase'] = nativeToJson<double>(priceAtPurchase);
    if (course != null) {
      json['course'] = course!.toJson();
    }
    if (mission != null) {
      json['mission'] = mission!.toJson();
    }
    if (subscriptionPlan != null) {
      json['subscriptionPlan'] = subscriptionPlan!.toJson();
    }
    return json;
  }

  MyPaymentHistoryPaymentsPaymentItemsOnPayment({
    required this.priceAtPurchase,
    this.course,
    this.mission,
    this.subscriptionPlan,
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
class MyPaymentHistoryPaymentsPaymentItemsOnPaymentSubscriptionPlan {
  final String plan;
  MyPaymentHistoryPaymentsPaymentItemsOnPaymentSubscriptionPlan.fromJson(dynamic json):
  
  plan = nativeFromJson<String>(json['plan']);
  @override
  bool operator ==(Object other) {
    if(identical(this, other)) {
      return true;
    }
    if(other.runtimeType != runtimeType) {
      return false;
    }

    final MyPaymentHistoryPaymentsPaymentItemsOnPaymentSubscriptionPlan otherTyped = other as MyPaymentHistoryPaymentsPaymentItemsOnPaymentSubscriptionPlan;
    return plan == otherTyped.plan;
    
  }
  @override
  int get hashCode => plan.hashCode;
  

  Map<String, dynamic> toJson() {
    Map<String, dynamic> json = {};
    json['plan'] = nativeToJson<String>(plan);
    return json;
  }

  MyPaymentHistoryPaymentsPaymentItemsOnPaymentSubscriptionPlan({
    required this.plan,
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

