import 'package:equatable/equatable.dart';

class HomeCourseEntity extends Equatable {
  final List<CourseInstructorEntity> instructors;
  final String id;
  final String title;
  final double rating;
  final String image;

  /// Pounds, not piastres. The API transports piastres; conversion happens once
  /// in the data layer via `core/utils/money.dart`.
  final double price;
  final String level;
  final String categoryName;
  final List<String> tags;
  final String courseStatus;
  final String language;
  final int ratingCount;

  final int enrollmentCount;

  // Curriculum Safety
  final List<CourseSectionEntity>? sections;
  final List<CourseLessonEntity>? lessons;

  const HomeCourseEntity({
    required this.instructors,
    required this.id,
    required this.title,
    required this.rating,
    required this.image,
    required this.price,
    required this.level,
    required this.categoryName,
    required this.tags,
    this.courseStatus = 'PUBLISHED',
    this.language = '',
    required this.ratingCount,
    this.enrollmentCount = 0,
    this.sections,
    this.lessons,
  });

  @override
  List<Object?> get props => [
        id,
        title,
        rating,
        image,
        price,
        level,
        categoryName,
        tags,
        courseStatus,
        language,
        ratingCount,
        enrollmentCount,
        sections,
        lessons,
      ];
}

class CourseInstructorEntity {
  final String name;
  final String? avatar;

  const CourseInstructorEntity({required this.name, this.avatar});
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
  final String title;
  final int? duration;

  const CourseLessonEntity({
    required this.id,
    required this.title,
    this.duration,
  });

  @override
  List<Object?> get props => [id, title, duration];
}
