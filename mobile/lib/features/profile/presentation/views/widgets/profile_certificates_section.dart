import 'package:easy_localization/easy_localization.dart';
import 'package:flutter/material.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';
import 'package:gap/gap.dart';
import 'package:optimatech_lms/features/courses/presentation/views/widgets/section_header.dart';
import 'package:optimatech_lms/features/profile/presentation/views/widgets/certificate/certificate_card.dart';

class ProfileCertificatesSection extends StatelessWidget {
  const ProfileCertificatesSection({super.key});

  @override
  Widget build(BuildContext context) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        SectionHeader(
          title: 'profile.sections.certificates'.tr(),
          actionLabel: 'profile.common.view_all'.tr(),
          onTap: () {},
        ),
        Gap(12.h),
        const CertificateCard(
          data: CertificateCardData(
            title: 'UI/UX Design Fundamentals',
            issueDate: 'May 30, 2025',
            statusKey: 'profile.certificates.verified',
          ),
        ),
      ],
    );
  }
}

class CertificateCardData {
  final String title;
  final String issueDate;
  final String statusKey;

  const CertificateCardData({
    required this.title,
    required this.issueDate,
    required this.statusKey,
  });
}