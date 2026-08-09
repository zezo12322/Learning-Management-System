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
import 'package:optimatech_lms/core/bloc/safe_emit.dart';

class HomeCoursesCubit extends Cubit<HomeCourseState> with SafeEmit<HomeCourseState> {
  HomeCoursesCubit({
    required this.getContinueLearningCoursesUseCase,
    required this.getPopularCoursesUseCase,
    required this.getRecommendedCoursesUseCase,
  }) : super(const HomeCourseState.initial());

  final GetContinueLearningCoursesUseCase getContinueLearningCoursesUseCase;
  final GetPopularCoursesUseCase getPopularCoursesUseCase;
  final GetRecommendedCoursesUseCase getRecommendedCoursesUseCase;

  /// Fetches only the popular list.
  ///
  /// The course-details screen shows a "You might also like" strip and used to
  /// get it by calling [fetchHomeCourses], which also runs the continue-learning
  /// and recommended queries — and the recommended one is itself two round trips
  /// (enrolled categories, then the recommendation). So opening any course
  /// detail cost four queries to render one carousel. This costs one.
  Future<void> fetchPopularCourses() async {
    emit(const HomeCourseState.loading());

    final result = await getPopularCoursesUseCase(null);
    if (isClosed) return;

    result.fold(
      (failure) => emit(HomeCourseState.error(failure.message)),
      (courses) => emit(
        HomeCourseState.loaded(
          continueLearning: const [],
          popularCourses: courses.cast<PopularCourseModel>(),
          recommendedCourses: const [],
        ),
      ),
    );
  }

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
    // The user can leave Home before these land; emitting into a closed cubit
    // throws a StateError.
    if (isClosed) return;

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
