import 'package:flutter/material.dart';
import 'package:optimatech_lms/core/utils/extension.dart';

void buildErrorSnackBar({required BuildContext context, required String text}){
   ScaffoldMessenger.of(context).showSnackBar(
    SnackBar(
      behavior: SnackBarBehavior.floating,
      content: Text(
        text,
        style: context.textTheme.bodyMedium?.copyWith(
          color: context.theme.colorScheme.onError,
        ),
      ),
      backgroundColor: context.theme.colorScheme.error,
      duration: const Duration(seconds: 3),
    ),
  );
}