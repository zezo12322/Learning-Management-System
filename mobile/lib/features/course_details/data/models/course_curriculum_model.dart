import 'package:optimatech_lms/features/course_details/domain/entities/course_curriculum_entity.dart';

class CourseCurriculumModel extends CourseCurriculumEntity {
  const CourseCurriculumModel({
    required super.courseId,
    required super.sections,
  });

  factory CourseCurriculumModel.fromConnectorResult(dynamic json, String courseId) {
    if (json == null) {
      return CourseCurriculumModel(courseId: courseId, sections: const []);
    }

    final sectionsList = json['sections'] as List<dynamic>? ?? [];
    return CourseCurriculumModel(
      courseId: courseId,
      sections: sectionsList
          .map((s) => CourseSectionModel.fromConnectorResult(s))
          .toList(),
    );
  }
}

class CourseSectionModel extends CourseSectionEntity {
  const CourseSectionModel({
    required super.id,
    required super.title,
    required super.lessons,
  });

  factory CourseSectionModel.fromConnectorResult(dynamic json) {
    if (json == null) {
      return const CourseSectionModel(id: '', title: '', lessons: []);
    }

    final lessonsList = json['lessons'] as List<dynamic>? ?? [];
    return CourseSectionModel(
      id: json['id']?.toString() ?? '',
      title: json['title']?.toString() ?? '',
      lessons: lessonsList
          .map((l) => CourseLessonModel.fromConnectorResult(l))
          .toList(),
    );
  }
}

class CourseLessonModel extends CourseLessonEntity {
  const CourseLessonModel({
    required super.id,
    required super.number,
    required super.title,
    required super.duration,
    super.videoUrl,
    required super.status,
  });

  factory CourseLessonModel.fromConnectorResult(dynamic json) {
    if (json == null) {
      return const CourseLessonModel(
        id: '',
        number: 0,
        title: '',
        duration: '',
        status: LessonStatus.locked,
      );
    }

    LessonStatus parsedStatus;
    switch (json['status']?.toString().toLowerCase()) {
      case 'completed':
        parsedStatus = LessonStatus.completed;
        break;
      case 'active':
        parsedStatus = LessonStatus.active;
        break;
      default:
        parsedStatus = LessonStatus.locked;
    }

    return CourseLessonModel(
      id: json['id']?.toString() ?? '',
      number: int.tryParse(json['number']?.toString() ?? '0') ?? 0,
      title: json['title']?.toString() ?? '',
      duration: json['duration']?.toString() ?? '',
      videoUrl: json['videoUrl']?.toString(),
      status: parsedStatus,
    );
  }
}
