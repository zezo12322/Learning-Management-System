import 'package:flutter/material.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';
import 'package:gap/gap.dart';
import 'package:optimatech_lms/features/profile/presentation/views/widgets/certificate/certificate_download_button.dart';
import 'package:optimatech_lms/features/profile/presentation/views/widgets/certificate/certificate_info.dart';
import 'package:optimatech_lms/features/profile/presentation/views/widgets/certificate/certificate_thumbnail.dart';
import 'package:optimatech_lms/features/profile/presentation/views/widgets/profile_certificates_section.dart';

class CertificateCard extends StatelessWidget {
  const CertificateCard({
    super.key,
    required this.data,
  });

  final CertificateCardData data;

  @override
  Widget build(BuildContext context) {
    return Card(
      margin: EdgeInsets.zero,
      child: Padding(
        padding: EdgeInsets.all(12.w),
        child: Row(
          children: [
            CertificateThumbnail(imagePath: '',),
            Gap(12.w),
            Expanded(
              child: CertificateInfo(data: data),
            ),
            Gap(8.w),
            CertificateDownloadButton(onTap: (){},),
          ],
        ),
      ),
    );
  }
}
