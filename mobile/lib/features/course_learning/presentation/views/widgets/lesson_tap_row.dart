import 'package:easy_localization/easy_localization.dart';
import 'package:flutter/material.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';
import 'package:gap/gap.dart';
import 'package:optimatech_lms/core/utils/app_text_styles.dart';
import 'package:optimatech_lms/core/utils/extension.dart';

enum LessonTab { curriculum, notes, resources, discussion }

extension LessonTabX on LessonTab {
  String get labelKey {
    switch (this) {
      case LessonTab.curriculum:
        return 'lesson_learning.tabs.curriculum';
      case LessonTab.notes:
        return 'lesson_learning.tabs.notes';
      case LessonTab.resources:
        return 'lesson_learning.tabs.resources';
      case LessonTab.discussion:
        return 'lesson_learning.tabs.discussion';
    }
  }
}

class LessonTabsRow extends StatelessWidget {
  const LessonTabsRow({
    super.key,
    required this.selected,
    required this.onSelected,
  });

  final LessonTab selected;
  final ValueChanged<LessonTab> onSelected;

  @override
  Widget build(BuildContext context) {
    return SingleChildScrollView(
      scrollDirection: Axis.horizontal,
      child: Row(
        children: LessonTab.values.map((tab) {
          return Padding(
            padding: EdgeInsetsDirectional.only(end: 24.w),
            child: _TabItem(
              tab: tab,
              isSelected: tab == selected,
              onTap: () => onSelected(tab),
            ),
          );
        }).toList(),
      ),
    );
  }
}

class _TabItem extends StatelessWidget {
  const _TabItem({
    required this.tab,
    required this.isSelected,
    required this.onTap,
  });

  final LessonTab tab;
  final bool isSelected;
  final VoidCallback onTap;

  @override
  Widget build(BuildContext context) {
    final primary = context.theme.colorScheme.primary;

    return GestureDetector(
      onTap: onTap,
      behavior: HitTestBehavior.opaque,
      child: IntrinsicWidth(
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Text(
              tab.labelKey.tr(),
              style: context.textTheme.labelLarge?.copyWith(
                color: isSelected ? primary : context.theme.colorScheme.onSurfaceVariant,
                fontWeight: isSelected ? FontWeights.bold : FontWeights.semiBold,
              ),
            ),
            Gap(8.h),
            Container(
              height: 3.h,
              width: double.infinity,
              decoration: BoxDecoration(
                color: isSelected ? primary : Colors.transparent,
                borderRadius: BorderRadius.circular(4.r),
              ),
            ),
          ],
        ),
      ),
    );
  }
}