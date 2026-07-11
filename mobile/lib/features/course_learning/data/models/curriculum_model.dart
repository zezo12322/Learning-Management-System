import 'package:optimatech_lms/core/helper_function/lecture_type.dart';
import 'package:optimatech_lms/dataconnect_generated/generated.dart';
import 'package:optimatech_lms/features/course_learning/domain/entities/course_curriculum_entity.dart';

class CourseCurriculumModel {
  final String id;
  final String title;
  final String? description;
  final String language;
  final List<CurriculumSectionModel> sections;

  const CourseCurriculumModel({
    required this.id,
    required this.title,
    this.description,
    required this.language,
    required this.sections,
  });

  factory CourseCurriculumModel.fromConnectorResult(
      GetCourseCurriculumCourse result,
      ) {
    return CourseCurriculumModel(
      id: result.id,
      title: result.title,
      description: result.description,
      language: result.language,
      sections: result.publishedSections
          .map(CurriculumSectionModel.fromConnectorResult)
          .toList(),
    );
  }

  factory CourseCurriculumModel.fromJson(Map<String, dynamic> json) {
    return CourseCurriculumModel(
      id: json['id'] as String,
      title: json['title'] as String,
      description: json['description'] as String?,
      language: json['language'] as String,
      sections: (json['publishedSections'] as List<dynamic>)
          .map((e) => CurriculumSectionModel.fromJson(e as Map<String, dynamic>))
          .toList(),
    );
  }

  Map<String, dynamic> toJson() {
    return {
      'id': id,
      'title': title,
      'description': description,
      'language': language,
      'publishedSections': sections.map((e) => e.toJson()).toList(),
    };
  }

  CourseCurriculumEntity toEntity() {
    return CourseCurriculumEntity(
      id: id,
      title: title,
      description: description,
      language: language,
      sections: sections.map((e) => e.toEntity()).toList(),
    );
  }
}

class CurriculumSectionModel {
  final String id;
  final String title;
  final List<CurriculumLectureModel> lectures;

  const CurriculumSectionModel({
    required this.id,
    required this.title,
    required this.lectures,
  });

  factory CurriculumSectionModel.fromConnectorResult(
      GetCourseCurriculumCoursePublishedSections result,
      ) {
    return CurriculumSectionModel(
      id: result.id,
      title: result.title,
      lectures: result.publishedLectures
          .map(CurriculumLectureModel.fromConnectorResult)
          .toList(),
    );
  }

  factory CurriculumSectionModel.fromJson(Map<String, dynamic> json) {
    return CurriculumSectionModel(
      id: json['id'] as String,
      title: json['title'] as String,
      lectures: (json['publishedLectures'] as List<dynamic>)
          .map((e) => CurriculumLectureModel.fromJson(e as Map<String, dynamic>))
          .toList(),
    );
  }

  Map<String, dynamic> toJson() {
    return {
      'id': id,
      'title': title,
      'publishedLectures': lectures.map((e) => e.toJson()).toList(),
    };
  }

  CurriculumSectionEntity toEntity() {
    return CurriculumSectionEntity(
      id: id,
      title: title,
      lectures: lectures.map((e) => e.toEntity()).toList(),
    );
  }
}

class CurriculumLectureModel {
  final String id;
  final String title;
  final LectureContentType type;
  final String? content;
  final int? duration;
  final bool isFreePreview;

  const CurriculumLectureModel({
    required this.id,
    required this.title,
    required this.type,
    this.content,
    this.duration,
    required this.isFreePreview,
  });

  factory CurriculumLectureModel.fromConnectorResult(
      GetCourseCurriculumCoursePublishedSectionsPublishedLectures result,
      ) {
    return CurriculumLectureModel(
      id: result.id,
      title: result.title,
      type: LectureContentType.fromRaw(result.type.stringValue),
      content: result.content,
      duration: result.duration,
      isFreePreview: result.isFreePreview,
    );
  }

  factory CurriculumLectureModel.fromJson(Map<String, dynamic> json) {
    return CurriculumLectureModel(
      id: json['id'] as String,
      title: json['title'] as String,
      type: LectureContentType.fromRaw(json['type'] as String),
      content: json['content'] as String?,
      duration: json['duration'] as int?,
      isFreePreview: json['isFreePreview'] as bool,
    );
  }

  Map<String, dynamic> toJson() {
    return {
      'id': id,
      'title': title,
      'type': type.raw,
      'content': content,
      'duration': duration,
      'isFreePreview': isFreePreview,
    };
  }

  CurriculumLectureEntity toEntity() {
    return CurriculumLectureEntity(
      id: id,
      title: title,
      type: type,
      content: content,
      durationMinutes: duration,
      isFreePreview: isFreePreview,
    );
  }
}