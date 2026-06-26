

import 'package:freezed_annotation/freezed_annotation.dart';

part 'signup_state.freezed.dart';

enum SignupStatus{
  initial,
  loading,
  success,
  failure
}

@freezed
class SignupState with _$SignupState {
  const factory SignupState({
    @Default(SignupStatus.initial) SignupStatus status,
    String? fullNameError,
    String? emailError,
    String? phoneError,
    String? passwordError,
    String? confirmPasswordError,
    String? errorMessage,
    @Default(false) bool isAgree,
  }) = _SignupState;
}
