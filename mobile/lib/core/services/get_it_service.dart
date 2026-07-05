import 'package:get_it/get_it.dart';
import 'package:optimatech_lms/core/services/fire_store_service.dart';
import 'package:optimatech_lms/core/services/firebase_auth_service.dart';
import 'package:optimatech_lms/features/auth/data/repositories/auth_repository_impl.dart';
import 'package:optimatech_lms/features/auth/domain/repositories/auth_repository.dart';
import 'package:optimatech_lms/features/auth/presentation/manager/login_cubit/log_in_cubit.dart';
import 'package:optimatech_lms/features/auth/presentation/manager/signup_cubit/signup_cubit.dart';
import 'package:optimatech_lms/features/home/data/datasources/home_remote_data_source.dart';
import 'package:optimatech_lms/features/home/data/repositories/home_repository_impl.dart';
import 'package:optimatech_lms/features/home/domain/repositories/home_repository.dart';
import 'package:optimatech_lms/features/home/domain/usecases/get_continue_learning_courses_use_case.dart';
import 'package:optimatech_lms/features/home/domain/usecases/get_popular_courses_use_case.dart';
import 'package:optimatech_lms/features/home/domain/usecases/get_recommended_courses_use_case.dart';
import 'package:optimatech_lms/features/home/presentation/manager/courses_cubit/courses_cubit.dart';

final getIt = GetIt.instance;
Future<void> setupDependencies() async {
  // ========================= Auth Feature =========================
  getIt.registerLazySingleton<FirebaseAuthService>(
    () => FirebaseAuthService(),
  );
  getIt.registerLazySingleton<FireStoreService>(
    () => FireStoreService(),
  );
  getIt.registerLazySingleton<AuthRepository>(
    () => AuthRepositoryImpl(
        firebaseAuthService: getIt<FirebaseAuthService>(),
        fireStoreService: getIt<FireStoreService>()),
  );
  getIt.registerFactory<LogInCubit>(
      () => LogInCubit(authRepository: getIt<AuthRepository>()));
  getIt.registerFactory<SignupCubit>(
      () => SignupCubit(authRepository: getIt<AuthRepository>()));

  // ========================= Home Feature =========================
  getIt.registerLazySingleton<HomeRemoteDataSource>(
    () => HomeRemoteDataSourceImpl(),
  );
  getIt.registerLazySingleton<HomeRepository>(
    () => HomeRepositoryImpl(getIt<HomeRemoteDataSource>()),
  );
  getIt.registerLazySingleton<GetContinueLearningCoursesUseCase>(
    () => GetContinueLearningCoursesUseCase(getIt<HomeRepository>()),
  );
  getIt.registerLazySingleton<GetPopularCoursesUseCase>(
    () => GetPopularCoursesUseCase(getIt<HomeRepository>()),
  );
  getIt.registerLazySingleton<GetRecommendedCoursesUseCase>(
    () => GetRecommendedCoursesUseCase(getIt<HomeRepository>()),
  );
  getIt.registerFactory<CoursesCubit>(
    () => CoursesCubit(
      getContinueLearningCoursesUseCase:
          getIt<GetContinueLearningCoursesUseCase>(),
      getPopularCoursesUseCase: getIt<GetPopularCoursesUseCase>(),
      getRecommendedCoursesUseCase: getIt<GetRecommendedCoursesUseCase>(),
    ),
  );
}
