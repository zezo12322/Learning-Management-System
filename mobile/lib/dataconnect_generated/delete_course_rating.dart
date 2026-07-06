part of 'generated.dart';

class DeleteCourseRatingVariablesBuilder {
  String courseId;

  final FirebaseDataConnect _dataConnect;
  DeleteCourseRatingVariablesBuilder(this._dataConnect, {required  this.courseId,});
  Deserializer<DeleteCourseRatingData> dataDeserializer = (dynamic json)  => DeleteCourseRatingData.fromJson(jsonDecode(json));
  Serializer<DeleteCourseRatingVariables> varsSerializer = (DeleteCourseRatingVariables vars) => jsonEncode(vars.toJson());
  Future<OperationResult<DeleteCourseRatingData, DeleteCourseRatingVariables>> execute() {
    return ref().execute();
  }

  MutationRef<DeleteCourseRatingData, DeleteCourseRatingVariables> ref() {
    DeleteCourseRatingVariables vars= DeleteCourseRatingVariables(courseId: courseId,);
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
  @Deprecated('fromJson is deprecated for Variable classes as they are no longer required for deserialization.')
  DeleteCourseRatingVariables.fromJson(Map<String, dynamic> json):
  
  courseId = nativeFromJson<String>(json['courseId']);
  @override
  bool operator ==(Object other) {
    if(identical(this, other)) {
      return true;
    }
    if(other.runtimeType != runtimeType) {
      return false;
    }

    final DeleteCourseRatingVariables otherTyped = other as DeleteCourseRatingVariables;
    return courseId == otherTyped.courseId;
    
  }
  @override
  int get hashCode => courseId.hashCode;
  

  Map<String, dynamic> toJson() {
    Map<String, dynamic> json = {};
    json['courseId'] = nativeToJson<String>(courseId);
    return json;
  }

  DeleteCourseRatingVariables({
    required this.courseId,
  });
}

