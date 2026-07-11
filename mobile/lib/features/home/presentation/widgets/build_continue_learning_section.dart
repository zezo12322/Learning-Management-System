import 'package:easy_localization/easy_localization.dart';
import 'package:flutter/material.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';
import 'package:gap/gap.dart';
import 'package:optimatech_lms/features/home/domain/entities/student_progress_entity.dart';
import 'package:optimatech_lms/features/home/presentation/widgets/continue_learning_card.dart';
import 'package:optimatech_lms/features/home/presentation/widgets/home_section_header.dart';
import 'package:optimatech_lms/features/course_learning/presentation/views/course_learning_view.dart';
import 'package:optimatech_lms/features/courses/domain/entities/courses_entity.dart';

// ------------- Continue Learning Section Builder -------------
Widget buildContinueLearningSection(
  BuildContext context,
  StudentProgressEntity progress,
) {
  return Column(
    crossAxisAlignment: CrossAxisAlignment.start,
    children: [
      HomeSectionHeader(
        title: 'home.continue_learning'.tr(),
        onViewAllTap: () {},
      ),
      Gap(14.h),
      ContinueLearningCard(
        title: progress.title,
        image: progress.thumbnail,
        progress: progress.progressPercent,
        lessonsCompleted: progress.watchedLessons,
        totalLessons: progress.totalLessons,
        timeLeft: progress.timeLeft,
        onTap: () {},
        onPlayTap: () {
          Navigator.push(
            context,
            MaterialPageRoute(
              builder: (context) => CourseLearningView(
                courseId: progress.courseId,
              ),
            ),
          );
        },
      ),
    ],
  );
}
