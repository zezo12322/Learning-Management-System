import 'package:flutter/material.dart';
import 'package:optimatech_lms/features/courses/domain/entities/category_entity.dart';
import 'package:optimatech_lms/features/courses/domain/entities/courses_entity.dart';
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
  instructors: [CourseInstructorEntity(name: 'Instructor name', avatar: null)],
  avgRating: 4.4,
  ratingCount: 500,
  isBookmarked: false,
);


CategoryEntity get dummySkeletonCategoryItem => const CategoryEntity(
  id: '_',
  name: 'Category',
  description: 'Category description placeholder',
);

List<CourseEntity> get sampleCourses => [
  const CourseEntity(
    id: '1',
    title: 'UX/UI Design Masterclass',
    instructors: [
      CourseInstructorEntity(name: 'John Doe', avatar: null),
    ],
    level: 'Intermediate',
    categoryName: 'Design',
    courseStatus: 'PUBLISHED',
    language: 'English',
    price: 49.99,
    tags: ['UX', 'UI', 'Design'],
    description:
    'Learn the fundamentals of UX/UI design and create stunning user experiences.',
    isBookmarked: false,
    thumbnail:
    'https://blog.pwskills.com/wp-content/uploads/2025/08/ux-design-courses.jpg',
    avgRating: 4.3,
    ratingCount: 600,
  ),
  const CourseEntity(
    id: '2',
    title: 'Data Science for Beginners',
    instructors: [
      CourseInstructorEntity(name: 'David Lee', avatar: null),
    ],
    level: 'Beginner',
    categoryName: 'Data Science',
    courseStatus: 'PUBLISHED',
    language: 'English',
    price: 49.99,
    tags: ['Data Science', 'Python', 'ML'],
    description:
    'Start your journey into data science with Python, statistics, and machine learning fundamentals.',
    isBookmarked: false,
    thumbnail:
    'https://blog.pwskills.com/wp-content/uploads/2025/08/ux-design-courses.jpg',
    avgRating: 4.3,
    ratingCount: 600,
  ),
  const CourseEntity(
    id: '3',
    title: 'Web Development Bootcamp',
    instructors: [
      CourseInstructorEntity(name: 'Emma Wilson', avatar: null),
    ],
    level: 'Intermediate',
    categoryName: 'Development',
    courseStatus: 'PUBLISHED',
    language: 'English',
    price: 79.99,
    tags: ['HTML', 'CSS', 'JavaScript'],
    description:
    'Build responsive websites from scratch using modern web development technologies.',
    isBookmarked: false,
    thumbnail:
    'https://blog.pwskills.com/wp-content/uploads/2025/08/ux-design-courses.jpg',
    avgRating: 4.3,
    ratingCount: 600,
  ),
  const CourseEntity(
    id: '4',
    title: 'Mobile App Design with Figma',
    instructors: [
      CourseInstructorEntity(name: 'Alex Johnson', avatar: null),
    ],
    level: 'Beginner',
    categoryName: 'Design',
    courseStatus: 'PUBLISHED',
    language: 'English',
    price: 39.99,
    tags: ['Figma', 'UI', 'Mobile'],
    description:
    'Design modern and professional mobile applications using Figma.',
    isBookmarked: false,
    thumbnail:
    'https://blog.pwskills.com/wp-content/uploads/2025/08/ux-design-courses.jpg',
    avgRating: 4.3,
    ratingCount: 600,
  ),
  const CourseEntity(
    id: '5',
    title: 'SQL for Data Analysis',
    instructors: [
      CourseInstructorEntity(name: 'Olivia Brown', avatar: null),
    ],
    level: 'Beginner',
    categoryName: 'Database',
    courseStatus: 'PUBLISHED',
    language: 'English',
    price: 29.99,
    tags: ['SQL', 'Database', 'Analytics'],
    description:
    'Learn SQL from the ground up to query, analyze, and visualize data effectively.',
    isBookmarked: false,
    thumbnail:
    'https://blog.pwskills.com/wp-content/uploads/2025/08/ux-design-courses.jpg',
    avgRating: 4.3,
    ratingCount: 600,
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
