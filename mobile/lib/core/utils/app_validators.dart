import 'package:easy_localization/easy_localization.dart';

abstract class AppValidators {
  /// validate email
  static String? validateEmail(String? value) {
    if (value == null || value.trim().isEmpty) {
      return 'auth.validation.email_required'.tr();
    }

    final emailRegex = RegExp(r'^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$');

    if (!emailRegex.hasMatch(value.trim())) {
      return 'auth.validation.email_not_match'.tr();
    }

    return null;
  }

  /// validate password
  static String? validatePassword(String? value) {
    if (value == null || value.trim().isEmpty) {
      return 'auth.validation.password_required'.tr();
    }

    if (value.length < 6) {
      return 'auth.validation.password_length'.tr();
    }

    return null;
  }
}
