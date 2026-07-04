part of 'generated.dart';

class UpsertCourseRatingVariablesBuilder {
  String courseId;
  int rating;
  Optional<String> _review = Optional.optional(nativeFromJson, nativeToJson);

  final FirebaseDataConnect _dataConnect;  UpsertCourseRatingVariablesBuilder review(String? t) {
   _review.value = t;
   return this;
  }

  UpsertCourseRatingVariablesBuilder(this._dataConnect, {required  this.courseId,required  this.rating,});
  Deserializer<UpsertCourseRatingData> dataDeserializer = (dynamic json)  => UpsertCourseRatingData.fromJson(jsonDecode(json));
  Serializer<UpsertCourseRatingVariables> varsSerializer = (UpsertCourseRatingVariables vars) => jsonEncode(vars.toJson());
  Future<OperationResult<UpsertCourseRatingData, UpsertCourseRatingVariables>> execute() {
    return ref().execute();
  }

  MutationRef<UpsertCourseRatingData, UpsertCourseRatingVariables> ref() {
    UpsertCourseRatingVariables vars= UpsertCourseRatingVariables(courseId: courseId,rating: rating,review: _review,);
    return _dataConnect.mutation("UpsertCourseRating", dataDeserializer, varsSerializer, vars);
  }
}

@immutable
class UpsertCourseRatingCourseRatingUpsert {
  final String userId;
  final String courseId;
  UpsertCourseRatingCourseRatingUpsert.fromJson(dynamic json):
  
  userId = nativeFromJson<String>(json['userId']),
  courseId = nativeFromJson<String>(json['courseId']);
  @override
  bool operator ==(Object other) {
    if(identical(this, other)) {
      return true;
    }
    if(other.runtimeType != runtimeType) {
      return false;
    }

    final UpsertCourseRatingCourseRatingUpsert otherTyped = other as UpsertCourseRatingCourseRatingUpsert;
    return userId == otherTyped.userId && 
    courseId == otherTyped.courseId;
    
  }
  @override
  int get hashCode => Object.hashAll([userId.hashCode, courseId.hashCode]);
  

  Map<String, dynamic> toJson() {
    Map<String, dynamic> json = {};
    json['userId'] = nativeToJson<String>(userId);
    json['courseId'] = nativeToJson<String>(courseId);
    return json;
  }

  UpsertCourseRatingCourseRatingUpsert({
    required this.userId,
    required this.courseId,
  });
}

@immutable
class UpsertCourseRatingData {
  final UpsertCourseRatingCourseRatingUpsert courseRating_upsert;
  UpsertCourseRatingData.fromJson(dynamic json):
  
  courseRating_upsert = UpsertCourseRatingCourseRatingUpsert.fromJson(json['courseRating_upsert']);
  @override
  bool operator ==(Object other) {
    if(identical(this, other)) {
      return true;
    }
    if(other.runtimeType != runtimeType) {
      return false;
    }

    final UpsertCourseRatingData otherTyped = other as UpsertCourseRatingData;
    return courseRating_upsert == otherTyped.courseRating_upsert;
    
  }
  @override
  int get hashCode => courseRating_upsert.hashCode;
  

  Map<String, dynamic> toJson() {
    Map<String, dynamic> json = {};
    json['courseRating_upsert'] = courseRating_upsert.toJson();
    return json;
  }

  UpsertCourseRatingData({
    required this.courseRating_upsert,
  });
}

@immutable
class UpsertCourseRatingVariables {
  final String courseId;
  final int rating;
  late final Optional<String>review;
  @Deprecated('fromJson is deprecated for Variable classes as they are no longer required for deserialization.')
  UpsertCourseRatingVariables.fromJson(Map<String, dynamic> json):
  
  courseId = nativeFromJson<String>(json['courseId']),
  rating = nativeFromJson<int>(json['rating']) {
  
  
  
  
    review = Optional.optional(nativeFromJson, nativeToJson);
    review.value = json['review'] == null ? null : nativeFromJson<String>(json['review']);
  
  }
  @override
  bool operator ==(Object other) {
    if(identical(this, other)) {
      return true;
    }
    if(other.runtimeType != runtimeType) {
      return false;
    }

    final UpsertCourseRatingVariables otherTyped = other as UpsertCourseRatingVariables;
    return courseId == otherTyped.courseId && 
    rating == otherTyped.rating && 
    review == otherTyped.review;
    
  }
  @override
  int get hashCode => Object.hashAll([courseId.hashCode, rating.hashCode, review.hashCode]);
  

  Map<String, dynamic> toJson() {
    Map<String, dynamic> json = {};
    json['courseId'] = nativeToJson<String>(courseId);
    json['rating'] = nativeToJson<int>(rating);
    if(review.state == OptionalState.set) {
      json['review'] = review.toJson();
    }
    return json;
  }

  UpsertCourseRatingVariables({
    required this.courseId,
    required this.rating,
    required this.review,
  });
}

