import 'package:get_it/get_it.dart';
import 'package:optimatech_lms/core/services/fire_store_service.dart';
import 'package:optimatech_lms/core/services/firebase_auth_service.dart';
import 'package:optimatech_lms/features/auth/data/repositories/auth_repository_impl.dart';
import 'package:optimatech_lms/features/auth/domain/repositories/auth_repository.dart';
import 'package:optimatech_lms/features/auth/presentation/manager/login_cubit/log_in_cubit.dart';
import 'package:optimatech_lms/features/auth/presentation/manager/signup_cubit/signup_cubit.dart';
import 'package:optimatech_lms/features/courses/data/datasources/courses_remote_datasource_impl.dart';
import 'package:optimatech_lms/features/courses/data/repositories/courses_repository_impl.dart';
import 'package:optimatech_lms/features/courses/domain/repositories/courses_repository.dart';

import '../../dataconnect_generated/generated.dart';
import '../../features/courses/data/datasources/courses_remote_datasource.dart';
import '../../features/courses/presentation/manager/courses_cubit/courses_cubit.dart';

final getIt = GetIt.instance;
Future<void> setupDependencies() async {
  getIt.registerLazySingleton<FirebaseAuthService>(() => FirebaseAuthService(),);
  getIt.registerLazySingleton<FireStoreService>(() => FireStoreService(),);
  getIt.registerLazySingleton<AuthRepository>(() =>
      AuthRepositoryImpl(firebaseAuthService: getIt<FirebaseAuthService>(), fireStoreService: getIt<FireStoreService>()),);
  getIt.registerFactory<LogInCubit>(() => LogInCubit(authRepository: getIt<AuthRepository>()));
  getIt.registerFactory<SignupCubit>(() => SignupCubit(authRepository: getIt<AuthRepository>()));
  getIt.registerLazySingleton<CoursesRemoteDatasource>(() => CoursesRemoteDatasourceImpl(DefaultConnector.instance));
  getIt.registerLazySingleton<CoursesRepository>(() => CoursesRepositoryImpl(getIt<CoursesRemoteDatasource>()));
  getIt.registerFactory<CoursesCubit>(() => CoursesCubit(repository: getIt<CoursesRepository>()));
  
}