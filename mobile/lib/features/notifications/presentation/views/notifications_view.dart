import 'package:easy_localization/easy_localization.dart';
import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';
import 'package:gap/gap.dart';
import 'package:optimatech_lms/core/services/get_it_service.dart';
import 'package:optimatech_lms/core/utils/extension.dart';
import 'package:optimatech_lms/features/notifications/presentation/manager/notifications_cubit.dart';
import 'package:optimatech_lms/features/notifications/presentation/manager/notifications_state.dart';

class NotificationsView extends StatelessWidget {
  const NotificationsView({super.key});

  static const String routeName = '/notifications';

  @override
  Widget build(BuildContext context) {
    return BlocProvider(
      create: (_) => getIt<NotificationsCubit>()..load(),
      child: Scaffold(
        appBar: AppBar(title: Text('notifications.title'.tr())),
        body: SafeArea(
          child: BlocBuilder<NotificationsCubit, NotificationsState>(
            builder: (context, state) {
              if (state is NotificationsLoading) {
                return const Center(child: CircularProgressIndicator());
              }
              if (state is NotificationsLoaded && state.items.isNotEmpty) {
                return ListView.separated(
                  padding: EdgeInsets.all(16.w),
                  itemCount: state.items.length,
                  separatorBuilder: (_, __) => Gap(10.h),
                  itemBuilder: (context, i) {
                    final n = state.items[i];
                    return ListTile(
                      leading: Icon(
                        n.isRead ? Icons.notifications_none : Icons.notifications_active,
                        color: context.theme.colorScheme.primary,
                      ),
                      title: Text(n.title),
                      subtitle: Text(n.body),
                    );
                  },
                );
              }
              // Empty (default shell state) or error both show the empty view.
              return _EmptyState();
            },
          ),
        ),
      ),
    );
  }
}

class _EmptyState extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    final scheme = context.theme.colorScheme;
    return Center(
      child: Padding(
        padding: EdgeInsets.all(28.w),
        child: Column(
          mainAxisSize: MainAxisSize.min,
          children: [
            Icon(Icons.notifications_off_outlined, size: 56.r, color: scheme.onSurfaceVariant),
            Gap(16.h),
            Text(
              'notifications.empty'.tr(),
              textAlign: TextAlign.center,
              style: context.textTheme.titleMedium?.copyWith(fontWeight: FontWeight.bold),
            ),
            Gap(8.h),
            Text(
              'notifications.empty_hint'.tr(),
              textAlign: TextAlign.center,
              style: context.textTheme.bodyMedium?.copyWith(color: scheme.onSurfaceVariant),
            ),
          ],
        ),
      ),
    );
  }
}
