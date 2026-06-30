import 'package:flutter/material.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';
import 'package:gap/gap.dart';
import 'package:optimatech_lms/features/home/presentation/widgets/home_section_header.dart';
import 'package:optimatech_lms/features/home/presentation/widgets/recommended_course_card.dart';

class RecommendedCoursesSection extends StatelessWidget {
  const RecommendedCoursesSection({super.key});

  static const _courses = [
    _RecommendedCourseData(
      title: 'Mobile App Design',
      subtitle: '8 lessons • 2h 10m',
      icon: Icons.smartphone_outlined,
      iconColor: Color(0xFF6366F1),
      iconBackgroundColor: Color(0xFFEEF2FF),
    ),
    _RecommendedCourseData(
      title: 'Product Analytics',
      subtitle: '10 lessons • 3h 45m',
      icon: Icons.insights_outlined,
      iconColor: Color(0xFF22C55E),
      iconBackgroundColor: Color(0xFFECFDF5),
    ),
    _RecommendedCourseData(
      title: 'User Research Methods',
      subtitle: '6 lessons • 1h 50m',
      icon: Icons.favorite_outline_rounded,
      iconColor: Color(0xFFEF4444),
      iconBackgroundColor: Color(0xFFFEF2F2),
    ),
  ];

  @override
  Widget build(BuildContext context) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        HomeSectionHeader(
          title: 'Recommended Courses',
          onViewAllTap: () {},
        ),
        Gap(14.h),
        Column(
          children: [
            for (var i = 0; i < _courses.length; i++) ...[
              if (i > 0) Gap(12.h),
              RecommendedCourseCard(
                title: _courses[i].title,
                subtitle: _courses[i].subtitle,
                icon: _courses[i].icon,
                iconColor: _courses[i].iconColor,
                iconBackgroundColor: _courses[i].iconBackgroundColor,
                onTap: () {},
              ),
            ],
          ],
        ),
      ],
    );
  }
}

class _RecommendedCourseData {
  const _RecommendedCourseData({
    required this.title,
    required this.subtitle,
    required this.icon,
    required this.iconColor,
    required this.iconBackgroundColor,
  });

  final String title;
  final String subtitle;
  final IconData icon;
  final Color iconColor;
  final Color iconBackgroundColor;
}
