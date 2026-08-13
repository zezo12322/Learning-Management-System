import 'package:easy_localization/easy_localization.dart';
import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';
import 'package:gap/gap.dart';
import 'package:optimatech_lms/core/helper_function/dummy.dart';
import 'package:optimatech_lms/core/services/get_it_service.dart';
import 'package:optimatech_lms/core/utils/extension.dart';
import 'package:optimatech_lms/core/widgets/app_error_widget.dart';
import 'package:optimatech_lms/core/widgets/app_search_filed.dart';
import 'package:optimatech_lms/features/course_details/presentation/views/course_details_view.dart';
import 'package:optimatech_lms/features/courses/domain/entities/courses_entity.dart';
import 'package:optimatech_lms/features/courses/presentation/manager/search_cubit/search_cubit.dart';
import 'package:optimatech_lms/features/courses/presentation/manager/search_cubit/search_state.dart';
import 'package:optimatech_lms/features/courses/presentation/views/widgets/course_card.dart';
import 'package:skeletonizer/skeletonizer.dart';

class SearchView extends StatelessWidget {
  const SearchView({super.key});

  static const String routeName = '/search';

  @override
  Widget build(BuildContext context) {
    return BlocProvider(
      create: (_) => getIt<SearchCubit>(),
      child: const _SearchBody(),
    );
  }
}

class _SearchBody extends StatefulWidget {
  const _SearchBody();

  @override
  State<_SearchBody> createState() => _SearchBodyState();
}

class _SearchBodyState extends State<_SearchBody> {
  final _controller = TextEditingController();
  final _focusNode = FocusNode();

  @override
  void initState() {
    super.initState();
    WidgetsBinding.instance.addPostFrameCallback((_) => _focusNode.requestFocus());
  }

  @override
  void dispose() {
    _controller.dispose();
    _focusNode.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: SafeArea(
        child: Padding(
          padding: EdgeInsets.symmetric(horizontal: 16.w, vertical: 12.h),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Row(
                children: [
                  GestureDetector(
                    onTap: () => Navigator.pop(context),
                    child: Icon(
                      Icons.arrow_back_ios_new_rounded,
                      size: 20.r,
                      color: context.theme.colorScheme.onSurface,
                    ),
                  ),
                  Gap(12.w),
                  Expanded(
                    child: AppSearchField(
                      searchController: _controller,
                      focusNode: _focusNode,
                      autofocus: true,
                      onSearch: () {},
                      onFilter: () {},
                      onChanged: (value) => context.read<SearchCubit>().onQueryChanged(value),
                    ),
                  ),
                ],
              ),
              Gap(16.h),
              Expanded(
                child: BlocBuilder<SearchCubit, SearchState>(
                  builder: (context, state) {
                    switch (state.status) {
                      case SearchStatus.initial:
                        return Center(
                          child: Text(
                            'search.prompt'.tr(),
                            style: context.textTheme.bodyMedium?.copyWith(
                              color: context.theme.colorScheme.onSurfaceVariant,
                            ),
                          ),
                        );
                      case SearchStatus.loading:
                        return Skeletonizer(
                          enabled: true,
                          child: _ResultsList(
                            courses: List.generate(4, (_) => dummySkeletonCourseItem),
                          ),
                        );
                      case SearchStatus.empty:
                        return Center(
                          child: Text(
                            'search.no_results'.tr(),
                            style: context.textTheme.bodyMedium?.copyWith(
                              color: context.theme.colorScheme.onSurfaceVariant,
                            ),
                          ),
                        );
                      case SearchStatus.failure:
                        return AppErrorWidget(
                          message: state.errorMessage ?? 'courses.errors.unexpected'.tr(),
                          onRetry: () => context.read<SearchCubit>().onQueryChanged(state.query),
                        );
                      case SearchStatus.loaded:
                        return _ResultsList(courses: state.results);
                    }
                  },
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }
}

class _ResultsList extends StatelessWidget {
  const _ResultsList({required this.courses});

  final List<CourseEntity> courses;

  @override
  Widget build(BuildContext context) {
    return ListView.separated(
      physics: const BouncingScrollPhysics(),
      separatorBuilder: (_, __) => Gap(8.h),
      itemCount: courses.length,
      itemBuilder: (context, i) {
        final course = courses[i];
        return CourseCard(
          item: course,
          onTap: () {
            Navigator.push(
              context,
              MaterialPageRoute(builder: (_) => CourseDetailsView(course: course)),
            );
          },
        );
      },
    );
  }
}