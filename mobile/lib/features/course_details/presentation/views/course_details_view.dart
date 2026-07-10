import 'package:easy_localization/easy_localization.dart';
import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';
import 'package:gap/gap.dart';
import 'package:optimatech_lms/core/utils/app_text_styles.dart';
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
import 'package:optimatech_lms/features/courses/domain/entities/courses_entity.dart';
import 'package:optimatech_lms/features/course_details/presentation/widgets/over_view_tap/overview_tab.dart';

class CourseDetailsView extends StatefulWidget {
  const CourseDetailsView({super.key, required this.course});

  final CourseEntity course;

  static const routeName = '/course-details';

  @override
  State<CourseDetailsView> createState() => _CourseDetailsViewState();
}

class _CourseDetailsViewState extends State<CourseDetailsView> {
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
      body: Column(
        children: [
          Expanded(
            child: SingleChildScrollView(
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.stretch,
                children: [
                  if (_showVideoPlayer)
                    VideoPlayerStage(
                      lessonTitle: widget.course.lessons.firstWhere(
                        (l) => l.id == _activeLessonId,
                        orElse: () => widget.course.lessons.isNotEmpty 
                            ? widget.course.lessons.first 
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
                            _buildTabContent(),
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
          CourseEnrollBottomBar(price: widget.course.price),
        ],
      ),
    );
  }

  Widget _buildTabContent() {
    switch (_selectedTabIndex) {
      case 0:
        return OverviewTab(course: widget.course);
      case 1:
        return _CurriculumContent(
          course: widget.course,
          onLessonTap: _onLessonTap,
          activeLessonId: _activeLessonId,
        );
      case 2:
        return const CourseReviewCard();
      case 3:
        return _ResourcesContent();
      default:
        return const SizedBox.shrink();
    }
  }
}

class _CurriculumContent extends StatelessWidget {
  const _CurriculumContent({
    required this.course,
    required this.onLessonTap,
    this.activeLessonId,
  });

  final CourseEntity course;
  final ValueChanged<CourseLessonEntity> onLessonTap;
  final String? activeLessonId;

  @override
  Widget build(BuildContext context) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.stretch,
      children: [
        CurriculumLessonList(
          lessons: course.lessons,
          onLessonTap: onLessonTap,
          activeLessonId: activeLessonId,
        ),
      ],
    );
  }
}

class _ResourcesContent extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    final colorScheme = Theme.of(context).colorScheme;
    final resources = [
      ('Course Slides', Icons.slideshow_outlined, 'PDF • 2.4 MB'),
      ('Design Checklist', Icons.checklist_rounded, 'PDF • 890 KB'),
      ('Figma Template', Icons.design_services_outlined, 'FIG • 5.1 MB'),
      ('Color Palette Guide', Icons.palette_outlined, 'PDF • 1.2 MB'),
    ];

    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Text(
          'Downloadable Resources',
          style: TextStyles.titleSmall.copyWith(
            fontSize: 18.sp,
            color: colorScheme.onSurface,
          ),
        ),
        Gap(12.h),
        ...resources.map(
          (resource) => Container(
            margin: EdgeInsets.only(bottom: 8.h),
            padding: EdgeInsets.symmetric(horizontal: 14.w, vertical: 12.h),
            decoration: BoxDecoration(
              color: colorScheme.surface,
              borderRadius: BorderRadius.circular(12.r),
              border: Border.all(color: colorScheme.outline),
            ),
            child: Row(
              children: [
                Container(
                  width: 40.w,
                  height: 40.w,
                  decoration: BoxDecoration(
                    color: colorScheme.primary.withValues(alpha: 0.1),
                    borderRadius: BorderRadius.circular(10.r),
                  ),
                  child: Icon(
                    resource.$2,
                    size: 20.sp,
                    color: colorScheme.primary,
                  ),
                ),
                Gap(12.w),
                Expanded(
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      Text(
                        resource.$1,
                        style: TextStyles.labelMedium.copyWith(
                          color: colorScheme.onSurface,
                          fontWeight: FontWeights.semiBold,
                        ),
                      ),
                      Gap(2.h),
                      Text(
                        resource.$3,
                        style: TextStyles.labelSmall.copyWith(
                          color: colorScheme.onSurfaceVariant,
                        ),
                      ),
                    ],
                  ),
                ),
                Icon(
                  Icons.download_outlined,
                  size: 22.sp,
                  color: colorScheme.primary,
                ),
              ],
            ),
          ),
        ),
      ],
    );
  }
}
