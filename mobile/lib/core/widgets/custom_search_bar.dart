import 'package:flutter/material.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';
import 'package:optimatech_lms/core/utils/app_colors.dart';
import 'package:optimatech_lms/core/utils/extension.dart';

class CustomSearchBar extends StatelessWidget {
  const CustomSearchBar({
    super.key,
    required this.controller,
    this.onChanged,
    this.onFilterTap,
  });

  final TextEditingController? controller;
  final ValueChanged<String>? onChanged;
  final VoidCallback? onFilterTap;

  @override
  Widget build(BuildContext context) {
    return Row(
      children: [
        Expanded(
          child: TextField(
            controller: controller,
            onChanged: onChanged,
            style: context.textTheme.bodyMedium,
            decoration: InputDecoration(
              hintText: 'Search for courses, lessons, quizzes...',
              hintStyle: context.textTheme.bodyMedium?.copyWith(
                color: AppColors.placeholder,
              ),
              prefixIcon: Padding(
                padding: EdgeInsets.symmetric(horizontal:  14.w,),
                child: Icon(
                  Icons.search_rounded,
                  size: 20.r,
                  color: AppColors.placeholder,
                ),
              ),
              prefixIconConstraints: BoxConstraints(minWidth: 48.w),
              contentPadding: EdgeInsets.symmetric(vertical: 14.h,horizontal: 10.h ),
            ),
          ),
        ),
        SizedBox(width: 12.w),
        GestureDetector(
          onTap: onFilterTap,
          child: Container(
            width: 52.w,
            height: 52.h,
            decoration: BoxDecoration(
              color: context.theme.colorScheme.surface,
              borderRadius: BorderRadius.circular(14.r),
              border: Border.all(color: AppColors.border),
              boxShadow: [
                BoxShadow(
                  color: Colors.black.withOpacity(0.04),
                  blurRadius: 8,
                  offset: const Offset(0, 2),
                ),
              ],
            ),
            child: Icon(
              Icons.tune_rounded,
              size: 20.r,
              color: context.theme.colorScheme.onSurface,
            ),
          ),
        ),
      ],
    );
  }
}