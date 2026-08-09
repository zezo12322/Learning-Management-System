import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:optimatech_lms/core/services/get_it_service.dart';
import 'package:optimatech_lms/core/utils/extension.dart';
import 'package:optimatech_lms/core/widgets/app_error_widget.dart';
import 'package:optimatech_lms/features/course_learning/presentation/manager/course_learning_cubit.dart';
import 'package:optimatech_lms/features/course_learning/presentation/manager/course_learning_state.dart';
import 'package:optimatech_lms/features/course_learning/presentation/views/widgets/course_leaning_content.dart';
import 'package:optimatech_lms/features/course_learning/presentation/views/widgets/custom_course_learning_appbar.dart';
import 'package:optimatech_lms/features/course_learning/presentation/views/widgets/lesson_tap_row.dart';
import 'package:optimatech_lms/features/chatbot/presentation/widgets/global_chatbot_fab.dart';
/// Route arguments for [CourseLearningView]. A bare course id is still
/// accepted for callers that just want to resume the course.
class CourseLearningArgs {
  const CourseLearningArgs({required this.courseId, this.lectureId});

  final String courseId;
  final String? lectureId;
}

class CourseLearningView extends StatefulWidget {
  const CourseLearningView({
    super.key,
    required this.courseId,
    this.initialLectureId,
  });

  static const String routeName = '/course-learning';
  final String courseId;

  /// Lecture to open on arrival. Null resumes at the first lecture.
  final String? initialLectureId;

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
        ..fetchCourseCurriculum(
          widget.courseId,
          initialLectureId: widget.initialLectureId,
        ),
      child: Scaffold(
        appBar: const CustomCourseLearningAppbar(),
        backgroundColor: Colors.black,
        body: BlocBuilder<CourseLearningCubit, CourseLearningState>(
          buildWhen: (prev, curr) =>
          prev.curriculumState != curr.curriculumState ||
              prev.curriculum != curr.curriculum,
          builder: (context, state) {
            switch (state.curriculumState) {
              case Status.initial:
              case Status.loading:
                return const _CurriculumLoadingView();

              case Status.failure:
                return _CurriculumErrorView(
                  message: state.curriculumErrorMessage,
                  onRetry: () =>
                      context.read<CourseLearningCubit>().retryFetchCurriculum(),
                );

              case Status.loaded:
                final curriculum = state.curriculum;
                if (curriculum == null || curriculum.sections.isEmpty) {
                  return _CurriculumEmptyView(
                    onRetry: () => context
                        .read<CourseLearningCubit>()
                        .retryFetchCurriculum(),
                  );
                }
                return CourseLearningContent(
                  selectedTab: _selectedTab,
                  isBookmarked: _isBookmarked,
                  onTabSelected: (tab) => setState(() => _selectedTab = tab),
                  onBookmarkTap: () =>
                      setState(() => _isBookmarked = !_isBookmarked),
                );
            }
          },
        ),
        floatingActionButton: BlocBuilder<CourseLearningCubit, CourseLearningState>(
          builder: (context, state) {
            return GlobalChatbotFab(
              courseId: widget.courseId,
              videoId: state.currentLecture?.id,
              // Optional: pass getPlaybackMs and onCitationTap if implemented here
            );
          },
        ),
      ),
    );
  }
}

class _CurriculumLoadingView extends StatelessWidget {
  const _CurriculumLoadingView();

  @override
  Widget build(BuildContext context) {
    return ColoredBox(
      color: context.theme.colorScheme.surface,
      child: Center(
        child: CircularProgressIndicator(color: context.theme.colorScheme.primary),
      ),
    );
  }
}

class _CurriculumErrorView extends StatelessWidget {
  const _CurriculumErrorView({required this.message, required this.onRetry});

  final String? message;
  final VoidCallback onRetry;

  @override
  Widget build(BuildContext context) {
    return ColoredBox(
      color: context.theme.colorScheme.surface,
      child: SafeArea(
        child: AppErrorWidget(
          message: message,
          onRetry: onRetry,
        ),
      ),
    );
  }
}

class _CurriculumEmptyView extends StatelessWidget {
  const _CurriculumEmptyView({required this.onRetry});

  final VoidCallback onRetry;

  @override
  Widget build(BuildContext context) {
    return ColoredBox(
      color: context.theme.colorScheme.surface,
      child: SafeArea(
        child: AppErrorWidget(
          icon: Icons.menu_book_outlined,
          onRetry: onRetry,
        ),
      ),
    );
  }
}