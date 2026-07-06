import 'package:easy_localization/easy_localization.dart' as easy;
import 'package:flutter/material.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';
import 'package:gap/gap.dart';
import 'package:optimatech_lms/core/services/language_service.dart';
import 'package:optimatech_lms/core/utils/app_text_styles.dart';
import 'package:optimatech_lms/core/utils/extension.dart';

class SignupHeader extends StatelessWidget {
  const SignupHeader({
    super.key,
  });

  @override
  Widget build(BuildContext context) {
    return Container(
      width: double.infinity,
      padding: EdgeInsets.only(
        left: 16.w,
      ),
      child: SizedBox(
        height: 200.h,
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
                  Gap(10.h),
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
                        Gap(5.w),
                        Text(
                          'app_name'.tr(),
                          style: context.textTheme.labelMedium?.copyWith(
                            fontWeight: FontWeights.bold,
                          ),
                        ),
                      ],
                    ),
                  ),
                  Gap(20.h),
                  Text(
                    'auth.signup_screen.create_account'.tr(),
                    style: context.textTheme.titleLarge?.copyWith(height: 1),
                  ),
                  Gap(10.h),
                  Text(
                    'auth.signup_screen.subtitle'.tr(),
                    style: context.textTheme.labelSmall?.copyWith(
                      color: context.theme.colorScheme.onSurfaceVariant,
                      fontWeight: FontWeights.semiBold,
                    ),
                  ),
                ],
              ),
            ),
            Positioned(
              right: 0,
              top: 0,
              child: Image.asset('assets/images/signup_illillustrator.png',
                width: 200.w,
                height: 200.h,
                fit: BoxFit.cover,
              ),
            ),
          ],
        ),
      ),
    );
  }
}
