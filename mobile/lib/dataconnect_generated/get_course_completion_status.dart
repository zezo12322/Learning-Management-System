part of 'generated.dart';

class GetCourseCompletionStatusVariablesBuilder {
  String courseId;

  final FirebaseDataConnect _dataConnect;
  GetCourseCompletionStatusVariablesBuilder(this._dataConnect, {required  this.courseId,});
  Deserializer<GetCourseCompletionStatusData> dataDeserializer = (dynamic json)  => GetCourseCompletionStatusData.fromJson(jsonDecode(json));
  Serializer<GetCourseCompletionStatusVariables> varsSerializer = (GetCourseCompletionStatusVariables vars) => jsonEncode(vars.toJson());
  Future<QueryResult<GetCourseCompletionStatusData, GetCourseCompletionStatusVariables>> execute({QueryFetchPolicy fetchPolicy = QueryFetchPolicy.preferCache}) {
    return ref().execute(fetchPolicy: fetchPolicy);
  }

  QueryRef<GetCourseCompletionStatusData, GetCourseCompletionStatusVariables> ref() {
    GetCourseCompletionStatusVariables vars= GetCourseCompletionStatusVariables(courseId: courseId,);
    return _dataConnect.query("GetCourseCompletionStatus", dataDeserializer, varsSerializer, vars);
  }
}

@immutable
class GetCourseCompletionStatusSections {
  final List<GetCourseCompletionStatusSectionsCompletionLectures> completionLectures;
  GetCourseCompletionStatusSections.fromJson(dynamic json):
  
  completionLectures = (json['completionLectures'] as List<dynamic>)
        .map((e) => GetCourseCompletionStatusSectionsCompletionLectures.fromJson(e))
        .toList();
  @override
  bool operator ==(Object other) {
    if(identical(this, other)) {
      return true;
    }
    if(other.runtimeType != runtimeType) {
      return false;
    }

    final GetCourseCompletionStatusSections otherTyped = other as GetCourseCompletionStatusSections;
    return completionLectures == otherTyped.completionLectures;
    
  }
  @override
  int get hashCode => completionLectures.hashCode;
  

  Map<String, dynamic> toJson() {
    Map<String, dynamic> json = {};
    json['completionLectures'] = completionLectures.map((e) => e.toJson()).toList();
    return json;
  }

  GetCourseCompletionStatusSections({
    required this.completionLectures,
  });
}

@immutable
class GetCourseCompletionStatusSectionsCompletionLectures {
  final String id;
  final List<GetCourseCompletionStatusSectionsCompletionLecturesCompletionProgress> completionProgress;
  GetCourseCompletionStatusSectionsCompletionLectures.fromJson(dynamic json):
  
  id = nativeFromJson<String>(json['id']),
  completionProgress = (json['completionProgress'] as List<dynamic>)
        .map((e) => GetCourseCompletionStatusSectionsCompletionLecturesCompletionProgress.fromJson(e))
        .toList();
  @override
  bool operator ==(Object other) {
    if(identical(this, other)) {
      return true;
    }
    if(other.runtimeType != runtimeType) {
      return false;
    }

    final GetCourseCompletionStatusSectionsCompletionLectures otherTyped = other as GetCourseCompletionStatusSectionsCompletionLectures;
    return id == otherTyped.id && 
    completionProgress == otherTyped.completionProgress;
    
  }
  @override
  int get hashCode => Object.hashAll([id.hashCode, completionProgress.hashCode]);
  

  Map<String, dynamic> toJson() {
    Map<String, dynamic> json = {};
    json['id'] = nativeToJson<String>(id);
    json['completionProgress'] = completionProgress.map((e) => e.toJson()).toList();
    return json;
  }

  GetCourseCompletionStatusSectionsCompletionLectures({
    required this.id,
    required this.completionProgress,
  });
}

@immutable
class GetCourseCompletionStatusSectionsCompletionLecturesCompletionProgress {
  final Timestamp? completedAt;
  GetCourseCompletionStatusSectionsCompletionLecturesCompletionProgress.fromJson(dynamic json):
  
  completedAt = json['completedAt'] == null ? null : Timestamp.fromJson(json['completedAt']);
  @override
  bool operator ==(Object other) {
    if(identical(this, other)) {
      return true;
    }
    if(other.runtimeType != runtimeType) {
      return false;
    }

    final GetCourseCompletionStatusSectionsCompletionLecturesCompletionProgress otherTyped = other as GetCourseCompletionStatusSectionsCompletionLecturesCompletionProgress;
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

  GetCourseCompletionStatusSectionsCompletionLecturesCompletionProgress({
    this.completedAt,
  });
}

@immutable
class GetCourseCompletionStatusData {
  final List<GetCourseCompletionStatusSections> sections;
  GetCourseCompletionStatusData.fromJson(dynamic json):
  
  sections = (json['sections'] as List<dynamic>)
        .map((e) => GetCourseCompletionStatusSections.fromJson(e))
        .toList();
  @override
  bool operator ==(Object other) {
    if(identical(this, other)) {
      return true;
    }
    if(other.runtimeType != runtimeType) {
      return false;
    }

    final GetCourseCompletionStatusData otherTyped = other as GetCourseCompletionStatusData;
    return sections == otherTyped.sections;
    
  }
  @override
  int get hashCode => sections.hashCode;
  

  Map<String, dynamic> toJson() {
    Map<String, dynamic> json = {};
    json['sections'] = sections.map((e) => e.toJson()).toList();
    return json;
  }

  GetCourseCompletionStatusData({
    required this.sections,
  });
}

@immutable
class GetCourseCompletionStatusVariables {
  final String courseId;
  @Deprecated('fromJson is deprecated for Variable classes as they are no longer required for deserialization.')
  GetCourseCompletionStatusVariables.fromJson(Map<String, dynamic> json):
  
  courseId = nativeFromJson<String>(json['courseId']);
  @override
  bool operator ==(Object other) {
    if(identical(this, other)) {
      return true;
    }
    if(other.runtimeType != runtimeType) {
      return false;
    }

    final GetCourseCompletionStatusVariables otherTyped = other as GetCourseCompletionStatusVariables;
    return courseId == otherTyped.courseId;
    
  }
  @override
  int get hashCode => courseId.hashCode;
  

  Map<String, dynamic> toJson() {
    Map<String, dynamic> json = {};
    json['courseId'] = nativeToJson<String>(courseId);
    return json;
  }

  GetCourseCompletionStatusVariables({
    required this.courseId,
  });
}

