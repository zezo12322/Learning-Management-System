import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';
import 'package:gap/gap.dart';
import 'package:optimatech_lms/core/services/get_it_service.dart';
import 'package:optimatech_lms/core/utils/extension.dart';
import 'package:optimatech_lms/features/course_learning/presentation/manager/course_learning_cubit.dart';
import 'package:optimatech_lms/features/course_learning/presentation/manager/course_learning_state.dart';
import 'package:optimatech_lms/features/course_learning/presentation/views/widgets/course_curriculum_section.dart';
import 'package:optimatech_lms/features/course_learning/presentation/views/widgets/custom_course_learning_appbar.dart';
import 'package:optimatech_lms/features/course_learning/presentation/views/widgets/lesson_about_section.dart';
import 'package:optimatech_lms/features/course_learning/presentation/views/widgets/lesson_bottom_bar.dart';
import 'package:optimatech_lms/features/course_learning/presentation/views/widgets/lesson_header_section.dart';
import 'package:optimatech_lms/features/course_learning/presentation/views/widgets/lesson_tap_row.dart';
import 'package:optimatech_lms/features/course_learning/presentation/views/widgets/lesson_video_player_section.dart';

class CourseLearningView extends StatefulWidget {
  const CourseLearningView({super.key, required this.courseId});

  static const String routeName = '/course-learning';
  final String courseId;

  @override
  State<CourseLearningView> createState() => _CourseLearningViewState();
}

class _CourseLearningViewState extends State<CourseLearningView> {
  LessonTab _selectedTab = LessonTab.curriculum;
  bool _isBookmarked = false;

  @override
  Widget build(BuildContext context) {
    return BlocProvider(
      create: (context) => getIt<CourseLearningCubit>()..fetchCourseCurriculum(widget.courseId),
      child: Scaffold(
        appBar: const CustomCourseLearningAppbar(),
        backgroundColor: Colors.black,
        body: Column(
          children: [
            // ------------- Video player (fixed, non-scrolling) -------------
            BlocSelector<CourseLearningCubit, CourseLearningState, String>(
              selector: (state) => state.currentLecture?.videoUrl ?? '',
              builder: (context, url) {
                return LessonVideoPlayerSection(url: url);
              },
            ),

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
                        physics: const BouncingScrollPhysics(),
                        padding: EdgeInsets.fromLTRB(20.w, 24.h, 20.w, 16.h),
                        child: Column(
                          crossAxisAlignment: CrossAxisAlignment.start,
                          children: [
                            BlocBuilder<CourseLearningCubit, CourseLearningState>(
                              buildWhen: (prev, curr) =>
                                prev.curriculum != curr.curriculum ||
                                prev.currentLecture != curr.currentLecture,
                              builder: (context, state) {
                                final curriculum = state.curriculum;
                                final lecture = state.currentLecture;

                                return LessonHeaderSection(
                                  courseTitle: curriculum?.title ?? '',
                                  lessonTitle: lecture?.title ?? '',
                                  durationLabel: lecture?.duration != null ? '${lecture!.duration} min' : '',
                                  lessonProgressLabel: curriculum != null
                                    ? 'Lesson ${curriculum.sections.expand((s) => s.lectures).toList().indexWhere((l) => l.id == lecture?.id) + 1} of ${curriculum.totalLectures}'
                                    : '',
                                  statusLabel: 'In Progress',
                                  isBookmarked: _isBookmarked,
                                  onBookmarkTap: () {
                                    setState(() => _isBookmarked = !_isBookmarked);
                                  },
                                );
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
                            BlocBuilder<CourseLearningCubit, CourseLearningState>(
                              buildWhen: (previous, current) =>
                                  previous.curriculum != current.curriculum ||
                                  previous.curriculumState != current.curriculumState,
                              builder: (context, state) {
                                if (state.curriculumState == Status.loading) {
                                  return const Center(child: CircularProgressIndicator());
                                }
                                if (state.curriculum == null || state.curriculumState == Status.initial) {
                                  return const SizedBox.shrink();
                                }
                                return CourseCurriculumSection(
                                  curriculum: state.curriculum!,
                                );
                              },
                            ),
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
      ),
    );
  }
}