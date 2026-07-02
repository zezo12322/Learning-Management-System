import 'package:flutter/material.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';
import 'package:gap/gap.dart';
import 'package:optimatech_lms/core/utils/app_colors.dart';
import 'package:optimatech_lms/features/home/data/models/popular_course_model.dart';
import 'package:optimatech_lms/features/home/presentation/widgets/home_section_header.dart';
import 'package:optimatech_lms/features/home/presentation/widgets/popular_course_card.dart';

class PopularCoursesSection extends StatelessWidget {
  const PopularCoursesSection({super.key});

  // List of popular courses (hardcoded for now, can be replaced with dynamic data later)
  static const popularCoursesList = [
    PopularCourseModel(
      title: 'UI/UX Design Principles',
      studentCount: '18.2K students',
      rating: 4.8,
      headerColor: AppColors.primary,
      icon: Icons.palette_outlined,
      image:
          'https://imgs.search.brave.com/jdaEQvIUivj3HsiPF_nHRHy6ioqFMiQZc9IrNBZUTzk/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9wbmcu/cG5ndHJlZS5jb20v/cG5nLXZlY3Rvci8y/MDIwMDMxMi9vdXJt/aWQvcG5ndHJlZS1t/b2Rlcm4tZmxhdC1k/ZXNpZ24tY29uY2Vw/dC1vZi11aS11eC1k/ZXNpZ24td2l0aC1j/aGFyYWN0ZXJzLWFu/ZC1wbmctaW1hZ2Vf/MjE1Nzg5MC5qcGc',
    ),
    PopularCourseModel(
      title: 'Design Thinking Workshop',
      studentCount: '12.5K students',
      rating: 4.7,
      headerColor: AppColors.secondary,
      icon: Icons.lightbulb_outline_rounded,
      image:
          'https://imgs.search.brave.com/MNAHvb_wDKtJzLxhjRstVg_ws4kepFLtPcpm_sVF9EM/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9zdDUu/ZGVwb3NpdHBob3Rv/cy5jb20vMTc0NTA5/OC83NDM1NC9pLzQ1/MC9kZXBvc2l0cGhv/dG9zXzc0MzU0NDQz/Ni1zdG9jay1waG90/by1kZXNpZ24tdGhp/bmtpbmctcHJvY2Vz/cy1mbG93LWNoYXJ0/LmpwZw',
    ),
    PopularCourseModel(
      title: 'Web Development Basics',
      studentCount: '24.1K students',
      rating: 4.9,
      headerColor: AppColors.warning,
      icon: Icons.code_rounded,
      image:
          'https://imgs.search.brave.com/d3Txm-zww4wdxzj18QBLKcdiVtoSA5p2ai367Telqfs/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly90aHVt/YnMuZHJlYW1zdGlt/ZS5jb20vYi93ZWIt/ZGV2ZWxvcG1lbnQt/d29yZC1jbG91ZC1j/b25jZXB0LWdyZXkt/YmFja2dyb3VuZC04/ODY1MDYyNC5qcGc',
    ),
    PopularCourseModel(
      title: 'Data Visualization',
      studentCount: '9.8K students',
      rating: 4.6,
      headerColor: AppColors.darkPrimary,
      icon: Icons.bar_chart_rounded,
      image:
          'https://imgs.search.brave.com/wxMZkiAPHbq3-EhWnjznfOWTopxlP2XAKAbJZFzwq4w/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9pbWcu/ZnJlZXBpay5jb20v/cHJlbWl1bS1waG90/by9mdXR1cmlzdGlj/LWRhdGEtdmlzdWFs/aXphdGlvbi13aXRo/LWNvbG9yZnVsLWNo/YXJ0cy1ncmFwaHNf/MTMzNTI2NC0xMTM2/NC5qcGc_c2VtdD1h/aXNfaHlicmlkJnc9/NzQwJnE9ODA',
    ),
  ];

  @override
  Widget build(BuildContext context) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        // ------------- Popular Courses Header -------------
        HomeSectionHeader(
          title: 'Popular Courses',
          onViewAllTap: () {},
        ),
        Gap(14.h),
        // ------------- Popular Courses List -------------
        SizedBox(
          height: 210.h,
          child: ListView.separated(
            scrollDirection: Axis.horizontal,
            itemCount: popularCoursesList.length,
            separatorBuilder: (_, __) => Gap(12.w),
            itemBuilder: (context, index) {
              final course = popularCoursesList[index];
              return PopularCourseCard(
                title: course.title,
                studentCount: course.studentCount,
                rating: course.rating,
                headerColor: course.headerColor,
                icon: course.icon,
                image: course.image,
                onTap: () {},
              );
            },
          ),
        ),
      ],
    );
  }
}
