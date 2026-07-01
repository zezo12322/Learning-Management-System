import 'package:flutter/material.dart';
import 'package:optimatech_lms/features/courses/domain/entities/courses_entity.dart';
import 'package:optimatech_lms/features/courses/presentation/views/widgets/course_card.dart';

import '../../features/courses/presentation/views/widgets/courses_category_Section.dart';
import '../utils/app_colors.dart';

CourseEntity get dummySkeletonCourseItem => const CourseEntity(
  id: '_',
  title: 'Course title placeholder',
  description: 'Course description placeholder',
  price: 0,
  level: 'Beginner',
  thumbnail: 'https://blog.pwskills.com/wp-content/uploads/2025/08/ux-design-courses.jpg',
  courseStatus: '',
  language: '',
  categoryName: '',
  tags: [],
  instructors: [CourseInstructorEntity(name: 'Instructor name', avatar: null)]
);

 List<CourseItem> get sampleCourses => [
  const CourseItem(
    id: '1',
    title: 'UI/UX Design Fundamentals',
    instructorName: 'Sarah Johnson',
    rating: 4.9,
    reviewCount: 1200,
    level: 'Beginner',
    lessonCount: 12,
    progress: 0.45,
    status: CourseStatus.inProgress,
    thumbnailImage: 'https://blog.pwskills.com/wp-content/uploads/2025/08/ux-design-courses.jpg'
  ),
  const CourseItem(
    id: '2',
    title: 'Data Science for Beginners',
    instructorName: 'David Lee',
    rating: 4.8,
    reviewCount: 980,
    level: 'Beginner',
    lessonCount: 10,
    progress: 1.0,
    status: CourseStatus.completed,
    thumbnailImage: 'https://blog.pwskills.com/wp-content/uploads/2025/08/ux-design-courses.jpg'
  ),
  const CourseItem(
    id: '3',
    title: 'Web Development Bootcamp',
    instructorName: 'Emma Wilson',
    rating: 4.7,
    reviewCount: 1500,
    level: 'Intermediate',
    lessonCount: 24,
    progress: 0.30,
    status: CourseStatus.inProgress,
    thumbnailImage: 'https://blog.pwskills.com/wp-content/uploads/2025/08/ux-design-courses.jpg'
  ),
  const CourseItem(
    id: '4',
    title: 'Mobile App Design with Figma',
    instructorName: 'Alex Johnson',
    rating: 4.9,
    reviewCount: 860,
    level: 'Beginner',
    lessonCount: 8,
    progress: 0.0,
    status: CourseStatus.newCourse,
    thumbnailImage: 'https://blog.pwskills.com/wp-content/uploads/2025/08/ux-design-courses.jpg'
  ),
  const CourseItem(
    id: '5',
    title: 'SQL for Data Analysis',
    instructorName: 'Olivia Brown',
    rating: 4.6,
    reviewCount: 740,
    level: 'Beginner',
    lessonCount: 9,
    progress: 0.0,
    status: CourseStatus.popular,
    thumbnailImage: 'https://blog.pwskills.com/wp-content/uploads/2025/08/ux-design-courses.jpg'
  ),
];

 const List<CourseCategory> defaultCategories = [
  const CourseCategory(
    label: 'All',
    icon: Icons.grid_view_rounded,
    iconColor: AppColors.primary,
  ),
  const CourseCategory(
    label: 'Design',
    icon: Icons.palette_outlined,
    iconColor: AppColors.secondary,
  ),
  const CourseCategory(
    label: 'Development',
    icon: Icons.code_rounded,
    iconColor: Color(0xffF59E0B),
  ),
  const CourseCategory(
    label: 'Data Science',
    icon: Icons.bar_chart_rounded,
    iconColor: Color(0xff0EA5E9),
  ),
  const CourseCategory(
    label: 'Business',
    icon: Icons.business_center_outlined,
    iconColor: Color(0xff22C55E),
  ),
  const CourseCategory(
    label: 'Marketing',
    icon: Icons.campaign_outlined,
    iconColor: Color(0xffEF4444),
  ),
];
