part of 'generated.dart';

class AdminUpdateCourseRatingAggregateVariablesBuilder {
  String courseId;
  double avgRating;
  int ratingCount;

  final FirebaseDataConnect _dataConnect;
  AdminUpdateCourseRatingAggregateVariablesBuilder(this._dataConnect, {required  this.courseId,required  this.avgRating,required  this.ratingCount,});
  Deserializer<AdminUpdateCourseRatingAggregateData> dataDeserializer = (dynamic json)  => AdminUpdateCourseRatingAggregateData.fromJson(jsonDecode(json));
  Serializer<AdminUpdateCourseRatingAggregateVariables> varsSerializer = (AdminUpdateCourseRatingAggregateVariables vars) => jsonEncode(vars.toJson());
  Future<OperationResult<AdminUpdateCourseRatingAggregateData, AdminUpdateCourseRatingAggregateVariables>> execute() {
    return ref().execute();
  }

  MutationRef<AdminUpdateCourseRatingAggregateData, AdminUpdateCourseRatingAggregateVariables> ref() {
    AdminUpdateCourseRatingAggregateVariables vars= AdminUpdateCourseRatingAggregateVariables(courseId: courseId,avgRating: avgRating,ratingCount: ratingCount,);
    return _dataConnect.mutation("AdminUpdateCourseRatingAggregate", dataDeserializer, varsSerializer, vars);
  }
}

@immutable
class AdminUpdateCourseRatingAggregateCourseUpdate {
  final String id;
  AdminUpdateCourseRatingAggregateCourseUpdate.fromJson(dynamic json):
  
  id = nativeFromJson<String>(json['id']);
  @override
  bool operator ==(Object other) {
    if(identical(this, other)) {
      return true;
    }
    if(other.runtimeType != runtimeType) {
      return false;
    }

    final AdminUpdateCourseRatingAggregateCourseUpdate otherTyped = other as AdminUpdateCourseRatingAggregateCourseUpdate;
    return id == otherTyped.id;
    
  }
  @override
  int get hashCode => id.hashCode;
  

  Map<String, dynamic> toJson() {
    Map<String, dynamic> json = {};
    json['id'] = nativeToJson<String>(id);
    return json;
  }

  AdminUpdateCourseRatingAggregateCourseUpdate({
    required this.id,
  });
}

@immutable
class AdminUpdateCourseRatingAggregateData {
  final AdminUpdateCourseRatingAggregateCourseUpdate? course_update;
  AdminUpdateCourseRatingAggregateData.fromJson(dynamic json):
  
  course_update = json['course_update'] == null ? null : AdminUpdateCourseRatingAggregateCourseUpdate.fromJson(json['course_update']);
  @override
  bool operator ==(Object other) {
    if(identical(this, other)) {
      return true;
    }
    if(other.runtimeType != runtimeType) {
      return false;
    }

    final AdminUpdateCourseRatingAggregateData otherTyped = other as AdminUpdateCourseRatingAggregateData;
    return course_update == otherTyped.course_update;
    
  }
  @override
  int get hashCode => course_update.hashCode;
  

  Map<String, dynamic> toJson() {
    Map<String, dynamic> json = {};
    if (course_update != null) {
      json['course_update'] = course_update!.toJson();
    }
    return json;
  }

  AdminUpdateCourseRatingAggregateData({
    this.course_update,
  });
}

@immutable
class AdminUpdateCourseRatingAggregateVariables {
  final String courseId;
  final double avgRating;
  final int ratingCount;
  @Deprecated('fromJson is deprecated for Variable classes as they are no longer required for deserialization.')
  AdminUpdateCourseRatingAggregateVariables.fromJson(Map<String, dynamic> json):
  
  courseId = nativeFromJson<String>(json['courseId']),
  avgRating = nativeFromJson<double>(json['avgRating']),
  ratingCount = nativeFromJson<int>(json['ratingCount']);
  @override
  bool operator ==(Object other) {
    if(identical(this, other)) {
      return true;
    }
    if(other.runtimeType != runtimeType) {
      return false;
    }

    final AdminUpdateCourseRatingAggregateVariables otherTyped = other as AdminUpdateCourseRatingAggregateVariables;
    return courseId == otherTyped.courseId && 
    avgRating == otherTyped.avgRating && 
    ratingCount == otherTyped.ratingCount;
    
  }
  @override
  int get hashCode => Object.hashAll([courseId.hashCode, avgRating.hashCode, ratingCount.hashCode]);
  

  Map<String, dynamic> toJson() {
    Map<String, dynamic> json = {};
    json['courseId'] = nativeToJson<String>(courseId);
    json['avgRating'] = nativeToJson<double>(avgRating);
    json['ratingCount'] = nativeToJson<int>(ratingCount);
    return json;
  }

  AdminUpdateCourseRatingAggregateVariables({
    required this.courseId,
    required this.avgRating,
    required this.ratingCount,
  });
}

