import 'package:easy_localization/easy_localization.dart';
import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';
import 'package:gap/gap.dart';
import 'package:optimatech_lms/core/utils/extension.dart';
import 'package:optimatech_lms/features/course_learning/domain/entities/course_curriculum_entity.dart';
import 'package:optimatech_lms/features/course_learning/presentation/manager/course_learning_cubit.dart';
import 'package:optimatech_lms/features/course_learning/presentation/manager/course_learning_state.dart';
import 'package:optimatech_lms/features/course_learning/presentation/views/widgets/curriculum_lesson_tile.dart';

class CourseCurriculumSection extends StatelessWidget {
  const CourseCurriculumSection({
    super.key,
    required this.curriculum,
  });

  final CourseCurriculumEntity curriculum;

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
                namedArgs: {'count': '${curriculum.totalLectures}'},
              ),
              style: context.textTheme.bodySmall?.copyWith(
                color: context.theme.colorScheme.onSurfaceVariant,
              ),
            ),
          ],
        ),
        Gap(16.h),
        ...curriculum.sections.map((section) {
          return Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              if (curriculum.sections.length > 1) ...[
                Padding(
                  padding: EdgeInsets.symmetric(vertical: 8.h),
                  child: Text(
                    section.title,
                    style: context.textTheme.labelLarge?.copyWith(
                      fontWeight: FontWeight.bold,
                      color: context.theme.colorScheme.onSurfaceVariant,
                    ),
                  ),
                ),
                Gap(8.h),
              ],
              ...section.lectures.asMap().entries.map((entry) {
                final index = entry.key;
                final lecture = entry.value;

                return BlocBuilder<CourseLearningCubit, CourseLearningState>(
                  buildWhen: (prev, curr) => prev.currentLecture?.id != curr.currentLecture?.id,
                  builder: (context, state) {
                    final isCurrent = state.currentLecture?.id == lecture.id;

                    return CurriculumLessonTile(
                      lecture: lecture,
                      order: index + 1,
                      isCurrent: isCurrent,
                      onTap: () => context.read<CourseLearningCubit>().selectLectureById(lecture.id),
                    );
                  },
                );
              }),
              Gap(16.h),
            ],
          );
        }),
      ],
    );
  }
}
