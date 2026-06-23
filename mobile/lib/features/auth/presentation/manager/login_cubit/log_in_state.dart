part of 'log_in_cubit.dart';

enum LogInStatus{
  initial,
  loading,
  success,
  failure
}
class LogInState extends Equatable{
  final LogInStatus status;
  final String? emailError;
  final String? passwordError;
  final String? errorMessage;
  final bool rememberMe;

  const LogInState({
    this.status = LogInStatus.initial,
    this.emailError,
    this.passwordError,
    this.errorMessage,
    this.rememberMe = false,
  });

  static const _unset = Object();

  LogInState copyWith({
    LogInStatus? status,
    Object? emailError = _unset,
    Object? passwordError = _unset,
    Object? errorMessage = _unset,
    bool? rememberMe,
  }){
    return LogInState(
      status: status?? this.status,
      emailError: emailError == _unset ? this.emailError : emailError as String?,
      passwordError: passwordError == _unset ? this.passwordError : passwordError as String?,
      errorMessage: errorMessage == _unset ? this.errorMessage : errorMessage as String?,
      rememberMe: rememberMe?? this.rememberMe,
    );
  }

  @override
  List<Object?> get props => [status, emailError, passwordError, errorMessage, rememberMe];
}


