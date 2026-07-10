import 'package:freezed_annotation/freezed_annotation.dart';
import 'package:optimatech_lms/features/home/data/models/continue_learning_model.dart';
import 'package:optimatech_lms/features/home/data/models/popular_course_model.dart';
import 'package:optimatech_lms/features/home/data/models/recommended_course_model.dart';

part 'home_course_state.freezed.dart';

@freezed
class HomeCourseState with _$HomeCourseState {
  const factory HomeCourseState.initial() = _Initial;

  const factory HomeCourseState.loading() = _Loading;

  const factory HomeCourseState.loaded({
    required List<ContinueLearningModel> continueLearning,
    required List<PopularCourseModel> popularCourses,
    required List<RecommendedCourseModel> recommendedCourses,
  }) = _Loaded;

  const factory HomeCourseState.error(String message) = _Error;
}
