import 'package:easy_localization/easy_localization.dart';
import 'package:flutter/material.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';
import 'package:gap/gap.dart';
import 'package:optimatech_lms/core/utils/app_colors.dart';
import 'package:optimatech_lms/core/utils/extension.dart';
import 'package:optimatech_lms/features/profile/presentation/views/widgets/profile_certificates_section.dart';

class CertificateInfo extends StatelessWidget {
  const CertificateInfo({
    super.key,
    required this.data,
  });

  final CertificateCardData data;

  @override
  Widget build(BuildContext context) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Text(
          data.title,
          maxLines: 2,
          overflow: TextOverflow.ellipsis,
          style: context.textTheme.labelLarge?.copyWith(
            fontWeight: FontWeight.w700,
          ),
        ),
        Gap(6.h),
        Text(
          'profile.certificates.issued_on'.tr(
            namedArgs: {'date': data.issueDate,},
          ),
          style: context.textTheme.bodySmall,
        ),
        Gap(10.h),
        // verified container
        Container(
          padding: EdgeInsets.symmetric(horizontal: 10.w, vertical: 6.h,),
          decoration: BoxDecoration(
            color: AppColors.success.withAlpha(18),
            borderRadius: BorderRadius.circular(12.r),
          ),
          child: Row(
            mainAxisSize: MainAxisSize.min,
            children: [
              Text(
                data.statusKey.tr(),
                style: context.textTheme.labelSmall?.copyWith(
                  color: AppColors.success,
                  fontWeight: FontWeight.w700,
                ),
              ),
              Gap(4.w),
              Icon(
                Icons.verified_rounded,
                size: 14.sp,
                color: AppColors.success,
              ),
            ],
          ),
        ),
      ],
    );
  }
}
