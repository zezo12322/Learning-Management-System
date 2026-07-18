import 'package:easy_localization/easy_localization.dart';
import 'package:flutter/material.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';
import 'package:gap/gap.dart';
import 'package:optimatech_lms/features/courses/presentation/views/widgets/section_header.dart';
import 'package:firebase_auth/firebase_auth.dart';
import 'package:optimatech_lms/features/profile/presentation/views/widgets/info/profile_info_tile.dart';

class ProfileInfoSection extends StatelessWidget {
  const ProfileInfoSection({super.key});

  @override
  Widget build(BuildContext context) {
    final user = FirebaseAuth.instance.currentUser;
    final displayName = user?.displayName ?? (user?.email?.split('@').first) ?? 'Unknown';
    final email = user?.email ?? 'No email linked';
    final phone = user?.phoneNumber ?? 'No phone linked';
    
    final items = [
      ProfileInfoTileData(
        icon: Icons.person_outline_rounded,
        titleKey: 'profile.info.full_name'.tr(),
        value: displayName,
      ),
      ProfileInfoTileData(
        icon: Icons.email_outlined,
        titleKey: 'profile.info.email'.tr(),
        value: email,
      ),
      if (user?.phoneNumber != null)
        ProfileInfoTileData(
          icon: Icons.call_outlined,
          titleKey: 'profile.info.phone'.tr(),
          value: phone,
        ),
    ];

    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        SectionHeader(
          title: 'profile.sections.user_information'.tr(),
          actionLabel: 'profile.common.edit'.tr(),
          onTap: () {},
        ),
        Gap(12.h),
        Card(
          margin: EdgeInsets.zero,
          child: Column(
            children: List.generate(
              items.length,
                  (index) => ProfileInfoTile(
                data: items[index],
                showDivider: index != items.length - 1,
              ),
            ),
          ),
        ),
      ],
    );
  }
}