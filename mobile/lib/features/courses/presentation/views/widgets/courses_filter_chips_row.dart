import 'package:easy_localization/easy_localization.dart';
import 'package:flutter/material.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';
import 'package:optimatech_lms/core/utils/extension.dart';

enum CourseFilterChip { all, inProgress, completed, popular, newCourses }

extension CourseFilterChipX on CourseFilterChip {
  String get label {
    switch (this) {
      case CourseFilterChip.all:
        return 'courses.filters.all'.tr();
      case CourseFilterChip.inProgress:
        return 'courses.filters.inProgress'.tr();
      case CourseFilterChip.completed:
        return 'courses.filters.completed'.tr();
      case CourseFilterChip.popular:
        return 'courses.filters.popular'.tr();
      case CourseFilterChip.newCourses:
        return 'courses.filters.new'.tr();
    }
  }

  IconData get icon {
    switch (this) {
      case CourseFilterChip.all:
        return Icons.select_all;
      case CourseFilterChip.inProgress:
        return Icons.radio_button_unchecked_outlined;
      case CourseFilterChip.completed:
        return Icons.check_circle_rounded;
      case CourseFilterChip.popular:
        return Icons.local_fire_department_rounded;
      case CourseFilterChip.newCourses:
        return Icons.auto_awesome;
    }
  }
}

class CoursesFilterChipsRow extends StatelessWidget {
  const CoursesFilterChipsRow({
    super.key,
    required this.selected,
    required this.onSelected,
    this.showIcons = true,
  });

  final CourseFilterChip selected;
  final ValueChanged<CourseFilterChip> onSelected;
  final bool showIcons;

  @override
  Widget build(BuildContext context) {
    return Wrap(
      spacing: 10.w,
      runSpacing: 10.h,
      children: CourseFilterChip.values.map((chip) {
        final isSelected = chip == selected;
        return _FilterChip(
          chip: chip,
          isSelected: isSelected,
          onTap: () => onSelected(chip),
          showIcons: showIcons,
        );
      }).toList(),
    );
  }
}

class _FilterChip extends StatelessWidget {
  const _FilterChip({
    required this.chip,
    required this.isSelected,
    required this.onTap,
    required this.showIcons,
  });

  final CourseFilterChip chip;
  final bool isSelected;
  final VoidCallback onTap;
  final bool showIcons;

  @override
  Widget build(BuildContext context) {
    return GestureDetector(
      onTap: onTap,
      child: AnimatedContainer(
        duration: const Duration(milliseconds: 200),
        padding: EdgeInsets.symmetric(horizontal: 16.w, vertical: 10.h),
        decoration: BoxDecoration(
          color: isSelected ? context.theme.colorScheme.primary : context.theme.colorScheme.surface,
          borderRadius: BorderRadius.circular(15.r),
          border: Border.all(
            color: isSelected ? context.theme.colorScheme.primary : context.theme.colorScheme.outline,
            width: 1.5,
          ),
        ),
        child: Row(
          mainAxisSize: MainAxisSize.min,
          children: [
            if (showIcons) ...[
              Icon(
                chip.icon,
                size: 14.r,
                color: isSelected
                    ? context.theme.colorScheme.surface
                    : context.theme.colorScheme.onSurfaceVariant,
              ),
              SizedBox(width: 6.w),
            ],
            Text(
              chip.label,
              style: context.textTheme.labelSmall?.copyWith(
                color: isSelected
                    ? Colors.white
                    : context.theme.colorScheme.onSurfaceVariant,
                fontWeight: FontWeight.w600,
              ),
            ),
          ],
        ),
      ),
    );
  }
}
