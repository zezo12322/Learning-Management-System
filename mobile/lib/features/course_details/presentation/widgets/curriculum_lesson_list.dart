import 'package:flutter/material.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';
import 'package:gap/gap.dart';
import 'package:optimatech_lms/core/utils/app_text_styles.dart';
import 'package:optimatech_lms/features/course_details/presentation/models/course_details_mock_data.dart';

class CurriculumLessonList extends StatelessWidget {
  const CurriculumLessonList({
    super.key,
    required this.lessons,
    this.onLessonTap,
  });

  final List<CourseLesson> lessons;
  final ValueChanged<CourseLesson>? onLessonTap;

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
                'Curriculum',
                style: TextStyles.titleSmall.copyWith(
                  fontSize: 18.sp,
                  color: colorScheme.onSurface,
                ),
              ),
            ),
            InkWell(
              onTap: () {},
              borderRadius: BorderRadius.circular(8.r),
              child: Padding(
                padding: EdgeInsets.symmetric(horizontal: 4.w, vertical: 4.h),
                child: Row(
                  mainAxisSize: MainAxisSize.min,
                  children: [
                    Text(
                      'View All Lessons',
                      style: TextStyles.labelMedium.copyWith(
                        color: colorScheme.primary,
                        fontWeight: FontWeights.medium,
                      ),
                    ),
                    Icon(
                      Icons.chevron_right_rounded,
                      size: 18.sp,
                      color: colorScheme.primary,
                    ),
                  ],
                ),
              ),
            ),
          ],
        ),
        Gap(12.h),
        ...lessons.map(
          (lesson) => Padding(
            padding: EdgeInsets.only(bottom: 8.h),
            child: _LessonTile(
              lesson: lesson,
              onTap: onLessonTap != null ? () => onLessonTap!(lesson) : null,
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
  });

  final CourseLesson lesson;
  final VoidCallback? onTap;

  @override
  Widget build(BuildContext context) {
    final colorScheme = Theme.of(context).colorScheme;

    switch (lesson.status) {
      case LessonStatus.completed:
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
      case LessonStatus.active:
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
                lesson.duration,
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
                  'Now Playing',
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
              color: lesson.status == LessonStatus.active
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
              if (lesson.status != LessonStatus.active) ...[
                Text(
                  lesson.duration,
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
