import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';
import 'package:gap/gap.dart';
import 'package:optimatech_lms/core/utils/extension.dart';
import 'package:optimatech_lms/core/widgets/app_error_widget.dart';
import 'package:optimatech_lms/features/course_learning/presentation/manager/course_learning_cubit.dart';
import 'package:optimatech_lms/features/course_learning/presentation/manager/course_learning_state.dart';
import 'package:optimatech_lms/features/course_learning/presentation/views/widgets/course_curriculum_section.dart';
import 'package:optimatech_lms/features/course_learning/presentation/views/widgets/lesson_about_section.dart';
import 'package:optimatech_lms/features/course_learning/presentation/views/widgets/lesson_bottom_bar.dart';
import 'package:optimatech_lms/features/course_learning/presentation/views/widgets/lesson_header_section.dart';
import 'package:optimatech_lms/features/course_learning/presentation/views/widgets/lesson_tap_row.dart';
import 'package:optimatech_lms/features/course_learning/presentation/views/widgets/lesson_video_player_section.dart';

class CourseLearningContent extends StatelessWidget {
  const CourseLearningContent({
    super.key,
    required this.selectedTab,
    required this.isBookmarked,
    required this.onTabSelected,
    required this.onBookmarkTap,
  });

  final LessonTab selectedTab;
  final bool isBookmarked;
  final ValueChanged<LessonTab> onTabSelected;
  final VoidCallback onBookmarkTap;

  @override
  Widget build(BuildContext context) {
    return Column(
      children: [
        const _LectureVideoSection(),
        Expanded(
          child: Container(
            width: double.infinity,
            decoration: BoxDecoration(
              color: context.theme.colorScheme.surface,
              borderRadius: BorderRadius.vertical(top: Radius.circular(18.r)),
            ),
            child: BlocBuilder<CourseLearningCubit, CourseLearningState>(
              buildWhen: (prev, curr) => prev.lectureState != curr.lectureState,
              builder: (context, state) {
                if (state.lectureState == Status.failure) {
                  return AppErrorWidget(
                    message: state.lectureErrorMessage,
                    onRetry: () => context
                        .read<CourseLearningCubit>()
                        .retryFetchLecture(),
                  );
                }
                return Column(
                  children: [
                    Expanded(
                      child: SingleChildScrollView(
                        physics: const BouncingScrollPhysics(),
                        padding: EdgeInsets.fromLTRB(20.w, 24.h, 20.w, 16.h),
                        child: Column(
                          crossAxisAlignment: CrossAxisAlignment.start,
                          children: [
                            _LessonHeaderSection(
                              isBookmarked: isBookmarked,
                              onBookmarkTap: onBookmarkTap,
                            ),
                            Gap(6.h),
                            Divider(
                              color: context.theme.colorScheme.outline
                                  .withValues(alpha: 0.6),
                            ),
                            Gap(4.h),
                            LessonTabsRow(
                              selected: selectedTab,
                              onSelected: onTabSelected,
                            ),
                            Gap(22.h),
                            _TabContent(selectedTab: selectedTab),
                          ],
                        ),
                      ),
                    ),
                    const _BottomBarSection(),
                  ],
                );
              },
            ),
          ),
        ),
      ],
    );
  }
}

class _LectureVideoSection extends StatelessWidget {
  const _LectureVideoSection();

  @override
  Widget build(BuildContext context) {
    return BlocBuilder<CourseLearningCubit, CourseLearningState>(
      buildWhen: (prev, curr) =>
      prev.currentLecture?.videoUrl != curr.currentLecture?.videoUrl ||
          prev.lectureState != curr.lectureState,
      builder: (context, state) {
        if (state.lectureState == Status.loading) {
          return const AspectRatio(
            aspectRatio: 16 / 9,
            child: ColoredBox(
              color: Colors.black,
              child: Center(
                child: CircularProgressIndicator(color: Color(0xFF6366F1)),
              ),
            ),
          );
        }

        if (state.lectureState == Status.failure) {
          return const AspectRatio(
            aspectRatio: 16 / 9,
            child: ColoredBox(color: Colors.black),
          );
        }

        final url = state.currentLecture?.videoUrl ?? '';

        return LessonVideoPlayerSection(
          key: ValueKey(url.isEmpty ? 'empty-video' : url),
          url: url,
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
          previous.currentLecture?.id != current.currentLecture?.id,
      builder: (context, state) {
        final curriculum = state.curriculum;
        if (curriculum == null) return const SizedBox.shrink();
        return CourseCurriculumSection(curriculum: curriculum);
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
          onPrevious: cubit.hasPreviousLecture ? cubit.goToPreviousLecture : () {},
          onMarkComplete: state.currentLecture == null
              ? null
              : cubit.markCurrentLectureAsCompleted,
          onNext: cubit.hasNextLecture ? cubit.goToNextLecture : () {},
        );
      },
    );
  }
}