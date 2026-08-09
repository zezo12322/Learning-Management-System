import 'package:optimatech_lms/features/course_details/domain/entities/course_curriculum_entity.dart';

class CourseCurriculumModel extends CourseCurriculumEntity {
  const CourseCurriculumModel({
    required super.courseId,
    super.description,
    super.language,
    required super.sections,
  });

  factory CourseCurriculumModel.fromJson(dynamic json, String courseId) {
    if (json == null) {
      return CourseCurriculumModel(courseId: courseId, sections: const []);
    }

    final sectionsList = json['publishedSections'] as List<dynamic>? ??
        json['sections'] as List<dynamic>? ??
        [];

    // Lessons are numbered across the whole course, not per section, so the
    // counter has to run outside the section loop. The API returns sections and
    // lectures already ordered by `order`, so index order is the real order.
    var lessonNumber = 0;
    final sections = <CourseSectionModel>[];
    for (final s in sectionsList) {
      final section = CourseSectionModel.fromJson(s, startNumber: lessonNumber);
      lessonNumber += section.lessons.length;
      sections.add(section);
    }

    return CourseCurriculumModel(
      courseId: courseId,
      description: json['description']?.toString(),
      language: json['language']?.toString(),
      sections: sections,
    );
  }
}

class CourseSectionModel extends CourseSectionEntity {
  const CourseSectionModel({
    required super.id,
    required super.title,
    required super.lessons,
  });

  factory CourseSectionModel.fromJson(dynamic json, {int startNumber = 0}) {
    if (json == null) {
      return const CourseSectionModel(id: '', title: '', lessons: []);
    }

    final lessonsList = json['publishedLectures'] as List<dynamic>? ??
        json['lessons'] as List<dynamic>? ??
        [];

    return CourseSectionModel(
      id: json['id']?.toString() ?? '',
      title: json['title']?.toString() ?? '',
      lessons: [
        for (var i = 0; i < lessonsList.length; i++)
          CourseLessonModel.fromJson(lessonsList[i], number: startNumber + i + 1),
      ],
    );
  }
}

class CourseLessonModel extends CourseLessonEntity {
  const CourseLessonModel({
    required super.id,
    required super.number,
    required super.title,
    required super.durationMinutes,
    super.videoUrl,
    super.isFreePreview,
    required super.status,
  });

  factory CourseLessonModel.fromJson(dynamic json, {int number = 0}) {
    if (json == null) {
      return const CourseLessonModel(
        id: '',
        number: 0,
        title: '',
        durationMinutes: 0,
        status: LessonStatus.locked,
      );
    }

    final isFreePreview = json['isFreePreview'] == true;

    // `GET /catalog/courses/:id/curriculum` returns no per-lesson progress or
    // lock flag, so the only entitlement signal available here is the free
    // preview marker. Anything else stays locked until the curriculum response
    // carries the caller's enrolment state.
    final status = isFreePreview ? LessonStatus.active : LessonStatus.locked;

    return CourseLessonModel(
      id: json['id']?.toString() ?? '',
      number: number,
      title: json['title']?.toString() ?? '',
      // Bare number in the API payload, minutes by convention.
      durationMinutes: _asMinutes(json['duration']),
      // The curriculum outline never carries a playable URL: the player fetches
      // it per lecture from GET /lectures/:id. `content` is the gated text body
      // for READING lectures, not a video source.
      videoUrl: json['videoUrl']?.toString(),
      isFreePreview: isFreePreview,
      status: status,
    );
  }

  static int _asMinutes(dynamic raw) {
    if (raw is num) return raw.round();
    return int.tryParse(raw?.toString() ?? '') ?? 0;
  }
}
