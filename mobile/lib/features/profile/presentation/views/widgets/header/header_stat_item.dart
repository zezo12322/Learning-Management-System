import 'package:easy_localization/easy_localization.dart';
import 'package:flutter/material.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';
import 'package:gap/gap.dart';
import 'package:optimatech_lms/core/utils/extension.dart';

class HeaderStatItem extends StatelessWidget {
  const HeaderStatItem({super.key, required this.data});

  final HeaderStatData data;

  @override
  Widget build(BuildContext context) {
    return Column(
      children: [
        Container(
          width: 42.w,
          height: 42.w,
          decoration: BoxDecoration(
            color: context.theme.colorScheme.primary.withAlpha(14),
            shape: BoxShape.circle,
          ),
          child: Icon(
            data.icon,
            color: context.theme.colorScheme.primary,
            size: 20.sp,
          ),
        ),
        Gap(10.h),
        Text(
          data.value,
          style: context.textTheme.titleSmall?.copyWith(
            fontWeight: FontWeight.w700,
          ),
        ),
        Gap(4.h),
        Text(
          data.titleKey.tr(),
          textAlign: TextAlign.center,
          style: context.textTheme.labelSmall?.copyWith(
            color: context.theme.colorScheme.onSurfaceVariant,
            fontWeight: FontWeight.w600,
            overflow: TextOverflow.ellipsis,
          ),
          maxLines: 2,
        ),
        //Gap(4.h),
        // Text(
        //   data.subtitleKey.tr(),
        //   textAlign: TextAlign.center,
        //   style: context.textTheme.labelSmall?.copyWith(
        //     color: data.subtitleColor,
        //     fontWeight: FontWeight.w600,
        //   ),
        // ),
      ],
    );
  }
}

class HeaderStatData {
  final IconData icon;
  final String value;
  final String titleKey;
  //final String subtitleKey;
  //final Color subtitleColor;

  const HeaderStatData({
    required this.icon,
    required this.value,
    required this.titleKey,
    //required this.subtitleKey,
    //required this.subtitleColor,
  });
}