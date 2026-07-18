import 'package:flutter/material.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';
import 'package:optimatech_lms/core/utils/extension.dart';

class SecondaryButton extends StatelessWidget {
  const SecondaryButton({
    super.key,
    required this.text,
    required this.onPressed,
    this.isDisabled = false,
  });

  final String text;
  final bool isDisabled;
  final VoidCallback onPressed;

  @override
  Widget build(BuildContext context) {
    return ElevatedButton(
      style: ElevatedButton.styleFrom(
        backgroundColor: context.theme.scaffoldBackgroundColor,
        foregroundColor: context.theme.colorScheme.primary,
        elevation: 0,
        shape: RoundedRectangleBorder(
          borderRadius: BorderRadius.circular(12.r),
          side: BorderSide(
            color: context.theme.colorScheme.primary,
            width: 1.5,
          ),
        ),
      ),
      onPressed: isDisabled ? null : onPressed,
      child: Text(text),
    );
  }
}
