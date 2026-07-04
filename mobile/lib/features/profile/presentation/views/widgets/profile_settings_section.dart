import 'package:easy_localization/easy_localization.dart';
import 'package:flutter/material.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';
import 'package:optimatech_lms/core/utils/extension.dart';
import 'package:optimatech_lms/features/profile/presentation/views/widgets/setting/profile_setting_tile.dart';

class ProfileSettingsSection extends StatelessWidget {
  const ProfileSettingsSection({super.key});

  @override
  Widget build(BuildContext context) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Text(
          'profile.sections.settings'.tr(),
          style: context.textTheme.titleSmall?.copyWith(
            fontSize: 18.sp,
            fontWeight: FontWeight.w700,
          ),
        ),
        SizedBox(height: 12.h),
        Card(
          margin: EdgeInsets.zero,
          child: Column(
            children: [
              ProfileSettingTile(
                data: const ProfileSettingTileData(
                  icon: Icons.settings_outlined,
                  titleKey: 'profile.settings.account',
                ),
                onTap: () {},
              ),
              ProfileSettingTile(
                data: const ProfileSettingTileData(
                  icon: Icons.notifications_none_rounded,
                  titleKey: 'profile.settings.notifications',
                ),
                onTap: () {},
              ),
              ProfileSettingTile(
                data: const ProfileSettingTileData(
                  icon: Icons.shield_outlined,
                  titleKey: 'profile.settings.privacy',
                ),
                onTap: () {},
              ),
              ProfileSettingTile(
                data: const ProfileSettingTileData(
                  icon: Icons.help_outline_rounded,
                  titleKey: 'profile.settings.help',
                ),
                onTap: () {},
              ),
              ProfileSettingTile(
                data: const ProfileSettingTileData(
                  icon: Icons.logout_rounded,
                  titleKey: 'profile.settings.logout',
                  isDestructive: true,
                ),
                onTap: () {},
              ),
            ],
          ),
        ),
      ],
    );
  }
}