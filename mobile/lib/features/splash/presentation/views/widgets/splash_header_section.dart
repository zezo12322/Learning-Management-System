import 'package:flutter/material.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';
import 'package:gap/gap.dart';
import 'package:optimatech_lms/core/utils/app_text_styles.dart';
import 'package:optimatech_lms/core/utils/extension.dart';
import 'package:optimatech_lms/core/widgets/app_icon.dart';

class SplashHeaderSection extends StatelessWidget {
  const SplashHeaderSection({super.key});

  @override
  Widget build(BuildContext context) {
    return Column(
      children: [
        Gap(60.h),
        appLogo(width: 72.r, height: 72.r),
        Gap(8.h),
        Text(
          'OptimaTech',
          style: TextStyles.titleLarge,
        ),
        Gap(4.h),
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
