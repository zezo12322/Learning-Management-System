import 'package:easy_localization/easy_localization.dart';
import 'package:flutter/material.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';
import 'package:gap/gap.dart';
import 'package:optimatech_lms/core/utils/app_colors.dart';
import 'package:optimatech_lms/features/home/data/models/popular_course_model.dart';
import 'package:optimatech_lms/features/home/presentation/widgets/home_section_header.dart';
import 'package:optimatech_lms/features/home/presentation/widgets/popular_course_card.dart';
import 'package:optimatech_lms/features/courses/domain/entities/courses_entity.dart'
    as courses;
import 'package:optimatech_lms/features/course_details/presentation/views/course_details_view.dart';

// Color palette for popular course card headers (cycles through these)
const _popularCardColors = [
  AppColors.primary,
  AppColors.secondary,
  AppColors.warning,
  AppColors.darkPrimary,
];

// Icon palette for popular course card headers (cycles through these)
const _popularCardIcons = [
  Icons.palette_outlined,
  Icons.lightbulb_outline_rounded,
  Icons.code_rounded,
  Icons.bar_chart_rounded,
];

// ------------- Popular Courses Section Builder (horizontal scroll) --------
Widget buildPopularCoursesSection(List<PopularCourseModel> popularCourses) {
  return Column(
    crossAxisAlignment: CrossAxisAlignment.start,
    children: [
      HomeSectionHeader(
        title: 'home.popular_courses'.tr(),
        onViewAllTap: () {},
      ),
      Gap(14.h),
      SizedBox(
        height: 210.h,
        child: ListView.separated(
          scrollDirection: Axis.horizontal,
          physics: const BouncingScrollPhysics(),
          itemCount: popularCourses.length,
          separatorBuilder: (_, __) => Gap(12.w),
          itemBuilder: (context, index) {
            final course = popularCourses[index];
            return PopularCourseCard(
              title: course.title,
              studentCount: '0 ${'home.students'.tr()}',
              rating: course.rating,
              headerColor:
                  _popularCardColors[index % _popularCardColors.length],
              icon: _popularCardIcons[index % _popularCardIcons.length],
              image: course.image,
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
                      .map((instructor) => courses.CourseInstructorEntity(
                            name: instructor.name,
                            avatar: instructor.avatar,
                          ))
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
            );
          },
        ),
      ),
    ],
  );
}
