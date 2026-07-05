import 'package:freezed_annotation/freezed_annotation.dart';
import '../../../domain/entities/course_entity.dart';
import '../../../domain/entities/student_progress_entity.dart';

part 'course_state.freezed.dart';

@freezed
class CoursesState with _$CoursesState {
  const factory CoursesState.initial() = _Initial;

  const factory CoursesState.loading() = _Loading;

  const factory CoursesState.success({
    required StudentProgressEntity? continueLearning,
    required List<CourseEntity> popularCourses,
    required List<CourseEntity> recommendedCourses,
  }) = _Success;

  const factory CoursesState.error({
    required String message,
  }) = _Error;
}
