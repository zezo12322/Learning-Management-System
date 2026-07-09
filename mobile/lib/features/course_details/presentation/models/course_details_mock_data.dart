import 'package:flutter/material.dart';

enum LessonStatus { completed, active, locked }

class CourseLesson {
  const CourseLesson({
    required this.number,
    required this.title,
    required this.duration,
    required this.status,
  });

  final int number;
  final String title;
  final String duration;
  final LessonStatus status;
}

class RelatedCourseItem {
  const RelatedCourseItem({
    required this.title,
    required this.rating,
    required this.reviewCount,
    required this.duration,
    required this.level,
    required this.headerColor,
    required this.icon,
  });

  final String title;
  final double rating;
  final int reviewCount;
  final String duration;
  final String level;
  final Color headerColor;
  final IconData icon;
}

abstract final class CourseDetailsMockData {
  static const category = 'Design';
  static const title = 'UI/UX Design Fundamentals';
  static const description =
      'Learn the core principles of user interface and user experience design.';
  static const rating = 4.9;
  static const ratingCount = 1200;
  static const studentCount = 12500;
  static const instructorName = 'Sarah Johnson';
  static const instructorTitle = 'Senior UI/UX Designer';
  static const totalDuration = '12h 30m';
  static const lessonCount = '68';
  static const level = 'Beginner';
  static const certificateLabel = 'Certificate';
  static const activeLessonTitle = '3. User Research Methods';
  static const price = 49.99;
  static const originalPrice = 79.99;
  static const discountPercent = 37;
  static const reviewCount = 1249;

  static const lessons = [
    CourseLesson(
      number: 1,
      title: 'Introduction to UI/UX Design',
      duration: '12 min',
      status: LessonStatus.completed,
    ),
    CourseLesson(
      number: 2,
      title: 'Design Thinking Process',
      duration: '18 min',
      status: LessonStatus.completed,
    ),
    CourseLesson(
      number: 3,
      title: 'User Research Methods',
      duration: '15 min',
      status: LessonStatus.active,
    ),
    CourseLesson(
      number: 4,
      title: 'Wireframing Basics',
      duration: '22 min',
      status: LessonStatus.locked,
    ),
    CourseLesson(
      number: 5,
      title: 'Prototyping in Figma',
      duration: '25 min',
      status: LessonStatus.locked,
    ),
    CourseLesson(
      number: 6,
      title: 'Usability Testing',
      duration: '20 min',
      status: LessonStatus.locked,
    ),
  ];

  static const relatedCourses = [
    RelatedCourseItem(
      title: 'Figma UI Design Masterclass',
      rating: 4.8,
      reviewCount: 980,
      duration: '8h 45m',
      level: 'Beginner',
      headerColor: Color(0xFF3B82F6),
      icon: Icons.design_services_rounded,
    ),
    RelatedCourseItem(
      title: 'Advanced React Patterns',
      rating: 4.7,
      reviewCount: 756,
      duration: '10h 20m',
      level: 'Intermediate',
      headerColor: Color(0xFFF97316),
      icon: Icons.code_rounded,
    ),
    RelatedCourseItem(
      title: 'Mobile App Design',
      rating: 4.9,
      reviewCount: 1120,
      duration: '6h 15m',
      level: 'Beginner',
      headerColor: Color(0xFF22C55E),
      icon: Icons.phone_iphone_rounded,
    ),
  ];
}
