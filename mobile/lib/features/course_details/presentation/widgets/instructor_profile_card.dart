import 'package:easy_localization/easy_localization.dart';
import 'package:flutter/material.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';
import 'package:gap/gap.dart';
import 'package:optimatech_lms/core/utils/app_text_styles.dart';
import 'package:optimatech_lms/features/courses/domain/entities/courses_entity.dart';

class InstructorProfileCard extends StatelessWidget {
  const InstructorProfileCard({super.key, this.instructor});

  final CourseInstructorEntity? instructor;

  @override
  Widget build(BuildContext context) {
    final colorScheme = Theme.of(context).colorScheme;

    return Container(
      padding: EdgeInsets.all(14.w),
      decoration: BoxDecoration(
        color: colorScheme.surface,
        borderRadius: BorderRadius.circular(16.r),
        border: Border.all(color: colorScheme.outline),
      ),
      child: Row(
        children: [
          CircleAvatar(
            radius: 28.r,
            backgroundColor: colorScheme.primary.withValues(alpha: 0.12),
            backgroundImage: instructor?.avatar != null
                ? NetworkImage(instructor!.avatar!)
                : null,
            child: instructor?.avatar == null
                ? Icon(
                    Icons.person_rounded,
                    size: 28.sp,
                    color: colorScheme.primary,
                  )
                : null,
          ),
          Gap(12.w),
          Expanded(
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Row(
                  children: [
                    Flexible(
                      child: Text(
                        instructor?.name ?? 'Instructor User',
                        style: TextStyles.labelLarge.copyWith(
                          fontWeight: FontWeights.bold,
                          color: colorScheme.onSurface,
                        ),
                        overflow: TextOverflow.ellipsis,
                      ),
                    ),
                    Gap(4.w),
                    Icon(
                      Icons.verified_rounded,
                      size: 16.sp,
                      color: colorScheme.secondary,
                    ),
                  ],
                ),
                Gap(2.h),
                Text(
                  // TODO: Replace with actual instructor title when available
                  'UI/ UX Designer',
                  style: TextStyles.bodySmall.copyWith(
                    color: colorScheme.onSurfaceVariant,
                  ),
                ),
                Gap(6.h),
                Container(
                  padding: EdgeInsets.symmetric(horizontal: 8.w, vertical: 3.h),
                  decoration: BoxDecoration(
                    color: colorScheme.secondary.withValues(alpha: 0.12),
                    borderRadius: BorderRadius.circular(20.r),
                  ),
                  child: Row(
                    mainAxisSize: MainAxisSize.min,
                    children: [
                      Icon(
                        Icons.star_rounded,
                        size: 12.sp,
                        color: colorScheme.secondary,
                      ),
                      Gap(4.w),
                      Text(
                        'course_details.top_instructor'.tr(),
                        style: TextStyles.labelSmall.copyWith(
                          color: colorScheme.secondary,
                          fontWeight: FontWeights.semiBold,
                        ),
                      ),
                    ],
                  ),
                ),
              ],
            ),
          ),
          Gap(8.w),
          OutlinedButton(
            onPressed: () {},
            style: OutlinedButton.styleFrom(
              minimumSize: Size(0, 36.h),
              padding: EdgeInsets.symmetric(horizontal: 12.w),
              side:
                  BorderSide(color: colorScheme.primary.withValues(alpha: 0.4)),
              foregroundColor: colorScheme.primary,
              shape: RoundedRectangleBorder(
                borderRadius: BorderRadius.circular(10.r),
              ),
            ),
            child: Text(
              'course_details.view_profile'.tr(),
              style: TextStyles.labelSmall.copyWith(
                color: colorScheme.primary,
                fontWeight: FontWeights.semiBold,
              ),
            ),
          ),
        ],
      ),
    );
  }
}
