import 'package:flutter/material.dart';
import 'package:optimatech_lms/core/utils/extentions.dart';

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
          borderRadius: BorderRadius.circular(12),
          side: BorderSide(
            color: context.theme.colorScheme.primary,
            width: 1.5
          )
        ),
      ),
      onPressed:onPressed,
      child: Text(text),
    );
  }
}
