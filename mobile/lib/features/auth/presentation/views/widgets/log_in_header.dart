import 'package:easy_localization/easy_localization.dart' as easy;
import 'package:flutter/material.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';
import 'package:optimatech_lms/core/services/language_service.dart';
import 'package:optimatech_lms/core/utils/app_text_styles.dart';
import 'package:optimatech_lms/core/utils/extension.dart';
import 'package:gap/gap.dart';

class LogInHeader extends StatelessWidget {
  const LogInHeader({super.key});

  @override
  Widget build(BuildContext context) {
    final topPadding = MediaQuery.of(context).padding.top;

    return Container(
      width: double.infinity,
      padding: EdgeInsets.only(
        top: topPadding + 16.h,
        left: 16.w,
      ),
      child: SizedBox(
        height: 250.h,
        child: Stack(
          clipBehavior: Clip.none,
          children: [
            Positioned(
              left: 0,
              top: 12.h,
              child: Column(
                crossAxisAlignment: !LanguageService.isArabic(context)
                    ? CrossAxisAlignment.start
                    : CrossAxisAlignment.end,
                children: [
                  Directionality(
                    textDirection: TextDirection.ltr,
                    child: Row(
                      children: [
                        // App logo PNG
                        Image.asset(
                          'assets/icons/app_icon.png',
                          width: 40.r,
                          height: 40.r,
                          fit: BoxFit.contain,
                        ),
                        Gap(10.w),
                        Column(
                          crossAxisAlignment: CrossAxisAlignment.start,
                          children: [
                            Text(
                              'app_name'.tr(),
                              style: context.textTheme.labelLarge?.copyWith(
                                fontWeight: FontWeights.bold,
                              ),
                            ),
                            Text(
                              'Learn. Grow. Succeed.',
                              style: context.textTheme.bodySmall?.copyWith(
                                color: context.theme.colorScheme.onSurfaceVariant,
                              ),
                            ),
                          ],
                        ),
                      ],
                    ),
                  ),
                  Gap(20.h),
                  Text(
                    'auth.login_screen.welcome'.tr(),
                    style: context.textTheme.displayLarge?.copyWith(height: 1),
                  ),
                  Gap(10.h),
                  Text(
                    'auth.login_screen.subtitle'.tr(),
                    style: context.textTheme.bodyMedium?.copyWith(
                      color: context.theme.colorScheme.onSurfaceVariant,
                    ),
                  ),
                ],
              ),
            ),
            Positioned(
              right: 0,
              bottom: 0,
              child: Image.asset(
                'assets/images/login_illustrator.png',
                width: 250.w,
                height: 240.h,
                fit: BoxFit.cover,
              ),
            ),
          ],
        ),
      ),
    );
  }
}