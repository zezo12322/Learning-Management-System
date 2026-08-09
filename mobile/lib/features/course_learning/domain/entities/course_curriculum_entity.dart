
import 'package:optimatech_lms/core/helper_function/lecture_type.dart';

/// Entity produced by the `GetCourseCurriculum` query.
///
/// Firebase Table: courses
class CourseCurriculumEntity {
  final String id;
  final String title;
  final String? description;
  final String language;
  final List<CurriculumSectionEntity> sections;

  const CourseCurriculumEntity({
    required this.id,
    required this.title,
    this.description,
    required this.language,
    required this.sections,
  });

  /// Total number of lectures across every section.
  int get totalLectures =>
      sections.fold(0, (sum, section) => sum + section.lectures.length);
}

/// Firebase Table: course_sections
class CurriculumSectionEntity {
  final String id;
  final String title;
  final List<CurriculumLectureEntity> lectures;

  const CurriculumSectionEntity({
    required this.id,
    required this.title,
    required this.lectures,
  });
}

/// Firebase Table: course_lectures
///
/// Note: this is the "curriculum row" shape (as returned by
/// `GetCourseCurriculum`) — a lighter projection than [LectureContentEntity],
/// which is what `GetLectureContent` returns for the lecture currently
/// playing.
class CurriculumLectureEntity {
  final String id;
  final String title;
  final LectureContentType type;
  final String? content;
  /// Lecture length in **seconds**, as the API stores it. Render through
  /// `formatSeconds` in `core/utils/duration_format.dart`.
  final int? durationSeconds;
  final bool isFreePreview;

  const CurriculumLectureEntity({
    required this.id,
    required this.title,
    required this.type,
    this.content,
    this.durationSeconds,
    required this.isFreePreview,
  });
}