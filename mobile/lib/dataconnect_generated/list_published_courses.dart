part of 'generated.dart';

class ListPublishedCoursesVariablesBuilder {
  
  final FirebaseDataConnect _dataConnect;
  ListPublishedCoursesVariablesBuilder(this._dataConnect, );
  Deserializer<ListPublishedCoursesData> dataDeserializer = (dynamic json)  => ListPublishedCoursesData.fromJson(jsonDecode(json));
  
  Future<QueryResult<ListPublishedCoursesData, void>> execute({QueryFetchPolicy fetchPolicy = QueryFetchPolicy.preferCache}) {
    return ref().execute(fetchPolicy: fetchPolicy);
  }

  QueryRef<ListPublishedCoursesData, void> ref() {
    
    return _dataConnect.query("ListPublishedCourses", dataDeserializer, emptySerializer, null);
  }
}

@immutable
class ListPublishedCoursesCourses {
  final String id;
  final String title;
  final int price;
  final EnumValue<CourseLevel> level;
  final String? thumbnail;
  final List<String> tags;
  final ListPublishedCoursesCoursesCategory category;
  final List<ListPublishedCoursesCoursesCourseInstructorsOnCourse> courseInstructors_on_course;
  ListPublishedCoursesCourses.fromJson(dynamic json):
  
  id = nativeFromJson<String>(json['id']),
  title = nativeFromJson<String>(json['title']),
  price = nativeFromJson<int>(json['price']),
  level = courseLevelDeserializer(json['level']),
  thumbnail = json['thumbnail'] == null ? null : nativeFromJson<String>(json['thumbnail']),
  tags = (json['tags'] as List<dynamic>)
        .map((e) => nativeFromJson<String>(e))
        .toList(),
  category = ListPublishedCoursesCoursesCategory.fromJson(json['category']),
  courseInstructors_on_course = (json['courseInstructors_on_course'] as List<dynamic>)
        .map((e) => ListPublishedCoursesCoursesCourseInstructorsOnCourse.fromJson(e))
        .toList();
  @override
  bool operator ==(Object other) {
    if(identical(this, other)) {
      return true;
    }
    if(other.runtimeType != runtimeType) {
      return false;
    }

    final ListPublishedCoursesCourses otherTyped = other as ListPublishedCoursesCourses;
    return id == otherTyped.id && 
    title == otherTyped.title && 
    price == otherTyped.price && 
    level == otherTyped.level && 
    thumbnail == otherTyped.thumbnail && 
    tags == otherTyped.tags && 
    category == otherTyped.category && 
    courseInstructors_on_course == otherTyped.courseInstructors_on_course;
    
  }
  @override
  int get hashCode => Object.hashAll([id.hashCode, title.hashCode, price.hashCode, level.hashCode, thumbnail.hashCode, tags.hashCode, category.hashCode, courseInstructors_on_course.hashCode]);
  

  Map<String, dynamic> toJson() {
    Map<String, dynamic> json = {};
    json['id'] = nativeToJson<String>(id);
    json['title'] = nativeToJson<String>(title);
    json['price'] = nativeToJson<int>(price);
    json['level'] = 
    courseLevelSerializer(level)
    ;
    if (thumbnail != null) {
      json['thumbnail'] = nativeToJson<String?>(thumbnail);
    }
    json['tags'] = tags.map((e) => nativeToJson<String>(e)).toList();
    json['category'] = category.toJson();
    json['courseInstructors_on_course'] = courseInstructors_on_course.map((e) => e.toJson()).toList();
    return json;
  }

  ListPublishedCoursesCourses({
    required this.id,
    required this.title,
    required this.price,
    required this.level,
    this.thumbnail,
    required this.tags,
    required this.category,
    required this.courseInstructors_on_course,
  });
}

@immutable
class ListPublishedCoursesCoursesCategory {
  final String name;
  ListPublishedCoursesCoursesCategory.fromJson(dynamic json):
  
  name = nativeFromJson<String>(json['name']);
  @override
  bool operator ==(Object other) {
    if(identical(this, other)) {
      return true;
    }
    if(other.runtimeType != runtimeType) {
      return false;
    }

    final ListPublishedCoursesCoursesCategory otherTyped = other as ListPublishedCoursesCoursesCategory;
    return name == otherTyped.name;
    
  }
  @override
  int get hashCode => name.hashCode;
  

  Map<String, dynamic> toJson() {
    Map<String, dynamic> json = {};
    json['name'] = nativeToJson<String>(name);
    return json;
  }

  ListPublishedCoursesCoursesCategory({
    required this.name,
  });
}

@immutable
class ListPublishedCoursesCoursesCourseInstructorsOnCourse {
  final ListPublishedCoursesCoursesCourseInstructorsOnCourseUser user;
  ListPublishedCoursesCoursesCourseInstructorsOnCourse.fromJson(dynamic json):
  
  user = ListPublishedCoursesCoursesCourseInstructorsOnCourseUser.fromJson(json['user']);
  @override
  bool operator ==(Object other) {
    if(identical(this, other)) {
      return true;
    }
    if(other.runtimeType != runtimeType) {
      return false;
    }

    final ListPublishedCoursesCoursesCourseInstructorsOnCourse otherTyped = other as ListPublishedCoursesCoursesCourseInstructorsOnCourse;
    return user == otherTyped.user;
    
  }
  @override
  int get hashCode => user.hashCode;
  

  Map<String, dynamic> toJson() {
    Map<String, dynamic> json = {};
    json['user'] = user.toJson();
    return json;
  }

  ListPublishedCoursesCoursesCourseInstructorsOnCourse({
    required this.user,
  });
}

@immutable
class ListPublishedCoursesCoursesCourseInstructorsOnCourseUser {
  final String name;
  final String? avatar;
  ListPublishedCoursesCoursesCourseInstructorsOnCourseUser.fromJson(dynamic json):
  
  name = nativeFromJson<String>(json['name']),
  avatar = json['avatar'] == null ? null : nativeFromJson<String>(json['avatar']);
  @override
  bool operator ==(Object other) {
    if(identical(this, other)) {
      return true;
    }
    if(other.runtimeType != runtimeType) {
      return false;
    }

    final ListPublishedCoursesCoursesCourseInstructorsOnCourseUser otherTyped = other as ListPublishedCoursesCoursesCourseInstructorsOnCourseUser;
    return name == otherTyped.name && 
    avatar == otherTyped.avatar;
    
  }
  @override
  int get hashCode => Object.hashAll([name.hashCode, avatar.hashCode]);
  

  Map<String, dynamic> toJson() {
    Map<String, dynamic> json = {};
    json['name'] = nativeToJson<String>(name);
    if (avatar != null) {
      json['avatar'] = nativeToJson<String?>(avatar);
    }
    return json;
  }

  ListPublishedCoursesCoursesCourseInstructorsOnCourseUser({
    required this.name,
    this.avatar,
  });
}

@immutable
class ListPublishedCoursesData {
  final List<ListPublishedCoursesCourses> courses;
  ListPublishedCoursesData.fromJson(dynamic json):
  
  courses = (json['courses'] as List<dynamic>)
        .map((e) => ListPublishedCoursesCourses.fromJson(e))
        .toList();
  @override
  bool operator ==(Object other) {
    if(identical(this, other)) {
      return true;
    }
    if(other.runtimeType != runtimeType) {
      return false;
    }

    final ListPublishedCoursesData otherTyped = other as ListPublishedCoursesData;
    return courses == otherTyped.courses;
    
  }
  @override
  int get hashCode => courses.hashCode;
  

  Map<String, dynamic> toJson() {
    Map<String, dynamic> json = {};
    json['courses'] = courses.map((e) => e.toJson()).toList();
    return json;
  }

  ListPublishedCoursesData({
    required this.courses,
  });
}

