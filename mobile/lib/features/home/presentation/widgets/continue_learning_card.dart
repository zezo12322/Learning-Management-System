import 'package:easy_localization/easy_localization.dart';
import 'package:flutter/material.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';
import 'package:gap/gap.dart';
import 'package:optimatech_lms/core/utils/app_text_styles.dart';

class ContinueLearningCard extends StatelessWidget {
  const ContinueLearningCard({
    super.key,
    required this.title,
    required this.image,
    required this.progress,
    required this.lessonsCompleted,
    required this.totalLessons,
    required this.timeLeft,
    this.onPlayTap,
    this.onTap,
  });
  final String title;
  final String image;
  final double progress;
  final int lessonsCompleted;
  final int totalLessons;
  final String timeLeft;
  final VoidCallback? onPlayTap;
  final VoidCallback? onTap;

  @override
  Widget build(BuildContext context) {
    final progressPercent = (progress * 100).round();

    final theme = Theme.of(context);
    final colorScheme = theme.colorScheme;

    return Material(
      color: colorScheme.surface,
      elevation: 4,
      shadowColor: theme.shadowColor.withValues(alpha: 0.1),
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
                  _CourseThumbnail(image: image),
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
                            color: Theme.of(context)
                                .colorScheme
                                .primary
                                .withValues(alpha: 0.1),
                            borderRadius: BorderRadius.circular(8.r),
                          ),
                          child: Text(
                            'In Progress',
                            style: TextStyles.labelSmall.copyWith(
                              color: Theme.of(context).colorScheme.primary,
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
                            color: colorScheme.onSurface,
                          ),
                          maxLines: 2,
                          overflow: TextOverflow.ellipsis,
                        ),
                        Gap(10.h),
                        Row(
                          children: [
                            _MetaItem(
                              icon: Icons.menu_book_outlined,
                              label:
                              'home.of_lessons'.tr(
                                namedArgs: {
                                  'completed': '$lessonsCompleted',
                                  'total': '$totalLessons',
                                },
                              ),
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
                              backgroundColor: colorScheme.surfaceDim,
                              color: colorScheme.primary,
                            ),
                          ),
                        ),
                        Gap(10.w),
                        Text(
                          '$progressPercent%',
                          style: TextStyles.labelMedium.copyWith(
                            color: colorScheme.onSurface,
                            fontWeight: FontWeights.semiBold,
                          ),
                        ),
                      ],
                    ),
                  ),
                  Gap(12.w),
                  Material(
                    color: Theme.of(context).colorScheme.primary,
                    shape: const CircleBorder(),
                    elevation: 2,
                    shadowColor: Theme.of(context)
                        .colorScheme
                        .primary
                        .withValues(alpha: 0.35),
                    child: InkWell(
                      onTap: onPlayTap,
                      customBorder: const CircleBorder(),
                      child: SizedBox(
                        width: 44.w,
                        height: 44.w,
                        child: Icon(
                          Icons.play_arrow_rounded,
                          color: colorScheme.onPrimary,
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
  const _CourseThumbnail({required this.image});

  final String image;

  @override
  Widget build(BuildContext context) {
    final colorScheme = Theme.of(context).colorScheme;

    final ImageProvider imageProvider;
    if (image.isNotEmpty && image.startsWith('http')) {
      imageProvider = NetworkImage(image);
    } else if (image.isNotEmpty) {
      imageProvider = AssetImage(image);
    } else {
      imageProvider = const AssetImage('assets/images/student_illustrator.png');
    }

    return Container(
      width: 88.w,
      height: 88.w,
      decoration: BoxDecoration(
        color: colorScheme.primary.withValues(alpha: 0.1),
        borderRadius: BorderRadius.circular(16.r),
        image: DecorationImage(
          image: imageProvider,
          fit: BoxFit.cover,
        ),
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
    final colorScheme = Theme.of(context).colorScheme;

    return Flexible(
      child: Row(
        mainAxisSize: MainAxisSize.min,
        children: [
          Icon(
            icon,
            size: 14.sp,
            color: colorScheme.onSurfaceVariant,
          ),
          Gap(4.w),
          Flexible(
            child: Text(
              label,
              style: TextStyles.labelSmall.copyWith(
                color: colorScheme.onSurfaceVariant,
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
