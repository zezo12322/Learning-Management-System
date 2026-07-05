import 'package:flutter/material.dart';
import 'package:optimatech_lms/features/home/domain/entities/course_entity.dart';

class RecommendedCourseModel extends CourseEntity {
  final String? subtitle;
  final IconData? icon;
  final Color? iconColor;
  final Color? iconBackgroundColor;

  const RecommendedCourseModel({
    required super.id,
    required super.title,
    required super.rating,
    required super.image,
    this.subtitle,
    this.icon,
    this.iconColor,
    this.iconBackgroundColor,
  });

  factory RecommendedCourseModel.fromDataConnect(Map<String, dynamic> json) {
    return RecommendedCourseModel(
      id: json['id'] as String? ?? '',
      title: json['title'] as String? ?? '',
      rating: (json['rating'] as num?)?.toDouble() ?? 0.0,
      image: json['thumbnail'] as String? ?? '',
    );
  }
}
