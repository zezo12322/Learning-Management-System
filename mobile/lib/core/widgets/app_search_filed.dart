import 'package:easy_localization/easy_localization.dart';
import 'package:flutter/material.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';
import 'package:optimatech_lms/core/utils/extension.dart';
import '../utils/app_colors.dart';

class AppSearchField extends StatelessWidget {
  const AppSearchField({
    super.key,
    required this.searchController,
    required this.onSearch,
    required this.onFilter,
    this.onChanged,
    this.focusNode,
    this.autofocus = false,
  });

  final TextEditingController? searchController;
  final VoidCallback onSearch;
  final VoidCallback onFilter;
  final ValueChanged<String>? onChanged;
  final FocusNode? focusNode;
  final bool autofocus;

  @override
  Widget build(BuildContext context) {
    return Material(
      elevation: 4,
      color: context.theme.colorScheme.surfaceDim,
      borderRadius: BorderRadius.circular(14.r),
      shadowColor: context.theme.colorScheme.outline,
      child: TextField(
        style: context.theme.textTheme.bodyMedium?.copyWith(
          color: context.theme.colorScheme.onSurface,
        ),
        controller: searchController,
        focusNode: focusNode,
        autofocus: autofocus,
        onChanged: onChanged,
        decoration: InputDecoration(
          hintText: 'courses.searchHint'.tr(),
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
          suffixIcon: GestureDetector(
            onTap: onFilter,
            child: Icon(
              Icons.filter_list_rounded,
              size: 26.r,
              color: AppColors.placeholder,
            ),
          ),
          contentPadding: EdgeInsets.symmetric(vertical: 14.h,horizontal: 10.h ),
          enabledBorder: OutlineInputBorder(
            borderRadius: BorderRadius.circular(14.r),
            borderSide: BorderSide.none,
          ),
          focusedBorder: OutlineInputBorder(
            borderRadius: BorderRadius.circular(14.r),
            borderSide: BorderSide.none,
          ),
        ),
      ),
    );
  }
}
