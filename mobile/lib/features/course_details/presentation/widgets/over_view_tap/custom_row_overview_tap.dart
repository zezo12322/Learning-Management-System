import 'package:flutter/material.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';
import 'package:gap/gap.dart';
import 'package:optimatech_lms/core/utils/app_text_styles.dart';

class CustomRowOverviewTab extends StatelessWidget {
  const CustomRowOverviewTab({
    super.key,
    required this.icon,
    required this.label,
    required this.value,
  });

  final IconData icon;
  final String label;
  final String value;

  @override
  Widget build(BuildContext context) {
    final colorScheme = Theme.of(context).colorScheme;

    return Container(
      padding: EdgeInsets.symmetric(horizontal: 14.w, vertical: 12.h),
      decoration: BoxDecoration(
        color: colorScheme.surface,
        borderRadius: BorderRadius.circular(12.r),
        border: Border.all(color: colorScheme.outline),
      ),
      child: Row(
        children: [
          Icon(icon, size: 18.sp, color: colorScheme.primary),
          Gap(12.w),
          Expanded(
            child: Text(
              label,
              style: TextStyles.labelMedium.copyWith(
                color: colorScheme.onSurfaceVariant,
              ),
              overflow: TextOverflow.ellipsis,
            ),
          ),
          Gap(12.w),
          Text(
            value,
            style: TextStyles.labelMedium.copyWith(
              color: colorScheme.onSurface,
              fontWeight: FontWeights.semiBold,
            ),
          ),
        ],
      ),
    );
  }
}
