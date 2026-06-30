import 'package:flutter/material.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';
import 'package:gap/gap.dart';
import 'package:optimatech_lms/features/home/presentation/widgets/home_section_header.dart';
import 'package:optimatech_lms/features/home/presentation/widgets/popular_course_card.dart';

class PopularCoursesSection extends StatelessWidget {
  const PopularCoursesSection({super.key});

  static const _courses = [
    _PopularCourseData(
      title: 'UI/UX Design Principles',
      studentCount: '18.2K students',
      rating: 4.8,
      headerColor: Color(0xFF6366F1),
      icon: Icons.palette_outlined,
    ),
    _PopularCourseData(
      title: 'Design Thinking Workshop',
      studentCount: '12.5K students',
      rating: 4.7,
      headerColor: Color(0xFF0EA5E9),
      icon: Icons.lightbulb_outline_rounded,
    ),
    _PopularCourseData(
      title: 'Web Development Basics',
      studentCount: '24.1K students',
      rating: 4.9,
      headerColor: Color(0xFFF97316),
      icon: Icons.code_rounded,
    ),
    _PopularCourseData(
      title: 'Data Visualization',
      studentCount: '9.8K students',
      rating: 4.6,
      headerColor: Color(0xFF22C55E),
      icon: Icons.bar_chart_rounded,
    ),
  ];

  @override
  Widget build(BuildContext context) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        HomeSectionHeader(
          title: 'Popular Courses',
          onViewAllTap: () {},
        ),
        Gap(14.h),
        SizedBox(
          height: 210.h,
          child: ListView.separated(
            scrollDirection: Axis.horizontal,
            itemCount: _courses.length,
            separatorBuilder: (_, __) => Gap(12.w),
            itemBuilder: (context, index) {
              final course = _courses[index];
              return PopularCourseCard(
                title: course.title,
                studentCount: course.studentCount,
                rating: course.rating,
                headerColor: course.headerColor,
                icon: course.icon,
                onTap: () {},
              );
            },
          ),
        ),
      ],
    );
  }
}

class _PopularCourseData {
  const _PopularCourseData({
    required this.title,
    required this.studentCount,
    required this.rating,
    required this.headerColor,
    required this.icon,
  });

  final String title;
  final String studentCount;
  final double rating;
  final Color headerColor;
  final IconData icon;
}
