import 'package:easy_localization/easy_localization.dart';
import 'package:flutter/material.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';
import 'package:gap/gap.dart';
import 'package:optimatech_lms/core/utils/extension.dart';

class ProfileSettingTile extends StatelessWidget {
  const ProfileSettingTile({
    super.key,
    required this.data,
    this.showDivider = true,
    required this.onTap,
  });

  final ProfileSettingTileData data;
  final bool showDivider;
  final VoidCallback onTap;
  @override
  Widget build(BuildContext context) {
    final color = data.isDestructive
        ? context.theme.colorScheme.error
        : context.theme.colorScheme.onSurface;

    return Column(
      children: [
        InkWell(
          onTap: onTap,
          borderRadius: BorderRadius.circular(20.r),
          child: Padding(
            padding: EdgeInsets.symmetric(horizontal: 14.w, vertical: 8.h),
            child: Row(
              children: [
                Container(
                  width: 38.w,
                  height: 38.w,
                  decoration: BoxDecoration(
                    color: data.isDestructive
                        ? context.theme.colorScheme.error.withAlpha(12)
                        : context.theme.colorScheme.primary.withAlpha(10),
                    borderRadius: BorderRadius.circular(12.r),
                  ),
                  child: Icon(
                    data.icon,
                    size: 20.sp,
                    color: data.isDestructive
                        ? context.theme.colorScheme.error
                        : context.theme.colorScheme.primary,
                  ),
                ),
                Gap(12.w),
                Expanded(
                  child: Text(
                    data.titleKey.tr(),
                    style: context.textTheme.labelLarge?.copyWith(
                      color: color,
                      fontWeight: FontWeight.w600,
                    ),
                  ),
                ),
                Icon(
                  Icons.chevron_right_rounded,
                  color: context.theme.colorScheme.onSurfaceVariant,
                ),
              ],
            ),
          ),
        ),
        if (showDivider)
          Divider(
            height: 1,
            color: context.theme.colorScheme.outline.withAlpha(80),
          ),
      ],
    );
  }
}

class ProfileSettingTileData {
  final IconData icon;
  final String titleKey;
  final bool isDestructive;

  const ProfileSettingTileData({
    required this.icon,
    required this.titleKey,
    this.isDestructive = false,
  });
}