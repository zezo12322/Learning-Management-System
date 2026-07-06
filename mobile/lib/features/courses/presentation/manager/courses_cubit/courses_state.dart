import 'package:freezed_annotation/freezed_annotation.dart';
import '../../../domain/entities/courses_entity.dart';
import '../../views/widgets/courses_filter_chips_row.dart';

part 'courses_state.freezed.dart';

enum CoursesStatus { initial, loading, loaded, failure }

@freezed
class CoursesState with _$CoursesState {
  const factory CoursesState({
    @Default(CoursesStatus.initial) CoursesStatus status,
    @Default(<CourseEntity>[]) List<CourseEntity> allCourses,
    @Default(<CourseEntity>[]) List<CourseEntity> filteredCourses,
    @Default(0) int selectedCategoryIndex,
    @Default(CourseFilterChip.all) CourseFilterChip selectedFilter,
    @Default(<String>{}) Set<String> bookmarkedIds,
    String? errorMessage,
  }) = _CoursesState;
}