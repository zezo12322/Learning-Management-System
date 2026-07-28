part of 'generated.dart';

class ListPopularCoursesVariablesBuilder {
  Optional<int> _limit = Optional.optional(nativeFromJson, nativeToJson);

  final FirebaseDataConnect _dataConnect;
  ListPopularCoursesVariablesBuilder limit(int? t) {
   _limit.value = t;
   return this;
  }

  ListPopularCoursesVariablesBuilder(this._dataConnect, );
  Deserializer<ListPopularCoursesData> dataDeserializer = (dynamic json)  => ListPopularCoursesData.fromJson(jsonDecode(json));
  Serializer<ListPopularCoursesVariables> varsSerializer = (ListPopularCoursesVariables vars) => jsonEncode(vars.toJson());
  Future<QueryResult<ListPopularCoursesData, ListPopularCoursesVariables>> execute({QueryFetchPolicy fetchPolicy = QueryFetchPolicy.preferCache}) {
    return ref().execute(fetchPolicy: fetchPolicy);
  }

  QueryRef<ListPopularCoursesData, ListPopularCoursesVariables> ref() {
    ListPopularCoursesVariables vars= ListPopularCoursesVariables(limit: _limit,);
    return _dataConnect.query("ListPopularCourses", dataDeserializer, varsSerializer, vars);
  }
}

@immutable
class ListPopularCoursesCourses {
  final String id;
  final String title;
  final int price;
  final EnumValue<CourseLevel> level;
  final String? thumbnail;
  final List<String> tags;
  final double avgRating;
  final int ratingCount;
  final ListPopularCoursesCoursesCategory category;
  final ListPopularCoursesCoursesAuthor author;
  ListPopularCoursesCourses.fromJson(dynamic json):
  
  id = nativeFromJson<String>(json['id']),
  title = nativeFromJson<String>(json['title']),
  price = nativeFromJson<int>(json['price']),
  level = courseLevelDeserializer(json['level']),
  thumbnail = json['thumbnail'] == null ? null : nativeFromJson<String>(json['thumbnail']),
  tags = (json['tags'] as List<dynamic>)
        .map((e) => nativeFromJson<String>(e))
        .toList(),
  avgRating = nativeFromJson<double>(json['avgRating']),
  ratingCount = nativeFromJson<int>(json['ratingCount']),
  category = ListPopularCoursesCoursesCategory.fromJson(json['category']),
  author = ListPopularCoursesCoursesAuthor.fromJson(json['author']);
  @override
  bool operator ==(Object other) {
    if(identical(this, other)) {
      return true;
    }
    if(other.runtimeType != runtimeType) {
      return false;
    }

    final ListPopularCoursesCourses otherTyped = other as ListPopularCoursesCourses;
    return id == otherTyped.id && 
    title == otherTyped.title && 
    price == otherTyped.price && 
    level == otherTyped.level && 
    thumbnail == otherTyped.thumbnail && 
    tags == otherTyped.tags && 
    avgRating == otherTyped.avgRating && 
    ratingCount == otherTyped.ratingCount && 
    category == otherTyped.category && 
    author == otherTyped.author;
    
  }
  @override
  int get hashCode => Object.hashAll([id.hashCode, title.hashCode, price.hashCode, level.hashCode, thumbnail.hashCode, tags.hashCode, avgRating.hashCode, ratingCount.hashCode, category.hashCode, author.hashCode]);
  

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
    json['avgRating'] = nativeToJson<double>(avgRating);
    json['ratingCount'] = nativeToJson<int>(ratingCount);
    json['category'] = category.toJson();
    json['author'] = author.toJson();
    return json;
  }

  ListPopularCoursesCourses({
    required this.id,
    required this.title,
    required this.price,
    required this.level,
    this.thumbnail,
    required this.tags,
    required this.avgRating,
    required this.ratingCount,
    required this.category,
    required this.author,
  });
}

@immutable
class ListPopularCoursesCoursesCategory {
  final String name;
  ListPopularCoursesCoursesCategory.fromJson(dynamic json):
  
  name = nativeFromJson<String>(json['name']);
  @override
  bool operator ==(Object other) {
    if(identical(this, other)) {
      return true;
    }
    if(other.runtimeType != runtimeType) {
      return false;
    }

    final ListPopularCoursesCoursesCategory otherTyped = other as ListPopularCoursesCoursesCategory;
    return name == otherTyped.name;
    
  }
  @override
  int get hashCode => name.hashCode;
  

  Map<String, dynamic> toJson() {
    Map<String, dynamic> json = {};
    json['name'] = nativeToJson<String>(name);
    return json;
  }

  ListPopularCoursesCoursesCategory({
    required this.name,
  });
}

@immutable
class ListPopularCoursesCoursesAuthor {
  final String name;
  final String? avatar;
  ListPopularCoursesCoursesAuthor.fromJson(dynamic json):
  
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

    final ListPopularCoursesCoursesAuthor otherTyped = other as ListPopularCoursesCoursesAuthor;
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

  ListPopularCoursesCoursesAuthor({
    required this.name,
    this.avatar,
  });
}

@immutable
class ListPopularCoursesData {
  final List<ListPopularCoursesCourses> courses;
  ListPopularCoursesData.fromJson(dynamic json):
  
  courses = (json['courses'] as List<dynamic>)
        .map((e) => ListPopularCoursesCourses.fromJson(e))
        .toList();
  @override
  bool operator ==(Object other) {
    if(identical(this, other)) {
      return true;
    }
    if(other.runtimeType != runtimeType) {
      return false;
    }

    final ListPopularCoursesData otherTyped = other as ListPopularCoursesData;
    return courses == otherTyped.courses;
    
  }
  @override
  int get hashCode => courses.hashCode;
  

  Map<String, dynamic> toJson() {
    Map<String, dynamic> json = {};
    json['courses'] = courses.map((e) => e.toJson()).toList();
    return json;
  }

  ListPopularCoursesData({
    required this.courses,
  });
}

@immutable
class ListPopularCoursesVariables {
  late final Optional<int>limit;
  @Deprecated('fromJson is deprecated for Variable classes as they are no longer required for deserialization.')
  ListPopularCoursesVariables.fromJson(Map<String, dynamic> json) {
  
  
    limit = Optional.optional(nativeFromJson, nativeToJson);
    limit.value = json['limit'] == null ? null : nativeFromJson<int>(json['limit']);
  
  }
  @override
  bool operator ==(Object other) {
    if(identical(this, other)) {
      return true;
    }
    if(other.runtimeType != runtimeType) {
      return false;
    }

    final ListPopularCoursesVariables otherTyped = other as ListPopularCoursesVariables;
    return limit == otherTyped.limit;
    
  }
  @override
  int get hashCode => limit.hashCode;
  

  Map<String, dynamic> toJson() {
    Map<String, dynamic> json = {};
    if(limit.state == OptionalState.set) {
      json['limit'] = limit.toJson();
    }
    return json;
  }

  ListPopularCoursesVariables({
    required this.limit,
  });
}

