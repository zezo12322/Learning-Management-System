import 'package:easy_localization/easy_localization.dart';
import 'package:firebase_data_connect/firebase_data_connect.dart';
import 'package:flutter/material.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';
import 'package:gap/gap.dart';
import 'package:optimatech_lms/features/courses/presentation/views/widgets/section_header.dart';
import 'package:optimatech_lms/features/profile/presentation/views/widgets/certificate/certificate_card.dart';

import 'package:optimatech_lms/dataconnect_generated/generated.dart';

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
        FutureBuilder<QueryResult<MyCertificatesData, void>>(
          future: DefaultConnector.instance.myCertificates().execute(),
          builder: (context, snapshot) {
            if (snapshot.connectionState == ConnectionState.waiting) {
              return const Center(child: CircularProgressIndicator());
            }

            if (snapshot.hasError) {
              return Text('profile.certificates.load_error'.tr());
            }

            final certificates = snapshot.data?.data.certificates ?? [];

            if (certificates.isEmpty) {
              return Padding(
                padding: EdgeInsets.symmetric(vertical: 20.h),
                child: Center(
                  child: Text(
                    'profile.certificates.empty'.tr(),
                    style: TextStyle(color: Colors.grey),
                  ),
                ),
              );
            }

            return Column(
              children: certificates.map((cert) {
                final date = cert.issuedAt.toDateTime();
                final formattedDate = DateFormat('MMM dd, yyyy', context.locale.toLanguageTag()).format(date);
                final title = cert.course?.title ?? cert.mission?.title ?? 'Unknown Certificate';

                return Padding(
                  padding: EdgeInsets.only(bottom: 12.h),
                  child: CertificateCard(
                    data: CertificateCardData(
                      title: title,
                      issueDate: formattedDate,
                      statusKey: 'profile.certificates.verified',
                    ),
                  ),
                );
              }).toList(),
            );
          },
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