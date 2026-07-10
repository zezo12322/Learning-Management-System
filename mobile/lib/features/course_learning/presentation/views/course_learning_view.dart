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
      create: (_) => getIt<CourseLearningCubit>()
        ..fetchCourseCurriculum(widget.courseId),
      child: Scaffold(
        appBar: const CustomCourseLearningAppbar(),
        backgroundColor: Colors.black,
        body: Column(
          children: [
            const _LectureVideoSection(),
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
                            _LessonHeaderSection(
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
                            _TabContent(selectedTab: _selectedTab),
                          ],
                        ),
                      ),
                    ),
                    const _BottomBarSection(),
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

class _LectureVideoSection extends StatelessWidget {
  const _LectureVideoSection();

  @override
  Widget build(BuildContext context) {
    return BlocSelector<CourseLearningCubit, CourseLearningState, String?>(
      selector: (state) => state.currentLecture?.videoUrl,
      builder: (context, url) {
        return LessonVideoPlayerSection(
          key: ValueKey(url ?? 'empty-video'),
          url: url ?? '',
        );
      },
    );
  }
}

class _LessonHeaderSection extends StatelessWidget {
  const _LessonHeaderSection({
    required this.isBookmarked,
    required this.onBookmarkTap,
  });

  final bool isBookmarked;
  final VoidCallback onBookmarkTap;

  @override
  Widget build(BuildContext context) {
    return BlocBuilder<CourseLearningCubit, CourseLearningState>(
      buildWhen: (prev, curr) =>
      prev.curriculum != curr.curriculum ||
          prev.currentLecture != curr.currentLecture,
      builder: (context, state) {
        final curriculum = state.curriculum;
        final lecture = state.currentLecture;
        final cubit = context.read<CourseLearningCubit>();
        final isLectureLoading =
            state.lectureState == Status.loading && state.currentLecture == null;

        return LessonHeaderSection(
          courseTitle: curriculum?.title ?? '',
          lessonTitle: isLectureLoading ? 'Loading...' : (lecture?.title ?? ''),
          durationLabel: lecture?.duration != null ? '${lecture!.duration} min' : '',
          lessonProgressLabel: cubit.currentLessonProgressLabel,
          statusLabel: 'In Progress',
          isBookmarked: isBookmarked,
          onBookmarkTap: onBookmarkTap,
        );
      },
    );
  }
}

class _TabContent extends StatelessWidget {
  const _TabContent({required this.selectedTab});

  final LessonTab selectedTab;

  @override
  Widget build(BuildContext context) {
    switch (selectedTab) {
      case LessonTab.curriculum:
        return const _CurriculumTabContent();
      case LessonTab.notes:
      case LessonTab.resources:
      case LessonTab.discussion:
        return const LessonAboutSection();
    }
  }
}

class _CurriculumTabContent extends StatelessWidget {
  const _CurriculumTabContent();

  @override
  Widget build(BuildContext context) {
    return BlocBuilder<CourseLearningCubit, CourseLearningState>(
      buildWhen: (previous, current) =>
      previous.curriculum != current.curriculum ||
          previous.curriculumState != current.curriculumState ||
          previous.currentLecture?.id != current.currentLecture?.id,
      builder: (context, state) {
        if (state.curriculumState == Status.loading) {
          return const Center(child: CircularProgressIndicator());
        }

        if (state.curriculumState == Status.failure) {
          return Center(
            child: Text(
              state.curriculumErrorMessage ?? 'Something went wrong',
            ),
          );
        }

        if (state.curriculum == null) {
          return const SizedBox.shrink();
        }

        return CourseCurriculumSection(
          curriculum: state.curriculum!,
        );
      },
    );
  }
}

class _BottomBarSection extends StatelessWidget {
  const _BottomBarSection();

  @override
  Widget build(BuildContext context) {
    return BlocBuilder<CourseLearningCubit, CourseLearningState>(
      buildWhen: (prev, curr) =>
      prev.currentLecture?.id != curr.currentLecture?.id ||
          prev.curriculum != curr.curriculum,
      builder: (context, state) {
        final cubit = context.read<CourseLearningCubit>();

        return LessonBottomBar(
          onPrevious: cubit.hasPreviousLecture ? cubit.goToPreviousLecture : (){},
          onMarkComplete: state.currentLecture == null
              ? null
              : cubit.markCurrentLectureAsCompleted,
          onNext: cubit.hasNextLecture ? cubit.goToNextLecture : (){},
        );
      },
    );
  }
}