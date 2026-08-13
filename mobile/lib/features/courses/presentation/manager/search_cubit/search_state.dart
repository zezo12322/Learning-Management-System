import 'package:freezed_annotation/freezed_annotation.dart';
import '../../../domain/entities/courses_entity.dart';

part 'search_state.freezed.dart';

enum SearchStatus { initial, loading, loaded, empty, failure }

@freezed
class SearchState with _$SearchState {
  const factory SearchState({
    @Default(SearchStatus.initial) SearchStatus status,
    @Default('') String query,
    @Default([]) List<CourseEntity> results,
    String? errorMessage,
  }) = _SearchState;
}