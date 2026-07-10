part of 'generated.dart';

class GetMyContinueLearningVariablesBuilder {
  
  final FirebaseDataConnect _dataConnect;
  GetMyContinueLearningVariablesBuilder(this._dataConnect, );
  Deserializer<GetMyContinueLearningData> dataDeserializer = (dynamic json)  => GetMyContinueLearningData.fromJson(jsonDecode(json));
  
  Future<QueryResult<GetMyContinueLearningData, void>> execute({QueryFetchPolicy fetchPolicy = QueryFetchPolicy.preferCache}) {
    return ref().execute(fetchPolicy: fetchPolicy);
  }

  QueryRef<GetMyContinueLearningData, void> ref() {
    
    return _dataConnect.query("GetMyContinueLearning", dataDeserializer, emptySerializer, null);
  }
}

@immutable
class GetMyContinueLearningEnrollments {
  final String id;
  final EnumValue<EnrollmentStatus> status;
  final Timestamp enrolledAt;
  final Timestamp? completedAt;
  final GetMyContinueLearningEnrollmentsCourse? course;
  GetMyContinueLearningEnrollments.fromJson(dynamic json):
  
  id = nativeFromJson<String>(json['id']),
  status = enrollmentStatusDeserializer(json['status']),
  enrolledAt = Timestamp.fromJson(json['enrolledAt']),
  completedAt = json['completedAt'] == null ? null : Timestamp.fromJson(json['completedAt']),
  course = json['course'] == null ? null : GetMyContinueLearningEnrollmentsCourse.fromJson(json['course']);
  @override
  bool operator ==(Object other) {
    if(identical(this, other)) {
      return true;
    }
    if(other.runtimeType != runtimeType) {
      return false;
    }

    final GetMyContinueLearningEnrollments otherTyped = other as GetMyContinueLearningEnrollments;
    return id == otherTyped.id && 
    status == otherTyped.status && 
    enrolledAt == otherTyped.enrolledAt && 
    completedAt == otherTyped.completedAt && 
    course == otherTyped.course;
    
  }
  @override
  int get hashCode => Object.hashAll([id.hashCode, status.hashCode, enrolledAt.hashCode, completedAt.hashCode, course.hashCode]);
  

  Map<String, dynamic> toJson() {
    Map<String, dynamic> json = {};
    json['id'] = nativeToJson<String>(id);
    json['status'] = 
    enrollmentStatusSerializer(status)
    ;
    json['enrolledAt'] = enrolledAt.toJson();
    if (completedAt != null) {
      json['completedAt'] = completedAt!.toJson();
    }
    if (course != null) {
      json['course'] = course!.toJson();
    }
    return json;
  }

  GetMyContinueLearningEnrollments({
    required this.id,
    required this.status,
    required this.enrolledAt,
    this.completedAt,
    this.course,
  });
}

@immutable
class GetMyContinueLearningEnrollmentsCourse {
  final String id;
  final String title;
  final String? thumbnail;
  final EnumValue<CourseLevel> level;
  final int price;
  final Timestamp? deletedAt;
  final GetMyContinueLearningEnrollmentsCourseCategory category;
  final GetMyContinueLearningEnrollmentsCourseAuthor author;
  final List<GetMyContinueLearningEnrollmentsCourseClSections> clSections;
  GetMyContinueLearningEnrollmentsCourse.fromJson(dynamic json):
  
  id = nativeFromJson<String>(json['id']),
  title = nativeFromJson<String>(json['title']),
  thumbnail = json['thumbnail'] == null ? null : nativeFromJson<String>(json['thumbnail']),
  level = courseLevelDeserializer(json['level']),
  price = nativeFromJson<int>(json['price']),
  deletedAt = json['deletedAt'] == null ? null : Timestamp.fromJson(json['deletedAt']),
  category = GetMyContinueLearningEnrollmentsCourseCategory.fromJson(json['category']),
  author = GetMyContinueLearningEnrollmentsCourseAuthor.fromJson(json['author']),
  clSections = (json['clSections'] as List<dynamic>)
        .map((e) => GetMyContinueLearningEnrollmentsCourseClSections.fromJson(e))
        .toList();
  @override
  bool operator ==(Object other) {
    if(identical(this, other)) {
      return true;
    }
    if(other.runtimeType != runtimeType) {
      return false;
    }

    final GetMyContinueLearningEnrollmentsCourse otherTyped = other as GetMyContinueLearningEnrollmentsCourse;
    return id == otherTyped.id && 
    title == otherTyped.title && 
    thumbnail == otherTyped.thumbnail && 
    level == otherTyped.level && 
    price == otherTyped.price && 
    deletedAt == otherTyped.deletedAt && 
    category == otherTyped.category && 
    author == otherTyped.author && 
    clSections == otherTyped.clSections;
    
  }
  @override
  int get hashCode => Object.hashAll([id.hashCode, title.hashCode, thumbnail.hashCode, level.hashCode, price.hashCode, deletedAt.hashCode, category.hashCode, author.hashCode, clSections.hashCode]);
  

  Map<String, dynamic> toJson() {
    Map<String, dynamic> json = {};
    json['id'] = nativeToJson<String>(id);
    json['title'] = nativeToJson<String>(title);
    if (thumbnail != null) {
      json['thumbnail'] = nativeToJson<String?>(thumbnail);
    }
    json['level'] = 
    courseLevelSerializer(level)
    ;
    json['price'] = nativeToJson<int>(price);
    if (deletedAt != null) {
      json['deletedAt'] = deletedAt!.toJson();
    }
    json['category'] = category.toJson();
    json['author'] = author.toJson();
    json['clSections'] = clSections.map((e) => e.toJson()).toList();
    return json;
  }

  GetMyContinueLearningEnrollmentsCourse({
    required this.id,
    required this.title,
    this.thumbnail,
    required this.level,
    required this.price,
    this.deletedAt,
    required this.category,
    required this.author,
    required this.clSections,
  });
}

@immutable
class GetMyContinueLearningEnrollmentsCourseCategory {
  final String name;
  GetMyContinueLearningEnrollmentsCourseCategory.fromJson(dynamic json):
  
  name = nativeFromJson<String>(json['name']);
  @override
  bool operator ==(Object other) {
    if(identical(this, other)) {
      return true;
    }
    if(other.runtimeType != runtimeType) {
      return false;
    }

    final GetMyContinueLearningEnrollmentsCourseCategory otherTyped = other as GetMyContinueLearningEnrollmentsCourseCategory;
    return name == otherTyped.name;
    
  }
  @override
  int get hashCode => name.hashCode;
  

  Map<String, dynamic> toJson() {
    Map<String, dynamic> json = {};
    json['name'] = nativeToJson<String>(name);
    return json;
  }

  GetMyContinueLearningEnrollmentsCourseCategory({
    required this.name,
  });
}

@immutable
class GetMyContinueLearningEnrollmentsCourseAuthor {
  final String name;
  final String? avatar;
  GetMyContinueLearningEnrollmentsCourseAuthor.fromJson(dynamic json):
  
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

    final GetMyContinueLearningEnrollmentsCourseAuthor otherTyped = other as GetMyContinueLearningEnrollmentsCourseAuthor;
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

  GetMyContinueLearningEnrollmentsCourseAuthor({
    required this.name,
    this.avatar,
  });
}

@immutable
class GetMyContinueLearningEnrollmentsCourseClSections {
  final List<GetMyContinueLearningEnrollmentsCourseClSectionsClLectures> clLectures;
  GetMyContinueLearningEnrollmentsCourseClSections.fromJson(dynamic json):
  
  clLectures = (json['clLectures'] as List<dynamic>)
        .map((e) => GetMyContinueLearningEnrollmentsCourseClSectionsClLectures.fromJson(e))
        .toList();
  @override
  bool operator ==(Object other) {
    if(identical(this, other)) {
      return true;
    }
    if(other.runtimeType != runtimeType) {
      return false;
    }

    final GetMyContinueLearningEnrollmentsCourseClSections otherTyped = other as GetMyContinueLearningEnrollmentsCourseClSections;
    return clLectures == otherTyped.clLectures;
    
  }
  @override
  int get hashCode => clLectures.hashCode;
  

  Map<String, dynamic> toJson() {
    Map<String, dynamic> json = {};
    json['clLectures'] = clLectures.map((e) => e.toJson()).toList();
    return json;
  }

  GetMyContinueLearningEnrollmentsCourseClSections({
    required this.clLectures,
  });
}

@immutable
class GetMyContinueLearningEnrollmentsCourseClSectionsClLectures {
  final String id;
  final List<GetMyContinueLearningEnrollmentsCourseClSectionsClLecturesClProgress> clProgress;
  GetMyContinueLearningEnrollmentsCourseClSectionsClLectures.fromJson(dynamic json):
  
  id = nativeFromJson<String>(json['id']),
  clProgress = (json['clProgress'] as List<dynamic>)
        .map((e) => GetMyContinueLearningEnrollmentsCourseClSectionsClLecturesClProgress.fromJson(e))
        .toList();
  @override
  bool operator ==(Object other) {
    if(identical(this, other)) {
      return true;
    }
    if(other.runtimeType != runtimeType) {
      return false;
    }

    final GetMyContinueLearningEnrollmentsCourseClSectionsClLectures otherTyped = other as GetMyContinueLearningEnrollmentsCourseClSectionsClLectures;
    return id == otherTyped.id && 
    clProgress == otherTyped.clProgress;
    
  }
  @override
  int get hashCode => Object.hashAll([id.hashCode, clProgress.hashCode]);
  

  Map<String, dynamic> toJson() {
    Map<String, dynamic> json = {};
    json['id'] = nativeToJson<String>(id);
    json['clProgress'] = clProgress.map((e) => e.toJson()).toList();
    return json;
  }

  GetMyContinueLearningEnrollmentsCourseClSectionsClLectures({
    required this.id,
    required this.clProgress,
  });
}

@immutable
class GetMyContinueLearningEnrollmentsCourseClSectionsClLecturesClProgress {
  final Timestamp? completedAt;
  GetMyContinueLearningEnrollmentsCourseClSectionsClLecturesClProgress.fromJson(dynamic json):
  
  completedAt = json['completedAt'] == null ? null : Timestamp.fromJson(json['completedAt']);
  @override
  bool operator ==(Object other) {
    if(identical(this, other)) {
      return true;
    }
    if(other.runtimeType != runtimeType) {
      return false;
    }

    final GetMyContinueLearningEnrollmentsCourseClSectionsClLecturesClProgress otherTyped = other as GetMyContinueLearningEnrollmentsCourseClSectionsClLecturesClProgress;
    return completedAt == otherTyped.completedAt;
    
  }
  @override
  int get hashCode => completedAt.hashCode;
  

  Map<String, dynamic> toJson() {
    Map<String, dynamic> json = {};
    if (completedAt != null) {
      json['completedAt'] = completedAt!.toJson();
    }
    return json;
  }

  GetMyContinueLearningEnrollmentsCourseClSectionsClLecturesClProgress({
    this.completedAt,
  });
}

@immutable
class GetMyContinueLearningData {
  final List<GetMyContinueLearningEnrollments> enrollments;
  GetMyContinueLearningData.fromJson(dynamic json):
  
  enrollments = (json['enrollments'] as List<dynamic>)
        .map((e) => GetMyContinueLearningEnrollments.fromJson(e))
        .toList();
  @override
  bool operator ==(Object other) {
    if(identical(this, other)) {
      return true;
    }
    if(other.runtimeType != runtimeType) {
      return false;
    }

    final GetMyContinueLearningData otherTyped = other as GetMyContinueLearningData;
    return enrollments == otherTyped.enrollments;
    
  }
  @override
  int get hashCode => enrollments.hashCode;
  

  Map<String, dynamic> toJson() {
    Map<String, dynamic> json = {};
    json['enrollments'] = enrollments.map((e) => e.toJson()).toList();
    return json;
  }

  GetMyContinueLearningData({
    required this.enrollments,
  });
}

