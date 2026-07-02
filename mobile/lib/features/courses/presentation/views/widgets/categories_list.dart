import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';
import 'package:gap/gap.dart';
import 'package:optimatech_lms/core/helper_function/dummy.dart';
import 'package:optimatech_lms/core/widgets/app_error_widget.dart';
import 'package:optimatech_lms/features/courses/domain/entities/category_entity.dart';
import 'package:optimatech_lms/features/courses/presentation/manager/categories_cubit/categories_cubit.dart';
import 'package:optimatech_lms/features/courses/presentation/manager/categories_cubit/categories_state.dart';
import 'package:optimatech_lms/features/courses/presentation/views/widgets/category_item.dart';
import 'package:skeletonizer/skeletonizer.dart';

class CategoriesList extends StatelessWidget {
  const CategoriesList({
    super.key,
    required this.selectedIndex,
    required this.onSelected,
  });

  final int selectedIndex;
  final ValueChanged<int> onSelected;

  @override
  Widget build(BuildContext context) {
    return BlocBuilder<CategoriesCubit, CategoriesState>(
      builder: (context, state) {
        switch (state.status) {
          case CategoriesStatus.initial:
          case CategoriesStatus.loading:
            return Skeletonizer(
              child: SizedBox(
                height: 72.h,
                child: _CategoriesListView(
                  categories: List.generate(5, (_) => dummySkeletonCategoryItem),
                  selectedIndex: selectedIndex,
                  onSelected: onSelected,
                ),
              ),
            );
          case CategoriesStatus.failure:
            return AppErrorWidget(
              message: state.errorMessage,
              onRetry: () => context.read<CategoriesCubit>().loadCategories(),
            );
          case CategoriesStatus.loaded:
            return SizedBox(
              height: 42.h,
              child: _CategoriesListView(
                categories: state.categories,
                selectedIndex: selectedIndex,
                onSelected: onSelected,
              ),
            );
        }
      },
    );
  }
}

class _CategoriesListView extends StatelessWidget {
  const _CategoriesListView({
    required this.categories,
    required this.selectedIndex,
    required this.onSelected,
  });

  final List<CategoryEntity> categories;
  final int selectedIndex;
  final ValueChanged<int> onSelected;

  @override
  Widget build(BuildContext context) {
    return ListView.separated(
      scrollDirection: Axis.horizontal,
      itemCount: categories.length,
      separatorBuilder: (context, index) => Gap(12.w),
      itemBuilder: (context, i) {
        return CategoryItem(
          category: categories[i],
          isSelected: i == selectedIndex,
          onTap: () => onSelected(i),
        );
      },
    );
  }
}