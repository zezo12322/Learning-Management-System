import 'package:flutter/material.dart';

class PopularCourseModel {
  const PopularCourseModel({
    required this.title,
    required this.studentCount,
    required this.rating,
    required this.headerColor,
    required this.icon,
    required this.image,
  });

  final String title;
  final String studentCount;
  final double rating;
  final Color headerColor;
  final IconData icon;
  final String image;
}
