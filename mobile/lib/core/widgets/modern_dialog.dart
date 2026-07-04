import 'package:easy_localization/easy_localization.dart';
import 'package:flutter/material.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';
import 'package:gap/gap.dart';
import 'package:optimatech_lms/core/utils/app_colors.dart';
import 'package:optimatech_lms/core/utils/extension.dart';
import 'package:optimatech_lms/core/widgets/secondary_button.dart';

enum DialogType { error, success, warning }

class ModernDialog {
  static Future<void> show({
    required BuildContext context,
    required DialogType type,
    required String title,
    required String message,
    String? primaryButtonText,
    String? secondaryButtonText,
    VoidCallback? onPrimaryPressed,
    VoidCallback? onSecondaryPressed,
    bool barrierDismissible = false,
  }) {
    return showDialog(
      context: context,
      barrierDismissible: barrierDismissible,
      builder: (context) => Dialog(
        shape: RoundedRectangleBorder(
          borderRadius: BorderRadius.circular(20.r),
        ),
        elevation: 0,
        backgroundColor: Colors.transparent,
        child: _DialogContent(
          type: type,
          title: title,
          message: message,
          primaryButtonText: primaryButtonText,
          secondaryButtonText: secondaryButtonText,
          onPrimaryPressed: onPrimaryPressed,
          onSecondaryPressed: onSecondaryPressed,
        ),
      ),
    );
  }

  /// Quick error dialog
  static Future<void> showError({
    required BuildContext context,
    required String message,
    String? title,
    String? buttonText,
    VoidCallback? onPressed,
  }) {
    return show(
      context: context,
      type: DialogType.error,
      title: title ?? 'common.dialog.error_title'.tr(),
      message: message,
      primaryButtonText: buttonText ?? 'common.dialog.ok'.tr(),
      onPrimaryPressed: onPressed,
    );
  }

  /// Quick success dialog
  static Future<void> showSuccess({
    required BuildContext context,
    required String message,
    String? title,
    String? buttonText,
    VoidCallback? onPressed,
  }) {
    return show(
      context: context,
      type: DialogType.success,
      title: title ?? 'common.dialog.success_title'.tr(),
      message: message,
      primaryButtonText: buttonText ?? 'common.dialog.ok'.tr(),
      onPrimaryPressed: onPressed,
    );
  }

  /// Quick warning dialog
  static Future<void> showWarning({
    required BuildContext context,
    required String message,
    String? title,
    String? buttonText,
    VoidCallback? onPressed,
  }) {
    return show(
      context: context,
      type: DialogType.warning,
      title: title ?? 'common.dialog.warning_title'.tr(),
      message: message,
      primaryButtonText: buttonText ?? 'common.dialog.ok'.tr(),
      onPrimaryPressed: onPressed,
    );
  }

  /// Confirmation dialog
  static Future<void> showConfirmation({
    required BuildContext context,
    required String title,
    required String message,
    String? confirmText,
    String? cancelText,
    VoidCallback? onConfirm,
    VoidCallback? onCancel,
    DialogType type = DialogType.warning,
  }) {
    return show(
      context: context,
      type: type,
      title: title,
      message: message,
      primaryButtonText: confirmText ?? 'common.dialog.confirm'.tr(),
      secondaryButtonText: cancelText ?? 'common.dialog.cancel'.tr(),
      onPrimaryPressed: onConfirm,
      onSecondaryPressed: onCancel,
    );
  }
}

class _DialogContent extends StatelessWidget {
  final DialogType type;
  final String title;
  final String message;
  final String? primaryButtonText;
  final String? secondaryButtonText;
  final VoidCallback? onPrimaryPressed;
  final VoidCallback? onSecondaryPressed;

  const _DialogContent({
    required this.type,
    required this.title,
    required this.message,
    this.primaryButtonText,
    this.secondaryButtonText,
    this.onPrimaryPressed,
    this.onSecondaryPressed,
  });

  Color _getMainColor() {
    switch (type) {
      case DialogType.error:
        return AppColors.error;
      case DialogType.success:
        return AppColors.success;
      case DialogType.warning:
        return AppColors.warning;
    }
  }

  IconData _getIcon() {
    switch (type) {
      case DialogType.error:
        return Icons.error_outline_rounded;
      case DialogType.success:
        return Icons.check_circle_outline_rounded;
      case DialogType.warning:
        return Icons.warning_amber_rounded;
    }
  }

  @override
  Widget build(BuildContext context) {
    final mainColor = _getMainColor();

    return Container(
      padding: EdgeInsets.all(24.r),
      decoration: BoxDecoration(
        color: context.theme.colorScheme.surface,
        borderRadius: BorderRadius.circular(20.r),
        border: Border.all(
          color: context.theme.colorScheme.outline.withValues(alpha: 0.1),
          width: 1,
        ),
        boxShadow: [
          BoxShadow(
            color: Colors.black.withValues(alpha: 0.15),
            blurRadius: 20,
            offset: const Offset(0, 10),
          ),
        ],
      ),
      child: Column(
        mainAxisSize: MainAxisSize.min,
        children: [
          // Icon Container
          Container(
            width: 64.w,
            height: 64.w,
            decoration: BoxDecoration(
              color: mainColor.withValues(alpha: 0.15),
              shape: BoxShape.circle,
            ),
            child: Icon(
              _getIcon(),
              color: mainColor,
              size: 36.w,
            ),
          ),
          Gap(20.h),

          // Title
          Text(
            title,
            style: context.textTheme.titleMedium,
            textAlign: TextAlign.center,
          ),
          Gap(12.h),

          // Message
          Text(
            message,
            style: context.textTheme.bodyMedium?.copyWith(
              color: context.theme.colorScheme.onSurfaceVariant,
            ),
            textAlign: TextAlign.center,
          ),
          Gap(24.h),

          // Buttons
          Row(
            children: [
              if (secondaryButtonText != null) ...[
                Expanded(
                  child: SecondaryButton(
                    text: secondaryButtonText!,
                    onPressed: () {
                      onSecondaryPressed?.call();
                    },
                  ),
                ),
                SizedBox(width: 12.w),
              ],
              Expanded(
                child: _DialogActionButton(
                  text: primaryButtonText ?? 'common.dialog.ok'.tr(),
                  color: mainColor,
                  onPressed: () {
                    Navigator.of(context).pop();
                    onPrimaryPressed?.call();
                  },
                ),
              ),
            ],
          ),
        ],
      ),
    );
  }
}

class _DialogActionButton extends StatelessWidget {
  const _DialogActionButton({
    required this.text,
    required this.color,
    required this.onPressed,
  });

  final String text;
  final Color color;
  final VoidCallback onPressed;

  @override
  Widget build(BuildContext context) {
    return ElevatedButton(
      style: ElevatedButton.styleFrom(
        backgroundColor: color,
        foregroundColor: Colors.white,
        shape: RoundedRectangleBorder(
          borderRadius: BorderRadius.circular(16.r),
        ),
        elevation: 0,
      ),
      onPressed: onPressed,
      child: Text(text),
    );
  }
}