import 'package:dartz/dartz.dart';
import 'package:easy_localization/easy_localization.dart';
import 'package:firebase_auth/firebase_auth.dart';
import 'package:optimatech_lms/core/error/exceptions.dart';
import 'package:optimatech_lms/core/error/failures.dart';
import 'package:optimatech_lms/core/services/firebase_auth_service.dart';
import 'package:optimatech_lms/features/auth/data/models/user_model.dart';
import 'package:optimatech_lms/features/auth/domain/entities/user_entity.dart';
import '../../domain/repositories/auth_repository.dart';

class AuthRepositoryImpl implements AuthRepository {
  final FirebaseAuthService firebaseAuthService;

  AuthRepositoryImpl({required this.firebaseAuthService});
  @override
  Future<Either<Failure, UserEntity>> loginWithEmailPassword({required String email, required String password}) async{
    try{
      User user = await firebaseAuthService.signInWithEmailPassword(email: email, password: password);
      UserEntity userEntity = UserModel.fromFirebaseUser(user).toEntity();
      return right(userEntity);
    }on CustomExceptions catch (e) {
      return left(ServerFailure(e.message));
    }catch (e){
      return left(ServerFailure('auth.error.genericError'.tr()));
    }
  }

  @override
  Future<Either<Failure, UserEntity>> loginWithGoogle() async{
    try{
      User user = await firebaseAuthService.signInWithGoogle();
      UserEntity userEntity = UserModel.fromFirebaseUser(user).toEntity();
      return right(userEntity);
    }on CustomExceptions catch (e) {
      return left(ServerFailure(e.message));
    }catch (e){
      return left(ServerFailure('auth.error.genericError'.tr()));
    }
  }

  @override
  Future<Either<Failure, UserEntity>> signupWithEmail({required String email, required String password}) async{
    try{
      User user = await firebaseAuthService.createUserWithEmailPassword(email: email, password: password);
      UserEntity userEntity = UserModel.fromFirebaseUser(user).toEntity();
      return right(userEntity);
    }on CustomExceptions catch (e) {
      return left(ServerFailure(e.message));
    }catch (e){
      return left(ServerFailure('auth.error.genericError'.tr()));
    }
  }
}
