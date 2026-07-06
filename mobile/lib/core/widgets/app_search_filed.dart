import 'package:flutter/material.dart';
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
    final theme = context.theme;
    final colorScheme = theme.colorScheme;

    return Material(
      elevation: 6,
      color: colorScheme.surfaceDim,
      borderRadius: BorderRadius.circular(14),
      shadowColor: colorScheme.onSurface.withValues(alpha: 0.08),
      child: TextField(
        style: theme.textTheme.bodyMedium?.copyWith(
          color: colorScheme.onSurface,
        ),
        controller: searchController,
        decoration: InputDecoration(
          hintText: hintText,
          hintStyle: theme.textTheme.bodyMedium?.copyWith(
            color: colorScheme.onSurfaceVariant,
          ),
          prefixIcon: Icon(
            prefixIcon,
            size: 26,
            color: colorScheme.onSurfaceVariant,
          ),
          suffixIcon: Icon(
            suffixIcon,
            size: 26,
            color: colorScheme.onSurfaceVariant,
          ),
          filled: true,
          fillColor: colorScheme.surface,
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
