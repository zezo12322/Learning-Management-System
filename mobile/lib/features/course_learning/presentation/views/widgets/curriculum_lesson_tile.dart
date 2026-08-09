import 'package:easy_localization/easy_localization.dart';
import 'package:flutter/material.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';
import 'package:gap/gap.dart';
import 'package:optimatech_lms/core/utils/app_colors.dart';
import 'package:optimatech_lms/core/utils/duration_format.dart';
import 'package:optimatech_lms/core/utils/extension.dart';
import 'package:optimatech_lms/features/course_learning/domain/entities/course_curriculum_entity.dart';

class CurriculumLessonTile extends StatelessWidget {
  const CurriculumLessonTile({
    super.key,
    required this.lecture,
    required this.order,
    this.isCurrent = false,
    this.isCompleted = false,
    this.isLocked = false,
    this.onTap,
  });

  final CurriculumLectureEntity lecture;
  final int order;
  final bool isCurrent;
  final bool isCompleted;
  final bool isLocked;
  final VoidCallback? onTap;

  @override
  Widget build(BuildContext context) {
    final Color primary = context.theme.colorScheme.primary;

    return Material(
      color: isCurrent ? primary.withValues(alpha: 0.08) : Colors.transparent,
      borderRadius: BorderRadius.circular(14.r),
      child: InkWell(
        onTap: isLocked ? null : onTap,
        borderRadius: BorderRadius.circular(14.r),
        child: Container(
          padding: EdgeInsets.symmetric(vertical: 12.h, horizontal: 8.w),
          decoration: BoxDecoration(
            border: !isCurrent
              ? Border(
                  left: BorderSide(
                    color: isLocked
                      ? Colors.transparent
                      : primary.withValues(alpha: 0.5),
                    width: 3,
                  ),
                )
              : null,
          ),
          child: Row(
            children: [
              _LeadingIcon(
                isCurrent: isCurrent,
                isCompleted: isCompleted,
                isLocked: isLocked,
                order: order,
              ),
              Gap(14.w),
              Expanded(
                child: Text(
                  '$order. ${lecture.title}',
                  style: context.textTheme.bodyMedium?.copyWith(
                    fontWeight: isCurrent ? FontWeight.w700 : FontWeight.w600,
                    color: isCurrent
                        ? primary
                        : context.theme.colorScheme.onSurface,
                  ),
                ),
              ),
              Gap(8.w),
              if (formatSeconds(lecture.durationSeconds).isNotEmpty)
                Text(
                  formatSeconds(lecture.durationSeconds),
                  style: context.textTheme.bodySmall?.copyWith(
                    color: context.theme.colorScheme.onSurfaceVariant,
                  ),
                ),
              Gap(10.w),
              if (isCurrent)
                _NowPlayingBadge(primary: primary)
              else ...[
                _TrailingIcon(isCompleted: isCompleted, isLocked: isLocked),
              ],
            ],
          ),
        ),
      ),
    );
  }
}

class _LeadingIcon extends StatelessWidget {
  const _LeadingIcon({
    required this.isCurrent,
    required this.isCompleted,
    required this.isLocked,
    required this.order,
  });

  final bool isCurrent;
  final bool isCompleted;
  final bool isLocked;
  final int order;

  @override
  Widget build(BuildContext context) {
    final Color primary = context.theme.colorScheme.primary;

    if (isCurrent) {
      return Container(
        width: 36.w,
        height: 36.w,
        decoration: BoxDecoration(
          color: primary,
          shape: BoxShape.circle,
        ),
        child: Icon(Icons.play_arrow_rounded, color: Colors.white, size: 20.sp),
      );
    }

    return Container(
      width: 36.w,
      height: 36.w,
      decoration: BoxDecoration(
        color: isLocked
            ? AppColors.disableBackground
            : primary.withValues(alpha: 0.1),
        shape: BoxShape.circle,
      ),
      child: Icon(
        isLocked ? Icons.lock_outline_rounded : Icons.play_circle_outline_rounded,
        color: isLocked ? AppColors.disablePlaceholder : primary,
        size: 18.sp,
      ),
    );
  }
}

class _TrailingIcon extends StatelessWidget {
  const _TrailingIcon({required this.isCompleted, required this.isLocked});

  final bool isCompleted;
  final bool isLocked;

  @override
  Widget build(BuildContext context) {
    if (isCompleted) {
      return Icon(Icons.check_circle_rounded, color: AppColors.success, size: 20.sp);
    }
    if (isLocked) {
      return Icon(
        Icons.lock_outline_rounded,
        color: context.theme.colorScheme.onSurfaceVariant,
        size: 18.sp,
      );
    }
    return const SizedBox.shrink();
  }
}

class _NowPlayingBadge extends StatelessWidget {
  const _NowPlayingBadge({required this.primary});

  final Color primary;

  @override
  Widget build(BuildContext context) {
    return Container(
      padding: EdgeInsets.symmetric(horizontal: 10.w, vertical: 5.h),
      decoration: BoxDecoration(
        color: primary.withValues(alpha: 0.1),
        borderRadius: BorderRadius.circular(8.r),
      ),
      child: Text(
        'lesson_learning.curriculum.now_playing'.tr(),
        style: context.textTheme.labelSmall?.copyWith(
          color: primary,
          fontWeight: FontWeight.w700,
        ),
      ),
    );
  }
}
