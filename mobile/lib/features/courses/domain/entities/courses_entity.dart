/// Pure domain entity — zero Flutter/Firebase imports.
enum LessonStatus { completed, active, locked }

class CourseLessonEntity {
  final String id;
  final int number;
  final String title;
  final String duration;
  final LessonStatus status;

  const CourseLessonEntity({
    required this.id,
    required this.number,
    required this.title,
    required this.duration,
    required this.status,
  });
}

class CourseSectionEntity {
  final String id;
  final String title;
  final List<CourseLessonEntity> lessons;

  const CourseSectionEntity({
    required this.id,
    required this.title,
    required this.lessons,
  });
}

class CourseEntity {
  final String id;
  final String title;
  final String? description;
  final double price;
  final String courseStatus; // DRAFT | PUBLISHED | ARCHIVED
  final String language;
  final String level; // BEGINNER | INTERMEDIATE | ADVANCED
  final String? thumbnail;
  final String categoryName;
  final List<String> tags;
  final List<CourseInstructorEntity> instructors;
  final List<CourseSectionEntity> sections;
  final List<CourseLessonEntity> lessons;
  final bool isBookmarked;
  final double avgRating;
  final int ratingCount;

  const CourseEntity({
    required this.id,
    required this.title,
    this.description,
    required this.price,
    required this.courseStatus,
    required this.language,
    required this.level,
    this.thumbnail,
    required this.categoryName,
    required this.tags,
    required this.instructors,
    this.sections = const [],
    this.lessons = const [],
    this.isBookmarked = false,
    required this.avgRating,
    required this.ratingCount,
  });
}

class CourseInstructorEntity {
  final String name;
  final String? avatar;

  const CourseInstructorEntity({required this.name, this.avatar});
}