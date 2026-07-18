import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:optimatech_lms/features/courses/domain/entities/courses_entity.dart';
import '../../../domain/repositories/courses_repository.dart';
import '../../views/widgets/courses_filter_chips_row.dart';
import 'courses_state.dart';

class CoursesCubit extends Cubit<CoursesState> {
  CoursesCubit({required CoursesRepository repository}) : _repository = repository, super(const CoursesState());

  final CoursesRepository _repository;

  Future<void> init() async {
    await loadCourses();
  }

  Future<void> loadCourses() async {
    emit(state.copyWith(status: CoursesStatus.loading, errorMessage: null));

    final result = await _repository.getPublishedCourses();

    result.fold(
      (failure) => emit(
        state.copyWith(
          status: CoursesStatus.failure,
          errorMessage: failure.message,
        ),
      ),
      (courses) => emit(
        state.copyWith(
          status: CoursesStatus.loaded,
          allCourses: courses,
          filteredCourses: _applyFilter(courses, state.selectedFilter),
        ),
      ),
    );
  }

  void selectFilterChip(CourseFilterChip chip) {
    emit(
      state.copyWith(
        selectedFilter: chip,
        filteredCourses: _applyFilter(state.allCourses, chip),
      ),
    );
  }

  List<CourseEntity> _applyFilter(List<CourseEntity> source, CourseFilterChip chip,) {
    switch (chip) {
      case CourseFilterChip.all:
        return source;
      case CourseFilterChip.inProgress:
      case CourseFilterChip.completed:
      case CourseFilterChip.popular:
      case CourseFilterChip.newCourses:
      // These filters make sense once enrollment data is included.
      // For now we return all published courses unchanged.
        return source;
    }
  }

  void selectCategory(int index) {
    emit(state.copyWith(selectedCategoryIndex: index));
  }


  void toggleBookmark(String courseId) {
    final updated = Set<String>.from(state.bookmarkedIds);
    updated.contains(courseId) ? updated.remove(courseId) : updated.add(courseId);
    emit(state.copyWith(bookmarkedIds: updated));
  }
}

