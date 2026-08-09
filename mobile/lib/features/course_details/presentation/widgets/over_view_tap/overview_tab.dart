import 'package:easy_localization/easy_localization.dart';
import 'package:flutter/material.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';
import 'package:gap/gap.dart';
import 'package:optimatech_lms/core/utils/app_text_styles.dart';
import 'package:optimatech_lms/features/courses/domain/entities/courses_entity.dart';
import 'package:optimatech_lms/features/course_details/presentation/widgets/over_view_tap/custom_row_overview_tap.dart';

class OverviewTab extends StatelessWidget {
  const OverviewTab({
    super.key,
    required this.course,
    this.description,
    this.language,
  });

  final CourseEntity course;

  /// From the curriculum response, which is the only endpoint that returns the
  /// course description — the published-courses listing does not select it.
  /// This is where content attribution reaches the learner, so it must render.
  final String? description;
  final String? language;

  @override
  Widget build(BuildContext context) {
    final colorScheme = Theme.of(context).colorScheme;

    final text = description?.trim().isNotEmpty == true
        ? description!.trim()
        : (course.description?.trim().isNotEmpty == true
            ? course.description!.trim()
            : 'course_details.no_description'.tr());

    final lang = language?.trim().isNotEmpty == true
        ? language!.trim()
        : course.language;

    return Column(
      crossAxisAlignment: CrossAxisAlignment.stretch,
      children: [
        Text(
          'course_details.about_this_course'.tr(),
          style: TextStyles.titleSmall.copyWith(
            fontSize: 18.sp,
            color: colorScheme.onSurface,
          ),
        ),
        Gap(8.h),
        Text(
          text,
          style: TextStyles.bodySmall.copyWith(
            color: colorScheme.onSurfaceVariant,
            height: 1.55,
          ),
        ),
        Gap(16.h),
        if (lang.isNotEmpty) ...[
          CustomRowOverviewTab(
            icon: Icons.language_rounded,
            label: 'course_details.language'.tr(),
            value: lang,
          ),
          Gap(8.h),
        ],
        // A "Last Updated: Recently" row sat here; the course schema has no
        // updatedAt field, so it stated a fact the app cannot know.
        CustomRowOverviewTab(
          icon: Icons.devices_rounded,
          label: 'course_details.access'.tr(),
          value: 'course_details.access_value'.tr(),
        ),
      ],
    );
  }
}
