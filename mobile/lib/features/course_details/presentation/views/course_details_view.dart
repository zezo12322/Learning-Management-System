import 'package:easy_localization/easy_localization.dart';
import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';
import 'package:gap/gap.dart';
import 'package:url_launcher/url_launcher.dart';

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
import 'package:optimatech_lms/features/course_details/presentation/widgets/over_view_tap/overview_tab.dart';
import 'package:optimatech_lms/features/course_learning/presentation/views/course_learning_view.dart';
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

class _CourseDetailsContentState extends State<_CourseDetailsContent>
    with WidgetsBindingObserver {
  // selected tab index 0: overview, 1: curriculum, 2: reviews, 3: resources
  int _selectedTabIndex = 1;

  // True between opening the Paymob checkout in the browser and the user
  // coming back to the app, so we know to re-check enrollment on resume.
  bool _awaitingPaymentReturn = false;

  @override
  void initState() {
    super.initState();
    WidgetsBinding.instance.addObserver(this);
  }

  @override
  void dispose() {
    WidgetsBinding.instance.removeObserver(this);
    super.dispose();
  }

  @override
  void didChangeAppLifecycleState(AppLifecycleState state) {
    // The Paymob webhook enrolls the user server-side while they pay in the
    // browser; when they come back, confirm the enrollment and unlock the course.
    if (state == AppLifecycleState.resumed && _awaitingPaymentReturn) {
      _awaitingPaymentReturn = false;
      context.read<CourseDetailsCubit>().confirmPaymentReturn(widget.course.id);
    }
  }

  Future<void> _openCheckout(String checkoutUrl) async {
    final launched = await launchUrl(
      Uri.parse(checkoutUrl),
      mode: LaunchMode.externalApplication,
    );
    if (!launched) {
      _awaitingPaymentReturn = false;
      if (!mounted) return;
      ScaffoldMessenger.of(context).showSnackBar(
        SnackBar(content: Text('payment.could_not_open'.tr())),
      );
    }
  }

  // ------------------------------------------------------------
  // open videoPlayer Stage screen from current screen
  void _openVideoPlayer() {
    Navigator.pushNamed(
      context,
      CourseLearningView.routeName,
      arguments: widget.course.id,
    );
  }


  // open the tapped lesson, not just the course
  void _onLessonTap(CourseLessonEntity lesson) {
    Navigator.pushNamed(
      context,
      CourseLearningView.routeName,
      arguments: CourseLearningArgs(
        courseId: widget.course.id,
        lectureId: lesson.id,
      ),
    );
  }

  // ------------------------------------------------------------

  @override
  Widget build(BuildContext context) {
    final colorScheme = Theme.of(context).colorScheme;

    return Scaffold(
      backgroundColor: colorScheme.surfaceDim,
      // The AI tutor is lecture-scoped and this screen has no lecture open, so
      // it lives on the lesson screen only — mounting it here sent
      // `/ai/lectures/null/chat`.
      body: BlocBuilder<CourseDetailsCubit, CourseDetailsState>(
        builder: (context, state) {
          List<CourseLessonEntity> allLessons = [];
          bool isEnrolling = false;
          String? courseDescription;
          String? courseLanguage;

          if (state is CourseDetailsLoaded) {
            allLessons = state.curriculum.allLessons;
            courseDescription = state.curriculum.description;
            courseLanguage = state.curriculum.language;
            isEnrolling = state.isEnrolling ||
                state.isPurchasing ||
                state.isConfirmingPayment;
          }

          return BlocListener<CourseDetailsCubit, CourseDetailsState>(
            listener: (context, state) {
              if (state is CourseDetailsLoaded) {
                if (state.checkoutUrl != null) {
                  final checkoutUrl = state.checkoutUrl!;
                  context.read<CourseDetailsCubit>().consumeCheckoutUrl();
                  _awaitingPaymentReturn = true;
                  _openCheckout(checkoutUrl);
                } else if (state.enrollmentSuccess) {
                  ScaffoldMessenger.of(context).showSnackBar(
                    SnackBar(
                      content: Text('course_details.enrolled_success'.tr()),
                    ),
                  );
                  Navigator.pushNamed(
                    context,
                    CourseLearningView.routeName,
                    arguments: widget.course.id,
                  );
                } else if (state.enrollmentError != null) {
                  ScaffoldMessenger.of(context).showSnackBar(
                    SnackBar(
                      content: Text(
                        'course_details.enroll_failed'
                            .tr(args: ['${state.enrollmentError}']),
                      ),
                    ),
                  );
                } else if (state.purchaseError != null) {
                  ScaffoldMessenger.of(context).showSnackBar(
                    SnackBar(content: Text('payment.start_failed'.tr())),
                  );
                } else if (state.paymentPending) {
                  ScaffoldMessenger.of(context).showSnackBar(
                    SnackBar(content: Text('payment.pending_hint'.tr())),
                  );
                }
              }
            },
            child: Column(
              children: [
                Expanded(
                  child: SingleChildScrollView(
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.stretch,
                      children: [
                        // instructor profile card, course stats card, and course content tabs
                        CourseHeroSection(
                          course: widget.course,
                          description: courseDescription,
                          onPlayTap: _openVideoPlayer,
                        ),
                        Transform.translate(
                          offset: Offset(0, -20.h),
                          child: Container(
                            decoration: BoxDecoration(
                              color: colorScheme.surfaceDim,
                              borderRadius: BorderRadius.vertical(
                                top: Radius.circular(24.r),
                              ),
                            ),
                            child: Padding(
                              padding: EdgeInsets.fromLTRB(16.w, 20.h, 16.w, 24.h),
                              child: Column(
                                crossAxisAlignment: CrossAxisAlignment.stretch,
                                children: [
                                  InstructorProfileCard(
                                    instructor: widget.course.instructors.isNotEmpty
                                        ? widget.course.instructors.first
                                        : null,
                                  ),
                                  Gap(16.h),
                                  CourseStatsCard(course: widget.course, lessons: allLessons),
                                  Gap(20.h),
                                  CourseContentTabs(
                                    selectedIndex: _selectedTabIndex,
                                    onTabSelected: (index) {
                                      setState(() => _selectedTabIndex = index);
                                    },
                                  ),
                                  Gap(20.h),
                                  _buildTabContent(
                                    state,
                                    allLessons,
                                    description: courseDescription,
                                    language: courseLanguage,
                                  ),
                                  Gap(32.h),
                                  BlocProvider<HomeCoursesCubit>(
                                    create: (context) =>
                                        // Only the popular list is rendered
                                        // here, so only that query runs.
                                        getIt<HomeCoursesCubit>()
                                          ..fetchPopularCourses(),
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
                CourseEnrollBottomBar(
                  price: widget.course.price,
                  isEnrolling: isEnrolling,
                  isPaidCourse: widget.course.price > 0,
                  onEnroll: () {
                    final cubit = context.read<CourseDetailsCubit>();
                    if (widget.course.price > 0) {
                      // Paid course → Paymob checkout; the webhook enrolls the
                      // user after a successful payment.
                      cubit.buyCourse(widget.course.id, widget.course.price);
                    } else {
                      cubit.enrollInCourse(widget.course.id);
                    }
                  },
                ),
              ],
            ),
          );
        },
      ),
    );
  }

  Widget _buildTabContent(
    CourseDetailsState state,
    List<CourseLessonEntity> allLessons, {
    String? description,
    String? language,
  }) {
    switch (_selectedTabIndex) {
      case 0:
        return OverviewTab(
          course: widget.course,
          description: description,
          language: language,
        );
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
        );
      case 2:
        return CourseReviewCard(course: widget.course);
      case 3:
        return const ResourcesContent();
      default:
        return const SizedBox.shrink();
    }
  }
}
