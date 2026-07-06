import 'package:flutter/material.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';
import 'package:optimatech_lms/core/utils/app_text_styles.dart';

class NotificationButton extends StatelessWidget {
  const NotificationButton({
    super.key,
    required this.count,
    this.onTap,
  });

  final int count;
  final VoidCallback? onTap;

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);
    final colorScheme = theme.colorScheme;

    return InkWell(
      onTap: onTap,
      borderRadius: BorderRadius.circular(12.r),
      child: Padding(
        padding: EdgeInsets.all(8.w),
        child: Stack(
          clipBehavior: Clip.none,
          children: [
            Icon(
              Icons.notifications_none_rounded,
              size: 26.sp,
              color: colorScheme.onSurface,
            ),
            if (count > 0)
              Positioned(
                top: -4.h,
                right: -4.w,
                child: Container(
                  padding: EdgeInsets.symmetric(horizontal: 5.w, vertical: 2.h),
                  decoration: BoxDecoration(
                    color: colorScheme.primary,
                    borderRadius: BorderRadius.circular(10.r),
                  ),
                  constraints: BoxConstraints(minWidth: 18.w),
                  child: Text(
                    '$count',
                    textAlign: TextAlign.center,
                    style: TextStyles.labelSmall.copyWith(
                      color: colorScheme.onPrimary,
                      fontSize: 10.sp,
                      fontWeight: FontWeights.semiBold,
                    ),
                  ),
                ),
              ),
          ],
        ),
      ),
    );
  }
}
