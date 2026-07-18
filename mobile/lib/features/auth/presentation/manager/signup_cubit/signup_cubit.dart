import 'package:easy_localization/easy_localization.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:optimatech_lms/features/auth/domain/repositories/auth_repository.dart';
import 'signup_state.dart';

class SignupCubit extends Cubit<SignupState> {
  SignupCubit({required AuthRepository authRepository}) : _authRepository = authRepository, super(const SignupState());
  final AuthRepository _authRepository;

  void toggleTerms(bool value){
    emit(state.copyWith(status: SignupStatus.initial, isAgree: value));
  }

  void fullNameChanged(){
    if(state.fullNameError != null){
      emit(state.copyWith(fullNameError: null));
    }
  }
  void emailChanged(){
    if(state.emailError != null){
      emit(state.copyWith(emailError: null));
    }
  }
  void phoneChanged(){
    if(state.phoneError != null){
      emit(state.copyWith(phoneError: null));
    }
  }
  void passwordChanged(){
    if(state.passwordError != null){
      emit(state.copyWith(passwordError: null));
    }
  }
  void confirmPasswordChanged(){
    if(state.confirmPasswordError != null){
      emit(state.copyWith(confirmPasswordError: null));
    }
  }

  Future<void> signup({
    required String fullName,
    required String email,
    required String phone,
    required String password,
  }) async{

    if (!state.isAgree) {
      emit(
        state.copyWith(
          status: SignupStatus.failure,
          errorMessage: 'auth.error.accept_terms_required'.tr(),
        ),
      );
      return;
    }

    emit(state.copyWith(status: SignupStatus.loading, errorMessage: null));

    final response = await _authRepository.signupWithEmail(email: email, password: password, fullName: fullName, phone: phone);

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
          errorMessage: null,
        ),
      ),
    );
  }
}
