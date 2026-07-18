import 'package:easy_localization/easy_localization.dart';
import 'package:flutter/material.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';
import 'package:gap/gap.dart';
import 'package:optimatech_lms/core/utils/app_colors.dart';
import 'package:optimatech_lms/core/utils/extension.dart';

class LessonAboutSection extends StatelessWidget {
  const LessonAboutSection({super.key});

  @override
  Widget build(BuildContext context) {
    final primary = context.theme.colorScheme.primary;

    return Container(
      padding: EdgeInsets.all(16.r),
      decoration: BoxDecoration(
        color: AppColors.disableBackground.withValues(alpha: 0.5),
        borderRadius: BorderRadius.circular(20.r),
      ),
      child: Row(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Expanded(
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text(
                  'lesson_learning.about.title'.tr(),
                  style: context.textTheme.titleSmall?.copyWith(fontSize: 18.sp),
                ),
                Gap(8.h),
                Text(
                  'lesson_learning.about.description'.tr(),
                  style: context.textTheme.bodyMedium?.copyWith(
                    color: context.theme.colorScheme.onSurfaceVariant,
                  ),
                ),
              ],
            ),
          ),
          Gap(12.w),
          _AboutIllustration(primary: primary),
        ],
      ),
    );
  }
}

class _AboutIllustration extends StatelessWidget {
  const _AboutIllustration({required this.primary});
  final Color primary;

  @override
  Widget build(BuildContext context) {
    return SizedBox(
      width: 84.w,
      height: 84.w,
      child: Stack(
        alignment: Alignment.center,
        children: [
          Icon(Icons.assignment_rounded, color: primary.withValues(alpha: 0.85), size: 64.sp),
          Positioned(
            left: 0,
            bottom: 0,
            child: Icon(
              Icons.local_florist_rounded,
              color: AppColors.success.withValues(alpha: 0.8),
              size: 26.sp,
            ),
          ),
        ],
      ),
    );
  }
}