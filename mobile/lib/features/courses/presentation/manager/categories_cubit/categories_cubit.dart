import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:optimatech_lms/features/courses/domain/repositories/categories_repository.dart';
import 'package:optimatech_lms/features/courses/presentation/manager/categories_cubit/categories_state.dart';

class CategoriesCubit extends Cubit<CategoriesState> {
  CategoriesCubit({required this.repository}) : super(const CategoriesState());

  final CategoriesRepository repository;

  Future<void> loadCategories() async {
    emit(state.copyWith(status: CategoriesStatus.loading, errorMessage: null));

    final result = await repository.getCategories();

    result.fold(
      (failure) => emit(
        state.copyWith(
          status: CategoriesStatus.failure,
          errorMessage: failure.message,
        ),
      ),
      (categories) => emit(
        state.copyWith(
          status: CategoriesStatus.loaded,
          categories: categories,
        ),
      ),
    );
  }
}
