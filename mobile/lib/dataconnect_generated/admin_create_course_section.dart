part of 'generated.dart';

class AdminCreateCourseSectionVariablesBuilder {
  String courseId;
  String title;
  int order;

  final FirebaseDataConnect _dataConnect;
  AdminCreateCourseSectionVariablesBuilder(this._dataConnect, {required  this.courseId,required  this.title,required  this.order,});
  Deserializer<AdminCreateCourseSectionData> dataDeserializer = (dynamic json)  => AdminCreateCourseSectionData.fromJson(jsonDecode(json));
  Serializer<AdminCreateCourseSectionVariables> varsSerializer = (AdminCreateCourseSectionVariables vars) => jsonEncode(vars.toJson());
  Future<OperationResult<AdminCreateCourseSectionData, AdminCreateCourseSectionVariables>> execute() {
    return ref().execute();
  }

  MutationRef<AdminCreateCourseSectionData, AdminCreateCourseSectionVariables> ref() {
    AdminCreateCourseSectionVariables vars= AdminCreateCourseSectionVariables(courseId: courseId,title: title,order: order,);
    return _dataConnect.mutation("AdminCreateCourseSection", dataDeserializer, varsSerializer, vars);
  }
}

@immutable
class AdminCreateCourseSectionCourseSectionInsert {
  final String id;
  AdminCreateCourseSectionCourseSectionInsert.fromJson(dynamic json):
  
  id = nativeFromJson<String>(json['id']);
  @override
  bool operator ==(Object other) {
    if(identical(this, other)) {
      return true;
    }
    if(other.runtimeType != runtimeType) {
      return false;
    }

    final AdminCreateCourseSectionCourseSectionInsert otherTyped = other as AdminCreateCourseSectionCourseSectionInsert;
    return id == otherTyped.id;
    
  }
  @override
  int get hashCode => id.hashCode;
  

  Map<String, dynamic> toJson() {
    Map<String, dynamic> json = {};
    json['id'] = nativeToJson<String>(id);
    return json;
  }

  AdminCreateCourseSectionCourseSectionInsert({
    required this.id,
  });
}

@immutable
class AdminCreateCourseSectionData {
  final AdminCreateCourseSectionCourseSectionInsert courseSection_insert;
  AdminCreateCourseSectionData.fromJson(dynamic json):
  
  courseSection_insert = AdminCreateCourseSectionCourseSectionInsert.fromJson(json['courseSection_insert']);
  @override
  bool operator ==(Object other) {
    if(identical(this, other)) {
      return true;
    }
    if(other.runtimeType != runtimeType) {
      return false;
    }

    final AdminCreateCourseSectionData otherTyped = other as AdminCreateCourseSectionData;
    return courseSection_insert == otherTyped.courseSection_insert;
    
  }
  @override
  int get hashCode => courseSection_insert.hashCode;
  

  Map<String, dynamic> toJson() {
    Map<String, dynamic> json = {};
    json['courseSection_insert'] = courseSection_insert.toJson();
    return json;
  }

  AdminCreateCourseSectionData({
    required this.courseSection_insert,
  });
}

@immutable
class AdminCreateCourseSectionVariables {
  final String courseId;
  final String title;
  final int order;
  @Deprecated('fromJson is deprecated for Variable classes as they are no longer required for deserialization.')
  AdminCreateCourseSectionVariables.fromJson(Map<String, dynamic> json):
  
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

    final AdminCreateCourseSectionVariables otherTyped = other as AdminCreateCourseSectionVariables;
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

  AdminCreateCourseSectionVariables({
    required this.courseId,
    required this.title,
    required this.order,
  });
}

