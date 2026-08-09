import 'package:flutter/material.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';
import 'package:optimatech_lms/core/utils/app_text_styles.dart';

class CourseContentTabs extends StatelessWidget {
  const CourseContentTabs({
    super.key,
    required this.selectedIndex,
    required this.onTabSelected,
  });

  final int selectedIndex;
  final ValueChanged<int> onTabSelected;

  static const tabs = [
    'Overview',
    'Curriculum',
    'Reviews',
    'Resources',
  ];

  @override
  Widget build(BuildContext context) {
    final colorScheme = Theme.of(context).colorScheme;

    return SingleChildScrollView(
      scrollDirection: Axis.horizontal,
      child: Row(
        children: List.generate(tabs.length, (index) {
          final isSelected = index == selectedIndex;
          return Padding(
            padding: EdgeInsets.only(right: 8.w),
            child: Material(
              color: isSelected
                  ? colorScheme.primary.withValues(alpha: 0.1)
                  : colorScheme.surfaceDim,
              borderRadius: BorderRadius.circular(24.r),
              child: InkWell(
                onTap: () => onTabSelected(index),
                borderRadius: BorderRadius.circular(24.r),
                child: Container(
                  padding: EdgeInsets.symmetric(
                    horizontal: 16.w,
                    vertical: 8.h,
                  ),
                  decoration: BoxDecoration(
                    borderRadius: BorderRadius.circular(24.r),
                    border: Border.all(
                      color: isSelected
                          ? colorScheme.primary.withValues(alpha: 0.3)
                          : colorScheme.outline.withValues(alpha: 0.5),
                    ),
                  ),
                  child: Text(
                    tabs[index],
                    style: TextStyles.labelMedium.copyWith(
                      color: isSelected
                          ? colorScheme.primary
                          : colorScheme.onSurfaceVariant,
                      fontWeight:
                          isSelected ? FontWeights.semiBold : FontWeights.medium,
                    ),
                  ),
                ),
              ),
            ),
          );
        }),
      ),
    );
  }
}
