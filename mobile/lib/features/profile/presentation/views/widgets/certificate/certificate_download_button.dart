import 'package:flutter/material.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';
import 'package:optimatech_lms/core/utils/extension.dart';

class CertificateDownloadButton extends StatelessWidget {
  const CertificateDownloadButton({super.key, required this.onTap,});

  final VoidCallback onTap;
  @override
  Widget build(BuildContext context) {
    return InkWell(
      onTap: onTap,
      borderRadius: BorderRadius.circular(14.r),
      child: Container(
        width: 44.w,
        height: 44.w,
        decoration: BoxDecoration(
          borderRadius: BorderRadius.circular(14.r),
          border: Border.all(
            color: context.theme.colorScheme.outline,
          ),
        ),
        child: Icon(
          Icons.download_rounded,
          color: context.theme.colorScheme.primary,
        ),
      ),
    );
  }
}
