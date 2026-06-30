import 'package:flutter/material.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';
import 'package:gap/gap.dart';
import 'package:optimatech_lms/core/utils/app_colors.dart';
import 'package:optimatech_lms/core/utils/app_text_styles.dart';

class PopularCourseCard extends StatelessWidget {
  const PopularCourseCard({
    super.key,
    required this.title,
    required this.studentCount,
    required this.rating,
    required this.headerColor,
    required this.icon,
    this.onTap,
  });

  final String title;
  final String studentCount;
  final double rating;
  final Color headerColor;
  final IconData icon;
  final VoidCallback? onTap;

  @override
  Widget build(BuildContext context) {
    return Material(
      color: AppColors.surface,
      borderRadius: BorderRadius.circular(18.r),
      clipBehavior: Clip.antiAlias,
      child: InkWell(
        onTap: onTap,
        child: Container(
          width: 168.w,
          decoration: BoxDecoration(
            borderRadius: BorderRadius.circular(18.r),
            border: Border.all(color: AppColors.border),
          ),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              _CourseHeader(
                color: headerColor,
                rating: rating,
                icon: icon,
              ),
              Padding(
                padding: EdgeInsets.fromLTRB(12.w, 12.h, 12.w, 14.h),
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Text(
                      title,
                      style: TextStyles.labelLarge.copyWith(
                        fontSize: 14.sp,
                        fontWeight: FontWeights.bold,
                        color: AppColors.textPrimary,
                      ),
                      maxLines: 2,
                      overflow: TextOverflow.ellipsis,
                    ),
                    Gap(8.h),
                    Row(
                      children: [
                        Icon(
                          Icons.people_outline_rounded,
                          size: 14.sp,
                          color: AppColors.textSecondary,
                        ),
                        Gap(4.w),
                        Expanded(
                          child: Text(
                            studentCount,
                            style: TextStyles.labelSmall.copyWith(
                              color: AppColors.textSecondary,
                            ),
                            maxLines: 1,
                            overflow: TextOverflow.ellipsis,
                          ),
                        ),
                      ],
                    ),
                  ],
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }
}

class _CourseHeader extends StatelessWidget {
  const _CourseHeader({
    required this.color,
    required this.rating,
    required this.icon,
  });

  final Color color;
  final double rating;
  final IconData icon;

  @override
  Widget build(BuildContext context) {
    return Container(
      height: 96.h,
      width: double.infinity,
      decoration: BoxDecoration(
        color: color,
        borderRadius: BorderRadius.vertical(top: Radius.circular(18.r)),
      ),
      child: Stack(
        children: [
          Center(
            child: Icon(
              icon,
              size: 40.sp,
              color: Colors.white.withValues(alpha: 0.9),
            ),
          ),
          Positioned(
            top: 10.h,
            right: 10.w,
            child: Container(
              padding: EdgeInsets.symmetric(horizontal: 8.w, vertical: 4.h),
              decoration: BoxDecoration(
                color: Colors.white,
                borderRadius: BorderRadius.circular(20.r),
              ),
              child: Row(
                mainAxisSize: MainAxisSize.min,
                children: [
                  Icon(
                    Icons.star_rounded,
                    size: 14.sp,
                    color: AppColors.warning,
                  ),
                  Gap(2.w),
                  Text(
                    rating.toStringAsFixed(1),
                    style: TextStyles.labelSmall.copyWith(
                      color: AppColors.textPrimary,
                      fontWeight: FontWeights.semiBold,
                    ),
                  ),
                ],
              ),
            ),
          ),
        ],
      ),
    );
  }
}
