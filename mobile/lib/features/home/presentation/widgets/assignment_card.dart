import 'package:flutter/material.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';
import 'package:gap/gap.dart';
import 'package:optimatech_lms/core/utils/app_colors.dart';
import 'package:optimatech_lms/core/utils/app_text_styles.dart';

class AssignmentCard extends StatelessWidget {
  const AssignmentCard({
    super.key,
    required this.count,
    required this.status,
    required this.description,
    required this.icon,
    required this.iconColor,
    this.onTap,
  });

  final int count;
  final String status;
  final String description;
  final IconData icon;
  final Color iconColor;
  final VoidCallback? onTap;

  @override
  Widget build(BuildContext context) {
    return Material(
      color: AppColors.surface,
      borderRadius: BorderRadius.circular(18.r),
      child: InkWell(
        onTap: onTap,
        borderRadius: BorderRadius.circular(18.r),
        child: Container(
          width: 148.w,
          padding: EdgeInsets.all(16.w),
          decoration: BoxDecoration(
            borderRadius: BorderRadius.circular(18.r),
            border: Border.all(color: AppColors.border),
          ),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Row(
                children: [
                  Container(
                    width: 36.w,
                    height: 36.w,
                    decoration: BoxDecoration(
                      color: iconColor.withValues(alpha: 0.12),
                      borderRadius: BorderRadius.circular(10.r),
                    ),
                    child: Icon(
                      icon,
                      size: 20.sp,
                      color: iconColor,
                    ),
                  ),
                  Gap(10.w),
                  Text(
                    '$count',
                    style: TextStyles.titleSmall.copyWith(
                      fontSize: 28.sp,
                      fontWeight: FontWeights.bold,
                      color: AppColors.textPrimary,
                      height: 1,
                    ),
                  ),
                ],
              ),
              Gap(14.h),
              Text(
                status,
                style: TextStyles.labelLarge.copyWith(
                  fontWeight: FontWeights.bold,
                  color: AppColors.textPrimary,
                ),
              ),
              Gap(4.h),
              Text(
                description,
                style: TextStyles.labelSmall.copyWith(
                  color: AppColors.textSecondary,
                ),
                maxLines: 2,
                overflow: TextOverflow.ellipsis,
              ),
            ],
          ),
        ),
      ),
    );
  }
}
