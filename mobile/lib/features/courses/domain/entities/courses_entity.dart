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
  final bool isBookmarked;
  final double avgRating;
  final int ratingCount;
  final int enrollmentCount;

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
    this.isBookmarked = false,
    required this.avgRating,
    required this.ratingCount,
    this.enrollmentCount = 0,
  });
}

class CourseInstructorEntity {
  final String name;
  final String? avatar;

  const CourseInstructorEntity({required this.name, this.avatar});
}