import 'package:dartz/dartz.dart';
import 'package:easy_localization/easy_localization.dart';
import 'package:firebase_auth/firebase_auth.dart';
import 'package:optimatech_lms/core/error/exceptions.dart';
import 'package:optimatech_lms/core/error/failures.dart';
import 'package:optimatech_lms/core/services/fire_store_service.dart';
import 'package:optimatech_lms/core/services/firebase_auth_service.dart';
import 'package:optimatech_lms/features/auth/data/models/user_model.dart';
import 'package:optimatech_lms/features/auth/domain/entities/user_entity.dart';
import '../../domain/repositories/auth_repository.dart';

class AuthRepositoryImpl implements AuthRepository {
  final FirebaseAuthService firebaseAuthService;
  final FireStoreService fireStoreService;

  AuthRepositoryImpl({required this.firebaseAuthService, required this.fireStoreService});
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
      final userModel = UserModel.fromFirebaseUser(user);
      await fireStoreService.addData(
        collectionPath: 'users',
        docId: user.uid,
        data: userModel.toMap(),
        merge: true,
      );
      return right(userModel.toEntity());
    }on CustomExceptions catch (e) {
      return left(ServerFailure(e.message));
    }catch (e){
      return left(ServerFailure('auth.error.genericError'.tr()));
    }
  }

  @override
  Future<Either<Failure, UserEntity>> signupWithEmail({required String email, required String password, required String fullName, required String phone}) async{
    try{
      User user = await firebaseAuthService.createUserWithEmailPassword(email: email, password: password);
      await user.updateDisplayName(fullName);
      await fireStoreService.addData(
        collectionPath: 'users',
        docId: user.uid,
        data: UserModel(
          name: fullName,
          email: email,
          uId: user.uid,
          phone: phone,
        ).toMap(),
      );
      UserEntity userEntity = UserModel.fromFirebaseUser(user).toEntity();
      return right(userEntity);
    }on CustomExceptions catch (e) {
      return left(ServerFailure(e.message));
    }catch (e){
      return left(ServerFailure('auth.error.genericError'.tr()));
    }
  }
}
