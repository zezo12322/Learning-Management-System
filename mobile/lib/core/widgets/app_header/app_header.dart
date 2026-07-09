import 'package:easy_localization/easy_localization.dart';
import 'package:firebase_auth/firebase_auth.dart';
import 'package:flutter/material.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';
import 'package:gap/gap.dart';
import 'package:optimatech_lms/core/utils/app_text_styles.dart';
import 'package:optimatech_lms/core/widgets/app_header/app_header_avatar.dart';
import 'package:optimatech_lms/core/widgets/app_header/notification_button.dart';

class AppHeader extends StatelessWidget {
  const AppHeader({
    super.key,
    required this.onNotificationTap,
    this.notificationCount = 0,
    this.onProfileTap,
  });

  final VoidCallback onNotificationTap;
  final void Function()? onProfileTap;
  final int notificationCount;

  @override
  Widget build(BuildContext context) {
    final colorScheme = Theme.of(context).colorScheme;
    final currentUser = FirebaseAuth.instance.currentUser;
    final displayName = currentUser?.displayName ??
        (currentUser?.email?.split('@').first) ??
        'Student';
    final profilePicture = currentUser?.photoURL;

    return Row(
      children: [
        GestureDetector(
          onTap: onProfileTap,
          child: AppHeaderAvatar(profilePicture: profilePicture),
        ),
        Gap(12.w),
        Expanded(
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Text(
                '${'home.welcome'.tr()}, 👋',
                style: TextStyles.bodySmall.copyWith(
                  color: colorScheme.onSurfaceVariant,
                ),
              ),
              Text(
                '$displayName!',
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
