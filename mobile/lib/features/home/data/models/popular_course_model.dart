import 'package:optimatech_lms/features/home/domain/entities/course_entity.dart';

class PopularCourseModel extends HomeCourseEntity {
  const PopularCourseModel({
    required super.instructors,
    required super.price,
    required super.level,
    required super.categoryName,
    required super.tags,
    required super.ratingCount,
    required super.courseStatus,
    required super.language,
    required super.id,
    required super.title,
    required super.rating,
    required super.image,
  });

  factory PopularCourseModel.fromDataConnect(Map<String, dynamic> json) {
    return PopularCourseModel(
      instructors: List<CourseInstructorEntity>.from(json['instructors'] ?? []),
      price: (json['price'] as num?)?.toDouble() ?? 0.0,
      level: json['level'] as String? ?? '',
      categoryName: json['category']?['name'] as String? ?? '',
      tags: List<String>.from(json['tags'] ?? const []),
      ratingCount: json['ratingCount'] as int? ?? 0,
      courseStatus: json['courseStatus'] as String? ?? '',
      language: json['language'] as String? ?? '',
      id: json['id'] as String? ?? '',
      title: json['title'] as String? ?? '',
      rating: (json['rating'] as num?)?.toDouble() ?? 0.0,
      image: json['thumbnail'] as String? ?? '',
    );
  }
}
