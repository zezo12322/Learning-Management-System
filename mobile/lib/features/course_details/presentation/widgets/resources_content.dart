import 'package:easy_localization/easy_localization.dart';
import 'package:flutter/material.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';
import 'package:gap/gap.dart';
import 'package:optimatech_lms/core/utils/app_text_styles.dart';

/// Resources tab. The course schema has no attachments yet, so this shows an
/// empty state. It previously rendered four fixed sample files ("Course
/// Slides — PDF • 2.4 MB", "Figma Template", …) with download affordances that
/// listed material no course actually has.
class ResourcesContent extends StatelessWidget {
  const ResourcesContent({super.key});

  @override
  Widget build(BuildContext context) {
    final colorScheme = Theme.of(context).colorScheme;

    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Text(
          'course_details.resources_title'.tr(),
          style: TextStyles.titleSmall.copyWith(
            fontSize: 18.sp,
            color: colorScheme.onSurface,
          ),
        ),
        Gap(12.h),
        Container(
          width: double.infinity,
          padding: EdgeInsets.symmetric(horizontal: 16.w, vertical: 24.h),
          decoration: BoxDecoration(
            color: colorScheme.surface,
            borderRadius: BorderRadius.circular(12.r),
            border: Border.all(color: colorScheme.outline),
          ),
          child: Column(
            children: [
              Icon(
                Icons.folder_open_rounded,
                size: 32.sp,
                color: colorScheme.onSurfaceVariant.withValues(alpha: 0.5),
              ),
              Gap(10.h),
              Text(
                'course_details.no_resources_title'.tr(),
                style: TextStyles.labelMedium.copyWith(
                  color: colorScheme.onSurface,
                  fontWeight: FontWeights.semiBold,
                ),
                textAlign: TextAlign.center,
              ),
              Gap(4.h),
              Text(
                'course_details.no_resources_body'.tr(),
                style: TextStyles.bodySmall.copyWith(
                  color: colorScheme.onSurfaceVariant,
                ),
                textAlign: TextAlign.center,
              ),
            ],
          ),
        ),
      ],
    );
  }
}
