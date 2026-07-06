import 'package:flutter/material.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';
import 'package:gap/gap.dart';


// ============================================================================
// Loading State — Professional shimmer skeleton placeholder
// ============================================================================
class HomeShimmerSkeleton extends StatefulWidget {
  const HomeShimmerSkeleton({super.key});

  @override
  State<HomeShimmerSkeleton> createState() => _HomeShimmerSkeletonState();
}

class _HomeShimmerSkeletonState extends State<HomeShimmerSkeleton>
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