import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';
import 'package:gap/gap.dart';
import 'package:optimatech_lms/core/utils/app_colors.dart';
import 'package:optimatech_lms/core/utils/app_text_styles.dart';
import 'package:optimatech_lms/core/widgets/app_header/app_header.dart';
import 'package:optimatech_lms/core/widgets/app_search_filed.dart';
import 'package:optimatech_lms/features/home/domain/entities/course_entity.dart';
import 'package:optimatech_lms/features/home/domain/entities/student_progress_entity.dart';
import 'package:optimatech_lms/features/home/presentation/manager/home_courses_cubit/home_course_state.dart';
import 'package:optimatech_lms/features/home/presentation/manager/home_courses_cubit/home_courses_cubit.dart';
import 'package:optimatech_lms/features/home/presentation/widgets/assignments_section.dart';
import 'package:optimatech_lms/features/home/presentation/widgets/continue_learning_card.dart';
import 'package:optimatech_lms/features/home/presentation/widgets/home_section_header.dart';
import 'package:optimatech_lms/features/home/presentation/widgets/popular_course_card.dart';
import 'package:optimatech_lms/features/home/presentation/widgets/recommended_course_card.dart';

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
          loading: () => const _HomeShimmerSkeleton(),
          error: (message) => _HomeErrorView(
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
  final List<CourseEntity> popularCourses;
  final List<CourseEntity> recommendedCourses;

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

  // Color palette for popular course card headers (cycles through these)
  static const _popularCardColors = [
    AppColors.primary,
    AppColors.secondary,
    AppColors.warning,
    AppColors.darkPrimary,
  ];

  // Icon palette for popular course card headers (cycles through these)
  static const _popularCardIcons = [
    Icons.palette_outlined,
    Icons.lightbulb_outline_rounded,
    Icons.code_rounded,
    Icons.bar_chart_rounded,
  ];

  // Color palette for recommended course icon backgrounds
  static const _recommendedIconColors = [
    AppColors.primary,
    AppColors.success,
    AppColors.error,
    AppColors.secondary,
    AppColors.warning,
  ];

  // Icons for recommended course cards (cycles through these)
  static const _recommendedIcons = [
    Icons.school_outlined,
    Icons.insights_outlined,
    Icons.favorite_outline_rounded,
    Icons.flutter_dash_rounded,
    Icons.smartphone_outlined,
  ];

  @override
  Widget build(BuildContext context) {
    final CourseEntity? continueCourse = widget.popularCourses.isNotEmpty
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
                hintText: 'Search for courses, lessons, quizzes...',
                prefixIcon: Icons.search_rounded,
                suffixIcon: Icons.filter_list_rounded,
                onSearch: () {},
                onFilter: () {},
                onClear: () {},
              ),
              Gap(24.h),

              // ------------- Continue Learning Section -------------
              _buildContinueLearningSection(
                widget.continueLearning,
                continueCourse,
              ),
              Gap(28.h),

              // ------------- Popular Courses Section -------------
              if (widget.popularCourses.isNotEmpty) ...[
                _buildPopularCoursesSection(widget.popularCourses),
                Gap(28.h),
              ],

              // ------------- Assignments Section -------------
              const AssignmentsSection(),
              Gap(28.h),

              // ------------- Recommended Courses Section -------------
              if (widget.recommendedCourses.isNotEmpty) ...[
                _buildRecommendedCoursesSection(widget.recommendedCourses),
              ],
              Gap(24.h),
            ],
          ),
        ),
      ),
    );
  }

  // ------------- Continue Learning Section Builder -------------
  Widget _buildContinueLearningSection(
    StudentProgressEntity? progress,
    CourseEntity? continueCourse,
  ) {
    final title = continueCourse?.title ?? 'UI/UX Design Principles';
    final image =
        continueCourse?.image ?? 'assets/images/student_illustrator.png';

    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        HomeSectionHeader(
          title: 'Continue Learning',
          onViewAllTap: () {},
        ),
        Gap(14.h),
        ContinueLearningCard(
          title: title,
          image: image,
          progress: progress?.progressPercent ?? 0.0,
          lessonsCompleted: progress?.watchedLessons ?? 0,
          totalLessons: progress?.totalLessons ?? 0,
          timeLeft: progress?.timeLeft ?? '0 min',
          onTap: () {},
          onPlayTap: () {},
        ),
      ],
    );
  }

  // ------------- Popular Courses Section Builder (horizontal scroll) --------
  Widget _buildPopularCoursesSection(List<CourseEntity> courses) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        HomeSectionHeader(
          title: 'Popular Courses',
          onViewAllTap: () {},
        ),
        Gap(14.h),
        SizedBox(
          height: 210.h,
          child: ListView.separated(
            scrollDirection: Axis.horizontal,
            physics: const BouncingScrollPhysics(),
            itemCount: courses.length,
            separatorBuilder: (_, __) => Gap(12.w),
            itemBuilder: (context, index) {
              final course = courses[index];
              return PopularCourseCard(
                title: course.title,
                studentCount: '${(index + 1) * 5}.${index}K students',
                rating: course.rating,
                headerColor:
                    _popularCardColors[index % _popularCardColors.length],
                icon: _popularCardIcons[index % _popularCardIcons.length],
                image: course.image,
                onTap: () {},
              );
            },
          ),
        ),
      ],
    );
  }

  // ----------- Recommended Courses Section Builder (horizontal scroll) ------
  Widget _buildRecommendedCoursesSection(List<CourseEntity> courses) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        HomeSectionHeader(
          title: 'Recommended Courses',
          onViewAllTap: () {},
        ),
        Gap(14.h),
        SizedBox(
          height: 84.h,
          child: ListView.separated(
            scrollDirection: Axis.horizontal,
            physics: const BouncingScrollPhysics(),
            itemCount: courses.length,
            separatorBuilder: (_, __) => Gap(12.w),
            itemBuilder: (context, index) {
              final course = courses[index];
              final iconColor =
                  _recommendedIconColors[index % _recommendedIconColors.length];
              return SizedBox(
                width: 280.w,
                child: RecommendedCourseCard(
                  title: course.title,
                  subtitle: '${(index + 1) * 4} lessons',
                  icon: _recommendedIcons[index % _recommendedIcons.length],
                  iconColor: iconColor,
                  iconBackgroundColor: iconColor.withValues(alpha: 0.1),
                  onTap: () {},
                ),
              );
            },
          ),
        ),
      ],
    );
  }
}

// ============================================================================
// Error State — Clean error view with a retry button
// ============================================================================

class _HomeErrorView extends StatelessWidget {
  const _HomeErrorView({
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

// ============================================================================
// Loading State — Professional shimmer skeleton placeholder
// ============================================================================

class _HomeShimmerSkeleton extends StatefulWidget {
  const _HomeShimmerSkeleton();

  @override
  State<_HomeShimmerSkeleton> createState() => _HomeShimmerSkeletonState();
}

class _HomeShimmerSkeletonState extends State<_HomeShimmerSkeleton>
    with SingleTickerProviderStateMixin {
  late final AnimationController _controller;
  late final Animation<double> _animation;

  @override
  void initState() {
    super.initState();
    _controller = AnimationController(
      vsync: this,
      duration: const Duration(milliseconds: 1500),
    )..repeat();
    _animation = Tween<double>(begin: -2.0, end: 2.0).animate(
      CurvedAnimation(parent: _controller, curve: Curves.easeInOutSine),
    );
  }

  @override
  void dispose() {
    _controller.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return SafeArea(
      child: AnimatedBuilder(
        animation: _animation,
        builder: (context, _) {
          return SingleChildScrollView(
            physics: const NeverScrollableScrollPhysics(),
            child: Padding(
              padding: EdgeInsets.fromLTRB(20.w, 12.h, 20.w, 0),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  // Shimmer: App Header
                  _buildHeaderShimmer(),
                  Gap(20.h),

                  // Shimmer: Search Bar
                  _buildSearchBarShimmer(),
                  Gap(24.h),

                  // Shimmer: Section Title
                  _buildSectionTitleShimmer(),
                  Gap(14.h),

                  // Shimmer: Continue Learning Card
                  _buildContinueLearningShimmer(),
                  Gap(28.h),

                  // Shimmer: Section Title
                  _buildSectionTitleShimmer(),
                  Gap(14.h),

                  // Shimmer: Popular Courses horizontal list
                  _buildPopularCoursesShimmer(),
                  Gap(28.h),

                  // Shimmer: Section Title
                  _buildSectionTitleShimmer(),
                  Gap(14.h),

                  // Shimmer: Recommended Courses list items
                  _buildRecommendedCoursesShimmer(),
                  Gap(24.h),
                ],
              ),
            ),
          );
        },
      ),
    );
  }

  // Gradient used for the shimmer sweep effect
  LinearGradient get _shimmerGradient {
    final colorScheme = Theme.of(context).colorScheme;
    final baseColor = colorScheme.surfaceDim;
    final highlightColor = colorScheme.surface;

    return LinearGradient(
      begin: Alignment(_animation.value - 1, 0),
      end: Alignment(_animation.value + 1, 0),
      colors: [baseColor, highlightColor, baseColor],
      stops: const [0.0, 0.5, 1.0],
    );
  }

  // Reusable shimmer container with rounded corners
  Widget _shimmerBox({
    required double width,
    required double height,
    double? borderRadius,
  }) {
    return Container(
      width: width,
      height: height,
      decoration: BoxDecoration(
        gradient: _shimmerGradient,
        borderRadius: BorderRadius.circular(borderRadius ?? 10.r),
      ),
    );
  }

  // Shimmer for the header area (avatar + text + notification icon)
  Widget _buildHeaderShimmer() {
    return Row(
      children: [
        _shimmerBox(width: 48.w, height: 48.w, borderRadius: 24.r),
        Gap(12.w),
        Expanded(
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              _shimmerBox(width: 120.w, height: 12.h),
              Gap(6.h),
              _shimmerBox(width: 160.w, height: 16.h),
            ],
          ),
        ),
        _shimmerBox(width: 40.w, height: 40.w, borderRadius: 12.r),
      ],
    );
  }

  // Shimmer for the search bar
  Widget _buildSearchBarShimmer() {
    return _shimmerBox(
      width: double.infinity,
      height: 52.h,
      borderRadius: 14.r,
    );
  }

  // Shimmer for section title row ("Title" + "View all")
  Widget _buildSectionTitleShimmer() {
    return Row(
      mainAxisAlignment: MainAxisAlignment.spaceBetween,
      children: [
        _shimmerBox(width: 140.w, height: 18.h),
        _shimmerBox(width: 60.w, height: 14.h),
      ],
    );
  }

  // Shimmer for the Continue Learning card
  Widget _buildContinueLearningShimmer() {
    return Container(
      padding: EdgeInsets.all(16.w),
      decoration: BoxDecoration(
        borderRadius: BorderRadius.circular(20.r),
        border: Border.all(
          color: Theme.of(context).colorScheme.outline.withValues(alpha: 0.3),
        ),
      ),
      child: Column(
        children: [
          Row(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              _shimmerBox(width: 88.w, height: 88.w, borderRadius: 16.r),
              Gap(14.w),
              Expanded(
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    _shimmerBox(width: 80.w, height: 20.h, borderRadius: 8.r),
                    Gap(8.h),
                    _shimmerBox(width: double.infinity, height: 16.h),
                    Gap(10.h),
                    Row(
                      children: [
                        _shimmerBox(width: 100.w, height: 12.h),
                        Gap(12.w),
                        _shimmerBox(width: 70.w, height: 12.h),
                      ],
                    ),
                  ],
                ),
              ),
            ],
          ),
          Gap(16.h),
          Row(
            children: [
              Expanded(
                child: _shimmerBox(
                  width: double.infinity,
                  height: 8.h,
                  borderRadius: 6.r,
                ),
              ),
              Gap(10.w),
              _shimmerBox(
                width: 36.w,
                height: 14.h,
              ),
              Gap(12.w),
              _shimmerBox(
                width: 44.w,
                height: 44.w,
                borderRadius: 22.r,
              ),
            ],
          ),
        ],
      ),
    );
  }

  // Shimmer for the Popular Courses horizontal list
  Widget _buildPopularCoursesShimmer() {
    return SizedBox(
      height: 210.h,
      child: ListView.separated(
        scrollDirection: Axis.horizontal,
        physics: const NeverScrollableScrollPhysics(),
        itemCount: 3,
        separatorBuilder: (_, __) => Gap(12.w),
        itemBuilder: (_, __) {
          return Container(
            width: 168.w,
            decoration: BoxDecoration(
              borderRadius: BorderRadius.circular(18.r),
              border: Border.all(
                color: Theme.of(context)
                    .colorScheme
                    .outline
                    .withValues(alpha: 0.3),
              ),
            ),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                _shimmerBox(
                  width: 168.w,
                  height: 130.h,
                  borderRadius: 18.r,
                ),
                Padding(
                  padding: EdgeInsets.fromLTRB(12.w, 12.h, 12.w, 0),
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      _shimmerBox(width: 120.w, height: 14.h),
                      Gap(8.h),
                      _shimmerBox(width: 140.w, height: 12.h),
                    ],
                  ),
                ),
              ],
            ),
          );
        },
      ),
    );
  }

  // Shimmer for Recommended Courses vertical list items
  Widget _buildRecommendedCoursesShimmer() {
    return Column(
      children: List.generate(3, (index) {
        return Padding(
          padding: EdgeInsets.only(bottom: index < 2 ? 12.h : 0),
          child: Container(
            padding: EdgeInsets.symmetric(horizontal: 14.w, vertical: 14.h),
            decoration: BoxDecoration(
              borderRadius: BorderRadius.circular(16.r),
              border: Border.all(
                color: Theme.of(context)
                    .colorScheme
                    .outline
                    .withValues(alpha: 0.3),
              ),
            ),
            child: Row(
              children: [
                _shimmerBox(width: 48.w, height: 48.w, borderRadius: 14.r),
                Gap(14.w),
                Expanded(
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      _shimmerBox(width: 160.w, height: 14.h),
                      Gap(4.h),
                      _shimmerBox(width: 100.w, height: 12.h),
                    ],
                  ),
                ),
                _shimmerBox(width: 22.w, height: 22.w, borderRadius: 4.r),
              ],
            ),
          ),
        );
      }),
    );
  }
}
