import 'package:flutter/material.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';
import 'package:gap/gap.dart';
import 'package:optimatech_lms/core/utils/app_colors.dart';
import 'package:optimatech_lms/features/home/presentation/widgets/assignment_card.dart';
import 'package:optimatech_lms/features/home/presentation/widgets/home_section_header.dart';

class AssignmentsSection extends StatelessWidget {
  const AssignmentsSection({super.key});

  static const _assignments = [
    _AssignmentData(
      count: 5,
      status: 'Available',
      description: 'Open for submission',
      icon: Icons.description_outlined,
      iconColor: Color(0xFF6366F1),
    ),
    _AssignmentData(
      count: 3,
      status: 'Submitted',
      description: 'Awaiting review',
      icon: Icons.send_outlined,
      iconColor: Color(0xFF0EA5E9),
    ),
    _AssignmentData(
      count: 2,
      status: 'Graded',
      description: 'View feedback',
      icon: Icons.check_circle_outline_rounded,
      iconColor: AppColors.success,
    ),
    _AssignmentData(
      count: 0,
      status: 'No Assignments',
      description: 'You are all caught up',
      icon: Icons.inbox_outlined,
      iconColor: AppColors.textSecondary,
    ),
  ];

  @override
  Widget build(BuildContext context) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        HomeSectionHeader(
          title: 'Assignments / Missions',
          onViewAllTap: () {},
        ),
        Gap(14.h),
        SizedBox(
          height: 148.h,
          child: ListView.separated(
            scrollDirection: Axis.horizontal,
            itemCount: _assignments.length,
            separatorBuilder: (_, __) => Gap(12.w),
            itemBuilder: (context, index) {
              final assignment = _assignments[index];
              return AssignmentCard(
                count: assignment.count,
                status: assignment.status,
                description: assignment.description,
                icon: assignment.icon,
                iconColor: assignment.iconColor,
                onTap: () {},
              );
            },
          ),
        ),
      ],
    );
  }
}

class _AssignmentData {
  const _AssignmentData({
    required this.count,
    required this.status,
    required this.description,
    required this.icon,
    required this.iconColor,
  });

  final int count;
  final String status;
  final String description;
  final IconData icon;
  final Color iconColor;
}
