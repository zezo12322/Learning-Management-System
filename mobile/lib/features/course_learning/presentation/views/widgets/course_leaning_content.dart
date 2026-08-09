import 'package:easy_localization/easy_localization.dart';
import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';
import 'package:gap/gap.dart';
import 'package:optimatech_lms/core/helper_function/lecture_type.dart';
import 'package:optimatech_lms/core/services/get_it_service.dart';
import 'package:optimatech_lms/core/utils/app_colors.dart';
import 'package:optimatech_lms/core/utils/duration_format.dart';
import 'package:optimatech_lms/core/utils/extension.dart';
import 'package:optimatech_lms/core/widgets/app_error_widget.dart';
import 'package:optimatech_lms/core/widgets/primary_button.dart';
import 'package:optimatech_lms/features/quiz/domain/repositories/quiz_repository.dart';
import 'package:optimatech_lms/features/quiz/presentation/views/quiz_view.dart';
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
                            const _LectureReadingSection(),
                            const _LectureQuizSection(),
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
          prev.currentLecture?.type != curr.currentLecture?.type ||
          prev.lectureState != curr.lectureState,
      builder: (context, state) {
        if (state.lectureState == Status.loading) {
          return AspectRatio(
            aspectRatio: 16 / 9,
            child: ColoredBox(
              color: Colors.black,
              child: Center(
                child: CircularProgressIndicator(color: context.theme.colorScheme.primary),
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

        // Only VIDEO lectures render the media player. Reading / interactive /
        // quiz lectures render their content in the body below, so no media
        // area (and no misleading "failed to load" banner) is shown here.
        final lecture = state.currentLecture;
        if (lecture == null || lecture.type != LectureContentType.video) {
          return const SizedBox.shrink();
        }

        final url = lecture.videoUrl ?? '';

        return LessonVideoPlayerSection(
          key: ValueKey(url.isEmpty ? 'empty-video' : url),
          url: url,
        );
      },
    );
  }
}

/// Renders the textual body of a READING lecture. For any other lecture type
/// (video/interactive/quiz) it collapses to nothing, so video lectures keep
/// their original layout untouched.
class _LectureReadingSection extends StatelessWidget {
  const _LectureReadingSection();

  @override
  Widget build(BuildContext context) {
    return BlocBuilder<CourseLearningCubit, CourseLearningState>(
      buildWhen: (prev, curr) =>
      prev.currentLecture?.id != curr.currentLecture?.id ||
          prev.currentLecture?.type != curr.currentLecture?.type ||
          prev.lectureState != curr.lectureState,
      builder: (context, state) {
        final lecture = state.currentLecture;
        if (lecture == null || lecture.type != LectureContentType.reading) {
          return const SizedBox.shrink();
        }

        final content = lecture.content?.trim() ?? '';

        return Padding(
          padding: EdgeInsets.only(bottom: 16.h),
          child: Container(
            width: double.infinity,
            padding: EdgeInsets.all(16.r),
            decoration: BoxDecoration(
              color: AppColors.disableBackground.withValues(alpha: 0.5),
              borderRadius: BorderRadius.circular(16.r),
            ),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Row(
                  children: [
                    Icon(
                      Icons.menu_book_rounded,
                      color: context.theme.colorScheme.primary,
                      size: 20.sp,
                    ),
                    Gap(8.w),
                    Text(
                      'lesson_learning.reading.title'.tr(),
                      style: context.textTheme.titleSmall,
                    ),
                  ],
                ),
                Gap(12.h),
                Text(
                  content.isEmpty
                      ? 'lesson_learning.reading.empty'.tr()
                      : content,
                  style: context.textTheme.bodyMedium?.copyWith(
                    color: context.theme.colorScheme.onSurfaceVariant,
                    height: 1.6,
                  ),
                ),
              ],
            ),
          ),
        );
      },
    );
  }
}

/// Body for QUIZ and INTERACTIVE lectures.
///
/// Neither the video section nor the reading section renders for these types,
/// so the lesson body was simply blank. QUIZ lectures now get the entry point
/// the quiz screen never had: `QuizView` was registered in the router and no
/// navigator anywhere pushed it, on the basis of a note saying no endpoint
/// could resolve a lecture's quiz id. `GET /courses/:courseId/lectures/:id/quiz`
/// does exactly that and is open to enrolled students, so the note was stale.
class _LectureQuizSection extends StatefulWidget {
  const _LectureQuizSection();

  @override
  State<_LectureQuizSection> createState() => _LectureQuizSectionState();
}

class _LectureQuizSectionState extends State<_LectureQuizSection> {
  bool _isOpening = false;
  String? _message;

  Future<void> _openQuiz(String courseId, String lectureId) async {
    if (_isOpening) return;
    setState(() {
      _isOpening = true;
      _message = null;
    });

    String? quizId;
    try {
      quizId = await getIt<QuizRepository>().getQuizIdForLecture(
        courseId,
        lectureId,
      );
    } finally {
      if (mounted) setState(() => _isOpening = false);
    }

    if (!mounted) return;
    if (quizId == null) {
      setState(() => _message = 'lesson_learning.quiz.unavailable'.tr());
      return;
    }

    await Navigator.of(context).pushNamed(
      QuizView.routeName,
      arguments: QuizViewArgs(courseId: courseId, quizId: quizId),
    );
  }

  @override
  Widget build(BuildContext context) {
    return BlocBuilder<CourseLearningCubit, CourseLearningState>(
      buildWhen: (prev, curr) =>
          prev.currentLecture?.id != curr.currentLecture?.id ||
          prev.currentLecture?.type != curr.currentLecture?.type ||
          prev.lectureState != curr.lectureState,
      builder: (context, state) {
        final lecture = state.currentLecture;
        final type = lecture?.type;
        if (lecture == null ||
            (type != LectureContentType.quiz &&
                type != LectureContentType.interactive)) {
          return const SizedBox.shrink();
        }

        final isQuiz = type == LectureContentType.quiz;
        final courseId = context.read<CourseLearningCubit>().courseId;

        return Padding(
          padding: EdgeInsets.only(bottom: 16.h),
          child: Container(
            width: double.infinity,
            padding: EdgeInsets.all(16.r),
            decoration: BoxDecoration(
              color: AppColors.disableBackground.withValues(alpha: 0.5),
              borderRadius: BorderRadius.circular(16.r),
            ),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Row(
                  children: [
                    Icon(
                      isQuiz
                          ? Icons.quiz_outlined
                          : Icons.extension_outlined,
                      color: context.theme.colorScheme.primary,
                      size: 20.sp,
                    ),
                    Gap(8.w),
                    Expanded(
                      child: Text(
                        isQuiz
                            ? 'lesson_learning.quiz.title'.tr()
                            : lecture.title,
                        style: context.textTheme.titleSmall,
                      ),
                    ),
                  ],
                ),
                Gap(12.h),
                Text(
                  isQuiz
                      ? (_message ?? 'lesson_learning.quiz.description'.tr())
                      : 'lesson_learning.interactive.unavailable'.tr(),
                  style: context.textTheme.bodyMedium?.copyWith(
                    color: context.theme.colorScheme.onSurfaceVariant,
                    height: 1.6,
                  ),
                ),
                if (isQuiz && courseId != null) ...[
                  Gap(16.h),
                  SizedBox(
                    width: double.infinity,
                    child: _isOpening
                        ? Center(
                            child: SizedBox(
                              height: 24.r,
                              width: 24.r,
                              child: const CircularProgressIndicator(
                                strokeWidth: 2,
                              ),
                            ),
                          )
                        : PrimaryButton(
                            text: 'lesson_learning.quiz.start'.tr(),
                            onPressed: () => _openQuiz(courseId, lecture.id),
                          ),
                  ),
                ],
              ],
            ),
          ),
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
          lessonTitle:
              isLectureLoading ? 'common.loading'.tr() : (lecture?.title ?? ''),
          durationLabel: formatSeconds(lecture?.duration),
          lessonProgressLabel: cubit.currentLessonProgressLabel,
          statusLabel: 'lesson_learning.header.status_in_progress'.tr(),
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
          onNext: cubit.hasNextLecture ? cubit.goToNextLecture : () {},
        );
      },
    );
  }
}