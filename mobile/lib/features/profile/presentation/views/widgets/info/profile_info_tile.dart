import 'package:flutter/material.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';
import 'package:gap/gap.dart';
import 'package:optimatech_lms/core/utils/extension.dart';

class ProfileInfoTile extends StatelessWidget {
  const ProfileInfoTile({
    super.key,
    required this.data,
    this.showDivider = true,
  });

  final ProfileInfoTileData data;
  final bool showDivider;

  @override
  Widget build(BuildContext context) {
    return Column(
      children: [
        Padding(
          padding: EdgeInsets.symmetric(horizontal: 14.w, vertical: 8.h),
          child: Row(
            children: [
              Container(
                width: 38.w,
                height: 38.w,
                decoration: BoxDecoration(
                  color: context.theme.colorScheme.primary.withAlpha(12),
                  borderRadius: BorderRadius.circular(12.r),
                ),
                child: Icon(
                  data.icon,
                  size: 20.sp,
                  color: context.theme.colorScheme.primary,
                ),
              ),
              Gap(12.w),
              Expanded(
                flex: 4,
                child: Text(
                  data.titleKey,
                  style: context.textTheme.labelLarge?.copyWith(
                    fontWeight: FontWeight.w600,
                  ),
                ),
              ),
              Expanded(
                flex: 5,
                child: Row(
                  mainAxisAlignment: MainAxisAlignment.end,
                  children: [
                    Expanded(
                      child: Text(
                        data.value,
                        textAlign: TextAlign.end,
                        maxLines: 1,
                        overflow: TextOverflow.ellipsis,
                        softWrap: false,
                        style: context.textTheme.bodyMedium?.copyWith(
                          color: context.theme.colorScheme.onSurfaceVariant,
                        ),
                      ),
                    ),
                    Gap(6.w),
                    Icon(
                      Icons.chevron_right_rounded,
                      color: context.theme.colorScheme.onSurfaceVariant,
                    ),
                  ],
                ),
              ),
            ],
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

class ProfileInfoTileData {
  final IconData icon;
  final String titleKey;
  final String value;

  const ProfileInfoTileData({
    required this.icon,
    required this.titleKey,
    required this.value,
  });
}