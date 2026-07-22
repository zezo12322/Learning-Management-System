part of 'generated.dart';

class GetCourseRatingsForSummaryVariablesBuilder {
  String courseId;

  final FirebaseDataConnect _dataConnect;
  GetCourseRatingsForSummaryVariablesBuilder(this._dataConnect, {required  this.courseId,});
  Deserializer<GetCourseRatingsForSummaryData> dataDeserializer = (dynamic json)  => GetCourseRatingsForSummaryData.fromJson(jsonDecode(json));
  Serializer<GetCourseRatingsForSummaryVariables> varsSerializer = (GetCourseRatingsForSummaryVariables vars) => jsonEncode(vars.toJson());
  Future<QueryResult<GetCourseRatingsForSummaryData, GetCourseRatingsForSummaryVariables>> execute({QueryFetchPolicy fetchPolicy = QueryFetchPolicy.preferCache}) {
    return ref().execute(fetchPolicy: fetchPolicy);
  }

  QueryRef<GetCourseRatingsForSummaryData, GetCourseRatingsForSummaryVariables> ref() {
    GetCourseRatingsForSummaryVariables vars= GetCourseRatingsForSummaryVariables(courseId: courseId,);
    return _dataConnect.query("GetCourseRatingsForSummary", dataDeserializer, varsSerializer, vars);
  }
}

@immutable
class GetCourseRatingsForSummaryCourseRatings {
  final int rating;
  GetCourseRatingsForSummaryCourseRatings.fromJson(dynamic json):
  
  rating = nativeFromJson<int>(json['rating']);
  @override
  bool operator ==(Object other) {
    if(identical(this, other)) {
      return true;
    }
    if(other.runtimeType != runtimeType) {
      return false;
    }

    final GetCourseRatingsForSummaryCourseRatings otherTyped = other as GetCourseRatingsForSummaryCourseRatings;
    return rating == otherTyped.rating;
    
  }
  @override
  int get hashCode => rating.hashCode;
  

  Map<String, dynamic> toJson() {
    Map<String, dynamic> json = {};
    json['rating'] = nativeToJson<int>(rating);
    return json;
  }

  GetCourseRatingsForSummaryCourseRatings({
    required this.rating,
  });
}

@immutable
class GetCourseRatingsForSummaryData {
  final List<GetCourseRatingsForSummaryCourseRatings> courseRatings;
  GetCourseRatingsForSummaryData.fromJson(dynamic json):
  
  courseRatings = (json['courseRatings'] as List<dynamic>)
        .map((e) => GetCourseRatingsForSummaryCourseRatings.fromJson(e))
        .toList();
  @override
  bool operator ==(Object other) {
    if(identical(this, other)) {
      return true;
    }
    if(other.runtimeType != runtimeType) {
      return false;
    }

    final GetCourseRatingsForSummaryData otherTyped = other as GetCourseRatingsForSummaryData;
    return courseRatings == otherTyped.courseRatings;
    
  }
  @override
  int get hashCode => courseRatings.hashCode;
  

  Map<String, dynamic> toJson() {
    Map<String, dynamic> json = {};
    json['courseRatings'] = courseRatings.map((e) => e.toJson()).toList();
    return json;
  }

  GetCourseRatingsForSummaryData({
    required this.courseRatings,
  });
}

@immutable
class GetCourseRatingsForSummaryVariables {
  final String courseId;
  @Deprecated('fromJson is deprecated for Variable classes as they are no longer required for deserialization.')
  GetCourseRatingsForSummaryVariables.fromJson(Map<String, dynamic> json):
  
  courseId = nativeFromJson<String>(json['courseId']);
  @override
  bool operator ==(Object other) {
    if(identical(this, other)) {
      return true;
    }
    if(other.runtimeType != runtimeType) {
      return false;
    }

    final GetCourseRatingsForSummaryVariables otherTyped = other as GetCourseRatingsForSummaryVariables;
    return courseId == otherTyped.courseId;
    
  }
  @override
  int get hashCode => courseId.hashCode;
  

  Map<String, dynamic> toJson() {
    Map<String, dynamic> json = {};
    json['courseId'] = nativeToJson<String>(courseId);
    return json;
  }

  GetCourseRatingsForSummaryVariables({
    required this.courseId,
  });
}

