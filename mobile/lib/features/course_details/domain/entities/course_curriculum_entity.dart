import 'package:equatable/equatable.dart';

enum LessonStatus { completed, active, locked }

class CourseCurriculumEntity extends Equatable {
  final String courseId;

  /// Course description as returned by `GET /catalog/courses/:id/curriculum`.
  /// The published-courses listing does not select it, so this is the only
  /// place the app can read it — and it carries content attribution that must
  /// reach the learner (e.g. CC BY source credit).
  final String? description;
  final String? language;
  final List<CourseSectionEntity> sections;

  const CourseCurriculumEntity({
    required this.courseId,
    this.description,
    this.language,
    required this.sections,
  });

  /// Every lesson in the course, flattened in section order.
  List<CourseLessonEntity> get allLessons =>
      [for (final s in sections) ...s.lessons];

  @override
  List<Object?> get props => [courseId, description, language, sections];
}

class CourseSectionEntity extends Equatable {
  final String id;
  final String title;
  final List<CourseLessonEntity> lessons;

  const CourseSectionEntity({
    required this.id,
    required this.title,
    required this.lessons,
  });

  @override
  List<Object?> get props => [id, title, lessons];
}

class CourseLessonEntity extends Equatable {
  final String id;

  /// 1-based position of the lesson within the whole course. The API does not
  /// return a lesson number, so it is derived from the (already ordered)
  /// curriculum response.
  final int number;
  final String title;

  /// Lesson length in **minutes**. The API stores a bare number and the whole
  /// app treats that number as minutes; keeping it typed as int stops the
  /// unit from being re-guessed at each call site.
  final int durationMinutes;
  final String? videoUrl;
  final bool isFreePreview;
  final LessonStatus status;

  const CourseLessonEntity({
    required this.id,
    required this.number,
    required this.title,
    required this.durationMinutes,
    this.videoUrl,
    this.isFreePreview = false,
    required this.status,
  });

  @override
  List<Object?> get props =>
      [id, number, title, durationMinutes, videoUrl, isFreePreview, status];
}
