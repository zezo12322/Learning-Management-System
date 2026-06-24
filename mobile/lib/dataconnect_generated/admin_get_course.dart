part of 'generated.dart';

class AdminGetCourseVariablesBuilder {
  String courseId;

  final FirebaseDataConnect _dataConnect;
  AdminGetCourseVariablesBuilder(this._dataConnect, {required  this.courseId,});
  Deserializer<AdminGetCourseData> dataDeserializer = (dynamic json)  => AdminGetCourseData.fromJson(jsonDecode(json));
  Serializer<AdminGetCourseVariables> varsSerializer = (AdminGetCourseVariables vars) => jsonEncode(vars.toJson());
  Future<QueryResult<AdminGetCourseData, AdminGetCourseVariables>> execute({QueryFetchPolicy fetchPolicy = QueryFetchPolicy.preferCache}) {
    return ref().execute(fetchPolicy: fetchPolicy);
  }

  QueryRef<AdminGetCourseData, AdminGetCourseVariables> ref() {
    AdminGetCourseVariables vars= AdminGetCourseVariables(courseId: courseId,);
    return _dataConnect.query("AdminGetCourse", dataDeserializer, varsSerializer, vars);
  }
}

@immutable
class AdminGetCourseCourse {
  final String id;
  final String title;
  final String? description;
  final int price;
  final EnumValue<CourseStatus> status;
  final String language;
  final EnumValue<CourseLevel> level;
  final String? thumbnail;
  final List<String> tags;
  final Timestamp? deletedAt;
  final Timestamp createdAt;
  final Timestamp updatedAt;
  final AdminGetCourseCourseCategory category;
  final AdminGetCourseCourseAuthor author;
  final AdminGetCourseCourseCreatedBy createdBy;
  final List<AdminGetCourseCourseInstructors> instructors;
  final List<AdminGetCourseCourseAdminSections> adminSections;
  AdminGetCourseCourse.fromJson(dynamic json):
  
  id = nativeFromJson<String>(json['id']),
  title = nativeFromJson<String>(json['title']),
  description = json['description'] == null ? null : nativeFromJson<String>(json['description']),
  price = nativeFromJson<int>(json['price']),
  status = courseStatusDeserializer(json['status']),
  language = nativeFromJson<String>(json['language']),
  level = courseLevelDeserializer(json['level']),
  thumbnail = json['thumbnail'] == null ? null : nativeFromJson<String>(json['thumbnail']),
  tags = (json['tags'] as List<dynamic>)
        .map((e) => nativeFromJson<String>(e))
        .toList(),
  deletedAt = json['deletedAt'] == null ? null : Timestamp.fromJson(json['deletedAt']),
  createdAt = Timestamp.fromJson(json['createdAt']),
  updatedAt = Timestamp.fromJson(json['updatedAt']),
  category = AdminGetCourseCourseCategory.fromJson(json['category']),
  author = AdminGetCourseCourseAuthor.fromJson(json['author']),
  createdBy = AdminGetCourseCourseCreatedBy.fromJson(json['createdBy']),
  instructors = (json['instructors'] as List<dynamic>)
        .map((e) => AdminGetCourseCourseInstructors.fromJson(e))
        .toList(),
  adminSections = (json['adminSections'] as List<dynamic>)
        .map((e) => AdminGetCourseCourseAdminSections.fromJson(e))
        .toList();
  @override
  bool operator ==(Object other) {
    if(identical(this, other)) {
      return true;
    }
    if(other.runtimeType != runtimeType) {
      return false;
    }

    final AdminGetCourseCourse otherTyped = other as AdminGetCourseCourse;
    return id == otherTyped.id && 
    title == otherTyped.title && 
    description == otherTyped.description && 
    price == otherTyped.price && 
    status == otherTyped.status && 
    language == otherTyped.language && 
    level == otherTyped.level && 
    thumbnail == otherTyped.thumbnail && 
    tags == otherTyped.tags && 
    deletedAt == otherTyped.deletedAt && 
    createdAt == otherTyped.createdAt && 
    updatedAt == otherTyped.updatedAt && 
    category == otherTyped.category && 
    author == otherTyped.author && 
    createdBy == otherTyped.createdBy && 
    instructors == otherTyped.instructors && 
    adminSections == otherTyped.adminSections;
    
  }
  @override
  int get hashCode => Object.hashAll([id.hashCode, title.hashCode, description.hashCode, price.hashCode, status.hashCode, language.hashCode, level.hashCode, thumbnail.hashCode, tags.hashCode, deletedAt.hashCode, createdAt.hashCode, updatedAt.hashCode, category.hashCode, author.hashCode, createdBy.hashCode, instructors.hashCode, adminSections.hashCode]);
  

  Map<String, dynamic> toJson() {
    Map<String, dynamic> json = {};
    json['id'] = nativeToJson<String>(id);
    json['title'] = nativeToJson<String>(title);
    if (description != null) {
      json['description'] = nativeToJson<String?>(description);
    }
    json['price'] = nativeToJson<int>(price);
    json['status'] = 
    courseStatusSerializer(status)
    ;
    json['language'] = nativeToJson<String>(language);
    json['level'] = 
    courseLevelSerializer(level)
    ;
    if (thumbnail != null) {
      json['thumbnail'] = nativeToJson<String?>(thumbnail);
    }
    json['tags'] = tags.map((e) => nativeToJson<String>(e)).toList();
    if (deletedAt != null) {
      json['deletedAt'] = deletedAt!.toJson();
    }
    json['createdAt'] = createdAt.toJson();
    json['updatedAt'] = updatedAt.toJson();
    json['category'] = category.toJson();
    json['author'] = author.toJson();
    json['createdBy'] = createdBy.toJson();
    json['instructors'] = instructors.map((e) => e.toJson()).toList();
    json['adminSections'] = adminSections.map((e) => e.toJson()).toList();
    return json;
  }

  AdminGetCourseCourse({
    required this.id,
    required this.title,
    this.description,
    required this.price,
    required this.status,
    required this.language,
    required this.level,
    this.thumbnail,
    required this.tags,
    this.deletedAt,
    required this.createdAt,
    required this.updatedAt,
    required this.category,
    required this.author,
    required this.createdBy,
    required this.instructors,
    required this.adminSections,
  });
}

@immutable
class AdminGetCourseCourseCategory {
  final String id;
  final String name;
  AdminGetCourseCourseCategory.fromJson(dynamic json):
  
  id = nativeFromJson<String>(json['id']),
  name = nativeFromJson<String>(json['name']);
  @override
  bool operator ==(Object other) {
    if(identical(this, other)) {
      return true;
    }
    if(other.runtimeType != runtimeType) {
      return false;
    }

    final AdminGetCourseCourseCategory otherTyped = other as AdminGetCourseCourseCategory;
    return id == otherTyped.id && 
    name == otherTyped.name;
    
  }
  @override
  int get hashCode => Object.hashAll([id.hashCode, name.hashCode]);
  

  Map<String, dynamic> toJson() {
    Map<String, dynamic> json = {};
    json['id'] = nativeToJson<String>(id);
    json['name'] = nativeToJson<String>(name);
    return json;
  }

  AdminGetCourseCourseCategory({
    required this.id,
    required this.name,
  });
}

@immutable
class AdminGetCourseCourseAuthor {
  final String id;
  final String name;
  final String email;
  final String? avatar;
  AdminGetCourseCourseAuthor.fromJson(dynamic json):
  
  id = nativeFromJson<String>(json['id']),
  name = nativeFromJson<String>(json['name']),
  email = nativeFromJson<String>(json['email']),
  avatar = json['avatar'] == null ? null : nativeFromJson<String>(json['avatar']);
  @override
  bool operator ==(Object other) {
    if(identical(this, other)) {
      return true;
    }
    if(other.runtimeType != runtimeType) {
      return false;
    }

    final AdminGetCourseCourseAuthor otherTyped = other as AdminGetCourseCourseAuthor;
    return id == otherTyped.id && 
    name == otherTyped.name && 
    email == otherTyped.email && 
    avatar == otherTyped.avatar;
    
  }
  @override
  int get hashCode => Object.hashAll([id.hashCode, name.hashCode, email.hashCode, avatar.hashCode]);
  

  Map<String, dynamic> toJson() {
    Map<String, dynamic> json = {};
    json['id'] = nativeToJson<String>(id);
    json['name'] = nativeToJson<String>(name);
    json['email'] = nativeToJson<String>(email);
    if (avatar != null) {
      json['avatar'] = nativeToJson<String?>(avatar);
    }
    return json;
  }

  AdminGetCourseCourseAuthor({
    required this.id,
    required this.name,
    required this.email,
    this.avatar,
  });
}

@immutable
class AdminGetCourseCourseCreatedBy {
  final String id;
  final String name;
  AdminGetCourseCourseCreatedBy.fromJson(dynamic json):
  
  id = nativeFromJson<String>(json['id']),
  name = nativeFromJson<String>(json['name']);
  @override
  bool operator ==(Object other) {
    if(identical(this, other)) {
      return true;
    }
    if(other.runtimeType != runtimeType) {
      return false;
    }

    final AdminGetCourseCourseCreatedBy otherTyped = other as AdminGetCourseCourseCreatedBy;
    return id == otherTyped.id && 
    name == otherTyped.name;
    
  }
  @override
  int get hashCode => Object.hashAll([id.hashCode, name.hashCode]);
  

  Map<String, dynamic> toJson() {
    Map<String, dynamic> json = {};
    json['id'] = nativeToJson<String>(id);
    json['name'] = nativeToJson<String>(name);
    return json;
  }

  AdminGetCourseCourseCreatedBy({
    required this.id,
    required this.name,
  });
}

@immutable
class AdminGetCourseCourseInstructors {
  final AdminGetCourseCourseInstructorsUser user;
  AdminGetCourseCourseInstructors.fromJson(dynamic json):
  
  user = AdminGetCourseCourseInstructorsUser.fromJson(json['user']);
  @override
  bool operator ==(Object other) {
    if(identical(this, other)) {
      return true;
    }
    if(other.runtimeType != runtimeType) {
      return false;
    }

    final AdminGetCourseCourseInstructors otherTyped = other as AdminGetCourseCourseInstructors;
    return user == otherTyped.user;
    
  }
  @override
  int get hashCode => user.hashCode;
  

  Map<String, dynamic> toJson() {
    Map<String, dynamic> json = {};
    json['user'] = user.toJson();
    return json;
  }

  AdminGetCourseCourseInstructors({
    required this.user,
  });
}

@immutable
class AdminGetCourseCourseInstructorsUser {
  final String id;
  final String name;
  final String email;
  final String? avatar;
  AdminGetCourseCourseInstructorsUser.fromJson(dynamic json):
  
  id = nativeFromJson<String>(json['id']),
  name = nativeFromJson<String>(json['name']),
  email = nativeFromJson<String>(json['email']),
  avatar = json['avatar'] == null ? null : nativeFromJson<String>(json['avatar']);
  @override
  bool operator ==(Object other) {
    if(identical(this, other)) {
      return true;
    }
    if(other.runtimeType != runtimeType) {
      return false;
    }

    final AdminGetCourseCourseInstructorsUser otherTyped = other as AdminGetCourseCourseInstructorsUser;
    return id == otherTyped.id && 
    name == otherTyped.name && 
    email == otherTyped.email && 
    avatar == otherTyped.avatar;
    
  }
  @override
  int get hashCode => Object.hashAll([id.hashCode, name.hashCode, email.hashCode, avatar.hashCode]);
  

  Map<String, dynamic> toJson() {
    Map<String, dynamic> json = {};
    json['id'] = nativeToJson<String>(id);
    json['name'] = nativeToJson<String>(name);
    json['email'] = nativeToJson<String>(email);
    if (avatar != null) {
      json['avatar'] = nativeToJson<String?>(avatar);
    }
    return json;
  }

  AdminGetCourseCourseInstructorsUser({
    required this.id,
    required this.name,
    required this.email,
    this.avatar,
  });
}

@immutable
class AdminGetCourseCourseAdminSections {
  final String id;
  final String title;
  final int order;
  final List<AdminGetCourseCourseAdminSectionsAdminLectures> adminLectures;
  AdminGetCourseCourseAdminSections.fromJson(dynamic json):
  
  id = nativeFromJson<String>(json['id']),
  title = nativeFromJson<String>(json['title']),
  order = nativeFromJson<int>(json['order']),
  adminLectures = (json['adminLectures'] as List<dynamic>)
        .map((e) => AdminGetCourseCourseAdminSectionsAdminLectures.fromJson(e))
        .toList();
  @override
  bool operator ==(Object other) {
    if(identical(this, other)) {
      return true;
    }
    if(other.runtimeType != runtimeType) {
      return false;
    }

    final AdminGetCourseCourseAdminSections otherTyped = other as AdminGetCourseCourseAdminSections;
    return id == otherTyped.id && 
    title == otherTyped.title && 
    order == otherTyped.order && 
    adminLectures == otherTyped.adminLectures;
    
  }
  @override
  int get hashCode => Object.hashAll([id.hashCode, title.hashCode, order.hashCode, adminLectures.hashCode]);
  

  Map<String, dynamic> toJson() {
    Map<String, dynamic> json = {};
    json['id'] = nativeToJson<String>(id);
    json['title'] = nativeToJson<String>(title);
    json['order'] = nativeToJson<int>(order);
    json['adminLectures'] = adminLectures.map((e) => e.toJson()).toList();
    return json;
  }

  AdminGetCourseCourseAdminSections({
    required this.id,
    required this.title,
    required this.order,
    required this.adminLectures,
  });
}

@immutable
class AdminGetCourseCourseAdminSectionsAdminLectures {
  final String id;
  final String title;
  final EnumValue<LectureType> type;
  final String? videoUrl;
  final String? content;
  final int? duration;
  final String? transcriptUrl;
  final bool isFreePreview;
  final int order;
  AdminGetCourseCourseAdminSectionsAdminLectures.fromJson(dynamic json):
  
  id = nativeFromJson<String>(json['id']),
  title = nativeFromJson<String>(json['title']),
  type = lectureTypeDeserializer(json['type']),
  videoUrl = json['videoUrl'] == null ? null : nativeFromJson<String>(json['videoUrl']),
  content = json['content'] == null ? null : nativeFromJson<String>(json['content']),
  duration = json['duration'] == null ? null : nativeFromJson<int>(json['duration']),
  transcriptUrl = json['transcriptUrl'] == null ? null : nativeFromJson<String>(json['transcriptUrl']),
  isFreePreview = nativeFromJson<bool>(json['isFreePreview']),
  order = nativeFromJson<int>(json['order']);
  @override
  bool operator ==(Object other) {
    if(identical(this, other)) {
      return true;
    }
    if(other.runtimeType != runtimeType) {
      return false;
    }

    final AdminGetCourseCourseAdminSectionsAdminLectures otherTyped = other as AdminGetCourseCourseAdminSectionsAdminLectures;
    return id == otherTyped.id && 
    title == otherTyped.title && 
    type == otherTyped.type && 
    videoUrl == otherTyped.videoUrl && 
    content == otherTyped.content && 
    duration == otherTyped.duration && 
    transcriptUrl == otherTyped.transcriptUrl && 
    isFreePreview == otherTyped.isFreePreview && 
    order == otherTyped.order;
    
  }
  @override
  int get hashCode => Object.hashAll([id.hashCode, title.hashCode, type.hashCode, videoUrl.hashCode, content.hashCode, duration.hashCode, transcriptUrl.hashCode, isFreePreview.hashCode, order.hashCode]);
  

  Map<String, dynamic> toJson() {
    Map<String, dynamic> json = {};
    json['id'] = nativeToJson<String>(id);
    json['title'] = nativeToJson<String>(title);
    json['type'] = 
    lectureTypeSerializer(type)
    ;
    if (videoUrl != null) {
      json['videoUrl'] = nativeToJson<String?>(videoUrl);
    }
    if (content != null) {
      json['content'] = nativeToJson<String?>(content);
    }
    if (duration != null) {
      json['duration'] = nativeToJson<int?>(duration);
    }
    if (transcriptUrl != null) {
      json['transcriptUrl'] = nativeToJson<String?>(transcriptUrl);
    }
    json['isFreePreview'] = nativeToJson<bool>(isFreePreview);
    json['order'] = nativeToJson<int>(order);
    return json;
  }

  AdminGetCourseCourseAdminSectionsAdminLectures({
    required this.id,
    required this.title,
    required this.type,
    this.videoUrl,
    this.content,
    this.duration,
    this.transcriptUrl,
    required this.isFreePreview,
    required this.order,
  });
}

@immutable
class AdminGetCourseData {
  final AdminGetCourseCourse? course;
  AdminGetCourseData.fromJson(dynamic json):
  
  course = json['course'] == null ? null : AdminGetCourseCourse.fromJson(json['course']);
  @override
  bool operator ==(Object other) {
    if(identical(this, other)) {
      return true;
    }
    if(other.runtimeType != runtimeType) {
      return false;
    }

    final AdminGetCourseData otherTyped = other as AdminGetCourseData;
    return course == otherTyped.course;
    
  }
  @override
  int get hashCode => course.hashCode;
  

  Map<String, dynamic> toJson() {
    Map<String, dynamic> json = {};
    if (course != null) {
      json['course'] = course!.toJson();
    }
    return json;
  }

  AdminGetCourseData({
    this.course,
  });
}

@immutable
class AdminGetCourseVariables {
  final String courseId;
  @Deprecated('fromJson is deprecated for Variable classes as they are no longer required for deserialization.')
  AdminGetCourseVariables.fromJson(Map<String, dynamic> json):
  
  courseId = nativeFromJson<String>(json['courseId']);
  @override
  bool operator ==(Object other) {
    if(identical(this, other)) {
      return true;
    }
    if(other.runtimeType != runtimeType) {
      return false;
    }

    final AdminGetCourseVariables otherTyped = other as AdminGetCourseVariables;
    return courseId == otherTyped.courseId;
    
  }
  @override
  int get hashCode => courseId.hashCode;
  

  Map<String, dynamic> toJson() {
    Map<String, dynamic> json = {};
    json['courseId'] = nativeToJson<String>(courseId);
    return json;
  }

  AdminGetCourseVariables({
    required this.courseId,
  });
}

