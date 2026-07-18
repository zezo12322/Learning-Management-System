import 'package:freezed_annotation/freezed_annotation.dart';

part 'log_in_state.freezed.dart';

enum LogInStatus{
  initial,
  loading,
  success,
  failure
}

@freezed
class LogInState with _$LogInState{
  const factory LogInState({
    @Default(LogInStatus.initial) LogInStatus status,
    String? emailError,
    String? passwordError,
    String? errorMessage,
    @Default(false) bool rememberMe,
  }) = _LogInState;
}



