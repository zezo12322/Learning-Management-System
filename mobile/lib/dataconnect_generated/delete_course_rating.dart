part of 'generated.dart';

class DeleteCourseRatingVariablesBuilder {
  String courseId;
  String userId;

  final FirebaseDataConnect _dataConnect;
  DeleteCourseRatingVariablesBuilder(this._dataConnect, {required  this.courseId,required  this.userId,});
  Deserializer<DeleteCourseRatingData> dataDeserializer = (dynamic json)  => DeleteCourseRatingData.fromJson(jsonDecode(json));
  Serializer<DeleteCourseRatingVariables> varsSerializer = (DeleteCourseRatingVariables vars) => jsonEncode(vars.toJson());
  Future<OperationResult<DeleteCourseRatingData, DeleteCourseRatingVariables>> execute() {
    return ref().execute();
  }

  MutationRef<DeleteCourseRatingData, DeleteCourseRatingVariables> ref() {
    DeleteCourseRatingVariables vars= DeleteCourseRatingVariables(courseId: courseId,userId: userId,);
    return _dataConnect.mutation("DeleteCourseRating", dataDeserializer, varsSerializer, vars);
  }
}

@immutable
class DeleteCourseRatingData {
  final int courseRating_deleteMany;
  DeleteCourseRatingData.fromJson(dynamic json):
  
  courseRating_deleteMany = nativeFromJson<int>(json['courseRating_deleteMany']);
  @override
  bool operator ==(Object other) {
    if(identical(this, other)) {
      return true;
    }
    if(other.runtimeType != runtimeType) {
      return false;
    }

    final DeleteCourseRatingData otherTyped = other as DeleteCourseRatingData;
    return courseRating_deleteMany == otherTyped.courseRating_deleteMany;
    
  }
  @override
  int get hashCode => courseRating_deleteMany.hashCode;
  

  Map<String, dynamic> toJson() {
    Map<String, dynamic> json = {};
    json['courseRating_deleteMany'] = nativeToJson<int>(courseRating_deleteMany);
    return json;
  }

  DeleteCourseRatingData({
    required this.courseRating_deleteMany,
  });
}

@immutable
class DeleteCourseRatingVariables {
  final String courseId;
  final String userId;
  @Deprecated('fromJson is deprecated for Variable classes as they are no longer required for deserialization.')
  DeleteCourseRatingVariables.fromJson(Map<String, dynamic> json):
  
  courseId = nativeFromJson<String>(json['courseId']),
  userId = nativeFromJson<String>(json['userId']);
  @override
  bool operator ==(Object other) {
    if(identical(this, other)) {
      return true;
    }
    if(other.runtimeType != runtimeType) {
      return false;
    }

    final DeleteCourseRatingVariables otherTyped = other as DeleteCourseRatingVariables;
    return courseId == otherTyped.courseId && 
    userId == otherTyped.userId;
    
  }
  @override
  int get hashCode => Object.hashAll([courseId.hashCode, userId.hashCode]);
  

  Map<String, dynamic> toJson() {
    Map<String, dynamic> json = {};
    json['courseId'] = nativeToJson<String>(courseId);
    json['userId'] = nativeToJson<String>(userId);
    return json;
  }

  DeleteCourseRatingVariables({
    required this.courseId,
    required this.userId,
  });
}

