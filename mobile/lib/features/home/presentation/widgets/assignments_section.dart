import 'package:easy_localization/easy_localization.dart';
import 'package:flutter/material.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';
import 'package:gap/gap.dart';
import 'package:optimatech_lms/core/utils/app_colors.dart';
import 'package:optimatech_lms/features/auth/data/models/assignment_model.dart';
import 'package:optimatech_lms/features/home/presentation/widgets/assignment_card.dart';
import 'package:optimatech_lms/features/home/presentation/widgets/home_section_header.dart';

class AssignmentsSection extends StatelessWidget {
  const AssignmentsSection({super.key});

  @override
  Widget build(BuildContext context) {
    // TODO: List of assignments (hardcoded for now, can be replaced with dynamic data later)
    final assignments = [
      AssignmentModel(
        count: 5,
        status: 'home.assignments.available'.tr(),
        description: 'home.assignments.available_desc'.tr(),
        icon: Icons.description_outlined,
        iconColor: Theme.of(context).colorScheme.primary,
      ),
      AssignmentModel(
        count: 3,
        status: 'home.assignments.available'.tr(),
        description: 'home.assignments.available_desc'.tr(),
        icon: Icons.send_outlined,
        iconColor: Theme.of(context).colorScheme.secondary,
      ),
      AssignmentModel(
        count: 2,
        status: 'home.assignments.graded'.tr(),
        description: 'home.assignments.graded_desc'.tr(),
        icon: Icons.check_circle_outline_rounded,
        iconColor: AppColors.success,
      ),
      AssignmentModel(
        count: 0,
        status: 'home.assignments.empty'.tr(),
        description: 'home.assignments.empty_desc'.tr(),
        icon: Icons.inbox_outlined,
        iconColor: Theme.of(context).colorScheme.onSurfaceVariant,
      ),
    ];

    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        // ------------- Assignments / Missions Header -------------
        HomeSectionHeader(
          title: 'home.assignments_missions'.tr(),
          onViewAllTap: () {},
        ),
        Gap(14.h),
        // ------------- Assignments / Missions Cards -------------
        SizedBox(
          height: 168.h,
          child: ListView.separated(
            scrollDirection: Axis.horizontal,
            itemCount: assignments.length,
            separatorBuilder: (_, __) => Gap(12.w),
            itemBuilder: (context, index) {
              final assignment = assignments[index];
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
