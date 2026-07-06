import 'package:flutter/material.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';
import 'package:gap/gap.dart';
import 'package:optimatech_lms/core/utils/app_text_styles.dart';
import 'package:optimatech_lms/core/widgets/app_header/notification_button.dart';
import 'package:optimatech_lms/core/widgets/app_header/app_header_avatar.dart';

class AppHeader extends StatelessWidget {
  const AppHeader({
    super.key,
    this.userName = 'Hadi Heikal',
    this.notificationCount = 3,
    this.onNotificationTap,
    this.profilePicture =
        'https://imgs.search.brave.com/Ul6Sdc0Jj7y_rOqKD9_aSjn-h-RK-mDWLtapN8-CDyg/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5nZXR0eWltYWdl/cy5jb20vaWQvNTI3/NDQwNzcvcGhvdG8v/ZmMtYmFyY2Vsb25h/cy1hcmdlbnRpbmlh/bi1tZXNzaS1jZWxl/YnJhdGVzLWhpcy1n/b2FsLWFnYWluc3Qt/YWxiYWNldGUtZHVy/aW5nLXRoZWlyLXNw/YW5pc2guanBnP3M9/NjEyeDYxMiZ3PTAm/az0yMCZjPVlTczNC/TmhJQ1o2bVh4WDll/amd2Q3Z4ZzBnOTRY/M0p1WXlSaHFfM3FF/cnM9',
  });

  final String userName;
  final String profilePicture;
  final int notificationCount;
  final VoidCallback? onNotificationTap;

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);
    final colorScheme = theme.colorScheme;

    return Row(
      children: [
        AppHeaderAvatar(profilePicture: profilePicture),
        Gap(12.w),
        Expanded(
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Text(
                'Welcome back, 👋',
                style: TextStyles.bodySmall.copyWith(
                  color: colorScheme.onSurfaceVariant,
                ),
              ),
              Text(
                '$userName!',
                style: TextStyles.titleSmall.copyWith(
                  fontSize: 22.sp,
                  fontWeight: FontWeights.bold,
                  color: colorScheme.onSurface,
                ),
              ),
            ],
          ),
        ),
        NotificationButton(
          count: notificationCount,
          onTap: onNotificationTap,
        ),
      ],
    );
  }
}
