import 'package:flutter/material.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';
import 'package:optimatech_lms/core/utils/extension.dart';
import 'package:optimatech_lms/features/courses/domain/entities/category_entity.dart';

class CategoryItem extends StatelessWidget {
  const CategoryItem({
    super.key,
    required this.category,
    required this.isSelected,
    required this.onTap,
  });

  final CategoryEntity category;
  final bool isSelected;
  final VoidCallback onTap;

  @override
  Widget build(BuildContext context) {
    return GestureDetector(
      onTap: onTap,
      child: AnimatedContainer(
        duration: const Duration(milliseconds: 200),
        // A fixed 72x42 box with `maxLines: 1` truncated most Arabic category
        // names to an ellipsis, and clipped at larger system font sizes. The box
        // keeps the same look for short labels and grows for the rest.
        constraints: BoxConstraints(
          minWidth: 72.w,
          maxWidth: 148.w,
          minHeight: 42.w,
        ),
        padding: EdgeInsets.symmetric(vertical: 8.h),
        decoration: BoxDecoration(
          color: isSelected
              ? context.theme.colorScheme.primary.withValues(alpha: 0.06)
              : context.theme.colorScheme.surface,
          borderRadius: BorderRadius.circular(16.r),
          border: Border.all(
            color: isSelected ? context.theme.colorScheme.primary : context.theme.colorScheme.outline,
            width: 1.5,
          ),
        ),
        child: Column(
          mainAxisSize: MainAxisSize.min,
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            // Icon(
            //   category.icon,
            //   size: 24.r,
            //   color: isSelected ? context.theme.colorScheme.primary : category.iconColor,
            // ),
            // Gap(6.h),
            Padding(
              padding: EdgeInsets.symmetric(horizontal: 4.w),
              child: Text(
                category.name,
                style: context.textTheme.labelSmall?.copyWith(
                  color: isSelected
                      ? context.theme.colorScheme.primary
                      : context.theme.colorScheme.onSurface,
                  fontWeight: FontWeight.w600,
                  fontSize: 10.sp,
                ),
                textAlign: TextAlign.center,
                maxLines: 2,
                overflow: TextOverflow.ellipsis,
              ),
            ),
          ],
        ),
      ),
    );
  }
}
