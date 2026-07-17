import 'package:flutter/material.dart';
import 'package:optimatech_lms/dataconnect_generated/generated.dart';
import 'package:optimatech_lms/features/home/domain/entities/home_course_entity.dart';

class RecommendedCourseModel extends HomeCourseEntity {
  final String? subtitle;
  final IconData? icon;
  final Color? iconColor;
  final Color? iconBackgroundColor;

  const RecommendedCourseModel({
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
    this.subtitle,
    this.icon,
    this.iconColor,
    this.iconBackgroundColor,
  });

  factory RecommendedCourseModel.fromDataConnect(
      ListRecommendedCoursesCourses course) {
    return RecommendedCourseModel(
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

  factory RecommendedCourseModel.fromPopularDataConnect(
      ListPopularCoursesCourses course) {
    return RecommendedCourseModel(
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
