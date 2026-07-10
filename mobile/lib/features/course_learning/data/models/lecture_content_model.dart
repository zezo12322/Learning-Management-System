import 'package:optimatech_lms/core/helper_function/lecture_type.dart';
import 'package:optimatech_lms/dataconnect_generated/generated.dart';
import 'package:optimatech_lms/features/course_learning/domain/entities/lecture_content_entity.dart';

class LectureContentModel {
  final String id;
  final String title;
  final LectureContentType type;
  final String? videoUrl;
  final String? content;
  final int? duration;
  final String? transcriptUrl;
  final bool isFreePreview;
  
  const LectureContentModel({
    required this.id,
    required this.title,
    required this.type,
    this.videoUrl,
    this.content,
    this.duration,
    this.transcriptUrl,
    required this.isFreePreview,
  });

  factory LectureContentModel.fromConnectorResult(GetLectureContentData data) {
    final lecture = data.courseLecture!;
    return LectureContentModel(
      id: lecture.id,
      title: lecture.title,
      type: LectureContentType.fromRaw(lecture.type.stringValue),
      videoUrl: lecture.videoUrl,
      content: lecture.content,
      duration: lecture.duration,
      transcriptUrl: lecture.transcriptUrl,
      isFreePreview: lecture.isFreePreview,
    );
  }

  LectureContentEntity toEntity() {
    return LectureContentEntity(
      id: id,
      title: title,
      type: type,
      videoUrl: videoUrl,
      content: content,
      duration: duration,
      transcriptUrl: transcriptUrl,
      isFreePreview: isFreePreview,
    );
  }
}