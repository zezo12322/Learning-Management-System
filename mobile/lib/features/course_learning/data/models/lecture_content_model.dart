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

  factory LectureContentModel.dummy(String lectureId) {
    switch (lectureId) {
      case 'lec_1':
        return const LectureContentModel(
          id: 'lec_1',
          title: 'Welcome to the Course',
          type: LectureContentType.video,
          videoUrl:
          'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
          content:
          'Welcome to the course. In this lesson we will walk through the course structure and what you will build.',
          duration: 5,
          transcriptUrl: null,
          isFreePreview: true,
        );

      case 'lec_2':
        return const LectureContentModel(
          id: 'lec_2',
          title: 'Course Roadmap',
          type: LectureContentType.video,
          videoUrl:
          'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
          content:
          'This lesson explains the learning path, modules, and expected outcomes of the course.',
          duration: 8,
          transcriptUrl: null,
          isFreePreview: true,
        );

      case 'lec_3':
        return const LectureContentModel(
          id: 'lec_3',
          title: 'Cubit Basics',
          type: LectureContentType.video,
          videoUrl:
          'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4',
          content:
          'In this lesson we introduce Cubit, state emission flow, and how to structure simple presentation logic.',
          duration: 12,
          transcriptUrl: null,
          isFreePreview: false,
        );

      case 'lec_4':
        return const LectureContentModel(
          id: 'lec_4',
          title: 'Bloc vs Cubit',
          type: LectureContentType.video,
          videoUrl:
          'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4',
          content:
          'This lesson compares Bloc and Cubit, when to choose each, and the trade-offs in larger apps.',
          duration: 10,
          transcriptUrl: null,
          isFreePreview: false,
        );

      case 'lec_5':
        return const LectureContentModel(
          id: 'lec_5',
          title: 'Data Layer',
          type: LectureContentType.video,
          videoUrl:
          'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4',
          content:
          'We will build the data layer with models, repositories, remote data sources, and clean mapping to entities.',
          duration: 14,
          transcriptUrl: null,
          isFreePreview: false,
        );

      case 'lec_6':
        return const LectureContentModel(
          id: 'lec_6',
          title: 'Presentation Layer',
          type: LectureContentType.video,
          videoUrl:
          'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/SubaruOutbackOnStreetAndDirt.mp4',
          content:
          'In this lesson we connect Cubit, state, and reusable UI widgets inside the presentation layer.',
          duration: 11,
          transcriptUrl: null,
          isFreePreview: false,
        );

      default:
        return LectureContentModel(
          id: lectureId,
          title: 'Lesson',
          type: LectureContentType.video,
          videoUrl:
          'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
          content: 'Default dummy lesson content.',
          duration: 10,
          transcriptUrl: null,
          isFreePreview: false,
        );
    }
  }

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