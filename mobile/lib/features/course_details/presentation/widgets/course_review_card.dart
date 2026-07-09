import 'package:flutter/material.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';
import 'package:gap/gap.dart';
import 'package:optimatech_lms/core/utils/app_text_styles.dart';
import 'package:optimatech_lms/features/course_details/presentation/models/course_details_mock_data.dart';

class CourseReviewCard extends StatelessWidget {
  const CourseReviewCard({super.key});

  @override
  Widget build(BuildContext context) {
    final colorScheme = Theme.of(context).colorScheme;

    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Row(
          children: [
            Expanded(
              child: Text(
                'Reviews (${CourseDetailsMockData.reviewCount})',
                style: TextStyles.titleSmall.copyWith(
                  fontSize: 18.sp,
                  color: colorScheme.onSurface,
                ),
              ),
            ),
            InkWell(
              onTap: () {},
              borderRadius: BorderRadius.circular(8.r),
              child: Padding(
                padding: EdgeInsets.symmetric(horizontal: 4.w, vertical: 4.h),
                child: Row(
                  mainAxisSize: MainAxisSize.min,
                  children: [
                    Text(
                      'View All',
                      style: TextStyles.labelMedium.copyWith(
                        color: colorScheme.primary,
                        fontWeight: FontWeights.medium,
                      ),
                    ),
                    Icon(
                      Icons.chevron_right_rounded,
                      size: 18.sp,
                      color: colorScheme.primary,
                    ),
                  ],
                ),
              ),
            ),
          ],
        ),
        Gap(12.h),
        Container(
          width: double.infinity,
          padding: EdgeInsets.all(14.w),
          decoration: BoxDecoration(
            color: colorScheme.surface,
            borderRadius: BorderRadius.circular(16.r),
            border: Border.all(color: colorScheme.outline),
          ),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Row(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  CircleAvatar(
                    radius: 20.r,
                    backgroundColor:
                        colorScheme.primary.withValues(alpha: 0.12),
                    child: Icon(
                      Icons.person_rounded,
                      size: 20.sp,
                      color: colorScheme.primary,
                    ),
                  ),
                  Gap(10.w),
                  Expanded(
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        Row(
                          children: [
                            Text(
                              'Alex Johnson',
                              style: TextStyles.labelMedium.copyWith(
                                fontWeight: FontWeights.bold,
                                color: colorScheme.onSurface,
                              ),
                            ),
                            Gap(8.w),
                            ...List.generate(
                              5,
                              (index) => Icon(
                                Icons.star_rounded,
                                size: 14.sp,
                                color: const Color(0xFFFBBF24),
                              ),
                            ),
                            Gap(4.w),
                            Text(
                              '5.0',
                              style: TextStyles.labelSmall.copyWith(
                                color: colorScheme.onSurfaceVariant,
                                fontWeight: FontWeights.semiBold,
                              ),
                            ),
                          ],
                        ),
                        Gap(2.h),
                        Text(
                          'May 12, 2025',
                          style: TextStyles.labelSmall.copyWith(
                            color: colorScheme.onSurfaceVariant,
                          ),
                        ),
                      ],
                    ),
                  ),
                ],
              ),
              Gap(10.h),
              Text(
                'Amazing course! The content is well-structured and easy to follow. '
                'It helped me improve my design skills significantly.',
                style: TextStyles.bodySmall.copyWith(
                  color: colorScheme.onSurfaceVariant,
                  height: 1.5,
                ),
              ),
            ],
          ),
        ),
      ],
    );
  }
}
