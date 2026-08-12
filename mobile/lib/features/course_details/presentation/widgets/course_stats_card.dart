import 'package:easy_localization/easy_localization.dart';
import 'package:flutter/material.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';
import 'package:gap/gap.dart';
import 'package:optimatech_lms/core/utils/app_text_styles.dart';
import 'package:optimatech_lms/core/utils/duration_format.dart';
import 'package:optimatech_lms/features/courses/domain/entities/courses_entity.dart';
import 'package:optimatech_lms/features/course_details/domain/entities/course_curriculum_entity.dart';

class CourseStatsCard extends StatelessWidget {
  const CourseStatsCard({super.key, required this.course, required this.lessons});

  final CourseEntity course;
  final List<CourseLessonEntity> lessons;

  @override
  Widget build(BuildContext context) {
    final colorScheme = Theme.of(context).colorScheme;

    var totalSeconds = 0;
    for (final lesson in lessons) {
      totalSeconds += lesson.durationSeconds;
    }

    final stats = [
      _StatItem(
        icon: Icons.access_time_rounded,
        value: formatSeconds(totalSeconds),
        label: 'course_details.total_duration'.tr(),
      ),
      _StatItem(
        icon: Icons.play_circle_outline_rounded,
        value: '${lessons.length}',
        label: 'course_details.lessons'.tr(),
      ),
      _StatItem(
        icon: Icons.bar_chart_rounded,
        value: _levelLabel(course.level),
        label: 'course_details.level'.tr(),
      ),
      // A "Certificate — Included" tile used to sit here with a hardcoded
      // value. Nothing in the course schema says whether a certificate is
      // issued, so it promised every learner something the platform may not
      // deliver. Restore it once the API exposes the field.
    ];

    return Container(
      padding: EdgeInsets.symmetric(vertical: 16.h, horizontal: 8.w),
      decoration: BoxDecoration(
        color: colorScheme.surface,
        borderRadius: BorderRadius.circular(16.r),
        border: Border.all(color: colorScheme.outline),
      ),
      child: Row(
        children: stats
            .map(
              (stat) => Expanded(
                child: _StatBlock(stat: stat),
              ),
            )
            .toList(),
      ),
    );
  }
}

/// The API sends BEGINNER / INTERMEDIATE / ADVANCED; show it in the user's
/// language and fall back to the raw value for anything unrecognised.
String _levelLabel(String level) {
  switch (level.toUpperCase()) {
    case 'BEGINNER':
      return 'course_details.level_beginner'.tr();
    case 'INTERMEDIATE':
      return 'course_details.level_intermediate'.tr();
    case 'ADVANCED':
      return 'course_details.level_advanced'.tr();
    default:
      return level.isNotEmpty ? level : 'course_details.level_beginner'.tr();
  }
}

class _StatItem {
  const _StatItem({
    required this.icon,
    required this.value,
    required this.label,
  });

  final IconData icon;
  final String value;
  final String label;
}

class _StatBlock extends StatelessWidget {
  const _StatBlock({required this.stat});

  final _StatItem stat;

  @override
  Widget build(BuildContext context) {
    final colorScheme = Theme.of(context).colorScheme;

    return Column(
      children: [
        Container(
          width: 36.w,
          height: 36.w,
          decoration: BoxDecoration(
            color: colorScheme.primary.withValues(alpha: 0.1),
            borderRadius: BorderRadius.circular(10.r),
          ),
          child: Icon(
            stat.icon,
            size: 18.sp,
            color: colorScheme.primary,
          ),
        ),
        Gap(8.h),
        Text(
          stat.value,
          style: TextStyles.labelMedium.copyWith(
            fontWeight: FontWeights.bold,
            color: colorScheme.onSurface,
          ),
          textAlign: TextAlign.center,
          maxLines: 1,
          overflow: TextOverflow.ellipsis,
        ),
        Gap(2.h),
        Text(
          stat.label,
          style: TextStyles.labelSmall.copyWith(
            color: colorScheme.onSurfaceVariant,
            fontSize: 10.sp,
          ),
          textAlign: TextAlign.center,
          maxLines: 1,
          overflow: TextOverflow.ellipsis,
        ),
      ],
    );
  }
}
