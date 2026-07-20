import 'package:easy_localization/easy_localization.dart';
import 'package:flutter/material.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';
import 'package:gap/gap.dart';
import 'package:optimatech_lms/core/utils/extension.dart';
import 'package:optimatech_lms/core/widgets/app_header/notification_button.dart';
import 'package:optimatech_lms/features/notifications/presentation/views/notifications_view.dart';
import 'package:optimatech_lms/core/widgets/custom_app_bar.dart';

class WishlistView extends StatefulWidget {
  const WishlistView({super.key});

  @override
  State<WishlistView> createState() => _WishlistViewState();
}

class _WishlistViewState extends State<WishlistView> {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: CustomAppBar(
        titleWidget: Text(
          'wishlist.title'.tr(),
          style: context.textTheme.titleMedium?.copyWith(
            color: context.theme.colorScheme.onSurface,
          ),
        ),
        showBackButton: false,
        actions: [
          NotificationButton(
            count: 0,
            onTap: () => Navigator.pushNamed(context, NotificationsView.routeName),
          ),
          Gap(16.w),
        ],
      ),
      body: Center(
        child: Text('wishlist.empty'.tr()),
      ),
    );
  }
}
