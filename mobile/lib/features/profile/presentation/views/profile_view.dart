import 'package:easy_localization/easy_localization.dart';
import 'package:flutter/material.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';
import 'package:gap/gap.dart';
import 'package:optimatech_lms/core/utils/extension.dart';
import 'package:optimatech_lms/core/widgets/custom_app_bar.dart';
import 'package:optimatech_lms/features/profile/presentation/views/widgets/profile_certificates_section.dart';
import 'package:optimatech_lms/features/profile/presentation/views/widgets/profile_header_card.dart';
import 'package:optimatech_lms/features/profile/presentation/views/widgets/profile_info_section.dart';
import 'package:optimatech_lms/features/profile/presentation/views/widgets/profile_settings_section.dart';

class ProfileView extends StatelessWidget {
  const ProfileView({super.key});

  static const String routeName = '/profile';

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: CustomAppBar(
        showBackButton: false,
        titleWidget: Text(
          'profile.title'.tr(),
          style: context.textTheme.titleMedium,
        ),
        actions: [
          Padding(
            padding: const EdgeInsetsDirectional.only(end: 12),
            child: IconButton(
                onPressed: (){},
                icon: Icon(
                  Icons.settings_outlined,
                  size: 26.sp,
                  color: context.theme.colorScheme.primary,
                ),
            ),
          ),
        ],
      ),
      body: SafeArea(
        child: SingleChildScrollView(
          padding: EdgeInsets.symmetric(horizontal: 16.w, vertical: 8.h),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              const ProfileHeaderCard(),
              Gap(24.h),
              const ProfileInfoSection(),
              // Gap(24.h),
              // const ProfileStatisticsSection(),
              Gap(24.h),
              const ProfileCertificatesSection(),
              // Gap(24.h),
              // const ProfileCompletedCoursesSection(),
              Gap(24.h),
              const ProfileSettingsSection(),
              Gap(24.h),
            ],
          ),
        ),
      ),
    );
  }
}