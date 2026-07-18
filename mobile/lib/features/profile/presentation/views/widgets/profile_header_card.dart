import 'package:flutter/material.dart';
import 'package:firebase_data_connect/firebase_data_connect.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';
import 'package:gap/gap.dart';
import 'package:optimatech_lms/core/utils/extension.dart';
import 'package:optimatech_lms/features/profile/presentation/views/widgets/header/header_stat_item.dart';
import 'package:optimatech_lms/features/profile/presentation/views/widgets/header/profile_avatar.dart';
import 'package:optimatech_lms/features/profile/presentation/views/widgets/header/profile_header_info.dart';
import 'package:optimatech_lms/features/profile/presentation/views/widgets/header/profile_header_statistics.dart';

import 'package:optimatech_lms/dataconnect_generated/generated.dart';

class ProfileHeaderCard extends StatelessWidget {
  const ProfileHeaderCard({super.key});

  @override
  Widget build(BuildContext context) {
    return FutureBuilder(
      future: Future.wait([
        DefaultConnector.instance.getMyContinueLearning().execute(),
        DefaultConnector.instance.myCertificates().execute(),
      ]),
      builder: (context, AsyncSnapshot<List<dynamic>> snapshot) {
        int coursesCount = 0;
        int certificatesCount = 0;

        if (snapshot.hasData) {
          final coursesResult = snapshot.data![0] as QueryResult<GetMyContinueLearningData, void>;
          final certsResult = snapshot.data![1] as QueryResult<MyCertificatesData, void>;
          
          coursesCount = coursesResult.data.enrollments.length;
          certificatesCount = certsResult.data.certificates.length;
        }

        final stats = [
          HeaderStatData(
            icon: Icons.menu_book_outlined,
            value: coursesCount.toString(),
            titleKey: 'profile.header.stats.courses',
          ),
          HeaderStatData(
            icon: Icons.access_time_rounded,
            value: '0', // Hours tracking requires deeper backend metrics
            titleKey: 'profile.header.stats.hours',
          ),
          HeaderStatData(
            icon: Icons.emoji_events_outlined,
            value: '0', // Assessments not yet implemented fully in MVP
            titleKey: 'profile.header.stats.assessments',
          ),
          HeaderStatData(
            icon: Icons.workspace_premium_outlined,
            value: certificatesCount.toString(),
            titleKey: 'profile.header.stats.certificates',
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
      },
    );
  }
}







