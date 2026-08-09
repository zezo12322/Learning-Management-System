import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:optimatech_lms/core/utils/app_validators.dart';
import 'package:optimatech_lms/features/auth/domain/repositories/auth_repository.dart';
import 'forgot_password_state.dart';
import 'package:optimatech_lms/core/bloc/safe_emit.dart';

class ForgotPasswordCubit extends Cubit<ForgotPasswordState> with SafeEmit<ForgotPasswordState> {
  ForgotPasswordCubit({required AuthRepository authRepository})
      : _authRepository = authRepository,
        super(const ForgotPasswordState());

  final AuthRepository _authRepository;

  /// Clear the field error as soon as the user edits the email.
  void emailChanged() {
    if (state.emailError != null) {
      emit(state.copyWith(clearEmailError: true));
    }
  }

  Future<void> sendResetLink({required String email}) async {
    final emailError = AppValidators.validateEmail(email);
    if (emailError != null) {
      emit(state.copyWith(emailError: emailError));
      return;
    }

    emit(state.copyWith(
      status: ForgotPasswordStatus.loading,
      clearErrorMessage: true,
      clearEmailError: true,
    ));

    final response = await _authRepository.sendPasswordReset(email: email);

    response.fold(
      (failure) => emit(state.copyWith(
        status: ForgotPasswordStatus.failure,
        errorMessage: failure.message,
      )),
      (_) => emit(state.copyWith(status: ForgotPasswordStatus.success)),
    );
  }
}
