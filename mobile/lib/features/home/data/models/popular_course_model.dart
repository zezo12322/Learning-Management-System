import 'package:optimatech_lms/features/home/domain/entities/course_entity.dart';

class PopularCourseModel extends CourseEntity {
  const PopularCourseModel({
    required super.id,
    required super.title,
    required super.rating,
    required super.image,
  });

  factory PopularCourseModel.fromDataConnect(Map<String, dynamic> json) {
    return PopularCourseModel(
      id: json['id'] as String? ?? '',
      title: json['title'] as String? ?? '',
      rating: (json['rating'] as num?)?.toDouble() ?? 0.0,
      image: json['thumbnail'] as String? ?? '',
    );
  }
}
