import 'package:get_it/get_it.dart';
import 'package:dio/dio.dart';
import 'package:optimatech_lms/features/chatbot/data/datasources/chat_remote_data_source.dart';
import 'package:optimatech_lms/features/chatbot/data/datasources/chat_remote_data_source_impl.dart';
import 'package:optimatech_lms/features/chatbot/data/repositories/chat_repository_impl.dart';
import 'package:optimatech_lms/features/chatbot/domain/repositories/chat_repository.dart';
import 'package:optimatech_lms/features/chatbot/domain/usecases/send_message_usecase.dart';
import 'package:optimatech_lms/features/chatbot/domain/usecases/get_chat_history_usecase.dart';
import 'package:optimatech_lms/features/chatbot/domain/usecases/save_chat_history_usecase.dart';
import 'package:optimatech_lms/features/chatbot/data/datasources/chat_local_data_source.dart';
import 'package:optimatech_lms/features/chatbot/data/datasources/chat_local_data_source_impl.dart';
import 'package:optimatech_lms/features/chatbot/presentation/manager/chat_cubit/chat_cubit.dart';
import 'package:optimatech_lms/core/services/fire_store_service.dart';
import 'package:optimatech_lms/core/services/firebase_auth_service.dart';
import 'package:optimatech_lms/features/auth/data/datasources/auth_local_data_sources.dart';
import 'package:optimatech_lms/features/auth/data/repositories/auth_repository_impl.dart';
import 'package:optimatech_lms/features/auth/domain/repositories/auth_repository.dart';
import 'package:optimatech_lms/features/auth/presentation/manager/login_cubit/log_in_cubit.dart';
import 'package:optimatech_lms/features/auth/presentation/manager/signup_cubit/signup_cubit.dart';
import 'package:optimatech_lms/features/auth/presentation/manager/forgot_password_cubit/forgot_password_cubit.dart';
import 'package:optimatech_lms/core/network/api_service.dart';
import 'package:optimatech_lms/features/course_learning/data/datasources/course_learning_remote_datasource.dart';
import 'package:optimatech_lms/features/course_learning/data/repositories/course_learning_repository_impl.dart';
import 'package:optimatech_lms/features/course_learning/domain/repositories/course_learning_repository.dart';
import 'package:optimatech_lms/features/course_learning/domain/usecases/get_course_curriculum_usecase.dart';
import 'package:optimatech_lms/features/course_learning/domain/usecases/get_lecture_content_usecase.dart';
import 'package:optimatech_lms/features/course_learning/domain/usecases/update_lecture_progress_usecase.dart';
import 'package:optimatech_lms/features/course_learning/presentation/manager/course_learning_cubit.dart';
import 'package:optimatech_lms/features/courses/data/datasources/categories_remote_datasource/categories_remote_datasource.dart';
import 'package:optimatech_lms/features/courses/data/datasources/courses_remote_datasource/courses_remote_datasource_impl.dart';
import 'package:optimatech_lms/features/courses/data/repositories/categories_repository_impl.dart';
import 'package:optimatech_lms/features/courses/data/repositories/courses_repository_impl.dart';
import 'package:optimatech_lms/features/courses/domain/repositories/courses_repository.dart';
import 'package:optimatech_lms/features/courses/presentation/manager/categories_cubit/categories_cubit.dart';
import 'package:optimatech_lms/features/home/data/datasources/home_remote_data_source.dart';
import 'package:optimatech_lms/features/profile/data/datasources/theme_local_data_source.dart';
import 'package:optimatech_lms/features/profile/presentation/manager/theme/theme_cubit.dart';
import 'package:shared_preferences/shared_preferences.dart';
import '../../dataconnect_generated/generated.dart';
import '../../features/courses/data/datasources/categories_remote_datasource/categories_remote_datasource_impl.dart';
import '../../features/courses/data/datasources/courses_remote_datasource/courses_remote_datasource.dart';
import '../../features/courses/domain/repositories/categories_repository.dart';
import '../../features/courses/presentation/manager/courses_cubit/courses_cubit.dart';
import 'package:optimatech_lms/features/home/data/datasources/home_remote_data_source_impl.dart';
import 'package:optimatech_lms/features/home/data/repositories/home_repository_impl.dart';
import 'package:optimatech_lms/features/home/domain/repositories/home_repository.dart';
import 'package:optimatech_lms/features/home/domain/usecases/get_continue_learning_courses_use_case.dart';
import 'package:optimatech_lms/features/home/domain/usecases/get_popular_courses_use_case.dart';
import 'package:optimatech_lms/features/home/domain/usecases/get_recommended_courses_use_case.dart';
import 'package:optimatech_lms/features/home/presentation/manager/home_courses_cubit/home_courses_cubit.dart';
import 'package:optimatech_lms/features/course_details/data/data_source/course_details_remote_data_source.dart';
import 'package:optimatech_lms/features/course_details/data/repositories/course_details_repository_impl.dart';
import 'package:optimatech_lms/features/course_details/domain/repositories/course_details_repository.dart';
import 'package:optimatech_lms/features/course_details/presentation/manager/course_details_cubit.dart';
import 'package:optimatech_lms/features/quiz/data/datasources/quiz_remote_datasource.dart';
import 'package:optimatech_lms/features/quiz/data/repositories/quiz_repository_impl.dart';
import 'package:optimatech_lms/features/quiz/domain/repositories/quiz_repository.dart';
import 'package:optimatech_lms/features/quiz/presentation/manager/quiz_cubit.dart';
import 'package:optimatech_lms/features/notifications/presentation/manager/notifications_cubit.dart';

final getIt = GetIt.instance;
Future<void> setupDependencies() async {
  // ========================= Auth Feature =========================
  final sharedPreferences = await SharedPreferences.getInstance();
  getIt.registerLazySingleton<SharedPreferences>(() => sharedPreferences);

  getIt.registerLazySingleton<ApiService>(() => ApiService());

  getIt.registerLazySingleton<FirebaseAuthService>(() => FirebaseAuthService(),);
  getIt.registerLazySingleton<FireStoreService>(() => FireStoreService(),);
  getIt.registerLazySingleton<AuthLocalDataSources>(() => AuthLocalDataSourcesImpl(sharedPreferences: getIt<SharedPreferences>()),);
  getIt.registerLazySingleton<AuthRepository>(() =>
      AuthRepositoryImpl(
        firebaseAuthService: getIt<FirebaseAuthService>(),
        fireStoreService: getIt<FireStoreService>(),
        authLocalDataSources: getIt<AuthLocalDataSources>()),
      );

  getIt.registerFactory<LogInCubit>(
    () => LogInCubit(authRepository: getIt<AuthRepository>()),
  );
  getIt.registerFactory<SignupCubit>(
    () => SignupCubit(authRepository: getIt<AuthRepository>()),
  );
  getIt.registerFactory<ForgotPasswordCubit>(
    () => ForgotPasswordCubit(authRepository: getIt<AuthRepository>()),
  );

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
  getIt.registerFactory<HomeCoursesCubit>(
    () => HomeCoursesCubit(
      getContinueLearningCoursesUseCase:
          getIt<GetContinueLearningCoursesUseCase>(),
      getPopularCoursesUseCase: getIt<GetPopularCoursesUseCase>(),
      getRecommendedCoursesUseCase: getIt<GetRecommendedCoursesUseCase>(),
    ),
  );

  getIt.registerLazySingleton<CoursesRemoteDatasource>(
    () => CoursesRemoteDatasourceImpl(DefaultConnector.instance),
  );
  getIt.registerLazySingleton<CoursesRepository>(
    () => CoursesRepositoryImpl(getIt<CoursesRemoteDatasource>()),
  );
  getIt.registerFactory<CoursesCubit>(
    () => CoursesCubit(repository: getIt<CoursesRepository>()),
  );

  getIt.registerLazySingleton<CategoriesRemoteDatasource>(
    () => CategoriesRemoteDatasourceImpl(DefaultConnector.instance),
  );
  getIt.registerLazySingleton<CategoriesRepository>(
    () => CategoriesRepositoryImpl(getIt<CategoriesRemoteDatasource>()),
  );
  getIt.registerFactory<CategoriesCubit>(
    () => CategoriesCubit(repository: getIt<CategoriesRepository>()),
  );

  getIt.registerLazySingleton<ThemeLocalDataSource>(
    () => ThemeLocalDataSourceImpl(getIt<SharedPreferences>()),
  );
  getIt.registerFactory<ThemeCubit>(
      () => ThemeCubit(themeLocalDataSource: getIt<ThemeLocalDataSource>()));

  // ========================= Course Learning Feature =========================
  getIt.registerLazySingleton<CourseLearningRemoteDataSource>(
    () => CourseLearningRemoteDataSourceImpl(apiService: getIt<ApiService>()),
  );
  getIt.registerLazySingleton<CourseLearningRepository>(
    () => CourseLearningRepositoryImpl(remoteDataSource: getIt<CourseLearningRemoteDataSource>()),
  );
  getIt.registerLazySingleton<GetCourseCurriculumUseCase>(
    () => GetCourseCurriculumUseCase(getIt<CourseLearningRepository>()),
  );
  getIt.registerLazySingleton<GetLectureContentUseCase>(
    () => GetLectureContentUseCase(getIt<CourseLearningRepository>()),
  );
  getIt.registerLazySingleton<UpdateLectureProgressUseCase>(
    () => UpdateLectureProgressUseCase(getIt<CourseLearningRepository>()),
  );

  getIt.registerFactory<CourseLearningCubit>(
    () => CourseLearningCubit(
      getCourseCurriculumUseCase: getIt<GetCourseCurriculumUseCase>(),
      getLectureContentUseCase: getIt<GetLectureContentUseCase>(),
      updateLectureProgressUseCase: getIt<UpdateLectureProgressUseCase>(),
    ),
  );

  getIt.registerLazySingleton<CourseDetailsRemoteDataSource>(
    () => CourseDetailsRemoteDataSourceImpl(apiService: getIt<ApiService>()),
  );
  getIt.registerLazySingleton<CourseDetailsRepository>(
    () => CourseDetailsRepositoryImpl(remoteDataSource: getIt<CourseDetailsRemoteDataSource>()),
  );
  getIt.registerFactory<CourseDetailsCubit>(
    () => CourseDetailsCubit(getIt<CourseDetailsRepository>()),
  );

  // ========================= Quiz Feature =========================
  getIt.registerLazySingleton<QuizRemoteDataSource>(
    () => QuizRemoteDataSourceImpl(apiService: getIt<ApiService>()),
  );
  getIt.registerLazySingleton<QuizRepository>(
    () => QuizRepositoryImpl(remoteDataSource: getIt<QuizRemoteDataSource>()),
  );
  getIt.registerFactory<QuizCubit>(
    () => QuizCubit(getIt<QuizRepository>()),
  );

  // ========================= Notifications Feature =========================
  getIt.registerFactory<NotificationsCubit>(() => NotificationsCubit());
  
  // ========================= Chatbot Feature =========================
  getIt.registerLazySingleton<ChatRemoteDataSource>(
    () => ChatRemoteDataSourceImpl(dio: Dio()), // Assuming Dio is used
  );
  getIt.registerLazySingleton<ChatLocalDataSource>(
    () => ChatLocalDataSourceImpl(sharedPreferences: getIt<SharedPreferences>()),
  );
  getIt.registerLazySingleton<ChatRepository>(
    () => ChatRepositoryImpl(
      remoteDataSource: getIt<ChatRemoteDataSource>(),
      localDataSource: getIt<ChatLocalDataSource>(),
    ),
  );
  getIt.registerLazySingleton<SendMessageUseCase>(
    () => SendMessageUseCase(getIt<ChatRepository>()),
  );
  getIt.registerLazySingleton<GetChatHistoryUseCase>(
    () => GetChatHistoryUseCase(getIt<ChatRepository>()),
  );
  getIt.registerLazySingleton<SaveChatHistoryUseCase>(
    () => SaveChatHistoryUseCase(getIt<ChatRepository>()),
  );
  getIt.registerFactory<ChatCubit>(
    () => ChatCubit(
      sendMessageUseCase: getIt<SendMessageUseCase>(),
      getChatHistoryUseCase: getIt<GetChatHistoryUseCase>(),
      saveChatHistoryUseCase: getIt<SaveChatHistoryUseCase>(),
    ),
  );
}
