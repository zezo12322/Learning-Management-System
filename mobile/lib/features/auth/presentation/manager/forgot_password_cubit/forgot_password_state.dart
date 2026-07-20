// Plain (non-freezed) state: this feature is added in an environment without
// code generation available, so we hand-write the state + copyWith instead of
// relying on `@freezed`. Behaviour matches the freezed states used elsewhere.

enum ForgotPasswordStatus { initial, loading, success, failure }

class ForgotPasswordState {
  final ForgotPasswordStatus status;
  final String? emailError;
  final String? errorMessage;

  const ForgotPasswordState({
    this.status = ForgotPasswordStatus.initial,
    this.emailError,
    this.errorMessage,
  });

  ForgotPasswordState copyWith({
    ForgotPasswordStatus? status,
    String? emailError,
    String? errorMessage,
    bool clearEmailError = false,
    bool clearErrorMessage = false,
  }) {
    return ForgotPasswordState(
      status: status ?? this.status,
      emailError: clearEmailError ? null : (emailError ?? this.emailError),
      errorMessage: clearErrorMessage ? null : (errorMessage ?? this.errorMessage),
    );
  }
}
