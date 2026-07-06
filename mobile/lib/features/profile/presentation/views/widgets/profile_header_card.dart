import 'package:flutter/material.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';
import 'package:gap/gap.dart';
import 'package:optimatech_lms/core/utils/extension.dart';
import 'package:optimatech_lms/features/profile/presentation/views/widgets/header/header_stat_item.dart';
import 'package:optimatech_lms/features/profile/presentation/views/widgets/header/profile_avatar.dart';
import 'package:optimatech_lms/features/profile/presentation/views/widgets/header/profile_header_info.dart';
import 'package:optimatech_lms/features/profile/presentation/views/widgets/header/profile_header_statistics.dart';

class ProfileHeaderCard extends StatelessWidget {
  const ProfileHeaderCard({super.key});

  @override
  Widget build(BuildContext context) {
    final stats = const [
      HeaderStatData(
        icon: Icons.menu_book_outlined,
        value: '8',
        titleKey: 'profile.header.stats.courses',
        // subtitleKey: 'profile.header.stats.courses_subtitle',
        // subtitleColor: AppColors.secondary,
      ),
      HeaderStatData(
        icon: Icons.access_time_rounded,
        value: '128',
        titleKey: 'profile.header.stats.hours',
        // subtitleKey: 'profile.header.stats.hours_subtitle',
        // subtitleColor: AppColors.success,
      ),
      HeaderStatData(
        icon: Icons.emoji_events_outlined,
        value: '24',
        titleKey: 'profile.header.stats.assessments',
        // subtitleKey: 'profile.header.stats.assessments_subtitle',
        // subtitleColor: AppColors.textSecondary,
      ),
      HeaderStatData(
        icon: Icons.workspace_premium_outlined,
        value: '3',
        titleKey: 'profile.header.stats.certificates',
        // subtitleKey: 'profile.header.stats.certificates_subtitle',
        // subtitleColor: AppColors.textSecondary,
      ),
    ];

    return Card(
      margin: EdgeInsets.zero,
      child: Padding(
        padding: EdgeInsets.all(16.w),
        child: Column(
          children: [
            Row(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                const ProfileAvatar(),
                Gap(16.w),
                Expanded(
                  child: Padding(
                    padding: EdgeInsets.only(top: 6.h),
                    child: const ProfileHeaderInfo(),
                  ),
                ),
              ],
            ),
            Gap(18.h),
            Divider(height: 1.h,color: context.theme.colorScheme.outline.withAlpha(80)),
            Gap(18.h),
            ProfileHeaderStatistics(stats: stats),
          ],
        ),
      ),
    );
  }
}







