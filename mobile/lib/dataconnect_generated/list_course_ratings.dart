part of 'generated.dart';

class ListCourseRatingsVariablesBuilder {
  String courseId;
  Optional<int> _limit = Optional.optional(nativeFromJson, nativeToJson);
  Optional<int> _offset = Optional.optional(nativeFromJson, nativeToJson);

  final FirebaseDataConnect _dataConnect;  ListCourseRatingsVariablesBuilder limit(int? t) {
   _limit.value = t;
   return this;
  }
  ListCourseRatingsVariablesBuilder offset(int? t) {
   _offset.value = t;
   return this;
  }

  ListCourseRatingsVariablesBuilder(this._dataConnect, {required  this.courseId,});
  Deserializer<ListCourseRatingsData> dataDeserializer = (dynamic json)  => ListCourseRatingsData.fromJson(jsonDecode(json));
  Serializer<ListCourseRatingsVariables> varsSerializer = (ListCourseRatingsVariables vars) => jsonEncode(vars.toJson());
  Future<QueryResult<ListCourseRatingsData, ListCourseRatingsVariables>> execute({QueryFetchPolicy fetchPolicy = QueryFetchPolicy.preferCache}) {
    return ref().execute(fetchPolicy: fetchPolicy);
  }

  QueryRef<ListCourseRatingsData, ListCourseRatingsVariables> ref() {
    ListCourseRatingsVariables vars= ListCourseRatingsVariables(courseId: courseId,limit: _limit,offset: _offset,);
    return _dataConnect.query("ListCourseRatings", dataDeserializer, varsSerializer, vars);
  }
}

@immutable
class ListCourseRatingsCourseRatings {
  final int rating;
  final String? review;
  final Timestamp createdAt;
  final Timestamp updatedAt;
  final ListCourseRatingsCourseRatingsUser user;
  ListCourseRatingsCourseRatings.fromJson(dynamic json):
  
  rating = nativeFromJson<int>(json['rating']),
  review = json['review'] == null ? null : nativeFromJson<String>(json['review']),
  createdAt = Timestamp.fromJson(json['createdAt']),
  updatedAt = Timestamp.fromJson(json['updatedAt']),
  user = ListCourseRatingsCourseRatingsUser.fromJson(json['user']);
  @override
  bool operator ==(Object other) {
    if(identical(this, other)) {
      return true;
    }
    if(other.runtimeType != runtimeType) {
      return false;
    }

    final ListCourseRatingsCourseRatings otherTyped = other as ListCourseRatingsCourseRatings;
    return rating == otherTyped.rating && 
    review == otherTyped.review && 
    createdAt == otherTyped.createdAt && 
    updatedAt == otherTyped.updatedAt && 
    user == otherTyped.user;
    
  }
  @override
  int get hashCode => Object.hashAll([rating.hashCode, review.hashCode, createdAt.hashCode, updatedAt.hashCode, user.hashCode]);
  

  Map<String, dynamic> toJson() {
    Map<String, dynamic> json = {};
    json['rating'] = nativeToJson<int>(rating);
    if (review != null) {
      json['review'] = nativeToJson<String?>(review);
    }
    json['createdAt'] = createdAt.toJson();
    json['updatedAt'] = updatedAt.toJson();
    json['user'] = user.toJson();
    return json;
  }

  ListCourseRatingsCourseRatings({
    required this.rating,
    this.review,
    required this.createdAt,
    required this.updatedAt,
    required this.user,
  });
}

@immutable
class ListCourseRatingsCourseRatingsUser {
  final String name;
  final String? avatar;
  ListCourseRatingsCourseRatingsUser.fromJson(dynamic json):
  
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

    final ListCourseRatingsCourseRatingsUser otherTyped = other as ListCourseRatingsCourseRatingsUser;
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

  ListCourseRatingsCourseRatingsUser({
    required this.name,
    this.avatar,
  });
}

@immutable
class ListCourseRatingsData {
  final List<ListCourseRatingsCourseRatings> courseRatings;
  ListCourseRatingsData.fromJson(dynamic json):
  
  courseRatings = (json['courseRatings'] as List<dynamic>)
        .map((e) => ListCourseRatingsCourseRatings.fromJson(e))
        .toList();
  @override
  bool operator ==(Object other) {
    if(identical(this, other)) {
      return true;
    }
    if(other.runtimeType != runtimeType) {
      return false;
    }

    final ListCourseRatingsData otherTyped = other as ListCourseRatingsData;
    return courseRatings == otherTyped.courseRatings;
    
  }
  @override
  int get hashCode => courseRatings.hashCode;
  

  Map<String, dynamic> toJson() {
    Map<String, dynamic> json = {};
    json['courseRatings'] = courseRatings.map((e) => e.toJson()).toList();
    return json;
  }

  ListCourseRatingsData({
    required this.courseRatings,
  });
}

@immutable
class ListCourseRatingsVariables {
  final String courseId;
  late final Optional<int>limit;
  late final Optional<int>offset;
  @Deprecated('fromJson is deprecated for Variable classes as they are no longer required for deserialization.')
  ListCourseRatingsVariables.fromJson(Map<String, dynamic> json):
  
  courseId = nativeFromJson<String>(json['courseId']) {
  
  
  
    limit = Optional.optional(nativeFromJson, nativeToJson);
    limit.value = json['limit'] == null ? null : nativeFromJson<int>(json['limit']);
  
  
    offset = Optional.optional(nativeFromJson, nativeToJson);
    offset.value = json['offset'] == null ? null : nativeFromJson<int>(json['offset']);
  
  }
  @override
  bool operator ==(Object other) {
    if(identical(this, other)) {
      return true;
    }
    if(other.runtimeType != runtimeType) {
      return false;
    }

    final ListCourseRatingsVariables otherTyped = other as ListCourseRatingsVariables;
    return courseId == otherTyped.courseId && 
    limit == otherTyped.limit && 
    offset == otherTyped.offset;
    
  }
  @override
  int get hashCode => Object.hashAll([courseId.hashCode, limit.hashCode, offset.hashCode]);
  

  Map<String, dynamic> toJson() {
    Map<String, dynamic> json = {};
    json['courseId'] = nativeToJson<String>(courseId);
    if(limit.state == OptionalState.set) {
      json['limit'] = limit.toJson();
    }
    if(offset.state == OptionalState.set) {
      json['offset'] = offset.toJson();
    }
    return json;
  }

  ListCourseRatingsVariables({
    required this.courseId,
    required this.limit,
    required this.offset,
  });
}

