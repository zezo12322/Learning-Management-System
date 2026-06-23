part of 'generated.dart';

class AdminListMyCoursesVariablesBuilder {
  
  final FirebaseDataConnect _dataConnect;
  AdminListMyCoursesVariablesBuilder(this._dataConnect, );
  Deserializer<AdminListMyCoursesData> dataDeserializer = (dynamic json)  => AdminListMyCoursesData.fromJson(jsonDecode(json));
  
  Future<QueryResult<AdminListMyCoursesData, void>> execute({QueryFetchPolicy fetchPolicy = QueryFetchPolicy.preferCache}) {
    return ref().execute(fetchPolicy: fetchPolicy);
  }

  QueryRef<AdminListMyCoursesData, void> ref() {
    
    return _dataConnect.query('AdminListMyCourses', dataDeserializer, emptySerializer, null);
  }
}

@immutable
class AdminListMyCoursesCourses {
  final String id;
  final String title;
  final EnumValue<CourseStatus> status;
  final EnumValue<CourseLevel> level;
  final String? thumbnail;
  final int price;
  final Timestamp updatedAt;
  final AdminListMyCoursesCoursesCategory category;
  AdminListMyCoursesCourses.fromJson(dynamic json):
  
  id = nativeFromJson<String>(json['id']),
  title = nativeFromJson<String>(json['title']),
  status = courseStatusDeserializer(json['status']),
  level = courseLevelDeserializer(json['level']),
  thumbnail = json['thumbnail'] == null ? null : nativeFromJson<String>(json['thumbnail']),
  price = nativeFromJson<int>(json['price']),
  updatedAt = Timestamp.fromJson(json['updatedAt']),
  category = AdminListMyCoursesCoursesCategory.fromJson(json['category']);
  @override
  bool operator ==(Object other) {
    if(identical(this, other)) {
      return true;
    }
    if(other.runtimeType != runtimeType) {
      return false;
    }

    final AdminListMyCoursesCourses otherTyped = other as AdminListMyCoursesCourses;
    return id == otherTyped.id && 
    title == otherTyped.title && 
    status == otherTyped.status && 
    level == otherTyped.level && 
    thumbnail == otherTyped.thumbnail && 
    price == otherTyped.price && 
    updatedAt == otherTyped.updatedAt && 
    category == otherTyped.category;
    
  }
  @override
  int get hashCode => Object.hashAll([id.hashCode, title.hashCode, status.hashCode, level.hashCode, thumbnail.hashCode, price.hashCode, updatedAt.hashCode, category.hashCode]);
  

  Map<String, dynamic> toJson() {
    Map<String, dynamic> json = {};
    json['id'] = nativeToJson<String>(id);
    json['title'] = nativeToJson<String>(title);
    json['status'] = 
    courseStatusSerializer(status)
    ;
    json['level'] = 
    courseLevelSerializer(level)
    ;
    if (thumbnail != null) {
      json['thumbnail'] = nativeToJson<String?>(thumbnail);
    }
    json['price'] = nativeToJson<int>(price);
    json['updatedAt'] = updatedAt.toJson();
    json['category'] = category.toJson();
    return json;
  }

  AdminListMyCoursesCourses({
    required this.id,
    required this.title,
    required this.status,
    required this.level,
    this.thumbnail,
    required this.price,
    required this.updatedAt,
    required this.category,
  });
}

@immutable
class AdminListMyCoursesCoursesCategory {
  final String name;
  AdminListMyCoursesCoursesCategory.fromJson(dynamic json):
  
  name = nativeFromJson<String>(json['name']);
  @override
  bool operator ==(Object other) {
    if(identical(this, other)) {
      return true;
    }
    if(other.runtimeType != runtimeType) {
      return false;
    }

    final AdminListMyCoursesCoursesCategory otherTyped = other as AdminListMyCoursesCoursesCategory;
    return name == otherTyped.name;
    
  }
  @override
  int get hashCode => name.hashCode;
  

  Map<String, dynamic> toJson() {
    Map<String, dynamic> json = {};
    json['name'] = nativeToJson<String>(name);
    return json;
  }

  AdminListMyCoursesCoursesCategory({
    required this.name,
  });
}

@immutable
class AdminListMyCoursesData {
  final List<AdminListMyCoursesCourses> courses;
  AdminListMyCoursesData.fromJson(dynamic json):
  
  courses = (json['courses'] as List<dynamic>)
        .map((e) => AdminListMyCoursesCourses.fromJson(e))
        .toList();
  @override
  bool operator ==(Object other) {
    if(identical(this, other)) {
      return true;
    }
    if(other.runtimeType != runtimeType) {
      return false;
    }

    final AdminListMyCoursesData otherTyped = other as AdminListMyCoursesData;
    return courses == otherTyped.courses;
    
  }
  @override
  int get hashCode => courses.hashCode;
  

  Map<String, dynamic> toJson() {
    Map<String, dynamic> json = {};
    json['courses'] = courses.map((e) => e.toJson()).toList();
    return json;
  }

  AdminListMyCoursesData({
    required this.courses,
  });
}

