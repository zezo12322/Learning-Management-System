import 'package:easy_localization/easy_localization.dart';
import 'package:flutter/material.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';
import 'package:gap/gap.dart';
import 'package:optimatech_lms/core/utils/app_text_styles.dart';
import 'package:optimatech_lms/features/courses/domain/entities/courses_entity.dart';

/// Reviews tab. Until the reviews API lands, only the aggregate rating that the
/// catalog already returns is shown; there is no per-review endpoint yet, so the
/// list stays empty rather than displaying sample content as if it were real.
class CourseReviewCard extends StatelessWidget {
  const CourseReviewCard({super.key, required this.course});

  final CourseEntity course;

  @override
  Widget build(BuildContext context) {
    final colorScheme = Theme.of(context).colorScheme;
    final count = course.ratingCount;

    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Row(
          children: [
            Expanded(
              child: Text(
                'course_details.reviews_count'.tr(args: ['$count']),
                style: TextStyles.titleSmall.copyWith(
                  fontSize: 18.sp,
                  color: colorScheme.onSurface,
                ),
              ),
            ),
            if (count > 0)
              Row(
                mainAxisSize: MainAxisSize.min,
                children: [
                  Icon(
                    Icons.star_rounded,
                    size: 18.sp,
                    color: const Color(0xFFFBBF24),
                  ),
                  Gap(4.w),
                  Text(
                    course.avgRating.toStringAsFixed(1),
                    style: TextStyles.labelMedium.copyWith(
                      color: colorScheme.onSurface,
                      fontWeight: FontWeights.semiBold,
                    ),
                  ),
                ],
              ),
          ],
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
                Icons.rate_review_outlined,
                size: 32.sp,
                color: colorScheme.onSurfaceVariant.withValues(alpha: 0.5),
              ),
              Gap(10.h),
              Text(
                'course_details.no_reviews_title'.tr(),
                style: TextStyles.labelMedium.copyWith(
                  color: colorScheme.onSurface,
                  fontWeight: FontWeights.semiBold,
                ),
                textAlign: TextAlign.center,
              ),
              Gap(4.h),
              Text(
                'course_details.no_reviews_body'.tr(),
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
