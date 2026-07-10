import 'package:easy_localization/easy_localization.dart';
import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';
import 'package:gap/gap.dart';

import 'package:optimatech_lms/features/courses/domain/entities/courses_entity.dart';
import 'package:optimatech_lms/features/course_details/presentation/widgets/course_content_tabs.dart';
import 'package:optimatech_lms/features/course_details/presentation/widgets/course_enroll_bottom_bar.dart';
import 'package:optimatech_lms/features/course_details/presentation/widgets/course_hero_section.dart';
import 'package:optimatech_lms/features/course_details/presentation/widgets/course_review_card.dart';
import 'package:optimatech_lms/features/course_details/presentation/widgets/course_stats_card.dart';
import 'package:optimatech_lms/features/course_details/presentation/widgets/curriculum_lesson_list.dart';
import 'package:optimatech_lms/features/course_details/presentation/widgets/instructor_profile_card.dart';
import 'package:optimatech_lms/features/home/presentation/manager/home_courses_cubit/home_course_state.dart';
import 'package:optimatech_lms/features/home/presentation/manager/home_courses_cubit/home_courses_cubit.dart';
import 'package:optimatech_lms/features/home/presentation/widgets/build_popular_courses_section.dart';
import 'package:optimatech_lms/core/services/get_it_service.dart';
import 'package:optimatech_lms/features/course_details/presentation/widgets/video_player_stage.dart';
import 'package:optimatech_lms/features/course_details/presentation/widgets/over_view_tap/overview_tab.dart';
import 'package:optimatech_lms/features/course_details/domain/entities/course_curriculum_entity.dart';
import 'package:optimatech_lms/features/course_details/presentation/manager/course_details_cubit.dart';
import 'package:optimatech_lms/features/course_details/presentation/manager/course_details_state.dart';
import 'package:optimatech_lms/features/course_details/presentation/widgets/resources_content.dart';
import 'package:optimatech_lms/core/widgets/app_error_widget.dart';

class CourseDetailsView extends StatelessWidget {
  const CourseDetailsView({super.key, required this.course});

  final CourseEntity course;

  static const routeName = '/course-details';

  @override
  Widget build(BuildContext context) {
    return BlocProvider<CourseDetailsCubit>(
      create: (context) => getIt<CourseDetailsCubit>()..loadCurriculum(course.id),
      child: _CourseDetailsContent(course: course),
    );
  }
}

class _CourseDetailsContent extends StatefulWidget {
  const _CourseDetailsContent({required this.course});

  final CourseEntity course;

  @override
  State<_CourseDetailsContent> createState() => _CourseDetailsContentState();
}

class _CourseDetailsContentState extends State<_CourseDetailsContent> {
  // show video player stage screen
  bool _showVideoPlayer = false;
  // selected tab index 0: overview, 1: curriculum, 2: reviews, 3: resources
  int _selectedTabIndex = 1;
  String? _activeLessonId;

  // ------------------------------------------------------------
  // open videoPlayer Stage screen from current screen
  void _openVideoPlayer() {
    setState(() => _showVideoPlayer = true);
    SystemChrome.setSystemUIOverlayStyle(
      const SystemUiOverlayStyle(
        statusBarBrightness: Brightness.dark,
        statusBarIconBrightness: Brightness.light,
      ),
    );
  }

  // close videoPlayer Stage screen and return to current screen
  void _closeVideoPlayer() {
    setState(() => _showVideoPlayer = false);
    SystemChrome.setSystemUIOverlayStyle(
      SystemUiOverlayStyle(
        statusBarBrightness: Theme.of(context).brightness == Brightness.dark
            ? Brightness.light
            : Brightness.dark,
        statusBarIconBrightness: Theme.of(context).brightness == Brightness.dark
            ? Brightness.light
            : Brightness.dark,
      ),
    );
  }

  // open videoPlayer Stage screen from current screen
  void _onLessonTap(CourseLessonEntity lesson) {
    if (lesson.status == LessonStatus.active ||
        lesson.status == LessonStatus.completed) {
      setState(() => _activeLessonId = lesson.id);
      _openVideoPlayer();
    }
  }

  // ------------------------------------------------------------

  @override
  Widget build(BuildContext context) {
    final colorScheme = Theme.of(context).colorScheme;

    return Scaffold(
      backgroundColor: colorScheme.surfaceDim,
      body: BlocBuilder<CourseDetailsCubit, CourseDetailsState>(
        builder: (context, state) {
          List<CourseLessonEntity> allLessons = [];
          if (state is CourseDetailsLoaded) {
            allLessons = state.curriculum.sections.expand((s) => s.lessons).toList();
          }

          return Column(
            children: [
              Expanded(
                child: SingleChildScrollView(
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.stretch,
                    children: [
                      if (_showVideoPlayer)
                        VideoPlayerStage(
                          lessonTitle: allLessons.firstWhere(
                            (l) => l.id == _activeLessonId,
                            orElse: () => allLessons.isNotEmpty 
                                ? allLessons.first 
                                : CourseLessonEntity(id: '', number: 0, title: widget.course.title, duration: '', status: LessonStatus.completed),
                          ).title,
                          onBack: _closeVideoPlayer,
                        )
                      else
                        // instructor profile card, course stats card, and course content tabs
                        CourseHeroSection(
                          course: widget.course,
                          onPlayTap: _openVideoPlayer,
                        ),
                      Transform.translate(
                        offset: Offset(0, _showVideoPlayer ? 0 : -20.h),
                        child: Container(
                          decoration: BoxDecoration(
                            color: colorScheme.surfaceDim,
                            borderRadius: BorderRadius.vertical(
                              top: Radius.circular(_showVideoPlayer ? 0 : 24.r),
                            ),
                          ),
                          child: Padding(
                            padding: EdgeInsets.fromLTRB(16.w, 20.h, 16.w, 24.h),
                            child: Column(
                              crossAxisAlignment: CrossAxisAlignment.stretch,
                              children: [
                                if (!_showVideoPlayer) ...[
                                  InstructorProfileCard(
                                    instructor: widget.course.instructors.isNotEmpty
                                        ? widget.course.instructors.first
                                        : null,
                                  ),
                                  Gap(16.h),
                                  CourseStatsCard(course: widget.course),
                                  Gap(20.h),
                                ],
                                CourseContentTabs(
                                  selectedIndex: _selectedTabIndex,
                                  onTabSelected: (index) {
                                    setState(() => _selectedTabIndex = index);
                                  },
                                ),
                                Gap(20.h),
                                _buildTabContent(state, allLessons),
                                Gap(32.h),
                                BlocProvider<HomeCoursesCubit>(
                                  create: (context) =>
                                      getIt<HomeCoursesCubit>()..fetchHomeCourses(),
                                  child: BlocBuilder<HomeCoursesCubit, HomeCourseState>(
                                    builder: (context, state) {
                                      return state.maybeWhen(
                                        loaded: (_, popularCourses, __) {
                                          if (popularCourses.isEmpty) return const SizedBox.shrink();
                                          return buildPopularCoursesSection(
                                            popularCourses,
                                            customTitle: 'course_details.you_might_also_like'.tr(),
                                            shrinkWrap: true,
                                            physics: const NeverScrollableScrollPhysics(),
                                          );
                                        },
                                        orElse: () => const SizedBox.shrink(),
                                      );
                                    },
                                  ),
                                ),
                              ],
                            ),
                          ),
                        ),
                      ),
                    ],
                  ),
                ),
              ),
              CourseEnrollBottomBar(
                price: widget.course.price,
                onEnroll: () {},
              ),
            ],
          );
        },
      ),
    );
  }

  Widget _buildTabContent(CourseDetailsState state, List<CourseLessonEntity> allLessons) {
    switch (_selectedTabIndex) {
      case 0:
        return OverviewTab(course: widget.course);
      case 1:
        if (state is CourseDetailsLoading || state is CourseDetailsInitial) {
          return const Center(child: CircularProgressIndicator());
        }
        if (state is CourseDetailsError) {
          return AppErrorWidget(
            message: state.message,
            onRetry: () => context.read<CourseDetailsCubit>().loadCurriculum(widget.course.id),
          );
        }
        return CurriculumLessonList(
          lessons: allLessons,
          onLessonTap: _onLessonTap,
          activeLessonId: _activeLessonId,
        );
      case 2:
        return const CourseReviewCard();
      case 3:
        return const ResourcesContent();
      default:
        return const SizedBox.shrink();
    }
  }
}
