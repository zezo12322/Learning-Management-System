import 'package:easy_localization/easy_localization.dart';
import 'package:flutter/material.dart';
import 'package:optimatech_lms/core/utils/extension.dart';

class PrimaryButton extends StatelessWidget {
  const PrimaryButton({
    super.key,
    required this.text,
    required this.onPressed,
    this.isDisabled = false,
    this.isLoading = false,
  });

  final String text;
  final bool isDisabled;
  final bool isLoading;
  final VoidCallback onPressed;

  @override
  Widget build(BuildContext context) {
    return ElevatedButton(
      style: ElevatedButton.styleFrom(
        backgroundColor: isDisabled
          ? context.theme.colorScheme.primary.withAlpha(110)
          : null,
      ),
      onPressed: (isLoading || isDisabled) ? null : onPressed,
      child: isLoading? Row(
        mainAxisSize: MainAxisSize.min,
        children: [
          const SizedBox(
            width: 24,
            height: 24,
            child: CircularProgressIndicator(
              strokeWidth: 2.5,
              color: Colors.white,
              backgroundColor: Colors.white10,
            ),
          ),
          const SizedBox(width: 8,),
          Text('common.loading'.tr()),
        ],
      ) : Text(text),
    );
  }
}
