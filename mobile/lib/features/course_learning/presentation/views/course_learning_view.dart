import 'package:flutter/material.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';
import 'package:gap/gap.dart';
import 'package:optimatech_lms/core/helper_function/dummy.dart';
import 'package:optimatech_lms/core/utils/extension.dart';
import 'package:optimatech_lms/features/course_learning/presentation/views/widgets/course_curriculum_section.dart';
import 'package:optimatech_lms/features/course_learning/presentation/views/widgets/custom_course_learning_appbar.dart';
import 'package:optimatech_lms/features/course_learning/presentation/views/widgets/lesson_about_section.dart';
import 'package:optimatech_lms/features/course_learning/presentation/views/widgets/lesson_bottom_bar.dart';
import 'package:optimatech_lms/features/course_learning/presentation/views/widgets/lesson_header_section.dart';
import 'package:optimatech_lms/features/course_learning/presentation/views/widgets/lesson_tap_row.dart';
import 'package:optimatech_lms/features/course_learning/presentation/views/widgets/lesson_video_player_section.dart';

class CourseLearningView extends StatefulWidget {
  const CourseLearningView({super.key});

  static const String routeName = '/course-learning';

  @override
  State<CourseLearningView> createState() => _CourseLearningViewState();
}

class _CourseLearningViewState extends State<CourseLearningView> {
  LessonTab _selectedTab = LessonTab.curriculum;
  bool _isBookmarked = false;

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: const CustomCourseLearningAppbar(),
      backgroundColor: Colors.black,
      body: Column(
        children: [
          // ------------- Video player (fixed, non-scrolling) -------------
          const LessonVideoPlayerSection(url: 'https://flutter.github.io/assets-for-api-docs/assets/videos/bee.mp4'),

          // ------------- Scrollable lesson content -------------
          Expanded(
            child: Container(
              width: double.infinity,
              decoration: BoxDecoration(
                color: context.theme.colorScheme.surface,
                borderRadius: BorderRadius.vertical(top: Radius.circular(18.r)),
              ),
              child: Column(
                children: [
                  Expanded(
                    child: SingleChildScrollView(
                      physics: const CarouselScrollPhysics(),
                      padding: EdgeInsets.fromLTRB(20.w, 24.h, 20.w, 16.h),
                      child: Column(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          LessonHeaderSection(
                            courseTitle: 'UI/UX Design Fundamentals',
                            lessonTitle: '3. User Research Methods',
                            durationLabel: '15 min',
                            lessonProgressLabel: 'Lesson 3 of 12',
                            statusLabel: 'In Progress',
                            isBookmarked: _isBookmarked,
                            onBookmarkTap: () {
                              setState(() => _isBookmarked = !_isBookmarked);
                            },
                          ),
                          Gap(6.h),
                          Divider(
                            color: context.theme.colorScheme.outline.withValues(alpha: 0.6),
                          ),
                          Gap(4.h),
                          LessonTabsRow(
                            selected: _selectedTab,
                            onSelected: (tab) => setState(() => _selectedTab = tab),
                          ),
                          Gap(22.h),
                          CourseCurriculumSection(lessons: sampleCurriculumLessons),
                          Gap(24.h),
                          //const LessonAboutSection(),
                        ],
                      ),
                    ),
                  ),
                  LessonBottomBar(
                    onPrevious: () {},
                    onMarkComplete: () {},
                    onNext: () {},
                  ),
                ],
              ),
            ),
          ),
        ],
      ),
    );
  }
}