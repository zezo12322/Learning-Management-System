import 'package:easy_localization/easy_localization.dart';
import 'package:flutter/material.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';
import 'package:optimatech_lms/core/utils/app_text_styles.dart';

class HomeSectionHeader extends StatelessWidget {
  const HomeSectionHeader({
    super.key,
    required this.title,
    this.onViewAllTap,
  });

  final String title;
  final VoidCallback? onViewAllTap;

  @override
  Widget build(BuildContext context) {
    return Row(
      children: [
        Expanded(
          child: Text(
            title,
            style: TextStyles.titleSmall.copyWith(
              fontSize: 18.sp,
              color: Theme.of(context).colorScheme.onSurface,
            ),
          ),
        ),
        InkWell(
          onTap: onViewAllTap,
          borderRadius: BorderRadius.circular(8.r),
          child: Padding(
            padding: EdgeInsets.symmetric(horizontal: 4.w, vertical: 4.h),
            child: Row(
              mainAxisSize: MainAxisSize.min,
              children: [
                Text(
                  'home.view_all'.tr(),
                  style: TextStyles.labelMedium.copyWith(
                    color: Theme.of(context).colorScheme.primary,
                    fontWeight: FontWeights.medium,
                  ),
                ),
                Icon(
                  Icons.chevron_right_rounded,
                  size: 18.sp,
                  color: Theme.of(context).colorScheme.primary,
                ),
              ],
            ),
          ),
        ),
      ],
    );
  }
}
