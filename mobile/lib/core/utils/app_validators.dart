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

  /// validate password — light check, used on the Login screen where we're
  /// only confirming the field isn't empty/too short before hitting Firebase.
  static String? validatePassword(String? value) {
    if (value == null || value.trim().isEmpty) {
      return 'auth.validation.password_required'.tr();
    }

    if (value.length < 6) {
      return 'auth.validation.password_length'.tr();
    }

    return null;
  }

  /// Signup password — mirrors the backend's `registerStudent` rule exactly:
  /// 8–64 characters, at least one uppercase letter, at least one digit, and
  /// at least one special character. Used only on the Register screen so
  /// Register/Login can never desync from what the backend will actually
  /// accept.
  static String? validateSignupPassword(String? value) {
    if (value == null || value.isEmpty) {
      return 'auth.validation.password_required'.tr();
    }

    if (value.length < 8 || value.length > 64) {
      return 'auth.validation.password_length_strong'.tr();
    }

    if (!RegExp(r'[A-Z]').hasMatch(value)) {
      return 'auth.validation.password_uppercase'.tr();
    }

    if (!RegExp(r'[0-9]').hasMatch(value)) {
      return 'auth.validation.password_number'.tr();
    }

    if (!RegExp(r'''[!@#\$&*~%^()\-_=+\[\]{}|;:,.<>?/]''').hasMatch(value)) {
      return 'auth.validation.password_special_char'.tr();
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

  /// Phone Number — still used elsewhere (e.g. profile), kept as-is.
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

  /// National ID — backend requires EXACTLY 14 digits (`registerStudent`).
  /// Validated client-side so a malformed value never reaches the Cloud
  /// Function call.
  static String? validateNationalId(String? value) {
    if (value == null || value.trim().isEmpty) {
      return 'auth.validation.national_id_required'.tr();
    }

    final nationalIdRegex = RegExp(r'^\d{14}$');

    if (!nationalIdRegex.hasMatch(value.trim())) {
      return 'auth.validation.national_id_not_match'.tr();
    }

    return null;
  }
}