import 'package:easy_localization/easy_localization.dart';
import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';
import 'package:gap/gap.dart';
import 'package:optimatech_lms/core/services/get_it_service.dart';
import 'package:optimatech_lms/core/utils/extension.dart';
import 'package:optimatech_lms/core/widgets/app_search_filed.dart';
import 'package:optimatech_lms/core/widgets/custom_app_bar.dart';
import 'package:optimatech_lms/core/widgets/notification_button.dart';
import 'package:optimatech_lms/features/courses/presentation/views/search_view.dart';
import 'package:optimatech_lms/features/notifications/presentation/views/notifications_view.dart';
import 'package:optimatech_lms/features/courses/presentation/manager/categories_cubit/categories_cubit.dart';
import 'package:optimatech_lms/features/courses/presentation/manager/courses_cubit/courses_cubit.dart';
import 'package:optimatech_lms/features/courses/presentation/manager/courses_cubit/courses_state.dart';
import 'package:optimatech_lms/features/courses/presentation/views/widgets/courses_category_Section.dart';
import 'package:optimatech_lms/features/courses/presentation/views/widgets/courses_list.dart';

class CoursesView extends StatelessWidget {
  const CoursesView({super.key});

  static const String routeName = '/courses';

  @override
  Widget build(BuildContext context) {
    return MultiBlocProvider(
      providers: [
        BlocProvider<CoursesCubit>(
          create: (context) => getIt<CoursesCubit>()..init(),
        ),
        BlocProvider<CategoriesCubit>(
          create: (context) => getIt<CategoriesCubit>()..loadCategories(),
        ),
      ],
      child: const CourseBody(),
    );
  }
}

class CourseBody extends StatelessWidget {
  const CourseBody({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: CustomAppBar(
        titleWidget: Text(
          'courses.title'.tr(),
          style: context.textTheme.titleMedium?.copyWith(
            color: context.theme.colorScheme.onSurface,
          ),
        ),
        showBackButton: false,
        actions: [
          NotificationButton(
            count: 0,
            onTap: () => Navigator.pushNamed(context, NotificationsView.routeName),
          ),
          Gap(16.w),
        ],
      ),
      body: Column(
        children: [
          Padding(
            padding: EdgeInsets.symmetric(
              horizontal: 16.w,
            ),
            child: GestureDetector(
              onTap: () => Navigator.pushNamed(context, SearchView.routeName),
              child: AbsorbPointer(
                child: AppSearchField(
                  searchController: null,
                  onSearch: () {},
                  onFilter: () {},
                ),
              ),
            ),
          ),
          Gap(16.h),
          BlocSelector<CoursesCubit, CoursesState, int>(
            selector: (state) => state.selectedCategoryIndex,
            builder: (context, index) {
              return CoursesCategorySection(
                selectedIndex: index,
                onSelected: (i) =>
                    context.read<CoursesCubit>().selectCategory(i),
              );
            },
          ),
          Gap(8.h),
          const Expanded(
            child: CoursesList(),
          ),
        ],
      ),
    );
  }
}
