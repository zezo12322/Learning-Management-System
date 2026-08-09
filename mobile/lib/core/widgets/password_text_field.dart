import 'package:easy_localization/easy_localization.dart';
import 'package:flutter/material.dart';
import 'package:optimatech_lms/core/utils/app_colors.dart';
import 'package:optimatech_lms/core/utils/app_validators.dart';
import '../utils/extension.dart';

class PasswordTextField extends StatelessWidget {
  final TextEditingController controller;
  final String hintText;
  final bool isObscure;
  final String? errorText;
  final bool enabled;
  final VoidCallback onToggled;
  final ValueChanged<String?>? onChanged;
  final FormFieldValidator<String?> validator;

  const PasswordTextField({
    super.key,
    required this.controller,
    this.enabled = true, 
    required this.isObscure,
    required this.onToggled,
    required this.onChanged,
    required this.errorText,
    required this.hintText,
    this.validator = AppValidators.validatePassword,
  });

  @override
  Widget build(BuildContext context) {
    final Color? fillColor = enabled
        ? context.theme.inputDecorationTheme.fillColor
        : context.theme.colorScheme.surfaceDim; // Disabled Background

    final Color iconColor = enabled
        ? context.theme.colorScheme.onSurface // Placeholder / Icon color
        : AppColors.disablePlaceholder; // Disabled text/icon color

    return TextFormField(
      controller: controller,
      enabled: enabled,
      obscureText: isObscure,
      keyboardType: TextInputType.text,
      autofillHints: [AutofillHints.password],
      textInputAction: TextInputAction.done,
      validator: validator,
      onChanged: onChanged,

      style: context.theme.textTheme.bodyMedium?.copyWith(
        color: enabled ? context.theme.colorScheme.onSurface : AppColors.disablePlaceholder,
      ),

      decoration: InputDecoration(
        hintText: hintText,
        fillColor: fillColor,
        
        contentPadding: const EdgeInsets.symmetric(horizontal: 16, vertical: 18),
        
        hintStyle: context.theme.textTheme.bodyMedium?.copyWith(
          color: enabled ? AppColors.placeholder : AppColors.disablePlaceholder,
        ),

        errorStyle: context.theme.textTheme.bodySmall?.copyWith(
          color: context.theme.colorScheme.error,
        ),
        // الـ Leading Icon
        prefixIcon: Padding(
          padding: const EdgeInsetsDirectional.only(start: 16, end: 12),
          child: Icon(
            Icons.lock_outline,
            size: 20,
            color: errorText != null ? context.theme.colorScheme.error : iconColor,
          ),
        ),
        prefixIconConstraints: const BoxConstraints(
          minWidth: 48,
          minHeight: 20,
        ),

        // clear icon
        suffixIcon: Padding(
          padding: const EdgeInsetsDirectional.only(end: 16, start: 12),
          child: IconButton(
            padding: EdgeInsets.zero,
            constraints: const BoxConstraints(),
            tooltip: isObscure ? 'auth.show_password'.tr() : 'auth.hide_password'.tr(),
            icon: Icon(
              isObscure ? Icons.visibility_off_outlined : Icons.visibility_outlined,
              size: 20,
              color: errorText != null ? context.theme.colorScheme.error : AppColors.placeholder,
            ),
            onPressed: onToggled,
          ),
        ),
        suffixIconConstraints: const BoxConstraints(
          minWidth: 48,
          minHeight: 20,
        ),
      ),
    );
  }
}