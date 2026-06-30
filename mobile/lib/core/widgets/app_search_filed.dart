import 'package:flutter/material.dart';
import 'package:optimatech_lms/core/utils/app_colors.dart';
import 'package:optimatech_lms/core/utils/extension.dart';

class AppSearchField extends StatelessWidget {
  const AppSearchField({
    super.key,
    required this.hintText,
    required this.prefixIcon,
    required this.suffixIcon,
    required this.onSearch,
    required this.onFilter,
    required this.onClear,
    required this.searchController,
  });

  final String hintText;
  final IconData prefixIcon;
  final IconData suffixIcon;
  final VoidCallback onSearch;
  final VoidCallback onFilter;
  final VoidCallback onClear;
  final TextEditingController? searchController;

  @override
  Widget build(BuildContext context) {
    return Material(
      elevation: 6,
      color: context.theme.colorScheme.surfaceDim,
      borderRadius: BorderRadius.circular(14),
      shadowColor: AppColors.border,
      child: TextField(
        style: context.theme.textTheme.bodyMedium?.copyWith(
          color: AppColors.textPrimary,
        ),
        controller: searchController,
        decoration: InputDecoration(
          hintText: hintText,
          hintStyle: context.theme.textTheme.bodyMedium?.copyWith(
            color: AppColors.textSecondary,
          ),
          prefixIcon: Icon(
            prefixIcon,
            size: 26,
            color: AppColors.placeholder,
          ),
          suffixIcon: Icon(
            suffixIcon,
            size: 26,
            color: AppColors.placeholder,
          ),
          filled: true,
          fillColor: AppColors.whiteColor,
          contentPadding: const EdgeInsets.symmetric(
            horizontal: 14,
            vertical: 14,
          ),
          enabledBorder: OutlineInputBorder(
            borderRadius: BorderRadius.circular(14),
            borderSide: BorderSide.none,
          ),
          focusedBorder: OutlineInputBorder(
            borderRadius: BorderRadius.circular(14),
            borderSide: BorderSide.none,
          ),
        ),
      ),
    );
  }
}
