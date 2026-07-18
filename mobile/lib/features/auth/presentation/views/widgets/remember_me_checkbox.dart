import 'package:easy_localization/easy_localization.dart';
import 'package:flutter/material.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';
import 'package:optimatech_lms/core/utils/app_text_styles.dart';
import 'package:optimatech_lms/core/utils/extension.dart';
import 'package:gap/gap.dart';
import 'package:optimatech_lms/features/auth/presentation/views/widgets/custom_checkbox.dart';


class RememberMeCheckbox  extends StatelessWidget {
  const RememberMeCheckbox ({super.key, required this.value, required this.onChanged});

  final bool value;
  final ValueChanged<bool> onChanged;
  @override
  Widget build(BuildContext context) {
    return Row(
      mainAxisSize: MainAxisSize.min,
      children: [
        CustomCheckbox(
          value: value,
          onChanged: onChanged,
        ),
        Gap(8.w),
        Text(
          'auth.login_screen.remember_me'.tr(),
          style: context.textTheme.labelMedium?.copyWith(
              fontWeight: FontWeights.bold
          ),
        ),
      ],
    );
  }
}
