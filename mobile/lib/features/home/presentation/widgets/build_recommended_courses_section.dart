import 'package:easy_localization/easy_localization.dart';
import 'package:flutter/material.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';
import 'package:gap/gap.dart';
import 'package:optimatech_lms/core/utils/app_colors.dart';
import 'package:optimatech_lms/features/home/presentation/widgets/home_section_header.dart';
import 'package:optimatech_lms/features/home/presentation/widgets/recommended_course_card.dart';
import '../../domain/entities/course_entity.dart' as home;
import 'package:optimatech_lms/features/courses/domain/entities/courses_entity.dart'
    as courses;
import 'package:optimatech_lms/features/course_details/presentation/views/course_details_view.dart';

// Color palette for recommended course icon backgrounds
const _recommendedIconColors = [
  AppColors.primary,
  AppColors.success,
  AppColors.error,
  AppColors.secondary,
  AppColors.warning,
];

// Icons for recommended course cards (cycles through these)
const _recommendedIcons = [
  Icons.school_outlined,
  Icons.insights_outlined,
  Icons.favorite_outline_rounded,
  Icons.flutter_dash_rounded,
  Icons.smartphone_outlined,
];

// ----------- Recommended Courses Section Builder (horizontal scroll) ------
Widget buildRecommendedCoursesSection(
    List<home.HomeCourseEntity> recommendedCourses) {
  return Column(
    crossAxisAlignment: CrossAxisAlignment.start,
    children: [
      HomeSectionHeader(
        title: 'home.recommended_courses'.tr(),
        onViewAllTap: () {},
      ),
      Gap(14.h),
      SizedBox(
        height: 84.h,
        child: ListView.separated(
          scrollDirection: Axis.horizontal,
          physics: const BouncingScrollPhysics(),
          itemCount: recommendedCourses.length,
          separatorBuilder: (_, __) => Gap(12.w),
          itemBuilder: (context, index) {
            final course = recommendedCourses[index];
            final iconColor =
                _recommendedIconColors[index % _recommendedIconColors.length];
            return SizedBox(
              width: 280.w,
              child: RecommendedCourseCard(
                title: course.title,
                subtitle: '${(index + 1) * 4} ${'home.lessons'.tr()}',
                icon: _recommendedIcons[index % _recommendedIcons.length],
                iconColor: iconColor,
                iconBackgroundColor: iconColor.withValues(alpha: 0.1),
                onTap: () {
                  final detailedCourse = courses.CourseEntity(
                    id: course.id,
                    title: course.title,
                    price: course.price,
                    courseStatus: course.courseStatus,
                    language: course.language,
                    level: course.level,
                    thumbnail: course.image,
                    categoryName: course.categoryName,
                    tags: course.tags,
                    instructors: course.instructors
                        .map(
                          (instructor) => courses.CourseInstructorEntity(
                            name: instructor.name,
                            avatar: instructor.avatar,
                          ),
                        )
                        .toList(),
                    avgRating: course.rating,
                    ratingCount: course.ratingCount,
                  );

                  Navigator.push(
                    context,
                    MaterialPageRoute(
                      builder: (context) =>
                          CourseDetailsView(course: detailedCourse),
                    ),
                  );
                },
              ),
            );
          },
        ),
      ),
    ],
  );
}
