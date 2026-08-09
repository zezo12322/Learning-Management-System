import 'package:easy_localization/easy_localization.dart';
import 'package:flutter/material.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';
import 'package:gap/gap.dart';
import 'package:optimatech_lms/core/utils/app_text_styles.dart';
import 'package:optimatech_lms/features/courses/domain/entities/courses_entity.dart';

class CourseHeroSection extends StatefulWidget {
  const CourseHeroSection({
    this.description,
    super.key,
    required this.course,
    required this.onPlayTap,
    this.onBack,
  });

  final CourseEntity course;

  /// Real course description, supplied by the curriculum response. Null while
  /// the curriculum is still loading — the subtitle is simply omitted then,
  /// rather than filled with invented marketing copy.
  final String? description;
  final VoidCallback onPlayTap;
  final VoidCallback? onBack;

  @override
  State<CourseHeroSection> createState() => _CourseHeroSectionState();
}

class _CourseHeroSectionState extends State<CourseHeroSection>
    with SingleTickerProviderStateMixin {
  late final AnimationController _pulseController;
  late final Animation<double> _pulseAnimation;

  /// Prefer the description that came with the curriculum, fall back to
  /// anything the course entity already carries, otherwise show nothing.
  String? get _subtitle {
    final fromCurriculum = widget.description?.trim();
    if (fromCurriculum != null && fromCurriculum.isNotEmpty) {
      return fromCurriculum;
    }
    final fromCourse = widget.course.description?.trim();
    if (fromCourse != null && fromCourse.isNotEmpty) return fromCourse;
    return null;
  }

  @override
  void initState() {
    super.initState();
    _pulseController = AnimationController(
      vsync: this,
      duration: const Duration(milliseconds: 1400),
    )..repeat(reverse: true);
    _pulseAnimation = Tween<double>(begin: 1.0, end: 1.08).animate(
      CurvedAnimation(parent: _pulseController, curve: Curves.easeInOut),
    );
  }

  @override
  void dispose() {
    _pulseController.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    final colorScheme = Theme.of(context).colorScheme;
    final primary = colorScheme.primary;

    return Container(
      width: double.infinity,
      decoration: BoxDecoration(
        gradient: LinearGradient(
          begin: Alignment.topLeft,
          end: Alignment.bottomRight,
          colors: [
            primary,
            Color.lerp(primary, const Color(0xFF1E1B4B), 0.45)!,
          ],
        ),
      ),
      child: SafeArea(
        bottom: false,
        child: Padding(
          padding: EdgeInsets.fromLTRB(16.w, 8.h, 16.w, 28.h),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Row(
                children: [
                  _HeroIconButton(
                    icon: Icons.arrow_back_ios_new_rounded,
                    onTap: widget.onBack ?? () => Navigator.maybePop(context),
                  ),
                  const Spacer(),
                  _HeroIconButton(
                    icon: Icons.bookmark_border_rounded,
                    // TODO: add bookmark functionality
                    onTap: () {},
                  ),
                  Gap(8.w),
                  _HeroIconButton(
                    icon: Icons.share_outlined,
                    // TODO: add share functionality
                    onTap: () {},
                  ),
                ],
              ),
              Gap(16.h),
              Row(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Expanded(
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        Container(
                          padding: EdgeInsets.symmetric(
                            horizontal: 10.w,
                            vertical: 4.h,
                          ),
                          decoration: BoxDecoration(
                            color: Colors.white.withValues(alpha: 0.2),
                            borderRadius: BorderRadius.circular(8.r),
                          ),
                          child: Text(
                            // category name from course entity
                            widget.course.categoryName.isNotEmpty
                                ? widget.course.categoryName
                                : 'Design',
                            style: TextStyles.labelSmall.copyWith(
                              color: Colors.white,
                              fontWeight: FontWeights.semiBold,
                            ),
                          ),
                        ),
                        Gap(10.h),
                        Text(
                          widget.course.title,
                          style: TextStyles.titleMedium.copyWith(
                            fontSize: 22.sp,
                            color: Colors.white,
                            height: 1.25,
                          ),
                        ),
                        if (_subtitle != null) ...[
                          Gap(8.h),
                          Text(
                            _subtitle!,
                            style: TextStyles.bodySmall.copyWith(
                              color: Colors.white.withValues(alpha: 0.85),
                              height: 1.45,
                            ),
                            maxLines: 2,
                            overflow: TextOverflow.ellipsis,
                          ),
                        ],
                        Gap(12.h),
                        Row(
                          children: [
                            Icon(
                              Icons.star_rounded,
                              size: 16.sp,
                              color: const Color(0xFFFBBF24),
                            ),
                            Gap(4.w),
                            Text(
                              '${widget.course.avgRating > 0 ? widget.course.avgRating : 0} (${_formatCount(widget.course.ratingCount > 0 ? widget.course.ratingCount : 0)})',
                              style: TextStyles.labelSmall.copyWith(
                                color: Colors.white,
                                fontWeight: FontWeights.semiBold,
                              ),
                            ),
                            Gap(14.w),
                            Icon(
                              Icons.people_outline_rounded,
                              size: 16.sp,
                              color: Colors.white.withValues(alpha: 0.9),
                            ),
                            Gap(4.w),
                            Flexible(
                              child: Text(
                                'course_details.students'.tr(
                                  args: [
                                    _formatCount(
                                      widget.course.enrollmentCount,
                                    ),
                                  ],
                                ),
                                style: TextStyles.labelSmall.copyWith(
                                  color: Colors.white.withValues(alpha: 0.9),
                                ),
                                overflow: TextOverflow.ellipsis,
                              ),
                            ),
                          ],
                        ),
                      ],
                    ),
                  ),
                  Gap(8.w),
                  SizedBox(
                    width: 130.w,
                    height: 150.h,
                    child: Stack(
                      clipBehavior: Clip.none,
                      children: [
                        Positioned(
                          right: 0,
                          top: 8.h,
                          child: const _HeroIllustration(),
                        ),
                        Positioned(
                          left: 0,
                          top: 36.h,
                          child: ScaleTransition(
                            scale: _pulseAnimation,
                            child: GestureDetector(
                              onTap: widget.onPlayTap,
                              child: Container(
                                width: 56.w,
                                height: 56.w,
                                decoration: BoxDecoration(
                                  color: Colors.white.withValues(alpha: 0.25),
                                  borderRadius: BorderRadius.circular(16.r),
                                  border: Border.all(
                                    color: Colors.white.withValues(alpha: 0.35),
                                  ),
                                  boxShadow: [
                                    BoxShadow(
                                      color:
                                          Colors.black.withValues(alpha: 0.15),
                                      blurRadius: 12,
                                      offset: const Offset(0, 4),
                                    ),
                                  ],
                                ),
                                child: Icon(
                                  Icons.play_arrow_rounded,
                                  color: Colors.white,
                                  size: 32.sp,
                                ),
                              ),
                            ),
                          ),
                        ),
                      ],
                    ),
                  ),
                ],
              ),
            ],
          ),
        ),
      ),
    );
  }

  String _formatCount(int count) {
    if (count >= 1000) {
      return '${(count / 1000).toStringAsFixed(1)}K';
    }
    return count.toString();
  }
}

class _HeroIconButton extends StatelessWidget {
  const _HeroIconButton({
    required this.icon,
    required this.onTap,
  });

  final IconData icon;
  final VoidCallback onTap;

  @override
  Widget build(BuildContext context) {
    return Material(
      color: Colors.white.withValues(alpha: 0.15),
      borderRadius: BorderRadius.circular(12.r),
      child: InkWell(
        onTap: onTap,
        borderRadius: BorderRadius.circular(12.r),
        child: Padding(
          padding: EdgeInsets.all(10.w),
          child: Icon(icon, color: Colors.white, size: 20.sp),
        ),
      ),
    );
  }
}

class _HeroIllustration extends StatelessWidget {
  const _HeroIllustration();

  @override
  Widget build(BuildContext context) {
    return SizedBox(
      width: 110.w,
      height: 130.h,
      child: Stack(
        clipBehavior: Clip.none,
        children: [
          Positioned(
            top: 10.h,
            right: 4.w,
            child: Container(
              width: 18.w,
              height: 18.w,
              decoration: BoxDecoration(
                color: const Color(0xFF38BDF8),
                borderRadius: BorderRadius.circular(6.r),
              ),
            ),
          ),
          Positioned(
            top: 0,
            left: 8.w,
            child: Container(
              width: 14.w,
              height: 14.w,
              decoration: const BoxDecoration(
                color: Color(0xFFFBBF24),
                shape: BoxShape.circle,
              ),
            ),
          ),
          Positioned(
            top: 28.h,
            left: 0,
            child: Container(
              width: 88.w,
              height: 96.h,
              decoration: BoxDecoration(
                color: Colors.white.withValues(alpha: 0.95),
                borderRadius: BorderRadius.circular(16.r),
                boxShadow: [
                  BoxShadow(
                    color: Colors.black.withValues(alpha: 0.12),
                    blurRadius: 16,
                    offset: const Offset(0, 6),
                  ),
                ],
              ),
              child: Column(
                children: [
                  Container(
                    height: 24.h,
                    margin: EdgeInsets.all(8.w),
                    decoration: BoxDecoration(
                      color: Theme.of(context)
                          .colorScheme
                          .primary
                          .withValues(alpha: 0.15),
                      borderRadius: BorderRadius.circular(8.r),
                    ),
                    alignment: Alignment.center,
                    child: Text(
                      'study',
                      style: TextStyles.labelSmall.copyWith(
                        color: Theme.of(context).colorScheme.primary,
                        fontWeight: FontWeights.bold,
                        fontSize: 10.sp,
                      ),
                    ),
                  ),
                  Expanded(
                    child: Padding(
                      padding: EdgeInsets.symmetric(horizontal: 10.w),
                      child: Column(
                        children: List.generate(
                          3,
                          (index) => Container(
                            margin: EdgeInsets.only(bottom: 6.h),
                            height: 8.h,
                            decoration: BoxDecoration(
                              color: Theme.of(context)
                                  .colorScheme
                                  .outline
                                  .withValues(alpha: 0.35),
                              borderRadius: BorderRadius.circular(4.r),
                            ),
                          ),
                        ),
                      ),
                    ),
                  ),
                ],
              ),
            ),
          ),
          Positioned(
            bottom: 0,
            right: 0,
            child: Container(
              width: 28.w,
              height: 28.w,
              decoration: BoxDecoration(
                color: const Color(0xFF22C55E),
                borderRadius: BorderRadius.circular(8.r),
              ),
              child: Icon(
                Icons.eco_outlined,
                color: Colors.white,
                size: 16.sp,
              ),
            ),
          ),
        ],
      ),
    );
  }
}
