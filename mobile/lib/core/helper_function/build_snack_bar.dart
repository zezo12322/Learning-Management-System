import 'package:flutter/material.dart';
import 'package:optimatech_lms/core/utils/app_colors.dart';
import 'package:optimatech_lms/core/utils/extension.dart';

void buildSnackBar({required BuildContext context, required String text, bool isError = false}){
   ScaffoldMessenger.of(context).showSnackBar(
    SnackBar(
      behavior: SnackBarBehavior.floating,
      content: Text(
        text,
        style: context.textTheme.bodyMedium?.copyWith(
          color: context.theme.colorScheme.onError,
        ),
      ),
      backgroundColor: isError ? context.theme.colorScheme.error : AppColors.success,
      duration: const Duration(seconds: 3),
    ),
  );
}