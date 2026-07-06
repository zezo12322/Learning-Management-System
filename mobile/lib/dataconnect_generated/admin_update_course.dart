part of 'generated.dart';

class AdminUpdateCourseVariablesBuilder {
  String courseId;
  Optional<String> _title = Optional.optional(nativeFromJson, nativeToJson);
  Optional<String> _description = Optional.optional(nativeFromJson, nativeToJson);
  Optional<int> _price = Optional.optional(nativeFromJson, nativeToJson);
  Optional<String> _language = Optional.optional(nativeFromJson, nativeToJson);
  Optional<CourseLevel> _level = Optional.optional((data) => CourseLevel.values.byName(data), enumSerializer);
  Optional<String> _categoryId = Optional.optional(nativeFromJson, nativeToJson);
  Optional<List<String>> _tags = Optional.optional(listDeserializer(nativeFromJson), listSerializer(nativeToJson));
  Optional<String> _thumbnail = Optional.optional(nativeFromJson, nativeToJson);

  final FirebaseDataConnect _dataConnect;  AdminUpdateCourseVariablesBuilder title(String? t) {
   _title.value = t;
   return this;
  }
  AdminUpdateCourseVariablesBuilder description(String? t) {
   _description.value = t;
   return this;
  }
  AdminUpdateCourseVariablesBuilder price(int? t) {
   _price.value = t;
   return this;
  }
  AdminUpdateCourseVariablesBuilder language(String? t) {
   _language.value = t;
   return this;
  }
  AdminUpdateCourseVariablesBuilder level(CourseLevel? t) {
   _level.value = t;
   return this;
  }
  AdminUpdateCourseVariablesBuilder categoryId(String? t) {
   _categoryId.value = t;
   return this;
  }
  AdminUpdateCourseVariablesBuilder tags(List<String>? t) {
   _tags.value = t;
   return this;
  }
  AdminUpdateCourseVariablesBuilder thumbnail(String? t) {
   _thumbnail.value = t;
   return this;
  }

  AdminUpdateCourseVariablesBuilder(this._dataConnect, {required  this.courseId,});
  Deserializer<AdminUpdateCourseData> dataDeserializer = (dynamic json)  => AdminUpdateCourseData.fromJson(jsonDecode(json));
  Serializer<AdminUpdateCourseVariables> varsSerializer = (AdminUpdateCourseVariables vars) => jsonEncode(vars.toJson());
  Future<OperationResult<AdminUpdateCourseData, AdminUpdateCourseVariables>> execute() {
    return ref().execute();
  }

  MutationRef<AdminUpdateCourseData, AdminUpdateCourseVariables> ref() {
    AdminUpdateCourseVariables vars= AdminUpdateCourseVariables(courseId: courseId,title: _title,description: _description,price: _price,language: _language,level: _level,categoryId: _categoryId,tags: _tags,thumbnail: _thumbnail,);
    return _dataConnect.mutation("AdminUpdateCourse", dataDeserializer, varsSerializer, vars);
  }
}

@immutable
class AdminUpdateCourseCourseUpdate {
  final String id;
  AdminUpdateCourseCourseUpdate.fromJson(dynamic json):
  
  id = nativeFromJson<String>(json['id']);
  @override
  bool operator ==(Object other) {
    if(identical(this, other)) {
      return true;
    }
    if(other.runtimeType != runtimeType) {
      return false;
    }

    final AdminUpdateCourseCourseUpdate otherTyped = other as AdminUpdateCourseCourseUpdate;
    return id == otherTyped.id;
    
  }
  @override
  int get hashCode => id.hashCode;
  

  Map<String, dynamic> toJson() {
    Map<String, dynamic> json = {};
    json['id'] = nativeToJson<String>(id);
    return json;
  }

  AdminUpdateCourseCourseUpdate({
    required this.id,
  });
}

@immutable
class AdminUpdateCourseData {
  final AdminUpdateCourseCourseUpdate? course_update;
  AdminUpdateCourseData.fromJson(dynamic json):
  
  course_update = json['course_update'] == null ? null : AdminUpdateCourseCourseUpdate.fromJson(json['course_update']);
  @override
  bool operator ==(Object other) {
    if(identical(this, other)) {
      return true;
    }
    if(other.runtimeType != runtimeType) {
      return false;
    }

    final AdminUpdateCourseData otherTyped = other as AdminUpdateCourseData;
    return course_update == otherTyped.course_update;
    
  }
  @override
  int get hashCode => course_update.hashCode;
  

  Map<String, dynamic> toJson() {
    Map<String, dynamic> json = {};
    if (course_update != null) {
      json['course_update'] = course_update!.toJson();
    }
    return json;
  }

  AdminUpdateCourseData({
    this.course_update,
  });
}

@immutable
class AdminUpdateCourseVariables {
  final String courseId;
  late final Optional<String>title;
  late final Optional<String>description;
  late final Optional<int>price;
  late final Optional<String>language;
  late final Optional<CourseLevel>level;
  late final Optional<String>categoryId;
  late final Optional<List<String>>tags;
  late final Optional<String>thumbnail;
  @Deprecated('fromJson is deprecated for Variable classes as they are no longer required for deserialization.')
  AdminUpdateCourseVariables.fromJson(Map<String, dynamic> json):
  
  courseId = nativeFromJson<String>(json['courseId']) {
  
  
  
    title = Optional.optional(nativeFromJson, nativeToJson);
    title.value = json['title'] == null ? null : nativeFromJson<String>(json['title']);
  
  
    description = Optional.optional(nativeFromJson, nativeToJson);
    description.value = json['description'] == null ? null : nativeFromJson<String>(json['description']);
  
  
    price = Optional.optional(nativeFromJson, nativeToJson);
    price.value = json['price'] == null ? null : nativeFromJson<int>(json['price']);
  
  
    language = Optional.optional(nativeFromJson, nativeToJson);
    language.value = json['language'] == null ? null : nativeFromJson<String>(json['language']);
  
  
    level = Optional.optional((data) => CourseLevel.values.byName(data), enumSerializer);
    level.value = json['level'] == null ? null : CourseLevel.values.byName(json['level']);
  
  
    categoryId = Optional.optional(nativeFromJson, nativeToJson);
    categoryId.value = json['categoryId'] == null ? null : nativeFromJson<String>(json['categoryId']);
  
  
    tags = Optional.optional(listDeserializer(nativeFromJson), listSerializer(nativeToJson));
    tags.value = json['tags'] == null ? null : (json['tags'] as List<dynamic>)
        .map((e) => nativeFromJson<String>(e))
        .toList();
  
  
    thumbnail = Optional.optional(nativeFromJson, nativeToJson);
    thumbnail.value = json['thumbnail'] == null ? null : nativeFromJson<String>(json['thumbnail']);
  
  }
  @override
  bool operator ==(Object other) {
    if(identical(this, other)) {
      return true;
    }
    if(other.runtimeType != runtimeType) {
      return false;
    }

    final AdminUpdateCourseVariables otherTyped = other as AdminUpdateCourseVariables;
    return courseId == otherTyped.courseId && 
    title == otherTyped.title && 
    description == otherTyped.description && 
    price == otherTyped.price && 
    language == otherTyped.language && 
    level == otherTyped.level && 
    categoryId == otherTyped.categoryId && 
    tags == otherTyped.tags && 
    thumbnail == otherTyped.thumbnail;
    
  }
  @override
  int get hashCode => Object.hashAll([courseId.hashCode, title.hashCode, description.hashCode, price.hashCode, language.hashCode, level.hashCode, categoryId.hashCode, tags.hashCode, thumbnail.hashCode]);
  

  Map<String, dynamic> toJson() {
    Map<String, dynamic> json = {};
    json['courseId'] = nativeToJson<String>(courseId);
    if(title.state == OptionalState.set) {
      json['title'] = title.toJson();
    }
    if(description.state == OptionalState.set) {
      json['description'] = description.toJson();
    }
    if(price.state == OptionalState.set) {
      json['price'] = price.toJson();
    }
    if(language.state == OptionalState.set) {
      json['language'] = language.toJson();
    }
    if(level.state == OptionalState.set) {
      json['level'] = level.toJson();
    }
    if(categoryId.state == OptionalState.set) {
      json['categoryId'] = categoryId.toJson();
    }
    if(tags.state == OptionalState.set) {
      json['tags'] = tags.toJson();
    }
    if(thumbnail.state == OptionalState.set) {
      json['thumbnail'] = thumbnail.toJson();
    }
    return json;
  }

  AdminUpdateCourseVariables({
    required this.courseId,
    required this.title,
    required this.description,
    required this.price,
    required this.language,
    required this.level,
    required this.categoryId,
    required this.tags,
    required this.thumbnail,
  });
}

