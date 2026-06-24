part of 'generated.dart';

class AdminCreateSectionVariablesBuilder {
  String courseId;
  String title;
  int order;

  final FirebaseDataConnect _dataConnect;
  AdminCreateSectionVariablesBuilder(this._dataConnect, {required  this.courseId,required  this.title,required  this.order,});
  Deserializer<AdminCreateSectionData> dataDeserializer = (dynamic json)  => AdminCreateSectionData.fromJson(jsonDecode(json));
  Serializer<AdminCreateSectionVariables> varsSerializer = (AdminCreateSectionVariables vars) => jsonEncode(vars.toJson());
  Future<OperationResult<AdminCreateSectionData, AdminCreateSectionVariables>> execute() {
    return ref().execute();
  }

  MutationRef<AdminCreateSectionData, AdminCreateSectionVariables> ref() {
    AdminCreateSectionVariables vars= AdminCreateSectionVariables(courseId: courseId,title: title,order: order,);
    return _dataConnect.mutation("AdminCreateSection", dataDeserializer, varsSerializer, vars);
  }
}

@immutable
class AdminCreateSectionCourseSectionInsert {
  final String id;
  AdminCreateSectionCourseSectionInsert.fromJson(dynamic json):
  
  id = nativeFromJson<String>(json['id']);
  @override
  bool operator ==(Object other) {
    if(identical(this, other)) {
      return true;
    }
    if(other.runtimeType != runtimeType) {
      return false;
    }

    final AdminCreateSectionCourseSectionInsert otherTyped = other as AdminCreateSectionCourseSectionInsert;
    return id == otherTyped.id;
    
  }
  @override
  int get hashCode => id.hashCode;
  

  Map<String, dynamic> toJson() {
    Map<String, dynamic> json = {};
    json['id'] = nativeToJson<String>(id);
    return json;
  }

  AdminCreateSectionCourseSectionInsert({
    required this.id,
  });
}

@immutable
class AdminCreateSectionData {
  final AdminCreateSectionCourseSectionInsert courseSection_insert;
  AdminCreateSectionData.fromJson(dynamic json):
  
  courseSection_insert = AdminCreateSectionCourseSectionInsert.fromJson(json['courseSection_insert']);
  @override
  bool operator ==(Object other) {
    if(identical(this, other)) {
      return true;
    }
    if(other.runtimeType != runtimeType) {
      return false;
    }

    final AdminCreateSectionData otherTyped = other as AdminCreateSectionData;
    return courseSection_insert == otherTyped.courseSection_insert;
    
  }
  @override
  int get hashCode => courseSection_insert.hashCode;
  

  Map<String, dynamic> toJson() {
    Map<String, dynamic> json = {};
    json['courseSection_insert'] = courseSection_insert.toJson();
    return json;
  }

  AdminCreateSectionData({
    required this.courseSection_insert,
  });
}

@immutable
class AdminCreateSectionVariables {
  final String courseId;
  final String title;
  final int order;
  @Deprecated('fromJson is deprecated for Variable classes as they are no longer required for deserialization.')
  AdminCreateSectionVariables.fromJson(Map<String, dynamic> json):
  
  courseId = nativeFromJson<String>(json['courseId']),
  title = nativeFromJson<String>(json['title']),
  order = nativeFromJson<int>(json['order']);
  @override
  bool operator ==(Object other) {
    if(identical(this, other)) {
      return true;
    }
    if(other.runtimeType != runtimeType) {
      return false;
    }

    final AdminCreateSectionVariables otherTyped = other as AdminCreateSectionVariables;
    return courseId == otherTyped.courseId && 
    title == otherTyped.title && 
    order == otherTyped.order;
    
  }
  @override
  int get hashCode => Object.hashAll([courseId.hashCode, title.hashCode, order.hashCode]);
  

  Map<String, dynamic> toJson() {
    Map<String, dynamic> json = {};
    json['courseId'] = nativeToJson<String>(courseId);
    json['title'] = nativeToJson<String>(title);
    json['order'] = nativeToJson<int>(order);
    return json;
  }

  AdminCreateSectionVariables({
    required this.courseId,
    required this.title,
    required this.order,
  });
}

