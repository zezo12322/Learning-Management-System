import 'package:flutter/material.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';
import 'package:gap/gap.dart';
import 'package:optimatech_lms/core/utils/app_colors.dart';
import 'package:optimatech_lms/core/utils/app_text_styles.dart';

class ContinueLearningCard extends StatelessWidget {
  const ContinueLearningCard({
    super.key,
    this.title = 'UI/UX Design Principles',
    this.progress = 0.65,
    this.lessonsCompleted = 12,
    this.totalLessons = 20,
    this.timeLeft = '4h 30m left',
    this.onPlayTap,
    this.onTap,
  });

  final String title;
  final double progress;
  final int lessonsCompleted;
  final int totalLessons;
  final String timeLeft;
  final VoidCallback? onPlayTap;
  final VoidCallback? onTap;

  static const Color _badgeBackground = Color(0xFFEEF2FF);
  static const Color _badgeText = Color(0xFF6366F1);
  static const Color _imageBackground = Color(0xFFF5F3FF);

  @override
  Widget build(BuildContext context) {
    final progressPercent = (progress * 100).round();

    return Material(
      color: AppColors.surface,
      elevation: 2,
      shadowColor: Colors.black.withValues(alpha: 0.06),
      borderRadius: BorderRadius.circular(20.r),
      child: InkWell(
        onTap: onTap,
        borderRadius: BorderRadius.circular(20.r),
        child: Padding(
          padding: EdgeInsets.all(16.w),
          child: Column(
            children: [
              Row(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  _CourseThumbnail(),
                  Gap(14.w),
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
                            color: _badgeBackground,
                            borderRadius: BorderRadius.circular(8.r),
                          ),
                          child: Text(
                            'In Progress',
                            style: TextStyles.labelSmall.copyWith(
                              color: _badgeText,
                              fontWeight: FontWeights.semiBold,
                            ),
                          ),
                        ),
                        Gap(8.h),
                        Text(
                          title,
                          style: TextStyles.labelLarge.copyWith(
                            fontSize: 15.sp,
                            fontWeight: FontWeights.bold,
                            color: AppColors.textPrimary,
                          ),
                          maxLines: 2,
                          overflow: TextOverflow.ellipsis,
                        ),
                        Gap(10.h),
                        Row(
                          children: [
                            _MetaItem(
                              icon: Icons.menu_book_outlined,
                              label: '$lessonsCompleted of $totalLessons lessons',
                            ),
                            Gap(12.w),
                            _MetaItem(
                              icon: Icons.schedule_outlined,
                              label: timeLeft,
                            ),
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
                    child: Row(
                      children: [
                        Expanded(
                          child: ClipRRect(
                            borderRadius: BorderRadius.circular(6.r),
                            child: LinearProgressIndicator(
                              value: progress,
                              minHeight: 8.h,
                              backgroundColor: AppColors.disableBackground,
                              color: AppColors.primary,
                            ),
                          ),
                        ),
                        Gap(10.w),
                        Text(
                          '$progressPercent%',
                          style: TextStyles.labelMedium.copyWith(
                            color: AppColors.textPrimary,
                            fontWeight: FontWeights.semiBold,
                          ),
                        ),
                      ],
                    ),
                  ),
                  Gap(12.w),
                  Material(
                    color: AppColors.primary,
                    shape: const CircleBorder(),
                    elevation: 2,
                    shadowColor: AppColors.primary.withValues(alpha: 0.35),
                    child: InkWell(
                      onTap: onPlayTap,
                      customBorder: const CircleBorder(),
                      child: SizedBox(
                        width: 44.w,
                        height: 44.w,
                        child: Icon(
                          Icons.play_arrow_rounded,
                          color: Colors.white,
                          size: 28.sp,
                        ),
                      ),
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
}

class _CourseThumbnail extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Container(
      width: 88.w,
      height: 88.w,
      decoration: BoxDecoration(
        color: ContinueLearningCard._imageBackground,
        borderRadius: BorderRadius.circular(16.r),
      ),
      child: Stack(
        alignment: Alignment.center,
        children: [
          Positioned(
            top: 14.h,
            left: 14.w,
            child: Icon(
              Icons.smart_toy_outlined,
              size: 22.sp,
              color: ContinueLearningCard._badgeText,
            ),
          ),
          Positioned(
            bottom: 16.h,
            right: 16.w,
            child: Container(
              padding: EdgeInsets.symmetric(horizontal: 6.w, vertical: 2.h),
              decoration: BoxDecoration(
                color: Colors.white,
                borderRadius: BorderRadius.circular(6.r),
              ),
              child: Text(
                'Aa',
                style: TextStyles.labelSmall.copyWith(
                  color: ContinueLearningCard._badgeText,
                  fontWeight: FontWeights.bold,
                ),
              ),
            ),
          ),
          Icon(
            Icons.local_florist_outlined,
            size: 28.sp,
            color: ContinueLearningCard._badgeText.withValues(alpha: 0.7),
          ),
        ],
      ),
    );
  }
}

class _MetaItem extends StatelessWidget {
  const _MetaItem({
    required this.icon,
    required this.label,
  });

  final IconData icon;
  final String label;

  @override
  Widget build(BuildContext context) {
    return Flexible(
      child: Row(
        mainAxisSize: MainAxisSize.min,
        children: [
          Icon(
            icon,
            size: 14.sp,
            color: AppColors.textSecondary,
          ),
          Gap(4.w),
          Flexible(
            child: Text(
              label,
              style: TextStyles.labelSmall.copyWith(
                color: AppColors.textSecondary,
              ),
              maxLines: 1,
              overflow: TextOverflow.ellipsis,
            ),
          ),
        ],
      ),
    );
  }
}
