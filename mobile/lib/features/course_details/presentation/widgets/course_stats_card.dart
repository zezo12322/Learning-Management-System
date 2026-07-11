import 'package:flutter/material.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';
import 'package:gap/gap.dart';
import 'package:optimatech_lms/core/utils/app_text_styles.dart';
import 'package:optimatech_lms/features/courses/domain/entities/courses_entity.dart';
import 'package:optimatech_lms/features/course_details/domain/entities/course_curriculum_entity.dart';

class CourseStatsCard extends StatelessWidget {
  const CourseStatsCard({super.key, required this.course, required this.lessons});

  final CourseEntity course;
  final List<CourseLessonEntity> lessons;

  @override
  Widget build(BuildContext context) {
    final colorScheme = Theme.of(context).colorScheme;

    int totalMinutes = 0;
    for (var lesson in lessons) {
      final match = RegExp(r'(\d+)').firstMatch(lesson.duration);
      if (match != null) {
        totalMinutes += int.tryParse(match.group(1) ?? '0') ?? 0;
      }
    }
    
    final hours = totalMinutes ~/ 60;
    final durationString = hours > 0 ? '$hours hours' : '$totalMinutes Min';

    final stats = [
      _StatItem(
        icon: Icons.access_time_rounded,
        value: durationString,
        label: 'Total Duration',
      ),
      _StatItem(
        icon: Icons.play_circle_outline_rounded,
        value: '${lessons.length} Lessons',
        label: 'Lessons',
      ),
      _StatItem(
        icon: Icons.bar_chart_rounded,
        value: course.level.isNotEmpty ? course.level : 'Beginner',
        label: 'Level',
      ),
      // TODO: Certificate Should be fetched from the API
      const _StatItem(
        icon: Icons.workspace_premium_outlined,
        value: 'Certificate',
        label: 'Included',
      ),
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
