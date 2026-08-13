import 'dart:async';

import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:optimatech_lms/core/bloc/safe_emit.dart';
import 'package:optimatech_lms/features/courses/domain/repositories/courses_repository.dart';

import 'search_state.dart';

class SearchCubit extends Cubit<SearchState> with SafeEmit<SearchState> {
  SearchCubit({required CoursesRepository repository})
      : _repository = repository,
        super(const SearchState());

  final CoursesRepository _repository;
  Timer? _debounce;

  void onQueryChanged(String query) {
    _debounce?.cancel();

    final trimmed = query.trim();

    if (trimmed.isEmpty) {
      emit(
        state.copyWith(
          status: SearchStatus.initial,
          query: '',
          results: const [],
          errorMessage: null,
        ),
      );
      return;
    }

    emit(state.copyWith(query: query));

    _debounce = Timer(
      const Duration(milliseconds: 400),
      () => _search(trimmed),
    );
  }

  Future<void> _search(String query) async {
    emit(
      state.copyWith(
        status: SearchStatus.loading,
        errorMessage: null,
      ),
    );

    final result = await _repository.searchCourses(query);

    result.fold(
      (failure) => emit(
        state.copyWith(
          status: SearchStatus.failure,
          errorMessage: failure.message,
        ),
      ),
      (courses) => emit(
        state.copyWith(
          status: courses.isEmpty ? SearchStatus.empty : SearchStatus.loaded,
          results: courses,
          errorMessage: null,
        ),
      ),
    );
  }

  @override
  Future<void> close() {
    _debounce?.cancel();
    return super.close();
  }
}
