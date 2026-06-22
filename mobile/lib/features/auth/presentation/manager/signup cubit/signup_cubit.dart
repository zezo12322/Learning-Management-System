import 'package:equatable/equatable.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:optimatech_lms/features/auth/domain/repositories/auth_repository.dart';

part 'signup_state.dart';

class SignupCubit extends Cubit<SignupState> {
  SignupCubit({required AuthRepository authRepository}) : _authRepository = authRepository, super(const SignupState());
  final AuthRepository _authRepository;

  void toggleTerms(bool value){
    emit(state.copyWith(isAgree: value));
  }

  void fullNameChanged(){
    if(state.emailError != null){
      emit(state.copyWith(fullNameError: null));
    }
  }
  void emailChanged(){
    if(state.emailError != null){
      emit(state.copyWith(emailError: null));
    }
  }
  void phoneChanged(){
    if(state.emailError != null){
      emit(state.copyWith(passwordError: null));
    }
  }
  void passwordChanged(){
    if(state.passwordError != null){
      emit(state.copyWith(passwordError: null));
    }
  }
  void confirmPasswordChanged(){
    if(state.passwordError != null){
      emit(state.copyWith(confirmPasswordError: null));
    }
  }

  Future<void> signup({required String email, required String password}) async{
    // final emailError= AppValidators.validateEmail(email);
    // final passwordError = AppValidators.validatePassword(password);
    //
    // if(emailError != null || passwordError != null){
    //   emit(
    //     state.copyWith(
    //       emailError: emailError,
    //       passwordError: passwordError,
    //     ),
    //   );
    //   return;
    // }

    emit(state.copyWith(status: SignupStatus.loading, errorMessage: null));

    final response = await _authRepository.signupWithEmail(email: email, password: password);

    response.fold(
          (failure) => emit(
        state.copyWith(
          errorMessage: failure.message,
          status: SignupStatus.failure,
        ),
      ),
          (success) => emit(
        state.copyWith(
          status: SignupStatus.success,
        ),
      ),
    );
  }
}
