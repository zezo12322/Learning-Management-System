import 'package:easy_localization/easy_localization.dart';
import 'package:flutter/material.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';
import 'package:gap/gap.dart';
import 'package:optimatech_lms/core/utils/extension.dart';

class ProfileHeaderInfo extends StatelessWidget {
  const ProfileHeaderInfo({
    super.key,
  });

  @override
  Widget build(BuildContext context) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Text(
          'Sarah Johnson',
          style: context.textTheme.titleSmall?.copyWith(
            fontSize: 18.sp,
            fontWeight: FontWeight.w700,
          ),
        ),
        Gap(10.h),
        Container(
          padding: EdgeInsets.symmetric(
            horizontal: 10.w,
            vertical: 6.h,
          ),
          decoration: BoxDecoration(
            color: context.theme.colorScheme.primary.withAlpha(18),
            borderRadius: BorderRadius.circular(12.r),
          ),
          child: Row(
            mainAxisSize: MainAxisSize.min,
            children: [
              Icon(
                Icons.school_outlined,
                size: 14.sp,
                color: context.theme.colorScheme.primary,
              ),
              Gap(6.w),
              Text(
                'profile.header.role'.tr(),
                style: context.textTheme.labelMedium?.copyWith(
                  color: context.theme.colorScheme.primary,
                  fontWeight: FontWeight.w600,
                ),
              ),
            ],
          ),
        ),
        Gap(12.h),
        Row(
          children: [
            Icon(
              Icons.calendar_today_outlined,
              size: 16.sp,
              color: context.theme.colorScheme.onSurfaceVariant,
            ),
            Gap(8.w),
            Expanded(
              child: Text(
                'profile.header.joined'.tr(),
                style: context.textTheme.bodyMedium?.copyWith(
                  color: context.theme.colorScheme.onSurfaceVariant,
                  fontWeight: FontWeight.w600,
                ),
              ),
            ),
          ],
        ),
      ],
    );
  }
}
