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

class ProfileHeaderCard extends StatefulWidget {
  const ProfileHeaderCard({super.key});

  @override
  State<ProfileHeaderCard> createState() => _ProfileHeaderCardState();
}

class _ProfileHeaderCardState extends State<ProfileHeaderCard> {
  /// Held in state rather than built inside `build()`.
  ///
  /// `FutureBuilder(future: Future.wait([...]))` with the future constructed
  /// inline re-issues both Data Connect queries on **every rebuild** — and this
  /// card sits under a deliberately non-const subtree that rebuilds on locale
  /// and theme changes. Creating it once in `initState` means the profile costs
  /// two queries per visit instead of two per rebuild.
  late final Future<List<dynamic>> _stats;

  @override
  void initState() {
    super.initState();
    _stats = Future.wait([
      DefaultConnector.instance.getMyContinueLearning().execute(),
      DefaultConnector.instance.myCertificates().execute(),
    ]);
  }

  @override
  Widget build(BuildContext context) {
    return FutureBuilder(
      future: _stats,
      builder: (context, AsyncSnapshot<List<dynamic>> snapshot) {
        // A failed query is not zero courses — showing "0" reports a network
        // problem as a fact about the learner's account.
        const unknown = '—';
        String coursesCount = snapshot.connectionState == ConnectionState.done
            ? unknown
            : '';
        String certificatesCount = coursesCount;

        if (snapshot.hasData) {
          final coursesResult = snapshot.data![0] as QueryResult<GetMyContinueLearningData, void>;
          final certsResult = snapshot.data![1] as QueryResult<MyCertificatesData, void>;

          coursesCount = coursesResult.data.enrollments.length.toString();
          certificatesCount = certsResult.data.certificates.length.toString();
        }

        final stats = [
          HeaderStatData(
            icon: Icons.menu_book_outlined,
            value: coursesCount,
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
            value: certificatesCount,
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







