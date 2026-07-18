import 'package:optimatech_lms/dataconnect_generated/generated.dart';
import 'package:optimatech_lms/features/home/domain/entities/home_course_entity.dart';

class PopularCourseModel extends HomeCourseEntity {
  const PopularCourseModel({
    required super.instructors,
    required super.price,
    required super.level,
    required super.categoryName,
    required super.tags,
    required super.ratingCount,
    required super.enrollmentCount,
    required super.courseStatus,
    required super.language,
    required super.id,
    required super.title,
    required super.rating,
    required super.image,
  });

  factory PopularCourseModel.fromDataConnect(ListPopularCoursesCourses course) {
    return PopularCourseModel(
      instructors: [
        CourseInstructorEntity(
          name: course.author.name,
          avatar: course.author.avatar,
        ),
      ],
      price: course.price.toDouble(),
      level: course.level.stringValue,
      categoryName: course.category.name,
      tags: course.tags,
      ratingCount: course.ratingCount,
      enrollmentCount: course.activeEnrollments.length,
      courseStatus: 'PUBLISHED',
      language: 'en',
      id: course.id,
      title: course.title,
      rating: course.avgRating,
      image: course.thumbnail ?? '',
    );
  }
}
