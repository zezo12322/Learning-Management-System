import 'package:get_it/get_it.dart';
import 'package:optimatech_lms/core/services/firebase_auth_service.dart';
import 'package:optimatech_lms/features/auth/data/repositories/auth_repository_impl.dart';
import 'package:optimatech_lms/features/auth/domain/repositories/auth_repository.dart';
import 'package:optimatech_lms/features/auth/presentation/manager/login_cubit/log_in_cubit.dart';
import 'package:optimatech_lms/features/auth/presentation/manager/signup_cubit/signup_cubit.dart';

final getIt = GetIt.instance;
Future<void> setupDependencies() async {
  getIt.registerLazySingleton<FirebaseAuthService>(() => FirebaseAuthService(),);
  getIt.registerLazySingleton<AuthRepository>(() => AuthRepositoryImpl(firebaseAuthService: getIt<FirebaseAuthService>()),);
  getIt.registerFactory<LogInCubit>(() => LogInCubit(authRepository: getIt<AuthRepository>()));
  getIt.registerFactory<SignupCubit>(() => SignupCubit(authRepository: getIt<AuthRepository>()));
}