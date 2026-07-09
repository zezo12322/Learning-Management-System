import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';
import 'package:gap/gap.dart';
import 'package:optimatech_lms/core/utils/app_text_styles.dart';
import 'package:optimatech_lms/core/widgets/app_header/app_header.dart';
import 'package:optimatech_lms/core/widgets/app_search_filed.dart';
import 'package:optimatech_lms/features/home/domain/entities/course_entity.dart';
import 'package:optimatech_lms/features/home/domain/entities/student_progress_entity.dart';
import 'package:optimatech_lms/features/home/presentation/manager/home_courses_cubit/home_course_state.dart';
import 'package:optimatech_lms/features/home/presentation/manager/home_courses_cubit/home_courses_cubit.dart';
import 'package:optimatech_lms/features/home/presentation/widgets/assignments_section.dart';
import 'package:optimatech_lms/features/home/presentation/widgets/build_continue_learning_section.dart';
import 'package:optimatech_lms/features/home/presentation/widgets/build_popular_courses_section.dart';
import 'package:optimatech_lms/features/home/presentation/widgets/build_recommended_courses_section.dart';
import 'package:optimatech_lms/features/home/presentation/widgets/home_shimmer_skeleton.dart';
import '../../../courses/presentation/views/widgets/show_courses_filter_bottom_sheet.dart';

// ============================================================================
// HomeBody — Main content area for the Home tab.
// Uses BlocBuilder to reactively render UI based on HomeCoursesCubit state.
// ============================================================================

class HomeBody extends StatelessWidget {
  const HomeBody({super.key});

  @override
  Widget build(BuildContext context) {
    return BlocBuilder<HomeCoursesCubit, HomeCoursesState>(
      builder: (context, state) {
        return state.when(
          initial: () => const SizedBox.shrink(),
          loading: () => const HomeShimmerSkeleton(),
          error: (message) => HomeErrorView(
            message: message,
            onRetry: () => context.read<HomeCoursesCubit>().fetchHomeCourses(),
          ),
          success: (continueLearning, popularCourses, recommendedCourses) =>
              _HomeSuccessView(
            continueLearning: continueLearning,
            popularCourses: popularCourses,
            recommendedCourses: recommendedCourses,
          ),
        );
      },
    );
  }
}

// ============================================================================
// Success State — Full scrollable home layout with all sections
// ============================================================================

class _HomeSuccessView extends StatefulWidget {
  const _HomeSuccessView({
    required this.continueLearning,
    required this.popularCourses,
    required this.recommendedCourses,
  });

  final StudentProgressEntity? continueLearning;
  final List<HomeCourseEntity> popularCourses;
  final List<HomeCourseEntity> recommendedCourses;

  @override
  State<_HomeSuccessView> createState() => _HomeSuccessViewState();
}

class _HomeSuccessViewState extends State<_HomeSuccessView> {
  final TextEditingController _searchController = TextEditingController();

  @override
  void dispose() {
    _searchController.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    final HomeCourseEntity? continueCourse = widget.popularCourses.isNotEmpty
        ? widget.popularCourses.first
        : widget.recommendedCourses.isNotEmpty
            ? widget.recommendedCourses.first
            : null;

    return SafeArea(
      child: SingleChildScrollView(
        physics: const BouncingScrollPhysics(),
        child: Padding(
          padding: EdgeInsets.fromLTRB(20.w, 12.h, 20.w, 0),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              // ------------- App Header -------------
              AppHeader(
                onNotificationTap: () {},
                userName: 'Leonel Messi',
                notificationCount: 10,
              ),
              Gap(20.h),

              // ------------- Home Search Bar -------------
              AppSearchField(
                searchController: _searchController,
                onSearch: () {},
                onFilter: () async {
                  final result = await showCoursesFilterBottomSheet(context);
                  if (result != null && context.mounted) {
                    //context.read<CoursesCubit>().applyFilter(result);
                  }
                },
              ),
              Gap(24.h),

              // ------------- Continue Learning Section -------------
              buildContinueLearningSection(
                widget.continueLearning,
                continueCourse,
              ),
              Gap(28.h),

              // ------------- Popular Courses Section -------------
              if (widget.popularCourses.isNotEmpty) ...[
                buildPopularCoursesSection(widget.popularCourses),
                Gap(28.h),
              ],

              // ------------- Assignments Section -------------
              const AssignmentsSection(),
              Gap(28.h),

              // ------------- Recommended Courses Section -------------
              if (widget.recommendedCourses.isNotEmpty) ...[
                buildRecommendedCoursesSection(widget.recommendedCourses),
              ],
              Gap(24.h),
            ],
          ),
        ),
      ),
    );
  }
}
// ============================================================================
// Error State — Clean error view with a retry button
// ============================================================================

class HomeErrorView extends StatelessWidget {
  const HomeErrorView({
    super.key,
    required this.message,
    required this.onRetry,
  });

  final String message;
  final VoidCallback onRetry;

  @override
  Widget build(BuildContext context) {
    final colorScheme = Theme.of(context).colorScheme;

    return SafeArea(
      child: Center(
        child: Padding(
          padding: EdgeInsets.symmetric(horizontal: 32.w),
          child: Column(
            mainAxisAlignment: MainAxisAlignment.center,
            children: [
              // Error illustration icon
              Container(
                width: 96.w,
                height: 96.w,
                decoration: BoxDecoration(
                  color: colorScheme.error.withValues(alpha: 0.08),
                  shape: BoxShape.circle,
                ),
                child: Icon(
                  Icons.wifi_off_rounded,
                  size: 48.sp,
                  color: colorScheme.error,
                ),
              ),
              Gap(24.h),

              // Error title
              Text(
                'Something went wrong',
                style: TextStyles.titleSmall.copyWith(
                  color: colorScheme.onSurface,
                ),
                textAlign: TextAlign.center,
              ),
              Gap(8.h),

              // Error message
              Text(
                message,
                style: TextStyles.bodyMedium.copyWith(
                  color: colorScheme.onSurfaceVariant,
                ),
                textAlign: TextAlign.center,
                maxLines: 3,
                overflow: TextOverflow.ellipsis,
              ),
              Gap(32.h),

              // Retry button
              SizedBox(
                width: 180.w,
                height: 48.h,
                child: FilledButton.icon(
                  onPressed: onRetry,
                  icon: Icon(Icons.refresh_rounded, size: 20.sp),
                  label: Text(
                    'Try Again',
                    style: TextStyles.labelLarge.copyWith(
                      color: colorScheme.onPrimary,
                    ),
                  ),
                  style: FilledButton.styleFrom(
                    backgroundColor: colorScheme.primary,
                    shape: RoundedRectangleBorder(
                      borderRadius: BorderRadius.circular(14.r),
                    ),
                  ),
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }
}
