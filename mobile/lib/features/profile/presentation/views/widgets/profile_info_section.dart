import 'package:easy_localization/easy_localization.dart';
import 'package:flutter/material.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';
import 'package:gap/gap.dart';
import 'package:optimatech_lms/features/courses/presentation/views/widgets/section_header.dart';
import 'package:optimatech_lms/features/profile/presentation/views/widgets/info/profile_info_tile.dart';

class ProfileInfoSection extends StatelessWidget {
  const ProfileInfoSection({super.key});

  @override
  Widget build(BuildContext context) {
    final items = [
      ProfileInfoTileData(
        icon: Icons.person_outline_rounded,
        titleKey: 'profile.info.full_name'.tr(),
        value: 'Sarah Johnson',
      ),
      ProfileInfoTileData(
        icon: Icons.email_outlined,
        titleKey: 'profile.info.email'.tr(),
        value: 'sarah.johnson@email.com',
      ),
      ProfileInfoTileData(
        icon: Icons.call_outlined,
        titleKey: 'profile.info.phone'.tr(),
        value: '+20 101 234 5678',
      ),
      ProfileInfoTileData(
        icon: Icons.location_on_outlined,
        titleKey: 'profile.info.location'.tr(),
        value: 'Cairo, Egypt',
      ),
      ProfileInfoTileData(
        icon: Icons.calendar_month_outlined,
        titleKey: 'profile.info.birth_date'.tr(),
        value: '15 March 2001',
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