import 'package:dartz/dartz.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:optimatech_lms/core/error/failures.dart';
import 'package:optimatech_lms/features/home/presentation/manager/home_courses_cubit/home_course_state.dart';
import 'package:optimatech_lms/features/home/data/models/continue_learning_model.dart';
import 'package:optimatech_lms/features/home/data/models/popular_course_model.dart';
import 'package:optimatech_lms/features/home/data/models/recommended_course_model.dart';
import 'package:optimatech_lms/features/home/domain/entities/home_course_entity.dart';
import 'package:optimatech_lms/features/home/domain/entities/student_progress_entity.dart';
import '../../../domain/usecases/get_continue_learning_courses_use_case.dart';
import '../../../domain/usecases/get_popular_courses_use_case.dart';
import '../../../domain/usecases/get_recommended_courses_use_case.dart';

class HomeCoursesCubit extends Cubit<HomeCourseState> {
  HomeCoursesCubit({
    required this.getContinueLearningCoursesUseCase,
    required this.getPopularCoursesUseCase,
    required this.getRecommendedCoursesUseCase,
  }) : super(const HomeCourseState.initial());

  final GetContinueLearningCoursesUseCase getContinueLearningCoursesUseCase;
  final GetPopularCoursesUseCase getPopularCoursesUseCase;
  final GetRecommendedCoursesUseCase getRecommendedCoursesUseCase;

  Future<void> fetchHomeCourses() async {
    emit(const HomeCourseState.loading());

    final continueLearningFuture = getContinueLearningCoursesUseCase(null);
    final popularCoursesFuture = getPopularCoursesUseCase(null);
    final recommendedCoursesFuture = getRecommendedCoursesUseCase(null);

    final results = await Future.wait<Object>([
      continueLearningFuture,
      popularCoursesFuture,
      recommendedCoursesFuture,
    ]);

    final continueLearningResultRaw =
        results[0] as Either<Failure, List<StudentProgressEntity>>;
    final popularCoursesResultRaw =
        results[1] as Either<Failure, List<HomeCourseEntity>>;
    final recommendedCoursesResultRaw =
        results[2] as Either<Failure, List<HomeCourseEntity>>;

    final failureMessage = continueLearningResultRaw.fold(
          (failure) => failure.message,
          (_) => null,
        ) ??
        popularCoursesResultRaw.fold(
          (failure) => failure.message,
          (_) => null,
        ) ??
        recommendedCoursesResultRaw.fold(
          (failure) => failure.message,
          (_) => null,
        );

    if (failureMessage != null) {
      emit(HomeCourseState.error(failureMessage));
      return;
    }

    final continueLearning = continueLearningResultRaw.fold(
      (failure) => <ContinueLearningModel>[],
      (courses) => courses.cast<ContinueLearningModel>(),
    );
    final popularCourses = popularCoursesResultRaw.fold(
      (failure) => <PopularCourseModel>[],
      (courses) => courses.cast<PopularCourseModel>(),
    );
    final recommendedCourses = recommendedCoursesResultRaw.fold(
      (failure) => <RecommendedCourseModel>[],
      (courses) => courses.cast<RecommendedCourseModel>(),
    );

    emit(
      HomeCourseState.loaded(
        continueLearning: continueLearning,
        popularCourses: popularCourses,
        recommendedCourses: recommendedCourses,
      ),
    );
  }
}
