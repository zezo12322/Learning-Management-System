import 'package:easy_localization/easy_localization.dart';
import 'package:flutter/material.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';
import 'package:gap/gap.dart';
import 'package:optimatech_lms/core/utils/app_text_styles.dart';
import 'package:optimatech_lms/core/utils/duration_format.dart';
import 'package:optimatech_lms/features/course_details/domain/entities/course_curriculum_entity.dart';

class CurriculumLessonList extends StatelessWidget {
  const CurriculumLessonList({
    super.key,
    required this.lessons,
    required this.onLessonTap,
  });

  final List<CourseLessonEntity> lessons;
  final ValueChanged<CourseLessonEntity> onLessonTap;

  @override
  Widget build(BuildContext context) {
    final colorScheme = Theme.of(context).colorScheme;

    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Row(
          children: [
            Expanded(
              child: Text(
                'course_details.curriculum'.tr(),
                style: TextStyles.titleSmall.copyWith(
                  fontSize: 18.sp,
                  color: colorScheme.onSurface,
                ),
              ),
            ),
            // A "View All Lessons" link sat here wired to an empty onTap.
            // Every lesson is already listed below, so there was nothing for it
            // to navigate to.
          ],
        ),
        Gap(12.h),
        ...lessons.map(
          (lesson) => Padding(
            padding: EdgeInsets.only(bottom: 8.h),
            child: _LessonTile(
              lesson: lesson,
              isActive: false,
              onTap: () => onLessonTap(lesson),
            ),
          ),
        ),
      ],
    );
  }
}

class _LessonTile extends StatelessWidget {
  const _LessonTile({
    required this.lesson,
    this.onTap,
    this.isActive = false,
  });

  final CourseLessonEntity lesson;
  final VoidCallback? onTap;
  final bool isActive;

  @override
  Widget build(BuildContext context) {
    final colorScheme = Theme.of(context).colorScheme;

    if (isActive) {
      return _buildTile(
        context,
        backgroundColor: colorScheme.primary.withValues(alpha: 0.08),
        leading: Container(
          width: 32.w,
          height: 32.w,
          decoration: BoxDecoration(
            color: colorScheme.primary,
            shape: BoxShape.circle,
          ),
          child: Icon(
            Icons.play_arrow_rounded,
            size: 18.sp,
            color: colorScheme.onPrimary,
          ),
        ),
        titleColor: colorScheme.primary,
        durationColor: colorScheme.onSurfaceVariant,
        trailing: Row(
          mainAxisSize: MainAxisSize.min,
          children: [
            Text(
              formatMinutes(lesson.durationMinutes),
              style: TextStyles.labelSmall.copyWith(
                color: colorScheme.onSurfaceVariant,
              ),
            ),
            Gap(8.w),
            Container(
              padding: EdgeInsets.symmetric(horizontal: 8.w, vertical: 4.h),
              decoration: BoxDecoration(
                color: colorScheme.primary,
                borderRadius: BorderRadius.circular(20.r),
              ),
              child: Text(
                'course_details.now_playing'.tr(),
                style: TextStyles.labelSmall.copyWith(
                  color: colorScheme.onPrimary,
                  fontWeight: FontWeights.semiBold,
                  fontSize: 10.sp,
                ),
              ),
            ),
          ],
        ),
      );
    }

    switch (lesson.status) {
      case LessonStatus.completed:
      case LessonStatus.active:
        return _buildTile(
          context,
          backgroundColor: colorScheme.surface,
          leading: _LessonLeadingIcon(
            icon: Icons.play_circle_outline_rounded,
            color: colorScheme.primary,
          ),
          titleColor: colorScheme.onSurface,
          durationColor: colorScheme.onSurfaceVariant,
          trailing: Container(
            width: 24.w,
            height: 24.w,
            decoration: BoxDecoration(
              color: colorScheme.secondary.withValues(alpha: 0.15),
              shape: BoxShape.circle,
            ),
            child: Icon(
              Icons.check_rounded,
              size: 14.sp,
              color: colorScheme.secondary,
            ),
          ),
        );
      case LessonStatus.locked:
        return _buildTile(
          context,
          backgroundColor: colorScheme.surface,
          leading: Icon(
            Icons.lock_outline_rounded,
            size: 18.sp,
            color: colorScheme.onSurfaceVariant.withValues(alpha: 0.6),
          ),
          titleColor: colorScheme.onSurfaceVariant.withValues(alpha: 0.6),
          durationColor: colorScheme.onSurfaceVariant.withValues(alpha: 0.5),
          trailing: Icon(
            Icons.lock_outline_rounded,
            size: 16.sp,
            color: colorScheme.onSurfaceVariant.withValues(alpha: 0.5),
          ),
        );
    }
  }

  Widget _buildTile(
    BuildContext context, {
    required Color backgroundColor,
    required Widget leading,
    required Color titleColor,
    required Color durationColor,
    required Widget trailing,
  }) {
    final colorScheme = Theme.of(context).colorScheme;

    return Material(
      color: backgroundColor,
      borderRadius: BorderRadius.circular(12.r),
      child: InkWell(
        onTap: onTap,
        borderRadius: BorderRadius.circular(12.r),
        child: Container(
          padding: EdgeInsets.symmetric(horizontal: 12.w, vertical: 12.h),
          decoration: BoxDecoration(
            borderRadius: BorderRadius.circular(12.r),
            border: Border.all(
              color: isActive
                  ? colorScheme.primary.withValues(alpha: 0.2)
                  : colorScheme.outline.withValues(alpha: 0.6),
            ),
          ),
          child: Row(
            children: [
              leading,
              Gap(12.w),
              Expanded(
                child: Text(
                  '${lesson.number}. ${lesson.title}',
                  style: TextStyles.labelMedium.copyWith(
                    color: titleColor,
                    fontWeight: FontWeights.medium,
                  ),
                  maxLines: 1,
                  overflow: TextOverflow.ellipsis,
                ),
              ),
              if (!isActive) ...[
                Text(
                  formatMinutes(lesson.durationMinutes),
                  style: TextStyles.labelSmall.copyWith(
                    color: durationColor,
                  ),
                ),
                Gap(8.w),
              ],
              trailing,
            ],
          ),
        ),
      ),
    );
  }
}

class _LessonLeadingIcon extends StatelessWidget {
  const _LessonLeadingIcon({
    required this.icon,
    required this.color,
  });

  final IconData icon;
  final Color color;

  @override
  Widget build(BuildContext context) {
    return Icon(icon, size: 22.sp, color: color);
  }
}
