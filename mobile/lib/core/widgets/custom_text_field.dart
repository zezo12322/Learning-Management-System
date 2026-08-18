import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:optimatech_lms/core/utils/app_colors.dart';
import '../utils/extension.dart';

class CustomTextField extends StatelessWidget {
  final TextEditingController controller;
  final String hintText;
  final IconData? prefixIcon;
  final String? errorText;
  final FormFieldValidator<String>? validator;
  final ValueChanged<String> onChanged;
  final VoidCallback? onClear;
  final TextInputType keyboardType;
  final bool enabled;
  final bool showClear;
  final int? maxLength;
  final List<TextInputFormatter>? inputFormatters;

  const CustomTextField({
    super.key,
    required this.controller,
    required this.hintText,
    this.prefixIcon,
    this.validator,
    this.keyboardType = TextInputType.text,
    this.enabled = true,
    this.errorText,
    required this.onChanged,
    this.onClear,
    this.showClear = false,
    this.maxLength,
    this.inputFormatters,
  });

  @override
  Widget build(BuildContext context) {

    final Color? fillColor = enabled
        ? context.theme.inputDecorationTheme.fillColor
        : context.theme.colorScheme.surfaceDim; // Disabled Background

    final Color iconColor = enabled
        ? context.theme.colorScheme.onSurface
        : AppColors.disablePlaceholder;

    return TextFormField(
      controller: controller,
      enabled: enabled,
      keyboardType: keyboardType,
      autofillHints: [AutofillHints.email],
      textInputAction: TextInputAction.done,
      maxLength: maxLength,
      inputFormatters: inputFormatters,
      validator: validator,
      onChanged: onChanged,

      style: context.theme.textTheme.bodyMedium?.copyWith(
        color: enabled ? context.theme.colorScheme.onSurface : AppColors.disablePlaceholder,
      ),

      decoration: InputDecoration(
        hintText: hintText,
        fillColor: fillColor,
        counter: const SizedBox.shrink(),
        contentPadding: const EdgeInsets.symmetric(horizontal: 16, vertical: 18),
        hintStyle: context.theme.textTheme.bodyMedium?.copyWith(
          color: enabled ? AppColors.placeholder : AppColors.disablePlaceholder,
        ),

        errorStyle: context.theme.textTheme.bodySmall?.copyWith(
          color: context.theme.colorScheme.error,
        ),

        // الـ Leading Icon
        prefixIcon: prefixIcon != null
            ? Padding(
          padding: const EdgeInsetsDirectional.only(start: 16, end: 12),
          child: Icon(
            prefixIcon,
            size: 20,
            color: errorText != null ? context.theme.colorScheme.error : iconColor,
          ),
        )
            : null,
        prefixIconConstraints: const BoxConstraints(
          minWidth: 48,
          minHeight: 20,
        ),

        // clear icon
        suffixIcon: showClear && enabled
            ? Padding(
          padding: const EdgeInsetsDirectional.only(end: 16, start: 12),
          child: IconButton(
            padding: EdgeInsets.zero,
            constraints: const BoxConstraints(),
            icon: Icon(
              Icons.cancel, // أو Icons.highlight_remove
              size: 20,
              color: errorText != null ? context.theme.colorScheme.error : iconColor,
            ),
            onPressed: (){
              onClear?.call();
              onChanged('');
            },
          ),
        )
            : null,
        suffixIconConstraints: const BoxConstraints(
          minWidth: 48,
          minHeight: 20,
        ),
      ),
    );
  }
}