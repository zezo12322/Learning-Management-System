import 'package:flutter/material.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';
import 'package:optimatech_lms/core/utils/app_colors.dart';
import 'package:optimatech_lms/core/utils/app_text_styles.dart';
import 'package:optimatech_lms/core/utils/extension.dart';

class SplashHeaderSection extends StatelessWidget {
  const SplashHeaderSection({super.key});

  @override
  Widget build(BuildContext context) {
    return Column(
      children: [
        SizedBox(height: 60.h),
        // Logo placeholder — replace with your SVG asset
        Container(
          width: 72.w,
          height: 72.w,
          decoration: BoxDecoration(
            color: AppColors.primary,
            borderRadius: BorderRadius.circular(18.r),
          ),
          child: Icon(
            Icons.school_rounded,
            color: Colors.white,
            size: 40.sp,
          ),
        ),
        SizedBox(height: 16.h),
        Text(
          'OptimaTech',
          style: TextStyles.titleLarge,
        ),
        SizedBox(height: 6.h),
        Text(
          'Learn. Grow. Succeed.',
          style: TextStyles.labelSmall.copyWith(
            color: context.theme.colorScheme.onSurfaceVariant,
          ),
        ),
      ],
    );
  }
}
