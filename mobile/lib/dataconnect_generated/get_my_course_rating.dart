part of 'generated.dart';

class GetMyCourseRatingVariablesBuilder {
  String courseId;

  final FirebaseDataConnect _dataConnect;
  GetMyCourseRatingVariablesBuilder(this._dataConnect, {required  this.courseId,});
  Deserializer<GetMyCourseRatingData> dataDeserializer = (dynamic json)  => GetMyCourseRatingData.fromJson(jsonDecode(json));
  Serializer<GetMyCourseRatingVariables> varsSerializer = (GetMyCourseRatingVariables vars) => jsonEncode(vars.toJson());
  Future<QueryResult<GetMyCourseRatingData, GetMyCourseRatingVariables>> execute({QueryFetchPolicy fetchPolicy = QueryFetchPolicy.preferCache}) {
    return ref().execute(fetchPolicy: fetchPolicy);
  }

  QueryRef<GetMyCourseRatingData, GetMyCourseRatingVariables> ref() {
    GetMyCourseRatingVariables vars= GetMyCourseRatingVariables(courseId: courseId,);
    return _dataConnect.query("GetMyCourseRating", dataDeserializer, varsSerializer, vars);
  }
}

@immutable
class GetMyCourseRatingCourseRatings {
  final int rating;
  final String? review;
  final Timestamp createdAt;
  final Timestamp updatedAt;
  GetMyCourseRatingCourseRatings.fromJson(dynamic json):
  
  rating = nativeFromJson<int>(json['rating']),
  review = json['review'] == null ? null : nativeFromJson<String>(json['review']),
  createdAt = Timestamp.fromJson(json['createdAt']),
  updatedAt = Timestamp.fromJson(json['updatedAt']);
  @override
  bool operator ==(Object other) {
    if(identical(this, other)) {
      return true;
    }
    if(other.runtimeType != runtimeType) {
      return false;
    }

    final GetMyCourseRatingCourseRatings otherTyped = other as GetMyCourseRatingCourseRatings;
    return rating == otherTyped.rating && 
    review == otherTyped.review && 
    createdAt == otherTyped.createdAt && 
    updatedAt == otherTyped.updatedAt;
    
  }
  @override
  int get hashCode => Object.hashAll([rating.hashCode, review.hashCode, createdAt.hashCode, updatedAt.hashCode]);
  

  Map<String, dynamic> toJson() {
    Map<String, dynamic> json = {};
    json['rating'] = nativeToJson<int>(rating);
    if (review != null) {
      json['review'] = nativeToJson<String?>(review);
    }
    json['createdAt'] = createdAt.toJson();
    json['updatedAt'] = updatedAt.toJson();
    return json;
  }

  GetMyCourseRatingCourseRatings({
    required this.rating,
    this.review,
    required this.createdAt,
    required this.updatedAt,
  });
}

@immutable
class GetMyCourseRatingData {
  final List<GetMyCourseRatingCourseRatings> courseRatings;
  GetMyCourseRatingData.fromJson(dynamic json):
  
  courseRatings = (json['courseRatings'] as List<dynamic>)
        .map((e) => GetMyCourseRatingCourseRatings.fromJson(e))
        .toList();
  @override
  bool operator ==(Object other) {
    if(identical(this, other)) {
      return true;
    }
    if(other.runtimeType != runtimeType) {
      return false;
    }

    final GetMyCourseRatingData otherTyped = other as GetMyCourseRatingData;
    return courseRatings == otherTyped.courseRatings;
    
  }
  @override
  int get hashCode => courseRatings.hashCode;
  

  Map<String, dynamic> toJson() {
    Map<String, dynamic> json = {};
    json['courseRatings'] = courseRatings.map((e) => e.toJson()).toList();
    return json;
  }

  GetMyCourseRatingData({
    required this.courseRatings,
  });
}

@immutable
class GetMyCourseRatingVariables {
  final String courseId;
  @Deprecated('fromJson is deprecated for Variable classes as they are no longer required for deserialization.')
  GetMyCourseRatingVariables.fromJson(Map<String, dynamic> json):
  
  courseId = nativeFromJson<String>(json['courseId']);
  @override
  bool operator ==(Object other) {
    if(identical(this, other)) {
      return true;
    }
    if(other.runtimeType != runtimeType) {
      return false;
    }

    final GetMyCourseRatingVariables otherTyped = other as GetMyCourseRatingVariables;
    return courseId == otherTyped.courseId;
    
  }
  @override
  int get hashCode => courseId.hashCode;
  

  Map<String, dynamic> toJson() {
    Map<String, dynamic> json = {};
    json['courseId'] = nativeToJson<String>(courseId);
    return json;
  }

  GetMyCourseRatingVariables({
    required this.courseId,
  });
}

