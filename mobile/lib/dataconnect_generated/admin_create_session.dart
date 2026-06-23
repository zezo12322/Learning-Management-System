part of 'generated.dart';

class AdminCreateSessionVariablesBuilder {
  String courseId;
  String title;
  final Optional<int> _capacity = Optional.optional(nativeFromJson, nativeToJson);
  Timestamp startTime;
  Timestamp endTime;
  SessionType type;
  String locationOrUrl;

  final FirebaseDataConnect _dataConnect;  AdminCreateSessionVariablesBuilder capacity(int? t) {
   _capacity.value = t;
   return this;
  }

  AdminCreateSessionVariablesBuilder(this._dataConnect, {required  this.courseId,required  this.title,required  this.startTime,required  this.endTime,required  this.type,required  this.locationOrUrl,});
  Deserializer<AdminCreateSessionData> dataDeserializer = (dynamic json)  => AdminCreateSessionData.fromJson(jsonDecode(json));
  Serializer<AdminCreateSessionVariables> varsSerializer = (AdminCreateSessionVariables vars) => jsonEncode(vars.toJson());
  Future<OperationResult<AdminCreateSessionData, AdminCreateSessionVariables>> execute() {
    return ref().execute();
  }

  MutationRef<AdminCreateSessionData, AdminCreateSessionVariables> ref() {
    AdminCreateSessionVariables vars= AdminCreateSessionVariables(courseId: courseId,title: title,capacity: _capacity,startTime: startTime,endTime: endTime,type: type,locationOrUrl: locationOrUrl,);
    return _dataConnect.mutation('AdminCreateSession', dataDeserializer, varsSerializer, vars);
  }
}

@immutable
class AdminCreateSessionSessionInsert {
  final String id;
  AdminCreateSessionSessionInsert.fromJson(dynamic json):
  
  id = nativeFromJson<String>(json['id']);
  @override
  bool operator ==(Object other) {
    if(identical(this, other)) {
      return true;
    }
    if(other.runtimeType != runtimeType) {
      return false;
    }

    final AdminCreateSessionSessionInsert otherTyped = other as AdminCreateSessionSessionInsert;
    return id == otherTyped.id;
    
  }
  @override
  int get hashCode => id.hashCode;
  

  Map<String, dynamic> toJson() {
    Map<String, dynamic> json = {};
    json['id'] = nativeToJson<String>(id);
    return json;
  }

  AdminCreateSessionSessionInsert({
    required this.id,
  });
}

@immutable
class AdminCreateSessionData {
  final AdminCreateSessionSessionInsert session_insert;
  AdminCreateSessionData.fromJson(dynamic json):
  
  session_insert = AdminCreateSessionSessionInsert.fromJson(json['session_insert']);
  @override
  bool operator ==(Object other) {
    if(identical(this, other)) {
      return true;
    }
    if(other.runtimeType != runtimeType) {
      return false;
    }

    final AdminCreateSessionData otherTyped = other as AdminCreateSessionData;
    return session_insert == otherTyped.session_insert;
    
  }
  @override
  int get hashCode => session_insert.hashCode;
  

  Map<String, dynamic> toJson() {
    Map<String, dynamic> json = {};
    json['session_insert'] = session_insert.toJson();
    return json;
  }

  AdminCreateSessionData({
    required this.session_insert,
  });
}

@immutable
class AdminCreateSessionVariables {
  final String courseId;
  final String title;
  late final Optional<int>capacity;
  final Timestamp startTime;
  final Timestamp endTime;
  final SessionType type;
  final String locationOrUrl;
  @Deprecated('fromJson is deprecated for Variable classes as they are no longer required for deserialization.')
  AdminCreateSessionVariables.fromJson(Map<String, dynamic> json):
  
  courseId = nativeFromJson<String>(json['courseId']),
  title = nativeFromJson<String>(json['title']),
  startTime = Timestamp.fromJson(json['startTime']),
  endTime = Timestamp.fromJson(json['endTime']),
  type = SessionType.values.byName(json['type']),
  locationOrUrl = nativeFromJson<String>(json['locationOrUrl']) {
  
  
  
  
    capacity = Optional.optional(nativeFromJson, nativeToJson);
    capacity.value = json['capacity'] == null ? null : nativeFromJson<int>(json['capacity']);
  
  
  
  
  
  }
  @override
  bool operator ==(Object other) {
    if(identical(this, other)) {
      return true;
    }
    if(other.runtimeType != runtimeType) {
      return false;
    }

    final AdminCreateSessionVariables otherTyped = other as AdminCreateSessionVariables;
    return courseId == otherTyped.courseId && 
    title == otherTyped.title && 
    capacity == otherTyped.capacity && 
    startTime == otherTyped.startTime && 
    endTime == otherTyped.endTime && 
    type == otherTyped.type && 
    locationOrUrl == otherTyped.locationOrUrl;
    
  }
  @override
  int get hashCode => Object.hashAll([courseId.hashCode, title.hashCode, capacity.hashCode, startTime.hashCode, endTime.hashCode, type.hashCode, locationOrUrl.hashCode]);
  

  Map<String, dynamic> toJson() {
    Map<String, dynamic> json = {};
    json['courseId'] = nativeToJson<String>(courseId);
    json['title'] = nativeToJson<String>(title);
    if(capacity.state == OptionalState.set) {
      json['capacity'] = capacity.toJson();
    }
    json['startTime'] = startTime.toJson();
    json['endTime'] = endTime.toJson();
    json['type'] = 
    type.name
    ;
    json['locationOrUrl'] = nativeToJson<String>(locationOrUrl);
    return json;
  }

  AdminCreateSessionVariables({
    required this.courseId,
    required this.title,
    required this.capacity,
    required this.startTime,
    required this.endTime,
    required this.type,
    required this.locationOrUrl,
  });
}

