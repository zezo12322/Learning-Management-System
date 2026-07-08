import 'package:easy_localization/easy_localization.dart';
import 'package:flutter/material.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';
import 'package:gap/gap.dart';
import 'package:optimatech_lms/core/utils/extension.dart';
import 'package:optimatech_lms/features/course_learning/presentation/views/widgets/curriculum_lesson_tile.dart';

enum CurriculumLessonStatus{
  current,
  completed,
  locked
}

class CurriculumLessonData {
  final int order;
  final String title;
  final String duration;
  final String status;


  CurriculumLessonData({required this.order, required this.title, required this.duration, required this.status});
}

class CourseCurriculumSection extends StatelessWidget {
  const CourseCurriculumSection({
    super.key,
    required this.lessons,
  });

  final List<CurriculumLessonData> lessons;

  @override
  Widget build(BuildContext context) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Row(
          mainAxisAlignment: MainAxisAlignment.spaceBetween,
          children: [
            Text(
              'lesson_learning.curriculum.title'.tr(),
              style: context.textTheme.titleSmall?.copyWith(fontSize: 17.sp),
            ),
            Text(
              'lesson_learning.curriculum.lessons_count'.tr(
                namedArgs: {'count': '${lessons.length}'},
              ),
              style: context.textTheme.bodySmall?.copyWith(
                color: context.theme.colorScheme.onSurfaceVariant,
              ),
            ),
          ],
        ),
        Gap(8.h),
        Column(
          children: lessons
              .map(
                (lesson) => CurriculumLessonTile(
              data: lesson,
              onTap: () {},
            ),
          ).toList(),
        ),
      ],
    );
  }
}