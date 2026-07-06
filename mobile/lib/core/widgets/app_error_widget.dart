import 'package:easy_localization/easy_localization.dart';
import 'package:flutter/material.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';
import 'package:optimatech_lms/core/utils/extension.dart';
import 'package:optimatech_lms/core/widgets/primary_button.dart';

class AppErrorWidget extends StatelessWidget {
  const AppErrorWidget({
    super.key,
    required this.onRetry,
    this.message,
    this.icon = Icons.error_outline_rounded,
  });
  
  final String? message;
  final VoidCallback onRetry;
  final IconData icon;

  @override
  Widget build(BuildContext context) {
    return Center(
      child: Padding(
        padding: EdgeInsets.symmetric(horizontal: 24.w),
        child: Column(
          mainAxisSize: MainAxisSize.min,
          children: [
            Container(
              width: 72.w,
              height: 72.w,
              decoration: BoxDecoration(
                color: context.theme.colorScheme.error.withAlpha(26),
                shape: BoxShape.circle,
              ),
              child: Icon(
                icon,
                size: 32.r,
                color: context.theme.colorScheme.error,
              ),
            ),
            SizedBox(height: 16.h),
            Text(
              'common.error_widget.title'.tr(),
              style: context.textTheme.titleSmall,
              textAlign: TextAlign.center,
            ),
            SizedBox(height: 8.h),
            Text(
              //message ?? 'common.error_widget.default_message'.tr(),
              'common.error_widget.default_message'.tr(),
              style: context.textTheme.bodyMedium?.copyWith(
                color: context.theme.colorScheme.onSurfaceVariant,
              ),
              textAlign: TextAlign.center,
            ),
            SizedBox(height: 24.h),
            SizedBox(
              width: 180.w,
              child: PrimaryButton(
                text: 'common.error_widget.retry_button'.tr(),
                onPressed: onRetry,
              ),
            ),
          ],
        ),
      ),
    );
  }
}