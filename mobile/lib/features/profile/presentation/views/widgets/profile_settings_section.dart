import 'package:easy_localization/easy_localization.dart';
import 'package:firebase_auth/firebase_auth.dart';
import 'package:flutter/material.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';
import 'package:gap/gap.dart';
import 'package:optimatech_lms/core/helper_function/build_change_language_dialog.dart';
import 'package:optimatech_lms/core/helper_function/build_change_theme_dialog.dart';
import 'package:optimatech_lms/core/helper_function/build_delete_account_dialog.dart';
import 'package:optimatech_lms/core/services/session_cleanup_service.dart';
import 'package:optimatech_lms/core/utils/extension.dart';
import 'package:optimatech_lms/core/widgets/modern_dialog.dart';
import 'package:optimatech_lms/features/auth/presentation/views/log_in_view.dart';
import 'package:optimatech_lms/features/profile/presentation/views/widgets/setting/profile_setting_tile.dart';
import '../../../../../core/services/secure_storage_service.dart';

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
        Gap(12.h),
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
                  icon: Icons.language_outlined,
                  titleKey: 'profile.settings.language',
                ),
                onTap: () {
                  buildChangeLanguageDialog(context);
                },
              ),
              ProfileSettingTile(
                data: const ProfileSettingTileData(
                  icon:  Icons.color_lens_outlined,
                  titleKey: 'profile.settings.change_Theme',
                ),
                onTap: () {
                  buildChangeThemeDialog(context);
                },
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
                onTap: () {
                  ModernDialog.showConfirmation(
                    context: context,
                    title: 'profile.settings.logout_dialog'.tr(),
                    message: 'profile.settings.log_out_confirmation'.tr(),
                    onCancel: () => Navigator.pop(context),
                    onConfirm: () async{
                      // Clears secure storage, the cached AI transcripts, the
                      // remember-me flag and the bearer token on the shared Dio
                      // client — see `clearSessionData`.
                      await clearSessionData();
                      await FirebaseAuth.instance.signOut();
                      if(!context.mounted) return;
                      Navigator.pushNamedAndRemoveUntil(context, LogInView.routeName, (route) => false,);
                    },
                  );
                },
              ),
              ProfileSettingTile(
                data: const ProfileSettingTileData(
                  icon: Icons.delete_forever_outlined,
                  titleKey: 'profile.settings.delete_account',
                  isDestructive: true,
                ),
                showDivider: false,
                onTap: () => buildDeleteAccountDialog(context),
              ),
            ],
          ),
        ),
      ],
    );
  }
}