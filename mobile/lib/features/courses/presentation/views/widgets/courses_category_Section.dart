import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';
import 'package:gap/gap.dart';
import 'package:optimatech_lms/core/utils/extension.dart';
import 'package:optimatech_lms/features/courses/domain/entities/category_entity.dart';
import 'package:optimatech_lms/features/courses/presentation/manager/categories_cubit/categories_cubit.dart';
import 'package:optimatech_lms/features/courses/presentation/manager/categories_cubit/categories_state.dart';
import 'package:skeletonizer/skeletonizer.dart';

import '../../../../../core/helper_function/dummy.dart';

class CourseCategory {
  final String label;
  final IconData icon;
  final Color iconColor;

  const CourseCategory({
    required this.label,
    required this.icon,
    required this.iconColor,
  });
}

class CoursesCategorySection extends StatelessWidget {
  const CoursesCategorySection({
    super.key,
    required this.selectedIndex,
    required this.onSelected,
    this.categories = defaultCategories,
  });

  final int selectedIndex;
  final ValueChanged<int> onSelected;
  final List<CourseCategory> categories;

  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: EdgeInsets.symmetric(horizontal: 16.h),
      child: Column(
        children: [
          SectionHeader(
            title: 'Categories',
            actionLabel: 'View all',
            onTap: () {},
          ),
          Gap(16.h),
          CategoriesList(categories: categories, selectedIndex: selectedIndex, onSelected: onSelected),
        ],
      ),
    );
  }
}

class CategoriesList extends StatelessWidget {
  const CategoriesList({
    super.key,
    required this.categories,
    required this.selectedIndex,
    required this.onSelected,
  });

  final List<CourseCategory> categories;
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
          return Text('حدث خطأ غير متوقع: ${state.errorMessage}');
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

class CategoryItem extends StatelessWidget {
  const CategoryItem({
    super.key,
    required this.category,
    required this.isSelected,
    required this.onTap,
  });

  final CategoryEntity category;
  final bool isSelected;
  final VoidCallback onTap;

  @override
  Widget build(BuildContext context) {
    return GestureDetector(
      onTap: onTap,
      child: AnimatedContainer(
        duration: const Duration(milliseconds: 200),
        width: 72.w,
        height: 42.w,
        padding: EdgeInsets.symmetric(vertical: 12.h),
        decoration: BoxDecoration(
          color: isSelected
              ? context.theme.colorScheme.primary.withOpacity(0.06)
              : context.theme.colorScheme.surface,
          borderRadius: BorderRadius.circular(16.r),
          border: Border.all(
            color: isSelected ? context.theme.colorScheme.primary : context.theme.colorScheme.outline,
            width: 1.5,
          ),
        ),
        child: Column(
          children: [
            // Icon(
            //   category.icon,
            //   size: 24.r,
            //   color: isSelected ? context.theme.colorScheme.primary : category.iconColor,
            // ),
            // Gap(6.h),
            Padding(
              padding: EdgeInsets.symmetric(horizontal: 4.w),
              child: Text(
                category.name,
                style: context.textTheme.labelSmall?.copyWith(
                  color: isSelected
                      ? context.theme.colorScheme.primary
                      : context.theme.colorScheme.onSurface,
                  fontWeight: FontWeight.w600,
                  fontSize: 10.sp,
                ),
                textAlign: TextAlign.center,
                maxLines: 1,
                overflow: TextOverflow.ellipsis,
              ),
            ),
          ],
        ),
      ),
    );
  }
}

class SectionHeader extends StatelessWidget {
  const SectionHeader({
    super.key,
    required this.title,
    this.actionLabel,
    this.onTap,
  });

  final String title;
  final String? actionLabel;
  final VoidCallback? onTap;

  @override
  Widget build(BuildContext context) {
    return Row(
      mainAxisAlignment: MainAxisAlignment.spaceBetween,
      children: [
        Text(
          title,
          style: context.textTheme.labelLarge,
        ),
        actionLabel != null
          ? GestureDetector(
              onTap: onTap,
              child: Row(
                mainAxisSize: MainAxisSize.min,
                children: [
                  Text(
                    actionLabel!,
                    style: context.textTheme.labelLarge?.copyWith(
                      color: context.theme.colorScheme.primary,
                      fontWeight: FontWeight.w600,
                    ),
                  ),
                  SizedBox(width: 4.w),
                  Icon(
                    Icons.arrow_forward_ios_rounded,
                    size: 11.r,
                    color: context.theme.colorScheme.primary,
                  ),
                ],
              ),
            )
          : const SizedBox.shrink(),
      ],
    );
  }
}