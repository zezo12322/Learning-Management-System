import 'package:flutter/material.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';
import 'package:optimatech_lms/core/utils/extension.dart';

enum CourseFilterChip { all, inProgress, completed, popular, newCourses }

extension CourseFilterChipX on CourseFilterChip {
  String get label {
    switch (this) {
      case CourseFilterChip.all:
        return 'All';
      case CourseFilterChip.inProgress:
        return 'In Progress';
      case CourseFilterChip.completed:
        return 'Completed';
      case CourseFilterChip.popular:
        return 'Popular';
      case CourseFilterChip.newCourses:
        return 'New';
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
  });

  final CourseFilterChip selected;
  final ValueChanged<CourseFilterChip> onSelected;

  @override
  Widget build(BuildContext context) {
    return Wrap(
      runSpacing: 8.h,
      children: CourseFilterChip.values.map((chip) {
        final isSelected = chip == selected;
        return Padding(
          padding: EdgeInsets.only(right: 10.w),
          child: _FilterChip(
            chip: chip,
            isSelected: isSelected,
            onTap: () => onSelected(chip),
          ),
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
  });

  final CourseFilterChip chip;
  final bool isSelected;
  final VoidCallback onTap;

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
            Icon(
              chip.icon,
              size: 14.r,
              color: isSelected
                  ? context.theme.colorScheme.surface
                  : context.theme.colorScheme.onSurfaceVariant,
            ),
            SizedBox(width: 6.w),
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
