import 'package:easy_localization/easy_localization.dart';
import 'package:flutter/material.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';
import 'package:gap/gap.dart';
import 'package:optimatech_lms/core/utils/app_colors.dart';
import 'package:optimatech_lms/features/auth/data/models/assignment_model.dart';
import 'package:optimatech_lms/features/home/presentation/widgets/assignment_card.dart';
import 'package:optimatech_lms/features/home/presentation/widgets/home_section_header.dart';
import 'package:optimatech_lms/dataconnect_generated/generated.dart' as optimatech_dc;

class AssignmentsSection extends StatelessWidget {
  const AssignmentsSection({super.key});

  @override
  Widget build(BuildContext context) {
    return FutureBuilder(
      future: optimatech_dc.DefaultConnector.instance.mySubmissions().execute(),
      builder: (context, snapshot) {
        if (snapshot.connectionState == ConnectionState.waiting) {
          return const SizedBox.shrink();
        }

        final submissions = snapshot.data?.data.missionSubmissions ?? [];
        
        // `status` is an EnumValue<SubmissionStatus> wrapper (Known | Unknown),
        // not the bare enum — comparing it directly to SubmissionStatus.X is
        // always false, so both counters used to render 0 no matter the data.
        // Compare through stringValue, which both wrapper variants expose.
        final submittedCount = submissions
            .where(
              (s) =>
                  s.status.stringValue ==
                  optimatech_dc.SubmissionStatus.PENDING.name,
            )
            .length;
        final gradedCount = submissions
            .where(
              (s) =>
                  s.status.stringValue ==
                  optimatech_dc.SubmissionStatus.GRADED.name,
            )
            .length;
        
        final assignments = [
          AssignmentModel(
            count: 0, // Available not implemented in backend yet
            status: 'home.assignments.available'.tr(),
            description: 'home.assignments.available_desc'.tr(),
            icon: Icons.description_outlined,
            iconColor: Theme.of(context).colorScheme.primary,
          ),
          AssignmentModel(
            count: submittedCount,
            status: 'home.assignments.submitted'.tr(),
            description: 'home.assignments.submitted_desc'.tr(),
            icon: Icons.send_outlined,
            iconColor: Theme.of(context).colorScheme.secondary,
          ),
          AssignmentModel(
            count: gradedCount,
            status: 'home.assignments.graded'.tr(),
            description: 'home.assignments.graded_desc'.tr(),
            icon: Icons.check_circle_outline_rounded,
            iconColor: AppColors.success,
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
      },
    );
  }
}
