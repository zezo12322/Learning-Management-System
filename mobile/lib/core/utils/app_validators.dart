import 'package:easy_localization/easy_localization.dart';

abstract class AppValidators {
  /// Full Name
  static String? validateFullName(String? value) {
    if (value == null || value.trim().isEmpty) {
      return 'auth.validation.full_name_required'.tr();
    }

    if (value.trim().length < 3) {
      return 'auth.validation.full_name_length'.tr();
    }

    return null;
  }

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

  /// Confirm Password
  static String? validateConfirmPassword({
    required String? password,
    required String? confirmPassword,
  }) {
    if (confirmPassword == null ||
        confirmPassword.trim().isEmpty) {
      return 'auth.validation.confirm_password_required'.tr();
    }

    if (password != confirmPassword) {
      return 'auth.validation.passwords_not_match'.tr();
    }

    return null;
  }

  /// Phone Number
  static String? validatePhoneNumber(String? value) {
    if (value == null || value.trim().isEmpty) {
      return 'auth.validation.phone_required'.tr();
    }

    final phoneRegex = RegExp(r'^01[0125][0-9]{8}$');

    if (!phoneRegex.hasMatch(value.trim())) {
      return 'auth.validation.phone_not_match'.tr();
    }

    return null;
  }
}
