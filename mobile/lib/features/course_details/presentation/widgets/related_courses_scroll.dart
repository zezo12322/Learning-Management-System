import 'package:flutter/material.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';
import 'package:gap/gap.dart';
import 'package:optimatech_lms/core/utils/app_text_styles.dart';
import 'package:optimatech_lms/features/course_details/presentation/models/course_details_mock_data.dart';

class RelatedCoursesScroll extends StatelessWidget {
  const RelatedCoursesScroll({super.key});

  @override
  Widget build(BuildContext context) {
    final colorScheme = Theme.of(context).colorScheme;
    final courses = CourseDetailsMockData.relatedCourses;

    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Row(
          children: [
            Expanded(
              child: Text(
                'You Might Also Like',
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
        SizedBox(
          height: 210.h,
          child: ListView.builder(
            scrollDirection: Axis.horizontal,
            itemCount: courses.length,
            itemBuilder: (context, index) {
              final course = courses[index];
              return Padding(
                padding: EdgeInsets.only(right: 12.w),
                child: _RelatedCourseCard(course: course),
              );
            },
          ),
        ),
      ],
    );
  }
}

class _RelatedCourseCard extends StatelessWidget {
  const _RelatedCourseCard({required this.course});

  final RelatedCourseItem course;

  @override
  Widget build(BuildContext context) {
    final colorScheme = Theme.of(context).colorScheme;

    return Container(
      width: 160.w,
      decoration: BoxDecoration(
        color: colorScheme.surface,
        borderRadius: BorderRadius.circular(16.r),
        border: Border.all(color: colorScheme.outline),
      ),
      clipBehavior: Clip.antiAlias,
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Container(
            height: 90.h,
            width: double.infinity,
            decoration: BoxDecoration(
              gradient: LinearGradient(
                begin: Alignment.topLeft,
                end: Alignment.bottomRight,
                colors: [
                  course.headerColor,
                  Color.lerp(course.headerColor, Colors.black, 0.15)!,
                ],
              ),
            ),
            child: Stack(
              children: [
                Positioned(
                  top: 10.h,
                  right: 10.w,
                  child: Icon(
                    Icons.bookmark_border_rounded,
                    color: Colors.white.withValues(alpha: 0.9),
                    size: 18.sp,
                  ),
                ),
                Center(
                  child: Icon(
                    course.icon,
                    size: 36.sp,
                    color: Colors.white.withValues(alpha: 0.95),
                  ),
                ),
              ],
            ),
          ),
          Padding(
            padding: EdgeInsets.all(10.w),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text(
                  course.title,
                  style: TextStyles.labelMedium.copyWith(
                    fontWeight: FontWeights.bold,
                    color: colorScheme.onSurface,
                  ),
                  maxLines: 2,
                  overflow: TextOverflow.ellipsis,
                ),
                Gap(6.h),
                Row(
                  children: [
                    Icon(
                      Icons.star_rounded,
                      size: 12.sp,
                      color: const Color(0xFFFBBF24),
                    ),
                    Gap(3.w),
                    Text(
                      '${course.rating} (${course.reviewCount})',
                      style: TextStyles.labelSmall.copyWith(
                        color: colorScheme.onSurfaceVariant,
                        fontSize: 10.sp,
                      ),
                    ),
                  ],
                ),
                Gap(4.h),
                Text(
                  course.duration,
                  style: TextStyles.labelSmall.copyWith(
                    color: colorScheme.onSurfaceVariant,
                    fontSize: 10.sp,
                  ),
                ),
                Gap(6.h),
                Container(
                  padding: EdgeInsets.symmetric(horizontal: 8.w, vertical: 3.h),
                  decoration: BoxDecoration(
                    color: course.headerColor.withValues(alpha: 0.12),
                    borderRadius: BorderRadius.circular(20.r),
                  ),
                  child: Text(
                    course.level,
                    style: TextStyles.labelSmall.copyWith(
                      color: course.headerColor,
                      fontWeight: FontWeights.semiBold,
                      fontSize: 10.sp,
                    ),
                  ),
                ),
              ],
            ),
          ),
        ],
      ),
    );
  }
}
