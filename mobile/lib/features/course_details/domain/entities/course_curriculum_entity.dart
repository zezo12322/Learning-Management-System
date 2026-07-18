import 'package:equatable/equatable.dart';

enum LessonStatus { completed, active, locked }

class CourseCurriculumEntity extends Equatable {
  final String courseId;
  final List<CourseSectionEntity> sections;

  const CourseCurriculumEntity({
    required this.courseId,
    required this.sections,
  });

  @override
  List<Object?> get props => [courseId, sections];
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
  final int number;
  final String title;
  final String duration;
  final String? videoUrl;
  final LessonStatus status;

  const CourseLessonEntity({
    required this.id,
    required this.number,
    required this.title,
    required this.duration,
    this.videoUrl,
    required this.status,
  });

  @override
  List<Object?> get props => [id, number, title, duration, videoUrl, status];
}
