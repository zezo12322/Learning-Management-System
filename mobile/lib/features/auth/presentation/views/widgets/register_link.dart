import 'package:easy_localization/easy_localization.dart';
import 'package:flutter/material.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';
import 'package:optimatech_lms/core/utils/app_text_styles.dart';
import 'package:optimatech_lms/core/utils/extension.dart';
import 'package:gap/gap.dart';

class RegisterLink extends StatelessWidget {
  const RegisterLink({
    super.key,
    required this.onTap,
  });

  final VoidCallback onTap;
  @override
  Widget build(BuildContext context) {
    return Center(
      child: Row(
        mainAxisSize: MainAxisSize.min,
        children: [
          Text(
            'auth.login_screen.no_account'.tr(),
            style: context.textTheme.bodySmall?.copyWith(
                fontWeight: FontWeights.bold
            ),
          ),
          Gap(4.w),
          GestureDetector(
            onTap: onTap,
            child: Row(
              mainAxisSize: MainAxisSize.min,
              children: [
                Text(
                  'auth.login_screen.register'.tr(),
                  style: context.textTheme.bodySmall?.copyWith(
                    color: context.theme.colorScheme.primary,
                    fontWeight: FontWeights.bold,
                  ),
                ),
                Gap(2.w),
                Icon(
                    Icons.arrow_forward_ios_rounded,
                    size: 12.r,
                    color: context.theme.colorScheme.primary
                ),
              ],
            ),
          ),
        ],
      ),
    );
  }
}
