import 'package:optimatech_lms/core/error/failures.dart';
import 'package:optimatech_lms/features/auth/domain/entities/user_entity.dart';
import 'package:dartz/dartz.dart';

abstract class AuthRepository {
  Future<Either<Failure, UserEntity>> signupWithEmail({
    required String email,
    required String password,
    required String fullName,
    required String nationalId
  });
  Future<Either<Failure, UserEntity>> loginWithEmailPassword({required String email, required String password});
  Future<Either<Failure, UserEntity>> loginWithGoogle();

  /// Sends a password-reset email. Succeeds (Unit) even when no account exists
  /// for the address, so callers never leak whether an email is registered.
  Future<Either<Failure, Unit>> sendPasswordReset({required String email});

  Future<void> setRememberMeState(bool isChecked);
  Future<bool> getRememberMeState();
}
