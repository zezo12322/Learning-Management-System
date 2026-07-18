import 'package:easy_localization/easy_localization.dart';
import 'package:flutter/gestures.dart';
import 'package:flutter/material.dart';
import 'package:optimatech_lms/core/utils/extension.dart';

class TermsAndPrivacyText extends StatelessWidget {
  const TermsAndPrivacyText({
    super.key,
    this.onTermsTap,
    this.onPrivacyTap,
  });

  final VoidCallback? onTermsTap;
  final VoidCallback? onPrivacyTap;

  @override
  Widget build(BuildContext context) {
    return RichText(
      text: TextSpan(
        style: context.textTheme.labelSmall,
        children: [
          TextSpan(
            text: 'auth.signup_screen.agree_terms'.tr(),
          ),
          TextSpan(
            text: 'auth.signup_screen.terms_of_service'.tr(),
            recognizer: TapGestureRecognizer()..onTap = onTermsTap,
            style: context.textTheme.labelSmall?.copyWith(
              color: context.theme.colorScheme.primary,
              fontWeight: FontWeight.w700,
            ),
          ),
          TextSpan(
            text: 'auth.signup_screen.and'.tr(),
          ),
          TextSpan(
            text: 'auth.signup_screen.privacy_policy'.tr(),
            recognizer: TapGestureRecognizer()..onTap = onPrivacyTap,
            style: context.textTheme.labelSmall?.copyWith(
              color: context.theme.colorScheme.primary,
              fontWeight: FontWeight.w700,
            ),
          ),
        ],
      ),
    );
  }
}