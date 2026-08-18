import 'package:dartz/dartz.dart';
import 'package:easy_localization/easy_localization.dart';
import 'package:firebase_auth/firebase_auth.dart';
import 'package:optimatech_lms/core/error/exceptions.dart';
import 'package:optimatech_lms/core/error/failures.dart';
import 'package:optimatech_lms/core/services/fire_store_service.dart';
import 'package:optimatech_lms/core/services/firebase_auth_service.dart';
import 'package:optimatech_lms/features/auth/data/datasources/auth_local_data_sources.dart';
import 'package:optimatech_lms/features/auth/data/models/user_model.dart';
import 'package:optimatech_lms/features/auth/domain/entities/user_entity.dart';
import '../../domain/repositories/auth_repository.dart';
import '../datasources/auth_remote_data_source.dart';

class AuthRepositoryImpl implements AuthRepository {
  final FirebaseAuthService firebaseAuthService;
  final FireStoreService fireStoreService;
  final AuthLocalDataSources authLocalDataSources;
  final AuthRemoteDataSource authRemoteDataSource;

  AuthRepositoryImpl({
    required this.firebaseAuthService,
    required this.fireStoreService,
    required this.authLocalDataSources,
    required this.authRemoteDataSource
  });

  @override
  Future<Either<Failure, UserEntity>> loginWithEmailPassword({required String email, required String password}) async{
    try{
      User user = await firebaseAuthService.signInWithEmailPassword(email: email, password: password);
      String? token = await user.getIdToken();
      if (token != null) authLocalDataSources.saveToken(token: token);

      // Backend contract: POST /me/sync must be the first authenticated REST
      // call after sign-in (Email/Password flow — Google flow skips this).
      await authRemoteDataSource.syncCurrentUser();

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
      String? token = await user.getIdToken();
      if (token != null) authLocalDataSources.saveToken(token: token);
      return right(userModel.toEntity());
    }on CustomExceptions catch (e) {
      return left(ServerFailure(e.message));
    }catch (e){
      return left(ServerFailure('auth.error.genericError'.tr()));
    }
  }

  @override
  Future<Either<Failure, UserEntity>> signupWithEmail({required String email, required String password, required String fullName, required String nationalId}) async{
    try{
      // 1) Create the account + DB row + default `student` claim,
      await firebaseAuthService.registerStudent(
        name: fullName,
        email: email,
        password: password,
        nationalId: nationalId,
      );

      // 2) registerStudent creates the account but does NOT sign the user
      // in — that must happen explicitly, exactly like a normal login.
      User user = await firebaseAuthService.signInWithEmailPassword(
        email: email,
        password: password,
      );
      String? token = await user.getIdToken();
      if (token != null) authLocalDataSources.saveToken(token: token);

      // 3) First authenticated REST call after sign-in.
      await authRemoteDataSource.syncCurrentUser();

      //await user.updateDisplayName(fullName);

      UserEntity userEntity = UserModel.fromFirebaseUser(user).toEntity();
      return right(userEntity);
    }on CustomExceptions catch (e) {
      return left(ServerFailure(e.message));
    }catch (e){
      return left(ServerFailure('auth.error.genericError'.tr()));
    }
  }

  @override
  Future<Either<Failure, Unit>> sendPasswordReset({required String email}) async {
    try {
      await firebaseAuthService.sendPasswordResetEmail(email: email);
      return right(unit);
    } on CustomExceptions catch (e) {
      return left(ServerFailure(e.message));
    } catch (e) {
      return left(ServerFailure('auth.error.genericError'.tr()));
    }
  }

  @override
  Future<bool> getRememberMeState() {
    return authLocalDataSources.getRememberMeState();
  }

  @override
  Future<void> setRememberMeState(bool isChecked) async{
    await authLocalDataSources.setRememberMeState(isChecked);
  }
}
