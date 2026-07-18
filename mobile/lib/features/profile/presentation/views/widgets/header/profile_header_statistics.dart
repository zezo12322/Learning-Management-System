import 'package:flutter/material.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';
import 'package:optimatech_lms/core/utils/extension.dart';
import 'package:optimatech_lms/features/profile/presentation/views/widgets/header/header_stat_item.dart';

class ProfileHeaderStatistics extends StatelessWidget {
  const ProfileHeaderStatistics({
    super.key,
    required this.stats,
  });

  final List<HeaderStatData> stats;

  @override
  Widget build(BuildContext context) {
    return IntrinsicHeight(
      child: Row(
        children: List.generate(
          stats.length,
              (index) => Expanded(
            child: Row(
              children: [
                Expanded(
                  child: HeaderStatItem(data: stats[index]),
                ),
                if (index != stats.length - 1)
                  VerticalDivider(
                    width: 16.w,
                    thickness: 1.w,
                    color: context.theme.colorScheme.outline.withAlpha(90),
                  ),
              ],
            ),
          ),
        ),
      ),
    );
  }
}
