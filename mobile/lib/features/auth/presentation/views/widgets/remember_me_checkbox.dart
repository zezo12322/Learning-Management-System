import 'package:easy_localization/easy_localization.dart';
import 'package:flutter/material.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';
import 'package:optimatech_lms/core/utils/app_text_styles.dart';
import 'package:optimatech_lms/core/utils/extension.dart';
import 'package:gap/gap.dart';


class RememberMeCheckbox  extends StatelessWidget {
  const RememberMeCheckbox ({super.key, required this.value, required this.onChanged});

  final bool value;
  final ValueChanged<bool> onChanged;
  @override
  Widget build(BuildContext context) {
    return GestureDetector(
      onTap: () => onChanged(!value),
      behavior: HitTestBehavior.opaque,
      child: Row(
        mainAxisSize: MainAxisSize.min,
        children: [
          AnimatedContainer(
            duration: const Duration(milliseconds: 180),
            width: 20.r,
            height: 20.r,
            decoration: BoxDecoration(
              color: value ? context.theme.colorScheme.primary : Colors.transparent,
              border:  Border.all(
                color: value
                    ? context.theme.colorScheme.primary
                    : context.theme.colorScheme.outline,
                width: 1.5,
              ),
              borderRadius: BorderRadius.circular(4.r),
            ),
            child: value
                ? Icon(
              Icons.check_rounded,
              color: Colors.white,
              size: 16.r,
            )
                : null,
          ),
          Gap(8.w),
          Text(
            'auth.login_screen.remember_me'.tr(),
            style: context.textTheme.labelMedium?.copyWith(
                fontWeight: FontWeights.bold
            ),
          ),
        ],
      ),
    );
  }
}
