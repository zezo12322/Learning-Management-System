import 'package:flutter/material.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';
import 'package:gap/gap.dart';
import 'package:optimatech_lms/core/utils/app_colors.dart';
import 'package:optimatech_lms/features/home/data/models/recomended_course_model.dart';
import 'package:optimatech_lms/features/home/presentation/widgets/home_section_header.dart';
import 'package:optimatech_lms/features/home/presentation/widgets/recommended_course_card.dart';

class RecommendedCoursesSection extends StatelessWidget {
  const RecommendedCoursesSection({super.key});

  // TODO: Replace with actual data
  static final _courses = [
    RecommendedCourseModel(
      title: 'Mobile App Design',
      subtitle: '8 lessons • 2h 10m',
      icon: Icons.smartphone_outlined,
      iconColor: AppColors.primary,
      iconBackgroundColor: AppColors.primary.withValues(alpha: 0.1),
    ),
    RecommendedCourseModel(
      title: 'Product Analytics',
      subtitle: '10 lessons • 3h 45m',
      icon: Icons.insights_outlined,
      iconColor: AppColors.success,
      iconBackgroundColor: AppColors.success.withValues(alpha: 0.1),
    ),
    RecommendedCourseModel(
      title: 'User Research Methods',
      subtitle: '6 lessons • 1h 50m',
      icon: Icons.favorite_outline_rounded,
      iconColor: AppColors.error,
      iconBackgroundColor: AppColors.error.withValues(alpha: 0.1),
    ),
  ];

  @override
  Widget build(BuildContext context) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        // ------------- Recommended Courses Header -------------
        HomeSectionHeader(
          title: 'Recommended Courses',
          onViewAllTap: () {},
        ),
        Gap(14.h),
        // ------------- Recommended Courses List -------------
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
