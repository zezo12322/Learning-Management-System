part of 'generated.dart';

class SearchPublishedCoursesVariablesBuilder {
  String searchQuery;

  final FirebaseDataConnect _dataConnect;
  SearchPublishedCoursesVariablesBuilder(this._dataConnect, {required  this.searchQuery,});
  Deserializer<SearchPublishedCoursesData> dataDeserializer = (dynamic json)  => SearchPublishedCoursesData.fromJson(jsonDecode(json));
  Serializer<SearchPublishedCoursesVariables> varsSerializer = (SearchPublishedCoursesVariables vars) => jsonEncode(vars.toJson());
  Future<QueryResult<SearchPublishedCoursesData, SearchPublishedCoursesVariables>> execute({QueryFetchPolicy fetchPolicy = QueryFetchPolicy.preferCache}) {
    return ref().execute(fetchPolicy: fetchPolicy);
  }

  QueryRef<SearchPublishedCoursesData, SearchPublishedCoursesVariables> ref() {
    SearchPublishedCoursesVariables vars= SearchPublishedCoursesVariables(searchQuery: searchQuery,);
    return _dataConnect.query("SearchPublishedCourses", dataDeserializer, varsSerializer, vars);
  }
}

@immutable
class SearchPublishedCoursesCourses {
  final String id;
  final String title;
  final int price;
  final EnumValue<CourseLevel> level;
  final String? thumbnail;
  final List<String> tags;
  final SearchPublishedCoursesCoursesCategory category;
  final SearchPublishedCoursesCoursesAuthor author;
  SearchPublishedCoursesCourses.fromJson(dynamic json):
  
  id = nativeFromJson<String>(json['id']),
  title = nativeFromJson<String>(json['title']),
  price = nativeFromJson<int>(json['price']),
  level = courseLevelDeserializer(json['level']),
  thumbnail = json['thumbnail'] == null ? null : nativeFromJson<String>(json['thumbnail']),
  tags = (json['tags'] as List<dynamic>)
        .map((e) => nativeFromJson<String>(e))
        .toList(),
  category = SearchPublishedCoursesCoursesCategory.fromJson(json['category']),
  author = SearchPublishedCoursesCoursesAuthor.fromJson(json['author']);
  @override
  bool operator ==(Object other) {
    if(identical(this, other)) {
      return true;
    }
    if(other.runtimeType != runtimeType) {
      return false;
    }

    final SearchPublishedCoursesCourses otherTyped = other as SearchPublishedCoursesCourses;
    return id == otherTyped.id && 
    title == otherTyped.title && 
    price == otherTyped.price && 
    level == otherTyped.level && 
    thumbnail == otherTyped.thumbnail && 
    tags == otherTyped.tags && 
    category == otherTyped.category && 
    author == otherTyped.author;
    
  }
  @override
  int get hashCode => Object.hashAll([id.hashCode, title.hashCode, price.hashCode, level.hashCode, thumbnail.hashCode, tags.hashCode, category.hashCode, author.hashCode]);
  

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
    json['author'] = author.toJson();
    return json;
  }

  SearchPublishedCoursesCourses({
    required this.id,
    required this.title,
    required this.price,
    required this.level,
    this.thumbnail,
    required this.tags,
    required this.category,
    required this.author,
  });
}

@immutable
class SearchPublishedCoursesCoursesCategory {
  final String name;
  SearchPublishedCoursesCoursesCategory.fromJson(dynamic json):
  
  name = nativeFromJson<String>(json['name']);
  @override
  bool operator ==(Object other) {
    if(identical(this, other)) {
      return true;
    }
    if(other.runtimeType != runtimeType) {
      return false;
    }

    final SearchPublishedCoursesCoursesCategory otherTyped = other as SearchPublishedCoursesCoursesCategory;
    return name == otherTyped.name;
    
  }
  @override
  int get hashCode => name.hashCode;
  

  Map<String, dynamic> toJson() {
    Map<String, dynamic> json = {};
    json['name'] = nativeToJson<String>(name);
    return json;
  }

  SearchPublishedCoursesCoursesCategory({
    required this.name,
  });
}

@immutable
class SearchPublishedCoursesCoursesAuthor {
  final String name;
  final String? avatar;
  SearchPublishedCoursesCoursesAuthor.fromJson(dynamic json):
  
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

    final SearchPublishedCoursesCoursesAuthor otherTyped = other as SearchPublishedCoursesCoursesAuthor;
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

  SearchPublishedCoursesCoursesAuthor({
    required this.name,
    this.avatar,
  });
}

@immutable
class SearchPublishedCoursesData {
  final List<SearchPublishedCoursesCourses> courses;
  SearchPublishedCoursesData.fromJson(dynamic json):
  
  courses = (json['courses'] as List<dynamic>)
        .map((e) => SearchPublishedCoursesCourses.fromJson(e))
        .toList();
  @override
  bool operator ==(Object other) {
    if(identical(this, other)) {
      return true;
    }
    if(other.runtimeType != runtimeType) {
      return false;
    }

    final SearchPublishedCoursesData otherTyped = other as SearchPublishedCoursesData;
    return courses == otherTyped.courses;
    
  }
  @override
  int get hashCode => courses.hashCode;
  

  Map<String, dynamic> toJson() {
    Map<String, dynamic> json = {};
    json['courses'] = courses.map((e) => e.toJson()).toList();
    return json;
  }

  SearchPublishedCoursesData({
    required this.courses,
  });
}

@immutable
class SearchPublishedCoursesVariables {
  final String searchQuery;
  @Deprecated('fromJson is deprecated for Variable classes as they are no longer required for deserialization.')
  SearchPublishedCoursesVariables.fromJson(Map<String, dynamic> json):
  
  searchQuery = nativeFromJson<String>(json['searchQuery']);
  @override
  bool operator ==(Object other) {
    if(identical(this, other)) {
      return true;
    }
    if(other.runtimeType != runtimeType) {
      return false;
    }

    final SearchPublishedCoursesVariables otherTyped = other as SearchPublishedCoursesVariables;
    return searchQuery == otherTyped.searchQuery;
    
  }
  @override
  int get hashCode => searchQuery.hashCode;
  

  Map<String, dynamic> toJson() {
    Map<String, dynamic> json = {};
    json['searchQuery'] = nativeToJson<String>(searchQuery);
    return json;
  }

  SearchPublishedCoursesVariables({
    required this.searchQuery,
  });
}

