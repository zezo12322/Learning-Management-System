import 'package:optimatech_lms/core/helper_function/lecture_type.dart';

/// Entity produced by the `GetLectureContent` query.
///
/// Firebase Table: course_lectures
class LectureContentEntity {
  final String id;
  final String title;
  final LectureContentType type;
  final String? videoUrl;
  final String? content;
  final int? duration;
  final String? transcriptUrl;
  final bool isFreePreview;

  /// Flattened from `section.course.id` — kept here so the presentation
  /// layer never has to reach through nested connector shapes.
  //final String courseId;

  const LectureContentEntity({
    required this.id,
    required this.title,
    required this.type,
    this.videoUrl,
    this.content,
    this.duration,
    this.transcriptUrl,
    required this.isFreePreview,
    //required this.courseId,
  });
}