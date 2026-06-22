import 'package:easy_localization/easy_localization.dart';
import 'package:flutter/gestures.dart';
import 'package:flutter/material.dart';
import 'package:optimatech_lms/core/utils/extension.dart';

class AlreadyHaveAccount extends StatelessWidget {
  const AlreadyHaveAccount({
    super.key,
  });

  @override
  Widget build(BuildContext context) {
    return RichText(
      text: TextSpan(
        style: context.textTheme.labelSmall,
        children: [
          TextSpan(
            text: 'auth.signup_screen.already_have_account'.tr(),
          ),
          const TextSpan(
            text: '   ',
          ),
          TextSpan(
            text: 'auth.signup_screen.login'.tr(),
            recognizer: TapGestureRecognizer()..onTap =
                ()=> Navigator.pop(context),
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
