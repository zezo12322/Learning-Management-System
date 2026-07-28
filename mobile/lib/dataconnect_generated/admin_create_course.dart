part of 'generated.dart';

class AdminCreateCourseVariablesBuilder {
  String title;
  Optional<String> _description = Optional.optional(nativeFromJson, nativeToJson);
  int price;
  String language;
  CourseLevel level;
  String categoryId;
  List<String> tags;
  String authorId;

  final FirebaseDataConnect _dataConnect;  AdminCreateCourseVariablesBuilder description(String? t) {
   _description.value = t;
   return this;
  }

  AdminCreateCourseVariablesBuilder(this._dataConnect, {required  this.title,required  this.price,required  this.language,required  this.level,required  this.categoryId,required  this.tags,required  this.authorId,});
  Deserializer<AdminCreateCourseData> dataDeserializer = (dynamic json)  => AdminCreateCourseData.fromJson(jsonDecode(json));
  Serializer<AdminCreateCourseVariables> varsSerializer = (AdminCreateCourseVariables vars) => jsonEncode(vars.toJson());
  Future<OperationResult<AdminCreateCourseData, AdminCreateCourseVariables>> execute() {
    return ref().execute();
  }

  MutationRef<AdminCreateCourseData, AdminCreateCourseVariables> ref() {
    AdminCreateCourseVariables vars= AdminCreateCourseVariables(title: title,description: _description,price: price,language: language,level: level,categoryId: categoryId,tags: tags,authorId: authorId,);
    return _dataConnect.mutation("AdminCreateCourse", dataDeserializer, varsSerializer, vars);
  }
}

@immutable
class AdminCreateCourseCourseInsert {
  final String id;
  AdminCreateCourseCourseInsert.fromJson(dynamic json):
  
  id = nativeFromJson<String>(json['id']);
  @override
  bool operator ==(Object other) {
    if(identical(this, other)) {
      return true;
    }
    if(other.runtimeType != runtimeType) {
      return false;
    }

    final AdminCreateCourseCourseInsert otherTyped = other as AdminCreateCourseCourseInsert;
    return id == otherTyped.id;
    
  }
  @override
  int get hashCode => id.hashCode;
  

  Map<String, dynamic> toJson() {
    Map<String, dynamic> json = {};
    json['id'] = nativeToJson<String>(id);
    return json;
  }

  AdminCreateCourseCourseInsert({
    required this.id,
  });
}

@immutable
class AdminCreateCourseData {
  final AdminCreateCourseCourseInsert course_insert;
  AdminCreateCourseData.fromJson(dynamic json):
  
  course_insert = AdminCreateCourseCourseInsert.fromJson(json['course_insert']);
  @override
  bool operator ==(Object other) {
    if(identical(this, other)) {
      return true;
    }
    if(other.runtimeType != runtimeType) {
      return false;
    }

    final AdminCreateCourseData otherTyped = other as AdminCreateCourseData;
    return course_insert == otherTyped.course_insert;
    
  }
  @override
  int get hashCode => course_insert.hashCode;
  

  Map<String, dynamic> toJson() {
    Map<String, dynamic> json = {};
    json['course_insert'] = course_insert.toJson();
    return json;
  }

  AdminCreateCourseData({
    required this.course_insert,
  });
}

@immutable
class AdminCreateCourseVariables {
  final String title;
  late final Optional<String>description;
  final int price;
  final String language;
  final CourseLevel level;
  final String categoryId;
  final List<String> tags;
  final String authorId;
  @Deprecated('fromJson is deprecated for Variable classes as they are no longer required for deserialization.')
  AdminCreateCourseVariables.fromJson(Map<String, dynamic> json):
  
  title = nativeFromJson<String>(json['title']),
  price = nativeFromJson<int>(json['price']),
  language = nativeFromJson<String>(json['language']),
  level = CourseLevel.values.byName(json['level']),
  categoryId = nativeFromJson<String>(json['categoryId']),
  tags = (json['tags'] as List<dynamic>)
        .map((e) => nativeFromJson<String>(e))
        .toList(),
  authorId = nativeFromJson<String>(json['authorId']) {
  
  
  
    description = Optional.optional(nativeFromJson, nativeToJson);
    description.value = json['description'] == null ? null : nativeFromJson<String>(json['description']);
  
  
  
  
  
  
  
  }
  @override
  bool operator ==(Object other) {
    if(identical(this, other)) {
      return true;
    }
    if(other.runtimeType != runtimeType) {
      return false;
    }

    final AdminCreateCourseVariables otherTyped = other as AdminCreateCourseVariables;
    return title == otherTyped.title && 
    description == otherTyped.description && 
    price == otherTyped.price && 
    language == otherTyped.language && 
    level == otherTyped.level && 
    categoryId == otherTyped.categoryId && 
    tags == otherTyped.tags && 
    authorId == otherTyped.authorId;
    
  }
  @override
  int get hashCode => Object.hashAll([title.hashCode, description.hashCode, price.hashCode, language.hashCode, level.hashCode, categoryId.hashCode, tags.hashCode, authorId.hashCode]);
  

  Map<String, dynamic> toJson() {
    Map<String, dynamic> json = {};
    json['title'] = nativeToJson<String>(title);
    if(description.state == OptionalState.set) {
      json['description'] = description.toJson();
    }
    json['price'] = nativeToJson<int>(price);
    json['language'] = nativeToJson<String>(language);
    json['level'] = 
    level.name
    ;
    json['categoryId'] = nativeToJson<String>(categoryId);
    json['tags'] = tags.map((e) => nativeToJson<String>(e)).toList();
    json['authorId'] = nativeToJson<String>(authorId);
    return json;
  }

  AdminCreateCourseVariables({
    required this.title,
    required this.description,
    required this.price,
    required this.language,
    required this.level,
    required this.categoryId,
    required this.tags,
    required this.authorId,
  });
}

