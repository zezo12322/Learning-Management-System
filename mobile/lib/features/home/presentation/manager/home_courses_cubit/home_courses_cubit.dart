import 'package:dartz/dartz.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:optimatech_lms/core/error/failures.dart';
import 'package:optimatech_lms/features/home/presentation/manager/home_courses_cubit/home_course_state.dart';
import '../../../domain/entities/course_entity.dart';
import '../../../domain/entities/student_progress_entity.dart';
import '../../../domain/usecases/get_continue_learning_courses_use_case.dart';
import '../../../domain/usecases/get_popular_courses_use_case.dart';
import '../../../domain/usecases/get_recommended_courses_use_case.dart';

class HomeCoursesCubit extends Cubit<HomeCoursesState> {
  HomeCoursesCubit({
    required this.getContinueLearningCoursesUseCase,
    required this.getPopularCoursesUseCase,
    required this.getRecommendedCoursesUseCase,
  }) : super(const HomeCoursesState.initial());

  final GetContinueLearningCoursesUseCase getContinueLearningCoursesUseCase;
  final GetPopularCoursesUseCase getPopularCoursesUseCase;
  final GetRecommendedCoursesUseCase getRecommendedCoursesUseCase;

  Future<void> fetchHomeCourses() async {
    emit(const HomeCoursesState.loading());

    final continueLearningFuture = getContinueLearningCoursesUseCase();
    final popularCoursesFuture = getPopularCoursesUseCase();
    final recommendedCoursesFuture = getRecommendedCoursesUseCase();

    final results = await Future.wait<Object>([
      continueLearningFuture,
      popularCoursesFuture,
      recommendedCoursesFuture,
    ]);

    final continueLearningResult =
        results[0] as Either<Failure, StudentProgressEntity?>;
    final popularCoursesResult =
        results[1] as Either<Failure, List<CourseEntity>>;
    final recommendedCoursesResult =
        results[2] as Either<Failure, List<CourseEntity>>;

    final failureMessage = continueLearningResult.fold(
          (failure) => failure.message,
          (_) => null,
        ) ??
        popularCoursesResult.fold(
          (failure) => failure.message,
          (_) => null,
        ) ??
        recommendedCoursesResult.fold(
          (failure) => failure.message,
          (_) => null,
        );

    if (failureMessage != null) {
      emit(HomeCoursesState.error(message: failureMessage));
      return;
    }

    final continueLearning = continueLearningResult.getOrElse(() => null);
    final popularCourses =
        popularCoursesResult.getOrElse(() => <CourseEntity>[]);
    final recommendedCourses =
        recommendedCoursesResult.getOrElse(() => <CourseEntity>[]);

    emit(
      HomeCoursesState.success(
        continueLearning: continueLearning,
        popularCourses: popularCourses,
        recommendedCourses: recommendedCourses,
      ),
    );
  }
}
