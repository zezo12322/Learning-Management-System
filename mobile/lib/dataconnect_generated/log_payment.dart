part of 'generated.dart';

class LogPaymentVariablesBuilder {
  PaymentGateway gateway;
  String referenceId;
  int amount;
  Optional<String> _currency = Optional.optional(nativeFromJson, nativeToJson);

  final FirebaseDataConnect _dataConnect;  LogPaymentVariablesBuilder currency(String? t) {
   _currency.value = t;
   return this;
  }

  LogPaymentVariablesBuilder(this._dataConnect, {required  this.gateway,required  this.referenceId,required  this.amount,});
  Deserializer<LogPaymentData> dataDeserializer = (dynamic json)  => LogPaymentData.fromJson(jsonDecode(json));
  Serializer<LogPaymentVariables> varsSerializer = (LogPaymentVariables vars) => jsonEncode(vars.toJson());
  Future<OperationResult<LogPaymentData, LogPaymentVariables>> execute() {
    return ref().execute();
  }

  MutationRef<LogPaymentData, LogPaymentVariables> ref() {
    LogPaymentVariables vars= LogPaymentVariables(gateway: gateway,referenceId: referenceId,amount: amount,currency: _currency,);
    return _dataConnect.mutation("LogPayment", dataDeserializer, varsSerializer, vars);
  }
}

@immutable
class LogPaymentPaymentInsert {
  final String id;
  LogPaymentPaymentInsert.fromJson(dynamic json):
  
  id = nativeFromJson<String>(json['id']);
  @override
  bool operator ==(Object other) {
    if(identical(this, other)) {
      return true;
    }
    if(other.runtimeType != runtimeType) {
      return false;
    }

    final LogPaymentPaymentInsert otherTyped = other as LogPaymentPaymentInsert;
    return id == otherTyped.id;
    
  }
  @override
  int get hashCode => id.hashCode;
  

  Map<String, dynamic> toJson() {
    Map<String, dynamic> json = {};
    json['id'] = nativeToJson<String>(id);
    return json;
  }

  LogPaymentPaymentInsert({
    required this.id,
  });
}

@immutable
class LogPaymentData {
  final LogPaymentPaymentInsert payment_insert;
  LogPaymentData.fromJson(dynamic json):
  
  payment_insert = LogPaymentPaymentInsert.fromJson(json['payment_insert']);
  @override
  bool operator ==(Object other) {
    if(identical(this, other)) {
      return true;
    }
    if(other.runtimeType != runtimeType) {
      return false;
    }

    final LogPaymentData otherTyped = other as LogPaymentData;
    return payment_insert == otherTyped.payment_insert;
    
  }
  @override
  int get hashCode => payment_insert.hashCode;
  

  Map<String, dynamic> toJson() {
    Map<String, dynamic> json = {};
    json['payment_insert'] = payment_insert.toJson();
    return json;
  }

  LogPaymentData({
    required this.payment_insert,
  });
}

@immutable
class LogPaymentVariables {
  final PaymentGateway gateway;
  final String referenceId;
  final int amount;
  late final Optional<String>currency;
  @Deprecated('fromJson is deprecated for Variable classes as they are no longer required for deserialization.')
  LogPaymentVariables.fromJson(Map<String, dynamic> json):
  
  gateway = PaymentGateway.values.byName(json['gateway']),
  referenceId = nativeFromJson<String>(json['referenceId']),
  amount = nativeFromJson<int>(json['amount']) {
  
  
  
  
  
    currency = Optional.optional(nativeFromJson, nativeToJson);
    currency.value = json['currency'] == null ? null : nativeFromJson<String>(json['currency']);
  
  }
  @override
  bool operator ==(Object other) {
    if(identical(this, other)) {
      return true;
    }
    if(other.runtimeType != runtimeType) {
      return false;
    }

    final LogPaymentVariables otherTyped = other as LogPaymentVariables;
    return gateway == otherTyped.gateway && 
    referenceId == otherTyped.referenceId && 
    amount == otherTyped.amount && 
    currency == otherTyped.currency;
    
  }
  @override
  int get hashCode => Object.hashAll([gateway.hashCode, referenceId.hashCode, amount.hashCode, currency.hashCode]);
  

  Map<String, dynamic> toJson() {
    Map<String, dynamic> json = {};
    json['gateway'] = 
    gateway.name
    ;
    json['referenceId'] = nativeToJson<String>(referenceId);
    json['amount'] = nativeToJson<int>(amount);
    if(currency.state == OptionalState.set) {
      json['currency'] = currency.toJson();
    }
    return json;
  }

  LogPaymentVariables({
    required this.gateway,
    required this.referenceId,
    required this.amount,
    required this.currency,
  });
}

