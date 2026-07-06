import 'package:easy_localization/easy_localization.dart';
import 'package:flutter/material.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';
import 'package:gap/gap.dart';
import 'package:optimatech_lms/features/home/domain/entities/student_progress_entity.dart';
import 'package:optimatech_lms/features/home/presentation/widgets/continue_learning_card.dart';
import 'package:optimatech_lms/features/home/presentation/widgets/home_section_header.dart';
import '../../domain/entities/course_entity.dart';

// ------------- Continue Learning Section Builder -------------
Widget buildContinueLearningSection(
    StudentProgressEntity? progress,
    CourseEntity? continueCourse,
    ) {
  final title = continueCourse?.title ?? 'UI/UX Design Principles';
  final image =
      continueCourse?.image ?? 'assets/images/student_illustrator.png';

  return Column(
    crossAxisAlignment: CrossAxisAlignment.start,
    children: [
      HomeSectionHeader(
        title: 'home.continue_learning'.tr(),
        onViewAllTap: () {},
      ),
      Gap(14.h),
      ContinueLearningCard(
        title: title,
        image: image,
        progress: progress?.progressPercent ?? 0.0,
        lessonsCompleted: progress?.watchedLessons ?? 0,
        totalLessons: progress?.totalLessons ?? 0,
        timeLeft: progress?.timeLeft ?? '0 min',
        onTap: () {},
        onPlayTap: () {},
      ),
    ],
  );
}