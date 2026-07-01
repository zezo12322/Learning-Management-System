import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';
import 'package:gap/gap.dart';
import 'package:optimatech_lms/core/helper_function/dummy.dart';
import 'package:optimatech_lms/features/courses/domain/entities/courses_entity.dart';
import 'package:skeletonizer/skeletonizer.dart';
import 'package:optimatech_lms/features/courses/presentation/manager/courses_cubit/courses_cubit.dart';
import 'package:optimatech_lms/features/courses/presentation/manager/courses_cubit/courses_state.dart';
import 'package:optimatech_lms/features/courses/presentation/views/widgets/course_card.dart';

class CoursesList extends StatelessWidget {
  const CoursesList({super.key,});

  @override
  Widget build(BuildContext context) {
    return BlocBuilder<CoursesCubit, CoursesState>(
      builder: (context, state) {
        switch(state.status){
          case CoursesStatus.initial:
          case CoursesStatus.loading:
            return Skeletonizer(
              enabled: true,
              child: _CoursesListView(
                courses: List.generate(4, (_) => dummySkeletonCourseItem),
                bookmarkedIds: const {},
              ),
            );

          case CoursesStatus.failure:
          // return AppErrorWidget(
          //   message: state.errorMessage ?? 'حدث خطأ غير متوقع',
          //   onRetry: () => context.read<CoursesCubit>().loadCourses(),
          // );
            return Text('حدث خطأ غير متوقع: ${state.errorMessage}');

          case CoursesStatus.loaded:
            if (state.filteredCourses.isEmpty) return const Center(child: Text('لا توجد كورسات'));
            return _CoursesListView(
              courses: state.filteredCourses,
              bookmarkedIds: state.bookmarkedIds,
            );
        }
      },
    );
  }
}

class _CoursesListView extends StatelessWidget {
  const _CoursesListView({
    required this.courses,
    required this.bookmarkedIds,
  });

  final List<CourseEntity> courses;
  final Set<String> bookmarkedIds;

  @override
  Widget build(BuildContext context) {
    return ListView.separated(
      physics: const BouncingScrollPhysics(),
      separatorBuilder: (_, __) => Gap(8.h),
      shrinkWrap: true,
      padding: EdgeInsets.only(top: 16.h, bottom: 16.h, right: 16.w, left: 16.w),
      itemCount: courses.length,
      itemBuilder: (context, i) {
        final course = courses[i];
        return CourseCard(
          item: CourseEntity(
            id: course.id,
            title: course.title,
            price: course.price,
            courseStatus: course.courseStatus,
            language: course.language,
            level: course.level,
            thumbnail: course.thumbnail,
            categoryName: course.categoryName,
            tags: course.tags,
            instructors: course.instructors,
            isBookmarked: bookmarkedIds.contains(course.id),
          ),
          onTap: () {},
          onBookmarkTap: () => context.read<CoursesCubit>().toggleBookmark(course.id),
          onMoreTap: () {},
        );
      },
    );
  }
}