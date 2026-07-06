import 'package:flutter/material.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';
import 'package:gap/gap.dart';
import 'package:optimatech_lms/core/utils/app_colors.dart';
import 'package:optimatech_lms/features/auth/data/models/assignment_model.dart';
import 'package:optimatech_lms/features/home/presentation/widgets/assignment_card.dart';
import 'package:optimatech_lms/features/home/presentation/widgets/home_section_header.dart';

class AssignmentsSection extends StatelessWidget {
  const AssignmentsSection({super.key});
  // TODO: List of assignments (hardcoded for now, can be replaced with dynamic data later)
  static const _assignments = [
    AssignmentModel(
      count: 5,
      status: 'Available',
      description: 'Open for submission',
      icon: Icons.description_outlined,
      iconColor: AppColors.primary,
    ),
    AssignmentModel(
      count: 3,
      status: 'Submitted',
      description: 'Awaiting review',
      icon: Icons.send_outlined,
      iconColor: AppColors.secondary,
    ),
    AssignmentModel(
      count: 2,
      status: 'Graded',
      description: 'View feedback',
      icon: Icons.check_circle_outline_rounded,
      iconColor: AppColors.success,
    ),
    AssignmentModel(
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
        // ------------- Assignments / Missions Header -------------
        HomeSectionHeader(
          title: 'Assignments / Missions',
          onViewAllTap: () {},
        ),
        Gap(14.h),
        // ------------- Assignments / Missions Cards -------------
        SizedBox(
          height: 168.h,
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
