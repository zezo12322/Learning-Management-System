part of 'generated.dart';

class ListRecommendedCoursesVariablesBuilder {
  List<String> categoryIds;
  List<String> excludeIds;
  Optional<int> _limit = Optional.optional(nativeFromJson, nativeToJson);

  final FirebaseDataConnect _dataConnect;  ListRecommendedCoursesVariablesBuilder limit(int? t) {
   _limit.value = t;
   return this;
  }

  ListRecommendedCoursesVariablesBuilder(this._dataConnect, {required  this.categoryIds,required  this.excludeIds,});
  Deserializer<ListRecommendedCoursesData> dataDeserializer = (dynamic json)  => ListRecommendedCoursesData.fromJson(jsonDecode(json));
  Serializer<ListRecommendedCoursesVariables> varsSerializer = (ListRecommendedCoursesVariables vars) => jsonEncode(vars.toJson());
  Future<QueryResult<ListRecommendedCoursesData, ListRecommendedCoursesVariables>> execute({QueryFetchPolicy fetchPolicy = QueryFetchPolicy.preferCache}) {
    return ref().execute(fetchPolicy: fetchPolicy);
  }

  QueryRef<ListRecommendedCoursesData, ListRecommendedCoursesVariables> ref() {
    ListRecommendedCoursesVariables vars= ListRecommendedCoursesVariables(categoryIds: categoryIds,excludeIds: excludeIds,limit: _limit,);
    return _dataConnect.query("ListRecommendedCourses", dataDeserializer, varsSerializer, vars);
  }
}

@immutable
class ListRecommendedCoursesCourses {
  final String id;
  final String title;
  final int price;
  final EnumValue<CourseLevel> level;
  final String? thumbnail;
  final List<String> tags;
  final double avgRating;
  final int ratingCount;
  final ListRecommendedCoursesCoursesCategory category;
  final ListRecommendedCoursesCoursesAuthor author;
  ListRecommendedCoursesCourses.fromJson(dynamic json):
  
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
  category = ListRecommendedCoursesCoursesCategory.fromJson(json['category']),
  author = ListRecommendedCoursesCoursesAuthor.fromJson(json['author']);
  @override
  bool operator ==(Object other) {
    if(identical(this, other)) {
      return true;
    }
    if(other.runtimeType != runtimeType) {
      return false;
    }

    final ListRecommendedCoursesCourses otherTyped = other as ListRecommendedCoursesCourses;
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

  ListRecommendedCoursesCourses({
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
class ListRecommendedCoursesCoursesCategory {
  final String name;
  ListRecommendedCoursesCoursesCategory.fromJson(dynamic json):
  
  name = nativeFromJson<String>(json['name']);
  @override
  bool operator ==(Object other) {
    if(identical(this, other)) {
      return true;
    }
    if(other.runtimeType != runtimeType) {
      return false;
    }

    final ListRecommendedCoursesCoursesCategory otherTyped = other as ListRecommendedCoursesCoursesCategory;
    return name == otherTyped.name;
    
  }
  @override
  int get hashCode => name.hashCode;
  

  Map<String, dynamic> toJson() {
    Map<String, dynamic> json = {};
    json['name'] = nativeToJson<String>(name);
    return json;
  }

  ListRecommendedCoursesCoursesCategory({
    required this.name,
  });
}

@immutable
class ListRecommendedCoursesCoursesAuthor {
  final String name;
  final String? avatar;
  ListRecommendedCoursesCoursesAuthor.fromJson(dynamic json):
  
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

    final ListRecommendedCoursesCoursesAuthor otherTyped = other as ListRecommendedCoursesCoursesAuthor;
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

  ListRecommendedCoursesCoursesAuthor({
    required this.name,
    this.avatar,
  });
}

@immutable
class ListRecommendedCoursesData {
  final List<ListRecommendedCoursesCourses> courses;
  ListRecommendedCoursesData.fromJson(dynamic json):
  
  courses = (json['courses'] as List<dynamic>)
        .map((e) => ListRecommendedCoursesCourses.fromJson(e))
        .toList();
  @override
  bool operator ==(Object other) {
    if(identical(this, other)) {
      return true;
    }
    if(other.runtimeType != runtimeType) {
      return false;
    }

    final ListRecommendedCoursesData otherTyped = other as ListRecommendedCoursesData;
    return courses == otherTyped.courses;
    
  }
  @override
  int get hashCode => courses.hashCode;
  

  Map<String, dynamic> toJson() {
    Map<String, dynamic> json = {};
    json['courses'] = courses.map((e) => e.toJson()).toList();
    return json;
  }

  ListRecommendedCoursesData({
    required this.courses,
  });
}

@immutable
class ListRecommendedCoursesVariables {
  final List<String> categoryIds;
  final List<String> excludeIds;
  late final Optional<int>limit;
  @Deprecated('fromJson is deprecated for Variable classes as they are no longer required for deserialization.')
  ListRecommendedCoursesVariables.fromJson(Map<String, dynamic> json):
  
  categoryIds = (json['categoryIds'] as List<dynamic>)
        .map((e) => nativeFromJson<String>(e))
        .toList(),
  excludeIds = (json['excludeIds'] as List<dynamic>)
        .map((e) => nativeFromJson<String>(e))
        .toList() {
  
  
  
  
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

    final ListRecommendedCoursesVariables otherTyped = other as ListRecommendedCoursesVariables;
    return categoryIds == otherTyped.categoryIds && 
    excludeIds == otherTyped.excludeIds && 
    limit == otherTyped.limit;
    
  }
  @override
  int get hashCode => Object.hashAll([categoryIds.hashCode, excludeIds.hashCode, limit.hashCode]);
  

  Map<String, dynamic> toJson() {
    Map<String, dynamic> json = {};
    json['categoryIds'] = categoryIds.map((e) => nativeToJson<String>(e)).toList();
    json['excludeIds'] = excludeIds.map((e) => nativeToJson<String>(e)).toList();
    if(limit.state == OptionalState.set) {
      json['limit'] = limit.toJson();
    }
    return json;
  }

  ListRecommendedCoursesVariables({
    required this.categoryIds,
    required this.excludeIds,
    required this.limit,
  });
}

