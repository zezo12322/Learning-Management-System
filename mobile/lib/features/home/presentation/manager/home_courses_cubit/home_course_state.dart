import 'package:freezed_annotation/freezed_annotation.dart';
import '../../../domain/entities/course_entity.dart';
import '../../../domain/entities/student_progress_entity.dart';

part 'home_course_state.freezed.dart';

@freezed
class HomeCoursesState with _$HomeCoursesState {
  const factory HomeCoursesState.initial() = _Initial;

  const factory HomeCoursesState.loading() = _Loading;

  const factory HomeCoursesState.success({
    required StudentProgressEntity? continueLearning,
    required List<CourseEntity> popularCourses,
    required List<CourseEntity> recommendedCourses,
  }) = _Success;

  const factory HomeCoursesState.error({
    required String message,
  }) = _Error;
}
