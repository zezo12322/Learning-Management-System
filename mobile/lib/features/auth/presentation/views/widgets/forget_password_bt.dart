import 'package:easy_localization/easy_localization.dart';
import 'package:flutter/material.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';
import 'package:optimatech_lms/core/utils/app_text_styles.dart';
import 'package:optimatech_lms/core/utils/extension.dart';

class ForgetPasswordBt extends StatelessWidget {
  const ForgetPasswordBt({
    super.key, required this.onPressed,
  });

  final VoidCallback onPressed;
  @override
  Widget build(BuildContext context) {
    return TextButton(
      onPressed: onPressed,
      style: TextButton.styleFrom(
        padding: EdgeInsets.symmetric(horizontal: 8.w),
        tapTargetSize: MaterialTapTargetSize.shrinkWrap,
      ),
      child: Text(
        'auth.login_screen.forgot_password'.tr(),
        style: context.textTheme.labelMedium?.copyWith(
          color: context.theme.colorScheme.primary,
          fontWeight: FontWeights.bold,
        ),
      ),
    );
  }
}