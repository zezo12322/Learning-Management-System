import 'package:flutter/material.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';
import 'package:gap/gap.dart';
import 'package:optimatech_lms/core/utils/app_text_styles.dart';
import 'package:optimatech_lms/features/courses/domain/entities/courses_entity.dart';
import 'package:optimatech_lms/features/course_details/presentation/widgets/over_view_tap/custom_row_overview_tap.dart';

class OverviewTab extends StatelessWidget {
  const OverviewTab({super.key, required this.course});
  final CourseEntity course;

  @override
  Widget build(BuildContext context) {
    final colorScheme = Theme.of(context).colorScheme;

    return Column(
      crossAxisAlignment: CrossAxisAlignment.stretch,
      children: [
        Text(
          'About This Course',
          style: TextStyles.titleSmall.copyWith(
            fontSize: 18.sp,
            color: colorScheme.onSurface,
          ),
        ),
        Gap(8.h),
        Text(
          // this return null always from the API, so we use a mock description as a fallback
          // TODO: Update the API to return a proper description for the course
          '${course.description ?? 'Master core concepts and practical workflows through real-world projects designed to build your expertise from the ground up.'} ',
          style: TextStyles.bodySmall.copyWith(
            color: colorScheme.onSurfaceVariant,
            height: 1.55,
          ),
        ),
        Gap(16.h),
        // TODO: Update the API to return a proper Language and Last Updated for the course
        const CustomRowOverviewTab(
          icon: Icons.language_rounded,
          label: 'Language',
          value: 'English',
        ),
        Gap(8.h),
        const CustomRowOverviewTab(
          icon: Icons.update_rounded,
          label: 'Last Updated',
          value: 'March 2025',
        ),
        Gap(8.h),
        const CustomRowOverviewTab(
          icon: Icons.devices_rounded,
          label: 'Access',
          value: 'Mobile & Desktop',
        ),
      ],
    );
  }
}
