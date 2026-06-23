part of 'signup_cubit.dart';

enum SignupStatus{
  initial,
  loading,
  success,
  failure
}
class SignupState extends Equatable{
  final SignupStatus status;
  final String? fullNameError;
  final String? emailError;
  final String? phoneError;
  final String? passwordError;
  final String? confirmPasswordError;
  final String? errorMessage;
  final bool isAgree;

  const SignupState({
    this.status = SignupStatus.initial,
    this.fullNameError,
    this.emailError,
    this.phoneError,
    this.passwordError,
    this.confirmPasswordError,
    this.errorMessage,
    this.isAgree = false,
  });

  static const _unset = Object();

  SignupState copyWith({
    SignupStatus? status,
    Object? fullNameError = _unset,
    Object? emailError = _unset,
    Object? phoneError = _unset,
    Object? passwordError = _unset,
    Object? confirmPasswordError = _unset,
    Object? errorMessage = _unset,
    bool? isAgree,
  }){
    return SignupState(
      status: status?? this.status,
      fullNameError: fullNameError == _unset ? this.fullNameError : fullNameError as String?,
      emailError: emailError == _unset ? this.emailError : emailError as String?,
      phoneError: phoneError == _unset ? this.phoneError : phoneError as String?,
      passwordError: passwordError == _unset ? this.passwordError : passwordError as String?,
      confirmPasswordError: confirmPasswordError == _unset ? this.confirmPasswordError : confirmPasswordError as String?,
      errorMessage: errorMessage == _unset ? this.errorMessage : errorMessage as String?,
      isAgree: isAgree?? this.isAgree,
    );
  }

  @override
  List<Object?> get props => [
    status,
    fullNameError,
    emailError,
    phoneError,
    passwordError,
    confirmPasswordError,
    errorMessage,
    isAgree,
  ];
}



