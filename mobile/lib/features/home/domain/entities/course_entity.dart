import 'package:equatable/equatable.dart';

class HomeCourseEntity extends Equatable {
  final List<CourseInstructorEntity> instructors;
  final String id;
  final String title;
  final double rating; 
  final String image;  

  final double price;
  final String level;
  final String categoryName;
  final List<String> tags;
  final String courseStatus;
  final String language;
  final int ratingCount;

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
      ];
}
class CourseInstructorEntity {
  final String name;
  final String? avatar;

  const CourseInstructorEntity({required this.name, this.avatar});
}