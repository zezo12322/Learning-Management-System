import 'package:optimatech_lms/core/error/failures.dart';
import 'package:optimatech_lms/features/auth/domain/entities/user_entity.dart';
import 'package:dartz/dartz.dart';

abstract class AuthRepository {
  Future<Either<Failure, UserEntity>> signupWithEmail({required String email, required String password});
  Future<Either<Failure, UserEntity>> loginWithEmailPassword({required String email, required String password});
  Future<Either<Failure, UserEntity>> loginWithGoogle();
}
