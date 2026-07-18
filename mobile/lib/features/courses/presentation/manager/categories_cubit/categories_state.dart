import 'package:freezed_annotation/freezed_annotation.dart';
import 'package:optimatech_lms/features/courses/domain/entities/category_entity.dart';

part 'categories_state.freezed.dart';

enum CategoriesStatus { initial, loading, loaded, failure }

@freezed
class CategoriesState with _$CategoriesState {
  const factory CategoriesState({
    @Default(CategoriesStatus.initial) CategoriesStatus status,
    @Default(<CategoryEntity>[]) List<CategoryEntity> categories,
    String? errorMessage,
  }) = _CategoriesState;
}