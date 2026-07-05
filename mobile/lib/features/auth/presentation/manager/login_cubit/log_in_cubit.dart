import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:optimatech_lms/core/utils/app_validators.dart';
import 'package:optimatech_lms/features/auth/domain/repositories/auth_repository.dart';
import 'log_in_state.dart';

class LogInCubit extends Cubit<LogInState> {
  LogInCubit({required AuthRepository authRepository}) : _authRepository = authRepository, super(const LogInState());
  final AuthRepository _authRepository;

  void toggleRememberMe(bool value){
    emit(state.copyWith(rememberMe: value));
    _authRepository.setRememberMeState(value);
  }

  void emailChanged(){
    if(state.emailError != null){
      emit(state.copyWith(emailError: null));
    }
  }
  void passwordChanged(){
    if(state.passwordError != null){
      emit(state.copyWith(passwordError: null));
    }
  }

  Future<void> login({required String email, required String password}) async{
    final emailError= AppValidators.validateEmail(email);
    final passwordError = AppValidators.validatePassword(password);

    if(emailError != null || passwordError != null){
      emit(
        state.copyWith(
          emailError: emailError,
          passwordError: passwordError,
        ),
      );
      return;
    }

    emit(state.copyWith(status: LogInStatus.loading, errorMessage: null));

    final response = await _authRepository.loginWithEmailPassword(email: email, password: password);

    response.fold(
      (failure) => emit(
        state.copyWith(
          errorMessage: failure.message,
          status: LogInStatus.failure,
        ),
      ),
      (success) => emit(
        state.copyWith(
          status: LogInStatus.success,
        ),
      ),
    );
  }

  Future<void> loginWithGoogle() async{
    emit(state.copyWith(status: LogInStatus.loading, errorMessage: null));

    final response = await _authRepository.loginWithGoogle();

    response.fold(
      (failure) => emit(
        state.copyWith(
          errorMessage: failure.message,
          status: LogInStatus.failure,
        ),
      ),
      (success) => emit(
        state.copyWith(
          status: LogInStatus.success,
          errorMessage: null,
        ),
      ),
    );
  }
}